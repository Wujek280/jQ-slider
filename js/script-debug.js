'use strict';

/* jQuery 3.1.1 */

/* ustawienie szerokosci slajdera */ 
var sliderWidth = 800;
var sliderHeight = 550;

var index = 1;  // poczatkowy slajd - zakres 1-n 
var slideCount; // przyjmuje wartosc dopiero po zadladowaniu dokumentu

/************************************************************/

$(function(){  //funkcja uruchamiana raz po załadowaniu sie dokumentu
   
   setup(sliderWidth, sliderHeight);
            
});

/************************************************************/
//                     FUNKCJE

//function setup(); - ustawia  w h dla elementow (zawiera w sobie letsDefine..())
//function echo();  - console.log()
//function letsDefineWidthsAndHeights(width, height);
//function change(input); - zmiana slajdu +1 -1 
//function loadGraphics(102 || 101); - ładuje grafiki kod : 102 101

/**************************************************************/

//             >>  FUNKCJA DO BUTTONA W HTML  <<
//             WYRZUCA 60400px WYSOKOSCI OKNA :D
//function setValues(){
//    console.log("\n SETTING NEW VALUES W H ------\n")
//    var w = $("#width-input").val();
//    var h = $("#height-input").val();
//    console.log("-wh-->"+w+" x "+h+"\n");
//    if(h>0){ sliderWidth = w }else{ echo("invalid width<><>")}
//    if(w>0){ sliderHeight = h }else{ echo("invalid height<><>")}
//    index = 1; 
//    if(h>0 && w>0) setup(sliderWidth,sliderHeight);
//}

function setup(w, h){

   slideCount = $('#slideshow').children().length;

   letsDefineWidthsAndHeights(w, h);

   //zaladowanie grafik z lorempixel.com
   loadGraphics();

   //SCHOWANIE KAPSZYNÓW
   $("#slideshow").find(".slide>h3").hide(0);

   //pokazanie aktualnego captiona
   $("#slideshow").find(".slide>h3").each(function(a){
         if(a+1 == index) $(this).show(200); 
   });
}

//troche duzo debugownia bylo to skrocilem :D
//minus taki, ze nie wyswietla lini bledu

function echo(variable){
   console.log(variable);
}



function letsDefineWidthsAndHeights(width, height){
   
      
   $("#container").css("width", width);
   $("#container").css("height", height+60);
    echo("container is now: "+width+"x"+height+"px"); 
   
   $(".image").css("width", width);
   $(".image").css("height", (height+60) );
    echo("images are now: "+width+"x"+height+"px");
   
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