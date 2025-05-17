let totalBudget = 0;
let remainingBudget = 0;

function setBudget() {
  const amountInput = document.getElementById('totalAmount');
  totalBudget = parseFloat(amountInput.value);
  remainingBudget = totalBudget;
  updateRemaining();
  amountInput.value = '';
}

function addPurchase() {
  const item = document.getElementById('item').value;
  const price = parseFloat(document.getElementById('price').value);

  if (!item || isNaN(price) || price < 0) {
    alert("Please enter valid item and price.");
    return;
  }

  if (price > remainingBudget) {
    alert("Not enough budget left for this purchase.");
    return;
  }

  remainingBudget -= price;
  updateRemaining();

  const list = document.getElementById('purchaseList');
  const entry = document.createElement('li');
  entry.textContent = `${item}: $${price.toFixed(2)}`;
  list.appendChild(entry);

  document.getElementById('item').value = '';
  document.getElementById('price').value = '';
}

function updateRemaining() {
  document.getElementById('remaining').textContent = remainingBudget.toFixed(2);
}
