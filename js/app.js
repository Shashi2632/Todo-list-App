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
            addToDo(this.value);
            this.value = "";
        }
    }
);

// Function to add a new to-do item.
const addToDo = (itemText) => {
    // Create a new list item element.
    const listItem = document.createElement("li");
    
    // Set the HTML content for the list item, including the to-do text and a delete icon.
    listItem.innerHTML = `
        <span style="margin-left: 25px">${itemText}</span>
        <i class="fas fa-times"></i>
    `;

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
                
                // Add a click event listener to the delete icon to remove the item.
                listItem.querySelector("i").addEventListener("click", function () {
                    listItem.remove();
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
};
