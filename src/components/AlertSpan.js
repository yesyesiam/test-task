import React from 'react';


const AlertSpan = ({valid, untouched, message="некорректное значение"})=>{
    return(
        untouched||valid?null
        :<span className="form-text text-warning">{message}</span>
    )
}

export default AlertSpan;