// Character Template
const HomeCharacterTemplate = 
`
<div class="characterSection fullscreen d-flex position-relative" :id="char">
	<div>
	<div class="parallax-parent position-absolute">
		<div data-depth="0.10" class="parallax-image">
			<img :alt="bgImageAlt" :src="bgImage" class="position-absolute">
		</div>
	</div>
		</div>
		<div class="info position-absolute d-flex w-100 h-100 align-items-center justify-content-center">
			<section>
			<div>
				<h2>{{ char }}</h2>
				<span class = "center-text" >{{ instructions }}</span>
				<p>{{ charInfo }}</p>
			</div>
			</section>
			<div>
				<a :href="link"><img class="mw-100 mh-100" :alt="imageAlt" :src="imagePath" role="button" tabindex=0 aria-label="exit experience"></a>
			</div>
		</div>
	</div>
</div>
`;
 
// Character object
const HomeCharacter = {
	template: HomeCharacterTemplate,
	props: {
		char: String, // the character's name
		charInfo: String, // character's bio for <p> tag
		imagePath: String, // the path to the character's silhouette
		bgImage: String, // the path to the character's background
		bgImageAlt: String, // the alt text for the character's background
		instructions: String, // Instructions
		link: String // Link to Aurelia's website
	},
	computed: {
		/**
		 * Adds an alt tag to the character silhouette
		 * @returns {string} Alt tag as string with charName added to front
		 */
		imageAlt() {
			return this.char + "'s silhouette";
		}
	}
};

// Prelude template
const NarrativeTemplate = 
`
<div class="w-100 mx-auto d-flex justify-content-center align-items-center position-relative fullscreen" id="about">
	<section class="position-relative">
		<h2>Prelude</h2>
		<p>You receive a peculiar phone call from a mother asking for your help. Her baby has stopped responding and showing emotion, but doctors can't find anything wrong with them. On the phone, she begs for any help she can get to figure out what is wrong with her child. As you get into a cab to the family’s apartment, you wonder if your powers of dream-walking can help this child and the family.</p>
	</section>
</div>
`;

// Prelude object
const Narrative = {
	template: NarrativeTemplate
};

// Landing template
const LandingTemplate =
`
<div class="w-100 mx-auto d-flex align-items-center justify-content-center fullscreen position-relative" id="landing">
	<div class="video-container position-absolute">
		<iframe tabindex="-1" class="bgvid position-absolute w-100 h-100" loading="lazy" src="" frameborder="0" allowfullscreen></iframe>
	</div>
	<section class="position-relative">
		<div>
			<img class="row d-flex justify-content-center" id='logo' src = "./images/logos/ChangelingWebLogo2.svg"></img>
			<p class="row justify-content-center mx-auto">a VR narrative mystery</p>
		</div>
	</section>
	
</div>
`;

// Landing object
const Landing = {
	template: LandingTemplate
};

// Exporting objects
export {
	HomeCharacter,
	Narrative,
	Landing,
};