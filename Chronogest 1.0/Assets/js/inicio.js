document.addEventListener('DOMContentLoaded', function () {
    // Recupera los datos del usuario actual del localStorage
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));

    if (usuarioActual) {
        // Muestra los datos en el perfil de usuario
        document.getElementById('nombreUsuario').textContent = usuarioActual.usuario;
        document.getElementById('rolUsuario').textContent = usuarioActual.rolUsuario;
        document.getElementById('correoUsuario').textContent = usuarioActual.correo;
        
        // Llamar a la función para ocultar/mostrar elementos del menú según el rol
        ocultarMenuSegunRol(usuarioActual.rolUsuario);
    } else {
        // Si no hay usuario actual, redirige al inicio de sesión
        console.log('No hay usuario logueado');
        window.location.href = '/index.html';
        return;
    }

    // Muestra la lista de todos los usuarios registrados
    const usuariosList = document.getElementById('usuariosList');
    if (usuariosList) {  // Verificar que el elemento exista
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Limpia la lista antes de agregar elementos
        usuariosList.innerHTML = '';
        
        // Agrega cada usuario a la lista
        usuarios.forEach(usuario => {
            const userElement = document.createElement('li');
            userElement.textContent = `${usuario.usuario} - ${usuario.rolUsuario} - ${usuario.correo}`;
            usuariosList.appendChild(userElement);
        });
    }
});

// Función para ocultar/mostrar elementos del menú según el rol del usuario
function ocultarMenuSegunRol(rol) {
    console.log('Rol del usuario:', rol);
    
    // Obtén todos los elementos con clases específicas de rol
    const elementosAdmin = document.querySelectorAll('.menu-admin');
    const elementosUsuario = document.querySelectorAll('.menu-usuario');
    const elementosSupervisor = document.querySelectorAll('.menu-supervisor');
    
    // Por defecto, oculta todos los elementos específicos de rol
    elementosAdmin.forEach(elem => elem.style.display = 'none');
    elementosUsuario.forEach(elem => elem.style.display = 'none');
    elementosSupervisor.forEach(elem => elem.style.display = 'none');
    
    // Muestra solo los elementos correspondientes al rol del usuario actual
    if (rol) {
        rol = rol.toLowerCase(); // Convertir a minúsculas para comparación
        
        switch (rol) {
            case 'administrador':
                elementosAdmin.forEach(elem => elem.style.display = '');
                break;
            case 'usuario':
                elementosUsuario.forEach(elem => elem.style.display = '');
                break;
            case 'supervisor':
                elementosSupervisor.forEach(elem => elem.style.display = '');
                break;
            default:
                console.log('Rol no reconocido:', rol);
        }
    }
    
    console.log('Elementos de menú actualizados según el rol:', rol);
}
        document.getElementById('btnCerrarSesion').addEventListener('click', function() {
            localStorage.removeItem('usuarioActual');
            window.location.href = '/index.html';
        });