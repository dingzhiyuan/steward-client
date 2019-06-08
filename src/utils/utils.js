export function Request_get(url, params) {
    return new Promise((resolv, reject) => {
        this.$axios.get(url, { params: params })
            .then(res => {
                resolv(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function Request_post(url, data) {
    return new Promise((resolv, reject) => {
        this.$axios.post(url, data)
            .then(res => {
                resolv(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function Request_post_headers(headers, url, data) {
    return new Promise((resolv, reject) => {
        this.$axios.post(url, data, { headers: headers })
            .then(res => {
                resolv(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function Request_put(url, data) {
    return new Promise((resolv, reject) => {
        this.$axios.put(url, data)
            .then(res => {
                resolv(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}
export function Request_delete(url, data) {
    return new Promise((resolv, reject) => {
        this.$axios.delete(url, data)
            .then(res => {
                resolv(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}	
