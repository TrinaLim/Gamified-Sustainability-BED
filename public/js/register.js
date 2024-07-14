document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    var myInput = document.getElementById("password");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    var specialChars = document.getElementById("specialChars");
    
    // When the user starts to type something inside the password field
    myInput.onkeyup = function() {
      // Validate lowercase letters
      var lowerCaseLetters = /[a-z]/g;
      if(myInput.value.match(lowerCaseLetters)) {  
        letter.classList.remove("invalid");
        letter.classList.add("valid");
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }
      // Validate capital letters
      var upperCaseLetters = /[A-Z]/g;
      if(myInput.value.match(upperCaseLetters)) {  
        capital.classList.remove("invalid");
        capital.classList.add("valid");
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }
      // Validate numbers
      var numbers = /[0-9]/g;
      if(myInput.value.match(numbers)) {  
        number.classList.remove("invalid");
        number.classList.add("valid");
      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
      }
      // Validate length
      if(myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
      }
      //Validate special characters
      var specialCharacters = /[!@#$%^&*(),.?":{}|<>]/
      if (myInput.value.match(specialCharacters)) {
        specialChars.classList.remove("invalid");
        specialChars.classList.add("valid");
      } else {
        specialChars.classList.remove("valid");
        specialChars.classList.add("invalid");
      }
    }    
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        function isPasswordValid() {
            // check the validity of each condition
            const lowercaseValid = letter.classList.contains("valid");
            const uppercaseValid = capital.classList.contains("valid");
            const numberValid = number.classList.contains("valid");
            const lengthValid = length.classList.contains("valid");
            // return true if all conditions are met
            return lowercaseValid && uppercaseValid && numberValid && lengthValid;
        }
        if (isPasswordValid() && password === confirmPassword) {
            warningCard.classList.add("d-none");

            const data = {
                username: username,
                email: email,
                password: password,
            };

            const callback = (responseStatus, responseData) => {
                if (responseStatus === 409) {
                    window.alert("Username or email is already associated with another user.")
                    return;
                }
                if (responseStatus === 200) {
                    // Check if signup was successful
                    if (responseData.token) {
                        // Store the token in local storage
                        localStorage.setItem("token", responseData.token);
                        window.alert('Registration successful, please proceed to login.')
                        // Redirect or perform further actions for logged-in user
                        window.location.href = "login.html";
                }
                } else {
                    warningCard.classList.remove("d-none");
                    warningText.innerText = responseData.message;
                }
            };
            // Perform signup request
            fetchMethod(currentUrl + "/api/register", callback, "POST", data);
            // Reset the form fields
            signupForm.reset();
        } else {
            // Passwords do not match, handle error
            warningCard.classList.remove("d-none");
            warningText.innerText = "Passwords do not match.";
        }
      });
  });