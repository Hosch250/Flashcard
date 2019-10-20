module FlashcardTypes

type Flashcard(id, label, front, back) =
    member val Id: int = id with get,set
    member val Label: string = label with get,set
    member val Front: string = front with get,set
    member val Back: string = back with get,set
    new() = Flashcard(0, "", "", "")

type FlashcardDeck(id, title, cards, tags) =
    member val Id: int = id with get,set
    member val Title: string = title with get,set
    member val Cards: Flashcard[] = cards with get,set
    member val Tags: string[] = tags with get,set
    new() = FlashcardDeck(0, "", [||], [||]);