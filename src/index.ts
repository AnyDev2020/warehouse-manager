import HttpServer from './class/server.class'
import express from 'express'
import cors from 'cors'

const server = HttpServer.instance

server.app.enable('trusty proxy')

server.app.use(express.urlencoded({ extended: true, limit: '50mb'}))
server.app.use(express.json({ limit: '50mb'}))

server.app.use(cors({origin: true, credentials: true}))

server.app.use('/api')

server.start()