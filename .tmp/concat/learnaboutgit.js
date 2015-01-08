
// <!-- Begin
// (C) 2001 www.CodeLifter.com
// http://www.codelifter.com
// Free for all users, but leave in this  header

// =======================================
// set the following variables
// =======================================

// Set speed (milliseconds)
var speed = 5000;

// Specify the image files
//var Pic = new Array(); // don't touch this
// to add more images, just continue
// the pattern, adding to the array below

// Pic[0] = 'pic02.jpg';
// Pic[1] = 'pic07.jpg';
// Pic[2] = 'pic12.jpg';
// Pic[3] = 'pic17.jpg';
var Pic = ['pic02.jpg', 'pic07.jpg', 'pic12.jpg', 'pic17.jpg'];

// do not edit anything below this line

var t;
var j = 0;
var p = Pic.length;

var preLoad = [];
for (i = 0; i < p; i++){
   preLoad[i] = new Image();
   preLoad[i].src = Pic[i];
}

function runBGSlideShow(){
   if (document.body){
   document.body.background = Pic[j];
   j = j + 1;
   if (j > (p-1)) j=0;
   t = setTimeout(runBGSlideShow, speed);
   }
}
//  End -->
