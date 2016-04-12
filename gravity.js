//run program after everything has loaded.
document.addEventListener('DOMContentLoaded', function() {

var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
    myGamePiece = new component(30, 30, "red", 10, 120);
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Orbitron", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}
};

/*//run program after everything has loaded.
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
});*/