// Define a class for a Ticket
class Ticket {
  // Constructor for the Ticket class
  constructor(type, pricePerPerson, validUntil, options, index) {
    this.type = type; // The type of the ticket
    this.pricePerPerson = pricePerPerson; // The price per person for this ticket
    this.validUntil = validUntil; // The date until which this ticket is valid
    this.options = options; // The options for the number of people
    this.index = index; // The index of this ticket in the tickets array
    this.ticketNumber = Math.floor(Math.random() * 10000); // Generates a random number between 0 and 9999 for the ticket number
  }

  // Method to buy a ticket
  buyTicket() {
    // Get the elements for the number of people, time, and ticket number
    let numberOfPeopleElement = document.querySelector(
      `.numberOfPeople[data-ticket-index="${this.index}"]`
    );
    let timeElement = document.querySelector(
      `.time[data-ticket-index="${this.index}"]`
    );
    let ticketNumberElement = document.querySelector(
      `.ticketNumber[data-ticket-index="${this.index}"]`
    );

    // Create an object with the details of the ticket
    let ticketDetails = {
      datePurchased: new Date().toISOString().split("T")[0], // Get the current date in 'YYYY-MM-DD' format
      ticketNumber: this.ticketNumber,
      ticketType: this.type,
      ticketPrice: this.pricePerPerson * numberOfPeopleElement.textContent, // Calculate the ticket price
      numberOfPeople: numberOfPeopleElement.textContent,
      time: timeElement.textContent,
    };

    // Store the ticket details in local storage
    localStorage.setItem("ticketDetails", JSON.stringify(ticketDetails));

    // Redirect to the checkout page
    window.location.href = "checkout.html";
  }

  // Method to generate the HTML for a ticket
  generateHTML() {
    // Generate the HTML for the options
    let optionsHTML = this.options
      .map(
        (option, index) =>
          `<option value="${index + 1}">${option} Person${
            index > 0 ? "s" : ""
          }</option>`
      )
      .join("\n");

    // Return the HTML for the ticket
    return `
                <div class="ticket">
                    <div class="ticket-header">
                    <h3>${this.type}</h3>
                    <p>Valid until ${this.validUntil}</p>
                </div>
                    <select onchange="updatePrice(this, ${this.pricePerPerson}, ${this.index})">
                        <option value="0">Select number of people</option>
                        ${optionsHTML}
                    </select>
                    <p class="price">R: 00.00</p>
                    <p><span class="label">Number of People:</span> <span class="numberOfPeople" data-ticket-index="${this.index}"></span></p>
                    <p><span class="label">Time:</span> <span class="time" data-ticket-index="${this.index}"></span></p>
                    <p><span class="label">Ticket Number:</span> <span class="ticketNumber" data-ticket-index="${this.index}"></span></p>
                    <button onclick="buyTicket(${this.index})">Buy Ticket</button>
                </div>
`;
  }
}

// Function to buy a ticket
function buyTicket(ticketIndex) {
  tickets[ticketIndex].buyTicket();
}

// Function to update the price when the number of people is changed
function updatePrice(selectElement, pricePerPerson, ticketIndex) {
  // Calculate the price
  let selectedOption = selectElement.options[selectElement.selectedIndex];
  let price = pricePerPerson * selectedOption.value;
  selectElement.nextElementSibling.textContent = `R: ${price.toFixed(2)}`;

  // Update the number of people, time, and ticket number
  let numberOfPeopleElement = document.querySelector(
    `.numberOfPeople[data-ticket-index="${ticketIndex}"]`
  );
  let timeElement = document.querySelector(
    `.time[data-ticket-index="${ticketIndex}"]`
  );
  let ticketNumberElement = document.querySelector(
    `.ticketNumber[data-ticket-index="${ticketIndex}"]`
  );

  numberOfPeopleElement.textContent = selectedOption.value;
  timeElement.textContent = new Date().toLocaleTimeString();
  ticketNumberElement.textContent = tickets[ticketIndex].ticketNumber;

  // Update the properties of the Ticket object
  tickets[ticketIndex].numberOfPeople = selectedOption.value;
  tickets[ticketIndex].time = new Date().toLocaleTimeString();
  tickets[ticketIndex].ticketNumber = tickets[ticketIndex].ticketNumber;
}

// Create an array of tickets
let tickets = [
  new Ticket(
    "Free Pass",
    0,
    "26th Dec",
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    0
  ),
  new Ticket(
    "Day1 Pass",
    150,
    "27th Dec",
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    0
  ),
  new Ticket(
    "Day2 Pass",
    250,
    "28th Dec",
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    1
  ),
  new Ticket(
    "Full Event Pass",
    550,
    "29th Dec",
    ["1", "2", "3", "4", "5", "6", "7", "8"],
    2
  ),
];

// Get the ticket station element
let ticketStation = document.getElementById("ticket-station");

// Add the HTML for the tickets to the ticket station
ticketStation.innerHTML += tickets[0].generateHTML();
ticketStation.innerHTML += tickets[1].generateHTML();
ticketStation.innerHTML += tickets[2].generateHTML();
ticketStation.innerHTML += tickets[3].generateHTML();
