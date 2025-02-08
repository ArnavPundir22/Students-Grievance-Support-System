// script.js

// Register User
function registerUser() {
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const role = document.getElementById("register-role").value;

    if (!name || !email || !password) {
        alert("Please fill in all fields");
        return;
    }

    const user = { name, email, password, role };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful!");
    window.location.href = "login.html";
}

// Login User
function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid credentials!");
    }
}

// Submit Complaint
function submitComplaint() {
    const category = document.getElementById("complaint-category").value;
    const subcategory = document.getElementById("complaint-subcategory").value;
    const description = document.getElementById("complaint-description").value;
    
    if (!category || !subcategory || !description) {
        alert("Please fill in all fields");
        return;
    }
    
    const complaint = { category, subcategory, description };
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints.push(complaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));
    
    alert("Complaint submitted successfully!");
}
