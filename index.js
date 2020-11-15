const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());

app.listen(5000, () => {
    console.log("5000 portu dinleniyor...")
})
app.get("/getAllCategory",async(req,res) => {
    try {
        const getAllCategory  = await pool.query("SELECT * FROM express_js.categories");
        res.json(getAllCategory.rows)
    } catch (error) {
        console.log(error.message)
    }
});
app.get("/getCategoryById/:id",async(req,res) => {
    try {
        const {id}  = req.params;
        const category  = await pool.query("SELECT * FROM express_js.categories WHERE id = $1",[id]);
        console.log(id,category);
        res.json(category.rows[0]);
    } catch (error) {
        console.log(error.message)
    }
});
app.post("/addCategory",async(req,res)=> {
    try {
        console.log(req.body);
        const {name,isactive} = req.body;
        const addCategory  = await pool.query("INSERT INTO express_js.categories(name, isactive) VALUES ($1, $2) RETURNING *",
        [name,isactive]);
        res.json({"command":addCategory.command, "rowCount":addCategory.rowCount,"rows":addCategory.rows})
    } catch (error) {
        console.log(error.message)
    }
});

app.post("/updateCategory",async(req,res) => {
    try {
        const {id,name,isactive}  = req.body;
        const category  = await pool.query("UPDATE express_js.categories SET name=$2, isactive=$3 WHERE id = $1",[id,name,isactive]);
        res.json(req.body);
    } catch (error) {
        console.log(error.message)
    }
});