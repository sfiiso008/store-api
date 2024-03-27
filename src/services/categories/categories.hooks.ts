import { HookContext } from '../../declarations'

export const attachProducts = async (context: HookContext) => {
  const { app, result } = context

  const subCategories = await app.service('sub-categories').find({
    query: {
      categoryId: result._id
    }
  })

  const subCategoryIds = subCategories.data.map((subCategory) => {
    return subCategory._id
  })

  const products = await app.service('products').find({
    query: {
      subCategoryId: {
        $in: subCategoryIds
      }
    }
  })

  context.result = {
    ...context.result,
    subCategories: subCategories.data,
    products: products.data
  }

  return context
}
