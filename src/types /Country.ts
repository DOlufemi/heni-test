import {Language} from "./Language";

export type Country = {
    code: string,
    name: string,
    native: string,
    phone: string,
    continent: Continent
    capital?: string,
    currency?: string,
    languages: Language[]
    emoji: string,
    emojiU: string,
    states: State[]
}


export type State = {
    code?: string
    name: string
    countries: Country[]
}
export type Continent = {

    code: string
    name: string
    countries: Country[]
}
