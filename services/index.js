import axios from 'axios';
import { YELP_API_KEY } from "../configs/ApiKeys";


const api = axios.create({
    baseURL: 'https://api.yelp.com/v3',
    headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
    },
})

const getBars = userLocation => {
    return api
        .get('/businesses/search', {
            params: {
                limit: 10,
                categories: 'beer,bar,pub,irish,german,restaurant',
                ...userLocation,
            },
        })
        .then(res =>
            res.data.businesses.map(business => {
                return {
                    name: business.name,
                    coords: business.coordinates,
                    // rating: business.rating,
                    // categories: business.categories,
                    address: business.location.address1,
                    price: business.price,
                    hours: business.hours

                }
            })
        )
        .catch(error => console.error(error))
}

export default {
    getBars,
}
