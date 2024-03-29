// Define a class named UserForm
class UserForm {
  // Constructor function, which is called when a new instance of the class is created
  constructor() {
    // Retrieve previously stored form data from session storage
    this.storedFormData = sessionStorage.getItem("formData");
    // Get reference to the email input field in the form
    this.emailInput = document.getElementById("email");
    // Get reference to the password input field in the form
    this.passwordInput = document.getElementById("password");
    // Get reference to the submit button in the form
    this.submitButton = document.querySelector("form button[type='submit']");
    // Get reference to the go back link
    this.goBackLink = document.getElementById("goBackLink");

    // Initialize the form with stored data
    this.fillFormFields();

    // Add event listeners to various form elements
    this.addEventListeners();

    // Initially toggle the state of the submit button
    this.toggleButtonState();
  }

  // Method to fill form fields with stored data, if available
  fillFormFields() {
    if (this.storedFormData) {
      // Parse the stored form data from JSON format
      const formData = JSON.parse(this.storedFormData);
      // Set the value of the email input field to the stored email, or empty string if not available
      this.emailInput.value = formData.email || "";
      // Set the value of the password input field to the stored password, or empty string if not available
      this.passwordInput.value = formData.password || "";
    }
  }

  // Method to add event listeners to form elements
  addEventListeners() {
    // Add a submit event listener to the form
    document.querySelector("form").addEventListener("submit", (event) => {
      // Call the handleSubmit method when the form is submitted
      this.handleSubmit(event);
    });

    // Add an input event listener to the email input field
    this.emailInput.addEventListener("input", () => {
      // Call the toggleButtonState method when there's an input in the email field
      this.toggleButtonState();
    });

    // Add an input event listener to the password input field
    this.passwordInput.addEventListener("input", () => {
      // Call the toggleButtonState method when there's an input in the password field
      this.toggleButtonState();
    });

    // Add click event listener to the go back link
    this.goBackLink.addEventListener("click", () => {
      // Clear session storage
      sessionStorage.removeItem("formData");
    });
  }

  // Method to handle form submission
  handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get the trimmed values of email and password input fields
    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value.trim();

    // Check if the provided email and password match a predefined set of credentials
    if (
      (email === "Main@User.com" && password === "MainUser12") ||
      (this.storedFormData &&
        email === JSON.parse(this.storedFormData).email &&
        password === JSON.parse(this.storedFormData).password)
    ) {
      // Open a new window with a redirect URL including email and password parameters
      window.open(
        "/konka.html?email=" + email + "&password=" + password,
        "_blank"
      );
      window.close();
    } else {
      // Alert the user about invalid email or password
      alert(
        "Invalid email or password. Please register if you are a new user."
      );
    }
  }

  // Method to toggle the state of the submit button based on form input
  toggleButtonState() {
    // Get the trimmed values of email and password input fields
    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value.trim();

    // Check if the provided email and password match a predefined set of credentials
    if (
      (email === "Main@User.com" && password === "MainUser12") ||
      (this.storedFormData &&
        email === JSON.parse(this.storedFormData).email &&
        password === JSON.parse(this.storedFormData).password)
    ) {
      // Enable the submit button if credentials are valid
      this.submitButton.disabled = false;
    } else {
      // Disable the submit button if credentials are invalid
      this.submitButton.disabled = true;
    }
  }
}

// Instantiate the UserForm class to create an instance of the form functionality
const userForm = new UserForm();
