document.addEventListener('DOMContentLoaded',function(){
    CrearGaleria();
})

//creamos la galeria con js
function CrearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes')
    const cantidadImagenes= 16;
    for (let i = 1; i<=cantidadImagenes; i++){
        const imagen = document.createElement('PICTURE')
        imagen.innerHTML = `
        <source srcset="img/gallery/thumb/${i}.avif" type="image/avif">
        <source srcset="img/gallery/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="img/gallery/thumb/${i}.jpg" alt="imagen galeria">
    `;
       

        //Event Handler->el proceso de detectar y responder el estado del usuario
        imagen.onclick = function(){
            mostrarImagen(i)
        }

        galeria.appendChild(imagen)
    }
}

function mostrarImagen(i){
    //cargamos imagenes
    const imagen = document.createElement('PICTURE')
    imagen.innerHTML = `
        <source srcset="img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="img/gallery/full/${i}.jpg" alt="imagen galeria">
    `;
       
    // generar modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;
    //boton cerrar modal
    const CerrarModalBtn = document.createElement('BUTTON')
    CerrarModalBtn.textContent = 'X';
    CerrarModalBtn.classList.add('btn-cerrar') 
    CerrarModalBtn.onclick = cerrarModal;

    //agregamos la imagen
    modal.appendChild(imagen)
    //agregamos el boton
    modal.appendChild(CerrarModalBtn)

    //creamos el body al html
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    //agregamos el modal
    body.appendChild(modal);

}

function cerrarModal(){
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')
    setTimeout(()=>{
        modal?.remove()

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    },500)
    
}