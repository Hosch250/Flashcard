namespace Flashcard.Controllers

open Microsoft.AspNetCore.Mvc
open Microsoft.Extensions.Logging
open FlashcardTypes

type FlashcardDeckController (logger : ILogger<FlashcardDeckController>) =
    inherit ControllerBase()

    [<HttpPost>]
    member __.SaveDeck([<FromBody>] flashcardDeck : FlashcardDeck) =
        ()

    [<HttpGet>]
    member __.GetDeck(id : int) : FlashcardDeck =
        new FlashcardDeck (
            id = 0,
            title = "State Abbreviations",
            tags = [|"geography"; "united-states"|],
            cards = [|
                new Flashcard ( id = 0, label = "Alabama", front = "Alabama", back = "AL" );
                new Flashcard ( id = 1, label = "Alaska", front = "Alaska", back = "AK" );
                new Flashcard ( id = 2, label = "Arizona", front = "Arizona", back = "AZ" );
                new Flashcard ( id = 3, label = "Arkansas", front = "Arkansas", back = "AR" );
                new Flashcard ( id = 4, label = "California", front = "California", back = "CA" );
                new Flashcard ( id = 5, label = "Colorado", front = "Colorado", back = "CO" );
                new Flashcard ( id = 6, label = "Connecticut", front = "Connecticut", back = "CT" );
                new Flashcard ( id = 7, label = "Delaware", front = "Delaware", back = "DE" );
                new Flashcard ( id = 8, label = "Florida", front = "Florida", back = "FL" );
                new Flashcard ( id = 9, label = "Georgia", front = "Georgia", back = "GA" );
                new Flashcard ( id = 10, label = "Hawaii", front = "Hawaii", back = "HI" );
                new Flashcard ( id = 11, label = "Idaho", front = "Idaho", back = "ID" );
                new Flashcard ( id = 12, label = "Illinois", front = "Illinois", back = "IL" );
                new Flashcard ( id = 13, label = "Indiana", front = "Indiana", back = "IN" );
                new Flashcard ( id = 14, label = "Iowa", front = "Iowa", back = "IA" );
                new Flashcard ( id = 15, label = "Kansas", front = "Kansas", back = "KS" );
                new Flashcard ( id = 16, label = "Kentucky", front = "Kentucky", back = "KY" );
                new Flashcard ( id = 17, label = "Louisiana", front = "Louisiana", back = "LA" );
                new Flashcard ( id = 18, label = "Maine", front = "Maine", back = "ME" );
                new Flashcard ( id = 19, label = "Maryland", front = "Maryland", back = "MD" );
                new Flashcard ( id = 20, label = "Massachusetts", front = "Massachusetts", back = "MA" );
                new Flashcard ( id = 21, label = "Michigan", front = "Michigan", back = "MI" );
                new Flashcard ( id = 22, label = "Minnesota", front = "Minnesota", back = "MN" );
                new Flashcard ( id = 23, label = "Mississippi", front = "Mississippi", back = "MS" );
                new Flashcard ( id = 24, label = "Missouri", front = "Missouri", back = "MO" );
                new Flashcard ( id = 25, label = "Montana", front = "Montana", back = "MT" );
                new Flashcard ( id = 26, label = "Nebraska", front = "Nebraska", back = "NE" );
                new Flashcard ( id = 27, label = "Nevada", front = "Nevada", back = "NV" );
                new Flashcard ( id = 28, label = "New Hampshire", front = "New Hampshire", back = "NH" );
                new Flashcard ( id = 29, label = "New Jersey", front = "New Jersey", back = "NJ" );
                new Flashcard ( id = 30, label = "New Mexico", front = "New Mexico", back = "NM" );
                new Flashcard ( id = 31, label = "New York", front = "New York", back = "NY" );
                new Flashcard ( id = 32, label = "North Carolina", front = "North Carolina", back = "NC" );
                new Flashcard ( id = 33, label = "North Dakota", front = "North Dakota", back = "ND" );
                new Flashcard ( id = 34, label = "Ohio", front = "Ohio", back = "OH" );
                new Flashcard ( id = 35, label = "Oklahoma", front = "Oklahoma", back = "OK" );
                new Flashcard ( id = 36, label = "Oregon", front = "Oregon", back = "OR" );
                new Flashcard ( id = 37, label = "Pennsylvania", front = "Pennsylvania", back = "PA" );
                new Flashcard ( id = 38, label = "Rhode Island", front = "Rhode Island", back = "RI" );
                new Flashcard ( id = 39, label = "South Carolina", front = "South Carolina", back = "SC" );
                new Flashcard ( id = 40, label = "South Dakota", front = "South Dakota", back = "SD" );
                new Flashcard ( id = 41, label = "Tennessee", front = "Tennessee", back = "TN" );
                new Flashcard ( id = 42, label = "Texas", front = "Texas", back = "TX" );
                new Flashcard ( id = 43, label = "Utah", front = "Utah", back = "UT" );
                new Flashcard ( id = 44, label = "Vermont", front = "Vermont", back = "VT" );
                new Flashcard ( id = 45, label = "Virginia", front = "Virginia", back = "VA" );
                new Flashcard ( id = 46, label = "Washington", front = "Washington", back = "WA" );
                new Flashcard ( id = 47, label = "West Virginia", front = "West Virginia", back = "WV" );
                new Flashcard ( id = 48, label = "Wisconsin", front = "Wisconsin", back = "WI" );
                new Flashcard ( id = 49, label = "Wyoming", front = "Wyoming", back = "WY" )
            |]
        )
