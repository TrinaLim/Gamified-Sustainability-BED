document.addEventListener("DOMContentLoaded", function () {
    const petContainer = document.getElementById("petContainer");
    const deleteAccountButton = document.getElementById("deleteAccountButton");
    const storedUserId = parseInt(localStorage.getItem("userId"));  
    const displayTaskPoints = document.getElementById("taskPoints");
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const inventoryId = urlParams.get("id");
    //display all pet
    const displaypetCallback = (responseStatus, responseData) => {
        const fragment = document.createDocumentFragment();
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 p-3 p-3"; // Stretch across the entire width
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                    <img src="./petImages/img${responseData.pet_id}.webp" class="card-img-top" alt="Pet image">
                        <h5 class="card-title">${responseData.pet_id}</h5>
                            <p class="card-text">
                                <strong>Breed:</strong> ${responseData.breed}
                            </p>
                            <p class="card-text">
                                <strong>Abilities:</strong> ${responseData.abilities}
                            </p>
                            <p class="card-text">
                                <strong>Hunger:</strong> ${responseData.hunger}
                            </p>
                            <p class="card-text">
                                <strong>Groom:</strong> ${responseData.groom}
                            </p>
                            <p class="card-text">
                                <strong>groom:</strong> ${responseData.groom}
                            </p>
                            <p class="card-text">
                                <strong>Level:</strong> ${responseData.level}
                            </p>
                            <button class="btn btn-primary updateHealth-btn" data-pet-id="${responseData.id}">Update Health</button>
                            <button class="btn btn-primary delete-btn" data-pet-id="${responseData.id}">Delete</button>
                    </div>
                </div>
            `;
            fragment.appendChild(displayItem);
        // Append all new cards at once
        petContainer.appendChild(fragment);
        //delete button
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const petId = this.getAttribute('data-pet-id');
                deletePet(petId);
            });
        }); 
        //updateHealth button
        const updateHealthButtons = document.querySelectorAll('.updateHealth-btn');
        updateHealthButtons.forEach(button => {
            button.addEventListener('click', function () {
                const petId = this.getAttribute('data-pet-id');
                updateHealthpet(petId);
            });
        });
    }; //end of displaypetCallback
    fetchMethod(currentUrl + `/api/player/${storedUserId}/inventory/${inventoryId}`, displaypetCallback, "GET");
    //display task points
    const displayTaskPointsCallback = (responseStatus, responseData) => {
        let taskPoints;
        if (responseStatus === 404) {
            taskPoints = 0
        } else {
            taskPoints = responseData
        }
        displayTaskPoints.innerHTML = `<h5 class="text-right">Task Points: ${taskPoints}</h5>`;
    };
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
    //delete pet 
    function deletePet(inventoryId) {
        const deletePetCallback = (responseStatus, responseData) => {
            if (responseStatus === 204) {
                window.alert("Pet deleted successfully.");
                var url = "inventory.html";
                window.location.href = url; 
            } else if (responseStatus === 404) {
                window.alert("Pet Id not found. Try logging in or refreshing page again.");
                return;
            } else {
                window.alert("Server side error. Unable to delete Pet");
                return;
            };
        };
      fetchMethod(currentUrl + `/api/player/${storedUserId}/inventory/${inventoryId}`, deletePetCallback, "DELETE");
    }; //end of deletePet()
    //updateHealth pet
    function updateHealthpet(inventoryId) {
        const updateHealthpetCallback = (responseStatus, responseData) => {
            if (responseStatus === 200) {
                window.alert("pet health updated successfully.");
                location.reload();
                fetchMethod(currentUrl + `/api/player/${storedUserId}/pets/${petId}`, displaypetCallback, "GET");
            } else if (responseStatus === 404) {
                window.alert("Pet id not found. Try refreshing page or logging in again.");
                return;
            } else if (responseStatus === 500) {
                window.alert("You have reached the maximum level.")
            } else {
                window.alert("Server side error. Unable to update pet health.");
                return;
            };
        };
        fetchMethod(currentUrl + `/api/player/${storedUserId}/${inventoryId}/updateHealthStatus`, updateHealthpetCallback, "PUT",);
    }; //end of updateHealthpet()
});



