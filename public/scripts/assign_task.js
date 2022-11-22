const fromElement = document.getElementById("from-select-box");
const forElement = document.getElementById("for-select-box");

const assignTaskForm = document.getElementById("assign-task-form");
assignTaskForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const url = this.getAttribute("action");
  const forValue = forElement.value;
  const fromValue = fromElement.value;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      for: forValue,
      from: fromValue,
    }),
  });
  const data = await response.json();
  const messageElement = document.getElementById("message");
  messageElement.innerText = data.message;
  messageElement.style.display = "block";
  if (data.error) {
    messageElement.style.color = "red";
    messageElement.style.border = "1px solid red";
  } else {
    messageElement.style.color = "green";
    messageElement.style.border = "1px solid green";
  }

  setTimeout(() => {
    message.style.display = "none";
  }, 2500);
});
