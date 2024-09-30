function showTab(tabName) {
    // Hide all content sections by removing the 'active' class
    document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
    // Show the selected content section by adding the 'active' class
    document.getElementById(tabName).classList.add('active');
  }
  
  /* Function to capture selected choices and display them */
  function displayChoices() {
    // Get the value of the selected radio button for Hat color #1
    const hat1 = document.querySelector('input[name="hat1"]:checked')?.value;
    // Get the value of the selected option from the dropdown for Hat color #2
    const hat2 = document.getElementById('hat2').value;
    // Display the selected choices in the output paragraph
    document.getElementById('output').textContent = `You chose Hat color #1: ${hat1 || 'None'}, Hat color #2: ${hat2}`;
  }

  function addToList() {
    const userInput = document.getElementById("todo_input");
    // debug statement below ignore
    // console.log(userInput.value);

    if (userInput.value != "") {
        const divElm = document.createElement("div");

        const txtSpan = document.createElement("span");
        txtSpan.textContent = userInput.value;

        txtSpan.addEventListener("click", function() {
            if (txtSpan.style.textDecoration === "line-through") {
                txtSpan.style.textDecoration = "none"; 
            } else {
                txtSpan.style.textDecoration = "line-through"; 
            }
        });

        divElm.appendChild(txtSpan);

        const deleteItem = document.createElement("button");
        deleteItem.textContent = "Delete";
        deleteItem.style.marginLeft = "10rem"; 
        deleteItem.addEventListener("click", function() {
            divElm.remove(); 
        });

        divElm.appendChild(deleteItem);

        const elm = document.getElementById("list_container");
        elm.appendChild(divElm);

        userInput.value = "";
    }    
}
  
  // By default "Text" tab when the page loads
  showTab('text');