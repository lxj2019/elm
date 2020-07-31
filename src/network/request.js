//封装axios

import axios from 'axios'

export function request(config) {
     const instance =  axios.create({

    })
    return instance(config)
}
