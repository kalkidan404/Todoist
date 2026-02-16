const STORAGE_KEY = 'todo_app_data';

// LOAD: Initialize projects from storage OR empty array if first time
const savedData = localStorage.getItem(STORAGE_KEY);
export const appState = {
  projects: savedData ? JSON.parse(savedData) : []
};

// SAVE: Helper to push current state to storage
export const saveToDisk = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.projects));
};

export const createProject = (name) => {
    return {
        id: Date.now().toString(),
        name: name,
        todos: []
    };
};

export const createTodo = (title, description, dueDate, priority) => {
    return {
        title,
        description,
        dueDate: dueDate || new Date().toISOString().split('T')[0],
        priority,
        completed: false 
    };
};
