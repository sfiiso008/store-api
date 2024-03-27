// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Categories, CategoriesData, CategoriesPatch, CategoriesQuery } from './categories.schema'

export type { Categories, CategoriesData, CategoriesPatch, CategoriesQuery }

export interface CategoriesParams extends MongoDBAdapterParams<CategoriesQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class CategoriesService<ServiceParams extends Params = CategoriesParams> extends MongoDBService<
  Categories,
  CategoriesData,
  CategoriesParams,
  CategoriesPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('categories'))
  }
}
