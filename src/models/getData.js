import pool from "../config/db.js";

export const getCatagories = async()=>{
    const result = await pool.query("SELECT id, name, color FROM priorities;");
    return result.rows;
}

export const getPriority = async()=>{
    const result = await pool.query("SELECT id, name, color FROM categories;")
    return result.rows;
}