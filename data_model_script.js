/* FoodCategory is effectively an enum that represent the cases for different Food Categories. The fridge, 
freezer, and pantry will only have certain food categories in each. */
const FoodCategory = Object.freeze({
    EGGS: "Eggs",
    CONDIMENTS: "Condiments",
    LEFTOVERS: "Leftovers",
    MEAT: "Meat",
    BEVERAGES: "Beverages",
    FISH: "Fish",
    DAIRY: "Dairy",
    VEGETABLES: "Vegetables",
    FRUITS: "Fruits",
    ALCOHOL: "Alcohol",
    BAKINGGOODS: "Baking Goods",
    SNACKS: "Snacks",
    CEREALS: "Cereals",
    TEAS: "Teas",
    COFFEE: "Coffee",
    CANNEDGOODS: "Canned Goods",
    MISC: "Misc",
    FIXME: "",
});

/* Assigning fridge categories to each storage type */
const fridgeCategories = [
    FoodCategory.EGGS, FoodCategory.CONDIMENTS, FoodCategory.LEFTOVERS, FoodCategory.MEAT,
    FoodCategory.BEVERAGES, FoodCategory.FISH, FoodCategory.DAIRY, FoodCategory.VEGETABLES,
    FoodCategory.FRUITS, FoodCategory.ALCOHOL, FoodCategory.MISC
];
const pantryCategories = [
    FoodCategory.BAKINGGOODS, FoodCategory.SNACKS, FoodCategory.CEREALS, FoodCategory.TEAS,
    FoodCategory.COFFEE, FoodCategory.CANNEDGOODS, FoodCategory.MISC
];
const freezerCategories = [
    FoodCategory.MEAT, FoodCategory.FISH, FoodCategory.VEGETABLES, FoodCategory.FRUITS,
    FoodCategory.ALCOHOL, FoodCategory.MISC
];

/* StorageType is effectively an enum that represents the different cases for storage. */
const StorageType = Object.freeze({
    FRIDGE: "Fridge",
    FREEZER: "Freezer",
    PANTRY: "Pantry",
});

class FoodItem {
    constructor(name, owner, category, perishable, expirationDate, amount, type) {
        this.name = name;
        this.owner = owner;
        this.category = category;
        this.perishable = perishable;
        this.expirationDate = expirationDate;
        this.amount = amount;
        this.type = type;
    }
}

class User {
    constructor(name, favoriteRecipes, dietaryRestrictions) {
        this.name = name;
        this.favoriteRecipes = favoriteRecipes;
        this.dietaryRestrictions = dietaryRestrictions;
    }
}

class Storage {
    constructor(name, type, items = []) {
        this.name = name;
        this.type = type;
        this.items = items;
    }

    addItem(item) {
        this.items.push(item);
    }
}

class Kitchen {
    constructor(name, users = [], fridge = new Storage("Fridge"), freezer = new Storage("Freezer"), pantry = new Storage("Pantry")) {
        this.name = name;
        this.users = users;
        this.fridge = fridge;
        this.freezer = freezer;
        this.pantry = pantry;
    }

    addUser(user) {
        this.users.push(user);
    }
}

/* Hardcoded users and food items */
const user1 = new User("You", [], [FoodCategory.MEAT, FoodCategory.FISH, FoodCategory.EGGS]);
const user2 = new User("Susan", [], [FoodCategory.DAIRY]);
const user3 = new User("Jake", [], [FoodCategory.FRUITS]);
const communalUser = new User("Communal", [], []); // Communal items

const foodItem1 = new FoodItem("Milk", user1, FoodCategory.DAIRY, true, "2024-10-25", 1, StorageType.FRIDGE);
const foodItem2 = new FoodItem("Chicken", user2, FoodCategory.MEAT, true, "2024-12-05", 2, StorageType.FREEZER);
const foodItem3 = new FoodItem("Yogurt", user1, FoodCategory.DAIRY, true, "2024-10-30", 3, StorageType.FRIDGE);
const foodItem4 = new FoodItem("Apple", user2, FoodCategory.FRUITS, false, null, 5, StorageType.FRIDGE);
const foodItem5 = new FoodItem("Rice", communalUser, FoodCategory.MISC, false, null, 1, StorageType.PANTRY);
const foodItem6 = new FoodItem("Frozen Peas", user3, FoodCategory.VEGETABLES, true, "2024-11-01", 1, StorageType.FREEZER);
const foodItem7 = new FoodItem("Soda", communalUser, FoodCategory.BEVERAGES, false, null, 12, StorageType.FRIDGE);

const kitchen = new Kitchen("Main Kitchen");
kitchen.addUser(communalUser);
kitchen.addUser(user1);
kitchen.addUser(user2);
kitchen.addUser(user3);

kitchen.fridge.addItem(foodItem1);
kitchen.fridge.addItem(foodItem3);
kitchen.fridge.addItem(foodItem7);
kitchen.fridge.addItem(foodItem4);
kitchen.pantry.addItem(foodItem5);
kitchen.freezer.addItem(foodItem2);
kitchen.freezer.addItem(foodItem6);

/* User Selected Filters, needed to save users filter/category selections */
let fridgeFilters = { owner: null, category: null };
let pantryFilters = { owner: null, category: null };
let freezerFilters = { owner: null, category: null };

/* This function dynamically creates the filter button based on how many users are part of the Kitchen */
function renderFilterButtons() {
    const filterContainer = document.querySelector('.filters');
    filterContainer.innerHTML = ''; // Clear any previous selections

    // Helper function to highlight their chosen selection
    function setActiveButton(button) {
        filterContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }

    // No fiter selected button, selected upon intial loading
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.addEventListener('click', () => {
        // Setting filters to null for all containers upon starting
        fridgeFilters.owner = null;
        pantryFilters.owner = null;
        freezerFilters.owner = null;

        // Render each storage types table with the no selected filter
        renderFilteredTables(kitchen.fridge, "fridge-table-body", fridgeFilters);
        renderFilteredTables(kitchen.pantry, "pantry-table-body", pantryFilters);
        renderFilteredTables(kitchen.freezer, "freezer-table-body", freezerFilters);

        setActiveButton(allButton); // Highlight the All filter button upon starting
    });
    filterContainer.appendChild(allButton);

    // This code dynamically makes user filters based on who is in the Kitchen
    kitchen.users.forEach(user => {
        const userButton = document.createElement('button');
        userButton.textContent = user.name;
        userButton.addEventListener('click', () => {
            // Recognize user selected filter
            fridgeFilters.owner = user.name;
            pantryFilters.owner = user.name;
            freezerFilters.owner = user.name;

            // Render each storage types table based on selected filter
            renderFilteredTables(kitchen.fridge, "fridge-table-body", fridgeFilters);
            renderFilteredTables(kitchen.pantry, "pantry-table-body", pantryFilters);
            renderFilteredTables(kitchen.freezer, "freezer-table-body", freezerFilters);

            setActiveButton(userButton); // Highlight the selected filter
        });
        filterContainer.appendChild(userButton);
    });
}

/* This code handles expanding and closing the storage types. */
document.querySelectorAll('.chevron-down-button').forEach((button) => {
    button.addEventListener('click', () => {
        // Find out which container was selected
        const container = button.closest('.fridge-container, .pantry-container, .freezer-container');

        // Check if the container is already expanded
        const isExpanded = container.classList.contains('expanded');

        // Storage containers are techincally two parts, the container and the content
        const allContainers = document.querySelectorAll('.fridge-container, .pantry-container, .freezer-container');
        const allContents = document.querySelectorAll('.fridge-contents, .pantry-contents, .freezer-contents');

        // If the container is already expanded, reset all containers to normal height
        if (isExpanded) {
            allContainers.forEach((cont) => {
                cont.classList.remove('expanded', 'shrunk');
            });
            allContents.forEach((content) => {
                content.classList.remove('expanded', 'shrunk');
            });

            // This turns the chevron down button back to its intial position (i.e. not rotated)
            document.querySelectorAll('.chevron-down-button').forEach((btn) => {
                btn.classList.remove('rotated');
            });
        } else {
            // If not already expanded, expand the container
            allContainers.forEach((cont) => {
                const content = cont.querySelector('.fridge-contents, .pantry-contents, .freezer-contents');

                if (cont === container) {
                    // Expand the Container
                    cont.classList.add('expanded');
                    cont.classList.remove('shrunk');
                    content.classList.add('expanded');
                    content.classList.remove('shrunk');

                    // Flip the Chevron Button
                    button.classList.add('rotated');
                } else {
                    // Shrink the other Containers
                    cont.classList.add('shrunk');
                    cont.classList.remove('expanded');
                    content.classList.add('shrunk');
                    content.classList.remove('expanded');

                    // Flip other chevrons back to inital state if necessary
                    cont.querySelector('.chevron-down-button').classList.remove('rotated');
                }
            });
        }
    });
});


/* This function is used to populate the category button based on which storage type is selected. 
   It also calls the RenderFilteredTables function to update the storage containers content to only
   show items that are of that category. Since each storage type has its own categories, when that 
   storage type category button is selected only its applicable categories should show up. */
function createCategoryMenu(containerId, categories, storage, tableBodyId, filters) {
    const menu = document.getElementById(containerId);
    menu.innerHTML = ''; // Clear all previous categories

    // This code creates a "None" option and sets it as the intially selected filter
    const noneOption = document.createElement('div');
    noneOption.textContent = 'None';
    noneOption.classList.add('selected-category');
    noneOption.addEventListener('click', () => {
        filters.category = null;
        renderFilteredTables(storage, tableBodyId, filters); // Render choice
        closeDropdown(menu);
    });
    menu.appendChild(noneOption);

    // This code updates the menu to only show the correct cateories based on the selected storage type
    categories.forEach(category => {
        const option = document.createElement('div');
        option.textContent = category;
        option.addEventListener('click', () => {
            filters.category = category; // Set category
            renderFilteredTables(storage, tableBodyId, filters); // Render choice
            closeDropdown(menu);
        });
        menu.appendChild(option);
    });
}

/* This function toggle the dropdown menu of the Category button */
function toggleDropdown(menu) {
    menu.classList.toggle('open');
}

/* This function closes the dropdown menu of the Category button */
function closeDropdown(menu) {
    menu.classList.remove('open');
}

/* The function dynamically updates the content of each storage container based on the items in the 
   Data Model instance. If an item is added or removed from the Data Model this function gets called
   to update the UI of the affected Storage types table. It also will update the UI of the tables 
   based on selected filters. */
function renderTable(storage, tableBodyId, ownerFilter = null, categoryFilter = null) {
    const tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = "";

    // Iterates through passed in storage containers items to only add the correct items to the UI
    storage.items.forEach((item) => {
        // Skip items that don't match the selected owner or category
        if ((ownerFilter && item.owner.name !== ownerFilter) || (categoryFilter && item.category !== categoryFilter)) {
            return;
        }

        // Creating a row
        const row = document.createElement("tr");

        // Displaying the Items Name
        const itemName = document.createElement("td");
        itemName.textContent = item.name;
        row.appendChild(itemName);

        // Displaying the Owners Name
        const owner = document.createElement("td");
        owner.textContent = item.owner.name;
        row.appendChild(owner);

        // Displaying the Status circle
        const status = document.createElement("td");
        const statusCircle = document.createElement("span");
        statusCircle.classList.add("status-circle");
        // UPDATEME: Status circle designation is not correct, but good enough for to get an idea of functionallity.
        statusCircle.classList.add(item.perishable ? (new Date(item.expirationDate) < new Date() ? "red" : "yellow") : "green");
        status.appendChild(statusCircle);
        row.appendChild(status);

        // Displaying the Quantity Controls and assigning functions to the + and - buttons
        const quantityCell = document.createElement("td");
        const quantityControls = document.createElement("div");
        quantityControls.classList.add("quantity-controls");

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        decreaseButton.onclick = () => {
            if (item.amount > 0) item.amount--;
            quantityDisplay.textContent = item.amount;
            if (item.amount === 0) {
                const itemIndex = storage.items.indexOf(item);
                if (itemIndex > -1) storage.items.splice(itemIndex, 1); // Remove item if quantity is 0
                renderTable(storage, tableBodyId, ownerFilter, categoryFilter); // Update table
            }
        };

        const quantityDisplay = document.createElement("span");
        quantityDisplay.textContent = item.amount;

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.onclick = () => {
            item.amount++;
            quantityDisplay.textContent = item.amount;
        };

        quantityControls.appendChild(decreaseButton);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(increaseButton);
        quantityCell.appendChild(quantityControls);
        row.appendChild(quantityCell);

        tableBody.appendChild(row);
    });
}

/* Helper Function for Render Table that calls the renderTable based on selected storage type and filters */
function renderFilteredTables(storage, tableBodyId, filters) {
    renderTable(storage, tableBodyId, filters.owner, filters.category);
}

/* Code for Pop Up */

// Popup state variables, need to be made to save users selected options in order to add them to the Data Model
let selectedLocation = null;
let selectedOwner = null;
let isPerishable = false;
let expirationDate = null;
let quantity = 1;
let selectedCategory = null;

/* This function displays the popup */
function showPopup() {
    document.getElementById("popup-overlay").style.display = "flex";
    renderLocationButtons();
    renderOwnerButtons();
}

/* This function to close popup and reset fields */
function closePopup() {
    document.getElementById("popup-overlay").style.display = "none";
    resetPopupFields();
}

/* This function resets the pop ups fields so that no items are selected upon pressing the plus button. */
function resetPopupFields() {
    selectedLocation = null;
    selectedOwner = null;
    isPerishable = false;
    expirationDate = null;
    quantity = 1;
    selectedCategory = null;

    document.getElementById("quantity-display").textContent = quantity;
    document.getElementById("expiration-date-field").style.display = "none";
    document.getElementById("item-name").value = "";
    document.getElementById("expiration-date").value = "";
    document.getElementById("location-buttons").innerHTML = "";
    document.getElementById("owner-buttons").innerHTML = "";
    document.getElementById("category-buttons").innerHTML = "";
}

/* This function highlights the button the user selected */
function selectButton(button, buttonGroup) {
    document.querySelectorAll(`#${buttonGroup} button`).forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

/* This function dynamically renders the Location buttons, i.e. where the item will go,
   and adds event listeners for selection to select them. Technically these don't have to
   be dynamically rendered but if we ever make it so a kitchen doesnt have all the storage 
   types this would allow us to remove the unnecesssary storage type from avaliable options. 
   This selection also lets us know what categories to display for the category button below. */
function renderLocationButtons() {
    const locationContainer = document.getElementById("location-buttons");
    locationContainer.innerHTML = "";

    ["Fridge", "Pantry", "Freezer"].forEach(location => {
        const button = document.createElement("button");
        button.textContent = location;
        button.addEventListener('click', () => {
            selectedLocation = location;
            selectButton(button, "location-buttons");
            
            renderCategoryButtons(); // Function call to update the category buttons categories based on selected storage tyepp
        });
        locationContainer.appendChild(button);
    });
}

/* This function dynamically renders the Owner buttons and add event listeners for them.
    The number of owner buttons is based on how many users are in the Kitchen class instance. */
function renderOwnerButtons() {
    const ownerContainer = document.getElementById("owner-buttons");
    ownerContainer.innerHTML = "";
    kitchen.users.forEach(user => {
        const button = document.createElement("button");
        button.textContent = user.name;
        button.addEventListener('click', () => {
            selectedOwner = user;
            selectButton(button, "owner-buttons");
        });
        ownerContainer.appendChild(button);
    });
}

/* This function dynamically renders the Perishable buttons and add event listeners for them.
    If the item is perishable an expiration date field will appear. */
    function setPerishable(isItemPerishable) {
    isPerishable = isItemPerishable;
    document.getElementById("expiration-date-field").style.display = isItemPerishable ? "block" : "none";

    const perishableButtons = document.querySelectorAll('#perishable-buttons button');
    perishableButtons.forEach(btn => btn.classList.remove('selected'));
    const selectedButton = isItemPerishable ? perishableButtons[0] : perishableButtons[1];
    selectedButton.classList.add('selected');
}

// Had to add specific handlers to the perishable buttons to handle correct button higlighting
document.querySelectorAll('.popup-field button').forEach(button => {
    if (button.textContent === "Yes") {
        button.addEventListener('click', () => {
            setPerishable(true);
            selectButton(button, "perishable-buttons");
        });
    } else if (button.textContent === "No") {
        button.addEventListener('click', () => {
            setPerishable(false);
            selectButton(button, "perishable-buttons");
        });
    }
});

/* This function updates the quantity of an item being added. */
function updateQuantity(change) {
    quantity = Math.max(1, quantity + change);
    document.getElementById("quantity-display").textContent = quantity;
}

/* This function takes the input from the pop up and add it to the data model instance.
   It then renders the selected storage containers table with the new item. */
function addFoodItem() {
    const itemName = document.getElementById("item-name").value;
    expirationDate = isPerishable ? document.getElementById("expiration-date").value : null;

    /* Hints at the idea of content being not fully inputted. But, need a way have the display pop up on screen. 
         This will be impleneted in higher fidelity prototypes. */
    if (!itemName || !selectedLocation || !selectedOwner || !selectedCategory || (isPerishable && !expirationDate)) {
        alert("Please fill out all required fields.");
        return;
    } 

    // Creating the new FoodItem and adding it to the selected storage type
    const newItem = new FoodItem(itemName, selectedOwner, selectedCategory, isPerishable, expirationDate, quantity, selectedLocation);
    const storage = selectedLocation === "Fridge" ? kitchen.fridge :
        selectedLocation === "Pantry" ? kitchen.pantry : kitchen.freezer;

    storage.addItem(newItem);

    // Render the new table
    renderTable(storage, `${selectedLocation.toLowerCase()}-table-body`);

    closePopup(); // Close the popup
}

/* This function is needed to highlight buttons in the pop up to let users know
    what selections they chose. */
function selectButton(button, buttonGroup) {
    document.querySelectorAll(`#${buttonGroup} button`).forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
}

/* Keyboard Image Functions */

/* This function makes the keyboard visible when the Item text field is being enterd. */
function showKeyboard() {
    const keyboardImage = document.getElementById("keyboard-image");
    keyboardImage.style.visibility = "visible";
    keyboardImage.style.opacity = "1";
}

/* This function makes the keyboard dissappear when the Item text field is not being focused on. */
function hideKeyboard() {
    const keyboardImage = document.getElementById("keyboard-image");
    keyboardImage.style.opacity = "0";
    keyboardImage.style.visibility = "hidden";
}

/* End Keyboard Image Functions */


/* Popup Category Button Functions. The category button for the popup needs some of its own functions. */

/* This function toggles the dropdown menu of the pop up category button. It also makes a call
   to render the drop down menu with the correct categories based on the selected storage container. */
function togglePopupCategoryMenu() {
    const menu = document.getElementById("popup-category-menu");
    menu.classList.toggle("open");

    if (selectedLocation) {
        renderCategoryButtons(); // Populate categories based on the selected location designation/storage container
    } 
}

/* This function closes the dropdown menu. */
function closePopupDropdown(menu) {
    menu.classList.remove("open");
}

/* Necessary listeners for the category button. */
document.addEventListener("DOMContentLoaded", () => {
    const categoryButton = document.querySelector(".popup-category .category-button");
    categoryButton.addEventListener("click", togglePopupCategoryMenu);
});

/* This function add event listners for the categories in the drop down menu and makes a 
   call to save the users selected category. */
function populateCategoryMenu(categories) {
    const menu = document.getElementById("popup-category-menu");
    menu.innerHTML = ''; 

    categories.forEach(category => {
        const option = document.createElement("div");
        option.textContent = category;
        option.addEventListener("click", () => {
            setSelectedCategory(category);
            closePopupDropdown(menu);
        });
        menu.appendChild(option);
    });
}

/* This function sets the selected category to the category state variable. */
function setSelectedCategory(category) {
    document.getElementById("selected-category").textContent = category;
    selectedCategory = category; 
}

/* This function renders the categories in the popup category dropdown menu based on the 
   selected location in the popup. */
function renderCategoryButtons() {
    const categories = selectedLocation === "Fridge" ? fridgeCategories :
        selectedLocation === "Pantry" ? pantryCategories : freezerCategories;

    populateCategoryMenu(categories);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".category-button").addEventListener("click", togglePopupCategoryMenu);
});

/* End Category Button Functions */

/* Necessary Event Listeners for the pop up. */
document.querySelectorAll('#location-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        selectedLocation = button.textContent;
        selectButton(button, 'location-buttons');
    });
});

document.querySelectorAll('#owner-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        selectedOwner = button.textContent;
        selectButton(button, 'owner-buttons');
    });
});

document.querySelectorAll('#perishable-buttons button').forEach(button => {
    button.addEventListener('click', () => {
        isPerishable = button.textContent === "Yes";
        selectButton(button, 'perishable-buttons');
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("item-name");
    const keyboardImage = document.getElementById("keyboard-image");
    const popupForm = document.querySelector(".popup-form");

    itemInput.addEventListener("focus", () => {
        popupForm.classList.add("popup-slide-up");
        keyboardImage.classList.add("image-visible");
    });

    itemInput.addEventListener("blur", () => {
        popupForm.classList.remove("popup-slide-up");
        keyboardImage.classList.remove("image-visible");
    });
});

/* End necessary Event Listeners for the pop up. */

/* End Code for Pop Up */

/* Function Calls on Start & necessary listeners */

/* Creates Filter Buttons */
renderFilterButtons();

document.addEventListener("DOMContentLoaded", () => {
    renderTable(kitchen.fridge, "fridge-table-body");
    renderTable(kitchen.pantry, "pantry-table-body");
    renderTable(kitchen.freezer, "freezer-table-body");
});

document.addEventListener("DOMContentLoaded", () => {
    renderFilteredTables(); 
});

document.addEventListener("DOMContentLoaded", () => {
    createCategoryMenu("fridge-category-menu", fridgeCategories, kitchen.fridge, "fridge-table-body", fridgeFilters);
    createCategoryMenu("pantry-category-menu", pantryCategories, kitchen.pantry, "pantry-table-body", pantryFilters);
    createCategoryMenu("freezer-category-menu", freezerCategories, kitchen.freezer, "freezer-table-body", freezerFilters);

    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const menu = button.nextElementSibling;
            toggleDropdown(menu);
        });
    });
});

document.querySelectorAll('.plus-button').forEach(button => {
    button.addEventListener('click', showPopup);
});