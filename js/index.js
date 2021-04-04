var i = 0;
var images = ['/images/edu3.jpg','/images/edu1.png','/images/edu2.jpg','/images/edu4.jpg'];
var time = 3000;
 function changeImage() {
   document.slide.src = images[i];
   if(i < images.length - 1) {
     i++;
   }
   else {
     i = 0;
   }
   setTimeout('changeImage()',time);
 }
 window.onload = changeImage;
