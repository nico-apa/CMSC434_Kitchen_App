
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


































/* FoodCategory is effectively an enum that represent the cases for different Food Categories. The fridge, 
freezer, and pantry will only have certain food categories in each. */
// Fridge will have: Eggs, Condiments, Meat, Fish, Dairy, Vegetables, Fruits, Alcohols, Beverages, Leftovers, Misc
// Freezer will have: Meat, Fish, Dairy, Vegetables, Fruits, Alcohols, Misc
// Pantry will have: Baking Goods, Snacks, Cereals, Teas, Coffee, Canned Goods, Misc
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
  });

  /* StorageType is effectivly an enum that represents the different cases for storage. Food can be stored
     Either in the Fridge, Freezer, or Pantry. Since fridge, freezer, and pantry should all just be a different 
     instantation of the same class this enum will allow us to decicde where the food items should go. It will be
     used in the FoodItem class below. */
  const StorageType = Object.freeze({
    FRIDGE: "Fridge",
    FREEZER: "Freezer",
    PANTRY: "Pantry",
  });
  
  /* FoodItem is the class that represents an item of food that will go in the Fridge, Freezer, or Pantry. 
     Name should be a string. Owner should be a User class. Category should be a FoodCategory const.
     Perishavle should be a boolean. Expiration Date should be an optional string that is filled in only
     if the food item is perishable. Type should be a StorageType const representing where the item should
     be stored. When filtering items for specific users we can look through the FoodItem.owner to make an 
     temp array to display the results. */
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
  
  /* User is the class that represents one of the users of the kitchen. Each user will have a name (String),
     an array of favorite recipes (Recipe), an array of dietary restrictions (FoodCategory). */
  class User {
    constructor(name, favoriteRecipes, dietaryRestrictions) {
      this.name = name;
      this.favoriteRecipes = favoriteRecipes;
      this.dietaryRestrictions = dietaryRestrictions;
    }
  }
  
  /* Recipe is the class that represents a recipe for the food suggestions page. I am not sure what Bardia 
      plans to have here so I left it mostly blank except an string name variable. */
  class Recipe {
    constructor(name, ingredients) {
      this.name = name;
      // BARDIA IMPLEMENT ME
    }
  }
  
  /* Storage is the class that represents the Fridge, Freezer, Pantry for a Kitchen. In each of the
     storage types there will be a name (String), type (StorageType), and array of food items (FoodItem). */
  /* Side Note: I am not sure if there should be a seperate class for a Fridge, Freezer, and Pantry. While
     making the Data Model it didnt seem like they had any different functions so for now they can be
     considered the same "type".  */
  class Storage {
    constructor(name, type, items = []) {
      this.name = name;
      this.type = type;
      this.items = items;
    }
    
    /* Multiple functions need to be added to this class, for right now I only have add but remove, edit and 
       much more need to be added. */
    addItem(item) {
      this.items.push(item);
    }
  }
  
  /* Kitchen is the class that represents the overarching kitchen meaning it will store the users and kitchen
     appliance information. There should only be one instance of this class for the app (as of now) and it 
     will be used as the source of truth to populate UI elements. The class has a variable name (String), 
     array of users (User), a fridge variable (Storage), a freezer variable (Storage), a pantry variable (Storage). */
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





  
