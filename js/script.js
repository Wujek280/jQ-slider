'use strict';

var slider = $('#slider');
var slideshow = $('.slide-show');
var slideCount = $(slideshow).children.length;
var slideWidth = 100/slideCount;
var slideIndex = 0;

slideshow.css.width = slideCount*100;




