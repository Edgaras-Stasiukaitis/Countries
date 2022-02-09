import VueRouter from 'vue-router'
import Countries from '../views/Countries'
import Cities from '../views/Cities'

export default new VueRouter({
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