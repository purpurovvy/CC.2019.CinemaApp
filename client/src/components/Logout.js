import React from "react";
import { Redirect } from "react-router-dom";

const Logout = () => {
    localStorage.removeItem('userJWT');
    return <Redirect to="/" />;
}

export default Logout;
