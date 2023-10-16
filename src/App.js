import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRegistrationForm from './components/UserRegistrationForm';
import { Toaster } from 'react-hot-toast';
import UserList from './components/UserList';
import Footer from './components/Footer';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Toaster duration={2000} />
                <ErrorBoundary>
                    <Routes>
                        <Route path="/register" element={<UserRegistrationForm />} />
                        <Route path="/all-users" element={<UserList />} />
                        <Route path="/" element={<UserRegistrationForm />} />
                    </Routes>
                </ErrorBoundary>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
