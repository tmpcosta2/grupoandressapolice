// Atualização do script para incluir a funcionalidade de envio de e-mail
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animação do botão do menu
            const bars = document.querySelectorAll('.bar');
            if (mobileMenuBtn.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.click();
            }
        });
    });
    
    // Header fixo com mudança de estilo ao rolar - mantendo cor salmão
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '5px 0';
            header.style.backgroundColor = 'var(--salmon-primary)';
            header.classList.add('scrolled');
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'var(--salmon-primary)';
            header.classList.remove('scrolled');
        }
    });
    
    // Animação de fade-in para elementos ao rolar
    const fadeElements = document.querySelectorAll('.service-card, .stat-card, .result-card, .differential-card');
    
    const fadeInOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        fadeInObserver.observe(element);
    });
    
    document.addEventListener('scroll', function() {
        fadeElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('fade-in')) {
                element.classList.add('fade-in');
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    });
    
    // Validação e envio do formulário de contato via AJAX
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            let valid = true;
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');
            
            if (!nome.value.trim()) {
                showError(nome, 'Por favor, informe seu nome');
                valid = false;
            } else {
                removeError(nome);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Por favor, informe seu e-mail');
                valid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor, informe um e-mail válido');
                valid = false;
            } else {
                removeError(email);
            }
            
            if (!mensagem.value.trim()) {
                showError(mensagem, 'Por favor, escreva sua mensagem');
                valid = false;
            } else {
                removeError(mensagem);
            }
            
            if (valid) {
                // Preparar dados para envio
                const formData = new FormData(contactForm);
                
                // Alterar estado do botão
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                // Enviar dados via AJAX
                fetch('enviar-email.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        // Mostrar mensagem de sucesso
                        showMessage(contactForm, data.message, 'success');
                        contactForm.reset();
                    } else {
                        // Mostrar mensagem de erro
                        let errorMessage = data.message;
                        if (data.errors) {
                            errorMessage += '<ul>';
                            data.errors.forEach(error => {
                                errorMessage += `<li>${error}</li>`;
                            });
                            errorMessage += '</ul>';
                        }
                        showMessage(contactForm, errorMessage, 'error');
                    }
                })
                .catch(error => {
                    // Mostrar erro de conexão
                    showMessage(contactForm, 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.', 'error');
                    console.error('Erro:', error);
                })
                .finally(() => {
                    // Restaurar botão
                    setTimeout(function() {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }, 2000);
                });
            }
        });
    }
    
    // Funções auxiliares
    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '5px';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = 'red';
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = '';
    }
    
    function showMessage(form, message, type) {
        // Remover mensagens anteriores
        const existingMessages = form.querySelectorAll('.form-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Criar nova mensagem
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}-message`;
        messageElement.innerHTML = message;
        
        // Estilizar mensagem
        if (type === 'success') {
            messageElement.style.color = 'green';
            messageElement.style.backgroundColor = '#e8f5e9';
        } else {
            messageElement.style.color = 'red';
            messageElement.style.backgroundColor = '#ffebee';
        }
        
        messageElement.style.padding = '15px';
        messageElement.style.marginTop = '20px';
        messageElement.style.borderRadius = '5px';
        
        // Adicionar ao formulário
        form.appendChild(messageElement);
        
        // Rolar para a mensagem
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Remover após alguns segundos se for sucesso
        if (type === 'success') {
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Adicionar classe 'fade-in' aos elementos já visíveis na carga inicial
    fadeElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('fade-in');
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
});

// Adicionar classe 'fade-in' para animação CSS
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});
