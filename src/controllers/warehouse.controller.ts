import IProduct from "../interfaces/product.interface"
import IResponse from "../interfaces/response.interace"
import Products from "../models/products.model"

export default class WarehouseController {

    createProduct(product: IProduct): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            (async() => {
                try {
                    if (!product || Object.keys(product).length === 0) {
                        return reject({ ok: false, message: 'No product data was provided', response: null, code: 400 })
                    }
                    const productCreated = await Products.create(product)
                    return resolve({ ok: true, message: 'Product created', response: productCreated, code: 201 })
                } catch (err) {
                    return reject({ ok: false, message: 'Error in Database', response: err, code: 500 })
                }
            })()
        })
    }

    getProduct(): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            (async() => {
                try {
                    const getProduct = await Products.find({})
                    if ( getProduct.length === 0 || !getProduct || getProduct.length < 1 ) {
                        return reject({ ok: false, message: 'No products found', response: null, code: 404 })
                    }

                    return resolve({ ok: true, message: 'Products found', response: getProduct, code: 200 })
                } catch (err) {
                    return reject({ ok: false, message: 'Error in Database', response: err, code: 500 })
                }
            })()
        })
    }

    getProductBySku(sku: string): Promise <IResponse> {
        return new Promise((resolve, reject) => {
            (async() => {
                try {
                    const getProduct = await Products.findOne({sku})

                    if(!getProduct) {
                        return reject({ ok: false, message: 'Product not found', response: null, code: 404 })
                    }

                    return resolve({ ok: true, message: 'Product found successfully', response: getProduct, code: 200 })
                } catch(err) {
                    return reject({ ok: false, message: 'Error in Database', response: err, code: 500 })
                }
            })()
        })
    }

    updateProduct(product: IProduct): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            (async() => {
                try {
                    const productUpdated = await Products.findOneAndUpdate(
                        { sku: product.sku }, 
                        product, 
                        { new: true }
                    )

                    if (!productUpdated) {
                        return reject({ ok: false, message: 'Product not found', response: null, code: 404 })
                    }
                    if (productUpdated.affected == 0) {
                        reject({ ok: false, message: 'An error occurred while updating the product', response: null, code: 400 })
                    }
                    return resolve({ ok: true, message: 'Product updated', response: productUpdated, code: 200 })
                } catch (err) {
                    return reject({ ok: false, message: 'Error in Database', response: err, code: 500 })
                }
            })()
        })
    }

    deleteProduct(sku: string): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            (async() => {
                try {
                    const productDeleted = await Products.findOneAndDelete({ sku })

                    if (!productDeleted) {
                        return reject({ ok: false, message: 'Product not found', response: null, code: 404 })
                    }

                    return resolve({ ok: true, message: 'Product deleted', response: productDeleted, code: 200 })
                } catch (err) {
                    return reject({ ok: false, message: 'Error in Database', response: err, code: 500 })
                }
            })()
        })
    }

}