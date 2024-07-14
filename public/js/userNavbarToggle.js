document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logoutButton");
  
    logoutButton.addEventListener("click", function () {
      // Remove the token from local storage and redirect to index.html after user clicks on logout button
      localStorage.removeItem("token");
      localStorage.removeItem("userId")
      window.location.href = "login.html";
    });
  });