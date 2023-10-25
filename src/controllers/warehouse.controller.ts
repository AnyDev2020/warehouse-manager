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
                    return reject({ ok: false, message: 'Error creating product', response: err, code: 500 })
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
                        return reject({ ok: true, message: 'No products found', response: null, code: 200 })
                    }

                    const response = {
                        productsObtain: getProduct,
                        totalProducts: getProduct.length
                    }

                    return resolve({ ok: true, message: 'Products found', response: response, code: 200 })
                } catch (err) {
                    return reject({ ok: false, message: 'Error obtaining products', response: err, code: 500 })
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
                    return reject({ ok: false, message: 'Error updating product', response: err, code: 500 })
                }
            })()
        })
    }

    deleteProduct(sku: number): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            (async() => {
                try {
                    const productDeleted = await Products.findOneAndDelete({ _sku: sku })

                    if (!productDeleted) {
                        return reject({ ok: false, message: 'Product not found', response: null, code: 404 })
                    }

                    return resolve({ ok: true, message: 'Product deleted', response: productDeleted, code: 200 })
                } catch (err) {
                    return reject({ ok: false, message: 'Error deleting product', response: err, code: 500 })
                }
            })()
        })
    }

}