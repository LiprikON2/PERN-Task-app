import React, { useState } from 'react'

const CreateTask = () => {
    const [ prj_id, setPrjId ] = useState('')
    const [ start_date, setStartDate ] = useState('')
    const [ due_date, setDueDate ] = useState('')
    const [ due_check_date, setDueCheckDate ] = useState('')
    const [ emp_id, setEmpId ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ status, setStatus ] = useState('In work')

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = {
                prj_id,
                start_date,
                due_date,
                due_check_date,
                status,
                emp_id,
                description
            }
            const response = await fetch('http://localhost:81/create_task', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            window.location = '/'
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <h1 className='text-center mt-5 mb-5'>Create a task</h1>
            <form onSubmit={onSubmitForm}>

                <label className='form-label'>Project</label>
                <input 
                    type='number' 
                    className='form-control mb-3' 
                    value={prj_id}
                    onChange={e => setPrjId(e.target.value)}  
                />
                <label className='form-label'>Start Date</label>
                <input 
                    type='date'
                    data-date-format="dd/mm/yyyy"
                    className='form-control mb-3' 
                    value={start_date}
                    onChange={e => setStartDate(e.target.value)}  
                />
                <label className='form-label'>Due Date</label>
                <input 
                    type='date' 
                    className='form-control mb-3' 
                    value={due_date}
                    onChange={e => setDueDate(e.target.value)}  
                />
                <label className='form-label'>Due Check Date</label>
                <input 
                    type='date' 
                    className='form-control mb-3' 
                    value={due_check_date}
                    onChange={e => setDueCheckDate(e.target.value)}  
                />
                <label className='form-label'>Employee</label>
                <input 
                    type='number' 
                    className='form-control mb-3' 
                    value={emp_id}
                    onChange={e => setEmpId(e.target.value)}  
                />
                <label className='form-label'>Description</label>
                <input 
                    type='text' 
                    className='form-control mb-3' 
                    value={description}
                    onChange={e => setDescription(e.target.value)}  
                />
                
                <label className='form-label d-block'>Status</label>
                <select className='d-block mb-3' value={status} onChange={e => setStatus(e.target.value)}>
                    <option value="In work">In work</option>
                    <option value="Completed">Completed</option>
                    <option value="Paused">Paused</option>
                    <option value="Canceled">Canceled</option>
                    <option value="Processing">Processing</option>
                </select>
                
                <button className='btn btn-success mt-5'>Add</button>
            </form>
        </>
    )
}

export default CreateTask