class FormHandler {
  constructor() {
    // Bind event listeners
    document.addEventListener("DOMContentLoaded", () => this.initialize());
  }

  initialize() {
    // Add event listener to the submit button
    document
      .getElementById("tablebutton")
      .addEventListener("click", (event) => this.handleSubmit(event));
  }

  handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const guest = document.getElementById("guest").value;
    const guesttable = document.getElementById("guesttable").value;
    const cellphone = document.querySelector("input[placeholder='Cellphone']");
    const name = document.querySelector("input[placeholder='Name']");
    const email = document.getElementById("email");
    const comment = document.getElementById("comment");

    // Check if any field is empty
    if (
      !guest ||
      !guesttable ||
      !cellphone.value ||
      !name.value ||
      !email.value ||
      !comment.value
    ) {
      // Highlight missing fields
      if (!guest) document.getElementById("guest").classList.add("error");
      if (!guesttable)
        document.getElementById("guesttable").classList.add("error");
      if (!cellphone.value) cellphone.classList.add("error");
      if (!name.value) name.classList.add("error");
      if (!email.value) email.classList.add("error");
      if (!comment.value) comment.classList.add("error");

      alert("Please fill all fields.");
      return; // Exit function if any field is empty
    }

    // Log form data (You can replace this with your desired action e.g., sending data to a server)
    console.log("Guest:", guest);
    console.log("Guest Table:", guesttable);
    console.log("Cellphone:", cellphone.value);
    console.log("Name:", name.value);
    console.log("Email:", email.value);
    console.log("Comment:", comment.value);

    // Reset form fields and remove error classes
    document.getElementById("guest").selectedIndex = 0;
    document.getElementById("guesttable").selectedIndex = 0;
    cellphone.value = "";
    name.value = "";
    email.value = "";
    comment.value = "";

    // Remove error classes
    document
      .querySelectorAll(".form_style")
      .forEach((field) => field.classList.remove("error"));

    // Show success message
    window.alert("Thank you! An agent will contact you shortly.");
  }
}

// Instantiate FormHandler
const formHandler = new FormHandler();
