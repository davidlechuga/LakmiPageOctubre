if(innerWidth > 1023) {
    const navItems = document.querySelector('.nav-content_list'),
        progressBar = document.querySelector('.progress-view'),
        porcentNumber = document.querySelector('.percentage-number'),
        mainElement = document.querySelector('main')

    if (!(navItems && progressBar && porcentNumber && mainElement))
        console.warn('Elementos faltantes en el DOM')
    else {
        if(navItems.childElementCount !== mainElement.childElementCount - 1)
            throw "Longitud de elementos en nav lateral y secciones en main no coincide"

        const navListArray = [... navItems.children],
            secListArray = [... mainElement.getElementsByClassName('row')],
            totalSecs = navItems.childElementCount

        let indexSV = 0,
            wheelAccum = 0

        const scrollCheck = (secView, wheelNow) => {
            if(indexSV < 1 && wheelNow === -1) return
            if(indexSV > totalSecs - 2 && wheelNow === 1) return
            
            if((wheelNow === 1 && Math.floor(secView.getBoundingClientRect().bottom) < innerHeight + 2)
                || (wheelNow === -1 && Math.floor(secView.getBoundingClientRect().top) > -2)){
                indexSV += wheelNow
                scrollExecute(secListArray[indexSV], navListArray[indexSV].firstElementChild)
            }
        }
        const scrollExecute = (secToView, linkToActive) => {
            smoothScroll.scrollTo(secToView)
            location.hash = secToView.id
            navListArray[
                navListArray.findIndex(el => el.firstElementChild.classList.length > 1)
            ].firstElementChild.classList.remove('content_link-active')
            changeDataView(linkToActive)
        }
        const changeDataView = (element) => {
            progressBar.style.height = `${Math.round((indexSV + 1)/totalSecs * 100)}%`
            porcentNumber.textContent = Math.floor((indexSV + 1)/totalSecs * 100)
            element.classList.add('content_link-active')
        }
        navItems.addEventListener('click', e => {
            if(e.target.getAttribute('href') !== null){
                e.preventDefault()
                if(e.target.getAttribute('href') === location.hash) return
                indexSV = navListArray.findIndex(el => el.firstElementChild === e.target)
                scrollExecute(secListArray[indexSV], e.target)
            }
        })
        mainElement.addEventListener('wheel', e => {
            wheelAccum += e.deltaY
            if( Math.abs(wheelAccum) > 0.9) {
                indexSV = secListArray.findIndex(el => el.id === location.hash.slice(1))
                scrollCheck(secListArray[indexSV], wheelAccum > 0 ? 1 : -1)
                wheelAccum = 0
            }
        })

        if(location.hash.length === 0)
            location.hash = secListArray[0].id
        else indexSV = navListArray.findIndex(el => 
            el.firstElementChild.getAttribute('href') === location.hash)
        
        changeDataView(navListArray[indexSV].firstElementChild)
    }
}