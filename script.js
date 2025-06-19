document.addEventListener("DOMContentLoaded", () => {
    const roomList = [
        // Ground Floor
"11ACG002", "11ACG004", "11ACG010", "11ACG008", "11ACG009", "11ACG006", "11ACG005", "11ACG013", 
"11ACG012", "f0lift1", "f0lift2", "f0lift3", "f0lift4", "f0stair1", "f0stair2", "f0stair3", "f0stair4", 
"f0stair5", "f0stair6",


// 1st Floor
"11AC1002", "11AC1015", "11AC1016", "11AC1017", "11AC1007", "11AC1005", "11AC1006", "11AC1019", 
"11AC1020", "11AC1018", "11AC1010", "11AC1012", "11AC1008", "11AC1026", "11AC1025", "11AC1023", 
"11AC1011", "11AC1024", "11AC1022", "11AC1009", "11AC1021", "11AC1004", "11AC1003", "11AC1013", 
"f1lift1", "f1lift2", "f1lift3", "f1lift4", "f1stair1", "f1stair2", "f1stair3", "f1stair4",

// 2nd Floor
"11AC2004", "11AC2005", "11AC2003", "11AC2028", "11AC2044", "11AC2035", "11AC2038", "11AC2010", 
"11AC2012", "11AC2019", "11AC2020", "11AC2021", "11AC2026", "11AC2027", "11AC2043", "11AC2013", 
"11AC2014", "11AC2009", "11AC2011", "11AC2042", "11AC2007", "11AC2040", "11AC2039", "11AC2041", 
"11AC2031", "11AC2008", "11AC2006", "11AC2016", "11AC2034", "11AC2033", "11AC2036", "11AC2037", 
"11AC2022", "11AC2023", "11AC2024", "11AC2025", "f2lift1", "f2lift2", "f2lift3", "f2lift4", "f2lift5", 
"f2lift6", "f2lift7", "f2lift8", "f2stair1", "f2stair2", "f2stair3", "f2stair4", "f2stair5", "f2stair6", 
"f2stair7", "f2stair8", "f2stair9", "f2stair10",

// 3rd Floor
"11AC3021", "11AC3022", "11AC3023", "11AC3020", "11AC3019", "11AC3024", "11AC3025", "11AC3026", 
"11AC3031", "11AC3032", "11AC3033", "11AC3034", "11AC3035", "11AC3036", "11AC3037", "11AC3038", 
"11AC3027", "11AC3028", "11AC3029", "11AC3030", "11AC3042", "11AC3041", "11AC3040", "11AC3044", 
"11AC3043", "11AC3046", "11AC3047", "11AC3045", "11AC3048", "11AC3014", "11AC3013", "11AC3009", 
"11AC3011", "11AC3012", "11AC3010", "11AC3050", "11AC3049", "11AC3051", "11AC3054", "11AC3056", 
"11AC3003", "11AC3002", "11AC3001", "11AC3055", "11AC3004", "11AC3005", "11AC3053", "11AC3052", 
"11AC3007", "11AC3008", "11AC3006", "11AC3016", "11AC3017", "11AC3015", "f3lift1", "f3lift2", 
"f3lift3", "f3lift4", "f3lift5", "f3lift6", "f3lift7", "f3lift8", "f3stair1", "f3stair2", "f3stair3", 
"f3stair4",

// 4th Floor
"11AC4020", "11AC4021", "11AC4023", "11AC4022", "11AC4019", "11AC4015", "11AC4010", "11AC4014", 
"11AC4013", "11AC4009", "11AC4011", "11AC4012", "11AC4006", "11AC4007", "11AC4008", "11AC4003", 
"11AC4002", "11AC4001", "11AC4005", "11AC4004", "11AC4016", "11AC4028", "11AC4027", "11AC4030", 
"11AC4029", "11AC4034", "11AC4031", "11AC4032", "11AC4033", "11AC4036", "11AC4035", "11AC4037", 
"11AC4038", "11AC4039", "11AC4040", "11AC4042", "11AC4041", "11AC4018", "11AC4025", "f4lift1", 
"f4lift2", "f4lift3", "f4lift4", "f4lift5", "f4lift6", "f4lift7", "f4lift8", "f4stair1", "f4stair2", 
"f4stair3", "f4stair4"

   ];
    const splash = document.getElementById("splash");
    const mobileFrame = document.getElementById("mobile-frame");
    const startBtn = document.getElementById("startBtn");
    const dropdownSection = document.getElementById("location-container");

    const bubblesContainer = document.getElementById("bubbles-container");

    const currentSearch = document.getElementById("current-search");
    const destinationSearch = document.getElementById("destination-search");
    const currentRoom = document.getElementById("current-room");
    const destinationRoom = document.getElementById("destination-room");

// autocomplete section
    function setupAutocomplete(inputElement, dropdownElement) {
        inputElement.addEventListener("input", () => {
            const query = inputElement.value.trim().toLowerCase();
            dropdownElement.innerHTML = "";

            if (query.length === 0) {
                dropdownElement.style.display = "none";
                return;
            }

            const filtered = roomList.filter(room => room.toLowerCase().includes(query));

            if (filtered.length === 0) {
                dropdownElement.style.display = "none";
                return;
            }

            filtered.forEach(room => {
                const li = document.createElement("li");
                li.textContent = room;

                li.addEventListener("click", () => {
                    inputElement.value = room;
                    dropdownElement.style.display = "none";
                    inputElement.focus();
                });

                dropdownElement.appendChild(li);
            });

            dropdownElement.style.display = "block";
        });

        document.addEventListener("click", (event) => {
            if (!dropdownElement.contains(event.target) && event.target !== inputElement) {
                dropdownElement.style.display = "none";
            }
        });
    }

    // ✅ Properly call autocomplete
    setupAutocomplete(currentSearch, currentRoom);
    setupAutocomplete(destinationSearch, destinationRoom);
   
    
    
    // Splash screen logic
    setTimeout(() => {
        splash.style.display = "none";
        if (mobileFrame) mobileFrame.style.display = "flex";
    }, 6000);

    // Create animated bubbles
    const createBubbles = (count = 5) => {
        for (let i = 0; i < count; i++) {
            const bubble = document.createElement("div");
            bubble.className = "bubble";
            bubble.style.top = ${Math.random() * 100}vh;
            bubble.style.left = ${Math.random() * 100}vw;
            bubblesContainer.appendChild(bubble);
        }
    };
    createBubbles();

    // Show dropdown when user types in search
    currentSearch.addEventListener("input", function () {
        const query = currentSearch.value.toLowerCase();
        if (query.length > 0) {
            currentRoom.style.display = "block";
        } else {
            currentRoom.style.display = "none";
        }
    });

    destinationSearch.addEventListener("input", function () {
        const query = destinationSearch.value.toLowerCase();
        if (query.length > 0) {
            destinationRoom.style.display = "block";
        } else {
            destinationRoom.style.display = "none";
        }
    });

    // Start navigation button logic
    const startNavigationBtn = document.getElementById("startNavigationBtn");

    startNavigationBtn.addEventListener("click", () => {
        const currentRoomValue = document.getElementById("current-room").value;
        const destinationRoomValue = document.getElementById("destination-room").value;

        if (!currentRoomValue || !destinationRoomValue) {
            alert("Please select both rooms before starting navigation.");
            return;
        }

        // Send data to backend
        fetch("/start-navigation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                source: currentRoomValue,
                destination: destinationRoomValue
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Navigation started:", data);
        })
        .catch(error => {
            console.error("Error starting navigation:", error);
        });
    });

  

    // Populate dropdown with room data
    const populateDropdown = (dropdown, data) => {
        dropdown.innerHTML = "";
        data.forEach(room => {
            const option = document.createElement("option");
            option.value = room;
            option.textContent = room;
            dropdown.appendChild(option);
        });
    };

    // Setup live search filter for both current and destination search inputs
    const setupSearchFilter = (input, dropdown) => {
        input.addEventListener("input", () => {
            const query = input.value.toLowerCase();
            const filteredRooms = roomData.filter(room =>
                room.toLowerCase().includes(query)
            );
            populateDropdown(dropdown, filteredRooms);
        });
    };

    // Sync dropdown -> search input when the dropdown value changes
    currentRoom.addEventListener("change", () => {
        currentSearch.value = currentRoom.value;
    });

    destinationRoom.addEventListener("change", () => {
        destinationSearch.value = destinationRoom.value;
    });

    // Initialize dropdowns and search filters
    populateDropdown(currentRoom, roomData);
    populateDropdown(destinationRoom, roomData);

    // Enable live search filtering
    setupSearchFilter(currentSearch, currentRoom);
    setupSearchFilter(destinationSearch, destinationRoom);
});


* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    text-align: center;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    height: 100vh;
    width: 100vw;

    background-image: url("C:\Users\ankit\OneDrive\Desktop\background image.png"); /* replace with your image path */
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 70% center; /* shifts image right */
    background-attachment: fixed;
    color: rgb(131, 209, 228);
}



#splash {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #1e2a66                                      ;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    font-weight: bold;
    text-shadow: 7px 7px 15px rgba(0, 0, 0, 0.5);
    z-index: 9999; /* Ensures splash screen stays on top  */
    overflow: hidden;
} 

/* Fixing animation duration */
 @keyframes fadeOut {
    0% { opacity: 1; }
    93% { opacity: 1; } /* Keep it fully visible for ~14s */
     100% { opacity: 0; visibility: hidden; } /*Fades out at 15s */ 
} 

#splash {
    animation: fadeOut 2s forwards;
} 

/* Animated Bubbles */
 .bubble { 
    position: absolute; 
     height: 100px; 
     background: rgba(255, 255, 255, 0.2); 
     width: 100px; 
     border-radius: 50%; 
     filter: blur(10px); 
     animation: floatBubble 1s infinite ease-in-out; 
}

/* Keyframes for Random Bubble Movement */
 @keyframes floatBubble {
    0% {
        transform: translate(0, 0);
        opacity: 0.5;
    }
    25% {
        transform: translate(50px, -100px);
        opacity: 0.7;
    }
    50% {
        transform: translate(-50px, -200px);
        opacity: 0.5;
    }
    75% {
        transform: translate(100px, -50px);
        opacity: 0.8;
    }
    100% {
        transform: translate(0, 0);
        opacity: 0.5;
    }
} 
 
/* Individual bubble positions */
 .bubble:nth-child(1) { 
    top: 5%;   /* Near the top right corner */
     left: 85%; 
    animation-duration: 2s; 
}
.bubble:nth-child(2) { 
    top: 90%;  /* Near the bottom left corner */
     left: 10%;  
    animation-duration: 4s; 
} 
.bubble:nth-child(3) { 
    top: 10%;  /* Near the top left corner but a little inward */
     left: 20%;  
    animation-duration: 6s; 
} 
 .bubble:nth-child(4) { 
    top: 50%;  /* 25% left from center */
    left: 25%;  
    animation-duration: 5s; 
} 
.bubble:nth-child(5) { 
    top: 75%;  /* 25% diagonally from right lower corner */
    left: 75%;  
    animation-duration: 8s;  
 } 



/* Header and Footer Styling */
/* Header Styling with Border Effect */
header,footer {
    background: rgba(red, green, blue, alpha);
    backdrop-filter: blur(20px);
    padding: 10px;
    width: 100%;
    position: relative;
    font-weight: bold;
    color: #ffffff;
    border-radius: 25px;
    margin: 10px auto;
    max-width: 100%;
    box-shadow: 10px 10px 50px rgba(94, 191, 34, 0.1);
    overflow: hidden;
} 

/* Header Circular Border Effect */
 header::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(28, 8, 8, 0.523) 0%, transparent 50%);
    z-index: -1;
    pointer-events: none;
    opacity: 0.4;
} 


/* Call Option */
 .call-option {
    font-size: 16px;
    margin-top: 5px;
}
.call-option a, footer a {
    color: #ffcc00;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease-in-out;
}
.call-option a:hover, footer a:hover {
    color: #ff6600;
} 

/* Main Content Styling */
 .content {
    height: 75vh;  /* Reduce main section height */
     display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: bold;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
} 


/* Home Section */
 #home {
    display: none;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-bottom: 20px; /* Optional: Adjust padding for better fit */
 } 

/* Heading Style */ 
 h1 {
    font-size: 50px;
    font-weight: bold;
    text-shadow: 4px 4px 10px rgba(255, 255, 255, 0.3);
    margin-bottom: 20px;
}

/* Mobile Frame */
 #mobile-frame {
    width: 320px; /* Typical mobile width */
    height: 600px; /* Mobile height */
    border-radius: 40px;
    border: 6px solid rgba(255, 255, 255, 0.7); /* White outline */
     box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin: auto;
    overflow: hidden;
}  

/* Inner Content */
 #mobile-content {
    text-align: center;
    padding: 20px;
    color: white;
} 

/* Start Button */
#startBtn {
    padding: 15px 40px;
    font-size: 18px;
    font-weight: bold;
    background: linear-gradient(90deg, #ff6600, #ff2a2a);
    color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0px 4px 15px rgba(255, 102, 0, 0.5);
    transition: 0.3s ease-in-out;
}
#startBtn:hover {
    background: linear-gradient(90deg, #cc5500, #ff0000);
    transform: scale(1.1);
} */
/* Dropdown Section */
 #dropdown-section {
    margin-top: 20px;
    width: 100%;
    max-width: 400px;
  }
  
  .location-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .dropdown-box {
    background-color: #ffffff;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    text-align: left;
  }
  
  .dropdown-box h3 {
    margin-bottom: 10px;
    font-size: 1.1em;
    color: #0072ff;
  } */
  
   .dropdown-box input[type="text"],
  .dropdown-box select {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1em;
  }
  
  

  body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    color: white;


  }
  .CONTACT{
    background-color: #1e2a66;
    color: white;
    
  }
  
  h1 {
    text-align: center;
    padding: 30px 0 10px;
    font-size: 36px;
    letter-spacing: 2px;
  }
  
  form {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;

  }
  
  .form-group {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }
  
  .f1{
    display: flex;
    justify-content: space-between;
    margin: 80px;
    
  }
  .form-field {
    flex: 1;
    min-width: 250px;
    margin-bottom: 20px;
  }
  
  .form-field label {
    display: block;
    margin-bottom: 6px;
    font-weight: bold;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: none;
    border-bottom: 2px solid #ccc;
    background: transparent;
    color: white;
    font-size: 16px;
    outline: none;
  }
  
  input:focus, textarea:focus {
    border-bottom-color: #c0d6f9;
  }
  
  .error {
    font-size: 14px;
    color: #f88;
    margin-top: 4px;
  }
  
  button {
    display: block;
    margin: 30px auto;
    padding: 12px 24px;
    font-size: 18px;
    background-color: transparent;
    border: 2px solid white;
    color: white;
    cursor: pointer;
    transition: 0.3s;
  }
  
  button:hover {
    background-color: white;
    color: #1e2a66;
  }
  
  /* Footer */
  footer {
    background-color: #1e2a66;
    color: white;
    text-align: center;
    padding: 30px 20px 60px;
  }
  
  footer a {
    color: #c0d6f9;
    text-decoration: none;
  }
  
  footer a:hover {
    text-decoration: underline;
  }
  
  .footer-bottom {
    margin-top: 20px;
    font-size: 14px;
  }
  
  .footer-icon {
    margin-top: 20px;
    font-size: 22px;
    cursor: pointer;
    animation: bounce 1s infinite;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  
  @media (max-width: 768px) {
    .form-group {
      flex-direction: column;
    }
  }
  



   /* Container for the search bar and button */
.dropdown-container {
    position: relative;
    max-width: 400px;
    margin: 50px auto;
}

/* Search input style */
.search-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
}

/* Circle button next to the search input */
.circle-button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 12px;
    border-radius: 50%;
    background-color: #1e2a66;
    color: white;
    font-size: 20px;
    border: none;
    cursor: pointer;
}

/* Dropdown list */
.dropdown-list {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
}

.dropdown-list li {
    padding: 10px;
    cursor: pointer;
}

.dropdown-list li:hover {
    background-color: #f0f0f0;
}








* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Segoe UI', sans-serif;
    color: #1e2a66;
    background-color: white;
  }
  
  .hero-section {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  
  .hero-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: flex;
    justify-content: right;
        
  }
    
  .hero-content {
    position: absolute;
    top: 20%;
    right: 10%;
    width: 55%;
    background: #f4f4f4;
    padding: 50px;
    padding-right: 60px;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  }
  
  .hero-content h1 {
    font-size: 48px;
    line-height: 1.3;
    color: #1e2a66;
    font-weight: 600;
    margin-bottom: 30px;
  }
  
  .hero-content hr {
    width: 60px;
    height: 3px;
    background-color: #1e2a66;
    border: none;
    margin-bottom: 20px;
  }
  
  .hero-content p {
    font-size: 17px;
    line-height: 1.7;
    color: #1e2a66;
    
  }
  
  /* Responsive adjustments */
  @media screen and (max-width: 768px) {
    .hero-content {
      position: static;
      width: 100%;
      padding: 30px;
      box-shadow: none;
    }
  
    .hero-content h1 {
      font-size: 32px;
    }
  
    .hero-bg {
      height: auto;
    }
  }
  

/* Ensure input text is visible */
.search-input, #current-search, #destination-search {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: white; /* Ensure background is white */
    color: #333; /* Dark text for readability */
    z-index: 2;
    position: relative;
}

/* Remove default outline on focus but add custom outline */
input:focus, #current-search:focus, #destination-search:focus {
    outline: none; /* Remove default focus outline */
    border-color: #007bff; /* Blue border on focus */
    caret-color: black; /* Ensures caret is visible */
}

/* Dropdown styling */
.dropdown-list {
    display: none; /* Keep dropdown hidden initially */
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 0 0 8px 8px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 5;
    list-style: none;
    margin: 0;
    padding: 0;
}

/* Style for each dropdown item */
.dropdown-list li {
    padding: 10px;
    cursor: pointer;
}

.dropdown-list li:hover {
    background-color: #f0f0f0;
}

/* Dropdown input fields */
#current-room, #destination-room {
    display: none; /* Hide dropdowns by default */
}

/* Styling for options inside dropdown */
option {
    padding: 8px;
    font-size: 16px;
    color: #333; /* Ensure text is dark and visible */
}

/* Specific focus styles for search input */
#current-search:focus, #destination-search:focus {
    outline: 2px solid #4a90e2; /* Add a visible blue outline when focused */
}

document.getElementById("pathForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  fetch(`/shortest-path?start=${start}&end=${end}`)
      .then(res => {
          if (!res.ok) throw new Error("Path not found.");
          return res.blob();
      })
      .then(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = "shortest_path_images.zip";
          a.click();
      })
      .catch(err => alert(err.message));
});