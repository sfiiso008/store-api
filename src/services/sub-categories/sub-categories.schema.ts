// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { SubCategoriesService } from './sub-categories.class'

// Main data model schema
export const subCategoriesSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    categoryId: ObjectIdSchema()
  },
  { $id: 'SubCategories', additionalProperties: false }
)
export type SubCategories = Static<typeof subCategoriesSchema>
export const subCategoriesValidator = getValidator(subCategoriesSchema, dataValidator)
export const subCategoriesResolver = resolve<SubCategories, HookContext<SubCategoriesService>>({})

export const subCategoriesExternalResolver = resolve<SubCategories, HookContext<SubCategoriesService>>({})

// Schema for creating new entries
export const subCategoriesDataSchema = Type.Pick(subCategoriesSchema, ['name', 'categoryId'], {
  $id: 'SubCategoriesData'
})
export type SubCategoriesData = Static<typeof subCategoriesDataSchema>
export const subCategoriesDataValidator = getValidator(subCategoriesDataSchema, dataValidator)
export const subCategoriesDataResolver = resolve<SubCategories, HookContext<SubCategoriesService>>({})

// Schema for updating existing entries
export const subCategoriesPatchSchema = Type.Partial(subCategoriesSchema, {
  $id: 'SubCategoriesPatch'
})
export type SubCategoriesPatch = Static<typeof subCategoriesPatchSchema>
export const subCategoriesPatchValidator = getValidator(subCategoriesPatchSchema, dataValidator)
export const subCategoriesPatchResolver = resolve<SubCategories, HookContext<SubCategoriesService>>({})

// Schema for allowed query properties
export const subCategoriesQueryProperties = Type.Pick(subCategoriesSchema, ['_id', 'name', 'categoryId'])
export const subCategoriesQuerySchema = Type.Intersect(
  [
    querySyntax(subCategoriesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SubCategoriesQuery = Static<typeof subCategoriesQuerySchema>
export const subCategoriesQueryValidator = getValidator(subCategoriesQuerySchema, queryValidator)
export const subCategoriesQueryResolver = resolve<SubCategoriesQuery, HookContext<SubCategoriesService>>({})
