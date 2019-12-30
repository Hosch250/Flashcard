namespace Flashcard.Identity

open Microsoft.AspNetCore.Identity
open Microsoft.AspNetCore.Authentication.Cookies
open System
open System.Linq
open System.Security.Claims
open System.Threading.Tasks
open MongoDB.Driver
open Microsoft.Extensions.Configuration

type Role() =
    member val roleId: Guid = Guid.Empty with get, set

type AuthenticationUser() =
    inherit IdentityUser()

type LookupNormalizer() =
    interface ILookupNormalizer with
        member this.NormalizeEmail(email) =
            email

        member this.NormalizeName(name) =
            name

type PasswordHasher() =
    interface IPasswordHasher<AuthenticationUser> with
        member this.HashPassword(user, password) =
            BCrypt.Net.BCrypt.HashPassword(password)

        member this.VerifyHashedPassword(user, hashedPassword, providedPassword) =
            if BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword) then
                PasswordVerificationResult.Success
            else
                PasswordVerificationResult.Failed

type UserClaimsPrincipalFactory() =
    interface IUserClaimsPrincipalFactory<AuthenticationUser> with
        member this.CreateAsync(user) =
            let identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme)
            Task.FromResult(new ClaimsPrincipal(identity))

type UserManager(store, optionsAccessor,
        passwordHasher, userValidators,
        passwordValidators, keyNormalizer,
        errors, services, logger) =
    inherit UserManager<AuthenticationUser>(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)

type UserValidator() =
    interface IUserValidator<AuthenticationUser> with
        member this.ValidateAsync(manager, user) =
            Task.FromResult(IdentityResult.Success)

type UserConfirmation() =
    interface IUserConfirmation<AuthenticationUser> with
        member this.IsConfirmedAsync(manager, user) =
            Task.FromResult(true)

type SignInManager(userManager, contextAccessor,
        userClaimsPrincipalFactory, options,
        logger, schemes, confirmation) =
    inherit SignInManager<AuthenticationUser>(userManager, contextAccessor, userClaimsPrincipalFactory, options, logger, schemes, confirmation)

type UserStore(configuration : IConfiguration) =
    interface IUserStore<AuthenticationUser> with
        member this.CreateAsync(user, cancellationToken) =
            async {
                let client = new MongoClient(configuration.GetConnectionString("Database"))
                let database = client.GetDatabase("Flashcards")
                let collection = database.GetCollection<AuthenticationUser>("User")

                do! collection.InsertOneAsync(user, new InsertOneOptions(), cancellationToken) |> Async.AwaitTask
                return IdentityResult.Success
            } |> Async.StartAsTask

        member this.DeleteAsync(user, cancellationToken) =
            async {
                let client = new MongoClient(configuration.GetConnectionString("Database"))
                let database = client.GetDatabase("Flashcards")
                let collection = database.GetCollection<AuthenticationUser>("User")

                let! result = collection.DeleteOneAsync((fun f -> f.Id = user.Id), cancellationToken) |> Async.AwaitTask
                return IdentityResult.Success
            } |> Async.StartAsTask
            
        member this.FindByIdAsync(userId, cancellationToken) =
            let client = new MongoClient(configuration.GetConnectionString("Database"))
            let database = client.GetDatabase("Flashcards")
            let collection = database.GetCollection<AuthenticationUser>("User")

            Task.FromResult(collection.Find((fun f -> f.Id = userId)).Single())
            
        member this.FindByNameAsync(name, cancellationToken) =
            let client = new MongoClient(configuration.GetConnectionString("Database"))
            let database = client.GetDatabase("Flashcards")
            let collection = database.GetCollection<AuthenticationUser>("User")

            Task.FromResult(collection.Find((fun f -> f.UserName = name)).Single())

        member this.GetNormalizedUserNameAsync(user, cancellationToken) =
            Task.FromResult(user.UserName)

        member this.GetUserIdAsync(user, cancellationToken) =
            Task.FromResult(user.Id)

        member this.GetUserNameAsync(user, cancellationToken) =
            Task.FromResult(user.UserName)

        member this.SetNormalizedUserNameAsync(user, normalizedName, cancellationToken) =
            Task.CompletedTask

        member this.SetUserNameAsync(user, normalizedName, cancellationToken) =
            Task.CompletedTask

        member this.UpdateAsync(user, cancellationToken) =
            Task.FromResult(IdentityResult.Success)

        member this.Dispose() =
            ()

    interface IUserPasswordStore<AuthenticationUser> with
        member this.GetPasswordHashAsync(user, cancellationToken) =
            Task.FromResult(user.PasswordHash)

        member this.HasPasswordAsync(user, cancellationToken) =
            Task.FromResult(String.IsNullOrEmpty(user.PasswordHash))

        member this.SetPasswordHashAsync(user, hash, cancellationToken) =
            raise (NotImplementedException())

    interface IUserLockoutStore<AuthenticationUser> with
        member this.GetAccessFailedCountAsync(user, cancellationToken) =
            Task.FromResult(user.AccessFailedCount)
            
        member this.GetLockoutEnabledAsync(user, cancellationToken) =
            Task.FromResult(true)

        member this.GetLockoutEndDateAsync(user, cancellationToken) =
            let result = user.LockoutEnd |> Option.ofNullable;
            let returnVal =
                if result.IsSome && result.Value.DateTime >= DateTime.UtcNow then
                    Some (new DateTimeOffset(result.Value.DateTime))
                else
                    None

            Task.FromResult(Option.toNullable(returnVal))

        member this.IncrementAccessFailedCountAsync(user, cancellationToken) =
            user.AccessFailedCount <- user.AccessFailedCount + 1

            let client = new MongoClient(configuration.GetConnectionString("Database"))
            let database = client.GetDatabase("Flashcards")
            let collection = database.GetCollection<AuthenticationUser>("User")

            let filterStatement = Builders<AuthenticationUser>.Filter.Eq((fun f -> f.Id), user.Id)
            let updateStatement = Builders<AuthenticationUser>.Update.Inc((fun f -> f.AccessFailedCount), 1)

            let options = new FindOneAndUpdateOptions<AuthenticationUser>()
            let result = collection.FindOneAndUpdateAsync(filterStatement, updateStatement, options, cancellationToken) |> Async.AwaitTask

            Task.FromResult(user.AccessFailedCount)
            
        member this.ResetAccessFailedCountAsync(user, cancellationToken) =
            user.AccessFailedCount <- 0

            let client = new MongoClient(configuration.GetConnectionString("Database"))
            let database = client.GetDatabase("Flashcards")
            let collection = database.GetCollection<AuthenticationUser>("User")

            let filterStatement = Builders<AuthenticationUser>.Filter.Eq((fun f -> f.Id), user.Id)
            let updateStatement = Builders<AuthenticationUser>.Update.Set((fun f -> f.AccessFailedCount), 0)

            let options = new FindOneAndUpdateOptions<AuthenticationUser>()
            let result = collection.FindOneAndUpdate(filterStatement, updateStatement, options, cancellationToken)

            Task.CompletedTask
        
        member this.SetLockoutEnabledAsync(user, enabled, cancellationToken) =
            user.LockoutEnabled <- true
            Task.CompletedTask

        member this.SetLockoutEndDateAsync(user, lockoutEnd, cancellationToken) =
            let client = new MongoClient(configuration.GetConnectionString("Database"))
            let database = client.GetDatabase("Flashcards")
            let collection = database.GetCollection<AuthenticationUser>("User")

            let filterStatement = Builders<AuthenticationUser>.Filter.Eq((fun f -> f.Id), user.Id)
            let updateStatement = Builders<AuthenticationUser>.Update.Set((fun f -> f.LockoutEnd), lockoutEnd)

            let options = new FindOneAndUpdateOptions<AuthenticationUser>()
            let result = collection.FindOneAndUpdateAsync(filterStatement, updateStatement, options, cancellationToken) |> Async.AwaitTask

            Task.CompletedTask

type RoleStore() =
    interface IRoleStore<IdentityRole> with
        member this.CreateAsync(role, cancellationToken) =
            raise (NotImplementedException())

        member this.DeleteAsync(role, cancellationToken) =
            raise (NotImplementedException())

        member this.FindByIdAsync(role, cancellationToken) =
            raise (NotImplementedException())

        member this.FindByNameAsync(role, cancellationToken) =
            raise (NotImplementedException())

        member this.GetNormalizedRoleNameAsync(role, cancellationToken) =
            raise (NotImplementedException())

        member this.GetRoleIdAsync(role, cancellationToken) =
            raise (NotImplementedException())

        member this.GetRoleNameAsync(role, cancellationToken) =
            raise (NotImplementedException())

        member this.SetNormalizedRoleNameAsync(role, name, cancellationToken) =
            raise (NotImplementedException())

        member this.SetRoleNameAsync(role, name, cancellationToken) =
            raise (NotImplementedException())

        member this.UpdateAsync(role, cancellationToken) =
            raise (NotImplementedException())

        member this.Dispose() =
            raise (NotImplementedException())