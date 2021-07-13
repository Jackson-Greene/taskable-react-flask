import React from 'react'
import './TaskList.scss';
import Task from "./Task";

function TaskList(props) 
{
    const { tasks } = props;
    
    return (
        <div className="task-list">
            {(() => {
                if(tasks)
                {
                    return (
                        tasks.map(task => 
                        {
                            const { name, priority, duration, stage, color } = task;
                            return(
                                <Task className="task" name={name} priority={priority} duration={duration} stage={stage} color={color}></Task>
                            );
                        })
                    );
                } 
                else
                {
                    return (
                        <div>Loading</div>
                    );
                }
            })()}
        </div>
    )
}

export default TaskList
