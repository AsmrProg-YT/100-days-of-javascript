// Initialize EmailJS with your public key
(function () {
    // Replace this with your EmailJS public key
    emailjs.init("EMAILJS_PUBLIC_KEY");
})();

// Get form and success message elements
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('success-message');

// Add form submit event listener
contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form data
    const formData = {
        to_name: "Admin",
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        reply_to: document.getElementById('email').value // This allows you to reply directly to the sender
    };

    // Send email using EmailJS
    // Replace Service_ID and Template_ID with your EmailJS service and template IDs
    emailjs.send('EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', formData).then(function (response) {
        // Show success message
        successMessage.classList.remove('hidden');
        // Clear form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }).catch(function (error) {
        alert('Failed to send message. Please try again.');
    });
});