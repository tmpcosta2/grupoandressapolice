// Script principal para o site do Grupo Andressa Police

document.addEventListener('DOMContentLoaded', function() {
    // Menu móvel
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animação das barras do menu
            const bars = document.querySelectorAll('.bar');
            bars.forEach(function(bar) {
                bar.classList.toggle('animate');
            });
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                
                const bars = document.querySelectorAll('.bar');
                bars.forEach(function(bar) {
                    bar.classList.remove('animate');
                });
            }
        });
    });
    
    // Adicionar classe ativa ao link atual
    const currentLocation = window.location.href;
    navLinks.forEach(function(link) {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });
    
    // Animação suave ao scroll
    const scrollElements = document.querySelectorAll('.stat-card, .service-card');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Inicializar animações
    handleScrollAnimation();
});
