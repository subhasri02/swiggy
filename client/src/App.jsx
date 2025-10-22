import React from 'react';
import './styles/App.css';
import Hello from './components/Hello';

const App = () => {
    return (
        <div className="App">
            <h1>Welcome to the Node-React App</h1>
            <Hello message="Hello, World!" />
        </div>
    );
};

export default App;