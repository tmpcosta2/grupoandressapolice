// Integração com Instagram para o site do Grupo Andressa Police
document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar feed do Instagram
    function loadInstagramFeed() {
        const instagramSection = document.querySelector('.instagram-feed');
        if (!instagramSection) return;
        
        // URL do perfil do Instagram
        const instagramUrl = 'https://www.instagram.com/draandressapolice/?hl=en';
        
        // Como não podemos acessar a API do Instagram diretamente sem autenticação,
        // vamos criar uma visualização incorporada do perfil
        const instagramEmbed = document.createElement('div');
        instagramEmbed.className = 'instagram-embed';
        
        // Criar link para o perfil
        const profileLink = document.createElement('a');
        profileLink.href = instagramUrl;
        profileLink.target = '_blank';
        profileLink.className = 'instagram-profile-link';
        profileLink.innerHTML = `
            <i class="fab fa-instagram"></i>
            <span>Siga-nos no Instagram: @draandressapolice</span>
        `;
        
        // Criar container para posts simulados
        const postsContainer = document.createElement('div');
        postsContainer.className = 'instagram-posts';
        
        // Criar posts simulados baseados no conteúdo do site
        const postContents = [
            {
                image: 'img/instagram-post-1.jpg',
                caption: 'Saúde mental no trabalho: Como prevenir a ansiedade e o burnout. #SaudeMental #BemEstarNoTrabalho',
                likes: 87,
                date: '2 dias atrás'
            },
            {
                image: 'img/instagram-post-2.jpg',
                caption: 'Dicas para líderes: Como criar um ambiente de trabalho que promova a saúde mental. #Liderança #SaudeMental',
                likes: 124,
                date: '1 semana atrás'
            },
            {
                image: 'img/instagram-post-3.jpg',
                caption: 'Estatísticas alarmantes: O impacto dos transtornos mentais na produtividade das empresas. #Produtividade #SaudeMental',
                likes: 95,
                date: '2 semanas atrás'
            }
        ];
        
        // Criar diretório para imagens simuladas
        const createPlaceholderImages = `
            <style>
                .instagram-post-image {
                    width: 100%;
                    height: 200px;
                    background-color: var(--primary-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 3rem;
                    margin-bottom: 10px;
                }
                
                .instagram-post {
                    background-color: white;
                    border-radius: 5px;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    margin-bottom: 20px;
                }
                
                .instagram-post-content {
                    padding: 15px;
                }
                
                .instagram-post-caption {
                    margin-bottom: 10px;
                    font-size: 0.9rem;
                }
                
                .instagram-post-meta {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.8rem;
                    color: #666;
                }
                
                .instagram-posts {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                    margin-top: 20px;
                }
                
                .instagram-profile-link {
                    display: inline-flex;
                    align-items: center;
                    background-color: #E1306C;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                
                .instagram-profile-link:hover {
                    background-color: #C13584;
                    color: white;
                }
                
                .instagram-profile-link i {
                    font-size: 1.5rem;
                    margin-right: 10px;
                }
                
                .instagram-embed {
                    text-align: center;
                }
                
                @media (max-width: 768px) {
                    .instagram-posts {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;
        
        // Adicionar estilos
        const styleElement = document.createElement('div');
        styleElement.innerHTML = createPlaceholderImages;
        document.head.appendChild(styleElement.firstElementChild);
        
        // Criar posts
        postContents.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.className = 'instagram-post';
            
            // Usar ícone do Instagram como placeholder para imagem
            postElement.innerHTML = `
                <div class="instagram-post-image">
                    <i class="fab fa-instagram"></i>
                </div>
                <div class="instagram-post-content">
                    <div class="instagram-post-caption">${post.caption}</div>
                    <div class="instagram-post-meta">
                        <div class="instagram-post-likes"><i class="fas fa-heart"></i> ${post.likes} curtidas</div>
                        <div class="instagram-post-date">${post.date}</div>
                    </div>
                </div>
            `;
            
            postsContainer.appendChild(postElement);
        });
        
        // Adicionar elementos à seção
        instagramEmbed.appendChild(profileLink);
        instagramEmbed.appendChild(postsContainer);
        instagramSection.appendChild(instagramEmbed);
        
        // Adicionar botão para ver mais
        const viewMoreButton = document.createElement('a');
        viewMoreButton.href = instagramUrl;
        viewMoreButton.target = '_blank';
        viewMoreButton.className = 'btn btn-primary';
        viewMoreButton.textContent = 'Ver mais no Instagram';
        viewMoreButton.style.marginTop = '20px';
        viewMoreButton.style.display = 'inline-block';
        
        instagramSection.appendChild(viewMoreButton);
    }
    
    // Adicionar seção de Instagram à página inicial se não existir
    if (document.querySelector('.hero') && !document.querySelector('.instagram-feed')) {
        const mainContent = document.querySelector('main') || document.body;
        const ctaSection = document.querySelector('.cta');
        
        const instagramSection = document.createElement('section');
        instagramSection.className = 'instagram-feed';
        
        const container = document.createElement('div');
        container.className = 'container';
        
        const heading = document.createElement('h2');
        heading.textContent = 'Siga-nos no Instagram';
        
        container.appendChild(heading);
        instagramSection.appendChild(container);
        
        if (ctaSection) {
            mainContent.insertBefore(instagramSection, ctaSection);
        } else {
            mainContent.appendChild(instagramSection);
        }
    }
    
    // Carregar feed do Instagram
    loadInstagramFeed();
    
    // Adicionar widget flutuante do Instagram
    const instagramWidget = document.createElement('div');
    instagramWidget.className = 'instagram-widget';
    instagramWidget.innerHTML = `
        <a href="https://www.instagram.com/draandressapolice/?hl=en" target="_blank">
            <i class="fab fa-instagram"></i>
        </a>
    `;
    
    // Adicionar estilos para o widget
    const widgetStyle = document.createElement('style');
    widgetStyle.textContent = `
        .instagram-widget {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
        }
        
        .instagram-widget a {
            color: white;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
        
        .instagram-widget:hover {
            transform: scale(1.1);
        }
    `;
    
    document.head.appendChild(widgetStyle);
    document.body.appendChild(instagramWidget);
});
