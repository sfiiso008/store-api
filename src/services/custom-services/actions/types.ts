export interface IItem {
  productId: string
  price: number
  itemPicture: string
  itemName: string
}

export interface ICartItem extends IItem {
  quantity: number
}

export interface Cart {
  _id: string | {}
  userId: string
  items: ICartItem[]
}

export interface WishList {
  _id: string | {}
  userId: string
  items: IItem[]
}
