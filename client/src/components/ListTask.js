import React, { useState, useEffect, Fragment } from 'react'

import EditTask from './EditTask'


const ListTask = () => {
    const [tasks, setTasks] = useState([])
    const [editTaskId, setEditTaskId] = useState(0)


    const getTasks = async () => {
        try {
            const response = await fetch('http://localhost:81/tasks')
            const jsonData = await response.json()

            setTasks(jsonData)
            
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getTasks()
    }, [])

    // const datetimeToDate = (datetime) => {
    //     const date = new Date(datetime)
    //     return date.toLocaleDateString("ru-RU")
    // } 

    function datetimeToDate(date) {
        const d = new Date(date)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        const year = d.getFullYear()
    
        if (month.length < 2) 
            month = '0' + month
        if (day.length < 2) 
            day = '0' + day
    
        return [year, month, day].join('-');
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
            if (task_id !== editTaskId) {
                setEditTaskId(task_id)
            }
            else {
                setEditTaskId(0)
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    const onSubmitForm = async (e) => {
        e.preventDefault()
    }

    const centrClass = 'd-flex align-items-center justify-content-center'

    const updateTask = (task_id, key, value) => {
        let updatedTasksList = tasks.map(task => {
            if (task.task_id === task_id) {
                task[key] = value
            }
            return task
        })
        setTasks(updatedTasksList)
    }
       

    return (
        <>
            <h1 className='text-center mt-5 mb-5'>List of all tasks</h1>
            <form onSubmit={onSubmitForm}>
                <table className='table table-striped table-hover text-center'>
                    <thead>
                        <tr className='d-flex'>
                            <th className={`col-1 ${centrClass} flex-shrink-1`} scope='col'>№</th>
                            <th className={`col-1 ${centrClass} flex-shrink-1`} scope='col'>Project ID</th>
                            <th className={`col-1 ${centrClass} flex-grow-1`} scope='col'>Project Name</th>
                            <th className={`col-1 ${centrClass} flex-shrink-1`} scope='col'>Task ID</th>
                            <th className={`col-1 ${centrClass} flex-grow-2`} scope='col'>Task Name</th>
                            <th className={`col-1 ${centrClass} flex-shrink-1`} scope='col'>Employee ID</th>
                            <th className={`col-1 ${centrClass}`} scope='col'>Employee Name</th>
                            <th className={`col-1 ${centrClass}`} scope='col'>Start Date</th>
                            <th className={`col-1 ${centrClass}`} scope='col'>Due Date</th>
                            <th className={`col-1 ${centrClass}`} scope='col'>Due Check Date</th>
                            <th className={`col-1 ${centrClass}`} scope='col'>Status</th>
                            <th className='col-2' scope='col'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <>
                                <tr className={`d-flex ${editTaskId !== task.task_id ? "" : "d-none"}`} key={task.task_id}>
                                    <th className={`col-1 ${centrClass} flex-shrink-1`} scope='row'>{index + 1}</th>
                                    <td className={`col-1 ${centrClass} flex-shrink-1`}>{task.prj_id}</td>
                                    <td className={`col-1 ${centrClass} flex-grow-1`}>{task.prj_name}</td>
                                    <td className={`col-1 ${centrClass} flex-shrink-1`}>{task.task_id}</td>
                                    <td className={`col-1 ${centrClass} flex-grow-2`}>{task.description}</td>
                                    <td className={`col-1 ${centrClass} flex-shrink-1`}>{task.emp_id}</td>
                                    <td className={`col-1 ${centrClass}`}>{task.emp_name}</td>
                                    <td className={`col-1 ${centrClass}`}>{datetimeToDate(task.start_date)}</td>
                                    <td className={`col-1 ${centrClass}`}>{datetimeToDate(task.due_date)}</td>
                                    <td className={`col-1 ${centrClass}`}>{datetimeToDate(task.due_check_date)}</td>
                                    <td className={`col-1 ${centrClass}`}>{task.status}</td>
                                    <td className={`col-2 ${centrClass}`}>
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
                                {/* The row is toggled beteween view or edit by clicking Edit button */}
                                <tr className={`d-flex ${editTaskId === task.task_id ? "" : "d-none"}`} key={task.task_id + 'b'}>
                                    <th className={`col-1 ${centrClass} flex-shrink-1`} scope='row'>{index + 1}</th>
                                    <td className={`col-1 ${centrClass} flex-shrink-1`}><input type="number" className='form-control' value={task.prj_id}/></td>
                                    <td className={`col-1 ${centrClass} flex-grow-1`}><input type="text" className='form-control' value={task.prj_name}/></td>
                                    <td className={`col-1 ${centrClass} flex-shrink-1`}><input type="number" className='form-control' value={task.task_id}/></td>
                                    <td className={`col-1 ${centrClass} flex-grow-2`}><input type="text" className='form-control' value={task.description}/></td>
                                    <td className={`col-1 ${centrClass} flex-shrink-1`}><input type="number" className='form-control' value={task.emp_id}/></td>
                                    <td className={`col-1 ${centrClass}`}><input type="text" className='form-control' value={task.emp_name} onChange={e => updateTask(task.task_id, 'emp_name', e.target.value)}/></td>
                                    <td className={`col-1 ${centrClass}`}><input type="date" className='form-control' value={datetimeToDate(task.start_date)}/></td>
                                    <td className={`col-1 ${centrClass}`}><input type="date" className='form-control' value={datetimeToDate(task.due_date)}/></td>
                                    <td className={`col-1 ${centrClass}`}><input type="date" className='form-control' value={datetimeToDate(task.due_check_date)}/></td>
                                    <td className={`col-1 ${centrClass}`}>
                                        <select value={task.status} onChange="">
                                            <option value="In work">In work</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Paused">Paused</option>
                                            <option value="Canceled">Canceled</option>
                                            <option value="Processing">Processing</option>
                                        </select>
                                    </td>
                                    <td className={`col-2 ${centrClass}`}>
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