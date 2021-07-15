(function () {
    /*-----------------------------------*/
    /* Variables */
    /*-----------------------------------*/
    let inputFile = document.getElementById('input-file')
    const txtFile = document.querySelector('.upload p')
    const rowUpload = document.getElementById('row-upload')
    const btnUpload = document.getElementById('btn-upload')
    const btnCancel = document.getElementById('btn-cancel')
    const listFiles = document.querySelectorAll('#files li p')
    const btnsDeleteFile = document.querySelectorAll('#files li button')

    /*-----------------------------------*/
    /* Eventos */
    /*-----------------------------------*/
    inputFile.addEventListener('change', changeInputFile)
    btnUpload.addEventListener('click', enviarDatos)
    btnCancel.addEventListener('click', () => {
        const padre = inputFile.parentNode

        const input = document.createElement('input')

        input.setAttribute('type', 'file')
        input.setAttribute('id', 'input-file')

        padre.removeChild(inputFile)
        padre.insertBefore(input, txtFile)

        txtFile.innerHTML = '<i class="fas fa-upload"></i>Subir'
        rowUpload.classList.remove('active')

        // recargamos la configuracion del input file
        inputFile = input
        inputFile.addEventListener('change', changeInputFile)
    })
    listFiles.forEach(p => {
        p.addEventListener('click', mostrarArchivo)
    })
    btnsDeleteFile.forEach(btn => {
        btn.addEventListener('click', eliminarArchivo)
    })
    
    /*-----------------------------------*/
    /* Funciones */
    /*-----------------------------------*/
    function insertoArchivo() {
        txtFile.innerHTML = inputFile.files[0].name

        if (!rowUpload.classList.contains('active')) {
            rowUpload.classList.add('active')
        }
    }
    function eliminoArchivo() {
        txtFile.innerHTML = '<i class="fas fa-upload"></i>Subir'

        if (rowUpload.classList.contains('active')) {
            rowUpload.classList.remove('active')
        }
    }
    function changeInputFile() {
        if (inputFile.files.length > 0) {
            insertoArchivo()
        } else {
           eliminoArchivo() 
        }
    }
    async function enviarDatos() {
        var datos = new FormData()

        datos.append('file', inputFile.files[0])

        const config = {
            method: 'POST',
            body: datos
        }
        
        try {
            const res = await fetch('/', config)
            const data = await res.json()
    
            if (!data.error) {
                window.location.reload()
            } else {
                console.log(data);
            }
        } catch (err) {
            console.error(err);
        }
    }
    function mostrarArchivo(e) {
        const p = e.target
        const fileName = p.dataset.file
        
        window.location.href = `/upload/${fileName}`
    }
    async function eliminarArchivo(e) {
        const btn = e.target
        const fileName = btn.dataset.file
        
        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileName
            })
        }

        try {
            const res = await fetch('/', config)
            const data = await res.json()

            if (!data.error) {
                window.location.reload()
            } else {
               console.log(data); 
            }
        } catch (err) {
            console.error(err);
        }
    }
}())