namespace Flashcard.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Configuration
open FlashcardTypes
open MongoDB.Driver

type FlashcardDeckController (configuration : IConfiguration) =
    inherit ControllerBase()

    [<HttpPost>]
    member __.SaveDeck([<FromBody>] flashcardDeck : FlashcardDeck) =
        Array.iteri (fun index (item:Flashcard) -> item.Id <- index) flashcardDeck.Cards

        let client = new MongoClient(configuration.GetConnectionString("Database"))
        let database = client.GetDatabase("Flashcards")
        let collection = database.GetCollection<FlashcardDeck>("Decks")

        if flashcardDeck.Id = 0 then
            let nextId =
                if flashcardDeck.Id = 0 && (collection.Find(Builders<FlashcardDeck>.Filter.Empty).Any() |> not) then
                    1
                else
                    collection.Find(Builders<FlashcardDeck>.Filter.Empty)
                        .SortByDescending(fun i -> (i.Id :> obj))
                        .FirstOrDefault().Id + 1

            flashcardDeck.Id <- nextId

            async {
                collection.InsertOneAsync(flashcardDeck) |> ignore
            } |> Async.Start

        else
            async {
                collection.FindOneAndReplaceAsync(Builders<FlashcardDeck>.Filter.Eq((fun deck -> deck.Id), flashcardDeck.Id), flashcardDeck) |> ignore
            } |> Async.Start

        flashcardDeck

    [<HttpGet>]
    member __.GetDeck(id : int) : FlashcardDeck =
        let client = new MongoClient(configuration.GetConnectionString("Database"))
        let database = client.GetDatabase("Flashcards")
        let collection = database.GetCollection<FlashcardDeck>("Decks")

        collection.Find(Builders<FlashcardDeck>.Filter.Eq((fun deck -> deck.Id), id)).Single()

    [<HttpGet>]
    member __.GetAllDecks() : FlashcardDeck[] =
        let client = new MongoClient(configuration.GetConnectionString("Database"))
        let database = client.GetDatabase("Flashcards")
        let collection = database.GetCollection<FlashcardDeck>("Decks")
        
        let decks =
            collection.Find(Builders<FlashcardDeck>.Filter.Empty).ToList()

        Seq.toArray decks
