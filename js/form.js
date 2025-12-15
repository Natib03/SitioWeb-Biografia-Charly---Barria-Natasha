document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    // Configurar Pristine con mensajes en español
    const pristine = new Pristine(form, {
        classTo: 'form-group-contact',
        errorClass: 'form-error',
        successClass: 'form-success',
        errorTextParent: 'form-group-contact',
        errorTextTag: 'div',
        errorTextClass: 'pristine-error-message'
    }, true);

    // Agregar mensajes de error en español
    Pristine.addMessages('es', {
        required: 'Este campo es obligatorio',
        email: 'Ingresa un correo electrónico válido',
        tel: 'Ingresa un número de teléfono válido',
        number: 'Ingresa un número válido',
        minlength: 'Este campo debe tener al menos ${1} caracteres',
        maxlength: 'Este campo no puede exceder ${1} caracteres',
        pattern: 'Por favor ingresa un formato válido'
    });

    // Establecer el idioma a español
    Pristine.setLocale('es');

    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar el formulario
        if (pristine.validate()) {
            // Si es válido, enviar el formulario
            form.submit();
        }
    });
});
