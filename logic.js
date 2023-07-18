const billAmount = document.querySelector("#bill-amount"); //selecting bill amount
const cashReceived = document.querySelector("#cash-received"); //selecting cash received
const checkButton = document.querySelector("#check-button"); // selecting button
const resetButton = document.querySelector("#reset-button");
const errorMessage = document.querySelector(".error"); //selecting error field
const countofNotes = document.querySelectorAll(".note-count"); //selecing all tds where we want to output count of notes

const availableNotes = [2000, 1000, 500, 100, 50, 20, 10, 1]; //all the available currencies

checkButton.addEventListener("click", validateBillAndCash); //adding event listener to check button
resetButton.addEventListener("click", reset); //adding event listener to reset button

/* This function is used to reset the input fields */
function reset() {
  billAmount.value = "";
  cashReceived.value = "";
  hideMessage();
}

/* This function checks if the bill amount and cash are valid or not */
function validateBillAndCash() {
  hideMessage(); //Initially we don't want any error message
  if (billAmount.value > 0) {
    //valid condition
    if (Number(cashReceived.value) >= Number(billAmount.value)) {
      //we calculate the differnce we want to return
      const amountToBeReturned =
        Number(cashReceived.value) - Number(billAmount.value);
      //now we call our function that calculates the minimum number of notes needed to return the change
      calculateReturnChange(amountToBeReturned);
    } else {
      //this error message will be shown if our cash received is lower than the bill amount
      showErrorMessage(
        "Cash Received should be greater than or equal to bill amount."
      );
    }
  } else {
    //this error message will be shown if our bill amoumnt is 0
    showErrorMessage(
      "Invalid bill amount, bill amount should be greater than 0."
    );
  }
}

/* Function to calculate the count of minimum number of notes to return the change */
function calculateReturnChange(amountToBeReturned) {
  for (var i = 0; i < availableNotes.length; i++) {
    var numberOfNotes = Math.trunc(amountToBeReturned / availableNotes[i]); //count of current note
    amountToBeReturned = Math.trunc(amountToBeReturned % availableNotes[i]); // amount still left to return
    countofNotes[i].innerText = numberOfNotes; //outputing the note count
  }
}
/* Function to hide error message */
function hideMessage() {
  errorMessage.style.display = "none";
}

/* Function to show error message with our passed error text */
function showErrorMessage(errorMessageText) {
  errorMessage.style.display = "block";
  errorMessage.innerText = errorMessageText;
}
