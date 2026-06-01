document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('academic-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async function (e) {
    e.preventDefault(); 
    
    // Set up processing message display layouts
    status.style.display = 'block';
    status.className = ''; 
    status.style.color = '#162506';
    status.innerText = "Processing submission securely...";

    // Serialize form values cleanly for deployment endpoints
    const formData = new URLSearchParams(new FormData(form));

    try {
      // Execute the POST request to the Google Script Web App link
      await fetch(form.action, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      // Handle custom user interface validation states on execution completion
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
