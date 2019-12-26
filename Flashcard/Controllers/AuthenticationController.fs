namespace Flashcard.Controllers

open Microsoft.AspNetCore.Identity
open Microsoft.AspNetCore.Mvc
open Flashcard.Identity
open Microsoft.AspNetCore.Http
open Microsoft.AspNetCore.Authorization

type AuthenticationController (signInManager: SignInManager<AuthenticationUser>, userManager: UserManager<AuthenticationUser>, httpContext: IHttpContextAccessor) =
    inherit ControllerBase()

    [<HttpPost; AllowAnonymous>]
    member __.AuthenticateUser(username: string, password: string, ?returnUrl: string) =
        let returnUrl = defaultArg returnUrl "/"
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
                return new RedirectResult("/SignIn?ReturnUrl=" + returnUrl)
            | result when not result.Succeeded ->
                return new RedirectResult("/SignIn?ReturnUrl=" + returnUrl)
            | _ ->
                httpContext.HttpContext.Response.Cookies.Delete("LockoutTime")
                return new RedirectResult(returnUrl)
        }
    
    [<HttpGet>]
    member __.SignOut() =
        async {
            do! Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync(httpContext.HttpContext, "Identity.Application") |> Async.AwaitTask
            return new RedirectResult("/SignIn")
        }