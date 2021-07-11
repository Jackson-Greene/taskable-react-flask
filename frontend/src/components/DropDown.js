import React from 'react'
import './DropDown.scss';

function DropDown(props) 
{
    const { options } = props;
    return (
        <div className="drop-down">
            <select>
            {(() => {
                if(options)
                {
                    return (
                        options.map(option => 
                        {
                            return(
                                <option>{option}</option>
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
            </select>
        </div>
    )
}

export default DropDown
