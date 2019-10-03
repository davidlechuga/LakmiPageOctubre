let btnSearch = document.getElementById('btn-search'),
    searchBar = document.querySelector('.input-group'),
    evNav = false
/*
.input-group:hover{
   border-color: var(--gray-light-bg);
   width: calc(98vw - 160px - 2*16px);
}
.input-group:hover .form-control{
   visibility: visible;
   width: 95%;
}
*/
if(searchBar && btnSearch){
   let closeSearch = () => {
      searchBar.style = searchBar.firstElementChild.style = null
      evNav = false
   }
   /* Evento en boton de bar search */
   btnSearch.addEventListener('click', e => {
      e.preventDefault()
      e.stopPropagation()
      if(innerWidth >= 768){
         if(!evNav){
            searchBar.style.borderColor = 'var(--gray-light-bg)'
            searchBar.style.width = 'calc(' + document.body.clientWidth + 'px - 125px - 2*16px - 12px)'
            searchBar.style.boxShadow = '0 0 .2rem .1rem rgba(255,255,255,0.25)'
            searchBar.firstElementChild.style.width = 'calc(100% - 50px)'
            setTimeout(() =>{
               searchBar.firstElementChild.style.display = 'inline-block'
               searchBar.firstElementChild.focus()
               evNav = true
            }, 200)
         }else closeSearch()
         searchBar.firstElementChild.value = ''
      }
   })
   /* Eventos en input text de bar search */
   searchBar.firstElementChild.addEventListener('click', e =>{
      e.stopPropagation()
      if(innerWidth < 768)
         searchBar.style.boxShadow = '0 0 .2rem .1rem rgba(255,255,255,0.25)'
   })
   searchBar.firstElementChild.addEventListener('keyup', e =>{
      console.log(`buscar resultados para ${e.keyCode}: ${e.target.value}`)
      if(e.keyCode == 27){
         closeSearch()
         searchBar.firstElementChild.value = ''
      }
   })
   /* Evento en body para cerrar bar search */
   document.body.addEventListener('click', e => {
      if(innerWidth >= 768)
         closeSearch()
      else
         searchBar.style.boxShadow = 'none'
      searchBar.firstElementChild.value = ''
   })
}