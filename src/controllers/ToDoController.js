import {createTask,getAllToDos,deleteToDos} from "../models/ToDoModels.js";
import { getCatagories,getPriority } from "../models/getData.js";
//Standardized response function
const handleResponse = (res,status,message,data)=>{
    res.status(status).json({
        status,
        message,
        data,
    });
}

function CreateTaskData(
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

function SubTask(id, title, isDone = false) {
    this.id = id;
    this.title = title;
    this.isDone = isDone;
}


export const createToDo = async (req,res,next)=>{  
    try{
        const newTodo = await createTask(req.body);
        handleResponse(res,201,"Create successfully",newTodo)
    }   
    catch(err){
       next(err); 
    }
}

export const AllToDo = async (req,res,next)=>{
    try{
        const allTodo = await getAllToDos();
        handleResponse(res,201,"successfully",allTodo)
    }   
    catch(err){
       next(err); 
    }
}

export const Allcatagories = async(req,res,next)=>{
    try{
        const catagory = await getCatagories();
        handleResponse(res,201,"successfully",catagory)
    }
    catch(err){
        next(err);
    }
}

export const Allpriority = async(req,res,next)=>{
    try{
        const priority = await getPriority();
        handleResponse(res,201,"successfully",priority)
    }
    catch(err){
        next(err);
    }
}

export const deleteToDo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTask = await deleteToDos(id);
        handleResponse(res, 200, "Task deleted successfully", deletedTask);
    } catch (err) {
        next(err);
    }
};