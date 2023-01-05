/*! nanoScrollerJS - v0.8.4 - (c) 2014 James Florentino; Licensed MIT */

!function(a){return"function"==typeof define&&define.amd?define(["jquery"],function(b){return a(b,window,document)}):a(jQuery,window,document)}(function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H;z={paneClass:"nano-pane",sliderClass:"nano-slider",contentClass:"nano-content",iOSNativeScrolling:!1,preventPageScrolling:!1,disableResize:!1,alwaysVisible:!1,flashDelay:1500,sliderMinHeight:20,sliderMaxHeight:null,documentContext:null,windowContext:null},u="scrollbar",t="scroll",l="mousedown",m="mouseenter",n="mousemove",p="mousewheel",o="mouseup",s="resize",h="drag",i="enter",w="up",r="panedown",f="DOMMouseScroll",g="down",x="wheel",j="keydown",k="keyup",v="touchmove",d="Microsoft Internet Explorer"===b.navigator.appName&&/msie 7./i.test(b.navigator.appVersion)&&b.ActiveXObject,e=null,D=b.requestAnimationFrame,y=b.cancelAnimationFrame,F=c.createElement("div").style,H=function(){var a,b,c,d,e,f;for(d=["t","webkitT","MozT","msT","OT"],a=e=0,f=d.length;f>e;a=++e)if(c=d[a],b=d[a]+"ransform",b in F)return d[a].substr(0,d[a].length-1);return!1}(),G=function(a){return H===!1?!1:""===H?a:H+a.charAt(0).toUpperCase()+a.substr(1)},E=G("transform"),B=E!==!1,A=function(){var a,b,d;return a=c.createElement("div"),b=a.style,b.position="absolute",b.width="100px",b.height="100px",b.overflow=t,b.top="-9999px",c.body.appendChild(a),d=a.offsetWidth-a.clientWidth,c.body.removeChild(a),d},C=function(){var a,c,d;return c=b.navigator.userAgent,(a=/(?=.+Mac OS X)(?=.+Firefox)/.test(c))?(d=/Firefox\/\d{2}\./.exec(c),d&&(d=d[0].replace(/\D+/g,"")),a&&+d>23):!1},q=function(){function j(d,f){this.el=d,this.options=f,e||(e=A()),this.$el=a(this.el),this.doc=a(this.options.documentContext||c),this.win=a(this.options.windowContext||b),this.body=this.doc.find("body"),this.$content=this.$el.children("."+f.contentClass),this.$content.attr("tabindex",this.options.tabIndex||0),this.content=this.$content[0],this.previousPosition=0,this.options.iOSNativeScrolling&&null!=this.el.style.WebkitOverflowScrolling?this.nativeScrolling():this.generate(),this.createEvents(),this.addEvents(),this.reset()}return j.prototype.preventScrolling=function(a,b){if(this.isActive)if(a.type===f)(b===g&&a.originalEvent.detail>0||b===w&&a.originalEvent.detail<0)&&a.preventDefault();else if(a.type===p){if(!a.originalEvent||!a.originalEvent.wheelDelta)return;(b===g&&a.originalEvent.wheelDelta<0||b===w&&a.originalEvent.wheelDelta>0)&&a.preventDefault()}},j.prototype.nativeScrolling=function(){this.$content.css({WebkitOverflowScrolling:"touch"}),this.iOSNativeScrolling=!0,this.isActive=!0},j.prototype.updateScrollValues=function(){var a,b;a=this.content,this.maxScrollTop=a.scrollHeight-a.clientHeight,this.prevScrollTop=this.contentScrollTop||0,this.contentScrollTop=a.scrollTop,b=this.contentScrollTop>this.previousPosition?"down":this.contentScrollTop<this.previousPosition?"up":"same",this.previousPosition=this.contentScrollTop,"same"!==b&&this.$el.trigger("update",{position:this.contentScrollTop,maximum:this.maxScrollTop,direction:b}),this.iOSNativeScrolling||(this.maxSliderTop=this.paneHeight-this.sliderHeight,this.sliderTop=0===this.maxScrollTop?0:this.contentScrollTop*this.maxSliderTop/this.maxScrollTop)},j.prototype.setOnScrollStyles=function(){var a;B?(a={},a[E]="translate(0, "+this.sliderTop+"px)"):a={top:this.sliderTop},D?(y&&this.scrollRAF&&y(this.scrollRAF),this.scrollRAF=D(function(b){return function(){return b.scrollRAF=null,b.slider.css(a)}}(this))):this.slider.css(a)},j.prototype.createEvents=function(){this.events={down:function(a){return function(b){return a.isBeingDragged=!0,a.offsetY=b.pageY-a.slider.offset().top,a.slider.is(b.target)||(a.offsetY=0),a.pane.addClass("active"),a.doc.bind(n,a.events[h]).bind(o,a.events[w]),a.body.bind(m,a.events[i]),!1}}(this),drag:function(a){return function(b){return a.sliderY=b.pageY-a.$el.offset().top-a.paneTop-(a.offsetY||.5*a.sliderHeight),a.scroll(),a.contentScrollTop>=a.maxScrollTop&&a.prevScrollTop!==a.maxScrollTop?a.$el.trigger("scrollend"):0===a.contentScrollTop&&0!==a.prevScrollTop&&a.$el.trigger("scrolltop"),!1}}(this),up:function(a){return function(){return a.isBeingDragged=!1,a.pane.removeClass("active"),a.doc.unbind(n,a.events[h]).unbind(o,a.events[w]),a.body.unbind(m,a.events[i]),!1}}(this),resize:function(a){return function(){a.reset()}}(this),panedown:function(a){return function(b){return a.sliderY=(b.offsetY||b.originalEvent.layerY)-.5*a.sliderHeight,a.scroll(),a.events.down(b),!1}}(this),scroll:function(a){return function(b){a.updateScrollValues(),a.isBeingDragged||(a.iOSNativeScrolling||(a.sliderY=a.sliderTop,a.setOnScrollStyles()),null!=b&&(a.contentScrollTop>=a.maxScrollTop?(a.options.preventPageScrolling&&a.preventScrolling(b,g),a.prevScrollTop!==a.maxScrollTop&&a.$el.trigger("scrollend")):0===a.contentScrollTop&&(a.options.preventPageScrolling&&a.preventScrolling(b,w),0!==a.prevScrollTop&&a.$el.trigger("scrolltop"))))}}(this),wheel:function(a){return function(b){var c;if(null!=b)return c=b.delta||b.wheelDelta||b.originalEvent&&b.originalEvent.wheelDelta||-b.detail||b.originalEvent&&-b.originalEvent.detail,c&&(a.sliderY+=-c/3),a.scroll(),!1}}(this),enter:function(a){return function(b){var c;if(a.isBeingDragged)return 1!==(b.buttons||b.which)?(c=a.events)[w].apply(c,arguments):void 0}}(this)}},j.prototype.addEvents=function(){var a;this.removeEvents(),a=this.events,this.options.disableResize||this.win.bind(s,a[s]),this.iOSNativeScrolling||(this.slider.bind(l,a[g]),this.pane.bind(l,a[r]).bind(""+p+" "+f,a[x])),this.$content.bind(""+t+" "+p+" "+f+" "+v,a[t])},j.prototype.removeEvents=function(){var a;a=this.events,this.win.unbind(s,a[s]),this.iOSNativeScrolling||(this.slider.unbind(),this.pane.unbind()),this.$content.unbind(""+t+" "+p+" "+f+" "+v,a[t])},j.prototype.generate=function(){

/* nK fix GENERATE function */
/* RTL compatibility added */
var checkRtl = a('html').hasClass('rtl');

var _a, c, d, f, g, h, i;
return f = this.options, h = f.paneClass, i = f.sliderClass, _a = f.contentClass, (g = this.$el.children("." + h)).length || g.children("." + i).length || this.$el.append('<div class="' + h + '"><div class="' + i + '" /></div>'), this.pane = this.$el.children("." + h), this.slider = this.pane.find("." + i), 0 === e && C() ? (d = b.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, ""),
c = checkRtl?{ left: -14, paddingLeft: +d + 14}:{ right: -14, paddingRight: +d + 14})
: e && (c = checkRtl?{ left: -e }:{ right: -e },
this.$el.addClass("has-scrollbar")), null != c && this.$content.css(c), this


},j.prototype.restore=function(){this.stopped=!1,this.iOSNativeScrolling||this.pane.show(),this.addEvents()},j.prototype.reset=function(){var a,b,c,f,g,h,i,j,k,l,m,n;return this.iOSNativeScrolling?void(this.contentHeight=this.content.scrollHeight):(this.$el.find("."+this.options.paneClass).length||this.generate().stop(),this.stopped&&this.restore(),a=this.content,f=a.style,g=f.overflowY,d&&this.$content.css({height:this.$content.height()}),b=a.scrollHeight+e,l=parseInt(this.$el.css("max-height"),10),l>0&&(this.$el.height(""),this.$el.height(a.scrollHeight>l?l:a.scrollHeight)),i=this.pane.outerHeight(!1),k=parseInt(this.pane.css("top"),10),h=parseInt(this.pane.css("bottom"),10),j=i+k+h,n=Math.round(j/b*j),n<this.options.sliderMinHeight?n=this.options.sliderMinHeight:null!=this.options.sliderMaxHeight&&n>this.options.sliderMaxHeight&&(n=this.options.sliderMaxHeight),g===t&&f.overflowX!==t&&(n+=e),this.maxSliderTop=j-n,this.contentHeight=b,this.paneHeight=i,this.paneOuterHeight=j,this.sliderHeight=n,this.paneTop=k,this.slider.height(n),this.events.scroll(),this.pane.show(),this.isActive=!0,a.scrollHeight===a.clientHeight||this.pane.outerHeight(!0)>=a.scrollHeight&&g!==t?(this.pane.hide(),this.isActive=!1):this.el.clientHeight===a.scrollHeight&&g===t?this.slider.hide():this.slider.show(),this.pane.css({opacity:this.options.alwaysVisible?1:"",visibility:this.options.alwaysVisible?"visible":""}),c=this.$content.css("position"),("static"===c||"relative"===c)&&(m=parseInt(this.$content.css("right"),10),m&&this.$content.css({right:"",marginRight:m})),this)},j.prototype.scroll=function(){return this.isActive?(this.sliderY=Math.max(0,this.sliderY),this.sliderY=Math.min(this.maxSliderTop,this.sliderY),this.$content.scrollTop(this.maxScrollTop*this.sliderY/this.maxSliderTop),this.iOSNativeScrolling||(this.updateScrollValues(),this.setOnScrollStyles()),this):void 0},j.prototype.scrollBottom=function(a){return this.isActive?(this.$content.scrollTop(this.contentHeight-this.$content.height()-a).trigger(p),this.stop().restore(),this):void 0},j.prototype.scrollTop=function(a){return this.isActive?(this.$content.scrollTop(+a).trigger(p),this.stop().restore(),this):void 0},j.prototype.scrollTo=function(a){return this.isActive?(this.scrollTop(this.$el.find(a).get(0).offsetTop),this):void 0},j.prototype.stop=function(){return y&&this.scrollRAF&&(y(this.scrollRAF),this.scrollRAF=null),this.stopped=!0,this.removeEvents(),this.iOSNativeScrolling||this.pane.hide(),this},j.prototype.destroy=function(){return this.stopped||this.stop(),!this.iOSNativeScrolling&&this.pane.length&&this.pane.remove(),d&&this.$content.height(""),this.$content.removeAttr("tabindex"),this.$el.hasClass("has-scrollbar")&&(this.$el.removeClass("has-scrollbar"),this.$content.css({right:""})),this},j.prototype.flash=function(){return!this.iOSNativeScrolling&&this.isActive?(this.reset(),this.pane.addClass("flashed"),setTimeout(function(a){return function(){a.pane.removeClass("flashed")}}(this),this.options.flashDelay),this):void 0},j}(),a.fn.nanoScroller=function(b){return this.each(function(){var c,d;if((d=this.nanoscroller)||(c=a.extend({},z,b),this.nanoscroller=d=new q(this,c)),b&&"object"==typeof b){if(a.extend(d.options,b),null!=b.scrollBottom)return d.scrollBottom(b.scrollBottom);if(null!=b.scrollTop)return d.scrollTop(b.scrollTop);if(b.scrollTo)return d.scrollTo(b.scrollTo);if("bottom"===b.scr
/*
 *
 * sidebar sidebar
 *
 */
!function($) {
  "use strict";

  var sidebar = function(element, options) {
    this.options    = options;
    this.$sidebar       = $(element);
    this.$content   = this.$sidebar.find('~ .content-wrap');
    this.$nano      = this.$sidebar.find(".nano");
    this.$html      = $('html');
    this.$body      = $('body');
    this.$window    = $(window);

    // set in true when first time were clicked on toggle button
    this.changed    = false;

    this.init();
  };

  sidebar.DEFAULTS = {
    // duration od animations
    duration: 300,

    // set small sidebar when window width < resizeWnd
    resizeWnd: 1000
  };

  sidebar.prototype.init = function() {
    var _this = this;

    // no transition enable
    _this.$body.addClass('sidebar-notransition');

    // init Nano Scroller
    _this.$nano.nanoScroller({ preventPageScrolling: true });

    // sidebar toggle
    $('.sidebar-toggle').on( 'click', function(e) {
      e.preventDefault();
      _this.togglesidebar();
    });

    // hide sidebar when push content overlay
    _this.$content.on( 'click', function() {
      if( _this.isHideOnContentClick() ) {
        _this.hidesidebar();
      }
    })

    // toggle sub menus
    _this.$sidebar.on('click', 'li a.sidebar-sub-toggle', function(e) {
      e.preventDefault();
      _this.toggleSub($(this));
    });

    if( _this.showType() == 'push' && _this.isShow()) {
      _this.$body.css('overflow', 'hidden');
    }

    // init gesture swipes
    if( _this.$sidebar.hasClass('sidebar-gestures') ) {
      _this.useGestures();
    }

    // on window resize - set small sidebar
    _this.$window.on('resize', function() {
      _this.windowResize();
    });
    
    _this.windowResize();

    // no transition disable
    setTimeout(function() {
      _this.$body.removeClass('sidebar-notransition');
    }, 1);
  }

  sidebar.prototype.isShow = function() {
    return !this.$body.hasClass('sidebar-hide');
  }

  // check show type
  sidebar.prototype.showType = function() {
    if(this.$sidebar.hasClass('sidebar-overlay')) return 'overlay';
    if(this.$sidebar.hasClass('sidebar-push')) return 'push';
    if(this.$sidebar.hasClass('sidebar-shrink')) return 'shrink';
  };


  // check if hide on content click
  sidebar.prototype.isHideOnContentClick = function() {
    return this.$sidebar.hasClass('sidebar-overlap-content');
  }

  // check if sidebar static position
  sidebar.prototype.isStatic = function() {
    return this.$sidebar.hasClass('sidebar-static');
  }


  sidebar.prototype.togglesidebar = function(type) {
    var _this = this;
    var show = !_this.isShow();

    if(type) {
      if(
        (type=='show' && !show)
        || (type=='hide' && show)) {
        return;
      }
    }

    _this.options.changed = true;

    if( show ) {
      _this.showsidebar();
    } else {
      _this.hidesidebar();
    }
  }

  sidebar.prototype.showsidebar = function() {
    var _this = this;

    _this.$body.removeClass('sidebar-hide');

    if( _this.showType() == 'push'/* && !_this.isStatic() */) {
      _this.$body.css('overflow', 'hidden');
    }

    setTimeout(function() {
      // restore scroller on normal sidebar after end animation (300ms)
      _this.$nano.nanoScroller();

      // resize for charts reinit
      _this.$window.resize();
    }, _this.options.duration);
  }

  sidebar.prototype.hidesidebar = function() {
    var _this = this;

    _this.$body.addClass('sidebar-hide');

    // destroy scroller on hidden sidebar
    _this.$nano.nanoScroller({ destroy: true });

    // resize for charts reinit
    setTimeout(function() {
      if( _this.showType() == 'push'/* && !_this.isStatic() */) {
        _this.$body.css('overflow', 'visible');
      }
      _this.$window.resize();
    }, _this.options.duration);
  }


  // toggle submenu [open or close]
  sidebar.prototype.toggleSub = function(toggle) {
    var _this = this;

    var toggleParent = toggle.parent();
    var subMenu = toggleParent.find('> ul');
    var opened = toggleParent.hasClass('open');

    if(!subMenu.length) {
      return;
    }

    // close
    if(opened) {
      _this.closeSub(subMenu);
    }

    // open
    else {
      _this.openSub(subMenu, toggleParent);
    }
  }

  // close submenus
  sidebar.prototype.closeSub = function(subMenu) {
    var _this = this;

    subMenu.css('display', 'block').stop()
      .slideUp(_this.options.duration, 'swing', function() {
      // close child dropdowns
      $(this).find('li a.sidebar-sub-toggle').next().attr('style', '');

      // reinit nano scroller
      _this.$nano.nanoScroller();
    });
    
    subMenu.parent().removeClass('open');
    subMenu.find('li a.sidebar-sub-toggle').parent().removeClass('open');
  }

  // open submenus
  sidebar.prototype.openSub = function(subMenu, toggleParent) {
    var _this = this;

    subMenu
      .css('display', 'none').stop()
      .slideDown(_this.options.duration, 'swing', function() {
        // reinit nano scroller
        _this.$nano.nanoScroller();
      });
    toggleParent.addClass('open');

    _this.closeSub( toggleParent.siblings('.open').find('> ul') );
  }

  // use gestures for show / hide menu
  sidebar.prototype.useGestures = function() {
    var _this = this;
    var touchStart = 0;
    var startPoint = 0; // x position
    var endPoint = 0; // x position

    // on touch start
    _this.$window.on('touchstart', function(e) {
      startPoint = (e.originalEvent.touches?e.originalEvent.touches[0]:e).pageX;
      endPoint = (e.originalEvent.touches?e.originalEvent.touches[0]:e).pageX;
      touchStart = 1;
    });

    // on swipe start
    _this.$window.on('touchmove', function(e) {
      if( touchStart ) {
        endPoint = (e.originalEvent.touches?e.originalEvent.touches[0]:e).pageX;
      }
    });

    // on swipe end
    _this.$window.on('touchend', function(e) {
      if( touchStart ) {
        var resultSwipe = startPoint - endPoint,
            rtl = _this.$html.hasClass('rtl');

        touchStart = 0;

        // swipe min width 100px
        if( Math.abs( resultSwipe ) < 100 ) {
          return;
        }

        // change values if rtl
        if( rtl ) {
          resultSwipe *= -1;
          startPoint = _this.$window.width() - startPoint;
        }

        // from left to right
        if(resultSwipe < 0) {
          // show only when touch started from left corner
          if( startPoint < 40 ) {
            _this.showsidebar();
          }
        }

        // from right to left
        else {
          _this.hidesidebar();
        }
      }
    });
  }

  // on resize window and on start
  var resizeTimer;
  sidebar.prototype.windowResize = function() {
    var _this = this;

    // if user currently changed size of sidebar, stop change it
    if(!_this.options.changed) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if(_this.$window.width() < _this.options.resizeWnd) {
          _this.togglesidebar('hide');
        }
      }, 50);
    }
  };




  // init
  $('.sidebar').each(function() {
    var options = $.extend({}, sidebar.DEFAULTS, $(this).data(), typeof option == 'object' && option);
    var cursidebar = new sidebar(this, options);
  });

}(jQuery);oll)return d.scrollBottom(0);if("top"===b.scroll)return d.scrollTop(0);if(b.scroll&&b.scroll instanceof a)return d.scrollTo(b.scroll);if(b.stop)return d.stop();if(b.destroy)return d.destroy();if(b.flash)return d.flash()}return d.reset()})},a.fn.nanoScroller.Constructor=q});