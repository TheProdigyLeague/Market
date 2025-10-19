// **ALWAYS** wait for the entire HTML structure to load before trying to find elements.
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Get Elements
    // Use the ID confirmed in the screenshot: 'openAppModal'
    const btn = document.getElementById("openAppModal"); 
    
    // Use the modal ID from the previous conversation: 'jobAppModal'
    const modal = document.getElementById("jobAppModal");
    
    // Get the close button element (span.close-button)
    const span = document.getElementsByClassName("close-button")[0];

    
    // 2. Attach Opening Handler (Check if both elements were successfully found)
    if (btn && modal) {
        // Use addEventListener to prevent conflicts/overwrites
        btn.addEventListener('click', function(event) {
            // Prevent the 'a' tag (link) from jumping to the top of the page
            event.preventDefault(); 
            
            console.log("SUCCESS: Button Clicked. Modal opening.");
            modal.style.display = "block";
        });
    } else {
        console.error("ERROR: Button (openAppModal) or Modal (jobAppModal) element not found in DOM.");
    }

    
    // 3. Attach Closing Handlers (Check if elements exist)
    if (span && modal) {
        span.addEventListener('click', function() {
          modal.style.display = "none";
        });
    }

    // 4. Close when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
});
