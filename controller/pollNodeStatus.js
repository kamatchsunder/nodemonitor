function pollNodeStatus(req, res, next) {
    const ProcessPoller = require('./processPoller');
    const nodeMon = require('./node-stats');
// Set 1s timeout between polls
// note: this is previous request + processing time + timeout
    let poller = new ProcessPoller(5000);

// Wait till the timeout sent our event to the EventEmitter
    poller.onPoll(() => {
        console.log('triggered');
        nodeMon();
        poller.poll(); // Go for the next poll
    });

// Initial start
    poller.poll();
}

module.exports = pollNodeStatus;