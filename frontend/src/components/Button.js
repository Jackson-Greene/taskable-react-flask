import React from 'react'
import { Link } from 'react-router-dom';
import './Button.scss';


function Button(props) 
{
    const { text = "button", color = "#ffffff", background = "#000000", outline = true} = props
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
        <div className="button" onClick={props.onClick}>
            <div className="container" style={button_style}>
                <div className="text" style={text_style}>{text}</div>
            </div>
        </div>
    )
}

export default Button
