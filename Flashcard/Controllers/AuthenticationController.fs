namespace Flashcard.Controllers

open Microsoft.AspNetCore.Identity
open Microsoft.AspNetCore.Mvc
open Flashcard.Identity
open Microsoft.AspNetCore.Http
open Microsoft.AspNetCore.Authorization
open System

type AuthenticationController (signInManager: SignInManager<AuthenticationUser>, userManager: UserManager<AuthenticationUser>, httpContext: IHttpContextAccessor) =
    inherit ControllerBase()

    [<HttpPost; AllowAnonymous>]
    member __.AuthenticateUser(username: string, [<FromBody>] password: string) =
        async {
            let! result = signInManager.PasswordSignInAsync(username, password, false, true) |> Async.AwaitTask
            match result with
            | result when not result.Succeeded && result.IsLockedOut ->
                let! user = userManager.FindByNameAsync(username) |> Async.AwaitTask
                let lockoutTime = user.LockoutEnd.Value.DateTime

                let cookie = new Microsoft.AspNetCore.Http.CookieOptions()
                cookie.Expires <- user.LockoutEnd
                cookie.HttpOnly <- true
                cookie.SameSite <- Microsoft.AspNetCore.Http.SameSiteMode.Strict
                cookie.Secure <- true

                httpContext.HttpContext.Response.Cookies.Append("LockoutTime", lockoutTime.ToString(), cookie);
                return new RedirectResult("/Login")
            | result when not result.Succeeded ->
                return new RedirectResult("/Login")
            | _ ->
                httpContext.HttpContext.Response.Cookies.Delete("LockoutTime")
                return new RedirectResult("/")
        }
    
    [<HttpGet>]
    member __.SignOut() =
        async {
            do! Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync(httpContext.HttpContext, "Identity.Application") |> Async.AwaitTask
            return new RedirectResult("/Login")
        }