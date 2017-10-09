<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Panda rescue!</title>



	<style>
		body, html {
			margin: 0;
			padding: 0;
		}

		#outer-container {	text-align: center;	}
		#game-container {	display: inline-block;}
		#game-input {
			position: absolute;
			top: 0;
			left: -200px;
		}

		#warning { display: none }

		@media (max-width: 800px) {
			#warning {
				display: block;
				margin: 5px 5%;
				width: 90%;
				padding: 15px;
				color: grey;
				font-family: "Verdana";
				font-size: 16px;
				text-align: justify;
				text-align-all: center;
				border: grey 2px dashed;
				border-radius: 4px;
			}
		}
		#excl-point {
			position: relative;
			float: left;
			width: 30px;
			height: 30px;
			margin: 0 10px;
			border: 5px orangered solid;
			border-radius: 5px;
		}
		#excl-point div {
			position: absolute;
			top: -30px;
			left: -20px;
			width: 70px;
			color: black;
			font-size: 65px;
			font-weight: 800;
			text-align: center;
		}

		#close-button{
			display: block;
			margin: 5px auto;
			padding: 10px 15px;
			font: inherit;
			color: grey;
			border: 2px solid grey;
			border-radius: 4px;
			background-color: transparent;
			cursor: pointer;
		}

	</style>
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