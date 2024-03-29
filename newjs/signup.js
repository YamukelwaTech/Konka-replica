class FormValidator {
  // This is a special function that creates a new FormValidator.
  // It takes different parts of the form as inputs.
  constructor(
    nameInput,
    emailInput,
    passwordInput,
    signupButton,
    options = {}
  ) {
    // Store the input fields and button for later use.
    this.nameInput = nameInput;
    this.emailInput = emailInput;
    this.passwordInput = passwordInput;
    this.signupButton = signupButton;
    // Store an optional error display element.
    // We use the options parameter to check if it's provided.
    this.errorDisplay = options.errorDisplay || null;

    // When the signup button is clicked, call the checkForm function.
    this.signupButton.addEventListener("click", this.checkForm.bind(this));
  }

  // This function checks if the form is filled correctly when the signup button is clicked.
  // It also displays error messages if something is wrong.
  checkForm(event) {
    // Don't let the form submit the usual way.
    event.preventDefault();
    // Start with no error messages.
    let errorMessage = "";

    // Check each part of the form for errors and add messages if needed.
    errorMessage += this.validateName();
    errorMessage += this.validateEmail();
    errorMessage += this.validatePassword();

    // If there are error messages, show them to the user.
    if (errorMessage) {
      // If an error display is provided, show the messages there.
      if (this.errorDisplay) {
        this.errorDisplay.textContent = errorMessage;
      } else {
        // If not, just show an alert with the messages.
        alert(errorMessage);
      }
    } else {
      // If everything is filled correctly, save the form data and go to the login page.

      // Save the form data into a special place called local storage.
      const formData = {
        name: this.nameInput.value.trim(),
        email: this.emailInput.value.trim(),
        // We don't save the password directly for safety reasons.
        // but will save for demo use only!
        password: this.passwordInput.value.trim(),
      };
      sessionStorage.setItem("formData", JSON.stringify(formData));

      // Clear the form fields.
      this.resetForm();
      // Go to the login page.
      window.location.href = "/html/login.html";
    }
  }

  // This function checks if the name input is filled correctly.
  validateName() {
    // If there's no name, return a message asking for it.
    if (!this.nameInput.value.trim()) {
      return "Name is required\n";
    } else if (/\d/.test(this.nameInput.value)) {
      // If the name contains numbers, return a message asking to remove them.
      return "Name must not contain numbers\n";
    }
    // If everything is fine, return no message.
    return "";
  }

  // This function checks if the email input is filled correctly.
  validateEmail() {
    // Check if the email follows a simple pattern.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // If it doesn't match the pattern, return a message asking for a valid email.
    if (!emailPattern.test(this.emailInput.value)) {
      return "Please enter a valid email address\n";
    }
    // If everything is fine, return no message.
    return "";
  }

  // This function checks if the password input is filled correctly.
  validatePassword() {
    // Check if the password follows a certain pattern.
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    // If it doesn't match the pattern, return a message explaining the requirements.
    if (!passwordPattern.test(this.passwordInput.value)) {
      return "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter\n";
    }
    // If everything is fine, return no message.
    return "";
  }

  // This function clears the form fields and error messages.
  resetForm() {
    // Clear the name, email, and password fields.
    this.nameInput.value = "";
    this.emailInput.value = "";
    this.passwordInput.value = "";
    // Clear any error messages if they exist.
    if (this.errorDisplay) {
      this.errorDisplay.textContent = "";
    }
  }
}

// Usage example:
// Get the form elements from the web page.
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const signupButton = document.getElementById("signupButton");
const errorDisplay = document.getElementById("errorDisplay");

// Create a new FormValidator with the form elements we got.
const formValidator = new FormValidator(
  nameInput,
  emailInput,
  passwordInput,
  signupButton,
  { errorDisplay }
);
