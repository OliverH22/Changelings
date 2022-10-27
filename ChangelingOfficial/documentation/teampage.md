# Changeling Documentation
## Team Page

### Relevant files
- teamboard.html
- team_main.js
- team_util.js
- team.css

### **teamboard.html**
Page does not contain any content by itself, purely structural.

### **team_main.js**
Contains all of the code for canvas and mouse event processing.

Team data is loaded in from the data folder on the server. If you want to work with this page offline, you will need to download it and place it in your local github directory. 

Every frame, the program draws all of the team member portraits, their names and roles, the team section names, the strings connecting them and the background. It also updates the screen dimensions if the window has been resized, and updates delta time. This occurs in `update`.

**Important variables:**  
`universalScale` - a scaling factor applied to everything drawn. used to create the zoom in/out effect.  
`uniOffsetX` and `uniOffsetY` - x and y offset variables. used to position canvas images somewhere other than the center.  
`dimRatio` - array containing two numbers which represent the current screens width and height to the original width and height (1920 x 1080).

**Drawing functions:**  
`drawFour` - draws a row of 4 team member portraits, and stores the position data for mouse movement  
`drawTitle` - draws the team title  
`background` - draws the corkboard background. Has internal properties to determine the area of the background.  
`getWindowSize` - runs automatically when the window size is changed. Adjusts the scale of images drawn to fit within the new viewport.  
`updateInfo` - Updates the info sheet with a clicked team member's data, then shows the sheet.  
`showHelp` - displays the help popup.

Hovering over and viewing people's information is handled by the Javascript, not clickable HTML elements. This is handled in `detectMousePos` and `detectMouseClick`.

**Mouse functions:**  
`detectMousePos` - receives a mousemove event object and compares it's position to the list of coordinates generated in `drawFour`. If the mouse is hovering over a portrait, that portrait will be highlighted.  
`detectClickPos` - receives a mousedown event object and compares it's position to the list of coordinates generated in `drawFour`. If the mouse is clicked over a portrait, the information for that person will be shown in the information popup.  
`canvas.onwheel`(inline function) - changes universalscale to zoom in or out.  
`panCamera` - pans the camera in the direction the mouse is moved when the middle mouse button is held down 

**Loader functions:**  
`getImages` - loads the 'prop' images (polaroid frame, paper scraps, corkboard)  
`loadData` - imports team data from data file stored on the server.  
`sortPics` - links the team member photo to the rest of their data.  
`teamFromData` - sorts raw data into different team categories. 

### **team_util.js** 
Contains utility functions for team_main.js

### **team.css**
stylesheet for the team page. mainly styles the team member info popup. 

