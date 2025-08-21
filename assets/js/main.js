// Update current year dynamically
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.querySelector('.progress-bar').style.width = scrolled + '%';
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Process Animation Observer
const processItems = document.querySelectorAll('.process-item');
const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

processItems.forEach(item => processObserver.observe(item));

// Counter Animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
           
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
});

counters.forEach(counter => counterObserver.observe(counter));

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Animate hamburger icon
    if (mobileMenu.classList.contains('hidden')) {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    } else {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on nav links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
    }
});

// Smooth Scroll
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');
        smoothScroll(target);
    });
});

// Quote Modal Functions
function openQuoteModal() {
    document.getElementById('quote-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
    document.getElementById('quote-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function openServiceQuote(serviceName, price) {
    // Map service names to match the select options
    const serviceMapping = {
        'Landing Pages': 'Landing Page - Desde S/ 800',
        'Sitios Corporativos': 'Sitio Web Corporativo - Desde S/ 1200',
        'Aplicaciones Web': 'Página Web - Desde S/ 2000',
        'E-commerce': 'E-commerce - Desde S/ 1500',
        'Hosting & Dominio': 'Hosting Web - Desde S/ 150',
        'Optimización': 'Otro servicio',
        'Mantenimiento': 'Mantenimiento Web - Desde S/ 300'
    };
    
    // Use mapped value or fallback to original format
    const mappedValue = serviceMapping[serviceName] || `${serviceName} - Desde S/ ${price}`;
    document.getElementById('selected-service').value = mappedValue;
    openQuoteModal();
}

// WhatsApp Modal Functions
function openWhatsAppModal() {
    document.getElementById('whatsapp-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeWhatsAppModal() {
    document.getElementById('whatsapp-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Form Submissions
document.getElementById('quote-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const description = formData.get('description');
   
    // Create WhatsApp message
    const whatsappMessage = `🚀 *Nueva Cotización de Proyecto*\n\n` +
                          `👤 *Nombre:* ${name}\n` +
                          `📱 *WhatsApp:* ${phone}\n` +
                          `🛠️ *Servicio:* ${service}\n` +
                          `📝 *Descripción:* ${description}\n\n` +
                          `¡Hola! Me interesa cotizar este proyecto. ¿Podrías ayudarme?`;
   
    const whatsappUrl = `https://wa.me/51927450053?text=${encodeURIComponent(whatsappMessage)}`;
   
    // Close modal and open WhatsApp
    closeQuoteModal();
    window.open(whatsappUrl, '_blank');
    e.target.reset();
});

document.getElementById('whatsapp-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const message = formData.get('message');
   
    const whatsappMessage = `Hola, soy ${name}. ${message}`;
    const whatsappUrl = `https://wa.me/51927450053?text=${encodeURIComponent(whatsappMessage)}`;
   
    closeWhatsAppModal();
    window.open(whatsappUrl, '_blank');
});

document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        budget: formData.get('budget'),
        message: formData.get('message')
    };
   
    // Simulate form submission
    showSuccess();
    e.target.reset();
   
    // Here you would typically send the data to your backend
    console.log('Contact form data:', data);
});

// Success Message
function showSuccess() {
    const successMessage = document.getElementById('success-message');
    successMessage.style.transform = 'translateX(0)';
    setTimeout(() => {
        successMessage.style.transform = 'translateX(100%)';
    }, 3000);
}

// Close modals when clicking outside
document.getElementById('quote-modal').addEventListener('click', (e) => {
    if (e.target.id === 'quote-modal') {
        closeQuoteModal();
    }
});

document.getElementById('whatsapp-modal').addEventListener('click', (e) => {
    if (e.target.id === 'whatsapp-modal') {
        closeWhatsAppModal();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeQuoteModal();
        closeWhatsAppModal();
    }
});

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add nav link active state
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    const sections = ['inicio', 'sobre-mi', 'servicios', 'portafolio', 'ventajas', 'proceso', 'contacto'];
    const scrollPos = window.scrollY + 100;
   
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
            navLinks.forEach(link => link.classList.remove('text-blue-400'));
            const navLink = document.querySelector(`a[href="#${section}"]`);
            if (navLink) {
                navLink.classList.add('text-blue-400');
            }
        }
    });
});

// Testimonials Carousel
const testimonials = [
    {
        name: "Mariana G.",
        company: "Fundadora de 'Eventos Brillantes'",
        text: "Billcodex transformó nuestra idea en una landing page increíble. El diseño es super atractivo y las llamadas a la acción son realmente efectivas. ¡Hemos visto un aumento significativo en nuestras conversiones!",
        initials: "MG",
        color: "from-pink-400 to-pink-600"
    },
    {
        name: "Carlos R.",
        company: "Gerente de Marketing en 'Soluciones Digitales SA'",
        text: "Necesitábamos una página de aterrizaje optimizada para nuestra última campaña y Billcodex superó nuestras expectativas. La velocidad de carga y la optimización SEO son top. ¡Altamente recomendados!",
        initials: "CR",
        color: "from-blue-400 to-blue-600"
    },
    {
        name: "Laura P.",
        company: "CEO de 'Constructora del Sur'",
        text: "Nuestro nuevo sitio corporativo diseñado por Billcodex es exactamente lo que buscábamos. Refleja perfectamente nuestra identidad de marca y nos ha ayudado a generar mucha más confianza con nuestros clientes.",
        initials: "LP",
        color: "from-purple-400 to-purple-600"
    },
    {
        name: "Diego M.",
        company: "Director de 'Asesorías Contables DCM'",
        text: "¡El diseño responsive de nuestra web es impecable! Se ve perfecta en cualquier dispositivo, lo cual era crucial para nosotros. Billcodex es sinónimo de profesionalismo.",
        initials: "DM",
        color: "from-green-400 to-green-600"
    },
    {
        name: "Sofía V.",
        company: "Jefa de Contenidos en 'Textil Innova'",
        text: "Gracias a Billcodex, ahora tenemos un blog integrado en nuestro sitio corporativo que es muy fácil de manejar. Nos permite compartir contenido de valor y mantener a nuestros clientes informados.",
        initials: "SV",
        color: "from-indigo-400 to-indigo-600"
    },
    {
        name: "Ricardo H.",
        company: "Gerente de Operaciones en 'Logística Eficaz'",
        text: "La aplicación web que desarrolló Billcodex para nosotros es una maravilla. La interfaz es intuitiva y funciona de forma fluida. ¡Simplificó muchísimo nuestros procesos internos!",
        initials: "RH",
        color: "from-orange-400 to-orange-600"
    },
    {
        name: "Ana L.",
        company: "Propietaria de 'Dulce Tentación'",
        text: "Estamos encantados con nuestra tienda online. Billcodex se encargó de todo, desde el carrito de compras hasta las pasarelas de pago. Es una solución completa y robusta.",
        initials: "AL",
        color: "from-red-400 to-red-600"
    },
    {
        name: "Jorge S.",
        company: "Emprendedor de 'Libros con Alma'",
        text: "El servicio de hosting y dominio de Billcodex es excelente. Tuvimos nuestro dominio gratis el primer año y el SSL incluido nos da mucha tranquilidad. ¡Todo funcionó a la perfección desde el inicio!",
        initials: "JS",
        color: "from-teal-400 to-teal-600"
    },
    {
        name: "Elena C.",
        company: "Directora de 'Arte en Línea'",
        text: "La optimización de velocidad que Billcodex le hizo a nuestra web fue impresionante. De verdad se siente la diferencia al navegar. ¡Nuestros usuarios lo agradecen!",
        initials: "EC",
        color: "from-cyan-400 to-cyan-600"
    },
    {
        name: "Pedro G.",
        company: "Gerente de TI en 'TecnoServicios'",
        text: "El mantenimiento que Billcodex le da a nuestra web es invaluable. Nos mantiene actualizados, seguros y siempre están monitoreando. Es un servicio que nos quita un peso de encima.",
        initials: "PG",
        color: "from-yellow-400 to-yellow-600"
    },
    {
        name: "Marta F.",
        company: "Dueña de 'Boutique Elegancia'",
        text: "Decidimos hacer un rediseño web con Billcodex y el resultado es espectacular. El nuevo diseño es moderno y las funcionalidades mejoradas han potenciado nuestra presencia online.",
        initials: "MF",
        color: "from-rose-400 to-rose-600"
    },
    {
        name: "Gabriel D.",
        company: "Especialista en Marketing Digital",
        text: "La landing page que Billcodex creó para nuestra última campaña publicitaria superó todas nuestras expectativas. El análisis de conversión inicial fue clave para el éxito.",
        initials: "GD",
        color: "from-emerald-400 to-emerald-600"
    },
    {
        name: "Valeria R.",
        company: "Coordinadora de Ventas",
        text: "Con los formularios de contacto bien diseñados que Billcodex implementó, estamos capturando leads de manera mucho más eficiente. Su atención al detalle es increíble.",
        initials: "VR",
        color: "from-violet-400 to-violet-600"
    },
    {
        name: "Felipe A.",
        company: "Dueño de Negocio Local",
        text: "La optimización SEO en nuestra landing page nos ha posicionado mejor en los motores de búsqueda. ¡Estamos generando más tráfico cualificado que nunca!",
        initials: "FA",
        color: "from-slate-400 to-slate-600"
    },
    {
        name: "Natalia Q.",
        company: "Gerente de Comunicaciones",
        text: "Nuestro nuevo sitio corporativo tiene múltiples secciones que organizan muy bien toda nuestra información. Los clientes lo encuentran muy fácil de usar.",
        initials: "NQ",
        color: "from-sky-400 to-sky-600"
    },
    {
        name: "Andrés B.",
        company: "Administrador de Empresas",
        text: "El panel de administración de nuestro sitio es súper intuitivo. Podemos actualizar contenido y subir nuevas noticias sin problemas. ¡Gran trabajo de Billcodex!",
        initials: "AB",
        color: "from-amber-400 to-amber-600"
    },
    {
        name: "Carolina N.",
        company: "Directora de Diseño",
        text: "La galería de proyectos que Billcodex diseñó para nosotros es visualmente impactante. Nos permite mostrar nuestro trabajo de una forma muy profesional.",
        initials: "CN",
        color: "from-lime-400 to-lime-600"
    },
    {
        name: "Miguel C.",
        company: "CTO de 'SoftSolutions'",
        text: "La interfaz intuitiva de la aplicación web que Billcodex desarrolló es un gran acierto. Nuestros empleados la adoptaron rápidamente.",
        initials: "MC",
        color: "from-fuchsia-400 to-fuchsia-600"
    },
    {
        name: "Sofía G.",
        company: "Desarrolladora de Software",
        text: "La base de datos de nuestra aplicación web es robusta y eficiente. Billcodex demostró un gran conocimiento técnico en su desarrollo.",
        initials: "SG",
        color: "from-stone-400 to-stone-600"
    },
    {
        name: "Daniel O.",
        company: "Analista de Sistemas",
        text: "Tener nuestra propia API personalizada nos ha permitido integrar nuestra aplicación con otros sistemas sin problemas. ¡Un trabajo impecable de Billcodex!",
        initials: "DO",
        color: "from-zinc-400 to-zinc-600"
    },
    {
        name: "Rosa M.",
        company: "Gerente de Tienda Online",
        text: "La gestión de productos en nuestra tienda online es muy sencilla gracias al panel de administración que Billcodex implementó. Podemos actualizar precios y stock en minutos.",
        initials: "RM",
        color: "from-neutral-400 to-neutral-600"
    },
    {
        name: "Fernando S.",
        company: "Dueño de 'Comercio Innovador'",
        text: "Las pasarelas de pago se integraron sin ningún problema en nuestro e-commerce. Nuestros clientes tienen varias opciones para pagar, lo que mejora la experiencia de compra.",
        initials: "FS",
        color: "from-pink-500 to-pink-700"
    },
    {
        name: "Carmen T.",
        company: "Emprendedora Digital",
        text: "Nuestro carrito de compras funciona a la perfección. La experiencia de usuario es fluida, lo que ha reducido el abandono de carritos.",
        initials: "CT",
        color: "from-blue-500 to-blue-700"
    },
    {
        name: "Luis P.",
        company: "Webmaster",
        text: "El Cloudflare CDN incluido en nuestro hosting ha acelerado nuestra web de forma notable. ¡Increíble la diferencia!",
        initials: "LP",
        color: "from-purple-500 to-purple-700"
    },
    {
        name: "Clara L.",
        company: "Gerente de Contenidos Web",
        text: "Los backups automáticos que Billcodex configura nos dan una tranquilidad enorme. Sabemos que nuestra información está segura.",
        initials: "CL",
        color: "from-green-500 to-green-700"
    },
    {
        name: "Rodrigo G.",
        company: "Analista de SEO",
        text: "Después de la optimización de velocidad de Billcodex, nuestro sitio web carga casi instantáneamente. Esto ha mejorado nuestra tasa de rebote.",
        initials: "RG",
        color: "from-indigo-500 to-indigo-700"
    },
    {
        name: "Isabel V.",
        company: "Desarrolladora Freelance",
        text: "El código limpio y bien estructurado que Billcodex usa es evidente. Facilita futuras actualizaciones y mejoras.",
        initials: "IV",
        color: "from-orange-500 to-orange-700"
    }
];

let currentTestimonial = 0;
let testimonialInterval;

function createTestimonialSlide(testimonial) {
    return `
        <div class="testimonial-slide">
            <div class="enhanced-card rounded-2xl p-8 max-w-4xl mx-auto">
                <div class="flex items-center mb-6">
                    <div class="w-16 h-16 bg-gradient-to-r ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-lg">
                        ${testimonial.initials}
                    </div>
                    <div class="ml-4">
                        <h4 class="font-semibold text-lg">${testimonial.name}</h4>
                        <p class="text-gray-400">${testimonial.company}</p>
                    </div>
                </div>
                <p class="text-gray-300 text-lg leading-relaxed mb-6">
                    "${testimonial.text}"
                </p>
                <div class="flex text-yellow-400 text-lg">
                    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                </div>
            </div>
        </div>
    `;
}

function initTestimonialsCarousel() {
    const track = document.getElementById('testimonials-track');
    
    // Create infinite slides by duplicating testimonials for seamless loop
    const duplicatedTestimonials = [...testimonials, ...testimonials];
    track.innerHTML = duplicatedTestimonials.map(testimonial => createTestimonialSlide(testimonial)).join('');
    
    // Remove any existing transform and let CSS animation handle the movement
    track.style.transform = '';
}

// Simplified functions for manual control (if needed)
function pauseCarousel() {
    const track = document.getElementById('testimonials-track');
    track.style.animationPlayState = 'paused';
}

function resumeCarousel() {
    const track = document.getElementById('testimonials-track');
    track.style.animationPlayState = 'running';
}

// Pause animation on hover (handled by CSS)
// The hover pause functionality is already implemented in CSS

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', initTestimonialsCarousel);

// Theme Toggle Functionality
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    if (html.getAttribute('data-theme') === 'light') {
        // Switch to dark theme
        html.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon text-lg';
        localStorage.setItem('theme', 'dark');
    } else {
        // Switch to light theme
        html.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun text-lg';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun text-lg';
    }
});

// Add event listener to theme toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

// Service Dropdown Functions
function toggleServiceDropdown() {
    const dropdown = document.getElementById('service-dropdown');
    dropdown.classList.toggle('show');
}

function toggleHeroDropdown() {
    const dropdown = document.getElementById('hero-dropdown');
    dropdown.classList.toggle('show');
}

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.service-dropdown')) {
        document.getElementById('service-dropdown').classList.remove('show');
        document.getElementById('hero-dropdown').classList.remove('show');
    }
});

// WhatsApp Chat Functions
function toggleWhatsAppChat() {
    const chat = document.getElementById('whatsapp-chat');
    chat.classList.toggle('show');
}

function sendWhatsAppMessage(message) {
    const phoneNumber = '51927450053';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    toggleWhatsAppChat();
}

// Close WhatsApp chat when clicking outside
document.addEventListener('click', (e) => {
    const chat = document.getElementById('whatsapp-chat');
    const btn = document.getElementById('whatsapp-btn');
    if (!chat.contains(e.target) && !btn.contains(e.target)) {
        chat.classList.remove('show');
    }
});