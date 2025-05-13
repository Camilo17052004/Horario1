document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const formularioLogin = document.getElementById('validarCampos');
    const mensajeError = document.getElementById('mensajeError');
    const olvidoContraseñaLink = document.getElementById('olvidoContraseñaLink');
    const menuCambioContraseña = document.getElementById('menuCambioContraseña');
    const formCambioContraseña = document.getElementById('formCambioContraseña');
    const mensajeValidacionCorreo = document.getElementById('mensajeValidacionCorreo');
    
    // Variable para controlar el estado del menú flotante
    let menuVisible = false;
    
    // Función para validar formato de correo electrónico
    function validarCorreo(correo) {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(correo);
    }

    // Función para mostrar mensajes de error
    function mostrarMensaje(elemento, mensaje, esError = true) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
        elemento.style.color = esError ? 'red' : 'green';
        elemento.style.padding = '10px';
        elemento.style.marginBottom = '15px';
        elemento.style.backgroundColor = esError ? '#ffeeee' : '#eeffee';
        elemento.style.borderRadius = '5px';
        elemento.style.border = `1px solid ${esError ? 'red' : 'green'}`;

        // Oculta el mensaje después de 3 segundos
        setTimeout(() => {
            elemento.style.display = 'none';
        }, 3000);
    }

    // Manejador para el formulario de login
    if (formularioLogin) {
        formularioLogin.addEventListener('submit', function(event) {
            event.preventDefault();

            // Obtiene los valores ingresados por el usuario
            const usuarioLogin = document.getElementById('usuarioLogin').value.trim();
            const correoLogin = document.getElementById('correoLogin').value.trim();
            const contraseñaLogin = document.getElementById("contraseñaLogin").value;

            // Validar que los campos no estén vacíos
            if (!usuarioLogin || !correoLogin || !contraseñaLogin) {
                mostrarMensaje(mensajeError, 'Todos los campos son obligatorios');
                return;
            }
            
            // Validar formato del correo
            if (!validarCorreo(correoLogin)) {
                mostrarMensaje(mensajeError, 'Por favor, introduce un correo electrónico válido');
                return;
            }

            // Recupera la lista de usuarios registrados
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // Verifica si los datos coinciden con algún usuario registrado
            const usuarioEncontrado = usuarios.find(user =>
                user.usuario === usuarioLogin &&
                user.correo === correoLogin &&
                user.contraseña === contraseñaLogin
            );

            if (usuarioEncontrado) {
                alert('Inicio de sesión exitoso');
                
                // Guarda solo los datos necesarios del usuario para la sesión actual
                localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
                
                // Redirige al usuario a la página de inicio
                window.location.href = '/Assets/html/inicio.html';
            } else {
                // Muestra mensaje de error en caso de datos incorrectos
                mostrarMensaje(mensajeError, 'El usuario, correo o contraseña son incorrectos');
            }
        });
    }

    // Manejador para el enlace "Olvidaste tu contraseña"
    if (olvidoContraseñaLink && menuCambioContraseña) {
        olvidoContraseñaLink.addEventListener('click', function(e) {
            e.preventDefault();
            menuVisible = !menuVisible;
            menuCambioContraseña.style.display = menuVisible ? 'block' : 'none';
        });
    }
    
    // Manejador para el formulario de cambio de contraseña
    if (formCambioContraseña && mensajeValidacionCorreo) {
        formCambioContraseña.addEventListener('submit', function(event) {
            event.preventDefault();
            const correoCambio = document.getElementById('correoCambio').value.trim();
            
            // Validar formato del correo antes de procesar
            if (!validarCorreo(correoCambio)) {
                mostrarMensaje(mensajeValidacionCorreo, 'Por favor, introduce un correo electrónico válido');
                return;
            }
            
            // Aquí iría la lógica para validar el correo con el servidor
            mostrarMensaje(mensajeValidacionCorreo, "Correo validado. Se ha enviado un enlace de recuperación.", false);
        });
    }
});











 // Referencia al enlace "Olvidaste tu contraseña"
        const olvidoContraseñaLink = document.getElementById('olvidoContraseñaLink');
        // Referencia al menú flotante
        const menuCambioContraseña = document.getElementById('menuCambioContraseña');
        
        // Variable para controlar el estado (visible/oculto)
        let menuVisible = false;
        
        // Función para alternar la visibilidad del menú
        olvidoContraseñaLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (menuVisible) {
                menuCambioContraseña.style.display = 'none';
                menuVisible = false;
            } else {
                menuCambioContraseña.style.display = 'block';
                menuVisible = true;
            }
        });
        
        // Formulario de cambio de contraseña
        const formCambioContraseña = document.getElementById('formCambioContraseña');
        const mensajeValidacionCorreo = document.getElementById('mensajeValidacionCorreo');
        
        formCambioContraseña.addEventListener('submit', function(event) {
            event.preventDefault();
            const correoCambio = document.getElementById('correoCambio').value;
            
            // Aquí iría la lógica para validar el correo
            // Por ejemplo, una petición a tu servidor
            
            mensajeValidacionCorreo.textContent = "Correo validado. Se ha enviado un enlace de recuperación.";
        });