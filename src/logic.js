import { appState, createProject, createTodo, saveToDisk } from "./state.js";

export function projects(name) {
    const existingProject = appState.projects.find(p => p.name === name);
    
    if (existingProject) {
        return existingProject; 
    }
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
    
    saveToDisk(); 
    return newTodo;
}
