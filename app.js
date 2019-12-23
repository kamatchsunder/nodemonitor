const http = require('http');

const express = require('express');
const pollNodeStatus = require('./controller/pollNodeStatus');

const app = express();

const router = express.Router();
app.use('/api/', router);
router.get('/poll_node_status', pollNodeStatus);

const server = http.createServer();

server.listen(3050);
pollNodeStatus();