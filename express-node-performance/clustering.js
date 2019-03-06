process.env.UV_THREADPOOL_SIZE = 1; // Every child has one thread per cluster child
const cluster = require('cluster')
console.log(cluster.isMaster); // This property determines whether it's a cluster manager or worker instance

// Is the file being executed in master mode?
if (cluster.isMaster) {
	// Cause index.js to be executed *again* but in slave/child mode
	cluster.fork(); // This goes back to index.js and executes it again
	cluster.fork();
	// cluster.fork();
	// cluster.fork();
	// cluster.fork();
	// cluster.fork();
	// cluster.fork();
	// cluster.fork();

} else {
	// A child, will act like a server
	// Do nothing else
	const express = require('express');
	const app = express();
	const crypto = require('crypto');

	app.get('/', (req, res) => {
		crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
			res.send('hi there');
		});
	});

	app.get('/fast', (req, res) => {
		res.send('This was fast!');
	});

	app.listen(3000);
}

// This is running a single thread.
// Without using node cluster, trying to load different endpoints when the root endpoint takes ~5 seconds will delay the loading of /fast because it's single threaded
/*
const express = require('express');
const app = express();

function doWork(duration) {
	const start = Date.now();

	while(Date.now() - start < duration) {}
}

app.get('/', (req, res) => {
	doWork(5000);
	res.send('hi there');
});

app.get('/fast', (req, res) => {
	res.send('This was fast!');
});

app.listen(3000);
*/