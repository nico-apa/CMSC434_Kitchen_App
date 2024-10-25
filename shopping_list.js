class Item {
    /**
     * Creates a new item.
     * @param {string} name - The name of the item.
     * @param {string} owner - Indicates if the item belongs to the 'personal' or 'communal' list.
     * @param {string} type - The storage type for the item ('fridge', 'freezer', or 'pantry').
     */
    constructor(name, owner, type) {
      this.name = name;
      this.owner = owner; 
      this.type = type;    
    }
  }
  
  
  
  // User class stores items in fridge, freezer, or pantry
  class User {
    /**
     * Creates a new user with empty storage arrays.
     * @param {string} name - The name of the user.
     */
    constructor(name) {
      this.name = name;
      this.fridge = [];
      this.freezer = [];
      this.pantry = [];
    }
  
    // Add item to fridge
    addToFridge(item) {
      this.fridge.push(item);
    }
  
    // Add item to freezer
    addToFreezer(item) {
      this.freezer.push(item);
    }
  
    // Add item to pantry
    addToPantry(item) {
      this.pantry.push(item);
    }
  }
  
  
  
  // Default user for managing the inventory
  const currentUser = new User('Default User');
  let personalTotal = 0;
  let communalTotal = 0;
  
  // Array to store templates in memory
  let shoppingTemplates = [];
  
  /**
   * Adds an item to the shopping list (either personal or communal).
   */
  function addItem() {
    // Get the values from the form (list type, item name, and storage type)
    const listType = document.getElementById('list-type').value;
    const itemName = document.getElementById('item-name').value;
    const storageType = document.getElementById('storage-type').value;
  
    // Making sure the item name is not empty
    if (itemName === "") {
      alert("Please enter a valid item name.");
      return;
    }
  
    // Creating a new Item object
    const newItem = new Item(itemName, listType, storageType);
  
    // Selects the appropriate list (personal or communal) based on the listType
    const list = document.getElementById(`${listType}-list`);
  
    // Creating a new list item (li) element for the shopping list
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input type="checkbox" class="item-checkbox">
      ${newItem.name} <span>(${newItem.type})</span>
      <button onclick="removeItem(this, '${listType}')">Remove</button>
    `;
    
    // Appending the new item to the list
    list.appendChild(listItem);
  
    // Updateing the total count for personal or communal list
    if (listType === "personal") {
      personalTotal++;
      document.getElementById('personal-total').textContent = personalTotal;
    } else {
      communalTotal++;
      document.getElementById('communal-total').textContent = communalTotal;
    }
  
    // Clearing the item name input field for user "joy"
    document.getElementById('item-name').value = '';
  }
  
  /**
   * Removes an individual item from the shopping list.
   * @param {HTMLElement} button - The "Remove" button element that was clicked.
   * @param {string} listType - The type of list the item belongs to ('personal' or 'communal').
   */
  function removeItem(button, listType) {
    // Removing the parent list item (li) element
    const listItem = button.parentElement;
    listItem.remove();
  
    // Updating the total count for personal or communal list
    if (listType === "personal") {
      personalTotal--;
      document.getElementById('personal-total').textContent = personalTotal;
    } else {
      communalTotal--;
      document.getElementById('communal-total').textContent = communalTotal;
    }
  }
  
  /**
   * Adds all checked items to the user's inventory (fridge, freezer, or pantry) 
   * and removes them from the shopping list.
   */
  function addToInventory() {
    const addedItems = [];
  
    // Process the personal list (items to be added to personal storage)
    const personalList = document.getElementById('personal-list');
    const personalItems = personalList.querySelectorAll('li');
  
    personalItems.forEach(item => {
      const checkbox = item.querySelector('.item-checkbox');
      if (checkbox.checked) {
        // Getting the item name and storage type from the list item
        const itemName = item.querySelector('span').previousSibling.textContent.trim();
        const storageType = item.querySelector('span').innerText;
  
        // Creating a new item object and add it to the corresponding storage
        const newItem = new Item(itemName, 'personal', storageType);
        addToInventoryStorage(newItem);
        
        // Removing the item from the shopping list after adding to inventory
        personalList.removeChild(item);
        personalTotal--;
        addedItems.push(`${newItem.name} (${newItem.type}) (personal)`);
      }
    });
    document.getElementById('personal-total').textContent = personalTotal;
  
    // Processing the communal list (items to be added to communal storage)
    const communalList = document.getElementById('communal-list');
    const communalItems = communalList.querySelectorAll('li');
  
    communalItems.forEach(item => {
      const checkbox = item.querySelector('.item-checkbox');
      if (checkbox.checked) {
        // Getting the item name and storage type from the list item
        const itemName = item.querySelector('span').previousSibling.textContent.trim();
        const storageType = item.querySelector('span').innerText;
  
        // Creating a new item object and add it to the corresponding storage
        const newItem = new Item(itemName, 'communal', storageType);
        addToInventoryStorage(newItem);
  
        // Removing the item from the shopping list after adding to inventory
        communalList.removeChild(item);
        communalTotal--;
        addedItems.push(`${newItem.name} (${newItem.type}) (communal)`);
      }
    });
    document.getElementById('communal-total').textContent = communalTotal;
  
    // Displaying a summary alert of all items added to the inventory
    if (addedItems.length > 0) {
      alert(`The following items were added to the inventory:\n- ${addedItems.join('\n- ')}`);
    } else {
      alert("No items were selected for addition.");
    }
  }
  
  /**
   * Adds an item to the user's storage (fridge, freezer, or pantry) based on the item's type.
   * @param {Item} item - The item to be added to the storage.
   */
  function addToInventoryStorage(item) {
    if (item.type === 'fridge') {
      currentUser.addToFridge(item);
    } else if (item.type === 'freezer') {
      currentUser.addToFreezer(item);
    } else if (item.type === 'pantry') {
      currentUser.addToPantry(item);
    }
  }
  
  /**
   * Saves the current shopping list as a template in the in-memory array.
   */
  function saveAsTemplate() {
    // Prompt the user for a template name
    const templateName = prompt("Enter a name for this template:");
  
    // Ensures a name is provided
    if (!templateName) {
      alert("Template name is required.");
      return;
    }
  
    // Collecting personal and communal items for the template
    const shoppingList = {
      personal: Array.from(document.getElementById('personal-list').querySelectorAll('li')).map(item => ({
        name: item.querySelector('span').previousSibling.textContent.trim(),
        type: item.querySelector('span').innerText
      })),
      communal: Array.from(document.getElementById('communal-list').querySelectorAll('li')).map(item => ({
        name: item.querySelector('span').previousSibling.textContent.trim(),
        type: item.querySelector('span').innerText
      }))
    };
  
    // Saveing the template in the in-memory array
    shoppingTemplates.push({ name: templateName, list: shoppingList });
  
    // Notifying the user and refresh the template dropdown
    alert(`Template "${templateName}" saved.`);
    loadTemplateOptions();
  }
  
  /**
   * Loads the available templates into the dropdown menu for selection.
   */
  function loadTemplateOptions() {
    const templateSelect = document.getElementById('template-select');
    templateSelect.innerHTML = '<option value="">-- Select Template --</option>';
  
    // Populating the dropdown with saved template names
    shoppingTemplates.forEach(template => {
      const option = document.createElement('option');
      option.value = template.name;
      option.textContent = template.name;
      templateSelect.appendChild(option);
    });
  }
  
  /**
   * Loads the selected template and populates the shopping list with the saved items.
   */
  function loadTemplate() {
    // Getting the selected template name from the dropdown
    const templateName = document.getElementById('template-select').value;
  
    // Ensuring a template is selected
    if (!templateName) {
      alert("Please select a template to load.");
      return;
    }
  
    // Finding the template object by its name
    const selectedTemplate = shoppingTemplates.find(template => template.name === templateName);
  
    // Loading personal items from the template
    const personalList = document.getElementById('personal-list');
    personalList.innerHTML = ''; // Clearing current list
    selectedTemplate.list.personal.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <input type="checkbox" class="item-checkbox">
        ${item.name} <span>(${item.type})</span>
        <button onclick="removeItem(this, 'personal')">Remove</button>
      `;
      personalList.appendChild(listItem);
    });
    personalTotal = selectedTemplate.list.personal.length;
    document.getElementById('personal-total').textContent = personalTotal;
  
    // Load communal items from the template
    const communalList = document.getElementById('communal-list');
    communalList.innerHTML = ''; // Clear current list
    selectedTemplate.list.communal.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <input type="checkbox" class="item-checkbox">
        ${item.name} <span>(${item.type})</span>
        <button onclick="removeItem(this, 'communal')">Remove</button>
      `;
      communalList.appendChild(listItem);
    });
    communalTotal = selectedTemplate.list.communal.length;
    document.getElementById('communal-total').textContent = communalTotal;
  
    // Notify the user that the template has been loaded
    alert(`Template "${templateName}" loaded.`);
  }
  
  /**
   * Deletes the selected template from the in-memory array.
   */
  function deleteTemplate() {
    const templateName = document.getElementById('template-select').value;
  
    // Ensure a template is selected
    if (!templateName) {
      alert("Please select a template to delete.");
      return;
    }
  
    // Confirming deletion
    const confirmDeletion = confirm(`Are you sure you want to delete the template "${templateName}"?`);
  
    if (confirmDeletion) {
      // Removeing the template from the array
      shoppingTemplates = shoppingTemplates.filter(template => template.name !== templateName);
  
      // Notifying the user and refresh the template dropdown
      alert(`Template "${templateName}" has been deleted.`);
      loadTemplateOptions();
    }
  }
  
  // Automatically load template options when the page is loaded
  window.onload = function () {
    loadTemplateOptions();
  };
  