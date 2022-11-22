const deleteButtons = document.getElementsByClassName("delete-emp-btn");

for (let i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener("click", async function (e) {
    e.preventDefault();
    const url = this.getAttribute("href");
    const response = await fetch(url, { method: "DELETE" });
    const data = await response.json();
    const employee = document.getElementById(data.id);
    employee.remove();
  });
}
