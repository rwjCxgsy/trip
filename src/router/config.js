import Map from '~src/views/map'
import Trip from '~src/views/trip'

const router = [
    {
        path: '/',
        exact: true,
        component: Map,
        routes: [
            {
                path: '/trip',
                exact: true,
                component: Trip
            }
        ]
    }
]

export {router}