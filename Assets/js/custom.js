// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});


/**
 * Execute stuff from the beginning, just one time :)
 */

$$.getJSON('http://localhost:3000/pictures', function (json) {
    console.log(json);
});

/**
 * Other functions
 */

//Slider
var pictures = myApp.swiper('.swiper-pictures', {
    speed: 200,
    spaceBetween: 0,
    resistance : true,
    resistanceRatio: 0.85,
    onSlideChangeStart: function (swiper) {

            //$$( ".view-main #login" ).html( $$( '.page-content .swiper-container .swiper-slide' ).eq( swiper.activeIndex ).attr( "data-login" )  + " - " + $$( '.page-content .swiper-container .swiper-slide' ).eq( swiper.activeIndex ).attr( "data-time" ) + "h" );
            $$( "#timeLine" ).val( $$( ".swiper-slide.position-" + swiper.activeIndex ).attr( "data-time" ) );

    },
});

// Vertical, 0px Between
var menu = myApp.swiper('.swiper-menu', {
  pagination:'.swiper-vertical .swiper-pagination',
  direction: 'vertical',
  spaceBetween: 0,
  speed: 400,
  onSlideChangeStart: function (swiper) {

            if ( swiper.activeIndex == 0 )
            {
                $$( "#icon-panel"  ).hide();
                $$( ".icon-take-picture"  ).hide();
                $$( ".range-slider"  ).hide();
            }
            else if ( swiper.activeIndex == 1 )
            {
                $$( "#icon-panel"  ).show();
                $$( ".range-slider"  ).show();
            }
            else if ( swiper.activeIndex == 2 )
            {
                $$( "#icon-panel"  ).hide();
                $$( ".icon-take-picture"  ).show();
                $$( ".range-slider"  ).hide();
            }
    },
});

menu.slideTo( 1, 0, true );

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked

    $$('.create-page').on('click', function () {
        createContentPage();
    });

});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}

// Custom handler

$$( '#timeLine' ).mousedown( function () {
    $$( ".timeLine-overlay" ).show();
    $$( ".timeLine-overlay" ).attr( "data-show", "true" );
});

$$( '#timeLine' ).mouseup( function () {
    $$( ".timeLine-overlay" ).hide();
    $$( ".timeLine-overlay" ).attr( "data-show", "false" );
});

$$( '#timeLine' ).mousemove( function () {

    if ( $$( ".timeLine-overlay" ).attr( "data-show") == "true" )
    {
        $$( ".timeLine-overlay" ).children( "span" ).html( $$( this ).val() + "h" );
        pictures.slideTo( $$( ".swiper-slide.time-" + $$( this ).val() ).attr( "data-position" ), 200, true);
    }
});