// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos DOM
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');
    const contactForm = document.getElementById('contact-form');
    
    // Crear estrellas para el fondo
    createStars();
    
    // Inicializar el tema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
    
    // Cambio de tema claro/oscuro
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Guardar preferencia de tema
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Menú móvil
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    
    // Cerrar el menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            
            // Actualizar enlace activo
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Observador de Intersección para animaciones de entrada
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeIn');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Observar todas las secciones para animaciones
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Destacar el enlace de navegación activo basado en la sección visible
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        // Evita múltiples cálculos durante el desplazamiento
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                let current = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (window.pageYOffset >= sectionTop - header.clientHeight - 50) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === current) {
                        link.classList.add('active');
                    }
                });
                
                scrollTimeout = null;
            }, 100); // Reducir la frecuencia de cálculos
        }
    });
    
    // Procesar el formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Aquí iría el código para procesar el formulario
            // Por ahora, solo mostraremos un mensaje de éxito simulado
            alert('¡Mensaje enviado con éxito! (Simulado)');
            contactForm.reset();
        });
    }
    
    // Animación del símbolo zodiacal
    animateZodiacSymbol();
    
    // Animación para las tarjetas de tarot
    animateTarotCards();
});

// Función para crear estrellas en el fondo
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars');
    
    // Crear estrellas aleatorias
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add(`star-${Math.floor(Math.random() * 3) + 1}`);
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        starsContainer.appendChild(star);
    }
    
    document.body.appendChild(starsContainer);
}

// Función para animar el símbolo zodiacal
function animateZodiacSymbol() {
    const zodiacSymbol = document.querySelector('.zodiac-symbol');
    if (!zodiacSymbol) return;
    
    // Crear un símbolo genérico para demostración
    // En un caso real, podrías personalizar esto basado en el signo del usuario
    const symbol = document.createElement('div');
    symbol.innerHTML = `
        <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="none" stroke="var(--accent)" stroke-width="2" />
            <path d="M100,20 L100,180" stroke="var(--accent)" stroke-width="2" />
            <path d="M20,100 L180,100" stroke="var(--accent)" stroke-width="2" />
            <circle cx="100" cy="100" r="30" fill="none" stroke="var(--gold-accent)" stroke-width="2" />
            <path d="M70,70 L130,130" stroke="var(--gold-accent)" stroke-width="2" />
            <path d="M70,130 L130,70" stroke="var(--gold-accent)" stroke-width="2" />
        </svg>
    `;
    
    zodiacSymbol.appendChild(symbol);
    
    // Añadir información del signo
    const cardBack = document.querySelector('.card-back');
    if (cardBack) {
        cardBack.innerHTML = `
            <h3>Desarrollador Cósmico</h3>
            <p>Como verdadero desarrollador cósmico, Pablo tiene la habilidad de crear y transformar ideas en soluciones digitales que conectan a las personas con el universo tecnológico.</p>
            <p>Características:</p>
            <ul>
                <li>Pensamiento analítico</li>
                <li>Creatividad sin límites</li>
                <li>Adaptabilidad a nuevos entornos</li>
                <li>Pasión por aprender</li>
            </ul>
        `;
    }
}

// Función para animar las tarjetas de tarot
function animateTarotCards() {
    const tarotCards = document.querySelectorAll('.tarot-card');
    
    tarotCards.forEach((card, index) => {
        const cardFront = card.querySelector('.card-front');
        const cardBack = card.querySelector('.card-back');
        
        // Contenido para la primera carta (Sweet Blooms)
        if (index === 0 && cardFront && cardBack) {
            cardFront.innerHTML = `
                <div class="tarot-design">
                    <h3>El Creador</h3>
                    <div class="tarot-symbol">
                        <i class="fas fa-laptop-code"></i>
                    </div>
                    <p>Angular & Node.js</p>
                </div>
            `;
            
            cardBack.innerHTML = `
                <div class="tarot-info">
                    <h3>Sweet Blooms</h3>
                    <p>Un proyecto que refleja la capacidad de crear experiencias de usuario fluidas y seguras.</p>
                    <p>La carta del Creador simboliza el poder de manifestar ideas en la realidad digital.</p>
                </div>
            `;
        }
        
        // Contenido para la segunda carta (App Móvil)
        if (index === 1 && cardFront && cardBack) {
            cardFront.innerHTML = `
                <div class="tarot-design">
                    <h3>El Innovador</h3>
                    <div class="tarot-symbol">
                        <i class="fas fa-mobile-alt"></i>
                    </div>
                    <p>React Native</p>
                </div>
            `;
            
            cardBack.innerHTML = `
                <div class="tarot-info">
                    <h3>App de Gestión</h3>
                    <p>Una manifestación del dominio técnico en el mundo móvil, con enfoque en la experiencia del usuario.</p>
                    <p>La carta del Innovador representa la capacidad de adaptarse a diferentes plataformas.</p>
                </div>
            `;
        }
    });
    
    // Añadir estilos para las tarjetas de tarot
    const style = document.createElement('style');
    style.textContent = `
        .tarot-design {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: white;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border-radius: var(--radius-md);
            padding: 20px;
            text-align: center;
            border: 2px solid var(--gold-accent);
        }
        
        .tarot-symbol {
            margin: 20px 0;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--gold-accent);
        }
        
        .tarot-symbol i {
            font-size: 40px;
            color: var(--gold-accent);
        }
        
        .tarot-info {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .tarot-info h3 {
            font-family: var(--font-display);
            margin-bottom: 15px;
            color: var(--accent);
        }
        
        .tarot-info p {
            margin-bottom: 15px;
            font-size: 0.9rem;
        }
    `;
    
    document.head.appendChild(style);
} 