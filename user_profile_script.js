function toggleDropdown(chevron) {
    const dropdownContent = chevron.nextElementSibling;

    console.log("debug test")
    
    if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
        dropdownContent.style.display = "block";
        chevron.parentElement.classList.add("expanded");  
    } else {
        dropdownContent.style.display = "none";
        chevron.parentElement.classList.remove("expanded");
    }
}

const buttons = document.querySelectorAll('.btn_like');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('selected');
    });
});

function setupSingleSelectButtons(selector) {
    const buttons = document.querySelectorAll(selector);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
}

setupSingleSelectButtons('.btn_select'); 

function toggleEditMode() {
    // Select all editable elements
    const editableElements = document.querySelectorAll('.user_table_pref td, .user_name, .user_age, .user_desc');

    // Check if editing is currently enabled
    const isEditable = editableElements[0].isContentEditable;

    // Toggle the contentEditable property on all elements
    editableElements.forEach(element => {
        element.contentEditable = !isEditable; // Toggle between true and false
    });

    if (!isEditable) {
        // Add an event listener to the document to listen for the Enter key
        document.addEventListener('keydown', handleEnterKey);
    } else {
        // Remove the event listener if editing is disabled
        document.removeEventListener('keydown', handleEnterKey);
    }

    // Update icon style or text to indicate edit mode
    const icon = document.querySelector('.edit_btn .icon');
    if (!isEditable) {
        icon.style.filter = 'brightness(0.8)'; // Optional visual feedback (darker icon)
        icon.title = "Click to save changes"; // Tooltip change to indicate "Save"
    } else {
        icon.style.filter = ''; // Reset icon appearance
        icon.title = "Click to edit preferences"; // Tooltip back to "Edit"
    }
}

// Function to handle Enter key press in any editable element
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent new line from being added

        // Select all editable elements and disable editing for all at once
        const editableElements = document.querySelectorAll('.user_table_pref td, .user_name, .user_age, .user_desc');
        editableElements.forEach(element => {
            element.contentEditable = "false"; // Disable editing
        });

        // Remove the Enter key listener after saving changes
        document.removeEventListener('keydown', handleEnterKey);

        // Optionally, provide feedback or save all element data
        editableElements.forEach(element => {
            console.log("Saved changes for element:", element.textContent);
        });
    }
}





