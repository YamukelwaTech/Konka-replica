document.addEventListener("DOMContentLoaded", function() {
  // Define a class for the payment form
  class PaymentForm {
      // Constructor to initialize the form
      constructor(formSelector, buttonSelector, inputSelector) {
          // Select the form, button, and input fields based on the provided selectors
          this.form = document.querySelector(formSelector);
          this.button = document.querySelector(buttonSelector);
          this.inputs = document.querySelectorAll(inputSelector);

          // Initialize the form
          this.init();
      }

      // Method to initialize the form
      init() {
          // Add event listeners to input fields to update button status
          this.inputs.forEach(input => {
              input.addEventListener('input', () => this.updateButtonStatus());
          });

          // Add event listener to the button for form submission
          this.button.addEventListener('click', () => this.handleButtonClick());

          // Initially update button status
          this.updateButtonStatus();
      }

      // Method to check if all input fields are filled
      checkInputsFilled() {
          // Check if every input field has a non-empty value
          return Array.from(this.inputs).every(input => input.value.trim() !== '');
      }

      // Method to update button status based on input fields
      updateButtonStatus() {
          // Disable button if any input field is empty, enable otherwise
          this.button.disabled = !this.checkInputsFilled();
      }

      // Method to handle button click event
      handleButtonClick() {
          // Check if all input fields are filled
          if (this.checkInputsFilled()) {
              // Reset all input fields
              this.form.reset();

              // Show a pop-up message
              alert('Thank you! Your invoice will be loaded by KONKA & sent directly to your mail!.');

              // Redirect to another page after 2 seconds
              setTimeout(() => {
                  window.location.href = 'konka.html';
              }, 2000);
          } else {
              // If not all inputs are filled, show an error message
              this.showError('Please fill in all fields before proceeding.');
          }
      }

      // Method to show error message
      showError(message) {
          alert(message);
      }
  }

  // Instantiate the PaymentForm class with appropriate selectors
  const paymentForm = new PaymentForm('.form', '.checkout-btn', '.input-field');
});
