const indicarSitioBtn = document.getElementById('indicarSitio');
const contenidoIndicar = document.getElementById('contenidoIndicar');
const volverIndicarBtn = document.getElementById('volverIndicar');
const indicarBtn = document.getElementById('indicar');
const listaUbicaciones = document.getElementById('listaUbicaciones');

const buscarSitioBtn = document.getElementById('buscarSitio');
const contenidoBuscar = document.getElementById('contenidoBuscar');
const volverBuscarBtn = document.getElementById('volverBuscar');
const busquedaInput = document.getElementById('busqueda');
const resultadosBusqueda = document.getElementById('resultadosBusqueda');

let ubicacionesGuardadas = [];

indicarSitioBtn.addEventListener('click', () => {
    document.getElementById('paginaPrincipal').style.display = 'none';
    contenidoIndicar.style.display = 'block';
});

volverIndicarBtn.addEventListener('click', () => {
    document.getElementById('paginaPrincipal').style.display = 'block';
    contenidoIndicar.style.display = 'none';
});

buscarSitioBtn.addEventListener('click', () => {
    document.getElementById('paginaPrincipal').style.display = 'none';
    contenidoBuscar.style.display = 'block';
});

volverBuscarBtn.addEventListener('click', () => {
    document.getElementById('paginaPrincipal').style.display = 'block';
    contenidoBuscar.style.display = 'none';
});

indicarBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarUbicacion, errorUbicacion);
    } else {
        listaUbicaciones.innerHTML = "<li>Geolocalización no soportada</li>";
    }
});

function mostrarUbicacion(posicion) {
    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}`)
        .then(response => response.json())
        .then(data => {
            const direccion = data.display_name;
            agregarUbicacionALista(direccion, listaUbicaciones);
            ubicacionesGuardadas.push(direccion);
        });
}

function errorUbicacion() {
    listaUbicaciones.innerHTML = "<li>Error al obtener la ubicación</li>";
}

busquedaInput.addEventListener('input', () => {
    const terminoBusqueda = busquedaInput.value.toLowerCase();
    const resultadosFiltrados = ubicacionesGuardadas.filter(ubicacion => 
        ubicacion.toLowerCase().includes(terminoBusqueda)
    );
    mostrarResultadosBusqueda(resultadosFiltrados);
});

function mostrarResultadosBusqueda(resultados) {
    resultadosBusqueda.innerHTML = '';
    resultados.forEach(resultado => {
        agregarUbicacionALista(resultado, resultadosBusqueda);
    });
}

function agregarUbicacionALista(direccion, lista) {
    const li = document.createElement('li');
    li.textContent = direccion;
    li.addEventListener('click', () => {
        const urlGoogleMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
        window.open(urlGoogleMaps, '_blank');
    });
    lista.appendChild(li);
}
