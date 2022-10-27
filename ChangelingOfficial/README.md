# ChangelingOfficial

This is the repo for the website for VR narrative mystery game [Changeling](https://www.changelingvr.com/).

## Team (Fall 2020)

| Team           | Role           | Email                        | Discord             |
|----------------|----------------|------------------------------|---------------------|
| Jake Johnson   | Lead Developer | jjohnson98business@gmail.com | Deducibleseven#5974 |
| Mohak Padukone | UI/UX Designer | mvp2395@rit.edu              | Mohak#5187          |
| Andy Ong       | Web Developer  | axo5586@rit.edu              | Seouless#7539       |
| Devin Jolly    | Web Developer  | daj6462@rit.edu              | djolly#8077         |

## Team (Spring 2021)

| Team             | Role           | Email                        | Discord             |
|------------------|----------------|------------------------------|---------------------|
| Ethan Adler      | Lead Developer | exa9027@rit.edu 		   | Roxora#5455 	 |
| Aaron Feld	   | Web Designer   | axf8278@rit.edu              | DarkEagle#7007      |
| Chino Barcelona  | Web Developer  | gb234theawesome@gmail.com    | «RG»Hades#3191      |
| Conrad Hindman   | Web Developer  | cmh1026@rit.edu              | Kͣͫiͧ͛̂l̅̏l̃JoyCorgi#3274   |
| Jack Carrig      | Web Developer  | jxc2476@rit.edu              | Mr. Redlego#1568    |
| Jackson Shuminski| Web Developer  | jvs8230@rit.edu              | Stykolar#4167       |

## Team (Summer 2021)

| Team             | Role           | Email                        | Discord             |
|------------------|----------------|------------------------------|---------------------|
| Anthony LaRosa   | Lead Developer | al8249@rit.edu 		   | Fid#7488 	 	 |
| Breanna Henriquez| Exp Designer   | bh4974@rit.edu               | Hen-Sama#9720       |
| Sijal Jaradat    | Exp Designer   | sj3603@rit.edu               | The VibeRater#5532  |
| Matthew Sze-Tu   | Exp Designer   | ms1937@rit.edu               | Entro#6046          |
| Will Kracke      | Web Developer  | wjk4218@rit.edu              | Synthe#2959         |
| Suraj Bonthu     | Web Developer  | sb8869@rit.edu               | Twiz#0774           |
| David Chen       | UI/UX Designer | dxc7649@rit.edu              | SwagSlimy#5424      |
| Michael Ogunwale | Web Developer  | mo1439@rit.edu               | M𝘪𝘻𝘶#7777            |

## Repo Structure

| Directory                | Libraries                                                                                                          |
|--------------------------|--------------------------------------------------------------------------------------------------------------------|
| root                     | Web pages and site configuration files                                                                             |
| [audio](audio)           | Contains all audio used on the site (typically for certain site experiences)                                       |
| [components](components) | Contains Vue components (.js with templated strings and Vue component objects)                                     |
| [favicon](favicon)       | Contains favicon assets (used by various platforms) other than favicon.ico                                         |
| [images](images)         | Contains all images used on the site                                                                               |
| [scripts](scripts)       | Contains all the scripts that run on each page as well as server-side scripts. Scripts whose name corresponds to the root .html are the main script for said page (e.g. `index.js` => `index.html`). Experiences featured on the home page end in `-exp.js`. Experiences are imported in `index.js` and make use of classes featured in `classes.js`. External code is found within subfolders of the scripts folder. |
| [styles](styles)         | Stylesheets applied to web pages                                                                                   |
| [experiences](experiences)| Currently only on the Experiences Branch, Contains the Unity Project that has each Experience in it. The GitIgnore in here prevents the Project from committing all of the extra library files and such, which would overload the Repo.|
## Page Explanation

| Page       | Explanation                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| characters | Landing page for the site which contains basic narrative information to draw one into the game. Below the narrative sections are interactive experiences revolving around some of the characters in the game. |                                                         |
| team       | Credits all team members that have worked on the project, providing information such as personal links and bios |
| form       | Allows team members, past and present, to edit their section on the team page (requires login)                  |
| press      | Presskit providing information and assets about the game that press may want                                    |

## Third-Party Resources Used

### Libraries

- [Vue.js](https://vuejs.org/) (version `2.6.12`)
- [Parallax.js](https://matthew.wagerfield.com/parallax/) (version `3.1.0`)
- [jQuery](https://jquery.com/) (version `3.5.1`)
- [Popper](https://popper.js.org/) (version `1.14.2` (team.html) + version `2.x.x` (form.html)) (note: assume latest version of 2)
- [Bootstrap](https://getbootstrap.com/) (version `4.5.0`)
- [Material Design for Bootstrap](https://mdbootstrap.com/) (version `4.19.1`) (note: variant `MDBootstrap jQuery`)
- [Tippy.js](https://atomiks.github.io/tippyjs/) (version `6.x.x`) (note: assume latest version of 6)
- [Cropper.js](https://fengyuanchen.github.io/cropperjs/) (version `1.5.9`)

### Other

- [swipeutil](http://www.javascriptkit.com/javatutors/touchevents2.shtml)
- [imageutil](https://gist.github.com/dcollien/312bce1270a5f511bf4a#file-imagetools-js)

### By Page Featured

| Page                               | Libraries                                                                 |
|------------------------------------|---------------------------------------------------------------------------|
| [index.html](index.html)           | Vue.js, Parallax.js |
| [team.html](team.html)             | jQuery, Vue.js, Popper, Bootstrap, Material Design for Bootstrap          |
| [form.html](form.html)             | jQuery, Popper, Tippy.js, Cropper.js, (imageutil)                         |
| [press.html](press.html)           | Vue.js, Bootstrap                                                         |

## Some Notes On Optimization

- Images, the most frequent media asset on most of the website, should be as compressed as possible
  - For images with alpha (avoid for large images): export as .png (.webp is not well supported) with indexed color mode (unless indexed ends up being greater in file size, which can happen on occasions with smaller low-palette images, especially single color images)
    - In GIMP and in Photoshop, use Image / Mode / Indexed…
    - Defaults should be "generate optimum palette" with max number at 255 for GIMP
    - Ensure Photoshop has similar settings
    - Use compression level 9 (GIMP) or whatever the max is in Photoshop
  - For images without alpha: export as .jpg
    - Large images:
      - 70% compression should be fine
	  - Optimize and Progressive should be on
	  - Smoothing should be around 0.30 (this tends to offset compression artifacts)
	  - Set subsampling to 4:2:0 (Chroma Quartered). If colors look off, increase until quality is as desired (remember that 1. It looks different on web 2. Internet Download Speed > Quality)
	  - Ensure DCT method is set to Integer
	  - Photoshop may not have all these settings and is moreso based on a quality slider; this is why GIMP is preferred
    - Small images:
      - Same as above but with 60% compression
    - Team member photos:
      - Are currently set at 50% compression server-side. If the site ever uses any other photos, this may be fine as well
  - For UI assets: try to use .svg as much as possible. SVGs can be created with Inkscape or Illustrator (Inkscape is recommended as it simply expands upon the SVG format without much extra data, as opposed to Illustrator having its own native project format .ai)
  - [Caesium](https://www.fosshub.com/Caesium-Image-Compressor.html) is a great application for compressing converting a large group of files to .jpg (it isn't great for .png). Sometimes it gets better compression than GIMP with the same quality setting. The downside is that it doesn't have access to progressive/optimize/subsampling
	- Make sure you click the "set" buttons with the images selected (you can shift-click to quickly select a group of them just like in a Windows File Explorer) once you set the setting you desire.
- Make sure you follow DRY (Don't-Repeat-Yourself) as much as possible
  - Avoid redundant selectors in CSS/HTML
    - Only use classes/ids when necessary
    - Make use of selectors such as nth-of-type for things that are 'unique' from surrounding elements, rather than making an id (this is called "over-qualifying")
    - Use classes for repeated elements (like containers and things that get positioned similarly) and ids for unique parents (e.g. a game character)
  - Avoid re-loading the same asset
    - E.g. using a PIXI/Three.js loader for the same asset multiple times; this is one reason why the ResourceLoadTracker exists (enforces single loading; the other reason being for implementing a loading screen which tracks percent loaded)

## Generating Direct-Downloadable Links

- After getting permissions to access the shared ‘Changeling Public’ drive, you should be able to access and manage public files you want to display on the website, as well as have access to the latest downloadable build of the game that will be maintained by the dev team. After uploading a file and making sure that file has sharable permissions to anyone who has the link (instead of RIT-specific emails only), you should modify the shareable url to a google-drive url that contains specific parameters that make it a direct download to make download links on the site.
- Ideally, you should make sure the build retains the same name (right now it is Changeling-Public.zip), so that you could simply upload and write over the existing file without having to re-generate a new URL. It will ask if you want a new version or update existing: the option you want is update existing. It is likely that the dev team will be the ones uploading the file, so make sure they follow this convention so that you don't have to keep editing the link in code (and so that you won't even have to worry about the first bullet point).
- The presskit folder has .zips for downloads contained on the presskit page. When there's new assets to put in these, you will have to re-upload these. Follow the second bullet point (or, if unable to, the first) when uploading these .zips.
- For more information, see this video: [How to Create Direct Download Links with Google Drive - 3 Ways in 2020: Yourself, online or with app ](https://www.youtube.com/watch?v=S6BRmorFFc0&ab_channel=GrayTechnical)

## Managing Login Credentials for Team-Page Form

- After receiving login credentials to Dreamhost, the host of ChangelingVR.com from Weez, you should be able to edit login informations of the people who are on the team. If you need to create new accounts for the form so people can show up on the team page, or edit existing information like passwords, you should refer to the pinned message on discord in the #web channel that shows you how to use ssh from command prompt to access the directory and login information of people. Passwords are hidden as you input them in the command prompt.
- To log in to the server, open a terminal and enter `ssh changelingAdmin@changelingvr.com`. You will be prompted for the server admin password. Note: this login is for the server, NOT for the team page form. This login can also be used for SFTP ([FileZilla](https://filezilla-project.org/download.php), [WinSCP](https://winscp.net/eng/index.php)), which is used for transferring files to the server.
- Use `htpasswd /home/changelingAdmin/.htpasswd {username}` to modify logins. An account will be created if the username does not already exist. You will be prompted to enter a password and confirm it.
- As the web team, you will have to generate passwords for the other people that work on ChangelingVR in your term and provide them with a generated password and username to login with. You can modify their passwords after using the aforementioned method if they want to change it.
- Use https://changelingvr.com/form.html (the .html is necessary) and use the created login credentials to fill out your form and be automatically displayed on the team page of the site!

## Final Important Notes
- /Data (team member data) is .gitignored because it should NOT be included in the repository, as it is updated by other project members and is not directly managed by the web team (i.e. it is user-generated, not developer-managed). Make sure you don't overwrite this directory on the server. If you want to preview the team page on your end, clone it from the server, but do not overwrite when transferring the repo back on to the server. If for some reason the data directory gets overwritten, there are backups made daily located above the changelingvr.com directory in "teamBackup." Make sure to not remove team-backup.php from above changelingvr.com (it's a serverside script that runs outside the website itself, see the documentation for it for more info)
- Do not transfer .eslintrc, .gitignore, .gitattributes, or .git. Nothing bad will really happen, it'll just pollute the server with junk (and .git will be pretty sizeable, so that might cause storage issues).
- DO make sure .htaccess exists, as well as the other root files not mentioned in the previous note. Be careful when modifying these, ESPECIALLY .htaccess. .htaccess is the server configuration file and something can break/a security risk could arise if you don't know what you're doing. These files are included with the repo to make sure they are set up for how the site repo itself is set up.
- In addition to /Data, don't touch .well-known. That is a Dreamhost-managed thing for SSL (https). In regards to the directory above changelingvr.com: mostly everything there is some sort of config file/etc that shouldn't need modified or especially deleted. Make sure you know what you're doing if stuff needs modified (for reference: this is an Apache server with CGI/FastCGI)
