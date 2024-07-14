document.addEventListener("DOMContentLoaded", function () {
    const taskContainer = document.getElementById("taskContainer");
    const createTaskButton = document.getElementById("createTaskButton");
    const deleteAccountButton = document.getElementById("deleteAccountButton");
    const storedUserId = parseInt(localStorage.getItem("userId"));  
    const displayTaskPoints = document.getElementById("taskPoints");
    //display all task
    const displayTaskCallback = (responseStatus, responseData) => {
        const fragment = document.createDocumentFragment();
        responseData.forEach((task) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-12 p-3"; // Stretch across the entire width
            displayItem.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${task.task_id}</h5>
                            <p class="card-text">
                                <strong>Title:</strong> ${task.title}
                            </p>
                            <p class="card-text">
                                <strong>Description:</strong> ${task.description}
                            </p>
                            <p class="card-text">
                                <strong>Points:</strong> ${task.points}
                            </p>
                            <button class="btn btn-primary update-btn" data-task-id="${task.task_id}">Update</button>
                            <button class="btn btn-primary delete-btn" data-task-id="${task.task_id}">Delete</button>
                    </div>
                </div>
            `;
            fragment.appendChild(displayItem);
        });

        // Append all new cards at once
        taskContainer.appendChild(fragment);
        //delete button
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const taskId = this.getAttribute('data-task-id');
                deleteTask(taskId);
            });
        });
        //update button
        const updateButtons = document.querySelectorAll('.update-btn');
        updateButtons.forEach(button => {
            button.addEventListener('click', function () {
                const taskId = this.getAttribute('data-task-id');
                updateTask(taskId);
            });
        });
    }; //end of displayTaskCallback
    fetchMethod(currentUrl + "/api/tasks", displayTaskCallback, "GET");
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
    //create new task
    createTaskButton.addEventListener("click", function (event) {
      event.preventDefault();
          displayPrompt();
            document.getElementById('submit_button').onclick = function () {
                const title = document.getElementById("taskTitle").value;
                const description = document.getElementById("taskDescription").value;
                const points = document.getElementById("pointsTask").value;
                const pointsInt = parseInt(points);
                // Validate input data before making the API call
                if (title === '' || description === '' || isNaN(pointsInt)) {
                    window.alert("Invalid input. Please provide valid values.");
                    return; // Stop execution if validation fails
                }
                const data = {
                    title: title,
                    description: description,
                    points: pointsInt
                };

                const createTaskCallback = (responseStatus, responseData) => {
                    if (responseStatus === 500) {
                        window.alert("Server side error. Unable to create task.");
                        return;
                    }
                };
                // Make sure the endpoint is correct
                fetchMethod(currentUrl + "/api/tasks", createTaskCallback, "POST", data);
            };
    }); //end of createTaskButton event listener
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
    //update task
    function updateTask(taskId) {
        displayPrompt()
        document.getElementById('submit_button').onclick = function () {
            const title = document.getElementById("taskTitle").value;
            const description = document.getElementById("taskDescription").value;
            const points = document.getElementById("pointsTask").value;
            const pointsInt = parseInt(points);
            // Validate input data before making the API call
            if (title === '' || description === '' || isNaN(pointsInt)) {
                window.alert("Invalid input. Please provide valid values.");
                return; // Stop execution if validation fails
            }
            const data = {
                  title: title,
                  description: description,
                  points: pointsInt
            };
            const updateTaskCallback = (responseStatus, responseData) => {
                if (responseStatus === 200){
                    fetchMethod(currentUrl + "/api/tasks", displayTaskCallback, "GET");
                    location.reload()
                } else {
                    window.alert("Server side error. Unable to update task.");
                    return;
                }
          };
          fetchMethod(currentUrl + `/api/tasks/${taskId}`, updateTaskCallback, "PUT", data);
      };
    }; //end of updateTask()
    //delete task
    function deleteTask(taskId) {
        const deleteTaskCallback = (responseStatus, responseData) => {
            if (responseStatus === 204) {
                fetchMethod(currentUrl + "/api/tasks", displayTaskCallback, "GET");
                location.reload()
            } else {
                window.alert("Server side error. Unable to delete task.");
                return;
            }
        };
      fetchMethod(currentUrl + `/api/tasks/${taskId}`, deleteTaskCallback, "DELETE");
    }; //end of deleteTask()
});



