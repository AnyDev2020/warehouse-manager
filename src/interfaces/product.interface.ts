export default interface IProduct{
    sku: number
    product: string
    quantity: number
    description: string
    gender: string
    store: string
    color:string
    size: string
    location: Array<ILocateProduct>
}

export interface ILocateProduct{
    hall: number
    side: string
    ubicationX: number
    ubicationY: number
}