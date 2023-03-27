import io from 'socket.io-client';
// socket.connect();
const socket = io('http://localhost:8080', {
    autoConnect: true
});

export default function socketReducer(state = socket, action) {
    return state;
}