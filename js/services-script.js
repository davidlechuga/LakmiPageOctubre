const arrElSL = [... document.querySelectorAll('ul.services__list > li > .list-group-item-action')],
    arrSubList = [... document.querySelectorAll('.sublist-group')]

if(!(arrSubList.length && arrElSL.length))
    throw "inconsistencia entre elementos con sub-listas"

let lastElemAct, linkUncle, lastSubLink, responseActive, arrSubElAct
const removeClassActive = (e) => {
        e.preventDefault()
        if(isElementAct(arrSubList, e.target.nextElementSibling, 4) > 0)
            lastElemAct[0].classList.remove('show','active')
    },
    toggleItemActive = (e) => {
        if(!e.target.getAttribute('href')) return
        e.preventDefault()
        linkUncle = e.target.parentElement.parentElement.previousElementSibling
        responseActive = isElementAct(arrElSL, linkUncle, 3)
        if(responseActive > 0){
            lastElemAct[0].classList.remove('active')
            linkUncle.classList.add('active')
        } else if(responseActive === -1) linkUncle.classList.add('active')
        arrSubElAct = [... arrSubList.map(el => el.querySelector('.list-group-item-action.active'))].filter(el => el !== null)
        if(arrSubElAct.length > 0)
            arrSubElAct.forEach(el => el.classList.remove('active'))
    },
    isElementAct = (arrItems, elSubList, threshold) => {
        lastElemAct = arrItems.filter(el => el.classList.length > threshold)
        if(lastElemAct.length){
            if(elSubList !== lastElemAct[0]) return 1
        } else return -1
        return 0
    }

arrElSL.forEach(el => el.addEventListener('click', removeClassActive))
arrSubList.forEach(el => el.addEventListener('click', toggleItemActive))