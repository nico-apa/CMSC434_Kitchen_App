/**
* Represents an item in the shopping list.
*/
class Item {
   /**
   * Creates a new item.
   * @param {string} name - The name of the item.
   * @param {number} quantity - The quantity of the item.
   * @param {string} owner - Indicates if the item belongs to the personal or communal list.
   * @param {string} type - The storage type for the item (fridge, freezer, or pantry).
   */
  constructor(name, quantity, owner, type) {
    this.name = name;
    this.quantity = quantity;
    this.owner = owner; 
    this.type = type; 
  }
}

/**
* Initializes a new user with storage for fridge, freezer, and pantry items.
* @param {string} name - The name of the user.
* Note: The name os user is irrelvant in this part tab, but here for cohesivity for other sections of the code, and incase we need to build on it
*/
class User {
  constructor(name) {
    this.name = name;
    this.fridge = [];
    this.freezer = [];
    this.pantry = [];
  }
  
   /**
   * Adds an item to the user's fridge storage.
   * @param {Item} item - The item to add to the fridge.
   */
  addToFridge(item) {
    this.fridge.push(item);
  }

   /**
   * Adds an item to the user's freezer storage.
   * @param {Item} item - The item to add to the freezer.
   */
  addToFreezer(item) {
    this.freezer.push(item);
  }

   /**
   * Adds an item to the user's pantry storage.
   * @param {Item} item - The item to add to the pantry.
   */
  addToPantry(item) {
    this.pantry.push(item);
  }
}

const currentUser = new User('Default User');
let personalTotal = 0;
let communalTotal = 0;
let shoppingTemplates = [];
let allSelected = { personal: false, communal: false };

/**
 * Toggles the visibility of a dropdown section. Only one dropdown can be open at a time.
 * @param {string} dropdownId - The ID of the dropdown section to toggle.
 */
function toggleDropdown(dropdownId) {
  const dropdowns = document.querySelectorAll('.dropdown-content');
  dropdowns.forEach(dropdown => {
    if (dropdown.id === dropdownId) {
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    } else {
      dropdown.style.display = "none";
    }
  });
}

/**
 * Adjusts the item quantity by a specified amount, ensuring it doesn't go below 1.
 * @param {number} amount - The amount to adjust the quantity by (+1 or -1).
 */
function adjustQuantity(amount) {
  const quantitySpan = document.getElementById('item-quantity');
  let quantity = parseInt(quantitySpan.textContent);
  quantity = Math.max(1, quantity + amount); 
  quantitySpan.textContent = quantity;
}

/**
 * Adds a new item to the list based on user inputs for name, quantity, and storage type.
 * Also updates the total item count in the personal or communal list.
 */
function addItem() {
  const listTypeElement = document.querySelector('#list-type-buttons .selected');
  const storageTypeElement = document.querySelector('#storage-type-buttons .selected');
  const itemNameInput = document.getElementById('item-name');
  const itemQuantitySpan = document.getElementById('item-quantity');

  if (!listTypeElement || !storageTypeElement || !itemNameInput.value.trim()) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const listType = listTypeElement.textContent.toLowerCase();
  const itemName = itemNameInput.value.trim();
  const itemQuantity = parseInt(itemQuantitySpan.textContent);
  const storageType = storageTypeElement.textContent.toLowerCase();

  const newItem = new Item(itemName, itemQuantity, listType, storageType);
  addItemToList(newItem, listType);

  if (listType === "personal") {
    personalTotal++;
    document.getElementById('personal-total').textContent = personalTotal;
  } else {
    communalTotal++;
    document.getElementById('communal-total').textContent = communalTotal;
  }

  itemNameInput.value = '';
  itemQuantitySpan.textContent = '1';
}

/**
 * Removes an item from the specified list and updates the total count.
 * @param {HTMLButtonElement} button - The button element clicked to trigger removal.
 * @param {string} listType - The list type ('personal' or 'communal').
 */
function removeItem(button, listType) {
  const listItem = button.parentElement;
  listItem.remove();

  if (listType === "personal") {
    personalTotal--;
    document.getElementById('personal-total').textContent = personalTotal;
  } else {
    communalTotal--;
    document.getElementById('communal-total').textContent = communalTotal;
  }
}

/**
 * Toggles selection of all items in a list.
 * @param {string} listType - The list type (personal or communal).
 */
function selectAllItems(listType) {
  const items = document.querySelectorAll(`#${listType}-list .item-checkbox`);
  allSelected[listType] = !allSelected[listType];
  items.forEach(item => item.checked = allSelected[listType]);
}

/**
 * Adds selected items to the inventory and removes them from the shopping list.
 * @param {string} listType - The list type (personal or communal).
 */
function addToInventory(listType) {
  const itemsList = [];
  const list = document.getElementById(`${listType}-list`);
  const items = list.querySelectorAll('li');
  items.forEach(item => {
    const checkbox = item.querySelector('.item-checkbox');
    if (checkbox.checked) {
      const itemName = item.querySelector('.item-name').textContent;
      const itemQuantity = parseInt(item.querySelector('.item-quantity').textContent.replace(/[()]/g, ''));
      const itemType = item.querySelector('.item-type').textContent.replace(/[()]/g, '');

      const newItem = new Item(itemName, itemQuantity, listType, itemType);
      addToInventoryStorage(newItem);

      list.removeChild(item);
      if (listType === 'personal') personalTotal--;
      else communalTotal--;

      itemsList.push(`${newItem.name} (${newItem.quantity})`);
    }
  });

  document.getElementById(`${listType}-total`).textContent = listType === 'personal' ? personalTotal : communalTotal;

  if (itemsList.length) alert(`The following items were added to the inventory:\n${itemsList.join('\n')}`);
}

/**
 * Adds an item to the user's appropriate storage area.
 * @param {Item} item - The item to add to storage.
 */
function addToInventoryStorage(item) {
  if (item.type === 'fridge') currentUser.addToFridge(item);
  else if (item.type === 'freezer') currentUser.addToFreezer(item);
  else if (item.type === 'pantry') currentUser.addToPantry(item);
}

/**
 * Adds a new item to the specified list 
 * Creates a list item element containing item details (name, quantity, type)
 * and a remove button for item deletion
 *
 * @param {Item} item - The item to add to the list, including name, quantity, and type
 * @param {string} listType - The list type where the item will be added ('personal' or 'communal')
 */
function addItemToList(item, listType) {
  const list = document.getElementById(`${listType}-list`);
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <input type="checkbox" class="item-checkbox">
    <span class="item-name">${item.name}</span>
    <span class="item-quantity">(${item.quantity})</span>
    <span class="item-type">(${item.type})</span>
    <button class="remove-button custom-button" onclick="removeItem(this, '${listType}')">Remove</button>
  `;
  list.appendChild(listItem);
}

/**
 * Selects the specified storage type button in the UI
 * Highlights the selected storage type button and removes highlighting from others
 *
 * @param {string} type - The storage type to select (fridge, freezer, or pantry)
 */
function selectStorageType(type) {
  const buttons = document.querySelectorAll('#storage-type-buttons .custom-button');
  buttons.forEach(button => {
    if (button.textContent.toLowerCase() === type) {
      button.classList.add('selected'); 
    } else {
      button.classList.remove('selected'); 
    }
  });
}

/**
 * Selects the specified list type button in the UI
 * Highlights the selected list type button and removes highlighting from others
 *
 * @param {string} type - The list type to select (personal or communal)
 */
function selectListType(type) {
  const buttons = document.querySelectorAll('#list-type-buttons .custom-button');
  buttons.forEach(button => {
    if (button.textContent.toLowerCase() === type) {
      button.classList.add('selected'); 
    } else {
      button.classList.remove('selected'); 
    }
  });
}

/**
 * Loads the available templates into the dropdown menu for selection
 */
function loadTemplateOptions() {
  const templateSelect = document.getElementById('template-select');
  templateSelect.innerHTML = '<option value="">Select a template...</option>';
  shoppingTemplates.forEach((template, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = template.name;
    templateSelect.appendChild(option);
  });
}

/**
 * Deletes the selected template after user confirmation
 */
function deleteSelectedTemplate() {
  const templateSelect = document.getElementById('template-select');
  const selectedIndex = templateSelect.value;

  if (selectedIndex === "") {
    alert("Please select a template to delete.");
    return;
  }

  const templateName = shoppingTemplates[selectedIndex].name;
  const confirmDelete = confirm(`Are you sure you want to delete the template "${templateName}"?`);
  if (confirmDelete) {
    shoppingTemplates.splice(selectedIndex, 1);
    alert(`Template "${templateName}" has been deleted.`);
    loadTemplateOptions(); 
  }
}

function saveAsTemplate(listType) {
  const templateName = prompt(`Enter a name for this ${listType} template:`);
  if (!templateName) {
    alert("Template name is required.");
    return;
  }

  let itemsToSave;
  if (listType === 'personal') {
    itemsToSave = Array.from(document.getElementById('personal-list').querySelectorAll('li')).map(item => ({
      name: item.querySelector('.item-name').textContent.trim(),
      quantity: item.querySelector('.item-quantity').textContent.replace(/[()]/g, '').trim(),
      type: item.querySelector('.item-type').textContent.replace(/[()]/g, '').trim(),
      owner: 'personal'
    }));
  } else if (listType === 'communal') {
    itemsToSave = Array.from(document.getElementById('communal-list').querySelectorAll('li')).map(item => ({
      name: item.querySelector('.item-name').textContent.trim(),
      quantity: item.querySelector('.item-quantity').textContent.replace(/[()]/g, '').trim(),
      type: item.querySelector('.item-type').textContent.replace(/[()]/g, '').trim(),
      owner: 'communal'
    }));
  }

  if (itemsToSave.length === 0) {
    alert(`No items to save in the ${listType} list.`);
    return;
  }

  shoppingTemplates.push({
    name: `${templateName} (${listType.toUpperCase()})`,
    list: listType === 'personal' ? { personal: itemsToSave, communal: [] } : { personal: [], communal: itemsToSave }
  });
  alert(`${listType.charAt(0).toUpperCase() + listType.slice(1)} template "${templateName}" saved.`);
  loadTemplateOptions();
}

/**
 * Loads a selected template into the personal or communal list based on its type.
 */
function loadSelectedTemplate() {
  const templateSelect = document.getElementById('template-select');
  const selectedIndex = templateSelect.value;
  if (selectedIndex === "") {
    alert("Please select a template to load.");
    return;
  }

  const selectedTemplate = shoppingTemplates[selectedIndex];
  if (selectedTemplate.name.includes("PERSONAL")) {
    document.getElementById('personal-list').innerHTML = '';
    personalTotal = 0;

    selectedTemplate.list.personal.forEach(item => {
      addItemToList(new Item(item.name, item.quantity, 'personal', item.type), 'personal');
      personalTotal++;
    });

    document.getElementById('personal-total').textContent = personalTotal;

  } else if (selectedTemplate.name.includes("COMMUNAL")) {
    document.getElementById('communal-list').innerHTML = '';
    communalTotal = 0;

    selectedTemplate.list.communal.forEach(item => {
      addItemToList(new Item(item.name, item.quantity, 'communal', item.type), 'communal');
      communalTotal++;
    });

    document.getElementById('communal-total').textContent = communalTotal;
  }

  alert(`Template "${selectedTemplate.name}" loaded successfully.`);
}


/**
 * Sets up event listeners for the DOMContentLoaded event to initialize button click interactions.
 * 
 * Adds click event listeners to storage and list type buttons, ensuring only one button in each 
 * group is highlighted at a time to represent the current selection.
 */
document.addEventListener("DOMContentLoaded", function () {
  
   /** 
   * Initializes event listeners on storage type buttons.
   * Ensures that when a storage type button is clicked, it becomes highlighted, 
   * and any previously selected storage type button is unhighlighted.
   */
  const storageButtons = document.querySelectorAll("#storage-type-buttons .custom-button");
  storageButtons.forEach(button => {
    button.addEventListener("click", () => {
      storageButtons.forEach(btn => btn.classList.remove("selected")); 
      button.classList.add("selected"); 
    });
  });

   /** 
   * Initializes event listeners on list type buttons.
   * Ensures that when a list type button is clicked, it becomes highlighted, 
   * and any previously selected list type button is unhighlighted.
   */
  const listButtons = document.querySelectorAll("#list-type-buttons .custom-button");
  listButtons.forEach(button => {
    button.addEventListener("click", () => {
      listButtons.forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected"); 
    });
  });
});

window.onload = loadTemplateOptions;
