// Client Web App JavaScript

// The server http address for the calculator API
const BASE_URL = 'http://localhost:5000/calculator';

// HTTP request settings

// HTTP headers: specify the content which will be accepted
const headers = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json",
});

// This will be sent as part of the request, specifies:
// HTTP method
// Headers
// CORS - cross orgin request (client and api may be hosted on different domains or IPs)
const reqInit = { method: 'GET', headers: headers, mode: 'cors', cache: 'default' };

// Asynchronous Function getDataAsync from a url and return

async function getDataAsync(url) {
    // Check for errors and catch any exceptions
    try {
        // Use fetch to call the api asychronously
        // Initally returns a promise
        const response = await fetch(url, reqInit);

        // As Resonse is dependant on the fetch call, await must also be used here
        const json = await response.json();

        // Output result to console (for testing purposes)
        console.log(json);

        // return data
        return json;

        // catch and log any errors
    } catch (err) {
        console.log(err);
        return err;
    }
} // End function



// Call this function when Add button is clicked
// Note this is an async function because it calls other async functions.
async function calcAdd() {

    // declare two variables for the two numbers which will be added
    let numA = 0;
    let numB = 0;
    let answerText = "";
  
    // use getElementById() to read values from the form
    // convert the (text)inputs to numbers and assign to the variables
    numA = Number(document.getElementById('inputA').value);
    numB = Number(document.getElementById('inputB').value);
  
    // 1. Build the API URL, starting with BASE_URL
    const url = `${BASE_URL}/add?a=${numA}&b=${numB}`;
  
    // 2. Call the API and get a result
    const result = await getDataAsync(url);
  
    // 3. Process the result and build the answer
  
    // Log to the browser console to see if it worked and also what the JSON contains
    console.log('result: ', result);
  
    // Build the answer text - inputs only for now
    answerText = `${result.a} ${result.operator} ${result.b} = ${result.answer}`;
  
    // display the two inputs on the page
    // first get a reference to the correct page element
    // then set the element's innerText = answeText
    document.getElementById('answer').innerText = answerText;
  
  } // end function

    // Initialise the app when the page is loaded 
function loadCalculator() {
    // Add a click event listner to the calcAdd button
    document.getElementById('btnAdd').addEventListener('click', calcAdd);
  }
  
  // load the script
  loadCalculator();
  
  // Functions to export
  export {
    loadCalculator,
    calcAdd
  }
