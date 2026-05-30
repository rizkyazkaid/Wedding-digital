/* ========================================
   MAIN JAVASCRIPT FUNCTIONALITY
   ======================================== */

// ========== OPENING FUNCTIONALITY ==========

document.getElementById('openBtn').addEventListener('click', function() {
    const opening = document.getElementById('opening');
    const mainContent = document.getElementById('mainContent');

    // Fade out opening
    opening.style.opacity = '0';
    opening.style.transition = 'opacity 0.8s ease';

    setTimeout(() => {
        opening.style.display = 'none';
        mainContent.classList.remove('hidden');
        mainContent.style.opacity = '0';
        mainContent.style.transition = 'opacity 0.8s ease';

        // Trigger fade in
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 10);
    }, 800);

    // Play music
    playBackgroundMusic();
});

// ========== BACKGROUND MUSIC CONTROL ==========

let bgMusic = null;
let isMusicPlaying = false;

function initializeMusic() {
    // Ganti dengan path musik Anda
    bgMusic = new Audio('music/background-music.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
}

function playBackgroundMusic() {
    if (!bgMusic) {
        initializeMusic();
    }

    bgMusic.play().catch(error => {
        console.log('Autoplay musik diblokir browser:', error);
    });

    isMusicPlaying = true;
}

function toggleMusic() {
    if (!bgMusic) {
        initializeMusic();
    }

    const musicBtn = document.getElementById('musicBtn');

    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '<span>🔇 Putar Musik</span>';
    } else {
        bgMusic.play();
        isMusicPlaying = true;
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<span>🔊 Hentikan Musik</span>';
    }
}

// Music button event listener
const musicBtn = document.getElementById('musicBtn');
if (musicBtn) {
    musicBtn.addEventListener('click', toggleMusic);
}

// Allow music play on first interaction anywhere on page
document.addEventListener('click', () => {
    if (!isMusicPlaying && bgMusic) {
        playBackgroundMusic();
    }
}, { once: true });

// ========== RSVP FORM HANDLING ==========

const rsvpForm = document.getElementById('rsvpForm');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            nama: document.querySelector('input[name="nama"]').value,
            email: document.querySelector('input[name="email"]').value,
            phone: document.querySelector('input[name="phone"]').value,
            kehadiran: document.querySelector('select[name="kehadiran"]').value,
            jumlah_tamu: document.querySelector('input[name="jumlah_tamu"]').value || 1,
            ucapan: document.querySelector('textarea[name="ucapan"]').value,
            tanggal_submit: new Date().toLocaleString('id-ID')
        };

        // Log form data (untuk testing)
        console.log('RSVP Data:', formData);

        // Option 1: Simpan ke localStorage (untuk demo)
        let rsvpList = JSON.parse(localStorage.getItem('rsvpList')) || [];
        rsvpList.push(formData);
        localStorage.setItem('rsvpList', JSON.stringify(rsvpList));

        // Option 2: Kirim ke server (uncomment untuk menggunakan)
        // sendRSVPToServer(formData);

        // Show success message
        showSuccessMessage();

        // Reset form
        rsvpForm.reset();
    });
}

// ========== SEND RSVP TO SERVER ==========

function sendRSVPToServer(formData) {
    // Ganti 'YOUR_API_ENDPOINT' dengan endpoint API Anda
    const apiEndpoint = 'YOUR_API_ENDPOINT';

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// ========== SUCCESS MESSAGE ==========

function showSuccessMessage() {
    // Create success message element
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = '✓ RSVP berhasil dikirim! Terima kasih atas konfirmasi Anda.';
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.5s ease;
    `;

    document.body.appendChild(successMsg);

    // Remove after 4 seconds
    setTimeout(() => {
        successMsg.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(successMsg);
        }, 500);
    }, 4000);
}

// ========== SMOOTH SCROLL FOR NAVIGATION ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== ADD SLIDE-IN ANIMATIONS ==========

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .success-message {
        animation: slideInRight 0.5s ease;
    }
`;
document.head.appendChild(style);

// ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==========

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

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ========== VALIDATE PHONE NUMBER ==========

const phoneInput = document.querySelector('input[name="phone"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        // Remove non-digit characters
        e.target.value = e.target.value.replace(/[^\d]/g, '');
    });
}

// ========== INITIALIZE ON PAGE LOAD ==========

document.addEventListener('DOMContentLoaded', function() {
    console.log('Wedding Digital Invitation loaded successfully!');
    
    // Initialize music
    initializeMusic();
});

// ========== UTILITY: GET ALL RSVP DATA ==========

function getAllRSVPData() {
    return JSON.parse(localStorage.getItem('rsvpList')) || [];
}

function getRSVPStats() {
    const rsvpList = getAllRSVPData();
    const hadir = rsvpList.filter(r => r.kehadiran === 'hadir').length;
    const tidakHadir = rsvpList.filter(r => r.kehadiran === 'tidak').length;
    const raguRagu = rsvpList.filter(r => r.kehadiran === 'ragu').length;
    const totalTamu = rsvpList.reduce((sum, r) => sum + parseInt(r.jumlah_tamu || 1), 0);

    return {
        total: rsvpList.length,
        hadir: hadir,
        tidakHadir: tidakHadir,
        raguRagu: raguRagu,
        totalTamu: totalTamu
    };
}

// Contoh penggunaan di console browser:
// getAllRSVPData() - untuk melihat semua data RSVP
// getRSVPStats() - untuk melihat statistik RSVP
