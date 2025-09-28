import pool from "../config/db.js";

export function CreateTaskData(
    title, 
    description, 
    categoryId, 
    priorityId, 
    deadline, 
    subtasks = [], 
    tags = "", 
    hasReminders = false
) {
    this.title = title;
    this.description = description;
    this.categoryId = categoryId;
    this.priorityId = priorityId;
    this.deadline = deadline;
    this.subtasks = subtasks;
    this.tags = tags;
    this.hasReminders = hasReminders;
}

export function SubTask(id, title, isDone = false) {
    this.id = id;
    this.title = title;
    this.isDone = isDone;
}

export const getAllToDos = async()=>{
    const result = await pool.query("SELECT * FROM tasks");
    return result.rows;
};



export const createTask = async (taskData) => {
    const query = `
        CALL create_new_task($1,$2,$3,$4,$5,$6)
    `;
    
    const values = [
        taskData.title,
        taskData.description,
        taskData.categoryId|| NULL,
        taskData.priorityId|| NULL,
        taskData.deadline,
        JSON.stringify(taskData.subtasks), // Convert array to JSON string
    ];
    
    try {
        await pool.query(query, values);
        const getTaskQuery = `Select * from tasks where title = $1`;
        const result = await pool.query(getTaskQuery,[taskData.title]);
        return result.rows[0]; // Return the created task
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};


export const deleteToDos = async (id) => {
    const value=[id];
    const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING * ", value);
    if (result.rowCount === 0) {
        throw new Error(`Task with id ${id} not found or already deleted`);
    }
    return result.rows[0];
};

