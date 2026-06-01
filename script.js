document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('academic-form');
  const status = document.getElementById('form-status');
  
  // Mobile Navigation Selectors
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-links a');

  /* --- MOBILE NAVIGATION TOGGLE ACTIVE LOGIC --- */
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });

    // Automatically dismiss the vertical drop-down list interface when links are executed
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  /* --- DATA TRANSMISSION SCRIPT INTO INTERFACED GOOGLE SHEET --- */
  form.addEventListener('submit', async function (e) {
    e.preventDefault(); 
    
    status.style.display = 'block';
    status.className = ''; 
    status.style.color = '#162506';
    status.innerText = "Processing submission securely...";

    const formData = new URLSearchParams(new FormData(form));

    try {
      await fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      status.className = 'status-success';
      status.style.color = '#155724';
      status.innerText = "Success! Your submission has been captured and routed directly to our spreadsheet queue.";
      form.reset();

    } catch (error) {
      status.className = 'status-error';
      status.style.color = '#721c24';
      status.innerText = "There was an error communicating with the spreadsheet. Please verify your internet connection.";
      console.error("Transmission error encountered:", error);
    }
  });
});
