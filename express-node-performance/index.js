const express = require('express');
const crypto = require('crypto');
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