// console.log("login.js loaded");

document.getElementById('loginBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
   
   const phonenumber = document.getElementById('ph-num').value;
    const pin = document.getElementById('pin-num').value;
    console.log(pin,phonenumber);

    if (phonenumber === '1' && pin === '2') {
        console.log("Login successful");
        window.location.href = "home.html"; // Redirect to dashboard page
    }
    else {
        alert("Login failed");
    }

})
