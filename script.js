// ==================== MOBILE MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== STICKY HEADER ON SCROLL ====================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================== ACTIVE NAVIGATION LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ==================== SMOOTH SCROLLING FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== BACK TO TOP BUTTON ====================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== APPOINTMENT FORM HANDLING ====================
const appointmentForm = document.getElementById('appointmentForm');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        department: document.getElementById('department').value,
        date: document.getElementById('date').value,
        message: document.getElementById('message').value
    };
    
    // Show success message (since this is a static site, we'll just show an alert)
    alert(`Thank you, ${formData.name}!\n\nYour appointment request has been received.\n\nDepartment: ${formData.department}\nPreferred Date: ${formData.date}\n\nOur team will contact you shortly at ${formData.phone} to confirm your appointment.`);
    
    // Reset form
    appointmentForm.reset();
    
    // Optional: Scroll to top or show a success message on the page
    // You can customize this behavior
});

// ==================== SET MINIMUM DATE FOR APPOINTMENT ====================
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.dept-card, .doctor-card, .facility-card, .testimonial-card, .gallery-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== GALLERY LIGHTBOX EFFECT (Simple) ====================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const imgSrc = img.getAttribute('src');
        const imgAlt = img.getAttribute('alt');
        
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        `;
        
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 30px;
            right: 40px;
            color: white;
            font-size: 40px;
            cursor: pointer;
            z-index: 10001;
        `;
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Close lightbox on click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target === closeBtn) {
                document.body.removeChild(lightbox);
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        });
    });
});

// ==================== COUNTER ANIMATION FOR STATS ====================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            if (number) {
                animateCounter(entry.target, number);
            }
        }
    });
}, { threshold: 0.5 });

const statItems = document.querySelectorAll('.stat-item h3');
statItems.forEach(item => {
    statObserver.observe(item);
});

// ==================== FORM VALIDATION ENHANCEMENT ====================
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function(e) {
    // Remove non-numeric characters
    this.value = this.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (this.value.length > 10) {
        this.value = this.value.slice(0, 10);
    }
});

// ==================== LOADING ANIMATION (Optional) ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c🏥 Shayona Multispeciality Hospital & ICU', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #00a86b; font-size: 14px;');

