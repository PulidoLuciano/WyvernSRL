import express, { RequestHandler, Router } from 'express'
import authorization from '../middlewares/authorization'
import { WyvernRoute } from '../types'
import { tryCatch } from '../middlewares/errorHandler'

const routerMethods = (router : Router) => ({
    GET: (path : string, middlewares : Array<RequestHandler>, handler : RequestHandler) => {router.get(path, middlewares, handler)},
    POST: (path : string, middlewares : Array<RequestHandler>, handler : RequestHandler) => {router.post(path, middlewares, handler)},
    PUT: (path : string, middlewares : Array<RequestHandler>, handler : RequestHandler) => {router.put(path, middlewares, handler)},
    DELETE: (path : string, middlewares : Array<RequestHandler>, handler : RequestHandler) => {router.delete(path, middlewares, handler)},
})

function createRouter(routes : Array<WyvernRoute>){
    const router = express.Router();
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const middlewares = (route.authentication) ? [authorization(route.authorization), ...route.middlewares] : route.middlewares
        routerMethods(router)[route.method].call(router, route.path, middlewares, tryCatch(route.handler));
    }
    return router
}

export default createRouter;