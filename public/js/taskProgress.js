document.addEventListener("DOMContentLoaded", function () {
    const taskProgressContainer = document.getElementById("taskProgressContainer");
    const completeTaskProgressButton = document.getElementById("completeTaskProgressButton");
    const storedUserId = parseInt(localStorage.getItem("userId"));
    const deleteAccountButton = document.getElementById("deleteAccountButton");
    const displayTaskPoints = document.getElementById("taskPoints")
    //display all taskProgress
    const displayTaskProgressCallback = (responseStatus, responseData) => {
        const fragment = document.createDocumentFragment();
        let filterByUserId = responseData.filter(matchUserId => matchUserId.user_id === storedUserId)
        filterByUserId.forEach((taskProgress, index) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-12 p-3"; // Stretch across the entire width
            displayItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                <h5 class="card-title">${index + 1}</h5>
                    <p class="card-text">
                        <strong>Task Id:</strong> ${taskProgress.task_id}
                    </p>
                    <p class="card-text">
                        <strong>Completion Date:</strong> ${taskProgress.completion_date}
                    </p>
                    <p class="card-text">
                        <strong>Notes:</strong> ${taskProgress.notes}
                    </p>
                    <button class="btn btn-primary update-btn" data-taskProgress-id="${taskProgress.progress_id}">Update</button>
                    <button class="btn btn-primary delete-btn" data-taskProgress-id="${taskProgress.progress_id}">Delete</button>
                </div>
            </div>
        `;
            fragment.appendChild(displayItem);
        });

        // Append all new cards at once
        taskProgressContainer.appendChild(fragment);
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
        //delete button
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const taskProgressId = this.getAttribute('data-taskProgress-id');
                deleteTaskProgress(taskProgressId);
            });
        });
        //update button
        const updateButtons = document.querySelectorAll('.update-btn');
        updateButtons.forEach(button => {
            button.addEventListener('click', function () {
                const taskProgressId = this.getAttribute('data-taskProgress-id');
                updateTaskProgress(taskProgressId);
            });
        });
    };
    fetchMethod(currentUrl + "/api/task_progress", displayTaskProgressCallback, "GET");
    //create new taskProgress
    completeTaskProgressButton.addEventListener("click", function (event) {
        event.preventDefault();
        displayPrompt()
        document.getElementById('submit_button').onclick = function () {
            const taskId = parseInt(document.getElementById("taskId").value);
            const completionDate = document.getElementById("completionDate").value;
            const optionalNotes = document.getElementById("optionalNotes").value;
            const notes = optionalNotes || ''
            // Validate input data before making the API call
            if (taskId === '' || completionDate === '') {
                window.alert("Invalid input. Please provide valid values.");
                return; // Stop execution if validation fails
            }
            const data = {
                user_id: storedUserId,
                task_id: taskId,
                completion_date: completionDate,
                notes: notes
            };

            const completeTaskProgressCallback = (responseStatus, responseData) => {
                if (responseStatus === 404) {
                    window.alert("Task Id not found. Please enter a valid Task Id.");
                    return;
                } else if (responseStatus === 500) {
                    window.alert("Server side error. Unable to complete task.");
                    return;
                }
            };
            // Make sure the endpoint is correct
            fetchMethod(currentUrl + "/api/task_progress", completeTaskProgressCallback, "POST", data);
        };
    });
    //delete Account
    deleteAccountButton.addEventListener("click", function () {
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
            fetchMethod(currentUrl + `/api/users/${storedUserId}`, deleteAccountCallback, "DELETE");
        };
    });
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
                if (e.key === 'Escape') {
                    complete(null);
                };
            };
            // sets up navigation for the form elements
            let lastElem = form.elements[form.elements.length - 1];
            let firstElem = form.elements[0];
            lastElem.onkeydown = function (e) {
                if (e.key === 'Tab' && !e.shiftKey) {
                    firstElem.focus();
                    return false;
                }
            };
            firstElem.onkeydown = function (e) {
                if (e.key === 'Tab' && e.shiftKey) {
                    lastElem.focus();
                    return false;
                }
            };
            container.style.display = 'block'; // Displays the modal form
        }
        showPrompt();
    } //end of displayPrompt()
    //update taskProgress
    function updateTaskProgress(taskProgressId) {
        const taskId = document.getElementById("taskId");
        const completionDate = document.getElementById("completionDate");
        taskId.style.display = "none";
        completionDate.style.display = "none";
        displayPrompt()
        document.getElementById('submit_button').onclick = function () {
            const optionalNotes = document.getElementById("optionalNotes").value;
            const notes = optionalNotes || ''
            // validate input data before making the API call
            if (taskId === '' || completionDate === '') {
                window.alert("Invalid input. Please provide valid values.");
                return; // stop execution if validation fails
            }
            const data = {
                user_id: storedUserId,
                task_id: taskId,
                notes: notes
            };
            const updateTaskProgressCallback = (responseStatus, responseData) => {
                if (responseStatus === 200) {
                    fetchMethod(currentUrl + "/api/task_progress", displayTaskProgressCallback, "GET");
                    location.reload();
                } else {
                    window.alert("Server side error. Unable to update task.");
                    return;
                }
            };
            fetchMethod(currentUrl + `/api/task_progress/${taskProgressId}`, updateTaskProgressCallback, "PUT", data);
        }
    }
    //delete taskProgress
    function deleteTaskProgress(taskProgressId) {
        const deleteTaskProgressCallback = (responseStatus, responseData) => {
            if (responseStatus === 204) {
                fetchMethod(currentUrl + "/api/task_progress", displayTaskProgressCallback, "GET");
                location.reload()
            } else {
                window.alert("Server side error. Unable to delete task.");
                return;
            }
        };
        fetchMethod(currentUrl + "/api/task_progress/" + taskProgressId, deleteTaskProgressCallback, "DELETE");
    }
});



