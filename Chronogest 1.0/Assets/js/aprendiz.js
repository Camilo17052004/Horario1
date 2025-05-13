// Toggle user type dropdown (just for demonstration - not in mockups)
        document.querySelector('.user-type').addEventListener('click', function() {
            const userTypeText = document.getElementById('userTypeText');
            const arrow = this.querySelector('.arrow');
            
            if (userTypeText.textContent === 'Aprendiz') {
                userTypeText.textContent = 'Admin';
            } else {
                userTypeText.textContent = 'Aprendiz';
            }
            
            arrow.classList.toggle('rotate');
        });
        
        // Toggle menu dropdowns
        const menuHeaders = document.querySelectorAll('.menu-header');
        
        menuHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const submenu = this.nextElementSibling;
                const arrow = this.querySelector('.arrow');
                
                // Close all other submenus
                document.querySelectorAll('.submenu').forEach(item => {
                    if (item !== submenu) {
                        item.style.maxHeight = null;
                        item.previousElementSibling.querySelector('.arrow').classList.remove('rotate');
                    }
                });
                
                // Toggle this submenu
                if (submenu.style.maxHeight) {
                    submenu.style.maxHeight = null;
                    arrow.classList.remove('rotate');
                } else {
                    submenu.style.maxHeight = submenu.scrollHeight + "px";
                    arrow.classList.add('rotate');
                }
            });
        });
        
        // Switch between views
        function switchView(viewId) {
            // Hide all views
            document.querySelectorAll('.admin-view, .attendance-view, .calendar-view').forEach(view => {
                view.style.display = 'none';
            });
            
            // Show the selected view
            document.getElementById(viewId).style.display = 'block';
        }
        
        // Initialize: Open Mi Horario submenu by default
        document.addEventListener('DOMContentLoaded', function() {
            const scheduleMenu = document.getElementById('scheduleMenu');
            const scheduleSubmenu = document.getElementById('scheduleSubmenu');
            const arrow = scheduleMenu.querySelector('.arrow');
            
            // Open the submenu
            scheduleSubmenu.style.maxHeight = scheduleSubmenu.scrollHeight + "px";
            arrow.classList.add('rotate');
        });
        
        // Close calendar view when clicking close button
        document.querySelector('.close-icon').addEventListener('click', function() {
            switchView('attendance-view');
        });