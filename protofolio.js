// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.querySelectorAll('.hamburger-line')[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    hamburger.querySelectorAll('.hamburger-line')[1].style.opacity = isOpen ? 0 : 1;
    hamburger.querySelectorAll('.hamburger-line')[2].style.transform = isOpen ? 'rotate(-45deg) translate(7px, -6px)' : '';
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
    });
});

// Smooth scroll and active nav
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Section highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const observerOptions = { root: null, threshold: 0.5 };

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        }
    });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// Reveal on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Animate skill bars
            if (entry.target.id === 'skills') {
                document.querySelectorAll('.skill-progress').forEach(bar => {
                    bar.style.width = `${bar.dataset.progress}%`;
                });
            }
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Project modal (example for first project)
const modal = document.getElementById('project-modal');
const openModalBtns = document.querySelectorAll('.project-card'); // Adjust for specific
openModalBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        // Populate modal with project data (placeholder)
    });
});
document.querySelector('.modal-close').addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
});
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Contact form
const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !message) {
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.style.color = 'red';
        return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
        formMessage.textContent = 'Invalid email address.';
        formMessage.style.color = 'red';
        return;
    }
    
    try {
        const response = await fetch('https://example.com/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });
        if (response.ok) {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.style.color = 'green';
            form.reset();
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        formMessage.textContent = 'Error sending message. Please try again later.';
        formMessage.style.color = 'red';
    }
});

// Back to top
document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});