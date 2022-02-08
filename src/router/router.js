import VueRouter from 'vue-router'
import Countries from '../views/Countries'
import Cities from '../views/Cities'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'countries',
            component: Countries
        },
        {
            path: '/cities',
            name: 'cities',
            component: Cities,
            props: true
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     if (!to.meta.middleware) {
//         return next()
//     }
//     const middleware = to.meta.middleware

//     const context = {
//         to,
//         from,
//         next,
//         store
//     }
//     return middleware[0]({
//         ...context,
//         next: middlewarePipeline(context, middleware, 1)
//     })
// })

export default router;