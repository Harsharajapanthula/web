var randomnum = Math.floor(Math.random()*6) + 1;
var randimage = "dice"+randomnum+".png";
var randimagesrc = "images/"+randimage;
var image1 = document.querySelectorAll("img")[0]
image1.setAttribute("src",randimagesrc);

var randomnum2 = Math.floor(Math.random()*6) + 1;
var randimage2 = "dice"+randomnum2+".png";
var randimagesrc2 = "images/"+randimage2;
var image2 = document.querySelectorAll("img")[1];
image2.setAttribute("src",randimagesrc2);

if(randomnum > randomnum2){
    document.querySelector("h1").innerText = "player 1 is the winner";
}
else if(randomnum < randomnum2){
    document.querySelector("h1").innerText = "player 2 is the winner";
}