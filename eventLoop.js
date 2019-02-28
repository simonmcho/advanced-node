// node myFile.js

// These "collections" are created as soon as program is executed
// As soon as new timers, tasks, or operations are recorded from myFile.running, it gets added 

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = []; // Tasks running in the threadpool

myFile.runContents();

// As soon as node js code is executed, we immediately enter the event loop.

// Below is a helper function to determine what's true
// NodeJS does 3 separate checks to dtermine continue or not

function shouldContinue(){
	// 1st check: Any pending async apis: setTImeout, setInterval, setImmediate
	// 2nd check: Any pending OS tasks. Eg. An http server listening to some incoming request on a port
	// 3rd check: Any long running/pending operations still being executed in the program
	// Eg. A function call inside the `fs` module

	return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

// Below is a representation of the event loop with a while loop

// Every single time a while loop runs, it is called a 'tick'
while(shouldContinue()) {
	// 1) Node looks at pendingTimers and see if any functions are ready to be called	
	// 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks

	// 3) Node pauses execution. Continue when...
	// - A new pendingOSTask is done
	// - A new pendingOperation is done
	// - A timer is about to complete
	
	// 4) Look at pendingTimers, call any setImmediate functions

	// 5) Handle any 'close' events. eg. fileStream.on('close, ()=> //some code);
}
