// load everything here
import { init_Page as indexInit } from './index.js';
import { init_Page as pressInit } from './press.js';
import {setup as teamInit} from "./team-main.js";


// if there are any other internet cunctions such as fonts or images that need to load, do so here
    // load font
 function createLink(url){
    let head = document.querySelector("head");
    let link = document.createElement("link");
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    head.appendChild(link);
 }

 createLink('https://fonts.googleapis.com/css2?family=Waiting+for+the+Sunrise&display=swap');
 createLink('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');
 createLink('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400;1,700&display=swap');
// once everything has loaded, run the init function to initilize everything
window.onload = () => {
    const location = window.location.href;
    if (location.includes('press')){
        pressInit();
    }
    else if(location.includes('teamboard')) {
        teamInit();
    }
    else {
        indexInit();
        	// video initialization
        if (screen.width > 700)
			document.querySelector('iframe').src = "https://www.youtube.com/embed/TDiqrYMNNfI?autoplay=1&disablekb=1&controls=0&loop=1&playlist=TDiqrYMNNfI&mute=1&modestbranding=1&fs=0&color=red&wmode=transparent";
		else {
			window.addEventListener('resize', function() {
				if (screen.width > 700)
					document.querySelector('iframe').src = "https://www.youtube.com/embed/TDiqrYMNNfI?autoplay=1&disablekb=1&controls=0&loop=1&playlist=TDiqrYMNNfI&mute=1&modestbranding=1&fs=0&color=red&wmode=transparent";
			});
		}
    }
};
