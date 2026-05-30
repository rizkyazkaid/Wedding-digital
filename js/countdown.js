/* ========================================
   COUNTDOWN TIMER FUNCTIONALITY
   ======================================== */

function startCountdown(targetDate) {
    // Set target date (ganti dengan tanggal pernikahan Anda)
    const countdownDate = new Date(targetDate).getTime();

    // Update countdown setiap 1 detik
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update HTML elements
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        // Stop countdown if date has passed
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }, 1000);
}

// Initialize countdown dengan tanggal pernikahan
// Format: "June 15, 2024 10:00:00"
// Ganti dengan tanggal dan jam pernikahan Anda
document.addEventListener('DOMContentLoaded', () => {
    startCountdown('June 15, 2024 10:00:00');
});
