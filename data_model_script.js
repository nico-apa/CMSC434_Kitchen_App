<<<<<<< HEAD

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



// CSS 

.shopping-list-container {
  max-width: 37.5rem; /* Controls the overall width of the container */
  margin: 0 auto; /* Centers the container on the page */
  background-color: white; /* Sets a clean white background for contrast */
  padding: 1.25rem; /* Adds space between the content and the container border */
  box-shadow: 0rem 0rem 0.625rem rgba(0, 0, 0, 0.1); /* Adds a subtle shadow to give depth */
}


 .form-container {
  display: flex; /* Aligns the form elements in a column */
  flex-direction: column; /* Stacks the labels, inputs, and buttons vertically */
  margin-bottom: 1.25rem; /* Adds space below the form */
}





























=======
>>>>>>> b748943 (Current Data Model for Tyler)
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

/* Food Categories for each Storage Container */
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
<<<<<<< HEAD
  }
  
  /* Below is where will create the main instance of a kitchen to hardcode data. Add any data you need for 
     the model down here. I provided a start to help but am planning on adding a lot more later. */
  
  const user1 = new User("Jake", [], [FoodCategory.MEAT, FoodCategory.FISH, FoodCategory.EGGS]);
  const user2 = new User("Susan", [], [FoodCategory.DAIRY]);
  
  const foodItem1 = new FoodItem("Milk", user1, FoodCategory.DAIRY, true, "2024-10-25", 1, "Fridge");
  const foodItem2 = new FoodItem("Chicken", user2, FoodCategory.MEAT, true, "2024-12-05", 2, "Freezer");
  
  const kitchen = new Kitchen("Main Kitchen");
  kitchen.addUser(user1);
  kitchen.addUser(user2);
  
  kitchen.fridge.addItem(foodItem1);
  kitchen.freezer.addItem(foodItem2);





  
=======
}

// Hardcoded users and food items
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
>>>>>>> b748943 (Current Data Model for Tyler)
