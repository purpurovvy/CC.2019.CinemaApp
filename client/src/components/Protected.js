import React from 'react';

const Protected = (props) => {
    return <div className="mainContent">Hello {props.token}</div>
}


export default Protected;