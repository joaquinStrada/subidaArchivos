const fs = require('fs')

const moveFile = (file, path) => {
    return new Promise((resolve, reject) => {
        fs.promises.access(path)
        .then(() => reject(new Error(`El archivo ${file.name} ya existe`)))
        .catch(() => {
            file.mv(path, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    })
}

module.exports = moveFile