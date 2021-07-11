import React from 'react'
import { Link } from 'react-router-dom';
import './DayCard.scss';


function DayCard(props) 
{
    const { day = "button", day_number = "1", color = "#ffffff", background = "#D8D8D8", outline = false } = props
    let button_style =
    {
        "background": background,
        "boxShadow": outline ? "inset 0px 0px 0px 0.075rem black" : "none",
    };

    let text_style = 
    {
        "color": color,
    }

    return (
        <div className="day-card" onClick={props.onClick}>
            <div className="container" style={button_style}>
                <div className="text" style={text_style}>{day}</div>
                <div className="text" style={text_style}>{day_number}</div>
            </div>
        </div>
    )
}

export default DayCard
