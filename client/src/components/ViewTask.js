import React from "react";

const ViewTask = ({
    editTaskId,
    tasks,
    setTasks,
    task,
    index,
    formatDate,
    handleEditTask,
    setServerResponse,
    centrClass,
}) => {
    const handleDeleteTask = async (task_id) => {
        try {
            const deleteTask = await fetch(`http://localhost:81/tasks/${task_id}`, {
                method: "DELETE",
            });

            const statusCode = await deleteTask.status;
            const jsonData = await deleteTask.json();

            setServerResponse({
                status: statusCode,
                message: jsonData["message"],
            });

            tasks.filter((task) => task.task_id !== task_id);
            // Updates list of table items every time item is deleted
            setTasks(tasks.filter((task) => task.task_id !== task_id));
        } catch (err) {
            console.log(err.message);
        }
    };
    return (
        <tr className={`d-flex ${editTaskId !== task.task_id ? "" : "d-none"}`}>
            <th className={`col-1 ${centrClass} flex-shrink-1`} scope="row">
                {index + 1}
            </th>
            <td className={`col-1 ${centrClass} flex-shrink-1`}>{task.prj_id}</td>
            <td className={`col-1 ${centrClass} flex-grow-1`}>{task.prj_name}</td>
            <td className={`col-1 ${centrClass} flex-shrink-1`}>{task.task_id}</td>
            <td className={`col-1 ${centrClass} flex-grow-2`}>{task.description}</td>
            <td className={`col-1 ${centrClass} flex-shrink-1`}>{task.emp_id}</td>
            <td className={`col-1 ${centrClass}`}>{task.emp_name}</td>
            <td className={`col-1 ${centrClass}`}>{formatDate(task.start_date)}</td>
            <td className={`col-1 ${centrClass}`}>{formatDate(task.due_date)}</td>
            <td className={`col-1 ${centrClass}`}>{formatDate(task.due_check_date)}</td>
            <td className={`col-1 ${centrClass}`}>{task.status}</td>
            <td className={`col-2 ${centrClass}`}>
                <button
                    type="button"
                    className="btn btn-primary m-1"
                    onClick={() => handleEditTask(task.task_id)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={() => handleDeleteTask(task.task_id)}
                    className="btn btn-danger m-1"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default ViewTask;
