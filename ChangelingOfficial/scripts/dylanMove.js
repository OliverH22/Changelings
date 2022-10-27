var dylanChar = document.querySelector("#father");
var map = document.querySelector("#theWall");

var x = 20;
var moveDirections = [];
var speed = 1;

const placeFather = () => {

    var charSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--char-size')
    );
        // This sets movements to only right and left for the father in the webpage
    const moveDirections = moveDirections[0];
    if(moveDirections){
        if(moveDirections === directions.right) {x += speed;}
        if(moveDirections === directions.left) {x -= speed;}
        dylanChar.setAttribute("facing", moveDirections);
    }
    dylanChar.setAttribute("walking", moveDirections ? "true" : "false");
    // sets limits for the father to go within the border
    var leftLimit = -8;
    var rightLimit = (16 * 11)+8;

    if(x < leftLimit) {x = leftLimit; }
    if(x > rightLimit) {x = rightLimit; }
}
// Once the father is moving have an animation play
const step = () => {
    placeChar();
    window.requestAnimationFrame(() => {
        step();
    })
}
step();

const directions = {

    left : "left",
    right : "right"

}
// Sets the keys for moving left and right to the arrow keys on the keyboard
const keys = {
    37: directions.left,
    39: directions.right,
}

document.addEventListener("keydown", (e) => {
    var direct = keys[e.which];
    if (direct && moveDirections.indexOf(direct)=== -1){
        moveDirections.unshift(direct)
    }
})

document.addEventListener("keyup", (e) => {
    var direct = keys[e.which];
    var index = moveDirections.indexOf(direct);
    if (index > -1){
        moveDirections.splice(index, 1)
    }
});

