export type BasicResponse = { isSuccess: true, message: null } | { isSuccess: false, message: string }
export type BasicItemsResponse<T> = { isSuccess: true, data: T[] } | { isSuccess: false, data: null }

export interface Ingredient {
    _id: string,
    name: string,
    type:string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
}

export interface Cart {
    bun?: string,
    ingredients: Ingredient[],
    sum: number
}

export interface Order {
    order: { orderNumber: number }
}