import React, { useState } from "react";

const EditTask = ({
    handleEditTask,
    formatDate,
    tasks,
    setTasks,
    editTaskId,
    task,
    index,
    centrClass,
}) => {
    const updateTask = (task_id, key, value) => {
        const updatedTasks = tasks.map((task) => {
            if (task.task_id === task_id) {
                task[key] = value;
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <tr className={`d-flex ${editTaskId === task.task_id ? "" : "d-none"}`}>
            <th className={`col-1 ${centrClass} flex-shrink-1`} scope="row">
                {index + 1}
            </th>
            <td className={`col-1 ${centrClass} flex-shrink-1`}>
                <input
                    type="number"
                    className="form-control"
                    value={task.prj_id}
                    onChange={(e) => updateTask(task.task_id, "prj_id", e.target.value)}
                />
            </td>
            <td className={`col-1 ${centrClass} flex-grow-1`}>{task.prj_name}</td>
            <td className={`col-1 ${centrClass} flex-shrink-1`}>{task.task_id}</td>
            <td className={`col-1 ${centrClass} flex-grow-2`}>
                <input
                    type="text"
                    className="form-control"
                    value={task.description}
                    onChange={(e) => updateTask(task.task_id, "description", e.target.value)}
                />
            </td>
            <td className={`col-1 ${centrClass} flex-shrink-1`}>
                <input
                    type="number"
                    className="form-control"
                    value={task.emp_id}
                    onChange={(e) => updateTask(task.task_id, "emp_id", e.target.value)}
                />
            </td>
            <td className={`col-1 ${centrClass}`}>{task.emp_name}</td>
            <td className={`col-1 ${centrClass}`}>
                <input
                    type="date"
                    className="form-control"
                    value={formatDate(task.start_date)}
                    onChange={(e) => updateTask(task.task_id, "start_date", e.target.value)}
                />
            </td>
            <td className={`col-1 ${centrClass}`}>
                <input
                    type="date"
                    className="form-control"
                    value={formatDate(task.due_date)}
                    onChange={(e) => updateTask(task.task_id, "due_date", e.target.value)}
                />
            </td>
            <td className={`col-1 ${centrClass}`}>
                <input
                    type="date"
                    className="form-control"
                    value={formatDate(task.due_check_date)}
                    onChange={(e) => updateTask(task.task_id, "due_check_date", e.target.value)}
                />
            </td>
            <td className={`col-1 ${centrClass}`}>
                <select
                    className="form-control"
                    value={task.status}
                    onChange={(e) => updateTask(task.task_id, "status", e.target.value)}
                >
                    <option value="In work">In work</option>
                    <option value="Completed">Completed</option>
                    <option value="Paused">Paused</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Processing">Processing</option>
                </select>
            </td>
            <td className={`col-2 ${centrClass}`}>
                <button
                    type="reset"
                    className="btn btn-primary m-1"
                    onClick={() => handleEditTask(task.task_id)}
                >
                    Cancel
                </button>

                <button
                    className="btn btn-success m-1"
                    onClick={() => handleEditTask(task.task_id)}
                    type="submit"
                >
                    Save
                </button>
            </td>
        </tr>
    );
};

export default EditTask;
