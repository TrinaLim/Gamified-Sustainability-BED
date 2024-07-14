document.addEventListener("DOMContentLoaded", function () {
    const messageContainer = document.getElementById("messageContainer");
    const createMessageButton = document.getElementById("createMessageButton");
    const storedUserId = parseInt(localStorage.getItem("userId")); 
    const deleteAccountButton = document.getElementById("deleteAccountButton");
    const displayTaskPoints = document.getElementById("taskPoints")
    //display all Message
    const displayMessageCallback = (responseStatus, responseData) => {
        const fragment = document.createDocumentFragment();
        responseData.forEach((message, index) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 p-3"; // Stretch across the entire width
            displayItem.innerHTML = `
                <div class="card">
                      <div class="card-body">
                            <h5 class="card-title">${index+1}</h5>
                            <p class="card-text">
                                <strong>User Id:</strong> ${message.user_id}
                            </p>
                            <p class="card-text">
                                <strong>Text:</strong> ${message.message_text}
                            </p>
                            <p class="card-text">
                                <strong>Created On:</strong> ${message.created_at}
                            </p>
                            ${storedUserId  ===  message.user_id ? `
                                <button class="btn btn-primary update-btn" data-message-id="${message.id}">Update</button>
                                <button class="btn btn-primary delete-btn" data-message-id="${message.id}">Delete</button>
                            ` : ''}
                      </div>
                </div>
            `;
            fragment.appendChild(displayItem);
        });//end of displayMessageCallback
        // Append all new cards at once
        messageContainer.appendChild(fragment);
        //delete button
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const messageId = this.getAttribute('data-message-id');
                deleteMessage(messageId);
            });
        });
        //update button
        const updateButtons = document.querySelectorAll('.update-btn');
        updateButtons.forEach(button => {
            button.addEventListener('click', function () {
                const messageId = this.getAttribute('data-message-id');
                updateMessage(messageId);
            });
        }); 
    };//end of displayMessageCallback
    fetchMethod(currentUrl + "/api/message", displayMessageCallback, "GET");
    //create new Message
    createMessageButton.addEventListener("click", function (event) {
        event.preventDefault(); //prevent form from default opening
        displayPrompt(); //display message box
        document.getElementById('submit_button').onclick = function () {
            const user_id = storedUserId;
            const messageText = document.getElementById("messageText").value;
            // Validate input data before making the API call
            if (messageText  === '') {
                window.alert("Invalid input. Please provide valid values.");
                return; // Stop execution if validation fails
            }
            const data = {
                message_text: messageText,
                user_id: user_id
            };
            const createMessageCallback = (responseStatus, responseData) => {
                if (responseStatus === 404) {
                    window.alert("User Id not found. Try logging in again.");
                    return;
                }; 
            };
            // create new message
            fetchMethod(currentUrl + "/api/message", createMessageCallback, "POST", data);
        };
    }); //end of createMessageButton event listener

    deleteAccountButton.addEventListener("click", function() {
        var valYesNo = confirm("Are you sure you want to delete account?"); //confirmation message
        if (valYesNo  ===  false) {
            location.reload();
        } else {
            const deleteAccountCallback = (responseStatus, responseData) => {
                if (responseStatus  ===  204) {
                    window.alert("Account deleted successfully.");
                    var url = "login.html";
                    window.location.href = url; //user goes back to login page
                } else if (responseStatus  ===  404) {
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
    //display task points
    const displayTaskPointsCallback = (responseStatus, responseData) => {
        let taskPoints;
        if (responseStatus  ===  404) {
            taskPoints = 0
        } else {
            taskPoints = responseData
        }
        displayTaskPoints.innerHTML = `<h5 class="text-right">Task Points: ${taskPoints}</h5>`;
    };
    fetchMethod(currentUrl + `/api/player/${storedUserId}/taskPoints`, displayTaskPointsCallback, "GET");
    //display Message box
    function displayPrompt() {
        function showCover() {
            // Creates a cover div to make the page unscrollable while the modal form is open
            let coverDiv = document.createElement('div');
            coverDiv.id = 'cover-div';
            document.body.style.overflowY = 'hidden'; // Disables vertical scrolling
            document.body.append(coverDiv);
        };
        function hideCover() {
            // Removes the cover div and restores page scrollability
            document.getElementById('cover-div').remove();
            document.body.style.overflowY = '';
        };
        function showPrompt(callback) {
            // shows the prompt modal form and handles user input
            showCover();
            let form = document.getElementById('prompt-form');
            let container = document.getElementById('prompt-form-container');
    
            function complete(value) {
                // hides cover and invokes the callback with the user input value
                hideCover();
                container.style.display = 'none';
                document.onkeydown = null;
                callback(value);
            };
            form.onsubmit = function () {
                // handles form submission, trims user input, and completes the prompt
                let value = form.text.value.trim();
                complete(value);
                return false;
            };
            form.cancel.onclick = function () {
                // handles cancellation and completes the prompt with a null value
                complete(null);
            };
            document.onkeydown = function (e) {
                // cancel the prompt
                if (e.key  ===  'Escape') {
                    complete(null);
                };
            };
            // sets up navigation for the form elements
            let lastElem = form.elements[form.elements.length - 1];
            let firstElem = form.elements[0];
            lastElem.onkeydown = function (e) {
                if (e.key  ===  'Tab' && !e.shiftKey) {
                    firstElem.focus();
                    return false;
                }
            };
            firstElem.onkeydown = function (e) {
                if (e.key  ===  'Tab' && e.shiftKey) {
                    lastElem.focus();
                    return false;
                }
            };
            container.style.display = 'block'; // Displays the modal form
        }
        showPrompt(); 
    } //end of displayPrompt()
    //update Message
    function updateMessage(messageId) {
        displayPrompt() 
        document.getElementById('submit_button').onclick = function () {
            const messageText = document.getElementById("messageText").value;
            // validate input 
            if (messageText  ===  '') {
                window.alert("Invalid input. Please provide valid values.");
                return; // Stop execution if validation fails
            }
            const data = {
                message_text: messageText,
                user_id: storedUserId
            };
            const updateMessageCallback = (responseStatus, responseData) => {
                if (responseStatus  ===  500) {
                    window.alert("Server side error. Unable to update message.")
                    return;
                }
                fetchMethod(currentUrl + "/api/message", displayMessageCallback, "GET");
                location.reload();
            };
            fetchMethod(currentUrl + "/api/message/" + messageId, updateMessageCallback, "PUT", data);
        }
    }//end of updateMessage()
    //delete Message
    function deleteMessage(messageId) {
        const deleteMessageCallback = (responseStatus, responseData) => {
            if (responseStatus  ===  500) {
                window.alert("Server side error. Unable to delete message.")
                return;
            } 
            fetchMethod(currentUrl + "/api/message", displayMessageCallback, "GET");
            location.reload();
        };
        fetchMethod(currentUrl + "/api/message/" + messageId, deleteMessageCallback, "DELETE");
    }
});



