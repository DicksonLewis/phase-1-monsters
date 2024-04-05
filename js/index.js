// Event listener added to the document object, listening for 'DOMContentLoaded'
document.addEventListener("DOMContentLoaded", (event) => {
    let currentPage = 1; // Initialize the current page
  
    // Grab createMonster div element
    const createMonsterDiv = document.getElementById("create-monster");
    // Create input for name
    const inputName = document.createElement("input");
    inputName.placeholder = "Type name here...";
    // Create input for age
    const inputAge = document.createElement("input");
    inputAge.placeholder = "Type age here...";
  
    const inputDescription = document.createElement("input");
    inputDescription.placeholder = "Type description here...";
    // Create 'Create a Monster!' button
    const inputButton = document.createElement("button");
    inputButton.textContent = "Create a Monster!";
  
    //   Append all created elements to 'createMonsterDiv'
    createMonsterDiv.appendChild(inputName);
    createMonsterDiv.appendChild(inputAge);
    createMonsterDiv.appendChild(inputDescription);
    createMonsterDiv.appendChild(inputButton);
  
    inputButton.addEventListener("click", createMonsterFn);
    function createMonsterFn() {
      console.log("Button clicked!");
  
      let name = inputName.value;
      let age = inputAge.value;
      let desc = inputDescription.value;
  
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: name, age: age, description: desc }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok (${response.status} - ${response.statusText})`
            );
          }
          return response.json();
        })
        .then((data) => {
          // Handle the successful response here
          console.log("Successfully created a monster:", data);
        })
        .catch((error) => {
          // Handle errors here
          console.error("There was an error:", error);
        });
    }
  
    //   Fetch monsters.json
    function loadMonsters(page){
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        // Console.log the data
        console.log(data);
        //
        data.forEach((element) => {
          const mosterContainer = document.getElementById("monster-container");
          const card = document.createElement("div");
          const nameElement = document.createElement("h2");
          nameElement.textContent = element.name;
          const ageElement = document.createElement("p");
          ageElement.textContent = element.age;
          const descElement = document.createElement("p");
          descElement.textContent = element.description;
  
          card.appendChild(nameElement);
          card.appendChild(ageElement);
          card.appendChild(descElement);
          mosterContainer.appendChild(card);
        });
      });
    }
    // Load monsters when the page loads
    loadMonsters(currentPage);
  
    // Event listener for the "Load Previous" button
    document.getElementById("back").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        loadMonsters(currentPage);
      }
    });
  
    // Event listener for the "Load Next" button
    document.getElementById("load-next").addEventListener("click", () => {
      currentPage++;
      loadMonsters(currentPage);
    });
  });