const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Routes

// Create task
app.post("/create_task", async (request, response) => {
    try {
        console.log(request.body);
        const { prj_id, start_date, due_date, due_check_date, status, emp_id, description } =
            request.body;

        const createTask = await pool.query(`
            INSERT INTO todo_v1.task(
                task_id,
                prj_id,
                start_date,
                due_date,
                due_check_date,
                status,
                emp_id,
                description)
            VALUES (
                (SELECT (MAX(task_id) + 1) FROM todo_v1.task),
                ${prj_id},
                '${start_date}',
                '${due_date}',
                '${due_check_date}',
                '${status}',
                ${emp_id},
                '${description}'
            )
            RETURNING *
        `);
        response.status(200).send({
            message: `Successfully created new task!`,
        });
    } catch (err) {
        console.log(err.message);

        response.status(400).send({
            message: "ERROR: " + err.message,
        });
    }
});

// Get list of all tasks
app.get("/tasks", async (request, response) => {
    try {
        const listTask = await pool.query(`SELECT * FROM todo_v1.task_project_emploee`);
        response.status(200).send(listTask.rows);
    } catch (err) {
        console.log(err.message);

        response.status(400).send({
            message: "ERROR: " + err.message,
        });
    }
});

// Get specific task
app.get("/tasks/:task_id", async (request, response) => {
    try {
        const { task_id } = request.params;
        const task = await pool.query(`SELECT * FROM todo_v1.task WHERE task_id = ${task_id}`);
        response.status(200).send(task.rows);
    } catch (err) {
        console.log(err.message);

        response.status(400).send({
            message: "ERROR: " + err.message,
        });
    }
});

// Update specific task
app.put("/tasks/:task_id", async (request, response) => {
    try {
        const { task_id } = request.params;
        const {
            prj_id,
            start_date,
            due_date,
            due_check_date,
            status,
            emp_id,
            description,
            failed_to_complete_reason,
        } = request.body;

        const updateTask = await pool.query(`
            UPDATE todo_v1.task
            SET 
                prj_id=${prj_id},
                start_date='${start_date}',
                due_date='${due_date}',
                due_check_date='${due_check_date}',
                status='${status}',
                emp_id=${emp_id},
                description='${description}',
                failed_to_complete_reason='${failed_to_complete_reason}'
            WHERE task_id=${task_id}
            RETURNING *
        `);
        response.status(200).send({
            message: `Successfully updated task ${task_id}!`,
        });
    } catch (err) {
        console.log(err.message);

        response.status(400).send({
            message: "ERROR: " + err.message,
        });
    }
});

// Delete specific task
app.delete("/tasks/:task_id", async (request, response) => {
    try {
        const { task_id } = request.params;
        const deleteTask = await pool.query(`DELETE FROM todo_v1.task WHERE task_id=${task_id}`);
        response.status(200).send({
            message: `Successfully deleted task ${task_id}!`,
        });
    } catch (err) {
        console.log(err.message);

        response.status(400).send({
            message: "ERROR: " + err.message,
        });
    }
});

app.listen(81, () => {
    console.log("Started server at port 81");
});
