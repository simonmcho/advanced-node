const express = require('express');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
	// Create worker instance
	const worker = new Worker(function() { // Not using arrow function because of reference to this worker object
		this.onmessage = function () {

			let counter = 0;

			while (counter < 1e9) {
				counter++;
			}

			postMessage(counter); // We can pass in data to the worker back in our app
		}
	});
	
	// Declare funcationality when receiving message from worker
	worker.onmessage = function(message) {
		console.log(message); // Webworker threads receives message in an object format.
		console.log(message.data);
		res.send('' + message.data);
	}

	// Post Message to send to worker
	worker.postMessage();

});

app.get('/fast', (req, res) => {
	res.send('This was fast!');
})

app.listen(3000);