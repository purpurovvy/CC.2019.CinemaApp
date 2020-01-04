import React from 'react';
import { Redirect } from "react-router-dom";

const withAuth = (WrappedComponent, fallbackAction) => {
    class WithAuth extends React.Component {
        render() {
            const token = localStorage.getItem('userJWT');
            if (token) {
                const props = { ...this.props, token };
                return <WrappedComponent {...props} />;
            }
            else {
                return fallbackAction();
            }
        }
    }
    WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithAuth
}

const withAuthDefault = (WrappedComponent) => withAuth(WrappedComponent, () => <Redirect to="/sign-in" />);

export { withAuth, withAuthDefault };