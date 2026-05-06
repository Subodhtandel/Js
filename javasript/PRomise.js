const add = (a, b) => {
    return new Promise((resolve, reject) => {
        var sum = a + b
        if (sum > 100){
            resolve(sum)
        }
        else {
            reject('invalid sum')
        }
    })
}

const square = (a) => {
    return new Promise((resolve, reject) => {
        var sq = (a * a)
    })
}

const cube = (a) => {
    return new Promise((resolve, reject) => {
        var cb = (a * a * a)
    })
}

add(10,200)


const myfun = async () => {
    try {
        var sum = await add(10,20)
        var sq = await square(sum)
        var cb = await cube(sq)
        console.log(cb)
    } catch (error) {
        console.error(error)
    }
}
myfun()