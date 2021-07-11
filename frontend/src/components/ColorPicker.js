import React, { useState } from 'react'
import './ColorPicker.scss';

function ColorPicker() 
{
    let [ seleted_color, setColor ] = useState("purple");
    let current_style;

    function colorClicked(color)
    {
        setColor(color);
    } 

    
    return (
        <div className="color-picker">
            <div className="container">



                {(() => {
                    if(seleted_color === "purple")
                    {
                        current_style = {"background": "#C7BEFF", "boxShadow": "inset 0px 0px 0px 0.05rem black"};
                    } 
                    else
                    {
                        current_style = {"background": "#C7BEFF", "boxShadow": "none"};
                    }
                })()}
                <div className="purple" style={current_style} onClick={() => colorClicked("purple")}></div>




                {(() => {
                    if(seleted_color === "blue")
                    {
                        current_style = {"background": "#A6DFFF", "boxShadow": "inset 0px 0px 0px 0.05rem black"};
                    } 
                    else
                    {
                        current_style = {"background": "#A6DFFF", "boxShadow": "none"};
                    }
                })()}
                <div className="blue" style={current_style} onClick={() => colorClicked("blue")}></div>



                {(() => {
                    if(seleted_color === "green")
                    {
                        current_style = {"background": "#AEFAD1", "boxShadow": "inset 0px 0px 0px 0.05rem black"};
                    } 
                    else
                    {
                        current_style = {"background": "#AEFAD1", "boxShadow": "none"};
                    }
                })()}
                <div className="green" style={current_style} onClick={() => colorClicked("green")}></div>




                {(() => {
                    if(seleted_color === "orange")
                    {
                        current_style = {"background": "#FFD0BC", "boxShadow": "inset 0px 0px 0px 0.05rem black"};
                    } 
                    else
                    {
                        current_style = {"background": "#FFD0BC", "boxShadow": "none"};
                    }
                })()}
                <div className="orange" style={current_style} onClick={() => colorClicked("orange")}></div>


            </div>
        </div>
    )
}

export default ColorPicker
