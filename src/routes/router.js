const { Router } = require('express')
const fileUpload = require('express-fileupload')
const moveFile = require('../lib/moveFile')
const exec = require('../lib/exec')

const router = Router()

router.use(fileUpload())
router.get('/', async (req, res) => {
    try {
        const path = __dirname + "/../public/upload"
        const list = await exec(`ls ${path}`)

        let arrayList = list.stdout
        arrayList = arrayList.split('\n')
        arrayList.pop()

        res.render('index', {
            list: arrayList
        })
    } catch (err) {
        console.log(err);
    }
})
router.post('/', async (req, res) => {
    const file = req.files.file

    if (!file) {
        return res.status(400).json({
            error: true,
            mensaje: 'no se ha enviado ningun archivo'
        })
    }

    const path = `${__dirname}/../public/upload/${file.name}`
    
    try {
        await moveFile(file, path)

        res.json({
            error: false,
            mensaje: "archivo guardado satisfactoriamente"
        })
    } catch (err) {
        res.status(400).json({
            error: true,
            mensaje: err
        })
    }
})
router.delete('/', async (req, res) => {
    const { fileName } = req.body
    const path = `${__dirname}/../public/upload/${fileName}`

    try {
        
        const data = await exec(`rm -f ${path}`)

        res.json({
            error: false,
            mensaje: data
        })

    } catch (err) {
        res.status(400).json({
            error: true,
            mensaje: err
        })
    }
})

module.exports = router