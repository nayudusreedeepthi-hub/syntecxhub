let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

checkLogin();

function login() {

    let username =
        document.getElementById("username").value;

    let password =
        document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Enter Username and Password");
        return;
    }

    localStorage.setItem("user", username);

    showTracker();
}

function logout() {

    localStorage.removeItem("user");

    location.reload();
}

function checkLogin() {

    if (localStorage.getItem("user")) {
        showTracker();
    }
}

function showTracker() {

    document.getElementById("loginBox")
        .classList.add("hidden");

    document.getElementById("expenseBox")
        .classList.remove("hidden");

    document.getElementById("user").innerText =
        localStorage.getItem("user");

    displayExpenses();
}

function addExpense() {

    let name =
        document.getElementById("expenseName").value;

    let amount =
        document.getElementById("expenseAmount").value;

    if (name === "" || amount === "") {
        return;
    }

    expenses.push({
        id: Date.now(),
        name: name,
        amount: Number(amount)
    });

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    displayExpenses();

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}

function deleteExpense(id) {

    expenses = expenses.filter(
        item => item.id !== id
    );

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    displayExpenses();
}

function displayExpenses() {

    let list =
        document.getElementById("expenseList");

    let total = 0;

    list.innerHTML = "";

    expenses.forEach(item => {

        total += item.amount;

        list.innerHTML += `
        <li>
            ${item.name} - ₹${item.amount}
            <button onclick="deleteExpense(${item.id})">
            Delete
            </button>
        </li>`;
    });

    document.getElementById("total").innerText =
        total;
}