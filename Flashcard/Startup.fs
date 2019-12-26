namespace Flashcard

open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.AspNetCore.Identity
open Microsoft.AspNetCore.SpaServices.AngularCli
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Flashcard.Identity

type Startup private () =
    new (configuration: IConfiguration) as this =
        Startup() then
        this.Configuration <- configuration

    // This method gets called by the runtime. Use this method to add services to the container.
    member this.ConfigureServices(services: IServiceCollection) =
        // Add framework services.
        services.AddControllersWithViews() |> ignore
        services.AddSpaStaticFiles(fun configuration ->
            configuration.RootPath <- "ClientApp/dist"
        ) |> ignore
        
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

        if not (env.IsDevelopment()) then
            app.UseSpaStaticFiles() |> ignore

        app.UseRouting() |> ignore

        app.UseEndpoints(fun endpoints ->
            endpoints.MapControllerRoute(
                name = "default",
                pattern = "{controller}/{action}/{id?}") |> ignore
        ) |> ignore

        app.UseSpa(fun spa ->
            spa.Options.SourcePath <- "ClientApp"
            if (env.IsDevelopment()) then
                spa.UseAngularCliServer(npmScript = "start") |> ignore
        )

    member val Configuration : IConfiguration = null with get, set
