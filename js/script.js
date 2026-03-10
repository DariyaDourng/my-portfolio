// ============================================
// PROJECT DATA — up to 3 images per project
// ============================================
const projectsData = {
    1: {
        title: 'Accounting & Taxation System',
        category: 'Enterprise Software',
        year: '2025',
        images: [
            'images/ams/ams1.png',
            'images/ams/ams2.png',
            'images/ams/ams3.png'
        ],
        overview: 'A specialized accounting and taxation platform designed to simplify financial tracking. Built with Laravel and Filament to provide a clean, high-performance interface for managing complex data.',
        challenge: 'The main challenge was making complicated tax rules and financial reports easy to understand. We needed a system that could handle large amounts of data while remaining fast and accurate for the user.',
        result: 'Improved the speed of generating financial reports by 35% and simplified the tax filing process. Users can now manage their history and view real-time balance updates without technical errors.',
        technologies: ['PHP', 'Laravel', 'Livewire', 'Tailwind CSS', 'Filament PHP']
    },
    2: {
        title: 'Mock Exam Platform',
        category: 'EdTech',
        year: '2025',
        images: [
            'images/mep/mep3.png',
            'images/mep/mep4.png',
            'images/mep/mep5.png'
        ],
        overview: 'An online mock exam platform built to help students prepare for university entrance exams. It provides a realistic testing environment with instant scoring and performance tracking.',
        challenge: 'The main challenge was handling real-time exam timers and processing large amounts of student data simultaneously. We needed the platform to stay fast even when many students were taking tests at once.',
        result: 'Successfully built a system that automates exam grading and provides instant feedback. Students can now track their progress over time and compare their rankings on a global leaderboard.',
        technologies: ['Laravel', 'Next.js', 'TypeScript', 'PHP', 'Tailwind CSS', 'MySQL']

    },
    3: {
        title: 'Serene App',
        category: 'MOBILE',
        year: '2023',
        images: [
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=480&fit=crop',
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=480&fit=crop',
            'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=480&fit=crop'
        ],
        overview: 'A wellness tracking mobile app designed to encourage mindful daily habits. Focused on a calm, distraction-free user experience with gentle micro-interactions.',
        challenge: 'Creating an app that felt supportive rather than judgmental, with minimal notifications and maximum user autonomy. The design needed to promote calm, not anxiety.',
        result: 'Achieved 4.8-star rating on app stores with 50k+ downloads. Users reported 30% improvement in daily habit consistency after 4 weeks.',
        technologies: ['React Native', 'Expo', 'Figma', 'Node.js', 'Firebase']
    }
};

// ============================================
// DARK MODE
// ============================================
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme') || 'light-mode';
document.body.classList.add(saved);

themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const activateNav = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
        if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
            navLinkEls.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
            if (link) link.classList.add('active');
        }
    });
};
window.addEventListener('scroll', activateNav);

// ============================================
// SCROLL REVEAL
// ============================================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// ============================================
// SKILL PROGRESS BARS
// ============================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const bar = entry.target.querySelector('.progress-bar');
        if (!bar) return;
        if (entry.isIntersecting) {
            bar.style.width = bar.dataset.width + '%';
        } else {
            bar.style.width = '0';
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-card').forEach(el => skillObserver.observe(el));

// ============================================
// PROJECT MODAL — image gallery (up to 3)
// ============================================
let currentGalleryIndex = 0;
let currentImages = [];

function openProjectModal(id) {
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modalBody');
    const p = projectsData[id];
    if (!p) return;

    currentImages = p.images || [];
    currentGalleryIndex = 0;

    body.innerHTML = `
        <!-- Image Gallery -->
        <div class="modal-gallery">
            <div class="modal-gallery-main">
                <img id="galleryMainImg" src="${currentImages[0]}" alt="${p.title}" class="modal-main-img">
                ${currentImages.length > 1 ? `
                <button class="gallery-arrow gallery-prev" onclick="galleryNav(-1)">&#8592;</button>
                <button class="gallery-arrow gallery-next" onclick="galleryNav(1)">&#8594;</button>
                <div class="gallery-counter"><span id="galleryCount">1</span> / ${currentImages.length}</div>
                ` : ''}
            </div>
            ${currentImages.length > 1 ? `
            <div class="modal-gallery-thumbs">
                ${currentImages.map((img, i) => `
                    <img src="${img}" alt="Preview ${i+1}"
                         class="gallery-thumb ${i === 0 ? 'active' : ''}"
                         onclick="gallerySetIndex(${i})"
                    >
                `).join('')}
            </div>
            ` : ''}
        </div>

        <!-- Title & Meta -->
        <div style="margin-bottom:1.5rem;">
            <h2 style="font-family:'Cormorant Garamond',serif;font-size:2.25rem;color:var(--text-dark);line-height:1.1;margin-bottom:0.75rem;">${p.title}</h2>
            <div style="display:flex;gap:1rem;align-items:center;">
                <span style="font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(212, 74, 222, 0.12);color:var(--primary-dark);padding:.375rem .75rem;border-radius:.375rem;">${p.category}</span>
                <span style="font-size:.7rem;color:var(--text-light);letter-spacing:.08em;text-transform:uppercase;">${p.year}</span>
            </div>
        </div>

        <!-- Overview / Challenge / Result -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-bottom:2rem;">
            ${[['Overview', p.overview], ['Challenge', p.challenge], ['Result', p.result]].map(([h, t]) => `
            <div>
                <h3 style="font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--primary-dark);margin-bottom:.625rem;">${h}</h3>
                <p style="font-size:.9rem;line-height:1.75;color:var(--text-light);">${t}</p>
            </div>`).join('')}
        </div>

        <!-- Technologies -->
        <div>
            <h3 style="font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--primary-dark);margin-bottom:.75rem;">Technologies</h3>
            <div style="display:flex;flex-wrap:wrap;gap:.5rem;">
                ${p.technologies.map(t => `<span style="font-size:.75rem;font-weight:500;padding:.375rem .75rem;background:rgba(222, 74, 215, 0.1);color:var(--primary-dark);border-radius:.375rem;border:1px solid rgba(222, 74, 212, 0.3);">${t}</span>`).join('')}
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function galleryNav(direction) {
    gallerySetIndex(currentGalleryIndex + direction);
}

function gallerySetIndex(index) {
    const total = currentImages.length;
    currentGalleryIndex = (index + total) % total;

    const mainImg = document.getElementById('galleryMainImg');
    const counter = document.getElementById('galleryCount');
    const thumbs = document.querySelectorAll('.gallery-thumb');

    if (mainImg) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = currentImages[currentGalleryIndex];
            mainImg.style.opacity = '1';
        }, 180);
    }
    if (counter) counter.textContent = currentGalleryIndex + 1;
    thumbs.forEach((t, i) => t.classList.toggle('active', i === currentGalleryIndex));
}

function closeProjectModal() {
    document.getElementById('projectModal').classList.remove('active');
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProjectModal();
    if (e.key === 'ArrowRight') galleryNav(1);
    if (e.key === 'ArrowLeft') galleryNav(-1);
});

// ============================================
// CONTACT FORM
// ============================================
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const msg = document.getElementById('message').value;
        window.location.href = `mailto:dariyadourng@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`)}`;
        form.reset();
    });
}