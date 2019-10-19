module FlashcardTypes

type Flashcard(id, label, front, back) =
    member this.Id: int = id
    member this.Label: string = label
    member this.Front: string = front
    member this.Back: string = back
    new() = Flashcard(1, "", "", "")

type FlashcardDeck(id, title, cards, tags) =
    member this.Id: int = id
    member this.Title: string = title
    member this.Cards: Flashcard list = cards
    member this.Tags: string list = tags
    new() = FlashcardDeck(0, "", [], []);