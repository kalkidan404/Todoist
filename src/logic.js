import { appState, createProject, createTodo, saveToDisk } from "./state.js";

// logic.js
export function projects(name) {
    // 1. CHECK: Does a project with this name already exist?
    const existingProject = appState.projects.find(p => p.name === name);
    
    if (existingProject) {
        return existingProject; // Return the OLD one, don't create a new one
    }

    // 2. ONLY if it doesn't exist, create and push
    let newProject = createProject(name);
    appState.projects.push(newProject);
    saveToDisk(); 
    return newProject;
}


export function createlist(projectid, title, description, priority, dueDate) {
    const project = appState.projects.find(p => p.id === projectid);

    if (!project) return { title, description, completed: false };

    const newTodo = createTodo(title, description, dueDate, priority);
    project.todos.push(newTodo);
    
    saveToDisk(); // <--- Save after adding todo
    return newTodo;
}
