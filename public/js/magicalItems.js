document.addEventListener("DOMContentLoaded", function () {
    const magicalItemsContainer = document.getElementById("magicalItemsContainer");
    const deleteAccountButton = document.getElementById("deleteAccountButton");
    const storedUserId = parseInt(localStorage.getItem("userId"));  
    const displayTaskPoints = document.getElementById("taskPoints");
    //display all magicalItems
    const displayMagicalItemsCallback = (responseStatus, responseData) => {
    let counter = 0;
        const fragment = document.createDocumentFragment();
        responseData.forEach((magicalItems) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 p-3"; 
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                    <img src="./magicalItemImages/img${counter+=1}.webp" class="card-img-top" alt="Magical item image">
                        <h5 class="card-title">${magicalItems.magicalItems_id}</h5>
                            <p class="card-text">
                                <strong>Name:</strong> ${magicalItems.name}
                            </p>
                            <p class="card-text">
                                <strong>Abilities:</strong> ${magicalItems.abilities}
                            </p>
                            <p class="card-text">
                                <strong>Damage:</strong> ${magicalItems.damage}
                            </p>
                            <p class="card-text">
                                <strong>Points Needed:</strong> ${magicalItems.pointsNeeded}
                            </p>
                            <button class="btn btn-primary buy-btn" data-magicalItems-id="${magicalItems.magicalItems_id}">Buy</button>
                    </div>
                </div>
            `;
            fragment.appendChild(displayItem);
        });

        // Append all new cards at once
        magicalItemsContainer.appendChild(fragment);

        //buy button
        const buyButtons = document.querySelectorAll('.buy-btn');
        buyButtons.forEach(button => {
            button.addEventListener('click', function () {
                const magicalItemsId = this.getAttribute('data-magicalItems-id');
                buyMagicalItems(magicalItemsId);
            });
        });
    }; //end of displaymagicalItemsCallback
    fetchMethod(currentUrl + "/api/magicalItems", displayMagicalItemsCallback, "GET");
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
    //buy magicalItems
    function buyMagicalItems(magicalItemsId) {
        const buyMagicalItemsCallback = (responseStatus, responseData) => {
            if (responseStatus === 200) {
                window.alert("Magical Item bought successfully. Please check your inventory.");
                location.reload();
            } else if (responseStatus === 404 || responseStatus === 400) { //validation
                window.alert("Insufficient points to purchase.");
                return;
            } else {
                window.alert("Server side error. Unable to buy magical item.");
                return;
            };
            fetchMethod(currentUrl + "/api/magicalItems", displayMagicalItemsCallback, "GET");
        };
        fetchMethod(currentUrl + `/api/magicalItems/${storedUserId}/${magicalItemsId}`, buyMagicalItemsCallback, "POST");
    }; //end of buyMagicalItems()
});



