//run program after everything has loaded.
document.addEventListener('DOMContentLoaded', function() {

//load track for each player
var lane1 = document.getElementById('lane1');
var lane2 = document.getElementById('lane2');
var trackLength = 10;
//prompt length of track from user
trackLength = prompt("How far away is the planet? 10to 15 parsecs");

//trackLength;
//generate track
for (var j = 0; j < trackLength; j++) {
    lane1.appendChild(document.createElement('td'));
    lane2.appendChild(document.createElement('td'));
};

//initialize each player to a track
var player1 = lane1.querySelectorAll('td');
var player2 = lane2.querySelectorAll('td');

/*create finish line with 'finish' class. identifies last td cell
and class names it "finish"*/
player1[trackLength-1].className = "finish";
player2[trackLength-1].className = "finish";

//initialize player positions on track.
var p1 = 1;
var p2 = 1;

var won = document.getElementById('won');


//don't need this with the alert.
//var button = document.getElementById('restart');


//start user experience
document.addEventListener('keyup', chooseFleet, false)


/*assign event keys to each player, and progress them using
class name active; change racer win class if the last cell
class = 'active'*/
function chooseFleet() {
       if(event.which === 65) {
        updateFleetPosition(player1, p1)
        p1++;
        if (player1[trackLength-1].className === "active") {
            won.className = "";
            relaunch();
        }

    }
    else if (event.which === 13) {
        updateFleetPosition(player2, p2);
        p2++;
        if (player2[trackLength-1].className === "active") {
            won.className = "";
            relaunch();
    }
}
};

/*update position by changing existing td to "" and the incremented
one to "active" */
function updateFleetPosition(player, p) {
    if (player[p].className === "active") {
        player[p].className = "";
        player[p+1].className = "active";
    } else if (player[p] === player[p][trackLength]) {
        won.className = "";
        relaunch();
    }
};

function relaunch() {
    if(confirm("The planets are destroyed! Relaunch this Mission?")){
        window.location.reload();
    }
};
});