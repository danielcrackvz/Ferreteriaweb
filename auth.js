// Función para alternar visibilidad de contraseña
function togglePassword(inputId = 'password') {
  const passwordInput = document.getElementById(inputId);
  const toggleButton = passwordInput.nextElementSibling.querySelector('i');
  
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleButton.classList.remove('fa-eye');
    toggleButton.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    toggleButton.classList.remove('fa-eye-slash');
    toggleButton.classList.add('fa-eye');
  }
}

// Función para mostrar mensajes
function showMessage(message, type = 'success') {
  // Remover mensajes existentes
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Crear nuevo mensaje
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  
  // Insertarlo antes del formulario
  const form = document.querySelector('.auth-form');
  form.parentNode.insertBefore(messageDiv, form);
  
  // Removerlo después de 5 segundos
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.remove();
    }
  }, 5000);
}

// Validación de email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validación de contraseña
function isValidPassword(password) {
  // Mínimo 6 caracteres
  return password.length >= 6;
}

// Manejo del formulario de login
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;
      
      // Validaciones básicas
      if (!email || !password) {
        showMessage('Por favor, completa todos los campos.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showMessage('Por favor, ingresa un email válido.', 'error');
        return;
      }
      
      // Simular proceso de login
      showMessage('Iniciando sesión...', 'success');
      
      setTimeout(() => {
        // Aquí normalmente harías una petición al servidor
        // Por ahora simulamos un login exitoso
        
        // Guardar datos en localStorage si "recordar" está marcado
        if (remember) {
          localStorage.setItem('userEmail', email);
          localStorage.setItem('rememberUser', 'true');
        }
        
        // Simular redirección al área de usuario o página principal
        showMessage('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
        
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2000);
        
      }, 1500);
    });
    
    // Cargar email guardado si existe
    const savedEmail = localStorage.getItem('userEmail');
    const rememberUser = localStorage.getItem('rememberUser');
    
    if (savedEmail && rememberUser === 'true') {
      document.getElementById('email').value = savedEmail;
      document.getElementById('remember').checked = true;
    }
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const terms = document.getElementById('terms').checked;
      
      // Validaciones
      if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        showMessage('Por favor, completa todos los campos.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showMessage('Por favor, ingresa un email válido.', 'error');
        return;
      }
      
      if (!isValidPassword(password)) {
        showMessage('La contraseña debe tener al menos 6 caracteres.', 'error');
        return;
      }
      
      if (password !== confirmPassword) {
        showMessage('Las contraseñas no coinciden.', 'error');
        return;
      }
      
      if (!terms) {
        showMessage('Debes aceptar los términos y condiciones.', 'error');
        return;
      }
      
      // Validación de teléfono básica
      if (phone.length < 8) {
        showMessage('Por favor, ingresa un número de teléfono válido.', 'error');
        return;
      }
      
      // Simular proceso de registro
      showMessage('Creando cuenta...', 'success');
      
      setTimeout(() => {
        // Aquí normalmente harías una petición al servidor
        // Por ahora simulamos un registro exitoso
        
        const userData = {
          firstName,
          lastName,
          email,
          phone,
          registrationDate: new Date().toISOString()
        };
        
        // Guardar datos básicos (sin contraseña) en localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        
        showMessage('¡Cuenta creada exitosamente! Redirigiendo al login...', 'success');
        
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
        
      }, 1500);
    });
  }
});

// Función para validar campos en tiempo real
function addRealTimeValidation() {
  const emailInputs = document.querySelectorAll('input[type="email"]');
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  
  emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value && !isValidEmail(this.value)) {
        this.style.borderColor = '#f44336';
        this.style.backgroundColor = '#ffebee';
      } else {
        this.style.borderColor = '#e0e0e0';
        this.style.backgroundColor = '#fafafa';
      }
    });
  });
  
  passwordInputs.forEach(input => {
    input.addEventListener('input', function() {
      if (this.id === 'password' && this.value.length > 0 && this.value.length < 6) {
        this.style.borderColor = '#ff9800';
        this.style.backgroundColor = '#fff8e1';
      } else if (this.id === 'confirmPassword' && this.value.length > 0) {
        const passwordInput = document.getElementById('password');
        if (passwordInput && this.value !== passwordInput.value) {
          this.style.borderColor = '#f44336';
          this.style.backgroundColor = '#ffebee';
        } else {
          this.style.borderColor = '#4caf50';
          this.style.backgroundColor = '#e8f5e8';
        }
      } else {
        this.style.borderColor = '#e0e0e0';
        this.style.backgroundColor = '#fafafa';
      }
    });
  });
}

// Inicializar validación en tiempo real cuando se carga la página
document.addEventListener('DOMContentLoaded', addRealTimeValidation);

// Función para limpiar localStorage (útil para desarrollo)
function clearUserData() {
  localStorage.removeItem('userEmail');
  localStorage.removeItem('rememberUser');
  localStorage.removeItem('userData');
  console.log('Datos de usuario eliminados');
}

// Función para verificar si el usuario está logueado (para uso futuro)
function isUserLoggedIn() {
  // Esta función se puede expandir más adelante con validaciones más complejas
  return localStorage.getItem('userData') !== null;
}

// Función para obtener datos del usuario
function getUserData() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

// Animaciones adicionales
function addFormAnimations() {
  const inputs = document.querySelectorAll('.form-group input');
  
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentNode.style.transform = 'translateY(-2px)';
      this.parentNode.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
      this.parentNode.style.transform = 'translateY(0)';
    });
  });
}

// Inicializar animaciones
document.addEventListener('DOMContentLoaded', addFormAnimations);