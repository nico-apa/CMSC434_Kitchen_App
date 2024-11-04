
document.addEventListener('DOMContentLoaded', () => {
    const suggestedRecipes = [
        {
            title: "Vegan Tacos",
            tags: ["Vegan", "Quick"],
            neededIngredients: "Tortillas, Black Beans, Avocado",
            cookTime: "15 minutes",
            shortDescription: "Plant-based tacos with healthy ingredients.",
            ingredients: ["Tortillas", "Black Beans", "Avocado", "Tomatoes", "Lettuce"],
            instructions: [
                "Warm tortillas on a skillet",
                "Mash avocados and spread on tortilla",
                "Add black beans, tomatoes, and lettuce on top of tortilla."
            ],
            image: "images/vegan_tacos.jpg"
        },
        {
            title: "Classic Pancakes",
            tags: ["Breakfast", "Quick"],
            neededIngredients: "Flour, Eggs, Milk",
            cookTime: "20 minutes",
            shortDescription: "Fluffy pancakes, perfect for breakfast.",
            ingredients: ["Flour", "Eggs", "Milk", "Sugar", "Baking Powder"],
            instructions: [
                "Mix flour, sugar, and baking powder in a bowl.",
                "Whisk in eggs and milk until smooth.",
                "Pour batter onto a hot skillet and cook until golden brown."
            ],
            image: "images/pancakes.jpeg"
        },
        {
            title: "Grilled Cheese Sandwich",
            tags: ["Quick", "Snack"],
            neededIngredients: "Bread, Cheese, Butter",
            cookTime: "10 minutes",
            shortDescription: "A classic grilled cheese sandwich.",
            ingredients: ["Bread", "Cheese", "Butter"],
            instructions: [
                "Butter one side of each bread slice.",
                "Place cheese between slices with buttered sides facing out.",
                "Cook on a skillet until both sides are golden brown."
            ],
            image: "images/gcheese.jpeg"
        },
        {
            title: "Spaghetti Bolognese",
            tags: ["Dinner", "Italian"],
            neededIngredients: "Ground Beef, Tomato Sauce, Spaghetti",
            cookTime: "45 minutes",
            shortDescription: "Classic Italian pasta with rich Bolognese sauce.",
            ingredients: ["Ground Beef", "Tomato Sauce", "Spaghetti", "Onions", "Garlic", "Olive Oil"],
            instructions: [
                "Cook spaghetti according to package instructions.",
                "Sauté onions and garlic in olive oil.",
                "Add ground beef and cook until browned.",
                "Stir in tomato sauce and simmer.",
                "Serve sauce over spaghetti."
            ],
            image: "images/spaghetti.jpeg"
        },
        {
            title: "Fruit Smoothie",
            tags: ["Breakfast", "Healthy"],
            neededIngredients: "Banana, Berries, Yogurt",
            cookTime: "5 minutes",
            shortDescription: "Refreshing smoothie with a mix of fruits.",
            ingredients: ["Banana", "Berries", "Yogurt", "Honey", "Ice"],
            instructions: [
                "Combine all ingredients in a blender.",
                "Blend until smooth.",
                "Pour into a glass and enjoy."
            ],
            image: "images/smoothie.jpeg"
        },
        {
            title: "Chicken Stir-Fry",
            tags: ["Dinner", "Quick"],
            neededIngredients: "Chicken Breast, Vegetables, Soy Sauce",
            cookTime: "20 minutes",
            shortDescription: "Quick and healthy stir-fried chicken with veggies.",
            ingredients: ["Chicken Breast", "Bell Peppers", "Broccoli", "Carrots", "Soy Sauce"],
            instructions: [
                "Slice chicken and vegetables.",
                "Sauté chicken in a hot pan until cooked through.",
                "Add vegetables and stir-fry until tender.",
                "Add soy sauce and cook for another minute."
            ],
            image: "images/stirfry.jpeg"
        },
        {
            title: "Chocolate Chip Cookies",
            tags: ["Dessert", "Baking"],
            neededIngredients: "Flour, Sugar, Chocolate Chips",
            cookTime: "30 minutes",
            shortDescription: "Delicious cookies with gooey chocolate chips.",
            ingredients: ["Flour", "Sugar", "Butter", "Chocolate Chips", "Eggs", "Vanilla Extract", "Baking Soda"],
            instructions: [
                "Preheat oven to 350°F (175°C).",
                "Mix flour, baking soda, and salt in a bowl.",
                "In another bowl, cream together butter and sugar.",
                "Add eggs and vanilla, then mix in the dry ingredients.",
                "Fold in chocolate chips.",
                "Scoop dough onto baking sheet and bake for 10-12 minutes."
            ],
            image: "images/cookie.jpeg"
        },
        {
            title: "Avocado Toast",
            tags: ["Breakfast", "Healthy"],
            neededIngredients: "Bread, Avocado, Salt",
            cookTime: "5 minutes",
            shortDescription: "Simple and nutritious avocado toast.",
            ingredients: ["Bread", "Avocado", "Salt", "Pepper", "Lemon Juice"],
            instructions: [
                "Toast the bread slices.",
                "Mash the avocado and add salt, pepper, and lemon juice.",
                "Spread the avocado mixture on toast."
            ],
            image: "images/avocadotoast.jpeg"
        },
        {
            title: "Lemon Garlic Salmon",
            tags: ["Dinner", "Healthy"],
            neededIngredients: "Salmon Fillets, Lemon, Garlic",
            cookTime: "25 minutes",
            shortDescription: "Oven-baked salmon with a lemon garlic sauce.",
            ingredients: ["Salmon Fillets", "Lemon", "Garlic", "Olive Oil", "Parsley", "Salt", "Pepper"],
            instructions: [
                "Preheat oven to 400°F (200°C).",
                "In a bowl, mix lemon juice, garlic, olive oil, salt, and pepper.",
                "Place salmon on a baking sheet and pour sauce over it.",
                "Bake for 15-20 minutes until cooked through.",
                "Garnish with parsley and serve."
            ],
            image: "images/salmon.jpeg"
        },
    ];

    /* Current Suggested Recipes , and favorite recipe array - empty initially */
    let currSuggRecipes = 0;
    let favRecipes = [];

    /* Shows the suggested recipes with the recipe image and the recipe title. */
    function showSuggestedRecipes(index) {
        const recipe = suggestedRecipes[index];
        document.querySelector('.rectangle-62 .recipe-title').textContent = recipe.title;
        document.querySelector('.rectangle-32 .recipe-image').src = recipe.image;
        document.querySelector('.rectangle-62 .recipe-description').textContent = recipe.shortDescription;

        const starIcon = document.querySelector('.star-icon');
        /* Will show filled star if a favorite recipe, otherwise unfilled star */
        starIcon.src = favRecipes.includes(recipe) ? 'icons/star-filled.svg' : 'icons/star.svg';

        document.querySelector('.rectangle-62 .recipe-title').addEventListener('click', () => showFullRecipe(index));

    }

    /* This will show the full recipe with all its specifications in the pop-up */
    function showFullRecipe(index) {
        const recipe = suggestedRecipes[index];
        document.getElementById('full-recipe-image').src = recipe.image;
        document.getElementById('full-recipe-title').textContent = recipe.title;
        document.getElementById('full-recipe-needed-ingredients').textContent = `Needed Ingredients: ${recipe.neededIngredients || ''}`;
        document.getElementById('full-recipe-cook-time').textContent = `Cook Time: ${recipe.cookTime}`;
        document.getElementById('full-recipe-short-description').textContent = recipe.shortDescription;
        document.getElementById('full-recipe-ingredients').innerHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
        document.getElementById('full-recipe-instructions').innerHTML = recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('');
        document.getElementById('full-recipe-view').style.display = 'flex';
    }
    /* Function shows added recipe - not from array */
    function showAddedRecipe(recipe) {
        document.getElementById('full-recipe-image').src = recipe.image;
        document.getElementById('full-recipe-title').textContent = recipe.title;
        document.getElementById('full-recipe-needed-ingredients').textContent = `Needed Ingredients: ${recipe.neededIngredients || ''}`;
        document.getElementById('full-recipe-cook-time').textContent = `Cook Time: ${recipe.cookTime}`;
        document.getElementById('full-recipe-short-description').textContent = recipe.shortDescription;
        document.getElementById('full-recipe-ingredients').innerHTML = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');
        document.getElementById('full-recipe-instructions').innerHTML = recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('');
        document.getElementById('full-recipe-view').style.display = 'flex';
    }

    // showFull recipe upon + (viewIcon)
    document.querySelector('.recipe-box-container').addEventListener('click', (event) => {
        if (event.target.classList.contains('view-details-icon')) {
            const recipeIndex = Array.from(document.querySelectorAll('.view-details-icon')).indexOf(event.target);
            currSuggRecipes = recipeIndex;
            showFullRecipe(currSuggRecipes);
        }
    });

    // Button to iterate through the recipes in the full-view mode
    document.getElementById('full-recipe-next').addEventListener('click', () => {
        currSuggRecipes = (currSuggRecipes + 1) % suggestedRecipes.length;
        showFullRecipe(currSuggRecipes);
    });

    // Button to iterate (backwards) through the recipes in the full-view mode
    document.getElementById('full-recipe-prev').addEventListener('click', () => {
        currSuggRecipes = (currSuggRecipes - 1 + suggestedRecipes.length) % suggestedRecipes.length;
        showFullRecipe(currSuggRecipes);
    });

    // Exit/Close button in top right of the full-view mode of recipes
    document.getElementById('close-full-recipe-button').addEventListener('click', () => {
        document.getElementById('full-recipe-view').style.display = 'none';
    });

    /* This will set up the composition of the your recipes section, which includes favoriting a recipe,
    and will also include recipe image and name. Allows to star/unstar (favorite/unfavorite) a recipe in this section
    as well. viewIcon (++) will allow to go into full-view mode of the recipe (pop-up will appear). */
    function showYourRecipes() {
        const yourRecipesContainer = document.querySelector('.recipe-box-container');
        yourRecipesContainer.innerHTML = '';

        favRecipes.forEach(recipe => {
            const recipeBox = document.createElement('div');
            recipeBox.classList.add('rectangle-35');

            const recipeImageContainer = document.createElement('div');
            recipeImageContainer.classList.add('rectangle-58');

            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image || 'default_image.png';
            recipeImage.alt = recipe.title;
            recipeImage.classList.add('image-icon');

            /* Favorite button interactoins*/
            const starIcon = document.createElement('img');
            starIcon.src = 'icons/star-filled.svg';
            starIcon.alt = 'Star Icon';
            starIcon.classList.add('star-icon');
            starIcon.addEventListener('click', () => favoriteRecipe(recipe));

            recipeImageContainer.appendChild(recipeImage);
            recipeImageContainer.appendChild(starIcon);
            recipeBox.appendChild(recipeImageContainer);

            const titleContainer = document.createElement('div');
            titleContainer.classList.add('recipe-title');

            const recipeTitle = document.createElement('span');
            recipeTitle.textContent = recipe.title;

            /* View icon (+) interactions */
            const viewIcon = document.createElement('div');
            viewIcon.classList.add('view-details-icon');
            viewIcon.textContent = "+";
            viewIcon.onclick = () => showFullRecipe(recipe);

            titleContainer.appendChild(recipeTitle);
            titleContainer.appendChild(viewIcon);
            recipeBox.appendChild(titleContainer);

            yourRecipesContainer.appendChild(recipeBox);
        });
    }

    /* This will allow to favorite a recipe */
    function favoriteRecipe(recipe) {
        if (favRecipes.includes(recipe)) {
            favRecipes = favRecipes.filter(favRecipe => favRecipe !== recipe);
        } else {
            favRecipes.push(recipe);
        }

        showSuggestedRecipes(currSuggRecipes);
        showYourRecipes();
    }

    // Favorites the recipe once you click on the star-icon
    document.querySelector('.star-icon').addEventListener('click', () => {
        favoriteRecipe(suggestedRecipes[currSuggRecipes]);
    });

    // Will allow to iterate through the suggested recipes (not in full-view mode)
    document.querySelector('.suggested-recipe-container .left-button-background').addEventListener('click', () => {
        currSuggRecipes = (currSuggRecipes > 0) ? currSuggRecipes - 1 : suggestedRecipes.length - 1;
        showSuggestedRecipes(currSuggRecipes);
    });

    // Will allow to iterate (backwardd) through the suggested recipes (not in full-view mode)
    document.querySelector('.suggested-recipe-container .right-button-background').addEventListener('click', () => {
        currSuggRecipes = (currSuggRecipes < suggestedRecipes.length - 1) ? currSuggRecipes + 1 : 0;
        showSuggestedRecipes(currSuggRecipes);
    });

    // Suggested Recipes (includes entire list at first)
    showSuggestedRecipes(currSuggRecipes);


    // Open the Edit/Add Recipe pop-up screen
    document.querySelector('.button-background .button-label').addEventListener('click', () => {
        document.getElementById('add-recipe-popup').style.display = 'flex';
    });

    // Close the Edit/Add Recipe pop-up screen
    document.getElementById('close-edit-add-recipe').addEventListener('click', () => {
        document.getElementById('add-recipe-popup').style.display = 'none';
    });

    // Cancels recipe creation
    document.getElementById('cancel-recipe').addEventListener('click', () => {
        document.getElementById('add-recipe-popup').style.display = 'none';
    });


    // Opens up the pop-up for the browse recipes by category 
    function openBrowseCategoryPopup() {
        document.getElementById('browse-category-pop-up').style.display = 'flex';
    }

    // Browse Category Buttons
    document.querySelectorAll('.category-box').forEach(button => {
        button.addEventListener('click', openBrowseCategoryPopup);
    });

    // Exit button for the "to be implemented" pop-up
    document.getElementById('close-browse-category-pop-up').addEventListener('click', () => {
        document.getElementById('browse-category-pop-up').style.display = 'none';
    });


    // Adds recipe to your recipes section
    function addRecipe(recipe) {
        favRecipes.push(recipe);
        showYourRecipes();
    }

    // Function to show all recipes in "Your Recipes" section
    function showYourRecipes() {
        const yourRecipesContainer = document.querySelector('.recipe-box-container');
        yourRecipesContainer.innerHTML = '';

        favRecipes.forEach(recipe => {
            /* Container for the recipe box with image and the recipeImage container*/
            const recipeBox = document.createElement('div');
            recipeBox.classList.add('rectangle-35');

            const recipeImageContainer = document.createElement('div');
            recipeImageContainer.classList.add('rectangle-58');


            /* Creates const for the recipe image and the favorite button icon*/
            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.title;
            recipeImage.classList.add('image-icon');

            const starIcon = document.createElement('img');
            starIcon.src = 'icons/star-filled.svg';
            starIcon.alt = 'Star Icon';
            starIcon.classList.add('star-icon');
            starIcon.addEventListener('click', () => favoriteRecipe(recipe));



            /* Adds recipe + star to the container*/
            recipeImageContainer.appendChild(recipeImage);
            recipeImageContainer.appendChild(starIcon);
            recipeBox.appendChild(recipeImageContainer);


            const titleContainer = document.createElement('div');
            titleContainer.classList.add('recipe-title');

            const recipeTitle = document.createElement('span');
            recipeTitle.textContent = recipe.title;


            const viewIcon = document.createElement('div');
            viewIcon.classList.add(recipe.neededIngredients ? 'view-hardcoded' : 'view-added');
            viewIcon.textContent = "+";

            // If it's hardcoded or added recipe then either call showFullRecipe(based on array-index) or showAddedRecipe 
            if (recipe.neededIngredients) {
                viewIcon.onclick = () => showFullRecipe(suggestedRecipes.indexOf(recipe));
            } else {
                viewIcon.onclick = () => showAddedRecipe(recipe);
            }

            titleContainer.appendChild(recipeTitle);
            titleContainer.appendChild(viewIcon);
            recipeBox.appendChild(titleContainer);

            yourRecipesContainer.appendChild(recipeBox);
        });
    }

    // Confirm Recipe
    document.getElementById('confirm-recipe').addEventListener('click', () => {
        // Gets input from form fields
        const title = document.getElementById('recipe-title').value;
        const cookTime = document.getElementById('cook-time').value;
        const description = document.getElementById('description').value;
        const ingredients = document.getElementById('ingredients').value.split('\n');
        const instructions = document.getElementById('instructions').value.split('\n');

        // Creates a new recipe
        const newRecipe = {
            title: title,
            cookTime: cookTime,
            shortDescription: description,
            ingredients: ingredients,
            instructions: instructions,
            image: ''
        };

        // Recipe will be added to the Your Recipes section
        addRecipe(newRecipe);

        /* Clear form */
        document.getElementById('add-recipe-popup').style.display = 'none';
        document.getElementById('recipe-title').value = '';
        document.getElementById('cook-time').value = '';
        document.getElementById('description').value = '';
        document.getElementById('ingredients').value = '';
        document.getElementById('instructions').value = '';
    });

});

