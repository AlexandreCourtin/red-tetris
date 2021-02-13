import React, {useState} from "react";

function LoginPage() {

	const [htmlName, setHtmlName] = useState('');
	const [htmlRoom, setHtmlRoom] = useState('');

	function login() {
		window.location = '#' + htmlRoom + '[' + htmlName + ']';
		window.location.reload({forcedReload: true});
	}

	return (
		<div>
			<p>Name :</p>
			<input type="text" value={htmlName} onInput={e => setHtmlName(e.target.value)}/>
			<p>Room :</p>
			<input type="text" value={htmlRoom} onInput={e => setHtmlRoom(e.target.value)}/>
			<br /><br />
			<button onClick={login}>go</button>
		</div>
	);
}

export default LoginPage;