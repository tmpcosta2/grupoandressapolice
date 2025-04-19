// Elementos interativos adicionais para o site do Grupo Andressa Police
document.addEventListener('DOMContentLoaded', function() {
    // Contador de estatísticas animado
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const animateStats = function() {
            statNumbers.forEach(statNumber => {
                const target = statNumber.textContent;
                
                // Verificar se é um número simples, porcentagem ou valor com unidade
                if (target.includes('%')) {
                    // Porcentagem
                    const numericValue = parseFloat(target.replace('%', ''));
                    animateValue(statNumber, 0, numericValue, 2000, '%');
                } else if (target.includes('bi')) {
                    // Bilhões
                    const numericValue = parseFloat(target.replace('bi', ''));
                    animateValue(statNumber, 0, numericValue, 2000, 'bi');
                } else if (target.includes('tri')) {
                    // Trilhões
                    const numericValue = parseFloat(target.replace('tri', ''));
                    animateValue(statNumber, 0, numericValue, 2000, 'tri');
                } else if (target.includes('$')) {
                    // Valores monetários
                    const numericValue = parseFloat(target.replace(/[^0-9.-]+/g, ''));
                    animateValue(statNumber, 0, numericValue, 2000, target.replace(/[0-9.-]+/g, ''));
                } else if (target.includes('º')) {
                    // Posição (1º, 2º, etc.)
                    statNumber.textContent = target; // Não animar
                } else if (!isNaN(parseFloat(target))) {
                    // Número simples
                    const numericValue = parseFloat(target.replace(/,/g, ''));
                    animateValue(statNumber, 0, numericValue, 2000, '');
                } else {
                    // Não é um número, manter como está
                    statNumber.textContent = target;
                }
            });
        };
        
        // Função para animar valores
        function animateValue(element, start, end, duration, suffix) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                let currentValue = Math.floor(progress * (end - start) + start);
                
                // Formatar números grandes com separadores
                if (currentValue > 999) {
                    currentValue = currentValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }
                
                element.textContent = currentValue + suffix;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        
        // Iniciar animação quando os elementos estiverem visíveis
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Observar o primeiro elemento de estatística
        if (statNumbers[0].closest('section')) {
            statsObserver.observe(statNumbers[0].closest('section'));
        }
    }
    
    // Carrossel de serviços para dispositivos móveis
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid && window.innerWidth <= 768) {
        const serviceCards = servicesGrid.querySelectorAll('.service-card');
        if (serviceCards.length > 1) {
            // Criar elementos do carrossel
            const carouselContainer = document.createElement('div');
            carouselContainer.className = 'carousel-container';
            
            const carouselTrack = document.createElement('div');
            carouselTrack.className = 'carousel-track';
            
            // Adicionar cards ao carrossel
            serviceCards.forEach(card => {
                const carouselItem = document.createElement('div');
                carouselItem.className = 'carousel-item';
                carouselItem.appendChild(card.cloneNode(true));
                carouselTrack.appendChild(carouselItem);
            });
            
            carouselContainer.appendChild(carouselTrack);
            
            // Adicionar botões de navegação
            const prevButton = document.createElement('button');
            prevButton.className = 'carousel-button prev';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            
            const nextButton = document.createElement('button');
            nextButton.className = 'carousel-button next';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            
            carouselContainer.appendChild(prevButton);
            carouselContainer.appendChild(nextButton);
            
            // Substituir a grade pelo carrossel
            servicesGrid.parentNode.replaceChild(carouselContainer, servicesGrid);
            
            // Adicionar estilos para o carrossel
            const style = document.createElement('style');
            style.textContent = `
                .carousel-container {
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    padding: 0 40px;
                    margin-bottom: 40px;
                }
                .carousel-track {
                    display: flex;
                    transition: transform 0.5s ease;
                }
                .carousel-item {
                    min-width: 100%;
                    padding: 0 10px;
                }
                .carousel-button {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 10;
                }
                .carousel-button.prev {
                    left: 0;
                }
                .carousel-button.next {
                    right: 0;
                }
            `;
            document.head.appendChild(style);
            
            // Implementar funcionalidade do carrossel
            let currentIndex = 0;
            const items = document.querySelectorAll('.carousel-item');
            
            function updateCarousel() {
                carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            }
            
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
            
            nextButton.addEventListener('click', () => {
                if (currentIndex < items.length - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });
            
            // Adicionar suporte para gestos de deslize (swipe)
            let touchStartX = 0;
            let touchEndX = 0;
            
            carouselTrack.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            carouselTrack.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Deslize para a esquerda
                    if (currentIndex < items.length - 1) {
                        currentIndex++;
                        updateCarousel();
                    }
                }
                if (touchEndX > touchStartX + swipeThreshold) {
                    // Deslize para a direita
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateCarousel();
                    }
                }
            }
        }
    }
    
    // Adicionar botão "Voltar ao topo"
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    // Adicionar estilos para o botão
    const backToTopStyle = document.createElement('style');
    backToTopStyle.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        .back-to-top:hover {
            background-color: var(--dark-gray);
            transform: translateY(-3px);
        }
        .back-to-top.visible {
            display: block;
            animation: fadeIn 0.5s;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(backToTopStyle);
    
    // Mostrar/ocultar botão com base na posição de rolagem
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Funcionalidade de rolagem suave ao topo
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Adicionar tooltips aos ícones de serviços
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        icon.setAttribute('title', icon.nextElementSibling.textContent);
        
        // Criar tooltip personalizado
        icon.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('title');
            
            // Posicionar tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.top = `${rect.top - 40}px`;
            tooltip.style.left = `${rect.left + (rect.width / 2)}px`;
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.backgroundColor = 'var(--dark-gray)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.fontSize = '14px';
            tooltip.style.zIndex = '1000';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.opacity = '0';
            tooltip.style.transition = 'opacity 0.3s ease';
            
            document.body.appendChild(tooltip);
            
            // Mostrar tooltip com um pequeno atraso
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 200);
            
            // Remover tooltip ao sair do ícone
            this.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300);
            }, { once: true });
        });
    });
    
    // Adicionar efeito de destaque aos cards ao passar o mouse
    const allCards = document.querySelectorAll('.service-card, .stat-card, .result-card, .differential-card');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});
