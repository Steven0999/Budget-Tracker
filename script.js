let totalBudget = 0;
let remainingBudget = 0;
let purchases = [];

window.onload = () => {
  loadData();
};

function setBudget() {
  const amountInput = document.getElementById('totalAmount');
  totalBudget = parseFloat(amountInput.value);
  if (isNaN(totalBudget) || totalBudget < 0) {
    alert("Please enter a valid budget amount.");
    return;
  }
  calculateRemaining();
  amountInput.value = '';
  saveData();
}

function addPurchase() {
  const item = document.getElementById('item').value.trim();
  const description = document.getElementById('description').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const date = document.getElementById('date').value;

  if (!item || isNaN(price) || price < 0 || !date) {
    alert("Please fill in all required fields with valid data.");
    return;
  }

  if (price > remainingBudget) {
    alert("Not enough budget left for this purchase.");
    return;
  }

  purchases.push({ item, description, price, date });
  updateList();
  calculateRemaining();

  document.getElementById('item').value = '';
  document.getElementById('description').value = '';
  document.getElementById('price').value = '';
  document.getElementById('date').value = '';
  saveData();
}

function updateList() {
  const list = document.getElementById('purchaseList');
  list.innerHTML = '';

  purchases.forEach((purchase, index) => {
    const li = document.createElement('li');

    const topLine = document.createElement('div');
    topLine.className = 'top-line';

    const info = document.createElement('span');
    info.textContent = `${purchase.item} - $${purchase.price.toFixed(2)} (${purchase.date})`;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'action-btn';
    editBtn.onclick = () => editPurchase(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'action-btn';
    deleteBtn.onclick = () => deletePurchase(index);

    topLine.appendChild(info);
    topLine.appendChild(editBtn);
    topLine.appendChild(deleteBtn);

    const desc = document.createElement('div');
    desc.className = 'desc';
    desc.textContent = purchase.description;

    li.appendChild(topLine);
    li.appendChild(desc);

    list.appendChild(li);
  });
}

function editPurchase(index) {
  const updatedItem = prompt("Update item name:", purchases[index].item);
  if (updatedItem === null) return;

  const updatedDescription = prompt("Update description:", purchases[index].description);
  if (updatedDescription === null) return;

  const updatedPrice = prompt("Update price:", purchases[index].price);
  if (updatedPrice === null || isNaN(updatedPrice) || updatedPrice < 0) return;

  const updatedDate = prompt("Update date (YYYY-MM-DD):", purchases[index].date);
  if (updatedDate === null || !/^\d{4}-\d{2}-\d{2}$/.test(updatedDate)) return;

  purchases[index] = {
    item: updatedItem.trim(),
    description: updatedDescription.trim(),
    price: parseFloat(updatedPrice),
    date: updatedDate
  };

  calculateRemaining();
  updateList();
  saveData();
}

function deletePurchase(index) {
  purchases.splice(index, 1);
  calculateRemaining();
  updateList();
  saveData();
}

function calculateRemaining() {
  const spent = purchases.reduce((sum, p) => sum + p.price, 0);
  remainingBudget = totalBudget - spent;
  document.getElementById('remaining').textContent = remainingBudget.toFixed(2);
}

function saveData() {
  const data = {
    totalBudget,
    purchases
  };
  localStorage.setItem("spendingData", JSON.stringify(data));
}

function loadData() {
  const saved = localStorage.getItem("spendingData");
  if (saved) {
    const data = JSON.parse(saved);
    totalBudget = data.totalBudget || 0;
    purchases = data.purchases || [];
    calculateRemaining();
    updateList();
  }
}

function clearData() {
  if (confirm("Are you sure you want to clear all data?")) {
    totalBudget = 0;
    remainingBudget = 0;
    purchases = [];
    document.getElementById('purchaseList').innerHTML = '';
    document.getElementById('remaining').textContent = '0';
    localStorage.removeItem("spendingData");
  }
}
