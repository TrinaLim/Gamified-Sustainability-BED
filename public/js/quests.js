document.addEventListener("DOMContentLoaded", function () {
    const questContainer = document.getElementById("questContainer");
    const deleteAccountButton = document.getElementById("deleteAccountButton");
    const storedUserId = parseInt(localStorage.getItem("userId"));  
    const displayTaskPoints = document.getElementById("taskPoints")
    //display all quest
    const displayQuestCallback = (responseStatus, responseData) => {
        let counter = 0;
        const fragment = document.createDocumentFragment();
        responseData.forEach((quest) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 p-3";
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${quest.quest_id}</h5>
                            <p class="card-text">
                                <strong>Name:</strong> ${quest.name}
                            </p>
                            <p class="card-text">
                                <strong>Requirements:</strong> 
                            </p>
                            <p class="card-text">
                                <strong>&nbsp&nbsp&nbspMagical Item Id:</strong> ${quest.requirements["magicalItemId"]}
                            </p>
                            <p class="card-text">
                                <strong>&nbsp&nbsp&nbspMagical Item Name:</strong> ${quest.requirements["magicalItemName"]}
                            </p>
                            <p class="card-text">
                                <strong>Rewards:</strong> 
                            </p>
                            <img src="./petImages/img${counter+=1}.webp" class="card-img-top" alt="Pet image">
                            <p class="card-text">
                                <strong>&nbsp&nbsp&nbspPet Breed:</strong> ${quest.rewards["petBreed"]}
                            </p>
                            <p class="card-text">
                                <strong>&nbsp&nbsp&nbspPet Abilities:</strong> ${quest.rewards["petAbilities"]}
                            </p>
                            <button class="btn btn-primary complete-btn" data-quest-id="${quest.quest_id}">Complete</button>
                    </div>
                </div>
            `;
            fragment.appendChild(displayItem);
        });
        // Append all new cards at once
        questContainer.appendChild(fragment);
        //complete button
        const completeButtons = document.querySelectorAll('.complete-btn');
        completeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const questId = this.getAttribute('data-quest-id');
                completeQuest(questId);
            });
        });
    }; //end of displayquestCallback
    fetchMethod(currentUrl + "/api/player/quests", displayQuestCallback, "GET");
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
    //complete quest
    function completeQuest(questId) {
        const completeQuestCallback = (responseStatus, responseData) => {
            if (responseStatus === 200) {
                window.alert("Quest completed successfully. You have unlocked a new pet.");
                location.reload();
            } else if (responseStatus === 404) {
                window.alert("You did not meet the requirements to complete this quest. Please check again.");
                return;
            } else {
                window.alert("Server side error. Unable to complete quest.");
                return;
            } 
            fetchMethod(currentUrl + "/api/player/quests", displayQuestCallback, "GET");
        };
        fetchMethod(currentUrl + `/api/player/${storedUserId}/quests/${questId}/complete`, completeQuestCallback, "POST",);
    }; //end of completeQuest()
});



