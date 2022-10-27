import {Navbar} from '../components/navbar.js';

let contentArea;

let devBtn;
let artBtn;
let audBtn;
let webBtn;

let placeholderImg;

/**
 * Basic setup for the page, connects Vue for the navbar and attatches events to the buttons
 */
function setup()
{
	
	//Navbar();
	new Vue({
		el: "#app",
		components: {
			'navbar': Navbar
		}
	});

	loadData();
	contentArea = document.querySelector("#gridcontainer");

	// Setup buttons
	devBtn = document.querySelector("#development");
	devBtn.onclick = (e) => {
		setActiveBtn(devBtn);
		loadTeam("development");
		localStorage.setItem("activeTab", "development");
	}

	artBtn = document.querySelector("#art");
	artBtn.onclick = (e) => {
		setActiveBtn(artBtn);
		loadTeam("art");
		localStorage.setItem("activeTab", "art");
	}

	audBtn = document.querySelector("#audio");
	audBtn.onclick = (e) => {
		setActiveBtn(audBtn);
		loadTeam("audio");
		localStorage.setItem("activeTab", "audio");
	}

	webBtn = document.querySelector("#web");
	webBtn.onclick = (e) => {
		setActiveBtn(webBtn);
		loadTeam("web");
		localStorage.setItem("activeTab", "web");
	}

	let closeB = document.querySelector("#close");
	closeB.addEventListener("click", function(){
		pInfo.style.top = "90%";
		pInfo.style.visibility = "hidden";	
	});

	placeholderImg = 'images/team/placeholder_sil_big.png';
}

/**
 * Changes the given button to have the active class and removes it from all others
 * @param {object} button 
 */
function setActiveBtn(button)
{
	// Reset all button classes
	devBtn.classList.remove('currentButton');
	artBtn.classList.remove('currentButton');
	audBtn.classList.remove('currentButton');
	webBtn.classList.remove('currentButton');
	// Add active class to current button
	button.classList.add('currentButton');
}

/**
 * Updates the info sheet section with clicked team member's info
 * @param {Object} member The team member that is being displayed
 */
function updateInfo(member)
{
	if (member != undefined) {
		
	
	let name = document.querySelector("#name");
	let links= document.querySelector("#links");
	let terms = document.querySelector("#terms");
	let teams = document.querySelector("#teams");
	let roles = document.querySelector("#roles");
	let bio = document.querySelector("#bio");

	links.innerHTML = "";

	name.innerHTML = member.name
	
	let roleText = "";
	for (let i = 0; i < member.roles.length; i++)
	{
		if (roleText == ""){
			roleText += member.roles[i];	
		}
		else{
			roleText += `, ${member.roles[i]}`;
		}
	}
	roles.innerHTML = `<b>Roles: </b>` + roleText;
	bio.innerHTML = member.bio

	let teamText = "";
	for (let i = 0; i < member.teams.length; i++)
	{
		if (teamText == ""){
			teamText += member.teams[i];	
		}
		else{
			teamText += `, ${member.teams[i]} `;
		}
	}
	teams.innerHTML = "<b>Teams: </b>" + teamText;

	let termText = "";
	for (let i = 0; i < member.terms.length; i++)
	{
		if (termText == ""){
			termText += member.terms[i];	
		}
		else{
			termText += `, ${member.terms[i]} `;
		}
	}
	terms.innerHTML = "<b>Terms: </b>" + termText;

	let numLinks = member.links.length;
	for (let i = 0; i < numLinks; i++) {
		let linkE;
		switch (member.links[i].id) {
			case "website":
				linkE = document.createElement("a");
				linkE.href = member.links[i].val;
				linkE.class = "linkBox";
				linkE.target = "_blank"
				linkE.innerHTML = `<i class="fas fa-portrait fa-4x"></i>`;
				break;
			case "secondary":
				linkE = document.createElement("a");
				linkE.href = member.links[i].val;
				linkE.class = "linkBox";
				linkE.target = "_blank"
				linkE.innerHTML = `<i class="fas fa-globe fa-4x"></i>`;
				break;
			case "github":
				linkE = document.createElement("a");
				linkE.href = member.links[i].val;
				linkE.class = "linkBox";
				linkE.target = "_blank"
				linkE.innerHTML = `<i class="fab fa-github fa-4x"></i>`;
				break;
			case "linkedin":
				linkE = document.createElement("a");
				linkE.href = member.links[i].val;
				linkE.class = "linkBox";
				linkE.target = "_blank"
				linkE.innerHTML = `<i class="fab fa-linkedin fa-4x"></i>`;
				break;
			case "email":
				linkE = document.createElement("a");
				linkE.href = "mailto:" + member.links[i].val;
				linkE.class = "linkBox";
				// linkE.target = "_blank"
				linkE.innerHTML = `<i class="fas fa-envelope fa-4x"></i>`;
				break;
			default:
				break;
		}
		
		links.appendChild(linkE);
	}
	pInfo.style.top = "10%";
	pInfo.style.visibility = "visible";
	}
}

//loader stuff

/*
*	Loads team data from the server file using AJAX, sorts each person into their respective team objects
*/
let data = undefined;
function loadData() {
	//fairyDustCursor(); don't like how the fairydust cursor looks with movement
	return $.ajax({
		dataType: 'json',
		url: 'data/data.json',
		mimeType: 'application/json',
		success: function (jdata, status, jqxhr) {
			// Teams, roles, terms, and links require extra parsing
			Object.keys(jdata).forEach(key => {
				jdata[key].teams = JSON.parse(jdata[key].teams);
				jdata[key].terms = JSON.parse(jdata[key].terms);
				jdata[key].links = JSON.parse(jdata[key].links);
				// Some people have incorrect JSON for roles so we check if it's valid
				try {
					jdata[key].roles = JSON.parse(jdata[key].roles);
				} catch (e) {
					return false;
				}
			});

			let production = teamFromData(jdata, "Production");
			let development = teamFromData(jdata, "Development");
			let web = teamFromData(jdata, "Web");
			let art = teamFromData(jdata, "Art");
			let audio = teamFromData(jdata, "Audio");

			development = sortTeam(development);
			web = sortTeam(web);
			art = sortTeam(art);
			audio = sortTeam(audio);

			data = { audio, web, art, development, production };
			// Loads default team
			loadProduction();

			let activeTab = localStorage.getItem("activeTab");
			if (activeTab == null)
			{
				loadTeam("development");
			} else
			{
				loadTeam(activeTab);
				setActiveBtn(document.querySelector(`#${activeTab}`));
			}
		}
	});
}

/**
 * Gets the information from a given team object and updates the page HTML
 * @param {string} teamID The team name
 */ 
function loadTeam(teamID)
{
	contentArea.innerHTML = "";

	let teamObj = data[teamID];

	for (let i = 0; i < teamObj.length; i++)
	{
		let userObj = teamObj[i];
		let img = "https://www.changelingvr.com/" + userObj.img;

		// Roles need some extra parsing to add spaces, will not parse if not valid JSON
		let roleText = "";
		if (typeof userObj.roles == "object")
		{
			// Roles is JSON encoded
			for (let i = 0; i < userObj.roles.length; i++)
		{
			if (roleText == ""){
				roleText += userObj.roles[i];	
			}
			else{
				roleText += `, ${userObj.roles[i]}`;
			}
		}
		} else
		{
			// Roles is not JSON encoded
			roleText = userObj.roles;
		}
		
		

		contentArea.innerHTML +=
		`<span class=teamtile>
		<img src="${img}" onerror="this.src='${placeholderImg}'" alt="No Image Loaded">
		<h1>${userObj.name}</h1>
		<h2>${roleText}</h2>
		<span class=tileButton id="pic${i}"></span>
		</span>`

	}

	// Add events to each portrait so that they call the correct object into updateInfo
	let buttons = contentArea.querySelectorAll(".tileButton");
	for (let i = 0; i < buttons.length; i++)
	{
		buttons[i].onclick = function(){ updateInfo(data[`${teamID}`][`${i}`]);}
	}
}

/**
 * Function specifically for loading the production team onto the top section
 */
function loadProduction()
{
	let prodSection = document.querySelector("#production");
	let teamObj = data["production"];

	for (let i = 0; i < teamObj.length; i++)
	{
		let userObj = teamObj[i];
		let img = "https://www.changelingvr.com/" + userObj.img;
	
		prodSection.innerHTML +=
		`<span class=teamtile>
		<img src="${img}" onerror="this.src='${placeholderImg}'" alt="No Image Loaded">
		<h1>${userObj.name}</h1>
		<h2>${userObj.roles}</h2>
		<span class=tileButton id="pic${i}"></span>
		</span>`
	}

	// Add events to each portrait so that they call the correct object into updateInfo
	let buttons = prodSection.querySelectorAll(".tileButton");
	for (let i = 0; i < buttons.length; i++)
	{
		buttons[i].onclick = function(){ updateInfo(data[`production`][`${i}`]);}
	}
}

/**
 * Filters out teams from project team data
 * @param   {object} data    The original JSON data being filtered from
 * @param   {string} teamID  The team name
 * @returns {Array.<object>} Array of team members where key = their user ID from the form
 */
function teamFromData(data, teamID) {
	let team = Object.fromEntries(Object.entries(data).filter(([key, value]) => value.teams.includes(teamID) && key !== "testadmin"));
	return Object.keys(team).map(key => {
		data[key].id = key;
		data[key].img = String.format("data/{0}.jpg", key);
		data[key].showModal = false;
		return data[key];
	});
}

/**
 * Re-arranges the team lists so that leads are in front
 * @param {object} teamObj The team list object
 */
function sortTeam(teamObj)
{
	let temp = [...teamObj];
	teamObj = [];

	// Iterates through twice, first getting leads then getting non leads
	for (let i = 0; i < temp.length; i++)
	{
		let userObj = temp[i];

		if (userObj.roles.includes("Lead"))
		{
			teamObj.push(userObj);
		}
	}
	for (let i = 0; i < temp.length; i++)
	{
		let userObj = temp[i];

		if (!userObj.roles.includes("Lead"))
		{
			teamObj.push(userObj);
		}
	}

	return teamObj;
}

// JS implementation of String.Format(str, args[])
if (!String.format) {
	String.format = function(format) {
		var args = Array.prototype.slice.call(arguments, 1);
		return format.replace(/{(\d+)}/g, function (match, number) {
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}

export{setup};