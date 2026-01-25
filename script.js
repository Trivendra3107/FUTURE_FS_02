let orders = JSON.parse(localStorage.getItem("orders")) || [];
const tableBody = document.getElementById("tableBody");

function addOrder() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const item = document.getElementById("items").value;

  if (!name || !email || !item) {
    alert("All fields are required.");
    return;
  }

  const order = {
    id: Date.now(),
    name,
    email,
    item,
    status: "Pending"
  };

  orders.push(order);
  saveAndRender();
  clearForm();
}

function renderOrders() {
  tableBody.innerHTML = "";

  orders.forEach(order => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${order.name}</td>
      <td>${order.email}</td>
      <td>${order.item}</td>
      <td>
        <select onchange="updateStatus(${order.id}, this.value)">
          <option ${order.status === "Pending" ? "selected" : ""}>Pending</option>
          <option ${order.status === "Served" ? "selected" : ""}>Served</option>
          <option ${order.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
        </select>
      </td>
      <td>
        <button class="action-btn delete" onclick="deleteOrder(${order.id})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function updateStatus(id, status) {
  orders = orders.map(o => o.id === id ? { ...o, status } : o);
  saveAndRender();
}

function deleteOrder(id) {
  if (!confirm("Delete this order?")) return;
  orders = orders.filter(o => o.id !== id);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("items").value = "";
}

renderOrders();
