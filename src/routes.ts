import { Router, Request, Response } from 'express'
import WarehouseController from './controllers/warehouse.controller'

const routes = Router()
const warehouseController = new WarehouseController()

routes.get('/hello', async(req: Request, res: Response) => {
    try {
        return res.status(200).json({
            ok: true,
            message: 'Hello world'
        })
    } catch (err: any) {
        return res.status(500).json(err)
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
    const roySeLaCome = req.body // CAMBIAR ESTO

    try {
        console.log(roySeLaCome)
        const response = await warehouseController.createProduct(roySeLaCome)
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code).json(err)
    }
})

routes.put('/updateProduct', async(req: Request, res: Response) => {
    try {
        const response = await warehouseController.updateProduct(req.body.sku, req.body.product)
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code).json(err)
    }
})

routes.delete('/deleteProduct:sku', async(req: Request, res: Response) => {
    const {sku} = req.params
    try {
        const response = await warehouseController.deleteProduct(Number(sku))
        return res.status(response.code).json(response)
    } catch (err: any) {
        return res.status(err.code).json(err)
    }
})


export default routes