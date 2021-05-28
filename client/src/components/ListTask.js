import React, { useState, useEffect, Fragment } from 'react'

import EditTask from './EditTask'


const ListTask = () => {
    const [tasks, setTasks] = useState([])
    const [editTaskId, setEditTaskId] = useState(0)


    const getTasks = async () => {
        try {
            const response = await fetch('http://localhost:81/tasks')
            const jsonData = await response.json()

            console.log(jsonData)
            setTasks(jsonData)
            
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    const datetimeToDate = (datetime) => {
        const date = new Date(datetime)
        return date.toLocaleDateString("ru-RU")
    } 
    
    const handleDeleteTask = async (task_id) => {
        try {
            const deleteTask = await fetch(`http://localhost:81/tasks/${task_id}`, {
                method: 'DELETE',
            })
            tasks.filter(task => {
                if (task.task_id !== task_id) {
                    return true
                }
                return false
                
            })
            // Updates list of table items every time item is deleted
            setTasks(tasks.filter(task => task.task_id !== task_id))
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleEditTask = async (task_id) => {
        try {
            // setTasks(tasks.filter(task => task.task_id !== task_id))
            if (task_id !== editTaskId) {
                setEditTaskId(task_id)
            }
            else {
                setEditTaskId(0)
            }

            // if (x.innerHTML === "Hello") {
            //     x.innerHTML = "Swapped text!";
            // } else {
            //     x.innerHTML = "Hello";
            // }
            
        } catch (err) {
            console.log(err.message)
        }
    }
    const onSubmitForm = async (e) => {
        e.preventDefault()
    }

    const centerStyle = 'd-flex align-items-center justify-content-center'

    return (
        <>
            <h1 className='text-center mt-5 mb-5'>List of all tasks</h1>
            <form onSubmit={onSubmitForm}>
                <table className='table table-striped table-hover text-center'>
                    <thead>
                        <tr className='d-flex'>
                            <th className={`col-1 ${centerStyle} flex-shrink-1`} scope='col'>№</th>
                            <th className={`col-1 ${centerStyle} flex-shrink-1`} scope='col'>Project ID</th>
                            <th className={`col-1 ${centerStyle} flex-grow-1`} scope='col'>Project Name</th>
                            <th className={`col-1 ${centerStyle} flex-shrink-1`} scope='col'>Task ID</th>
                            <th className={`col-1 ${centerStyle} flex-grow-2`} scope='col'>Task Name</th>
                            <th className={`col-1 ${centerStyle} flex-shrink-1`} scope='col'>Employee ID</th>
                            <th className={`col-1 ${centerStyle}`} scope='col'>Employee Name</th>
                            <th className={`col-1 ${centerStyle}`} scope='col'>Start Date</th>
                            <th className={`col-1 ${centerStyle}`} scope='col'>Due Date</th>
                            <th className={`col-1 ${centerStyle}`} scope='col'>Due Check Date</th>
                            <th className={`col-1 ${centerStyle}`} scope='col'>Status</th>
                            <th className='col-2' scope='col'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <>
                                <tr className={`d-flex ${editTaskId !== task.task_id ? "" : "d-none"}`} key={task.task_id}>
                                    <th className={`col-1 ${centerStyle} flex-shrink-1`} scope='row'>{index + 1}</th>
                                    <td className={`col-1 ${centerStyle} flex-shrink-1`}>{task.prj_id}</td>
                                    <td className={`col-1 ${centerStyle} flex-grow-1`}>{task.prj_name}</td>
                                    <td className={`col-1 ${centerStyle} flex-shrink-1`}>{task.task_id}</td>
                                    <td className={`col-1 ${centerStyle} flex-grow-2`}>{task.description}</td>
                                    <td className={`col-1 ${centerStyle} flex-shrink-1`}>{task.emp_id}</td>
                                    <td className={`col-1 ${centerStyle}`}>{task.emp_name}</td>
                                    <td className={`col-1 ${centerStyle}`}>{datetimeToDate(task.start_date)}</td>
                                    <td className={`col-1 ${centerStyle}`}>{datetimeToDate(task.due_date)}</td>
                                    <td className={`col-1 ${centerStyle}`}>{datetimeToDate(task.due_check_date)}</td>
                                    <td className={`col-1 ${centerStyle}`}>{task.status}</td>
                                    <td className={`col-2 ${centerStyle}`}>
                                        <button 
                                            className='btn btn-primary m-1'
                                            onClick={() => handleEditTask(task.task_id)}
                                        >
                                            Edit
                                        </button>
                                        {/* <EditTask></EditTask> */}
                                        <button 
                                            onClick={() => handleDeleteTask(task.task_id)}
                                            className='btn btn-danger m-1'
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    

                                </tr>
                                <tr className={`d-flex ${editTaskId === task.task_id ? "" : "d-none"}`} key={task.task_id + 'b'}>
                                    <th className={`col-1 ${centerStyle} flex-shrink-1`} scope='row'>{index + 1}</th>
                                    <td className={`col-1 ${centerStyle} flex-shrink-1`}><input type="number" className='form-control' value={task.prj_id}/></td>
                                    <td className={`col-1 ${centerStyle} flex-grow-1`}><input type="text" className='form-control' value={task.prj_name}/></td>
                                    <td className={`col-1 ${centerStyle} flex-shrink-1`}><input type="number" className='form-control' value={task.task_id}/></td>
                                    <td className={`col-1 ${centerStyle} flex-grow-2`}><input type="text" className='form-control' value={task.description}/></td>
                                    <td className={`col-1 ${centerStyle} flex-shrink-1`}><input type="number" className='form-control' value={task.emp_id}/></td>
                                    <td className={`col-1 ${centerStyle}`}><input type="text" className='form-control' value={task.emp_name}/></td>
                                    <td className={`col-1 ${centerStyle}`}><input type="text" className='form-control' value={task.start_date}/></td>
                                    <td className={`col-1 ${centerStyle}`}><input type="text" className='form-control' value={task.due_date}/></td>
                                    <td className={`col-1 ${centerStyle}`}><input type="text" className='form-control' value={task.due_check_date}/></td>
                                    <td className={`col-1 ${centerStyle}`}>
                                        <select className='d-block mb-3' value={task.status} onChange="">
                                            <option value="In work">In work</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Paused">Paused</option>
                                            <option value="Canceled">Canceled</option>
                                            <option value="Processing">Processing</option>
                                        </select>
                                    </td>
                                    <td className={`col-2 ${centerStyle}`}>
                                        <button 
                                            className='btn btn-primary m-1'
                                            onClick={() => handleEditTask(task.task_id)}
                                        >
                                            Cancel
                                        </button>

                                        <button 
                                            className='btn btn-success m-1'
                                            onClick={() => handleEditTask(task.task_id)}
                                            type="submit"
                                        >
                                            Save
                                        </button>
                                    </td>
                                    
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </form>
        </>
    )
}

export default ListTask