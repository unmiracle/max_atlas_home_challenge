import {api} from '../pages/components/SearchCollections/config'
import {CollectionType} from '../models/collection';
import {IntentCollectionType} from '../models/intentCollection';
import {OrganisationType} from '../models/organisation';


type CollectionDto = {
    searchCollections : CollectionType[]
}

type IntentCollectionDto = {
    intentCollections : IntentCollectionType[]
}

type OrganisationDto = {
    organisations: OrganisationType[]
}

const config = {
    headers: {
        Authorization:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjJiYjI3NThiYzliZGFmMGQ2ZDI1ZWQiLCJlbWFpbCI6InRlc3R1c2VyQGphY2tzb25iZWVyLmNvbSIsImFkbWluIjp0cnVlLCJzdXBlckFkbWluIjp0cnVlLCJvcmdhbmlzYXRpb25JRHMiOlsiNWYwZDk5YjA4ODQxZDlhZjM3MDAwMDAyIl0sImFjY291bnRJZHMiOlsiNjAwODczODkyZWFiYjA5OTkxMDAwMDAxIiwiNjAyZTQ2YzMzOWNlMmFkOWEwMDAwMDA4Il0sImV4cCI6MTYxNDYyNjc5OCwiaXNzIjoiYWNjb3VudF9zZXJ2aWNlIn0.xAYjXOeuRpdzIzhAzYqEwO2vGcEw3ernQtxghcBqduA",
        Accept: "application/json",
    }
}

export async function getSearchCollections(): Promise<CollectionDto> {
    let res = await api.get("https://jacksonbeer-proxy.vrealsoft.com/test/search_service/searchcollection/list", config)
    if (res.status !== 200) throw new Error("Can't fetch collections")
    return res.data
}

export async function addSearchCollection(collection: CollectionType): Promise<CollectionDto> {
    let res = await api.post("https://jacksonbeer-proxy.vrealsoft.com/test/search_service/searchcollection/add", collection, config)
    if (res.status !== 200) throw new Error("Can't add collection")
    return res.data
}

export async function updateSearchCollection(collection: CollectionType): Promise<CollectionDto> {
    let res = await api.post("https://jacksonbeer-proxy.vrealsoft.com/test/search_service/searchcollection/update", collection, config)
    if (res.status !== 200) throw new Error("Can't update collections")
    return res.data
}

export async function deleteSearchCollection(collection: CollectionType): Promise<CollectionDto> {
    let res = await api.post("https://jacksonbeer-proxy.vrealsoft.com/test/search_service/searchcollection/delete", collection, config)
    if (res.status !== 200) throw new Error("Can't delete collection")
    return res.data
}

export async function getIntentCollections(): Promise<IntentCollectionDto> {
    let res = await api.get("https://jacksonbeer-proxy.vrealsoft.com/test/search_service/intentcollection/list", config)
    if (res.status !== 200) throw new Error("Can't fetch collections")
    return res.data
}

export async function getOrganisations(): Promise<OrganisationDto> {
    let res = await api.get("https://jacksonbeer-proxy.vrealsoft.com/test/account_service/organisation/list", config)
    if (res.status !== 200) throw new Error("Can't fetch collections")
    return res.data
}
