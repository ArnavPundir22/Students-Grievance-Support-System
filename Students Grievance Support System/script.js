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
        // Check user role and redirect accordingly
        if (storedUser.role === "student") {
            alert("Login successful! Redirecting to the complaint page...");
            window.location.href = "complaint.html";
        } else if (storedUser.role === "admin" || storedUser.role === "committee") {
            alert("Login successful! Redirecting to the admin panel...");
            window.location.href = "adminPanel.html";
        } else {
            alert("Unknown user role. Please contact support.");
        }
    } else {
        alert("Invalid credentials!");
    }
}

// Submit Complaint
function submitComplaint() {
    const category = document.getElementById("complaint-category");
    const subcategory = document.getElementById("complaint-subcategory");
    const description = document.getElementById("complaint-description");
    
    if (!category.value || !subcategory.value || !description.value) {
        alert("Please fill in all fields");
        return;
    }

    const complaint = { 
        category: category.value, 
        subcategory: subcategory.value, 
        description: description.value 
    };

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints.push(complaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));   

    alert("Complaint submitted successfully!");

    // Clear form fields after submission
    category.value = "";
    subcategory.value = "";
    description.value = "";
}
async function fetchComplaints() {
    try {
        const token = localStorage.getItem("token"); // Get the admin's token
        if (!token) {
            alert("You must be logged in as an admin to view complaints");
            window.location.href = "login.html";
            return;
        }

        // Fetch complaints from the backend
        const response = await fetch("http://localhost:5000/api/complaints", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        });

        const complaints = await response.json();

        if (!response.ok) {
            alert("Error fetching complaints: " + (complaints.message || "Unknown error"));
            return;
        }

        const tableBody = document.getElementById("complaint-table-body");
        tableBody.innerHTML = ""; // Clear existing rows

        // Populate the table with complaints
        complaints.forEach(complaint => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${complaint._id}</td>
                <td>${complaint.category}</td>
                <td>${complaint.subCategory}</td>
                <td>${complaint.description}</td>
                <td>${complaint.studentId ? complaint.studentId.name : "Unknown"}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching complaints:", error);
        alert("Failed to fetch complaints. Please try again later.");
    }
    function filterComplaints() {
        const filterValue = document.getElementById("category-filter").value;
        const rows = document.querySelectorAll("#complaint-table-body tr");
        rows.forEach(row => {
            const category = row.children[1].textContent;
            if (filterValue === "all" || category === filterValue) {
                row.style.display = "table-row";
            } else {
                row.style.display = "none";
            }
        });
    }

    document.addEventListener("DOMContentLoaded", fetchComplaints);
}

