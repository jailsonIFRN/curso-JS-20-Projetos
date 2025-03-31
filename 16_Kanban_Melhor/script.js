document.querySelector("#add-task-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const input = this.querySelector("input");
    const taskText = input.value.trim();
    if (taskText !== "") {
      const task = document.createElement("li");
      task.draggable = true;
      task.innerHTML = `${taskText} <button class='edit'>Editar</button> <button class='delete'>Excluir</button>`;
      document.querySelector("#todo").appendChild(task);
      input.value = "";
      addTaskEvents(task);
    }
  });
  function addTaskEvents(task) {
    task.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text/html", task.outerHTML);
      task.classList.add("dragging");
    });
    task.addEventListener("dragend", function () {
      task.classList.remove("dragging");
    });
    task.querySelector(".delete").addEventListener("click", function () {
      task.remove();
    });
    task.querySelector(".edit").addEventListener("click", function () {
      const newText = prompt("Editar tarefa:", task.childNodes[0].textContent.trim());
      if (newText !== null && newText.trim() !== "") {
        task.childNodes[0].textContent = newText + " ";
      }
    });
  }
  document.querySelectorAll(".tasks").forEach(column => {
    column.addEventListener("dragover", function (event) {
      event.preventDefault();
    });
    column.addEventListener("drop", function (event) {
      event.preventDefault();
      const taskHTML = event.dataTransfer.getData("text/html");
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = taskHTML;
      const task = tempDiv.firstElementChild;
      addTaskEvents(task);
      column.appendChild(task);
    });
  });