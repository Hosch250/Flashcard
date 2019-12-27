namespace Flashcard.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Configuration
open FlashcardTypes
open MongoDB.Driver
open System.Linq
open Microsoft.AspNetCore.Authorization

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

    [<HttpGet; AllowAnonymous>]
    member __.GetDeck(id : int) : FlashcardDeck =
        let client = new MongoClient(configuration.GetConnectionString("Database"))
        let database = client.GetDatabase("Flashcards")
        let collection = database.GetCollection<FlashcardDeck>("Decks")

        collection.Find(Builders<FlashcardDeck>.Filter.Eq((fun deck -> deck.Id), id)).Single()

    [<HttpGet; AllowAnonymous>]
    member __.GetAllDecks(category : string) : FlashcardDeck[] =
        let x = BCrypt.Net.BCrypt.HashPassword("test")
        let client = new MongoClient(configuration.GetConnectionString("Database"))
        let database = client.GetDatabase("Flashcards")
        let collection = database.GetCollection<FlashcardDeck>("Decks")
        
        let filter =
            if System.String.IsNullOrEmpty(category) then
                Builders<FlashcardDeck>.Filter.Empty
            else
                Builders<FlashcardDeck>.Filter.Where(fun deck -> deck.Tags.Contains(category))

        collection.Find(filter).ToList()
        |> Seq.toArray

    [<HttpGet; AllowAnonymous>]
    member __.GetAllCategories() : string[] =
        let client = new MongoClient(configuration.GetConnectionString("Database"))
        let database = client.GetDatabase("Flashcards")
        let collection = database.GetCollection<FlashcardDeck>("Decks")
        
        collection
            .Find(Builders<FlashcardDeck>.Filter.Empty)
            .Project(Builders<FlashcardDeck>.Projection.Expression(fun s -> s.Tags))
            .ToList()
        |> Seq.collect (fun s -> s)
        |> Seq.distinct
        |> Seq.sortBy (fun s -> s)
        |> Seq.toArray