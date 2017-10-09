<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Panda rescue!</title>
	<link rel="stylesheet" href="css/panda-styles.css">
	
</head>
<body>

<div id="warning">

	<div id="excl-point"><div>!</div></div>
	This page presents a desktop version of the game, which can work unstable on mobile devices. Mobile version is still in development ...
	<button id="close-button" onclick="document.getElementById('warning').style.display = 'none'">Close</button>
</div>

<div id="outer-container">
	<div id="game-container"></div>
</div>

<audio id="bg-audio"></audio>
<audio id="effects-audio"></audio>

<input id="game-input">


<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
<script src="js/lib/konva.min.js"></script>
<script src="js/variables.js"></script>
<script src="js/build/main.bundle.js"></script>


</body>
</html>