import { Fragment } from 'react'
import './App.css'

import CreateTask from './components/CreateTask'
import ListTask from './components/ListTask'


function App() {
    return (
        <Fragment>
            <div className='container'>
                <CreateTask></CreateTask>
                <ListTask></ListTask>
            </div>
        </Fragment>
        )
    }
    
export default App
    