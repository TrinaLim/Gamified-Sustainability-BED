document.addEventListener("DOMContentLoaded", function () {
    const inventoryContainer = document.getElementById("inventoryContainer");
    const deleteAccountButton = document.getElementById("deleteAccountButton");
    const storedUserId = parseInt(localStorage.getItem("userId"));  
    const displayTaskPoints = document.getElementById("taskPoints")
    //display all inventory items
    const displayInventoryCallback = (responseStatus, responseData) => {
        const fragment = document.createDocumentFragment();
        responseData["magicalItemsOwned"].forEach((magicalItem) => { //display individual magical items
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 p-3"; 
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                    <img src="./magicalItemImages/img${magicalItem.magicalItemId}.webp" class="card-img-top" alt="Magical item image">
                        <h5 class="card-title">Magical Item: ${magicalItem.magicalItemId}</h5>
                        <p class="card-text">
                            <strong>Name:</strong> ${magicalItem.name}
                        </p>
                        <p class="card-text">
                            <strong>Abilities:</strong> ${magicalItem.abilities}
                        </p>
                        <p class="card-text">
                            <strong>Damage:</strong> ${magicalItem.damage}
                        </p>
                        <button class="btn btn-primary delete-btn" data-inventory-id="${magicalItem.inventoryId}">Delete</button>
                    </div>
                </div>
            `;
            fragment.appendChild(displayItem);
        });

        responseData["petsOwned"].forEach((pet) => { //display individual pets owned
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 p-3";
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                    <img src="./petImages/img${pet.petId}.webp" class="card-img-top" alt="Pet image">
                        <h5 class="card-title">Pet id: ${pet.petId}</h5>
                        <p class="card-text">
                            <strong>Breed:</strong> ${pet.petBreed}
                        </p>
                        <p class="card-text">
                            <strong>Level:</strong> ${pet.petLevel}
                        </p>
                        <a href="singlePet.html?id=${pet.inventoryId}" class="btn btn-primary">View Details</a>
                        <button class="btn btn-primary delete-btn" data-inventory-id="${pet.inventoryId}">Delete</button>
                    </div>
                </div>
            `;
            fragment.appendChild(displayItem);
        });

        // Append all new cards at once
        inventoryContainer.appendChild(fragment);
        //view Details button
        const viewDetailsButtons = document.querySelectorAll('.viewDetails-btn');
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function () {
                const petId = this.getAttribute('data-pet-id');
                getPetById(petId);
            });
        });
        //delete button
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const itemId = this.getAttribute('data-inventory-id');
                deleteItem(itemId);
            });
        });
    }; //end of displayinventoryCallback
    fetchMethod(currentUrl + `/api/player/${storedUserId}/inventory`, displayInventoryCallback, "GET");
    //display task points
    const displayTaskPointsCallback = (responseStatus, responseData) => {
        let taskPoints;
        if (responseStatus === 404) {
            taskPoints = 0
        } else {
            taskPoints = responseData
        };
        displayTaskPoints.innerHTML = `<h5 class="text-right">Task Points: ${taskPoints}</h5>`;
    };//end of display task points
    fetchMethod(currentUrl + `/api/player/${storedUserId}/taskPoints`, displayTaskPointsCallback, "GET");
    
    //delete account
    deleteAccountButton.addEventListener("click", function() {
        var valYesNo = confirm("Are you sure you want to delete account?"); //confirmation message
        if (valYesNo === false) {
            location.reload();
        } else {
            const deleteAccountCallback = (responseStatus, responseData) => {
                if (responseStatus === 204) {
                    window.alert("Account deleted successfully.");
                    var url = "login.html";
                    window.location.href = url; //user goes back to login page
                } else if (responseStatus === 404) {
                    window.alert("User Id not found. Try logging in again.");
                    return;
                } else {
                    window.alert("Server side error. Unable to delete account.");
                    return;
                };
            };
            fetchMethod(currentUrl+`/api/users/${storedUserId}`, deleteAccountCallback, "DELETE");
        };
    }); //end of deleteAccountButton event listener
    //getPetById
    function getPetById(inventoryId) {
        const getPetByIdCallback = (responseStatus, responseData) => {
            if (responseStatus === 404) {
                window.alert("You do not own any pets at the moment.");
                return;
            } else{
                window.alert("Server side error. Unable to retrieve pet by id.");
                return;
            };
        };
        fetchMethod(currentUrl + `/api/player/${storedUserId}/inventory/${inventoryId}`, getPetByIdCallback, "GET");
    }; //end of getPetById()
    //delete magical item
    function deleteItem(itemsId) {
        const deleteMagicalItemCallback = (responseStatus, responseData) => {
            if (responseStatus === 204) {
                fetchMethod(currentUrl + `/api/player/${storedUserId}/inventory`, displayInventoryCallback, "GET");
                location.reload()
            } else {
                window.alert("Server side error. Unable to delete item.");
                return;
            }
            
        };
      fetchMethod(currentUrl + `/api/player/${storedUserId}/inventory/${itemsId}`, deleteMagicalItemCallback, "DELETE");
    }; //end of deleteinventory()
});



