// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { CategoriesService } from './categories.class'

// Main data model schema
export const categoriesSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    image: Type.String(),
    createdAt: Type.String({ format: 'date-time' }),
    subCategories: Type.Array(
      Type.Object({
        _id: ObjectIdSchema(),
        name: Type.String()
      })
    ),
    products: Type.Array(
      Type.Object({
        _id: ObjectIdSchema(),
        title: Type.String(),
        price: Type.Integer(),
        description: Type.String(),
        images: Type.Array(Type.String()),
        subCategoryId: ObjectIdSchema()
      })
    )
  },
  { $id: 'Categories', additionalProperties: false }
)

export type Categories = Static<typeof categoriesSchema>

export const categoriesValidator = getValidator(categoriesSchema, dataValidator)

export const categoriesResolver = resolve<Categories, HookContext<CategoriesService>>({
  subCategories: virtual(async (category, context) => {
    const subCategories = await context.app.service('sub-categories').find({
      query: {
        categoryId: category._id
      }
    })

    return [
      ...subCategories.data.map((subCategory) => {
        return {
          _id: subCategory._id,
          name: subCategory.name
        }
      })
    ]
  }),
  products: virtual(async (category, context) => {
    const subCategories = await context.app.service('sub-categories').find({
      query: {
        categoryId: category._id
      }
    })

    const subCategoryIds = subCategories.data.map((subCategory) => {
      return subCategory._id
    })

    const products = await context.app.service('products').find({
      query: {
        subCategoryId: {
          $in: subCategoryIds
        }
      }
    })

    return [
      ...products.data.map((product) => {
        return {
          _id: product._id,
          title: product.title,
          price: product.price,
          description: product.description,
          images: product.images,
          subCategoryId: product.subCategoryId
        }
      })
    ]
  })
})

export const categoriesExternalResolver = resolve<Categories, HookContext<CategoriesService>>({})

// Schema for creating new entries
export const categoriesDataSchema = Type.Pick(categoriesSchema, ['name', 'image'], {
  $id: 'CategoriesData'
})
export type CategoriesData = Static<typeof categoriesDataSchema>
export const categoriesDataValidator = getValidator(categoriesDataSchema, dataValidator)
export const categoriesDataResolver = resolve<Categories, HookContext<CategoriesService>>({})

// Schema for updating existing entries
export const categoriesPatchSchema = Type.Partial(categoriesSchema, {
  $id: 'CategoriesPatch'
})
export type CategoriesPatch = Static<typeof categoriesPatchSchema>
export const categoriesPatchValidator = getValidator(categoriesPatchSchema, dataValidator)
export const categoriesPatchResolver = resolve<Categories, HookContext<CategoriesService>>({
  createdAt: async () => {
    // Use a library like `date-fns` or `luxon` to format the date
    const formattedDate = new Date().toISOString()
    return formattedDate
  }
})

// Schema for allowed query properties
export const categoriesQueryProperties = Type.Pick(categoriesSchema, ['_id', 'name', 'image'])

export const categoriesQuerySchema = Type.Intersect(
  [
    querySyntax(categoriesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CategoriesQuery = Static<typeof categoriesQuerySchema>
export const categoriesQueryValidator = getValidator(categoriesQuerySchema, queryValidator)
export const categoriesQueryResolver = resolve<CategoriesQuery, HookContext<CategoriesService>>({})
