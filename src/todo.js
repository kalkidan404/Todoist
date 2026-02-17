import { projects, createlist } from "./logic.js";
import { appState, saveToDisk } from "./state.js"; // Import the saved data

document.addEventListener("DOMContentLoaded", () => {
  const projectname = document.querySelector(".projecti");
  const adder = document.querySelector(".adder");
  const projectList = document.querySelector(".project-list");
  const addProjectUI = (projectObj) => {
    const li = document.createElement("li");
    li.dataset.id = projectObj.id;

    const titleEl = document.createElement("h3");
    titleEl.textContent = projectObj.name;
    li.appendChild(titleEl);
    const todoTitle = document.createElement("input");
    todoTitle.placeholder = "Todo Title";
    const todoDesc = document.createElement("input");
    todoDesc.placeholder = "Todo Description";
    const todoPriority = document.createElement("input");
    todoPriority.type = "color";
    const todoDate = document.createElement("input");
    todoDate.type = "date";
    const addTodoBtn = document.createElement("button");
    addTodoBtn.textContent = "Add Todo";
    const todoContainer = document.createElement("div");
   const removeprojectBtn = document.createElement("button");
    removeprojectBtn.textContent = "dlt project";
    li.append(todoDate, todoTitle, todoDesc, todoPriority, addTodoBtn, todoContainer, removeprojectBtn);
    projectList.appendChild(li);
removeprojectBtn.addEventListener("click", () => {
    const index = appState.projects.findIndex(p => p.id === projectObj.id);
    if (index !== -1) {
        appState.projects.splice(index, 1);
        li.remove();
    }saveToDisk(appState);
  });
    addTodoBtn.addEventListener("click", () => {
      const t = todoTitle.value.trim();
      const d = todoDesc.value.trim();
      const p = todoPriority.value;
      const dueDate = todoDate.value || undefined;
      if (!t) return;

      const newTodo = createlist(projectObj.id, t, d, p, dueDate);
      addTodoUI(newTodo, todoContainer,projectObj); 
      
      todoTitle.value = "";
      todoDesc.value = "";
    });
    if (projectObj.todos) {
        projectObj.todos.forEach(todo => addTodoUI(todo, todoContainer,projectObj));
    }
  };
  const addTodoUI = (todoObj, container,projectObj) => {
    const todoItem = document.createElement("div");
    const dlt = document.createElement("button");
    dlt.textContent = "dlt";

    const dot = document.createElement("span");
    dot.style.width = "12px";
    dot.style.height = "12px";
    dot.style.borderRadius = "50%";
    dot.style.backgroundColor = todoObj.priority;
    dot.style.display = "inline-block";
    dot.style.marginRight = "8px";

    const text = document.createElement("span");
    text.innerHTML = `<strong>${todoObj.title}</strong> <br> ${todoObj.description}-${todoObj.dueDate}`;
    if (todoObj.completed) text.style.textDecoration = "line-through";

    todoItem.append(dot, text,dlt);
    container.appendChild(todoItem);
    dlt.addEventListener("click", () => { 
       const index = projectObj.todos.indexOf(todoObj);
        if (index !== -1) {
            projectObj.todos.splice(index, 1); 
            saveToDisk(appState); 
            todoItem.remove();}});
    dot.addEventListener("click", () => {
        todoObj.completed = !todoObj.completed;
        text.style.textDecoration = todoObj.completed ? "line-through" : "none";
        saveToDisk(appState);
    });
  };
   projectList.innerHTML = ""; 
  appState.projects.forEach(proj => addProjectUI(proj));
   adder.addEventListener("click", (e) => {
    e.preventDefault();
    const name = projectname.value.trim();
    if (!name) return;
    const newProject = projects(name); 
    addProjectUI(newProject);
    
    projectname.value = "";
  });
});
