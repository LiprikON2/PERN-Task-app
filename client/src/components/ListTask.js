import React, { useState, useEffect, Fragment, useRef } from "react";

import EditTask from "./EditTask";
import ViewTask from "./ViewTask";
import TaskTableHead from "./TaskTableHead";

const ListTask = () => {
    const [tasks, setTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(0);

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }
    const prevEditTaskId = usePrevious(editTaskId);

    const getTasks = async () => {
        try {
            const response = await fetch("http://localhost:81/tasks");
            const jsonData = await response.json();

            setTasks(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    // Converts posgre's datetime to yyyy-MM-dd
    function formatDate(date) {
        const d = new Date(date);
        let month = "" + (d.getMonth() + 1);
        let day = "" + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }
    const handleEditTask = async (task_id) => {
        try {
            if (task_id !== editTaskId) {
                setEditTaskId(task_id);
            } else {
                getTasks();
                setEditTaskId(0);
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    const getTaskByTaskId = (task_id) => {
        for (const task of tasks) {
            if (task.task_id === task_id) {
                return task;
            }
        }
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const task = getTaskByTaskId(prevEditTaskId);
            delete task.task_id;
            delete task.prj_name;
            delete task.emp_name;

            const response = await fetch(`http://localhost:81/tasks/${prevEditTaskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });
            getTasks();
        } catch (err) {
            console.log(err.message);
        }
    };

    const centrClass = "d-flex align-items-center justify-content-center";

    return (
        <>
            <h1 className="text-center mt-5 mb-5">List of all tasks</h1>
            <form onSubmit={onSubmitForm}>
                <table className="table table-striped table-hover text-center">
                    <TaskTableHead centrClass={centrClass} />
                    <tbody>
                        {tasks.map((task, index) => (
                            <Fragment key={task.task_id}>
                                <ViewTask
                                    handleEditTask={handleEditTask}
                                    formatDate={formatDate}
                                    tasks={tasks}
                                    setTasks={setTasks}
                                    editTaskId={editTaskId}
                                    task={task}
                                    index={index}
                                    centrClass={centrClass}
                                    key={task.task_id + "a"}
                                />
                                {/* The row is toggled beteween view or edit by clicking Edit button  */}
                                <EditTask
                                    handleEditTask={handleEditTask}
                                    formatDate={formatDate}
                                    tasks={tasks}
                                    setTasks={setTasks}
                                    editTaskId={editTaskId}
                                    task={task}
                                    index={index}
                                    centrClass={centrClass}
                                    key={task.task_id + "b"}
                                />
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>
        </>
    );
};

export default ListTask;
