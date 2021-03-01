export type CollectionType = {
    autoEdit: boolean,
    dedicatedCrawlers: number,
    demandSEMProviderId: string,
    errors: object,
    existsOnServer: boolean,
    id: string,
    intentCollectionId: string,
    language: string,
    locale: string,
    matchIntent: boolean,
    minimumImpressions: number | string,
    name: string,
    organisationId: string,
    scrapeSearchQueries: boolean,
    useSemanticParser?: boolean,
    valid: boolean
}
