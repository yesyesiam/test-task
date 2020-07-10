import React from 'react';

const Loader = ({clazz="text-center"})=>{
    return(
        <div className={clazz}>
            <div className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader;