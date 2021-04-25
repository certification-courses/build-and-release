// detect Browser
( function ( $ ) {
	var ua = navigator.userAgent.toLowerCase(),
		match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
			/(webkit)[ \/]([\w.]+)/.exec(ua) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
			/(msie) ([\w.]+)/.exec(ua) ||
			ua.indexOf( "compatible" ) < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) || [],
		browser = match[ 1 ] || "",
		version =  match[ 2 ] || "0";
 
	jQuery.browser = {};
 
	if( browser ) {
		jQuery.browser[ browser ] = true;
		jQuery.browser.version = version;
	}
 
	// Chrome is Webkit, but Webkit is also Safari.
	if( jQuery.browser.chrome ) {
		jQuery.browser.webkit = true;
	} else if( jQuery.browser.webkit ) {
		jQuery.browser.safari = true;
	}
} )( jQuery );

jQuery( function( $ ) {

	var CHEF = window.CHEF || {};
	
	// tooltips
	CHEF.toolTips = function() {
		$( '.container' ).tooltip( {
			selector: "a[data-toggle=tooltip]"
		} );
		
		$('a[data-toggle=tooltip]')
			.mouseover( function() {
				$( 'i', this ).stop().animate( { opacity: 1 }, 100 ); 
			} )
			.mouseout( function() {
				$( 'i', this ).stop().animate( { opacity: 0.5 }, 100 );
			} );
	}
	
	// popovers
	CHEF.popOvers = function( e ) {
		$( '.k-pop-over' ).popover();
		$( '.k-pop-over' ).on( 'click', function( e ) {
			e.preventDefault();
		} );
	}
	
	// scroll to top
	CHEF.scrollPageToTop = function() {
		$( '#k-to-top' ).click( function(e) {
			$( 'body, html' ).animate( { scrollTop: 0 }, 400 );
			e.preventDefault();
		} );
	}
	
	// scroll to anchor
	CHEF.scrollAnchors = function() {
		var $root = $( 'html, body' );
		$( '#k-head a' ).click( function() {
			var href = $.attr( this, 'href' );
			if( href.substring( 0, 1 ) == '#' ) {
				$root.animate( {
					scrollTop: $( href ).offset().top
				}, 500, function() {
					window.location.hash = href;
				} );
				return false;
			}
		} );
	}
	
	// accordion
	CHEF.accordionIcon = function() {
		$( '.accordion-heading' ).delegate( '.k-accordion-btn', 'click', function(e) {
			if( $( 'i', this ).hasClass( 'k-ia-close' ) ) {
				$( 'i', this ).removeClass( 'k-ia-close' );
				$( 'i', this ).addClass( 'k-ia-open' );
			} else {
				$( 'i', this ).removeClass( 'k-ia-open' );
				$( 'i', this ).addClass( 'k-ia-close' );
			}
			$( '.k-accordion-btn' ).not( this ).each( function() { $( 'i', this ).removeClass( 'k-ia-open' ).addClass( 'k-ia-close' ); } );
			e.preventDefault();
		} );
	}
	
	// responsive videos
	CHEF.responsiveVideos = function() {
		$( '.video-container' ).fitVids( {
  			customSelector: "iframe[src^='http://blip.tv']" 
		} );
	}
	
	// google maps
	CHEF.googleMaps = function(){
		if( $( '.map' ).length > 0 ) {
	
			$( '.map' ).each( function( i, e ) {
	
				$gmap = $( e );
				$gmap_title = $gmap.attr( 'data-gmapTitle' );
				$gmap_id = $gmap.attr( 'id' );
				$gmap_lat = $gmap.attr( 'data-gmapLat' );
				$gmap_lng = $gmap.attr( 'data-gmapLon' );
				$gmap_zoom = parseInt( $gmap.attr( 'data-gmapZoom' ) );
				
				var latlng = new google.maps.LatLng( $gmap_lat, $gmap_lng );			
				var options = { 
					scrollwheel: false,
					draggable: false, 
					zoomControl: false,
					disableDoubleClickZoom: false,
					disableDefaultUI: true,
					zoom: $gmap_zoom,
					center: latlng,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				
				var styles = [ 
							  {
								featureType: "all",
								stylers: [
								  { saturation: -80 }
								]
							  },{
								featureType: "road.arterial",
								elementType: "geometry",
								stylers: [
								  { hue: "#82a536" },
								  { saturation: 40 }
								]
							  },{
								featureType: "poi.business",
								elementType: "labels",
								stylers: [
								  { visibility: "off" }
								]
							  }
							];
				
				var styledMap = new google.maps.StyledMapType( styles,{ name: "MULE Map" } );
				var map = new google.maps.Map( document.getElementById( $gmap_id ), options );
			
				var marker = new google.maps.Marker( {
					position: latlng,
					map: map,
					title: $gmap_title
				} );
				
				map.mapTypes.set( 'map_style', styledMap );
				map.setMapTypeId( 'map_style' );
				
				var contentString = '<strong>MULE.</strong><br />795 Folsom Ave, Suite 600<br />San Francisco, CA 94107<br />Phone: (123) 456-7890';
				var infowindow = new google.maps.InfoWindow( {
					content: contentString
				} );
				
				infowindow.open( map, marker ); // show info by default
				
				google.maps.event.addListener( marker, 'click', function() {
					infowindow.open( map, marker );
				} );
	
			} );
		}	
	}
	
	// video in modal
	CHEF.modalVideo = function() {
		if( $( '.modal-body' ).attr( 'data-video' ) ) {
			$( '.modal-body' ).each( function() {
				var myself = $( this );
				var parent = myself.parent();
				var video_src = myself.attr( 'data-video' );
				parent.on( 'show', function() { myself.html( video_src ); } );	
				parent.on( 'hide', function() { myself.html( '' ); } );
			} );
		}
	}
	
	// animated sidebar menu
	CHEF.animateMenu = function() {
		$('#k-menu li a')
			.mouseover( function() {
				$( 'i', this ).stop().animate( { opacity: 1 }, 400 );
				$( this ).stop().animate( { paddingLeft: 15 }, { duration: 100 } ); } )
			.mouseout( function() {
				$( 'i', this ).stop().animate( { opacity: 0.3 }, 400 );
				$( this ).stop().animate( { paddingLeft: 0 }, { duration: 100 } );
			} );
	}
	
	// main navig
	var mobileMenuClone = $( '#menu' ).clone().attr( 'id', 'navigation-mobile' );
	CHEF.mobileNav = function() {
		var windowWidth = $( window ).width();
		// Show Menu or Hide the Menu
		if( windowWidth <= 979 ) {
			if( $( '#mobile-nav' ).length > 0 ) {
				mobileMenuClone.insertAfter( '#k-main-navig' );
				$( '#navigation-mobile #menu-nav' ).attr( 'id', 'menu-nav-mobile' ).wrap( '<div class="container">' );
				$( '#navigation-mobile' ).removeClass( 'pull-right' );
			}
		} else {
			$( '#navigation-mobile' ).css( 'display', 'none' );
			$( '#navigation-mobile' ).addClass( 'pull-right' );
			if( $( '#mobile-nav' ).hasClass( 'open' ) ) $( '#mobile-nav' ).removeClass( 'open' );
		}
	}
	CHEF.listenerMenu = function() {
		$( '#mobile-nav' ).on( 'click', function(e) {
			$( this ).toggleClass( 'open' );
			$( '#navigation-mobile' ).stop().slideToggle( 350, 'easeOutExpo' );
			e.preventDefault();
		} );
	}
	
	
	/* FLEXSLIDER */
	$( window ).load( function() {
		if( $( '.flexslider' ).length ) {	
			$( '.flexslider' ).flexslider( {
				animation: 'fade',
				smoothHeight: true,
				slideshow: false,
				directionNav: false,
				animationSpeed: 300,
				controlsContainer: ".slider-prev-next-container"
			} );
			// custom next buttom
			$( '.flex-next-butt' ).click( function() {
				$( '.flexslider' ).flexslider( 'next' );
			} );
			// custom previous button
			$( '.flex-prev-butt' ).click( function() {
				$( '.flexslider' ).flexslider( 'prev' );
			} );
		}
		// animate prev and next buttons
		if( $( '#k-featured' ).find( '.flex-custom-direction-nav' ).length ) {	
			$( '#k-featured' )
				.mouseover( function() {
					$( '.flex-prev-butt', this ).stop().animate( { left: 20, opacity: 0.5 }, 20 );
					$( '.flex-next-butt', this ).stop().animate( { right: 20, opacity: 0.5 }, 20 ); } )
				.mouseout( function() {
					$( '.flex-prev-butt', this ).stop().animate( { left: -50, opacity: 0 }, 50 );
					$( '.flex-next-butt', this ).stop().animate( { right: -50, opacity: 0 }, 50 );
				} );
		}
		
	} );
	
	/* fancybox */
	CHEF.fancyBoxer = function(){
		if( $( '.fancybox' ).length > 0 || $( '.fancybox-media' ).length > 0 ) {
			
			$( '.fancybox' ).fancybox( {				
				padding : 0,
				helpers : {
					title : { type: 'inside' },
				}
			} );
				
			$( '.fancybox-media' ).fancybox( {
				padding : 0,
				openEffect  : 'none',
				closeEffect : 'none',
				helpers : {
					media : {}
				}
			} );

		}
	}
	
	/* init functions */
	$( document ).ready( function() {
		CHEF.mobileNav();
		CHEF.listenerMenu();
		CHEF.toolTips();
		CHEF.popOvers();
		CHEF.googleMaps();
		CHEF.scrollPageToTop();
		CHEF.scrollAnchors();
		CHEF.accordionIcon();
		CHEF.responsiveVideos();
		CHEF.modalVideo();
		CHEF.animateMenu();
		
		// fancybox
		CHEF.fancyBoxer();
		
		// handle border around img-circle for webkit browsers
		if( $.browser.webkit ) {
			$( 'img.img-circle' ).css( { 'border': 'none' } );
		}
	} );
	
	$( window ).resize( function() {
		CHEF.mobileNav();
	} );
	
	$( window ).scroll( function() {
		// scroll to top
		if( $( this ).scrollTop() > 640) $( '#k-to-top' ).fadeIn();
		else $( '#k-to-top' ).fadeOut();
	} );
	
	// smoothmenu init
	ddsmoothmenu.init( {
		mainmenuid: "menu", //menu DIV id
		orientation: 'h', //Horizontal or vertical menu: Set to "h" or "v"
		classname: 'ddsmoothmenu', //class added to menu's outer DIV
		//customtheme: ["#1c5a80", "#18374a"],
		contentsource: "markup" //"markup" or ["container_id", "path_to_menu_file"]
	} );
	
} );