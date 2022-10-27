window.onload = init;

//globals
let cfButtons, cfLeft, cfRight;

function init()
{
    cfButtons = document.querySelectorAll(".cfButton");
    for (let i = 0; i < cfButtons.length; i++) {
        cfButtons[i].addEventListener("click", (e) => {onFileClick(e);})
    }
    cfLeft = document.querySelector("#fileLeft");
    cfRight = document.querySelector("#fileRight");
}

function onFileClick(e)
{
    e.target.style.backgroundColor = "#e2a757";
    for (let i = 0; i < cfButtons.length; i++) {
        if (e.target != cfButtons[i])
        {
            cfButtons[i].style.backgroundColor = "rgb(103, 78, 41)";
        }
    }
    cfLeft.innerHTML = caseFileData[e.target.id].left;
    cfRight.innerHTML = caseFileData[e.target.id].right;
}