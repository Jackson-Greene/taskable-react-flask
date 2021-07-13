import React, { useState } from 'react'
import './InputField.scss';

function InputField(props) 
{
    const [input, setInput] = useState('');

    function updateInput(e)
    {
        (props.valueCallback)(e.target.value);
        setInput(e.target.value);
    }

    return (
        <div className="input-field">
            <input value={input} onInput={e => updateInput(e)}></input>
        </div>
    )
}

export default InputField
