// Configuration
const CONFIG = { displayTime: 500000, loadingTime: 1500, maxRetries: 3 };
const state = { retryCount: 0 };

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    try {
        const formData = validateFormData({
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        });
        const recaptchaResponse = await getRecaptchaResponse();
        await processFormSubmission(formData, recaptchaResponse);
    } catch (error) {
        handleError(error);
    }
});

// Core functions
function validateFormData(data) {
    const errors = [];
    if (!data.name) errors.push('Name is required!');
    if (!data.email) errors.push('Email is required!');
    if (!data.message) errors.push('Message is required!');
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Invalid email!');
    if (errors.length) throw new Error(errors.join(', '));
    return data;
}

async function getRecaptchaResponse() {
    const response = grecaptcha.getResponse();
    if (!response) throw new Error('Please complete the reCAPTCHA verification');
    return response;
}

async function processFormSubmission(formData, recaptchaResponse) {
    showMessage('Verifying reCAPTCHA and submitting form...', 'info');
    try {
        await new Promise(resolve => setTimeout(resolve, CONFIG.loadingTime));
        const info = await extractRecaptchaInfo(recaptchaResponse);
        displaySuccessMessage(info);
        resetForm();
    } catch (error) {
        throw new Error(`Form submission failed: ${error.message}`);
    }
}

async function extractRecaptchaInfo(response) {
    const timestamp = new Date();
    return {
        timestamp: timestamp.toLocaleTimeString(),
        date: timestamp.toLocaleDateString(),
        browserInfo: getBrowserInfo(),
        deviceInfo: getDeviceInfo()
    };
}

// Helper functions
function getBrowserInfo() {
    const ua = navigator.userAgent;
    const browser = {
        chrome: /Chrome\/([0-9.]+)/,
        firefox: /Firefox\/([0-9.]+)/,
        safari: /Version\/([0-9.]+).*Safari/,
        edge: /Edg\/([0-9.]+)/,
        ie: /MSIE ([0-9.]+)/
    };

    for (const [name, regex] of Object.entries(browser)) {
        const match = ua.match(regex);
        if (match) return { name: name.charAt(0).toUpperCase() + name.slice(1), version: match[1] };
    }
    return { name: 'Unknown', version: 'Unknown' };
}

function getDeviceInfo() {
    return {
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        platform: navigator.platform,
        language: navigator.language
    };
}

function displaySuccessMessage(info) {
    const successMessage = `
        <div class="recaptcha-details">
            <h3>reCAPTCHA Verification Details</h3>
            <div class="info-grid">
                <div class="info-card">
                    <div class="info-icon">🌐</div>
                    <div class="info-content">
                        <h4>Browser Information</h4>
                        <p>${info.browserInfo.name} ${info.browserInfo.version}</p>
                        <p>Platform: ${info.deviceInfo.platform}</p>
                        <p>Language: ${info.deviceInfo.language}</p>
                    </div>
                </div>
                <div class="info-card">
                    <div class="info-icon">📱</div>
                    <div class="info-content">
                        <h4>Device Details</h4>
                        <p>Screen: ${info.deviceInfo.screenSize}</p>
                        <p>Time: ${info.timestamp}</p>
                        <p>Date: ${info.date}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    showMessage(successMessage, 'success');
}

function resetForm() {
    document.getElementById('contactForm').reset();
    grecaptcha.reset();
    state.retryCount = 0;
}

function handleError(error) {
    console.error('Error:', error);
    if (state.retryCount < CONFIG.maxRetries) {
        state.retryCount++;
        showMessage(`Error: ${error.message}. Retrying... (${state.retryCount}/${CONFIG.maxRetries})`, 'error');
        setTimeout(() => grecaptcha.reset(), 1000);
    } else {
        showMessage(`Error: ${error.message}. Please try again later.`, 'error');
        state.retryCount = 0;
    }
}

function showMessage(message, type) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = message;
    messageContainer.className = type + ' visible';

    if (type === 'info') {
        messageContainer.classList.add('loading');
    }

    if (type !== 'info') {
        setTimeout(() => {
            messageContainer.innerHTML = '';
            messageContainer.className = '';
        }, CONFIG.displayTime);
    }
}

// reCAPTCHA expiration handler
window.onload = function () {
    window.recaptchaExpired = () => showMessage('reCAPTCHA has expired. Please verify again!', 'error');
};