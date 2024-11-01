const StorageType = Object.freeze({
    FRIDGE: "Fridge",
    FREEZER: "Freezer",
    PANTRY: "Pantry",
});

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
    FIXME: ""
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
    constructor(name) {
        this.name = name;
        this.fridge = [];
        this.freezer = [];
        this.pantry = [];
    }

    addToStorage(item) {
        if (item.type === StorageType.FRIDGE) this.fridge.push(item);
        else if (item.type === StorageType.FREEZER) this.freezer.push(item);
        else if (item.type === StorageType.PANTRY) this.pantry.push(item);
    }
}

class Kitchen {
    constructor(name, users = [], fridge = new User("Fridge"), freezer = new User("Freezer"), pantry = new User("Pantry")) {
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

const communalUser = new User("Communal");
const currentUser = new User("Default User");
let personalTotal = 0;
let communalTotal = 0;
let shoppingTemplates = [];
let allSelected = { personal: false, communal: false };

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
    const storageType = StorageType[storageTypeElement.textContent.toUpperCase()];
  
    const newItem = new FoodItem(
        itemName,
        listType === "personal" ? currentUser : communalUser,
        FoodCategory.MISC,
        false,
        null,
        itemQuantity,
        storageType
    );

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

function addToInventory(listType) {
    const itemsList = [];
    const list = document.getElementById(`${listType}-list`);
    const items = list.querySelectorAll('li');
    items.forEach(item => {
        const checkbox = item.querySelector('.item-checkbox');
        if (checkbox.checked) {
            const itemName = item.querySelector('.item-name').textContent;
            const itemQuantity = parseInt(item.querySelector('.item-quantity').textContent.replace(/[()]/g, ''));
            const itemType = StorageType[item.querySelector('.item-type').textContent.replace(/[()]/g, '').toUpperCase()];

            const newItem = new FoodItem(
                itemName,
                listType === "personal" ? currentUser : communalUser,
                FoodCategory.MISC,
                false,
                null,
                itemQuantity,
                itemType
            );
            addToInventoryStorage(newItem);

            list.removeChild(item);
            if (listType === 'personal') personalTotal--;
            else communalTotal--;

            itemsList.push(`${newItem.name} (${newItem.amount})`);
        }
    });

    document.getElementById(`${listType}-total`).textContent = listType === 'personal' ? personalTotal : communalTotal;

    if (itemsList.length) alert(`The following items were added to the inventory:\n${itemsList.join('\n')}`);
}

function addItemToList(item, listType) {
    const list = document.getElementById(`${listType}-list`);
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <input type="checkbox" class="item-checkbox">
        <span class="item-name">${item.name}</span>
        <span class="item-quantity">(${item.amount})</span>
        <span class="item-type">(${item.type})</span>
        <button class="remove-button custom-button" onclick="removeItem(this, '${listType}')">Remove</button>
    `;
    list.appendChild(listItem);
}

function addToInventoryStorage(item) {
    item.owner.addToStorage(item);
}

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

function adjustQuantity(amount) {
    const quantitySpan = document.getElementById('item-quantity');
    let quantity = parseInt(quantitySpan.textContent);
    quantity = Math.max(1, quantity + amount); 
    quantitySpan.textContent = quantity;
}

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

function selectAllItems(listType) {
    const items = document.querySelectorAll(`#${listType}-list .item-checkbox`);
    allSelected[listType] = !allSelected[listType];
    items.forEach(item => item.checked = allSelected[listType]);
}

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
            addItemToList(new FoodItem(item.name, 'personal', FoodCategory.MISC, false, null, item.quantity, item.type), 'personal');
            personalTotal++;
        });

        document.getElementById('personal-total').textContent = personalTotal;

    } else if (selectedTemplate.name.includes("COMMUNAL")) {
        document.getElementById('communal-list').innerHTML = '';
        communalTotal = 0;

        selectedTemplate.list.communal.forEach(item => {
            addItemToList(new FoodItem(item.name, 'communal', FoodCategory.MISC, false, null, item.quantity, item.type), 'communal');
            communalTotal++;
        });

        document.getElementById('communal-total').textContent = communalTotal;
    }

    alert(`Template "${selectedTemplate.name}" loaded successfully.`);
}


    document.addEventListener("DOMContentLoaded", function () {

    const storageButtons = document.querySelectorAll("#storage-type-buttons .custom-button");
    storageButtons.forEach(button => {
        button.addEventListener("click", () => {
            storageButtons.forEach(btn => btn.classList.remove("selected")); 
            button.classList.add("selected"); 
        });
    });

    const listButtons = document.querySelectorAll("#list-type-buttons .custom-button");
    listButtons.forEach(button => {
        button.addEventListener("click", () => {
            listButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected"); 
        });
    });
});

window.onload = loadTemplateOptions;

