import logo from './logo.svg';
import './App.css';

import io from 'socket.io-client'
import { isUnauthorizedError }  from '@thream/socketio-jwt'

function App() {

  const socket = io('http://localhost:9000', {
    auth: { token: `Bearer demo` }
  })

  // Handling token expiration
  socket.on('connect_error', (error) => {
    if (isUnauthorizedError(error)) {
      console.log('User token has expired')
    }
  })

  // Listening to events
  socket.on('messages', (data) => {
    console.log(data)
  })


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
