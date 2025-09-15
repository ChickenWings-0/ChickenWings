document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('report-form');
    const previewButton = document.getElementById('preview-button');
    const submitButton = document.getElementById('submit-button');
    const modal = document.getElementById('preview-modal');
    const confirmSubmitButton = document.getElementById('confirm-submit');
    const editButton = document.getElementById('edit-button');
    const closeModalButton = document.querySelector('.close-button');

    // Function to show validation errors
    function showValidationError(fieldId, message) {
        const errorDiv = document.getElementById(${fieldId}-error);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
    }

    // Function to hide all validation errors
    function hideValidationErrors() {
        document.querySelectorAll('.validation-message').forEach(el => {
            el.style.display = 'none';
        });
    }

    // Basic client-side validation logic
    function validateForm() {
        let isValid = true;
        hideValidationErrors();

        // Check required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value) {
                showValidationError(field.id, 'This field is required.');
                isValid = false;
            }
        });

        // File size validation
        const evidenceInput = document.getElementById('evidence');
        const file = evidenceInput.files[0];
        if (file && file.size > 52428800) { // 50 MB
            showValidationError('evidence', 'File size exceeds 50 MB limit.');
            isValid = false;
        }

        // Description length validation
        const description = document.getElementById('description');
        if (description.value.length < 20) {
            showValidationError('description', 'Please provide a little more detail (min 20 characters).');
            isValid = false;
        }

        return isValid;
    }

    // Handle Preview button click
    previewButton.addEventListener('click', (event) => {
        if (validateForm()) {
            // Populate modal with form data (simplified for this example)
            const previewMeta = document.getElementById('preview-meta');
            previewMeta.innerHTML = `
                <p><strong>Violation Type:</strong> ${document.getElementById('violation-type').value}</p>
                <p><strong>Description:</strong> ${document.getElementById('description').value}</p>
                `;

            modal.style.display = 'block';
        }
    });

    // Handle Confirm & Submit button click in modal
    confirmSubmitButton.addEventListener('click', () => {
        // Here you would handle the actual form submission, e.g., via Fetch API
        // For this front-end only example, we'll just log it
        console.log('Form data confirmed and submitted!');
        modal.style.display = 'none';
        form.reset(); // Reset the form after submission
        alert('Report submitted successfully!');
    });

    // Handle Edit/Close button clicks
    editButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Handle form submission event (will be prevented if preview is used)
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default submission
        if (validateForm()) {
            // If validation passes on direct submit (without preview), show the modal
            previewButton.click();
        }
    });

    // This is a simplified example. For a full-fledged application, you would
    // use a more robust validation library and make an actual API call with Fetch.
});
