const TeamCarouselTemplate =
`
<section>
	<h2>{{ whatTeam }}</h2>
	<p class="page-indicator">{{ activeRow }} / {{ teamRows }}</p>
	<div :id="whatTeam" class="carousel slide carousel-multi-item" data-ride="carousel" data-interval="false">
		<div class="carousel-inner" role="carousel" aria-orientation="horizontal">
			<div class="carousel-item" v-for="n in teamRows">
				<div class="row">
					<div v-for="teamMember in teamMembers.slice(0+(n*3-3), 3+(n*3-3))" class="col-sm-4 col-text" tabindex="-1">
						
						<img :id="teamMember.modalId" @click="teamMember.showModal = true" role="button" label="team member modal button" tabindex=0 v-on:keyup.enter="teamMember.showModal = true"  @error="imgOnError" class="team-img" :src="teamMember.img" alt="team member photo">
						
						<div class="terms-container">
							<div v-for="term in formatTerms(teamMember.terms)">
								
								<img :src="term.src" :alt="term.alt" :title="term.season"/>
								<span>{{ term.year }}</span>
							</div>
						</div>
						<p>{{ teamMember.name }}</p>
						<p>{{ teamMember.roles }}</p>
					</div>
				</div>
			</div>

			<div class="controls-top" v-if="teamRows > 1">
				<a aria-controls="carousel" aria-label="previous group" aria-role="button" class="carousel-control-prev" :href="whatTeamHref" v-on:click="decrementRow" data-slide="prev"><img src="images/arrow.svg" class="icon-cog left-button" alt="previous group button"></a>
				<a aria-controls="carousel" aria-label="next group" aria-role="button" class="carousel-control-next" :href="whatTeamHref" v-on:click="incrementRow" data-slide="next"><img src="images/arrow.svg" class="icon-cog right-button" alt="next group button"></a>
			</div>
		</div>
	</div>
</section>
`;

const ModalTemplate =
`
<transition name="modal">
	<div class="modal-mask modal">
		<div class="modal-wrapper">
			<div class="modal-container">
				<button type="button" class="close" @click="$emit('close')"><i class="fas fa-times fa exit-button"></i></button>
				<div class="modal-header">
					<slot name="header">
						{{ member.name }}
					</slot>
				</div>

				<div class="modal-body">
					<div class="profile-links">
						<a v-if="member.links !== undefined && member.links.some(e => e.id === 'website')" :href="member.links[member.links.findIndex(e => e.id === 'website')].val"><i class="fas fa-portrait fa-2x"></i></a>
						<a v-if="member.links !== undefined && member.links.some(e => e.id === 'secondary')" :href="member.links[member.links.findIndex(e => e.id === 'secondary')].val"><i class="fas fa-globe fa-2x"></i></a>
						<a v-if="member.links !== undefined && member.links.some(e => e.id === 'github')" :href="member.links[member.links.findIndex(e => e.id === 'github')].val"><i class="fab fa-github fa-2x"></i></a>
						<a v-if="member.links !== undefined && member.links.some(e => e.id === 'linkedin')" :href="member.links[member.links.findIndex(e => e.id === 'linkedin')].val"><i class="fab fa-linkedin fa-2x"></i></a>
						<a v-if="member.links !== undefined && member.links.some(e => e.id === 'email')" :href="'mailto:' + member.links[member.links.findIndex(e => e.id === 'email')].val"><i class="fas fa-envelope fa-2x"></i></a>
					</div>
					<div class="utility-info">
						<p>Teams: <span v-for="team in teamsFormatted">{{ team }}</span></p>
						<p>Terms: <span v-for="term in termsFormatted">{{ term }}</span></p>
						<p>Roles: <span>{{ member.roles }}</span></p>
					</div>
					<slot name="body">
						<div class="body-text">{{ member.bio }}</div>
					</slot>
				</div>
			</div>
		</div>
	</div>
</transition>
`;

const TeamCarousel = {
	template: TeamCarouselTemplate,
	props: {
		teamMembers: Array, // the team members that are displayed in the carousel; an array which holds member information
		whatTeam: String // the associated team (used for selectors, header, etc.)
	},
	computed: {
		/**
		 * Used for splitting teams into groups of three
		 * @returns {number} The total number of "rows" in the carousel
		 */
		teamRows() {
			return Math.floor((this.teamMembers.length - 1) / 3) + 1;
		},
		/**
		 * Formats the team into an id selector for use in the carousel buttons
		 * @returns {string} The id selector like so: #team
		 */
		whatTeamHref() {
			return '#' + this.whatTeam;
		}
	},
	data: function () {
		return {
			activeRow: 1 // the carousel indicator is 'reactive' (in Vue terms) to this variable
		};
	},
	methods: {
		/**
		 * Increments the active teamRow for use in the carousel indicator
		 */
		incrementRow: function() {
			this.activeRow += 1;
			if (this.activeRow > this.teamRows)
				this.activeRow = 1;
		},
		/**
		 * Decrements the active teamRow for use in the carousel indicator
		 */
		decrementRow: function() {
			this.activeRow -= 1;
			if (this.activeRow < 1)
				this.activeRow = this.teamRows;
		},
		/**
		 * Used for replacing photoless members with a default image (img src is member's username.jpg; this results in an error if they did not upload a photo)
		 * @param   {object}  e The img's event object that called this method
		 * @returns {boolean} true
		 */
		imgOnError: function(e) {
			e.target.onerror = "";
			e.target.src = "images/nophoto.svg";
			return true;
		},
		/**
		 * Formats terms into a readable format
		 * @param   {Array.<string>} terms The terms as stored in team member data
		 * @returns {Array.<object>} The terms formatted, split into image src and year
		 */
		formatTerms: function(terms) {
			let formatted = [];
			terms.forEach( t => {
				let str = t.replace(/[^0-9](?=[0-9])/g, '$& ').split(' ');
				formatted.push({
					src: "images/season-" + str[0].toLowerCase() + ".svg",
					alt: "seasonal indicator " + str[0],
					season: str[0],
					year: str[1]
				});
			});
			return formatted;
		}
	}
}

const Modal = ("modal", {
	template: ModalTemplate,
	props: {
		member: Object // object containing the member's information
	},
	computed: {
		/**
		 * Formats the terms into a page-friendly set of strings
		 * @returns {Array.<string>} The terms formatted with commas and spaces
		 */
		termsFormatted() {
			let i = 0; // use i to treat Array.map as a for loop
			return this.member.terms.map(e => {
				// Add a space between the term and year: regex matches phrase and returns $&
				let str = e.replace(/[^0-9](?=[0-9])/g, '$& ');
				// When there's more than one term and we're not on the last term, add a comma and space after the term
				if (this.member.terms.length > 1 && i < this.member.terms.length - 1)
					str += ', ';
				// Iterate and return to map
				i++;
				return str;
			});
		},
		/**
		 * Formats the teams into a page-friendly set of strings
		 * @returns {Array.<string>} [[Description]]
		 */
		teamsFormatted() {
			let i = 0; // use i to treat Array.map as a for loop
			return this.member.teams.map(e => {
				// The team elements themselves don't need any extra formatting, so we'll just use e
				let str = e;
				// When there's more than one term and we're not on the last term, add a comma and space after the term
				if (this.member.teams.length > 1 && i < this.member.teams.length - 1)
					str += ', ';
				// Iterate and return to map
				i++;
				return str;
			});
		}
	},
	data: {
		showModal: false // track whether the modal is shown or not
	}
});

export {
	TeamCarousel,
	Modal
};