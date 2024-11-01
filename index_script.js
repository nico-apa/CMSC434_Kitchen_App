const fridgeContainers = {
    'eggs-misc': [],
    'condiments': [],
    'leftovers': [],
    'beverages': [],
    'meat': [],
    'dairy': [],
    'vegetables': [],
    'fruits': [],
};

let currentContainer = ''; // This will track which container's items are being viewed

// Helper function to capitalize the first letter of each word
function capitalizeFirstLetters(text) {
    return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

// Function to open the popup and display the container-specific items
function openPopup(container) {
    currentContainer = container; // Track the current container

    // Handle special case for "eggs-misc"
    let popupTitle = container.replace('-', ' ');
    if (container === 'eggs-misc') {
        popupTitle = 'Eggs & Misc';
    } else {
        popupTitle = capitalizeFirstLetters(popupTitle);
    }

    // Set the popup title
    document.getElementById('popupTitle').textContent = popupTitle;

    // Clear the previous items list
    const popupItemsList = document.getElementById('popupItemsList');
    popupItemsList.innerHTML = '';

    // Load the items for the selected container
    const items = fridgeContainers[container];
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} <span class="price">$${item.price}</span> <span class="owner">(${item.owner})</span> ${item.perishable ? '<span class="perishable">Perishable</span>' : ''}`;
        popupItemsList.appendChild(listItem);
    });

    // Show the popup
    document.getElementById('popupModal').style.display = 'flex';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popupModal').style.display = 'none';
}

// Function to add an item to the current container's list
function addItem() {
    const newItemNameInput = document.getElementById('newItemName');
    const newItemPriceInput = document.getElementById('newItemPrice');
    const newItemOwnerInput = document.getElementById('newItemOwner');
    const newItemPerishableInput = document.getElementById('newItemPerishable');
    
    const itemName = newItemNameInput.value.trim();
    const itemPrice = newItemPriceInput.value.trim();
    const itemOwner = newItemOwnerInput.value.trim();
    const isPerishable = newItemPerishableInput.checked;

    if (itemName !== '' && itemPrice !== '' && itemOwner !== '') {
        // Create a new item object
        const newItem = {
            name: itemName,
            price: itemPrice,
            owner: itemOwner,
            perishable: isPerishable
        };

        // Add the item to the current container's list
        fridgeContainers[currentContainer].push(newItem);

        // Update the popup list with the new item
        const popupItemsList = document.getElementById('popupItemsList');
        const listItem = document.createElement('li');
        listItem.innerHTML = `${itemName} <span class="price">$${itemPrice}</span> <span class="owner">(${itemOwner})</span> ${isPerishable ? '<span class="perishable">Perishable</span>' : ''}`;
        popupItemsList.appendChild(listItem);

        // Clear the input fields
        newItemNameInput.value = '';
        newItemPriceInput.value = '';
        newItemOwnerInput.value = '';
        newItemPerishableInput.checked = false;
    } else {
        alert("Please enter an item name, price, and owner.");
    }
}

// Add event listeners to all buttons
const buttons = document.querySelectorAll('.rounded-button');
buttons.forEach(button => {
    button.addEventListener('click', activateButton);
});

// Ensure the popup is hidden on page load
window.onload = function() {
    document.getElementById('popupModal').style.display = 'none';
}

// Function to handle button click and change color
function activateButton(event) {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.rounded-button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add active class to the clicked button
    event.target.classList.add('active');
}