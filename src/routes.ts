import { Router, Request, Response } from 'express'
import WarehouseController from './controllers/warehouse.controller'

const routes = Router()
const warehouseController = new WarehouseController()

routes.get('/getSkuProduct', async(req: Request, res: Response) => {
    const sku = req.body.sku

    try {
        const response = await warehouseController.getProductBySku(sku)
        return res.status(response.code).json(response)
    } catch(err: any) {
        return res.status(err.code).json(err)
    }
})

routes.get('/getProduct', async(req: Request, res: Response) => {
    try {
        const response = await warehouseController.getProduct()
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code).json(err)
    }
})

routes.post('/createProduct', async(req: Request, res: Response) => { // localhost:5001/api/createProduct
    const body = req.body

    try {
        const response = await warehouseController.createProduct(body)
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code).json(err)
    }
})

routes.put('/updateProduct', async(req: Request, res: Response) => {
    const product = req.body

    try {
        const response = await warehouseController.updateProduct(product)
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code).json(err)
    }
})

routes.delete('/deleteProduct', async(req: Request, res: Response) => {
    const sku = req.body.sku
    try {
        const response = await warehouseController.deleteProduct(sku)
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code).json(err)
    }
})


export default routes