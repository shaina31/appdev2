const EventEmitter = require('events');
const emitter = new EventEmitter();
const data = { name: 'John Doe', age: 25 };


emitter.on('start', () => {    
    console.log('Application Started!');
});  

emitter.on('data', (data) => {
    console.log('Data received:', data);
});
emitter.emit('start');
emitter.emit('data', data);
emitter.on('error', (error) => {
    console.log('Error occurred:', error);
});
emitter.emit('error', 'Sample error message');



