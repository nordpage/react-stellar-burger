export type BasicResponse = { isSuccess: true, message: null } | { isSuccess: false, message: string }
export type BasicItemsResponse<T> = { isSuccess: true, data: T[] } | { isSuccess: false, data: null }

export interface Ingredient {
    uid: string,
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
    bun: Ingredient | null,
    ingredients: Ingredient[],
    sum: number
}

export interface IOrder {
    ingredients: string[]
    _id: string
    name: string
    status: string
    number: number
    createdAt: string
    updatedAt: string
}

export interface User  {
    success: boolean,
    user: {
        name: string;
        email: string;
    };
};

export type Feed = {
    orders: IOrder[],
    totalToday: number,
    total: number
}

export type Inputs = { [key: string]: any; }