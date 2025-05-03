document.addEventListener('DOMContentLoaded',function(){
    navegacionFija();
    resaltarEnlace();
    scrollnav();
})
function navegacionFija(){
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')
    //window es lo general es padre de document.
    //aunque igual se puede usar document
    document.addEventListener('scroll', function(){
        // console.log(sobreFestival.getBoundingClientRect().bottom);
        if(sobreFestival.getBoundingClientRect().bottom < 1150){
            header.classList.add('fixed');
        }else{
            header.classList.remove('fixed');
        }
    })
}

function resaltarEnlace(){
    document.addEventListener('scroll',()=>{
        //queryselectorAll retorna un arreglo con todos los elementos
        const section = document.querySelectorAll('section')
        const navlink = document.querySelectorAll('.navegacion-principal a')
        let actual = '';

        //primero iteramos sobre las secciones
        section.forEach(section=>{
            //mide la distancia que tiene el elemento con el body
            const sectionTop = section.offsetTop
            //mide cuanto mide un elemento de altura de acuerdo a px
            const sectionHeight = section.clientHeight

            //detectamos si ya dimos scroll hasta 
            //esta operacion es para ver que seccion está más visible
            if(window.scrollY >=(sectionTop - sectionHeight / 3)){
                actual =section.id;
            }
        }) 
        navlink.forEach(link =>{
            link.classList.remove('active')
            //getatribute, obtiene el atributo dependiendo del paramentro html
            if(link.getAttribute('href')==='#'+ actual){
                link.classList.add('active')
            }
        })
    })
}

function scrollnav(){
    const navlinks = document.querySelectorAll('.navegacion-principal a')
    navlinks.forEach(link =>{
        link.addEventListener('click',e =>{
            //eliminamos lo que tenemos en cuestion a default
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

           section.scrollIntoView({behavior: 'smooth'});
             
        })
    })
}