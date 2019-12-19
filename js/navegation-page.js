if(innerWidth > 1023) {
    let navItems = document.querySelector('.nav-content_list'),
        progressBar = document.querySelector('.progress-view'),
        porcentNumber = document.querySelector('.percentage-number')
    if (!(navItems && progressBar && porcentNumber))
        console.warn('Elementos faltantes en el DOM')
    else {
        const totalSecs = navItems.childElementCount,
              navList = [... navItems.children]
        let nextSec = 0

        const changeDataView = (element) => {
            progressBar.style.height = `${Math.round(nextSec/totalSecs * 100)}%`
            porcentNumber.textContent = Math.floor(nextSec/totalSecs * 100)
            element.classList.add('content_link-active')
        }
        navItems.addEventListener('click', e => {
            if(e.target.getAttribute('href') !== null){
                if(e.target.getAttribute('href') === location.hash){
                    e.preventDefault()
                    return
                }
                nextSec = navList.findIndex(el => el.firstElementChild === e.target) + 1
                navList[
                    navList.findIndex(el => [... el.firstElementChild.classList].length > 1)
                ].firstElementChild.classList.remove('content_link-active')
                changeDataView(e.target)
            }
        })

        if(location.hash.length === 0){
            location.hash = navList[0].firstElementChild.getAttribute('href')
        } else {
        nextSec = navList.findIndex(el => 
            el.firstElementChild.getAttribute('href') === location.hash)
        }
        changeDataView(navList[nextSec++].firstElementChild)
    }
}