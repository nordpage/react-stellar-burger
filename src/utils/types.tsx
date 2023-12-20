export interface Response {
    success: boolean,
    data: any
}

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