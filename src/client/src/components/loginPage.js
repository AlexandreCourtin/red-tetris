import React, {useState} from "react";

function LoginPage() {

	const [htmlName, setHtmlName] = useState('');
	const [htmlRoom, setHtmlRoom] = useState('');

	function login() {
		window.location = '#' + htmlRoom + '[' + htmlName + ']';
		window.location.reload({forcedReload: true});
	}

	return (
		<div className="login-page-div">
			<p className="login-page-title">RED TETRIS</p>
			<p className="login-page-text">Name :</p>
			<input className="login-page-input" type="text" value={htmlName} onInput={e => setHtmlName(e.target.value)}/>
			<p className="login-page-text">Room :</p>
			<input className="login-page-input" type="text" value={htmlRoom} onInput={e => setHtmlRoom(e.target.value)}/>
			<br /><br />
			<div className="login-page-text"><button className="login-page-button" onClick={login}>GO</button></div>
		</div>
	);
}

export default LoginPage;