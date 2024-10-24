import express from 'express'
import authorization from '../middlewares/authorization'
import { WyvernRoute } from '../types'

const routerMethods = (router) => ({
    GET: (path, middlewares, handler) => {router.get(path, middlewares, handler)},
    POST: (path, middlewares, handler) => {router.post(path, middlewares, handler)},
    PUT: (path, middlewares, handler) => {router.put(path, middlewares, handler)},
    DELETE: (path, middlewares, handler) => {router.delete(path, middlewares, handler)},
})

function createRouter(routes : Array<WyvernRoute>){
    const router = express.Router();
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const middlewares = (route.authentication) ? [authorization(route.authorization), ...route.middlewares] : route.middlewares
        routerMethods(router)[route.method].call(this, route.path, middlewares, route.handler);
    }
    return router
}

export default createRouter;