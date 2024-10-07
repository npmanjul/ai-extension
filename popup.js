//dropdown 
document.getElementById("dropdown-btn").addEventListener("click", dropdownEvent)

function dropdownEvent() {
    document.getElementById("profileDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


//api fetch
document.getElementById("submit-btn").addEventListener("click", getapiRespose);

const api_key = "AIzaSyDUVXSCw4qaX3eLmI54RobPBRcPX8yy4VM";

const api_url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${api_key}`;

async function getapiRespose() {
    const inputValue = document.getElementById("inputarea").value;

    const input_data = {
        "contents": [
            {
                "parts": [
                    { "text": inputValue }
                ]
            }
        ]
    };

    const response = await fetch(api_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(input_data)

    });
    const data = await response.json();
    // console.log(data.candidates[0].content.parts[0].text);
    getLoading();
    setInputValue(data, inputValue);
}

//initial display

document.getElementsByClassName("get-data")[0].style.display = "none";
document.getElementsByClassName("landing-page-container")[0].style.display = "block";

function getLoading() {
    document.getElementsByClassName("get-data")[0].style.display = "block";
    document.getElementsByClassName("landing-page-container")[0].style.display = "none";
}


//set input value

function setInputValue(data, inputValue) {
    // Get the text and split it into characters
    const txt = data.candidates[0].content.parts[0].text;
    const array = txt.split("");

    // Set input value to the desired element and clear the input field
    document.getElementById("input-data").innerText = inputValue;
    document.getElementById("inputarea").value = "";

    // Clear previous content before starting the typing effect
    document.getElementById("result-area-contant").innerHTML = "";

    // Reset the typing index and start the typewriter effect
    i = 0; // Reset index to 0
    typeWriter(array); // Start the typing effect
}

let i = 0;
const speed = 10; // Typing speed

function typeWriter(array) {
    if (i < array.length) {
        // Add one character at a time to the result area
        document.getElementById("result-area-contant").innerHTML += array[i];
        i++;
        
        // Call the typeWriter function again after a delay to simulate typing
        setTimeout(() => typeWriter(array), speed);
    }
}

