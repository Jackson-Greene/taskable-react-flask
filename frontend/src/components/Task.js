import React from 'react'
import './Task.scss';

function Task(props) 
{
    const { name, priority, duration, stage, color } = props;
    let stage_image_path = "";
    switch(stage) 
    {
        case "Upcoming":
            stage_image_path = "./images/icon-upcoming.svg";
            break;
        
        case "In Progress":
            stage_image_path = "./images/icon-in-progress.svg";
            break;

        case "Completed":
            stage_image_path = "./images/icon-completed.svg";
            break;
    
        default:
            stage_image_path = "./images/icon-upcoming.svg";
            break;
    }

    let primary_color = "";
    let secondary_color = "";
    switch(color) 
    {
        case "purple":
            primary_color = "#C7BEFF";
            secondary_color = "#A799FF"; 
            break;
        
        case "blue":
            primary_color = "#A6DFFF";
            secondary_color = "#71C9FA"; 
            break;

        case "green":
            primary_color = "#AEFAD1";
            secondary_color = "#41D134"; 
            break;

        case "orange":
            primary_color = "#FFD0BC";
            secondary_color = "#FF976A"; 
            break;
    
        default:
            primary_color = "#C7BEFF";
            secondary_color = "#A799FF"; 
            break;
    }

    return (
        <div className="task">
            <div className="container">
                <div className="stage-icon-container" style={{"background": secondary_color}}>
                    <img src={stage_image_path} alt="stage of task" />
                </div>
                <div className="task-container" style={{"background": primary_color}}>
                    <div className="left-col">
                        <p>{priority}</p>
                        <h2>{name}</h2>
                    </div>
                    <div className="right-col">
                        <p>{duration}</p>
                        <div className="stage-text-container" style={{"background": secondary_color}}>
                            {stage}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task