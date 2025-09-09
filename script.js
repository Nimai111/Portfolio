// Initialize EmailJS
emailjs.init("O2Yp78bnYgNZMYMAh"); // Replace with your EmailJS public key

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 1500);
});

// Typing Animation
const typingText = document.querySelector('.profession');
const professions = ['Python Developer Intern', 'Full Stack Developer', 'Problem Solver'];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        typingText.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentProfession.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
    }

    const typingSpeed = isDeleting ? 50 : 150;
    setTimeout(typeEffect, typingSpeed);
}
typeEffect();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Dark Mode Toggle with Local Storage
const themeToggle = document.querySelector('.mode-toggle');
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', isDarkMode);
    themeToggle.innerHTML = isDarkMode ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
}

// Set initial theme
document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
themeToggle.innerHTML = isDarkMode ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
themeToggle.addEventListener('click', toggleTheme);

// Skills Animation
const skillBars = document.querySelectorAll('.progress');
const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.getAttribute('data-progress');
            observer.unobserve(entry.target);
        }
    });
};

const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    skillsObserver.observe(bar);
});

// Project Cards Animation
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => projectObserver.observe(card));

// Contact Form with EmailJS
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // ✅ Match your EmailJS template variable names
    const templateParams = {
        from_name: contactForm.name.value,
        from_email: contactForm.email.value,
        message: contactForm.message.value
    };

    emailjs.send('service_v6h54mk', 'template_14thnkc', templateParams)
        .then(() => {
            submitBtn.textContent = 'Message Sent!';
            contactForm.reset();
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        })
        .catch(error => {
            console.error('Error:', error);
            submitBtn.textContent = 'Error! Try Again';
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
});

// Experience Card Animation
const experienceCard = document.querySelector('.experience-card');
const expObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.2 });

expObserver.observe(experienceCard);

// Logo Animation
const logoText = document.querySelectorAll('.logo-text span');
logoText.forEach((span, index) => {
    span.style.animationDelay = `${index * 0.2}s`;
});

// Scroll Progress Indicator
const scrollIndicator = document.createElement('div');
scrollIndicator.className = 'scroll-progress';
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollIndicator.style.width = `${scrolled}%`;
});
