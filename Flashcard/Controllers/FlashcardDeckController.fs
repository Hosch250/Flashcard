namespace Flashcard.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open FlashcardTypes

[<ApiController>]
[<Route("[controller]")>]
type FlashcardDeckController (logger : ILogger<FlashcardDeckController>) =
    inherit ControllerBase()

    [<HttpPost>]
    member __.Post([<FromBody>] flashcardDeck : FlashcardDeck) =
        logger.LogInformation(flashcardDeck.Title) |> ignore
        ()