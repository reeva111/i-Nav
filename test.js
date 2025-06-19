
document.addEventListener("DOMContentLoaded", () => {
    const roomList = [
        // Your full roomList here (same as before)
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

    // Autocomplete dropdown
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

    setupAutocomplete(currentSearch, currentRoom);
    setupAutocomplete(destinationSearch, destinationRoom);

    // Splash screen hide
    setTimeout(() => {
        splash.style.display = "none";
        if (mobileFrame) mobileFrame.style.display = "flex";
    }, 6000);

    // Bubbles animation
    const createBubbles = (count = 5) => {
        for (let i = 0; i < count; i++) {
            const bubble = document.createElement("div");
            bubble.className = "bubble";
            bubble.style.top = `${Math.random() * 100}vh`;
            bubble.style.left = `${Math.random() * 100}vw`;
            bubblesContainer.appendChild(bubble);
        }
    };
    createBubbles();

    // Manual dropdown filters
    currentSearch.addEventListener("input", () => {
        currentRoom.style.display = currentSearch.value.length > 0 ? "block" : "none";
    });

    destinationSearch.addEventListener("input", () => {
        destinationRoom.style.display = destinationSearch.value.length > 0 ? "block" : "none";
    });

    // Backend request on button
    const startNavigationBtn = document.getElementById("startNavigationBtn");
    startNavigationBtn.addEventListener("click", () => {
        const currentRoomValue = currentSearch.value;
        const destinationRoomValue = destinationSearch.value;

        if (!currentRoomValue || !destinationRoomValue) {
            alert("Please select both rooms before starting navigation.");
            return;
        }

        fetch(`/shortest-path?start=${currentRoomValue}&end=${destinationRoomValue}`)
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
});

