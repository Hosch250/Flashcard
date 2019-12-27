namespace Flashcard

open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.Identity
open Microsoft.AspNetCore.SpaServices.AngularCli
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Flashcard.Identity
open System
open Microsoft.AspNetCore.Http
open System.Security.Claims
open Microsoft.AspNetCore.Authorization
open Microsoft.AspNetCore.Mvc.Authorization
open Microsoft.AspNetCore.Mvc

type Startup private () =
    new (configuration: IConfiguration) as this =
        Startup() then
        this.Configuration <- configuration

    // This method gets called by the runtime. Use this method to add services to the container.
    member this.ConfigureServices(services: IServiceCollection) =
        
        services.AddIdentity<AuthenticationUser, IdentityRole>((fun options ->
            options.Lockout.AllowedForNewUsers <- true;
            options.Lockout.MaxFailedAccessAttempts <- 5;
            options.Lockout.DefaultLockoutTimeSpan <- new TimeSpan(0, 5, 0);

            options.ClaimsIdentity.UserNameClaimType <- ClaimTypes.Name;
            options.ClaimsIdentity.UserIdClaimType <- ClaimTypes.Sid;
            options.ClaimsIdentity.RoleClaimType <- ClaimTypes.Role;
        )) |> ignore
        services.ConfigureApplicationCookie((fun options ->
            options.Cookie.Name <- ".auth";
            options.Cookie.HttpOnly <- true;
            options.Cookie.SameSite <- SameSiteMode.Strict;
            options.Cookie.IsEssential <- true;
            options.LoginPath <- new PathString("/Login");
            options.AccessDeniedPath <- new PathString("/Login");
            options.ForwardAuthenticate <- "Identity.Application";
            options.ForwardChallenge <- "Identity.Application";
            options.ForwardForbid <- "Identity.Application";
            options.SlidingExpiration <- true;
            options.ExpireTimeSpan <- new TimeSpan(0, 30, 0);
        )) |> ignore

        // Add framework services.
        services.AddControllersWithViews((fun config ->
            let policyBuilder =
                new AuthorizationPolicyBuilder()

            let policy = policyBuilder.AddAuthenticationSchemes("Identity.Application")
                            .RequireAuthenticatedUser()
                            .Build()

            config.Filters.Add(new AuthorizeFilter(policy))
        )).SetCompatibilityVersion(CompatibilityVersion.Version_3_0) |> ignore

        services.AddSpaStaticFiles(fun configuration ->
            configuration.RootPath <- "ClientApp/dist"
        ) |> ignore
        
        services.AddTransient<IRoleStore<IdentityRole>, RoleStore>() |> ignore
        services.AddTransient<IUserStore<AuthenticationUser>, UserStore>() |> ignore
        services.AddTransient<IPasswordHasher<AuthenticationUser>, PasswordHasher>() |> ignore
        services.AddTransient<ILookupNormalizer, LookupNormalizer>() |> ignore
        services.AddTransient<IUserClaimsPrincipalFactory<AuthenticationUser>, UserClaimsPrincipalFactory>() |> ignore
        services.AddTransient<IUserValidator<AuthenticationUser>, UserValidator>() |> ignore
        services.AddTransient<IUserConfirmation<AuthenticationUser>, UserConfirmation>() |> ignore
        services.AddTransient<SignInManager<AuthenticationUser>, SignInManager>() |> ignore
        services.AddTransient<UserManager<AuthenticationUser>, UserManager>() |> ignore

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    member this.Configure(app: IApplicationBuilder, env: IWebHostEnvironment) =
        if (env.IsDevelopment()) then
            app.UseDeveloperExceptionPage() |> ignore
        else
            app.UseHsts() |> ignore

        app.UseHttpsRedirection() |> ignore
        app.UseStaticFiles() |> ignore
        app.UseCookiePolicy() |> ignore
        app.UseAuthentication() |> ignore

        if not (env.IsDevelopment()) then
            app.UseSpaStaticFiles() |> ignore

        app.UseRouting() |> ignore

        app.UseEndpoints(fun endpoints ->
            endpoints.MapControllerRoute(
                name = "default",
                pattern = "{controller}/{action}/{id?}") |> ignore
        ) |> ignore

        app.UseAuthorization() |> ignore

        app.UseSpa(fun spa ->
            spa.Options.SourcePath <- "ClientApp"
            if (env.IsDevelopment()) then
                spa.UseAngularCliServer(npmScript = "start") |> ignore
        )

    member val Configuration : IConfiguration = null with get, set
