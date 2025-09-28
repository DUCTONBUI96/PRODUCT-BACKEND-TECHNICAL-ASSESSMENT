import express from "express";
import { AllToDo, createToDo,Allcatagories,Allpriority,deleteToDo } from "../controllers/ToDoController.js";

const router = express.Router();

//GET
router.get("/todos",AllToDo);
router.get("/todos/categories",Allcatagories);
router.get("/todos/priorities",Allpriority);

//POST
router.post("/todos/createTask",createToDo);

// DELETE
router.delete("/todos/deleteTask/:id",deleteToDo);

export default router;