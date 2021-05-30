import "./App.css";

import CreateTask from "./components/CreateTask";
import ListTask from "./components/ListTask";

function App() {
    return (
        <>
            <div className="container">
                <CreateTask></CreateTask>
                <hr className="mt-5" />
                <ListTask></ListTask>
            </div>
        </>
    );
}

export default App;
