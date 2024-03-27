// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type {
  SubCategories,
  SubCategoriesData,
  SubCategoriesPatch,
  SubCategoriesQuery
} from './sub-categories.schema'

export type { SubCategories, SubCategoriesData, SubCategoriesPatch, SubCategoriesQuery }

export interface SubCategoriesParams extends MongoDBAdapterParams<SubCategoriesQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SubCategoriesService<ServiceParams extends Params = SubCategoriesParams> extends MongoDBService<
  SubCategories,
  SubCategoriesData,
  SubCategoriesParams,
  SubCategoriesPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('sub-categories'))
  }
}
