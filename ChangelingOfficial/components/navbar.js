// Navbar template
const NavbarTemplate =
`
<div class="navbar-nav inactive" id="navbar">
	<div class="hamburger-button"><img src="images/navbar/hamburger-button.svg" alt="menu button"/></div>
	<nav>
		<a class="navbar-changeling" href="./">
			<img id='logo-img' src = "./images/logos/ChangelingWebLogo2.svg"></img>
		</a>
		<div class="dropdown">
			<button class="dropbtn">Characters</button>
			<div class="dropdown-content">
				<a href="./#mainchar">Aurelia Walker</a>
				<a href="./#mother">Angela Summers</a>
				<a href="./#father">Dylan Huang</a>
				<a href="./#son">Douglas Summers-Huang</a>
				<a href="./#daughter">Kirsten Summers-Huang</a>
				<a href="./#infant">Tobi Summers-Huang</a>
			</div>
		</div>
		<a href="teamboard">Team</a>
		<a href="press">Presskit</a>
		<a download href="https://drive.google.com/file/d/1XMKTBehjYNRZtkxcXNHcPehv9aUESyo3/view?usp=sharing" class="downloadButton">DOWNLOAD</a>
	</nav>
	<div class="hamburger-close"><img src="images/navbar/hamburger-close.svg" alt="close button"/></div>
</div>
`;

// Navbar object
const Navbar = {
	template: NavbarTemplate,
	mounted() {
		/**
		 * Handler for the hamburger button which toggles the mobile nav view
		 */
		function onNavClicked() {
			if (nav.classList.contains('inactive')) {
				nav.classList.add('active');
				nav.classList.remove('inactive');
			}
			else {
				nav.classList.add('inactive');
				nav.classList.remove('active');
			}
		}
		let nav = document.querySelector('#navbar');
		document.querySelector('.hamburger-button').addEventListener('click', onNavClicked);
		document.querySelector('.hamburger-close').addEventListener('click', onNavClicked);
	}
};
	
// Export navbar
export { Navbar };