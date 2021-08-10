/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/
side_menu_background = document.querySelector('.side_menu_background');
side_menu_bottom = document.querySelector('.side_menu_bottom')
side_menu = document.querySelector('.side_menu');
burger_btn = document.querySelector('.burger');
var sm_option = {                     // default options
    side_menu_open: 0,                // %
    side_menu_close: -100,            // %
    transitionDuration: 400,          // ms
    opacity: 0.5,                     // 0 To 1
    opacity_transitionDuration: 440   //  ms
};
var side_menu_scroll_active = false;
var side_menu_current_x = null;
var side_menu_start_x = null;
var side_menu_changeX = null;
var side_menu_active = false;
var side_menu_opacity = null;
var side_menu_scroll_stop;
var side_menu_timer;
/*-------------------------------------------------- open button --------------------------------------------------*/
burger_btn.addEventListener('click', side_menu_open);
/*-------------------------------------------------- close button --------------------------------------------------*/
side_menu_background.addEventListener('click', side_menu_close);
/*-------------------------------------------------- scroll start --------------------------------------------------*/
side_menu.addEventListener('scroll', function () {
    side_menu_scroll_active = true;
})
/*-------------------------------------------------- scroll stop --------------------------------------------------*/
side_menu.addEventListener('scroll', function () {
    clearTimeout(side_menu_scroll_stop);
    side_menu_scroll_stop = setTimeout(function () {
        side_menu_scroll_active = false;
    }, 350);
})
/*-------------------------------------------------- scroll start --------------------------------------------------*/
side_menu_bottom.addEventListener('scroll', function () {
    side_menu_scroll_active = true;
})
/*-------------------------------------------------- scroll stop --------------------------------------------------*/
side_menu_bottom.addEventListener('scroll', function () {
    clearTimeout(side_menu_scroll_stop);
    side_menu_scroll_stop = setTimeout(function () {
        side_menu_scroll_active = false;
    }, 350);
})
/*-------------------------------------------------- side_menu_open --------------------------------------------------*/
function side_menu_open() {
    side_menu.style.transitionDuration = sm_option.transitionDuration + 'ms';
    side_menu.style.transform = 'translateX(' + sm_option.side_menu_open + '%)';
    document.body.style.overflow = 'hidden';
    side_menu_background.style.display = 'block';
    side_menu_background.style.transitionDuration = sm_option.opacity_transitionDuration + 'ms';
    side_menu_background.style.opacity = sm_option.opacity;
    side_menu.classList.add('side_menu_shadow');
}
/*-------------------------------------------------- side_menu_close --------------------------------------------------*/
function side_menu_close() {
    clearTimeout(side_menu_timer);
    side_menu.style.transitionDuration = sm_option.transitionDuration + 'ms';
    side_menu.style.transform = 'translateX(' + sm_option.side_menu_close + '%)';
    side_menu_background.style.transitionDuration = sm_option.opacity_transitionDuration + 'ms';
    side_menu_background.style.opacity = 0;
    document.body.style.overflow = '';
    side_menu.classList.remove('side_menu_shadow');
    side_menu_timer = setTimeout(function () {
        side_menu_background.style.display = 'none';
        side_menu.scrollTop = 0;
        side_menu_bottom.scrollTop = 0;
    }, 445)
}
/*-------------------------------------------------- side_menu_fast_close --------------------------------------------------*/
function side_menu_fast_close(){
    clearTimeout(side_menu_timer);
    side_menu.style.transitionDuration = 300 + 'ms';
    side_menu.style.transform = 'translateX(' + sm_option.side_menu_close + '%)';
    document.body.style.overflow = '';
    side_menu_background.style.transitionDuration = 155 + 'ms';
    side_menu_background.style.opacity = 0;
    side_menu.classList.remove('side_menu_shadow');
    side_menu_timer = setTimeout(function () {
        side_menu_background.style.display = 'none';
        side_menu.scrollTop = 0;
        side_menu_bottom.scrollTop = 0;
    }, 160)
}
/*-------------------------------------------------- touchstart --------------------------------------------------*/
document.addEventListener('touchstart', function (event) {
    if (side_menu_scroll_active == false) {
        if (event.type === "touchstart") {
            let touch = event.touches[0];
            side_menu_start_x = touch.clientX;
        }
        if (event.target.id.includes('side_menu')) {
            side_menu_active = true;
        }
        side_menu_changeX = 0;
    }
})
/*-------------------------------------------------- touchmove --------------------------------------------------*/
document.addEventListener('touchmove', function (event) {
    if (side_menu_scroll_active == false) {
        if (side_menu_active == true) {
            if (event.type === "touchmove") {
                let touch = event.touches[0];
                side_menu_current_x = touch.clientX;
            }
            side_menu_changeX = (side_menu_current_x - side_menu_start_x);
            if ((Math.sign(side_menu_changeX)) == 1) { }
            else if ((Math.sign(side_menu_changeX)) == -1) {
                side_menu.style.transitionDuration = 0 + 's';
                side_menu.style.transform = 'translateX(' + side_menu_changeX + 'px)';
            }
            side_menu_opacity = Math.abs(side_menu.getBoundingClientRect().right / (side_menu.clientWidth / sm_option.opacity));
            side_menu_opacity = parseFloat(side_menu_opacity).toFixed(2);
            if (side_menu_opacity < 1 && side_menu_opacity > 0) {
                side_menu_background.style.transitionDuration = 0 + 's';
                if ((side_menu.getBoundingClientRect().right) < 2) {
                    side_menu_background.style.opacity = 0;
                }
                else if (side_menu_opacity <= sm_option.opacity) {
                    side_menu_background.style.opacity = side_menu_opacity;
                }
                else {
                    side_menu_background.style.opacity = sm_option.opacity;
                }
            }
        }
    }
    else {
        side_menu.style.transitionDuration = 0 + 'ms';
        side_menu.style.transform = 'translateX(' + sm_option.side_menu_open + '%)';
        side_menu_background.style.transitionDuration = 0 + 's';
        side_menu_background.style.opacity = sm_option.opacity;
    }
})
/*-------------------------------------------------- touchend --------------------------------------------------*/
document.addEventListener('touchend', function (event) {
    if (side_menu_scroll_active == false) {
        if (side_menu_active == true) {
            if (event.type === "touchend") {
                if (Math.abs(side_menu_changeX) == 0) { }
                else {
                    if (Math.abs(side_menu_changeX) < (side_menu.clientWidth / 2)) {
                        side_menu.style.transitionDuration = 150 + 'ms';
                        side_menu.style.transform = 'translateX(' + sm_option.side_menu_open + '%)';
                        document.body.style.overflow = 'hidden';
                        side_menu_background.style.display = 'block';
                        side_menu_background.style.transitionDuration = 155 + 'ms';
                        side_menu_background.style.opacity = sm_option.opacity;
                        side_menu.classList.add('side_menu_shadow');
                    }
                    else if (Math.abs(side_menu_changeX) > (side_menu.clientWidth / 2)) {
                        side_menu_fast_close()
                    }
                    else{
                        side_menu_fast_close()
                    }
                }
            }
            side_menu_active = false;
        }
    }
});
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------*/

navbar = document.querySelector('.navbar');
var navbar_height = navbar.clientHeight;
var current_scroll = 0;
var last_scroll = 0;

document.body.addEventListener('scroll' , function(){
  current_scroll = document.body.scrollTop;
  if(current_scroll < last_scroll){
    navbar.style.top = 0+'px';
    navbar.classList.add('shadow');
  }
  else{
    navbar.style.top = -(navbar_height)+'px';
    navbar.classList.remove('shadow');
  }
  if(current_scroll<20){
    navbar.classList.remove('shadow');
  }
  last_scroll = current_scroll;
})