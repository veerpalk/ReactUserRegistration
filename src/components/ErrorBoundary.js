import React from 'react';
import ErrorPage from './ErrorPage';

class ErrorBoundary extends React.Component {
    state = { hasError: false, errorMessage: '' };

    static getDerivedStateFromError(error) {
        return { hasError: true, errorMessage: error.message };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    componentDidMount() {
        window.addEventListener('error', this.handleUncaughtError);
    }

    componentWillUnmount() {
        window.removeEventListener('error', this.handleUncaughtError);
    }

    handleUncaughtError = (event) => {
        this.setState({ hasError: true, errorMessage: event.message });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorPage errorMessage={this.state.errorMessage} />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
