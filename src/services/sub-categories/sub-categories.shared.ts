// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  SubCategories,
  SubCategoriesData,
  SubCategoriesPatch,
  SubCategoriesQuery,
  SubCategoriesService
} from './sub-categories.class'

export type { SubCategories, SubCategoriesData, SubCategoriesPatch, SubCategoriesQuery }

export type SubCategoriesClientService = Pick<
  SubCategoriesService<Params<SubCategoriesQuery>>,
  (typeof subCategoriesMethods)[number]
>

export const subCategoriesPath = 'sub-categories'

export const subCategoriesMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const subCategoriesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(subCategoriesPath, connection.service(subCategoriesPath), {
    methods: subCategoriesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [subCategoriesPath]: SubCategoriesClientService
  }
}
