import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
            <Link className="navbar-brand" to={"/"}>CodersCamp Cinema</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={"/protected"}>Protected</Link>
                    </li>
                    {
                        isLoggedIn ?
                            (
                                <Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/my-account"}>My account</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/sign-out"}>Logout</Link>
                                    </li>
                                </Fragment>
                            ) :
                            (
                                <Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/sign-in"}>Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                    </li>
                                </Fragment>
                            )
                    }
                </ul>
            </div>
        </div>
    </nav>);

const withNavbar = (WrappedComponent) => {
    class WithNavbar extends React.Component {
        render() {
            return (
                <Fragment>
                    <Navbar isLoggedIn={!!this.props.token || localStorage.getItem('userJWT')} />
                    <div className="cinemaContainer">
                        <WrappedComponent {...this.props} />
                    </div>
                </Fragment>
            );
        }
    }
    WithNavbar.displayName = `WithNavbar(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithNavbar;
}

export default Navbar;
export { withNavbar };