let items = JSON.parse(localStorage.getItem("lostFoundItems")) || [];

function showSection(sectionName) {
    document.getElementById("home").classList.add("hidden");
    document.getElementById("report").classList.add("hidden");
    document.getElementById("items").classList.add("hidden");

    document.getElementById(sectionName).classList.remove("hidden");

    if (sectionName === "items") {
        displayItems();
    }
}

document.getElementById("itemForm").addEventListener("submit", function(event) {

    event.preventDefault();

    let newItem = {
        status: document.getElementById("status").value,
        name: document.getElementById("itemName").value,
        description: document.getElementById("description").value,
        location: document.getElementById("location").value,
        date: document.getElementById("date").value,
        contact: document.getElementById("contact").value
    };

    // Check for a possible match
    let match = items.find(function(item) {

        return (
            item.status !== newItem.status &&
            item.name.toLowerCase() === newItem.name.toLowerCase()
        );

    });

    items.push(newItem);

    localStorage.setItem("lostFoundItems", JSON.stringify(items));

    // Show notification
    if (match) {

        alert(
            "🔔 POSSIBLE MATCH FOUND!\n\n" +
            "Someone reported the same item: " +
            newItem.name +
            "\n\nLocation: " +
            match.location +
            "\n\nPlease check the reported item details."
        );

    } else {

        alert("✅ Item reported successfully!");

    }

    document.getElementById("itemForm").reset();

    showSection("items");
});


function displayItems() {

    let list = document.getElementById("itemList");
    let searchText = document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    let filteredItems = items.filter(function(item) {

        return item.name.toLowerCase().includes(searchText);

    });

    if (filteredItems.length === 0) {

        list.innerHTML = "<p>No items found.</p>";
        return;

    }

    filteredItems.forEach(function(item) {

        let statusClass =
            item.status === "Lost" ? "lost" : "found";

        list.innerHTML += `

            <div class="item">

                <h3>${item.name}</h3>

                <p class="${statusClass}">
                    ${item.status}
                </p>

                <p><b>Description:</b> ${item.description}</p>

                <p><b>📍 Location:</b> ${item.location}</p>

                <p><b>📅 Date:</b> ${item.date}</p>

                <p><b>📞 Contact:</b> ${item.contact}</p>

            </div>

        `;
    });
}