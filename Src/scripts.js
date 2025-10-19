// **ALWAYS** wait for the entire HTML structure to load before trying to find elements.
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Get Elements
    // Use the ID confirmed in the screenshot: 'openAppModal'
    const btn = document.getElementById("openAppModal"); 
    
    // Use the modal ID from the previous conversation: 'jobAppModal'
    const modal = document.getElementById("jobAppModal");
    
    // Get the close button element (span.close-button)
    const span = document.getElementsByClassName("close-button")[0];
    
    // 2. Get GUI launcher (redirect) 
    const launchGuiBtn = document.getElementById("launch-gui-btn");

    if (launchGuiBtn) {
        launchGuiBtn.addEventListener('click', function() {
            // Step 1: Show the dialog box and get user input
            const userInput = prompt("⚠️ WARNING: You are being redirected to an outside window! Type 'ok' to confirm.");
            
            if (userInput && userInput.toLowerCase() === 'ok') {
                // Step 2: Open the new window for the mock application
                const appWindow = window.open("", "_blank", "width=800,height=700");
                
                // Step 2a & 2b: Trigger file download and load application content
                if (appWindow) {
                    // Inject the necessary HTML and scripts into the new window
                    injectApplicationContent(appWindow);
                    
                    // Trigger the mock file download
                    triggerMockDownload();
                }

            } else {
                alert("Redirection canceled. You remain on the Asset Productions site.");
            }
        });
    }
    /**
 * Triggers a simulated text file download for educational purposes.
 */
function triggerMockDownload() {
    const pgpKey = `
-----BEGIN PGP MESSAGE-----
Version: Simulated for Educational Purposes Only

THIS IS A MOCK PGP KEY. PLEASE DECRYPT TO READ THE MESSAGE!!
Qld0b1VlXG5Tbmk4c3dKRHd4Umh1eW9JclVpU284ZGJhQXRhdGth
Qld0b1VlXG5Tbmk4c3dKRHd4Umh1eW9JclVpU284ZGJhQXRhdGth
Qld0b1VlXG5Tbmk4c3dKRHd4Umh1eW9JclVpU284ZGJhQXRhdGth
-----END PGP MESSAGE-----

--- PRE-DECRYPTED MESSAGE (The Lesson) ---

"THIS MESSAGE IS FOR EDUCATIONAL PURPOSES ONLY: NEVER TRUST AN ONLINE JOB APPLICATION FROM A THIRD-PARTY VENDOR!!!"
    `;

    // Create a temporary link element
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(pgpKey));
    element.setAttribute('download', 'simulated_cookie.txt');
    
    // Simulate click on the link to trigger download
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    console.log("Mock file download triggered: simulated_cookie.txt");
}

    
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
// --- New Logic for Job Opportunities Section: Monkey Error Modal ---
    
    // 1. Get Elements
    const seeAllBtn = document.getElementById('see-all-roles-btn');
    const softwareCard = document.getElementById('card-software');
    const dataCard = document.getElementById('card-data');
    const growthCard = document.getElementById('card-growth');
    
    const jobEatenModal = document.getElementById('job-eaten-modal');
    const closeEatenBtn = jobEatenModal ? jobEatenModal.querySelector('.close-btn') : null;

    // 2. Define the Handler Function
    function showJobEatenModal(event) {
        // Prevent the card/link or button from navigating/scrolling
        event.preventDefault(); 
        if (jobEatenModal) {
            jobEatenModal.style.display = 'block';
        }
    }

    // 3. Attach Event Listeners to the button and cards
    [seeAllBtn, softwareCard, dataCard, growthCard].forEach(element => {
        if (element) {
            element.addEventListener('click', showJobEatenModal);
        }
    });

    // 4. Close Modal Logic
    // Close when the 'x' is clicked
    if (closeEatenBtn) {
        closeEatenBtn.addEventListener('click', function() {
            jobEatenModal.style.display = 'none';
        });
    }

    // Close when the user clicks anywhere outside of the modal
    window.addEventListener('click', function(event) {
      if (event.target === jobEatenModal) {
        jobEatenModal.style.display = 'none';
      }
    });
    // --- End New Logic ---
/**
 * Injects the mock application form and logic into the new window.
 */
function injectApplicationContent(appWindow) {
    const mockFormHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mock Corporate Self-Identify Form</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f0f8ff; padding: 20px; color: #333; }
        .app-container { max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.2); }
        h2 { color: #004aad; border-bottom: 2px solid #ff3366; padding-bottom: 10px; margin-bottom: 20px; }
        label { display: block; margin-top: 15px; font-weight: bold; }
        input[type="text"], input[type="number"], select { width: 100%; padding: 10px; margin-top: 5px; border: 1px solid #ccc; border-radius: 5px; box-sizing: border-box; }
        .privacy-box { margin-top: 20px; padding: 15px; border: 1px dashed #ff3366; background-color: #fff0f5; font-size: 0.9em; }
        #submit-form-btn { background: #ff3366; color: white; border: none; padding: 15px; font-size: 1.1em; cursor: pointer; border-radius: 5px; margin-top: 20px; width: 100%; transition: background 0.3s; }
        #submit-form-btn:hover { background: #cc0033; }
        .error-message { color: #cc0033; font-weight: bold; margin-top: 10px; text-align: center; display: none; }
        .validation-area { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; }
    </style>
</head>
<body>
    <div class="app-container">
        <h2>Corporate Self-Identify & Screening Form</h2>
        <form id="mock-app-form">
            
            <label for="age">Age:</label>
            <input type="number" id="age" name="age" required min="16" max="150">

            <label for="race">Race (Please check all that apply):</label>
            <select id="race" name="race" required>
                <option value="">-- Select --</option>
                <option value="asian">Asian (Incl. East Asian, South Asian, Southeast Asian)</option>
                <option value="black">Black or African American</option>
                <option value="white">White</option>
                <option value="other">Other (Please Specify)</option>
                <option value="prefer_not">Prefer Not to Answer</option>
            </select>
            
            <label for="ethnicity">Ethnicity (Hispanic or Non-Hispanic):</label>
            <select id="ethnicity" name="ethnicity" required>
                <option value="">-- Select --</option>
                <option value="hispanic">Hispanic or Latino</option>
                <option value="non_hispanic">Non-Hispanic or Non-Latino</option>
                <option value="prefer_not">Prefer Not to Answer</option>
            </select>
            
            <label for="dnh">Have you ever been put on a "DO NOT HIRE" list?</label>
            <select id="dnh" name="dnh" required>
                <option value="no">No, absolutely not.</option>
                <option value="yes">Yes, but it was just a misunderstanding.</option>
            </select>

            <label for="security">What kind of security clearance do you have?</label>
            <input type="text" id="security" name="security" placeholder="TS/SCI, Secret, None, etc.">

            <label for="watchlist">Are you currently on any domestic or international watchlist?</label>
            <select id="watchlist" name="watchlist" required>
                <option value="no">I have no knowledge of being on a watchlist.</option>
                <option value="yes">A minor one for jaywalking, nothing serious.</option>
            </select>

            <div class="privacy-box">
                <input type="checkbox" id="privacy-agree" required>
                <label for="privacy-agree" style="display: inline-block;">Please read the **privacy policy and terms of service** and then hit the 'submit' button.</label>
            </div>

            <button type="button" id="submit-form-btn">Submit Mock Data</button>
        </form>

        <div class="validation-area" style="display:none;">
            <h2>Security Validation: Final Step</h2>
            <p>To finalize your application, please enter the Agent ID and Key provided on the main Asset Productions site (from the Dev API section).</p>
            
            <label for="agent-id">Agent ID (Client ID):</label>
            <input type="text" id="agent-id" placeholder="AP-TALENT-ACQ-2025-ALPHA-739B2">

            <label for="agent-key">Agent Key (Client Secret):</label>
            <input type="password" id="agent-key" placeholder="YOUR_SECRET_TOKEN_HERE_FOR_DEMO_PURPOSES">

            <button id="validate-btn" style="margin-top: 15px; background: #004aad;">Validate Credentials</button>
            <div id="validation-error" class="error-message"></div>
        </div>

    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const submitBtn = document.getElementById('submit-form-btn');
            const validationArea = document.querySelector('.validation-area');
            const validateBtn = document.getElementById('validate-btn');
            const validationError = document.getElementById('validation-error');
            const mockAppForm = document.getElementById('mock-app-form');

            // 3c. First Submit Button Logic
            submitBtn.addEventListener('click', function() {
                if (mockAppForm.reportValidity()) {
                    alert('Data submitted! Moving to security validation...');
                    validationArea.style.display = 'block';
                    submitBtn.style.display = 'none'; // Hide the first button
                } else {
                    alert('Please fill out all required fields.');
                }
            });

            // 3d. Final Validation Logic
            validateBtn.addEventListener('click', function() {
                const agentId = document.getElementById('agent-id').value.trim();
                const agentKey = document.getElementById('agent-key').value.trim();

                // Check against the static values from the main site screenshot
                const correctID = 'AP-TALENT-ACQ-2025-ALPHA-739B2';
                const correctKey = 'YOUR_SECRET_TOKEN_HERE_FOR_DEMO_PURPOSES'; // Use the placeholder as the mock key

                if (agentId === correctID && agentKey === correctKey) {
                    validationError.style.display = 'none';
                    alert('Validation successful! Proceeding to LIVE JOB POSTINGS...');
                    // Step 4: Redirect to the final, sketchy job site
                    window.opener.injectSketchySite(window); // Pass the current window reference back to the main script
                } else {
                    validationError.textContent = "Incorrect key or ID. Please check the main site screenshot.";
                    validationError.style.display = 'block';
                }
            });
        });
    </script>
</body>
</html>
    `;

    appWindow.document.write(mockFormHTML);
    appWindow.document.close();
}
/**
 * Injects the sketchy job postings site into the application window.
 * @param {Window} appWindow The window object to write content to.
 */
function injectSketchySite(appWindow) {
    const sketchySiteHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚨 LIVE JOB POSTINGS!!! APPLY NOW!!! 🚨</title>
    <style>
        body { font-family: 'Courier New', monospace; background-color: #000; color: #00ff00; padding: 20px; line-height: 1.5; }
        h1 { color: #ff00ff; text-align: center; border: 3px double #ff00ff; padding: 10px; text-shadow: 0 0 5px #ff00ff; }
        .job-container { max-width: 800px; margin: 20px auto; }
        .job-post { border: 1px solid #00ffff; padding: 15px; margin-bottom: 20px; cursor: pointer; transition: background 0.2s; }
        .job-post:hover { background-color: #001f1f; }
        .job-title { font-size: 1.5em; color: #ffcc00; }
        .language { font-size: 0.9em; color: #ccc; margin-top: 5px; }
        
        /* Modal for Premium Lock */
        .premium-modal { display: none; position: fixed; z-index: 10000; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0,0,0,0.9); }
        .modal-content { background-color: #1a1a1a; margin: 15% auto; padding: 30px; border: 5px solid #ff0000; width: 90%; max-width: 400px; text-align: center; }
        .lock-title { color: #ff0000; font-size: 2em; margin-bottom: 20px; text-shadow: 0 0 10px #ff0000; }
        .payment-option { background: #333; color: white; padding: 10px; margin: 10px 0; border-radius: 5px; cursor: not-allowed; opacity: 0.6; }
    </style>
</head>
<body>

    <h1>🔥 LIVE JOB POSTINGS!!! APPLY NOW!!! 💻</h1>
    
    <div class="job-container" id="job-container">
        <div class="job-post" data-clicked="0">
            <div class="job-title">Work in the sweatshop today!!!</div>
            <p class="language">Chinese Post | 💰 Salary: Negotiable</p>
            <p>工廠工作! :fire: :factory: :building_construction: (Click to see requirements)</p>
        </div>

        <div class="job-post" data-clicked="0">
            <div class="job-title">Data Scientist (Hacker Group: n0sc0p3)</div>
            <p class="language">Russian Post | 💸 Payment: Crypto Only</p>
            <p>Стань хакером! :computer: :dollar: :key: (Click to see requirements)</p>
        </div>
        
        <div class="job-post" data-clicked="0">
            <div class="job-title">Auto Technician!!! Degree required!!</div>
            <p class="language">Japanese Post | 🇯🇵 Location: Yokohama</p>
            <p>整備士募集! :red_exclamation: :diamond: :car: (Click to see requirements)</p>
        </div>

        <p style="height: 600px; color: #333; text-align: center;">--- MORE POSTINGS LOADING ---</p>
    </div>

    <div id="premium-lock-modal" class="premium-modal">
        <div class="modal-content">
            <div class="lock-title">🔴 WARNING: You have sent too many requests.</div>
            <p style="color: white; margin-bottom: 25px;">Please unlock the **premium version** for unlimited job access.</p>
            <div class="payment-option">VISA / Mastercard ($4.99)</div>
            <div class="payment-option">Bitcoin (0.0001 BTC)</div>
            <div class="payment-option">PayPal (Family & Friends)</div>
        </div>
    </div>

    <script>
        const jobPosts = document.querySelectorAll('.job-post');
        const premiumModal = document.getElementById('premium-lock-modal');
        let clickCount = 0;
        let lockActivated = false;

        function showPremiumLock() {
            if (lockActivated) return;
            lockActivated = true;
            premiumModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Lock the scrolling
        }

        // Click Tracking Logic (Max 3 Clicks)
        jobPosts.forEach(post => {
            post.addEventListener('click', function() {
                if (lockActivated) {
                    alert('You must unlock premium to continue!');
                    return;
                }
                clickCount++;
                console.log('Job post clicked. Count:', clickCount);

                if (clickCount > 2) { 
                    showPremiumLock();
                } else {
                    alert('Mock Application Sent for: ' + post.querySelector('.job-title').textContent);
                }
            });
        });

        // Scroll Tracking Logic (Scroll Lock)
        window.addEventListener('scroll', function() {
            if (lockActivated) return;

            // Check if user has scrolled farther than the middle of the page (e.g., past 400px scroll)
            if (window.scrollY > 400) { 
                showPremiumLock();
            }
        });
    </script>
</body>
</html>
    `;

    // Overwrite the content of the existing window
    appWindow.document.open();
    appWindow.document.write(sketchySiteHTML);
    appWindow.document.close();
}
