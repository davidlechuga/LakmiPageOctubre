let arrayRegistries = []
fetch('/data/catalogo-secciones.json')
    .then( data => data.json() )
    .then(data => arrayRegistries = data)
    .catch(e => {
        console.warn('Ocurrió un error en petición')
    })

document.addEventListener('DOMContentLoaded', () => {
    let bufferResults = document.createDocumentFragment()
    const tempEmptyResults = `<li class="result-item">Sin coincidencias</li>`

    const btnOpenSearch = document.getElementById('btn-serach'),
        dialogSearch = document.querySelector('.dialog-search'),
        inputSearch = document.getElementById('input-search'),
        boxResults = dialogSearch.querySelector('.box-results'),
        styleSheetIS = [... document.styleSheets[2].cssRules].find(el => el.selectorText === '.dialog-search__input').style
    
    if(!(btnOpenSearch && dialogSearch && inputSearch && boxResults && styleSheetIS ))
        throw "Elementos faltantes en el DOM"

    let searchKeys, searchKeysPre, arrayResults, regExpTest, valueDebug

    const toggleDialogShow = () => {
        document.body.classList.toggle('DS--open')
        dialogSearch.classList.toggle('dialog-search--show')
    },
    resetElementsSearch = () => {
        boxResults.innerHTML = ''
        boxResults.classList.remove('box-results--notEmpty')
        inputSearch.classList.remove('DS__input--borderB')
    },
    openDialogSearch = () => {
        styleSheetIS.setProperty('visibility', 'visible')
        inputSearch.value = ''
        dialogSearch.classList.remove('dialog-search--hidden')
        resetElementsSearch()
        toggleDialogShow()
        inputSearch.focus()
    },
    closeDialogSearch = () => {
        styleSheetIS.setProperty('visibility', 'inherit')
        dialogSearch.classList.add('dialog-search--hidden')
        toggleDialogShow()
    },
    performSearch = () => {
        if(!arrayRegistries.length) return
        regExpTest = new RegExp(`^(?=.*${searchKeys.join(')(?=.*')}).*$`,"gi")
        arrayResults = arrayRegistries.filter(el => regExpTest.test(el.keys))
        putResultsDOM()
    },
    putResultsDOM = () => {
            bufferResults.innerHTML = ''
        for (const registryFound of arrayResults) {
            bufferResults.innerHTML += 
            `<li class="result-item">
                <a class="link-result" href="${registryFound.href}">${registryFound.titulo}</a>
            </li>`
        }
        boxResults.innerHTML = bufferResults.innerHTML.length
                                    ? bufferResults.innerHTML
                                    : tempEmptyResults
        boxResults.classList.add('box-results--notEmpty')
        inputSearch.classList.add('DS__input--borderB')
    },
    inputValueChange =  e => {
        if(!inputSearch.value.length) return
        else if(e.inputType === "insertText"){
            if(e.data === ' ' && inputSearch.value[inputSearch.value.length-2] === ' '){
                inputSearch.value = inputSearch.value.substring(0,inputSearch.value.length-1)
                return
            } else if(/[^à-ÿa-z\d\s]/gi.test(inputSearch.value)){
                 valueDebug = inputSearch.value.match(/[à-ÿa-z\d\s]/gi)
                 inputSearch.value = valueDebug
                                        ? valueDebug.join('')
                                        : ""
                return
            }
        }
        searchKeysPre = inputSearch.value.trim().split(' ')
        searchKeys = [... new Set(searchKeysPre.filter(word => word.length > 2))]
        searchKeys.length ? performSearch() : resetElementsSearch()
    }

    btnOpenSearch.addEventListener('click', openDialogSearch)
    dialogSearch.addEventListener('click', e => {
        e.stopPropagation()
        if(e.target === dialogSearch) closeDialogSearch()
    })
    inputSearch.parentElement.addEventListener('submit', e => e.preventDefault())
    inputSearch.addEventListener('keydown', e => {
        if(e.keyCode == 27) closeDialogSearch()
    })
    inputSearch.addEventListener('input', inputValueChange)
})