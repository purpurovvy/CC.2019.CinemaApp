import React from 'react';

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const withAuth = (WrappedComponent, fallbackPath) => {
    class WithAuth extends React.Component {
        state = {
            token: null
        }

        requireToken = () => {
            const token = localStorage.getItem('userJWT');
            if (!token) {
                this.props.history.push(fallbackPath);
            } else if (token !== this.state.token) {
                this.setState({ token });
            }
        }

        componentDidMount() {
            this.requireToken();
        }

        componentDidUpdate() {
            this.requireToken();
        }

        render() {
            const token = this.state.token;
            if (token) {
                const props = { ...this.props, token };
                return <WrappedComponent {...props} />;
            }
            else {
                return <div />;
            }
        }
    }
    WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

    return WithAuth
}

export { withAuth };