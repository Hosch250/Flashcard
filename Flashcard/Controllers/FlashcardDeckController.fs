namespace Flashcard.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Configuration
open FlashcardTypes
open MongoDB.Driver

type FlashcardDeckController (configuration : IConfiguration) =
    inherit ControllerBase()

    [<HttpPost>]
    member __.SaveDeck([<FromBody>] flashcardDeck : FlashcardDeck) =
        let client = new MongoClient(configuration.GetConnectionString("Database"))
        let database = client.GetDatabase("Flashcards")
        let collection = database.GetCollection<FlashcardDeck>("Decks")
        collection.InsertOneAsync(flashcardDeck) |> ignore

    [<HttpGet>]
    member __.GetDeck(id : int) : FlashcardDeck =
        let client = new MongoClient(configuration.GetConnectionString("Database"))
        let database = client.GetDatabase("Flashcards")
        let collection = database.GetCollection<FlashcardDeck>("Decks")

        collection.Find(Builders<FlashcardDeck>.Filter.Eq((fun deck -> deck.Id), id)).Single()
