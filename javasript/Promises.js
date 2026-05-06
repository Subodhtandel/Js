lt = 74
lg = 23
const url = 'f7e41ce7e70845cc2b06568cfc7cfb4c'

fetch(url).then(resp => {
    return resp.json()
}).then(result => {
    console.log(result)
}).catch(err => {
    console.log(err)
})