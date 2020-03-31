```html
<div class="slider">
        <div id="slider">
          <div id="certify">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="img/slider1.png"  /></div>
                <div class="swiper-slide"><img src="img/slider2.png"  /></div>
                <div class="swiper-slide"><img src="img/slider3.png"  /></div>
                <div class="swiper-slide"><img src="img/slider4.png"  /></div>
                <div class="swiper-slide"><img src="img/slider5.png"  /></div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      
      
<style>
      
.slider{
  position: absolute;
  width: 100%;
  top: 50.5%;
  left: 0;
  overflow: hidden;
}
.btn-dot{
  position: absolute;
  left: 43%;
  bottom: -3.5%;
  width: 15%;
  z-index: 2006;
}
#slider{
  /* position: relative;
	left: 0;
	top: 0;
	z-index: 9999;
	width: 100vw; */
}
#certify .swiper-container{
  overflow: visible!important;
}

#certify .swiper-slide {
	margin-top: 14%;
	width: 3.5rem;
  text-align: center;
}

#certify .swiper-slide img {
	display: block;
  margin: 0 auto;
  width: 90%;
  -webkit-box-reflect: below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), color-stop(60%, transparent) , to(rgba(250, 250, 250, 0.1)));
}
.swiper-pagination{
  position: absolute;
  left: 41%;
  bottom: -5%;
}
.swiper-pagination-bullet{
  background: rgba(255,255,255,0.95);
  width: 7px;
  height: 7px;
  margin: 0 0.05rem;
}
.swiper-pagination-bullet-active{
  background: rgba(255,255,255,1);
  width: 10px;
  height: 10px;
}
</style>
```

```
var certifySwiper = new Swiper('#certify .swiper-container', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 5,
        autoplay: true,
        autoplay: {
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
        on: {
            progress: function (progress) {
                for (i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i);
                    var slideProgress = this.slides[i].progress;
                    modify = 1;
                    if (Math.abs(slideProgress) > 1) {
                        modify = (Math.abs(slideProgress) - 0) * 0.4 + .6;
                        // modify = Math.abs(slideProgress) * 0.5;
                    }
                    translate = slideProgress * modify * 1.91 + 'rem';
                    scale = 1 - Math.abs(slideProgress) / 9;
                    zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                    slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                    slide.css('zIndex', zIndex);
                    slide.css('opacity', 1);
                    if (Math.abs(slideProgress) > 3) {
                        slide.css('opacity', 0);
                    }
                }
            },
            setTransition: function (transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i)
                    slide.transition(transition);
                }

            }
        }

    })
```

