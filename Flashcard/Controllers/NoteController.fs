namespace Flashcard.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Configuration
open FlashcardTypes
open MongoDB.Driver

type NoteController (configuration : IConfiguration) =
    inherit ControllerBase()

    [<HttpGet>]
    member __.GetNotes(deckId : int) : Note[] =
        let client = new MongoClient(configuration.GetConnectionString("Database"))
        let database = client.GetDatabase("Flashcards")
        let collection = database.GetCollection<Note>("Notes")
    
        let filter = Builders<Note>.Filter.Where(fun note -> note.DeckId = deckId)

        collection.Find(filter).ToList()
        |> Seq.toArray
        
    [<HttpPost>]
    member __.CreateNote(deckId : int, content : string) : Note =
        let client = new MongoClient(configuration.GetConnectionString("Database"))
        let database = client.GetDatabase("Flashcards")
        let collection = database.GetCollection<Note>("Notes")

        let id =
            if (collection.Find(Builders<Note>.Filter.Empty).Any() |> not) then
                1
            else
                collection.Find(Builders<Note>.Filter.Empty)
                    .SortByDescending(fun i -> (i.Id :> obj))
                    .FirstOrDefault().Id + 1

        let note = new Note(id, deckId, content)
            
        async {
            collection.InsertOneAsync(note) |> ignore
        } |> Async.Start

        note