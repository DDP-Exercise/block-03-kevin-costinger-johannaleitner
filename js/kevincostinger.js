"use strict"; //// aktiviert den "strengen Modus" → verhindert unsaubere Fehler (z.B. vergessene Variablen-Deklaration)
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     Johanna - 2026-04-13
 *******************************************************/
let sumExpenses = 0; //Use this variable to keep the total sum up to date; variable, that will save all expenses

// two EventListeners; Submit button and Delete button
document.querySelector("form").addEventListener("submit", submitForm);
document.querySelector("#expenses tbody").addEventListener("click", handleDelete); // # selects parent of the table

function submitForm(event){ // parameter event-object or short (e)
    //TODO: Prevent the default behavior of the submit button.
    event.preventDefault(); // prevents default mode after submitting

    let dateInput = document.getElementById("date"); // get element (from html) from DOM
    let amountInput = document.getElementById("amount");
    let textInput = document.getElementById("expense");

    let date = dateInput.value; // // get the value from the input field
    let amount = parseFloat(amountInput.value); // float numbers, not just integer
    let text = textInput.value;

    //TODO: Validate the form. If everything is fine, add the expense to the tracker and reset the form.
    if (isEmpty(date)) { // if date input field is empty
        dateInput.focus(); // set curser focus back to input; still needs to be filled
        return; // stops; return with values would give back ?
    }

    if (isNaN(amount) || amount < 0.01) {
        // checks if thev amount is NotANumber OR smaller then 0.01?
        amountInput.focus(); // curser focus back in the amount-field
        return;
    }

    if (text.length < 3) {
        // checks if this text has less than 3 characters?
        textInput.focus(); // shifts cursor focus back in the input field
        return; // abbrechen
    }

    // ADD EXPENSE
    addExpenseRow(date, amount, text);
    // gets function → created new table-row with it


    // UPDATE SUM
    updateSum(amount);
    // adds number to total sum


    // RESET FORM
    event.target.reset();
    // resets all input fields with each submit; makes space for next input
}

// function to add new table-row (+ line 81)
function addExpenseRow(date, amount, text){

    let table = document.querySelector("#expenses tbody");
    // gets table-body (<tbody>)

    let row = document.createElement("tr");
    // created new table-row

    row.innerHTML = ` <!--TODO: ask in class-->
        <td>${date}</td>  <!--reminder; td = table data-->
        <!--adds date in first column-->

        <td>${formatEuro(amount)}</td> 
        <!--adds spent amount formated with EUR sign-->

        <td>${text}</td> 
        <!--adds discription-->

        <td class="delete">❌</td> 
        <!--adds delet button with class "delete"-->
    `;

    table.appendChild(row);
    // adds new row to the table; as in child to parent element
}

// function to update sum
function updateSum(amount){

    sumExpenses += amount;
    // adds new amount to total sum

    document.getElementById("expenseSum").textContent = formatEuro(sumExpenses);
    // TODO: ask; update the displayed sum in the html??
}

// function to delete entries (Event Delegation); umständlich, weil die delete-buttons nicht von anfang an existieren
function handleDelete(event){

    if (!event.target.classList.contains("delete")) return;
    // checks if the delete element was clicked
    // if no → stop function

    let row = event.target.closest("tr");
    // finds clicked table-row

    let amountText = row.children[1].textContent;
    // get the text from the second column (amount) TODO: ?

    // convert the formatted amount back to a number TODO: ?
    let amount = parseFloat(
        amountText.replace("€", "") // remove euro symbol
            .replace(".", "") // remove thousands separator
            .replace(",", ".") // replace comma with dot for JS number format
            .trim() // remove whitespace (Leerzeichen)
    );


    // update total sum
    sumExpenses -= amount;
    // subtract the amount from the total sum

    document.getElementById("expenseSum").textContent = formatEuro(sumExpenses);
    // update the displayed sum in the html


    // remove the row
    row.remove();
    // delete the table row from the DOM
}


/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) { // prüft, ob Variable ein Array oder ein Object ist; sonst undefined
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}

// Plan:
// Event Listener
// Funktion
// Input holen
// if-Bedingung
// Element erstellen
// Element einfügen
// Event reagieren