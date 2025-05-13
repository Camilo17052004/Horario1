// Almacenar roles y sus permisos
let rolesPermissions = {
    aprendiz: ['mis-horarios', 'asistencias', 'eventos-mes'],
    instructor: ['horario-personalizado', 'solicitar-cambio', 'eventos-mes', 'crear-horario'],
    admin: ['crear-horario', 'solicitud-instructores', 'registro-usuarios', 'permisos-menu', 'config-usuarios', 'editar-horario', 'notificaciones']
};

// Función para alternar la visibilidad de los submenús
function toggleSubmenu(id) {
    const submenu = document.getElementById(id + '-submenu');
    if (submenu.classList.contains('active')) {
        submenu.classList.remove('active');
    } else {
        // Cerrar todos los submenús abiertos
        document.querySelectorAll('.submenu').forEach(el => {
            el.classList.remove('active');
        });
        submenu.classList.add('active');
    }
}

// Función para mostrar la sección seleccionada
function showSection(section) {
    // Implementar mostrar secciones
    showNotification(`Sección ${section} seleccionada`);
}

// Función para manejar el cambio de rol
function handleRoleChange() {
    const roleSelect = document.getElementById('roleSelect');
    const selectedRole = roleSelect.value;
    
    // Actualizar el título de la página
    document.querySelectorAll('.page-title').forEach(title => {
        title.style.display = 'none';
    });
    document.querySelector(`.${selectedRole}-title`).style.display = 'inline-block';
    
    // Habilitar o deshabilitar permisos según el rol seleccionado
    document.querySelectorAll('.permission-card').forEach(card => {
        const permissionId = card.getAttribute('data-permission');
        const roleAttr = card.getAttribute('data-role');
        const rolesList = roleAttr ? roleAttr.split(',') : [];
        const lockIcon = card.querySelector('.lock-icon');
        
        // Restablecer el estado de la tarjeta
        card.classList.remove('active', 'disabled');
        
        if (rolesList.includes(selectedRole)) {
            // Este permiso es relevante para este rol
            card.classList.remove('disabled');
            
            // Verificar si este rol tiene este permiso por defecto
            if (rolesPermissions[selectedRole].includes(permissionId)) {
                lockIcon.classList.remove('locked');
                lockIcon.classList.add('unlocked');
                lockIcon.innerHTML = '🔓';
                card.classList.add('active');
            } else {
                lockIcon.classList.remove('unlocked');
                lockIcon.classList.add('locked');
                lockIcon.innerHTML = '🔒';
            }
        } else {
            // Este permiso no es relevante para este rol
            card.classList.add('disabled');
            lockIcon.classList.remove('unlocked');
            lockIcon.classList.add('locked');
            lockIcon.innerHTML = '🔒';
        }
    });
}

// Función para alternar el permiso
function togglePermission(event) {
    const card = event.currentTarget;
    
    // Verificar si la tarjeta está deshabilitada
    if (card.classList.contains('disabled')) {
        return;
    }
    
    const permissionId = card.getAttribute('data-permission');
    const lockIcon = card.querySelector('.lock-icon');
    const roleSelect = document.getElementById('roleSelect');
    const selectedRole = roleSelect.value;

    // Alternar el estado de bloqueo
    if (lockIcon.classList.contains('locked')) {
        lockIcon.classList.remove('locked');
        lockIcon.classList.add('unlocked');
        lockIcon.innerHTML = '🔓';
        card.classList.add('active');
        
        // Agregar el permiso al rol si no está ya allí
        if (!rolesPermissions[selectedRole].includes(permissionId)) {
            rolesPermissions[selectedRole].push(permissionId);
        }
    } else {
        lockIcon.classList.remove('unlocked');
        lockIcon.classList.add('locked');
        lockIcon.innerHTML = '🔒';
        card.classList.remove('active');
        
        // Eliminar el permiso del rol
        const index = rolesPermissions[selectedRole].indexOf(permissionId);
        if (index > -1) {
            rolesPermissions[selectedRole].splice(index, 1);
        }
    }
}

// Función para guardar los cambios
function saveChanges() {
    // Simular guardar los cambios
    showNotification('Cambios guardados correctamente');
}

// Función para mostrar la notificación
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Configuración inicial
document.addEventListener('DOMContentLoaded', function() {
    // Establecer el rol predeterminado y manejar la configuración inicial
    handleRoleChange();
    
    // Agregar evento de clic a las tarjetas de permiso
    document.querySelectorAll('.permission-card').forEach(card => {
        card.addEventListener('click', togglePermission);
    });
    
    // Mostrar el título de la página inicial
    document.querySelector('.aprendiz-title').style.display = 'inline-block';
});
