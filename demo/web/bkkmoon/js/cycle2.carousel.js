/*! carousel transition plugin for Cycle2;  version: 20130528 */
(function(a){a(document).on("cycle-bootstrap",function(d,c,b){if(c.fx!=="carousel"){return}b.getSlideIndex=function(g){var f=this.opts()._carouselWrap.children();var e=f.index(g);return e%f.length};b.next=function(){var e=c.reverse?-1:1;if(c.allowWrap===false&&(c.currSlide+e)>c.slideCount-c.carouselVisible){return}c.API.advanceSlide(e);c.API.trigger("cycle-next",[c]).log("cycle-next")}});a.fn.cycle.transitions.carousel={preInit:function(c){c.hideNonActive=false;c.container.on("cycle-destroyed",a.proxy(this.onDestroy,c.API));c.API.stopTransition=this.stopTransition;for(var b=0;b<c.startingSlide;b++){c.container.append(c.slides[0])}},postInit:function(b){var g,f,k,l,c;var h=b.carouselVertical;if(b.carouselVisible&&b.carouselVisible>b.slideCount){b.carouselVisible=b.slideCount-1}var e=b.carouselVisible||b.slides.length;var d={display:h?"block":"inline-block",position:"static"};b.container.css({position:"relative",overflow:"hidden"});b.slides.css(d);b._currSlide=b.currSlide;c=a('<div class="cycle-carousel-wrap"></div>').prependTo(b.container).css({margin:0,padding:0,top:0,left:0,position:"absolute"}).append(b.slides);b._carouselWrap=c;if(!h){c.css("white-space","nowrap")}if(b.allowWrap!==false){for(f=0;f<(b.carouselVisible===undefined?2:1);f++){for(g=0;g<b.slideCount;g++){c.append(b.slides[g].cloneNode(true))}g=b.slideCount;while(g--){c.prepend(b.slides[g].cloneNode(true))}}c.find(".cycle-slide-active").removeClass("cycle-slide-active");b.slides.eq(b.startingSlide).addClass("cycle-slide-active")}if(b.pager&&b.allowWrap===false){l=b.slideCount-e;a(b.pager).children().filter(":gt("+l+")").hide()}b._nextBoundry=b.slideCount-b.carouselVisible;this.prepareDimensions(b)},prepareDimensions:function(f){var h,i,c,e;var b=f.carouselVertical;var g=f.carouselVisible||f.slides.length;if(f.carouselFluid&&f.carouselVisible){if(!f._carouselResizeThrottle){this.fluidSlides(f)}}else{if(f.carouselVisible&&f.carouselSlideDimension){h=g*f.carouselSlideDimension;f.container[b?"height":"width"](h)}else{if(f.carouselVisible){h=g*a(f.slides[0])[b?"outerHeight":"outerWidth"](true);f.container[b?"height":"width"](h)}}}i=(f.carouselOffset||0);if(f.allowWrap!==false){if(f.carouselSlideDimension){i-=((f.slideCount+f.currSlide)*f.carouselSlideDimension)}else{e=f._carouselWrap.children();for(var d=0;d<(f.slideCount+f.currSlide);d++){i-=a(e[d])[b?"outerHeight":"outerWidth"](true)}}}f._carouselWrap.css(b?"top":"left",i)},fluidSlides:function(f){var g;var b=f.slides.eq(0);var d=b.outerWidth()-b.width();var h=this.prepareDimensions;a(window).on("resize",c);f._carouselResizeThrottle=c;e();function c(){clearTimeout(g);g=setTimeout(e,20)}function e(){f._carouselWrap.stop(false,true);var i=f.container.width()/f.carouselVisible;i=Math.ceil(i-d);f._carouselWrap.children().width(i);if(f._sentinel){f._sentinel.width(i)}h(f)}},transition:function(b,m,g,e,k){var i,h={};var c=b.nextSlide-b.currSlide;var f=b.carouselVertical;var d=b.speed;if(b.allowWrap===false){e=c>0;var l=b._currSlide;var j=b.slideCount-b.carouselVisible;if(c>0&&b.nextSlide>j&&l==j){c=0}else{if(c>0&&b.nextSlide>j){c=b.nextSlide-l-(b.nextSlide-j)}else{if(c<0&&b.currSlide>j&&b.nextSlide>j){c=0}else{if(c<0&&b.currSlide>j){c+=b.currSlide-j}else{l=b.currSlide}}}}i=this.getScroll(b,f,l,c);b.API.opts()._currSlide=b.nextSlide>j?j:b.nextSlide}else{if(e&&b.nextSlide===0){i=this.getDim(b,b.currSlide,f);k=this.genCallback(b,e,f,k)}else{if(!e&&b.nextSlide==b.slideCount-1){i=this.getDim(b,b.currSlide,f);k=this.genCallback(b,e,f,k)}else{i=this.getScroll(b,f,b.currSlide,c)}}}h[f?"top":"left"]=e?("-="+i):("+="+i);if(b.throttleSpeed){d=(i/a(b.slides[0])[f?"height":"width"]())*b.speed}b._carouselWrap.animate(h,d,b.easing,k)},getDim:function(e,d,c){var b=a(e.slides[d]);return b[c?"outerHeight":"outerWidth"](true)},getScroll:function(f,c,e,b){var d,g=0;if(b>0){for(d=e;d<e+b;d++){g+=this.getDim(f,d,c)}}else{for(d=e;d>e+b;d--){g+=this.getDim(f,d,c)}}return g},genCallback:function(d,c,b,e){return function(){var g=a(d.slides[d.nextSlide]).position();var f=0-g[b?"top":"left"]+(d.carouselOffset||0);d._carouselWrap.css(d.carouselVertical?"top":"left",f);e()}},stopTransition:function(){var b=this.opts();b.slides.stop(false,true);b._carouselWrap.stop(false,true)},onDestroy:function(c){var b=this.opts();if(b._carouselResizeThrottle){a(window).off("resize",b._carouselResizeThrottle)}b.slides.prependTo(b.container);b._carouselWrap.remove()}}})(jQuery);