let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){
    //oculto el menu una vez que selecciono una opcion
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("python");
        habilidades[1].classList.add("mysql");
        habilidades[2].classList.add("angular");
        habilidades[3].classList.add("php");
        habilidades[4].classList.add("pxp");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
    }
}


//detecto el scrolling para aplicar la animacion de la barra de habilidades y las tarjetas
window.onscroll = function(){
    efectoHabilidades();
    animarTarjetas();
}

// Función para animar tarjetas cuando aparecen en viewport
function animarTarjetas(){
    // Animar sección "Sobre Mí"
    animarElementos('.sobremi .col', 300);
    animarElementos('.sobremi button', 300);

    // Animar Skills
    animarElementos('.skills .col', 300);

    // Animar Curriculum
    animarElementos('.curriculum .item', 200);

    // Animar Portfolio
    animarElementos('.portfolio .proyecto', 200);
}

function animarElementos(selector, offsetActivacion){
    const elementos = document.querySelectorAll(selector);
    elementos.forEach(elemento => {
        const distancia = window.innerHeight - elemento.getBoundingClientRect().top;
        if(distancia >= offsetActivacion && !elemento.classList.contains('animate')){
            elemento.classList.add('animate');
        }
    });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', function(){
    animarTarjetas();
});

// Lightbox para galería BOA
let currentImageIndex = 0;
const images = [
    { src: 'Imagenes/B1.png', caption: 'Vista principal del sistema - Dashboard y módulo de gestión de herramientas' },
    { src: 'Imagenes/B2.png', caption: 'Módulo de gestión - Control de inventario y trazabilidad' },
    { src: 'Imagenes/B3.png', caption: 'Panel de reportes - Análisis y auditoría de movimientos' }
];

function abrirLightbox() {
    document.getElementById('lightbox-boa').style.display = 'block';
    document.body.style.overflow = 'hidden';
    mostrarImagen(0);
}

function cerrarLightbox() {
    document.getElementById('lightbox-boa').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function cambiarImagen(direction) {
    currentImageIndex += direction;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    mostrarImagen(currentImageIndex);
}

function mostrarImagen(index) {
    currentImageIndex = index;
    document.getElementById('lightbox-img').src = images[index].src;
    document.querySelector('.lightbox-caption').textContent = images[index].caption;

    // Actualizar thumbnails activos
    document.querySelectorAll('#thumbnails-boa .thumb').forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Galería para otros proyectos
const proyectosImagenes = {
    1: [
        { src: 'Imagenes/Proyecto1.png', caption: 'Página principal de la tienda online' },
        { src: 'Imagenes/Proyecto1.png', caption: 'Vista detallada del sistema' },
        { src: 'Imagenes/Proyecto1.png', caption: 'Panel de administración' }
    ],
    2: [
        { src: 'Imagenes/Config.jpeg', caption: 'Configuración y mantenimiento de equipos' },
        { src: 'Imagenes/F4.jpg', caption: 'Soporte técnico especializado' },
        { src: 'Imagenes/F5.jpg', caption: 'Mantenimiento preventivo' },
        { src: 'Imagenes/F3.jpg', caption: 'Instalación de sistemas' }
    ],
    3: [
        { src: 'Imagenes/Proyecto2.png', caption: 'Página principal del restaurante' },
        { src: 'Imagenes/Proyecto2.png', caption: 'Menú interactivo' },
        { src: 'Imagenes/Proyecto2.png', caption: 'Sistema de reservas' }
    ]
};

let currentProyectoIndex = {};

function abrirLightboxProyecto(proyectoId) {
    const lightbox = document.getElementById(`lightbox-proyecto-${proyectoId}`);
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Crear thumbnails
    const thumbnailsContainer = document.getElementById(`thumbnails-${proyectoId}`);
    thumbnailsContainer.innerHTML = '';
    proyectosImagenes[proyectoId].forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img.src;
        thumb.alt = img.caption;
        thumb.className = index === 0 ? 'thumb active' : 'thumb';
        thumb.setAttribute('data-index', index);
        thumb.onclick = () => mostrarImagenProyecto(proyectoId, index);
        thumbnailsContainer.appendChild(thumb);
    });

    mostrarImagenProyecto(proyectoId, 0);
}

function cerrarLightboxProyecto(proyectoId) {
    document.getElementById(`lightbox-proyecto-${proyectoId}`).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function cambiarImagenProyecto(proyectoId, direction) {
    const images = proyectosImagenes[proyectoId];
    if (!currentProyectoIndex[proyectoId]) {
        currentProyectoIndex[proyectoId] = 0;
    }

    currentProyectoIndex[proyectoId] += direction;
    if (currentProyectoIndex[proyectoId] >= images.length) {
        currentProyectoIndex[proyectoId] = 0;
    } else if (currentProyectoIndex[proyectoId] < 0) {
        currentProyectoIndex[proyectoId] = images.length - 1;
    }

    mostrarImagenProyecto(proyectoId, currentProyectoIndex[proyectoId]);
}

function mostrarImagenProyecto(proyectoId, index) {
    currentProyectoIndex[proyectoId] = index;
    const images = proyectosImagenes[proyectoId];

    document.getElementById(`lightbox-img-${proyectoId}`).src = images[index].src;
    document.getElementById(`caption-${proyectoId}`).textContent = images[index].caption;

    // Actualizar thumbnails activos
    document.querySelectorAll(`#thumbnails-${proyectoId} .thumb`).forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Cerrar con ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarLightbox();
        cerrarLightboxProyecto(1);
        cerrarLightboxProyecto(2);
        cerrarLightboxProyecto(3);
    }
});

// Cerrar al hacer clic fuera de la imagen
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('lightbox')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}); 