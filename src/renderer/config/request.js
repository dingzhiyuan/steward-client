import axios from 'axios'

export function request_get(url, params) {
    return new Promise((resolv, reject) => {
        axios.get(url, { params: params })
            .then(res => {
                resolv(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function request_post(url, data) {
    return new Promise((resolv, reject) => {
        axios.post(url, data)
            .then(res => {
                resolv(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function request_post_headers(headers, url, data) {
    return new Promise((resolv, reject) => {
        axios.post(url, data, { headers: headers })
            .then(res => {
                resolv(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function request_put(url, data) {
    return new Promise((resolv, reject) => {
        axios.put(url, data)
            .then(res => {
                resolv(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}
export function request_delete(url, data) {
    return new Promise((resolv, reject) => {
        axios.delete(url, data)
            .then(res => {
                resolv(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}	
