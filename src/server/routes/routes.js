const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ response: "I am alive" }).status(200);
});

router.get('/update', (req, res) => {
	const playerName = req.query.playerName;
	const roomName = req.query.roomName;
    res.send({ response: "updating" }).status(200);
});

module.exports = router;