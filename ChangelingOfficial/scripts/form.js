window.onload = function () {
	// Declare necessary variables used between methods
	let msgWindow = $('#msg'),
		photoElement = document.querySelector('#photo-cropper-area img'),
		photoTools = $('#photo-cropper-controls'),
		photoCropper,
		photoAccepted = undefined,
		progressBar = $('#submission-progress'),
		progressStatus = progressBar.find('span');
	
	// Fill the form with pre-existing data (if said data exists)
	getDataFromServer();

	// Create tooltips to assist the user
	instantiateTippy();

	// Add a character counter to the bio to assist the user
	let bioCharCount = $('#bio span');
	let bioTextInput = $('#bio textarea');
	bioTextInput.bind('input propertychange', function() {
		bioCharCount.html(bioTextInput.val().length + " / 280");
		if (bioTextInput.val().length > 250)
			bioCharCount.css("color", "red");
		else
			bioCharCount.css("color", "black");
	});
	
	// When a photo is chosen, send it to the cropper
	$('#upload_Photo').bind('input propertychange', function(e) {
		ImageTools.resize(e.target.files[0], {
			width: 500, //max
			height: 500, //max
		}, function(blob, didItResize) {
			photoElement.src = URL.createObjectURL(blob);
			if (photoCropper != null)
				photoCropper.destroy();
			photoCropper = new Cropper(photoElement, {
				aspectRatio: 1 / 1,
				viewMode: 2, // https://github.com/fengyuanchen/cropperjs#viewmode,
				autoCrop: true
			});
			photoTools.removeClass('hidden');
			$('#photo-cropper-accept').prop('disabled', false);
			setTimeout(function() {
				photoTools.get(0).scrollIntoView(false);
			}, 100);
		})
	});
	
	// When a photo is canceled, destroy the cropper and reset photoAccepted
	$('#photo-cropper-cancel').on('click', function() {
		photoCropper.destroy();
		photoTools.addClass('hidden');
		photoElement.src = "";
		$('.cropper-container').remove();
		photoElement.classList.remove('cropper-hidden');
		photoAccepted = undefined;
	});
	
	// When the photo is accepted, convert it to a blob and reference it
	$('#photo-cropper-accept').on('click', function() {
		photoCropper.getCroppedCanvas({
			width: 500,
			height: 500,
			minWidth: 500,
			maxWidth: 500,
			minHeight: 500,
			maxHeight: 500,
			fillcolor: '#fff',
			imageSmoothingEnabled: true,
			imageSmoothingQuality: 'high'
		}).toBlob(blob => {
			photoAccepted = blob;
			photoCropper.destroy();
			photoElement.src = URL.createObjectURL(photoAccepted);
			$('#photo-cropper-accept').prop('disabled', true);
		});
	});

	// When the close button on the message window is clicked, close the message window
	$('.closeButton').click(function (e) {
		msgWindow.addClass('hidden');
	});

	// When the submit button is clicked, send an AJAX request to form-save.php
	$('#submit').click(function(e) {
		let data = getDataFromForm();
		if (data !== false) {
			progressStatus.removeClass('hidden');
			progressStatus.html("0%");
			progressBar.removeClass('disable-anim');
			$.ajax({
				xhr: function() {
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.onprogress = function(e) {
						if (e.lengthComputable) {
							let percentComplete = (e.loaded / e.total) * 100;
							percentComplete = Math.round(percentComplete);
							if (percentComplete == 100)
								progressStatus.html("Upload finished. Please wait while server does its work");
							else
								progressStatus.html(percentComplete + "%");
							let right = 100 - percentComplete;
							progressBar.css('right', right + "%");
						}
					}
					return xhr;
				},
				url: 'scripts/form-save.php',
				type: 'POST',
				data: data,
				processData: false,
				contentType: false,
				success: function(returnedData, status, jqxhr) {
					openMessage("success", "Your info was successfully saved");
					progressBar.addClass('disable-anim');
					progressStatus.html("Complete");
				},
				error: function(jqxhr, status, error) {
					openMessage("error", "There was an error processing: " + status + " : " + error);
					console.log("jqxhr: " + jqxhr);
					console.log("status: " + status);
					console.log("error: " + error);
					progressBar.addClass('disable-anim');
					progressStatus.html("Error");
				}
			});
		}
	});

	/**
	 * Gets data from the form to send to the server
	 * @returns {boolean|object} False if there was an error; user data if there was not
	 */
	function getDataFromForm() {
		let name = sanitize($("#pref_Name").val());
		let bio = sanitize($("#pref_Bio").val());
		let terms = [], teams = [], roles = [];
		$('#check_Terms input[type=checkbox]:checked').each(function() {
			terms.push($(this).val());
		});
		$('#check_Teams input[type=checkbox]:checked').each(function() {
			teams.push($(this).val());
		});
		$('#check_Roles input[type=checkbox]:checked').each(function() {
			roles.push($(this).val());
		});
		let links = [];
		let linkFields = [
			{ id: 'website', val: sanitize($("#link_Website").val()) },
			{ id: 'secondary', val: sanitize($("#link_Secondary").val()) },
			{ id: 'github', val: sanitize($("#link_GitHub").val()) },
			{ id: 'linkedin', val: sanitize($("#link_LinkedIn").val()) },
			{ id: 'email', val: sanitize($("#link_Email").val()) }
		];
		linkFields.forEach(e => {
			if (e.val != "")
				links.push(e);
		});

		let invalid_elems = [];
		if (name == "")
			invalid_elems.push("Name");
		if (terms.length == 0)
			invalid_elems.push("Terms");
		if (teams.length == 0)
			invalid_elems.push("Teams");
		if (roles.length == 0)
			invalid_elems.push("Roles");
		if ($('#links input[type=url]:invalid').length > 0)
			invalid_elems.push("Links");

		if (invalid_elems.length > 0) {
			openMessage("error", "The following elements were invalid or empty: ", invalid_elems)
			return false;
		}
		
		let returnData = new FormData();
		returnData.append('name', name);
		returnData.append('bio', bio);
		returnData.append('terms', JSON.stringify(terms));
		returnData.append('teams', JSON.stringify(teams));
		returnData.append('roles', JSON.stringify(roles));
		returnData.append('links', JSON.stringify(links));
		
		if (photoAccepted !== undefined)
			returnData.append('photo', photoAccepted);

		return returnData;
	}

	/**
	 * Retrieves data from the server for existing members and preloads it into the form for easy editing
	 * Note: Does not apply to member photo
	 */
	function getDataFromServer() {
		let userData;
		$.ajax({
			url: 'scripts/form-load.php',
			type: 'GET',
			success: function(data, status, jqxhr) {
				userData = JSON.parse(data);
				if (userData != null) {
					$("#pref_Name").val(userData.name);
					$("#pref_Bio").val(userData.bio);
					bioCharCount.html(bioTextInput.val().length + " / 280");
					JSON.parse(userData.teams).forEach(e => {
						let query = "#team_" + e;
						$(query).prop('checked', true);
					});
					JSON.parse(userData.terms).forEach(e => {
						let query = "#term_" + e;
						$(query).prop('checked', true);
					});
					JSON.parse(userData.roles).forEach(e => {
						let query = "#role_" + e;
						$(query).prop('checked', true);
					});
					if (userData.links !== null) {
						JSON.parse(userData.links).forEach(e => {
							switch (e.id) {
								case 'website':
									$("#link_Website").val(e.val);
									break;
								case 'secondary':
									$("#link_Secondary").val(e.val);
									break;
								case 'github':
									$("#link_GitHub").val(e.val);
									break;
								case 'linkedin':
									$("#link_LinkedIn").val(e.val);
									break;
								case 'email':
									$("#link_Email").val(e.val);
									break;
							}
						});
					}
				}
			}
		});
	}

	/**
	 * Sanitizes user input to prevent against XSS attacks
	 * @param   {string} s The string to sanitize
	 * @returns {string}   The sanitized string
	 */
	function sanitize(s) {
		var doc = new DOMParser().parseFromString(s, 'text/html');
		return doc.body.textContent.trim() || "";
	}

	/**
	 * Enables the message pop-up with the provided message
	 * @param {string}         status  Status indicator (placed in h2 tag)
	 * @param {string}         message Detailed message (placed in p tag)
	 * @param {Array.<string>} list    List of relevant elements to the message (optional)
	 */
	function openMessage(status, message, list = undefined) {
		msgWindow.removeClass('hidden');
		msgWindow.find('h2')[0].innerHTML = status;
		msgWindow.find('p')[0].innerHTML = message;
		let oldUL = msgWindow.find('ul')[0];
		if (oldUL !== undefined)
			oldUL.remove();
		if (list !== undefined) {
			let ul = document.createElement('ul');
			list.forEach(e => {
				let li = document.createElement('li');
				li.innerHTML = e;
				ul.appendChild(li);
			});
			msgWindow.append(ul);
		}
	}

	/**
	 * Instantiates Tippy.js instances
	 */
	function instantiateTippy() {
		tippy('#pref_Name', {
			content: "The exact name you want shown on the teams page",
			maxWidth: '600px', placement: 'top-start', arrow: false
		});
		tippy('#pref_Bio', {
			content: "Some sort of short bio about yourself; keep it short (<280 characters) and professional",
			maxWidth: '600px', placement: 'top-start', arrow: false
		});
		tippy('fieldset', {
			content: "Check all that apply<br/>At least one option must be selected",
			allowHTML: true, maxWidth: '600px', placement: 'top-start', arrow: false
		});
		tippy('#team_Roles', {
			content: "For those who were only on one team: enter the role (e.g.: Programmer)<br/>" +
				"For those who were on multiple teams: enter Role (Team), Role (Team);<br/> e.g.: Programmer (Dev), 3D Artist (Art)<br/>" +
				"In most cases, roles should match those listed in the Team Members and Roles spreadsheets relevant to the term(s) you worked",
			allowHTML: true, maxWidth: '600px', placement: 'top-start', arrow: false
		});
		tippy('#links input', {
			content: "Keep it professional",
			maxWidth: '600px', placement: 'top-start', arrow: false
		});
		tippy('#upload_Photo', {
			content: "Upload a .jpg (or other valid .jpg extension) or .png image (if nothing else, people viewing the team page <b>WILL</b> see this; keep this in mind when choosing)",
			allowHTML: true, maxWidth: '600px', placement: 'top-start', arrow: false
		});
		tippy('#photo-cropper-cancel', {
			content: "Cancels photo cropping and resets photo acceptance (i.e., if photo was marked 'accepted,' it will no longer be accepted / will not upload with form)",
			maxWidth: '600px', arrow: false
		});
		tippy('#photo-cropper-accept', {
			content: "Marks photo as 'accepted,' meaning it will upload with the form to the server (see top of page for how photo uploads are handled). Note that this action alone does not upload the photo - you <b>MUST</b> submit the form for this to take place.",
			allowHTML: true, maxWidth: '600px', arrow: false
		});
	}
}