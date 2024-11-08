let circles = document.getElementsByClassName("circle"),
	players = [];

let angle = 0,
	mousex = 0,
	mousey = 0,
	ydist = 0,
	xdist = 0,
	click = false;

const modify = (e) => {
	KEYS[e.key] = e.type == "keydown";
};

window.addEventListener("mousemove", (e) => {
	mousex = e.clientX;
	mousey = e.clientY;
});

window.addEventListener("pointerdown", e => {
    click = true
    let size = Math.random()*100 + 50
    let player = {
        x: e.clientX - 25,
        y: e.clientY - 25,
        size: size,
        speed: 20,
        color: "#" + Math.round(Math.random() * 4294967294).toString("16"),
        borderColor: "#" + Math.round(Math.random() * 4294967294).toString("16")
    }
    players.push(player)
    let circle = document.createElement("div")
    circle.className = "circle"
    circle.style.top = `${player.y}px`;
    circle.style.left = `${player.x}px`;
    circle.style.width = `${player.size * 0.9}px`;
    circle.style.height = `${player.size * 0.9}px`;
    circle.style.backgroundColor = player.color
    circle.style.border = `${player.size * 0.1}px solid ${player.borderColor}`;
    circle.style.borderRadius = `${player.size / 2}px`;
    document.body.appendChild(circle)
    circles = document.getElementsByClassName("circle")
});

window.addEventListener("pointerup", () => (click = false));


setInterval(() => {
    if(circles.length > 0 && players.length > 0) {
        let circle = circles[circles.length-1]
        let player = players[players.length-1]
        ydist = mousey - (player.y + player.size / 2);
        xdist = mousex - (player.x + player.size / 2);
        angle = Math.atan2(ydist, xdist);
        if (click && Math.sqrt(xdist ** 2 + ydist ** 2) > player.size / 4) {
            player.x += Math.cos(angle) * player.speed;
            player.y += Math.sin(angle) * player.speed;
        }
        circle.style.top = `${player.y}px`;
        circle.style.left = `${player.x}px`;
        circle.style.width = `${player.size * 0.9}px`;
        circle.style.height = `${player.size * 0.9}px`;
        circle.style.border = `${player.size * 0.1}px solid ${player.borderColor}`;
        circle.style.borderRadius = `${player.size / 2}px`;
    }
}, 1000/60);