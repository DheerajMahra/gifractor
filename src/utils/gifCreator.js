export const gifCreator = options =>
    new Promise( (resolve, reject) => {
        window.gifshot.createGIF(options, obj => {
            !obj.error ?
            resolve(obj.image) :
            reject(obj.errorMsg)
        })
    })