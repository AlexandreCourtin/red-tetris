const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});

router.get('/addPlayer', (req, res) => {
	const playerName = req.query.playerName;
	const roomName = req.query.roomName;
	console.log('new player name: ' + playerName + ' in room name: ' + roomName);
    res.send({ response: "new player arrived" }).status(200);
});

module.exports = router;