document.getElementById('llenarCampos').addEventListener('submit', function(event) {
    event.preventDefault();

    // Se crea el objeto de usuario con los datos del formulario
    let nuevoUsuario = {
        nombre: document.getElementById('nombre').value,
        usuario: document.getElementById('nombreUsuario').value,
        telefono: document.getElementById('numeroTelefono').value,
        correo: document.getElementById('correo').value,
        contraseña: document.getElementById('contraseña').value,
        tipoDocumento: document.getElementById('tiposDocumentos').value,
        numeroDocumento: document.getElementById('numeroDocumento').value,
        rolUsuario: document.getElementById('roles').value,
    };

    // Recupera los usuarios que ya están creados
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica si ya existe un usuario con ese correo
    if (usuarios.some(u => u.correo === nuevoUsuario.correo)) {
        alert("Ya existe un usuario con ese correo.");
        return;
    }

    // Añade el nuevo usuario al array de usuarios
    usuarios.push(nuevoUsuario);

    // Guarda el array actualizado en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Almacena el usuario para la sesión actual
    localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));

    // Redirige al usuario según su rol
    switch(nuevoUsuario.rolUsuario) {
        case 'Administrador':
            window.location.href = '/Assets/html/administrador.html';
            break;
        case 'Instructor':
            window.location.href = '/Assets/html/instructor.html';
            break;
        case 'Aprendiz':
            window.location.href = '/Assets/html/aprendiz.html';
            break;
        default:
            window.location.href = '/Assets/html/inicio.html';
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const formularioRegistro = document.getElementById('formularioRegistro');
    const mensajeError = document.getElementById('mensajeError');
    const mensajeExito = document.getElementById('mensajeExito');

    // Función para validar formato de correo electrónico
    function validarCorreo(correo) {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexCorreo.test(correo);
    }

    // Función para mostrar mensajes
    function mostrarMensaje(elemento, mensaje, tipo) {
        elemento.textContent = mensaje;
        elemento.style.display = 'block';
        
        if (tipo === 'error') {
            elemento.style.color = 'red';
            elemento.style.backgroundColor = '#ffeeee';
            elemento.style.border = '1px solid red';
        } else {
            elemento.style.color = 'green';
            elemento.style.backgroundColor = '#eeffee';
            elemento.style.border = '1px solid green';
        }
        
        elemento.style.padding = '10px';
        elemento.style.marginBottom = '15px';
        elemento.style.borderRadius = '5px';
    }

    if (formularioRegistro) {
        formularioRegistro.addEventListener('submit', function (event) {
            event.preventDefault();
            
            // Obtener los valores de los campos
            const usuario = document.getElementById('usuarioRegistro').value.trim();
            const correo = document.getElementById('correoRegistro').value.trim();
            const contraseña = document.getElementById('contraseñaRegistro').value;
            const confirmarContraseña = document.getElementById('confirmarContraseña').value;
            const rolUsuario = document.getElementById('rolUsuario').value;
            
            // Limpiar mensajes anteriores
            mensajeError.style.display = 'none';
            mensajeExito.style.display = 'none';
            
            // Validar que los campos no estén vacíos
            if (!usuario || !correo || !contraseña || !confirmarContraseña || !rolUsuario) {
                mostrarMensaje(mensajeError, 'Todos los campos son obligatorios', 'error');
                return;
            }
            
            // Validar formato del correo
            if (!validarCorreo(correo)) {
                mostrarMensaje(mensajeError, 'Por favor, introduce un correo electrónico válido', 'error');
                return;
            }
            
            // Validar que las contraseñas coincidan
            if (contraseña !== confirmarContraseña) {
                mostrarMensaje(mensajeError, 'Las contraseñas no coinciden', 'error');
                return;
            }
            
            // Validar longitud mínima de contraseña
            if (contraseña.length < 6) {
                mostrarMensaje(mensajeError, 'La contraseña debe tener al menos 6 caracteres', 'error');
                return;
            }
            
            // Obtener usuarios existentes o inicializar array
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            
            // Verificar si ya existe un usuario con ese correo
            const existeUsuario = usuarios.some(u => u.correo === correo);
            
            if (existeUsuario) {
                mostrarMensaje(mensajeError, 'Ya existe un usuario con ese correo electrónico', 'error');
                return;
            }
            
            // Crear nuevo usuario
            const nuevoUsuario = {
                usuario: usuario,
                correo: correo,
                contraseña: contraseña, // En una aplicación real, usar hash
                rolUsuario: rolUsuario
            };
            
            // Agregar el nuevo usuario al array
            usuarios.push(nuevoUsuario);
            
            // Guardar en localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            
            // Mostrar mensaje de éxito
            mostrarMensaje(mensajeExito, 'Usuario registrado con éxito', 'exito');
            
            // Limpiar formulario
            formularioRegistro.reset();
            
            // Opcional: redirigir después de un tiempo
            setTimeout(function() {
                window.location.href = '/index.html';
            }, 2000);
        });
    }
});