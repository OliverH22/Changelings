// Import Vue components
import { Navbar } from '../components/navbar.js';
import {
	HomeCharacter,
	Narrative,
	Landing
} from '../components/index-comp.js';

function init_Page() {
	initializeVid();
}

// Initialize Vue components on page (must occur before any other initialization)
new Vue({
	el: "#app",
	components: {
		'narrative': Narrative,
		'home-character': HomeCharacter,
		'navbar': Navbar,
		'landing': Landing
	}
});

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
	window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
		get: function () {
			supportsPassive = true;
		}
	}));
} 
catch (e) {}

// video initialization
function initializeVid() {
	if (screen.width > 700)
		document.querySelector('.bgvid').src = "https://www.youtube.com/embed/TDiqrYMNNfI?autoplay=1&disablekb=1&controls=0&loop=1&playlist=TDiqrYMNNfI&mute=1&modestbranding=1&fs=0&color=red&wmode=transparent";
	else {
		window.addEventListener('resize', function() {
			if (screen.width > 700)
				document.querySelector('.bgvid').src = "https://www.youtube.com/embed/TDiqrYMNNfI?autoplay=1&disablekb=1&controls=0&loop=1&playlist=TDiqrYMNNfI&mute=1&modestbranding=1&fs=0&color=red&wmode=transparent";
		});
	}
}

export { init_Page };