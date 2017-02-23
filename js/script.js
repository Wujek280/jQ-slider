'use strict';

/* jQuery 3.1.1 */

/* ustawienie szerokosci slajdera */ 
var sliderWidth = 640;
var sliderHeight = 480;

var index = 1;  // poczatkowy slajd - zakres 1-n 
var slideCount; // przyjmuje wartosc dopiero po zadladowaniu dokumentu

/********************************/

$(function(){  //funkcja uruchamiana raz po załadowaniu sie dokumentu
   
    
   slideCount = $('#slideshow').children().length;

   letsInitiallyDefineWidthsAndHeights(sliderWidth, sliderHeight);
   
   //zaladowanie grafik z lorempixel.com
   loadGraphics();
   
   //SCHOWANIE KAPSZYNÓW
   $("#slideshow").find(".slide>h3").hide(0);
   
   //pokazanie aktualnego captiona
   $("#slideshow").find(".slide>h3").each(function(a){
         if(a+1 == index) $(this).show(200); 
   });
   
         
});

/********************************/

//troche duzo debugownia bylo to skrocilem :D
function echo(variable){
   console.log(variable);
}

/*********************************/

function letsInitiallyDefineWidthsAndHeights(width, height){
   
      
   $("#container").css("width", width);
   $("#container").css("height", height+60);
   echo("container is now: "+width+"x"+height+"px");
   
   $("#slideshow").css("width", width);
   $("#slideshow").css("height", height);
   echo("slideshow is now: "+width+"x"+height+"px");
   
   $(".arrow-box").css("width", width);
   $(".arrow-box").css("height", height);
   echo("arrow-box is now: "+width+"x"+height+"px");
   echo("sizing done...");
   
   $(".arrow").css("padding-top", (height-80)/2);
   echo("arrows set...");
      
   //inicjalizacyjne pozycje
   
   $('#slideshow').children(".slide").each(function(i) {
      
      $(this).css("left",function() { 
         
         var ans = sliderWidth*(i-index+1)+'px';
         echo("offset of img "+i+" is now: "+ans);
         return ans;            
         
      });
            
   });
   
   echo("offseting done... ");
   echo("  index : "+index+"\n --------------");
   
}

/* ----------- WŁAŚCIWA FUNKCJA -----------*/

function change(input){
   
   //zamiast przerwania funkcji slider wraca na początek / koniec
   
   if(input == '-1'){

      echo("\n -----<<PREV-----");

      if(index  == 1 || index < 0){
         index = slideCount;
      }else{
         index--;
      }
   }

   if(input == '+1'){

      echo("\n -----NEXT>>-----");

      if(index  == slideCount || index > slideCount){
         index = 1;
      }else{
         index++;
      }
   }

   //po ustawieniu odpowiedniego indexu >>> ustawienie marginesow 
   
   $('#slideshow').children(".slide").each(function(i) {

      $(this).css("left",function() { 

      var ans = sliderWidth*(i-index+1)+'px';
      echo(">>offset of img "+i+" is now: "+ans);
      //echo("      i : "+i);
      return ans;            

      });
    });
   
   echo(" >> index : "+index);
   
   //UKRYCIE
   $("#slideshow").find(".slide>h3").hide(0);
   //POKAZANIE WŁAŚCIWEGO CAPTIONA
   
   $("#slideshow").find(".slide>h3").each(function(a){
         if(a+1 == index) $(this).show(200); 
   });
   
}

function loadGraphics(){
   
   //grafiki dodawane są po klasie image-$
      $("#slideshow").find(".slide>.image").each(function(b){
         $(this).addClass("image-"+(b+1));
      });
   //podpięcie grafik z lorempixel.com
      $("#slideshow").find(".slide>.image").each(function(b){
         $(this).css("background-image",function(f){
            var ans = 'url(http://lorempixel.com/'+sliderWidth+'/'+(sliderHeight+b)+'/)';
            echo("loaded graphic >> "+ans);
            return ans;
         });
      });
      
}