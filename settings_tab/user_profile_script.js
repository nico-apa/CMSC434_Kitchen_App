/* diets Nico and Bardia will use in there tabs to display user there preset options
   and use the selected values to filter out recipes in Bardia's page */
   const diets = Object.freeze({
    options: ["Keto", "Paleo", "Vegan", "Vegetarian", "DASH"]
})

/* preferences Nico and Bardia will use in there tabs to display user there preset options
   and use the selected values to filter out recipes in Bardia's page */
const preferences = Object.freeze({
    options: ["Protein", "Organic", "Low-Sugar", "Low-Calorie", "Gluten-Free"]
})

/* Allergies Nico and Bardia will use in there tabs to display user there preset options
   and use the selected values to filter out recipes in Bardia's page */
const allergies = Object.freeze({
    options: ["Wheat", "Peanuts", "Milk", "Shellfish", "Soy"]
})

// Toggle the dropdown content on the scrollable
// user settings. This includes the Customization 
// section and the System Settings
function toggleDropdown(chevron) {
    const dropdown_content = chevron.nextElementSibling;

    if (dropdown_content.style.display === "none" || dropdown_content.style.display === "") {
        dropdown_content.style.display = "block";
        chevron.parentElement.classList.add("expanded");  
    } else {
        dropdown_content.style.display = "none";
        chevron.parentElement.classList.remove("expanded");
    }
}

// Toggle selection for multiple-choice buttons
// for users diet selections 
const buttons = document.querySelectorAll('.diet_options');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('selected');
    });
});


// Set up single-select buttons for the 
// users choice of theme 
// (TO IMPLEMENT!)
// Should change users background colors
// and color themes depending on the selection
function setupSingleSelectButtons(selector) {
    const buttons = document.querySelectorAll(selector);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
}

setupSingleSelectButtons('.theme_select');

// Function that allows users to edit there personal
// settings and information ONLY when the edit icon
// is selected. User then saves there info by pressing
// enter or by pressing the icon again.
// (TO IMPLEMENT!)
// Data will be stored and used accordingly for other
// tabs on the application
function toggleEditMode() {

    const editableElements = document.querySelectorAll('.user_table_pref td, .editable_user_name, .editable_user_age, .editable_user_desc');
    const descriptionDiv = document.querySelector('.editable_user_desc');
    const profilePicture = document.getElementById('profilePicture');
    const isEditable = editableElements[0].isContentEditable;

    // Toggle contentEditable property for all editable elements
    editableElements.forEach(element => {
        if (!element.classList.contains('editable_user_desc')) {
            element.contentEditable = !isEditable;
        }
    });


    if (!isEditable) {
        // Shows keyboard when user is editing personal settings
        showKeyboard();

        // Make the profile picture clickable to upload a new image in edit mode
        profilePicture.onclick = triggerUpload;

        // Replaces description div with a textarea to allow
        // user to type there short description with a character
        // limit of 50
        const textarea = document.createElement('textarea');
        textarea.classList.add('description-textarea');
        textarea.value = descriptionDiv.textContent;
        textarea.maxLength = 50; 
        textarea.rows = 3;

        // Create a character counter
        const charCounter = document.createElement('div');
        charCounter.classList.add('char-counter');
        charCounter.textContent = `${textarea.value.length}/50 characters`;

        // Update character counter as user types
        textarea.addEventListener('input', () => {
            charCounter.textContent = `${textarea.value.length}/50 characters`;
        });

        descriptionDiv.replaceWith(textarea);
        textarea.after(charCounter);
        textarea.focus();

        // Add key listener for saving changes on Enter key
        document.addEventListener('keydown', handleEnterKey);
    } else {
        hideKeyboard()
        // Remove the click event to prevent uploading outside edit mode
        profilePicture.onclick = null;

        // Replace textarea with the updated description div
        const textarea = document.querySelector('.description-textarea');
        const newDescriptionDiv = document.createElement('div');
        newDescriptionDiv.classList.add('editable_user_desc');
        newDescriptionDiv.textContent = textarea.value;

        const charCounter = document.querySelector('.char-counter');
        textarea.replaceWith(newDescriptionDiv);
        if (charCounter) charCounter.remove();

        document.removeEventListener('keydown', handleEnterKey);
    }

}

// Function that will prompt user to 
// upload an image when clicking on
// the current profile picture
// Note: this will only trigger
// when user is in edit mode
function triggerUpload() {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
}

// Handle image upload and update profile picture
function uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profilePicture = document.getElementById("profilePicture");
            profilePicture.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
}

// Function to handle Enter key press in any editable element
// to save changes 
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        // Select all editable elements and disable editing for all at once
        const editableElements = document.querySelectorAll('.user_table_pref td, .editable_user_name, .editable_user_age, .editable_user_desc');
        editableElements.forEach(element => {
            element.contentEditable = "false"; 
        });

        // Remove the Enter key listener after saving changes
        document.removeEventListener('keydown', handleEnterKey);

        // Shows saved changes after hitting enter
        editableElements.forEach(element => {
            console.log("Saved changes for element:", element.textContent);
        });
    }
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