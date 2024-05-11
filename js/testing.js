// Select the 'item' input field and the 'to-do-box' container.
const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

// Listen for keyup events on the 'item' input field.
// If the 'Enter' key is pressed, call the 'addToDo' function to add a new to-do item.
// Then, reset the input field value.
item.addEventListener(
    "keyup",
    function (event) {
        if (event.key == "Enter") {
            addToDoAndSave(this.value);
            this.value = "";
        }
    }
);

// Function to add a new to-do item and save it to localStorage.
const addToDoAndSave = (itemText) => {
    // Trim the input value to remove leading and trailing whitespace
    const trimmedItemText = itemText.trim();

    // Check if the trimmed input value is not empty
    if (trimmedItemText.length > 0) {
        // Create a new list item element.
        const listItem = document.createElement("li");

        // Set the HTML content for the list item, including the to-do text and a delete icon.
        listItem.innerHTML = `
        <span style="margin-left: 25px">${itemText}</span>
        <i class="fas fa-times"></i>`;

        // Listen for click events on the list item.
        listItem.addEventListener(
            "click",
            function () {
                // Toggle the 'done' class to mark the item as done or not done.
                this.classList.toggle("done");

                // If the 'done' class is added, update the appearance to show a checkmark icon.
                // Also, provide the option to delete the item.
                if (this.classList.contains("done")) {
                    listItem.innerHTML = `
                    <img width="20" height="20" id="check" src="images/check.png" style="margin-right: 5px; margin-bottom: -5px;"/>
                    <span style="margin-left: 2px">${itemText}</span>
                    <i class="fas fa-times"></i>`;

                    // Listen for click events on the delete icon to remove the item.
                    const deleteIcon = listItem.querySelector("i");
                    deleteIcon.addEventListener("click", function () {
                        listItem.remove(); // Remove the parent <li> element when the delete icon is clicked
                        updateToDoList(); // Update the localStorage after removing the item
                    });
                } else {
                    // If the 'done' class is removed, revert the appearance back to the original.
                    listItem.innerHTML = `
                    <span style="margin-left: 25px">${itemText}</span>
                    <i class="fas fa-times"></i>`;
                }
            }
        );
        // Add the new list item to the 'to-do-box' container.
        toDoBox.appendChild(listItem);

        // Save the updated to-do list to localStorage.
        updateToDoList();
    }
};

// Function to update the to-do list in localStorage.
const updateToDoList = () => {
    // Get all the to-do items from the to-do box.
    const allToDoItems = toDoBox.querySelectorAll("li");

    // Create an array to hold the text content of each to-do item.
    const toDoList = [];
    allToDoItems.forEach((item) => {
        toDoList.push(item.querySelector("span").textContent);
    });

    // Store the to-do list array in localStorage as a JSON string.
    localStorage.setItem("toDoList", JSON.stringify(toDoList));

    // Check if there are no more to-do items, then clear localStorage
    if (allToDoItems.length === 0) {
        localStorage.removeItem("toDoList");
    }
};

// Function to load the to-do list from localStorage when the page loads.
const loadToDoList = () => {
    // Retrieve the to-do list from localStorage.
    const savedToDoList = localStorage.getItem("toDoList");

    // Parse the JSON string back into an array of to-do items.
    if (savedToDoList) {
        const toDoList = JSON.parse(savedToDoList);

        // Add each item from the saved to-do list to the 'to-do-box'.
        toDoList.forEach((itemText) => {
            addToDoAndSave(itemText);
        });
    }
};

// Call loadToDoList() when the DOM content is loaded to load any existing to-do items.
document.addEventListener("DOMContentLoaded", loadToDoList);
