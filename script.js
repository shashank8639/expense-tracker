let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let salary = 0;
function updateUI() {
    const balanceEl = document.getElementById("balance");
    const incomeEl = document.getElementById("income");
    const expensesEl = document.getElementById("expenses");
    const transactionsEl = document.getElementById("transactions");

    let balance = 0, income = salary, expenses = 0;
    transactionsEl.innerHTML = "";

    transactions.forEach((transaction, index) => {
        balance += transaction.amount;
        if (transaction.amount > 0) expenses += transaction.amount;
        else income += Math.abs(transaction.amount);

        balance = income - expenses; 
        const li = document.createElement("li");
        li.classList.add(transaction.amount > 0 ? "income" : "expense");
        li.innerHTML = `<div class="desc">
        <div>${transaction.desc} </div>
        <div>₹${transaction.amount}</div>
        <div>  <button onclick="deleteTransaction(${index})">❌</button> </div>
        </div>`;
        transactionsEl.appendChild(li);
    });

    balanceEl.textContent = balance;
    incomeEl.textContent = income;
    expensesEl.textContent = expenses;

    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
    const desc = document.getElementById("desc").value;
    const amount = Number(document.getElementById("amount").value);

    if (desc === "" || isNaN(amount)) {
        alert("Please enter valid details");
        return;
    }

    document.querySelector('.before-expenses').classList.add('after-expenses');
    document.querySelector('.container').style.width = '800px';
    document.querySelector('.trans-block').style.display = 'block';

    transactions.push({ desc, amount });
    updateUI();
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}

function addIncome(){
    const amount = Number(document.getElementById("salary-amt").value);

    salary = amount;
    if (desc === "" || isNaN(amount)) {
        alert("Please enter valid details");
        return;
    }
    document.querySelector('.salary-block').classList.add('after-salary');
    document.querySelector('.trans-block').style.display = 'block';

    document.getElementById('income').textContent = amount;   
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    if(transactions.length)
        document.querySelector('.before-expenses').classList.remove('after-expenses');
    updateUI();
}

updateUI();
