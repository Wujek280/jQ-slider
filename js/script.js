'use strict';

/* jQuery 3.1.1 */

/* ustawienie szerokosci slajdera */ 
var sliderWidth = 800;
var sliderHeight = 550;

var index = 1;  // poczatkowy slajd - zakres 1-n 
var slideCount; // przyjmuje wartosc dopiero po zadladowaniu dokumentu

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
$(function(){  
   
   //funkcja uruchamiana raz po załadowaniu sie dokumentu
   
   slideCount = $('#slideshow').children().length;

   var width = sliderWidth;
   var height = sliderHeight;
   
   $("#container").css("width", width);
   $("#container").css("height", height+60);
   
   $(".image").css("width", width);
   $(".image").css("height", height );
   
   $("#slideshow").css("width", width);
   $("#slideshow").css("height", height);
   
   $(".arrow-box").css("width", width);
   $(".arrow-box").css("height", height);
   $(".arrow").css("height", height);
   
   $(".arrow").css("padding-top", (height-80)/2);
   
   //inicjalizacyjne pozycje
   
   $('#slideshow').children(".slide").each(function(i) {
      
      $(this).css("left",function() { 
         
         var ans = sliderWidth*(i-index+1)+'px';
         return ans;            
         
      });
            
   });

   //zaladowanie grafik z dysku (102)
   loadGraphics(102);

   //schowanie captionów
   $("#slideshow").find(".slide>h3").hide(0);

   //pokazanie aktualnego captiona
   $("#slideshow").find(".slide>h3").each(function(a){
         if(a+1 == index) $(this).show(200); 
   });
   
         
});

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

//troche duzo debugownia bylo to skrocilem :D
//minus taki, ze nie wyswietla lini bledu

function echo(variable){
   console.log(variable);
}


/* ----------- WŁAŚCIWA FUNKCJA -----------*/

function change(input){
   
   //zamiast przerwania funkcji slider wraca na początek / koniec
   
   if(input == '-1'){


      if(index  == 1 || index < 0){
         index = slideCount;
      }else{
         index--;
      }
   }

   if(input == '+1'){


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
   
   //UKRYCIE
   $("#slideshow").find(".slide>h3").hide(0);
   //POKAZANIE WŁAŚCIWEGO CAPTIONA
   
   $("#slideshow").find(".slide>h3").each(function(a){
         if(a+1 == index) $(this).show(200); 
   });
   
}

function loadGraphics(input){
   
   //grafiki dodawane są po klasie image-$
      $("#slideshow").find(".slide>.image").each(function(b){
         $(this).addClass("image-"+(b+1));
      });
   
   if(input == 101){
   //podpięcie grafik z lorempixel.com
      $("#slideshow").find(".slide>.image").each(function(b){
         $(this).css("background-image",function(f){
            var ans = 'url(http://lorempixel.com/'+sliderWidth+'/'+(sliderHeight+b)+'/)';
            echo("loading graphic >> "+ans);
            return ans;
         });
      });}   
   
   if(input == 102){
   //podpięcie grafik lokalnie
      $("#slideshow").find(".slide>.image").each(function(b){
         $(this).addClass("image-"+(b+1));
         $(this).css("background-image",function(){
            var ans = 'url(gfx/img-'+(b+1)+'.jpg)';
            echo("loading graphic >> "+ans);
            return ans;
         });
      });
      
   }      
}