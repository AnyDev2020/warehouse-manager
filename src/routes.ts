import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/hello', (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: 'Hello World' })
    } catch (err) {
        res.status(500).json(err)
    }
})

export default routes