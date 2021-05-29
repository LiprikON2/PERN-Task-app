import React from "react";

const TaskTableHead = ({ centrClass }) => {
    return (
        <thead>
            <tr className="d-flex">
                <th className={`col-1 ${centrClass} flex-shrink-1`} scope="col">
                    №
                </th>
                <th className={`col-1 ${centrClass} flex-shrink-1`} scope="col">
                    Project ID
                </th>
                <th className={`col-1 ${centrClass} flex-grow-1`} scope="col">
                    Project Name
                </th>
                <th className={`col-1 ${centrClass} flex-shrink-1`} scope="col">
                    Task ID
                </th>
                <th className={`col-1 ${centrClass} flex-grow-2`} scope="col">
                    Task Name
                </th>
                <th className={`col-1 ${centrClass} flex-shrink-1`} scope="col">
                    Employee ID
                </th>
                <th className={`col-1 ${centrClass}`} scope="col">
                    Employee Name
                </th>
                <th className={`col-1 ${centrClass}`} scope="col">
                    Start Date
                </th>
                <th className={`col-1 ${centrClass}`} scope="col">
                    Due Date
                </th>
                <th className={`col-1 ${centrClass}`} scope="col">
                    Due Check Date
                </th>
                <th className={`col-1 ${centrClass}`} scope="col">
                    Status
                </th>
                <th className={`col-2 ${centrClass}`} scope="col">
                    Actions
                </th>
            </tr>
        </thead>
    );
};

export default TaskTableHead;
