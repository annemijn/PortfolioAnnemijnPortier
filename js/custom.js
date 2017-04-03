jQuery(document).ready(function() {
	var play_animation_cookie = getCookie("play_animation");
	console.log(play_animation_cookie);
	if ( play_animation_cookie == "" ) {
		jQuery(".the-intro-animation").delay(10000).show();
		setCookie("play_animation", "done");
	}

	var time = 0;
	$('#drawings1, #drawings2,#drawings3,#drawings4,#drawings5').each(function() 
	{	
		$(this).delay(time).fadeIn(2000);
		time += 1000;
	});
		$(window).scroll( function() 
	{  
        if ( $(window).scrollTop() > 2100 ) 
		{  
  			$(".titelme").animate({left:560, opacity:"show"}, 1600);
			$("#mefoto").animate({opacity:"show"}, 1600);
			$(".metext").animate({opacity:"show"}, 1600);
   		}
	});
	
	/* Teamtekst fades in van links als je scrollt.  */
	$(".container").animate({left:640, opacity:"show"}, 4000)
	
    jQuery('.home-feature-block-new').hover(function() {
        jQuery('.home-feature-block-new').addClass('home-feature-block-nohover');
        jQuery(this).removeClass('home-feature-block-nohover');
    }, function() {
        jQuery('.home-feature-block-new').removeClass('home-feature-block-nohover');
    });
	
    // Remove Attributes
    jQuery('.single-page-blog-extra a').removeAttr('href');
    jQuery(".single-page-content .gallery a img").removeAttr('alt');
    jQuery(".single-page-content .gallery a img").parent().removeAttr('title');
    // Adjust Single Page Gallery
    var gallery_count = 1;
    jQuery(".single-page-content .gallery").each(function() {
	    jQuery(this).find("a img").parent().attr('rel', 'prettyPhoto[]');
	    jQuery(this).find(".gallery-item").each(function() {
		    if(!(gallery_count % 3)) {
			    jQuery(this).before("<div class='clearboth'></div>");
			    jQuery(this).addClass("gallery-fullwidth");
		    }
		    gallery_count = gallery_count + 1;
	    });
	    jQuery(this).append('<div class="clearboth"></div>');
    });
	
	// ScrollTo Top Button
	jQuery('.scroll-up-btn').hover(function() {
		jQuery(this).find('span').stop().animate( { height: '160px' }, 200);
		jQuery(this).find('span').css("background-position", "0px 0px");
	}, function() {
		jQuery(this).find('span').stop().animate( { height: '0px' }, 200);
		jQuery(this).find('span').css("background-position", "-49px 0px");
	});
    jQuery(".scroll-up-btn").bind("click", function() {
        jQuery.scrollTo(0, 1000);
    });
    jQuery(window).scroll(function(){
	    if (jQuery(this).scrollTop() > 400) {
		    jQuery('.scroll-up-btn').fadeIn();
	    } else {
		    jQuery('.scroll-up-btn').fadeOut();
	    }
    });
	
	// Clients Carousel
    jQuery(".clients-carousel").carouFredSel({
        width: "100%",
        height: "variable",
		responsive: true,
        items: {
            visible: 1,
            start: "random"
        },
		pagination: {
			container: '#pager'
		},
        scroll: {
            items: 1,
            fx: "crossfade",
            duration: 500
        },
        auto: 15000
    });
    
	// Twitter Carousel
	jQuery('.twitter-stream .profile-link').remove();
    jQuery(".twitter-stream").carouFredSel({
        width: "100%",
        height: "variable",
        items: {
            visible: 1
        },
        scroll: {
            items: 1,
            fx: "crossfade",
            duration: 500
        },
        auto: 15000
    });
	
    jQuery('.clients-drop').click(function() {
	   jQuery('.clients-drop-block').toggle();
    });
	
    jQuery(".portfolio-categories span").on("click", function() {
	    var cat = jQuery(this).attr("id");
	    jQuery(".loader").show();
	    jQuery(".portfolio-categories span").each(function() {
		    jQuery(this).removeClass("selected");
		    jQuery(".block-big-listing-"+jQuery(this).attr("id")).hide();
		    jQuery(".block-big-listing-"+jQuery(this).attr("id")).find(".list-big-block").css("opacity", 0);
		    jQuery("#desc_"+jQuery(this).attr("id")).removeClass("selected");
	    });
	    jQuery(this).addClass("selected");
	    jQuery("#desc_"+jQuery(this).attr("id")).addClass("selected");
	    if (jQuery(".block-big-listing-"+cat).length) {
		    jQuery(".block-big-listing-"+cat).show();
		    draw_big_portfolios(jQuery(".block-big-listing-"+cat+" .list-big-block-a"), jQuery(".block-big-listing-"+cat+" .list-big-block-b"));
		    fadeInAndRemove(jQuery('.block-big-listing-'+cat+' .list-big-block'));
		    jQuery(".loader").hide();
	    } else {
		    jQuery("<div class='block-big-listing-"+cat+" list-hex-grid list-inline-block clearfix' ></div>").insertAfter(".block-big-listing");
		    create_new_product_list(jQuery(".block-big-listing ."+cat), ".block-big-listing-"+cat);
		    jQuery(".block-big-listing-"+cat).show();
		    draw_big_portfolios(jQuery(".block-big-listing-"+cat+" .list-big-block-a"), jQuery(".block-big-listing-"+cat+" .list-big-block-b"));
		    fadeInAndRemove(jQuery('.block-big-listing-'+cat+' .list-big-block'));
		    jQuery(".loader").hide();
	    }
	    jQuery('.footer').waypoint(function() {
		    jQuery('.footer').waypoint("disable");
	    }, { offset: 400 });
    });
	
    jQuery("#blog_count").val(8);
    // Select Blog Category
    jQuery(".blog-categories span").on("click", function() {
	    var cat = jQuery(this).attr("id");
	    jQuery(".loader").show();
	    jQuery(".blog-categories span").each(function() {
		    jQuery(this).removeClass("selected");
		    jQuery(".block-big-listing").hide();
	    });
	    jQuery(this).addClass("selected");
	    var current_count = parseFloat($("#blog_count").val());
	    jQuery.ajax({
		    url     : "/wp-admin/admin-ajax.php?action=blog_cat_request",
		    type    : "POST",
		    timeout : 20000,
		    data    : ({count : current_count,
					cat : cat}),
		    dataType: "html",
		    error   : function(XMLHttpRequest, textStatus, errorThrown) {
					    alert(errorThrown);
				      },
		    success : function(response) {
					    jQuery("#blog_count").val(current_count);
					    jQuery(".block-big-listing").empty().show();
					    jQuery(".block-big-listing").html(response);
					    draw_big_portfolios(jQuery(".list-big-block-a"), jQuery(".list-big-block-b"));
					    fadeInAndRemove(jQuery('.block-big-listing .list-big-block'));
					    jQuery(".loader").hide();
					    if (current_count >= parseInt(jQuery("#blog_total_count").val())) {
						    jQuery(".load-more-blog").hide();
					    } else {
						    jQuery(".load-more-blog").show();
					    }
				    }
	    });
    });
    // Load more blogs
    jQuery(".load-more-blog").on("click", function() {
	    var cat = "";
	    jQuery(".loader").show();
	    jQuery(".blog-categories span").each(function() {
		    if (jQuery(this).hasClass("selected")) {
			    cat = jQuery(this).attr("id");
		    }
	    });
	    
	    jQuery(".block-big-listing").hide();
	    jQuery(this).addClass("selected");
	    var current_count = parseFloat($("#blog_count").val()) + 8;
	    jQuery.ajax({
		    url     : "/wp-admin/admin-ajax.php?action=blog_cat_request",
		    type    : "POST",
		    timeout : 20000,
		    data    : ({count : current_count,
					cat : cat}),
		    dataType: "html",
		    error   : function(XMLHttpRequest, textStatus, errorThrown) {
					    alert(errorThrown);
				      },
		    success : function(response) {
					    jQuery("#blog_count").val(current_count);
					    jQuery(".block-big-listing").empty().show();
					    jQuery(".block-big-listing").html(response);
						var imgLoad = imagesLoaded('.block-big-listing');
						imgLoad.on( 'always', function() {
						  for ( var i = 0, len = imgLoad.images.length; i < len; i++ ) {
							var image = imgLoad.images[i];
						  }
						  draw_big_portfolios(jQuery(".list-big-block-a"), jQuery(".list-big-block-b"));
						
							fadeInAndRemove(jQuery('.block-big-listing .list-big-block'));
							jQuery(".loader").hide();
							if (current_count >= parseInt(jQuery("#blog_total_count").val())) {
								jQuery(".load-more-blog").hide();
							} else {
								jQuery(".load-more-blog").show();
							}
						});
						
						/*imagesLoaded( ".block-big-listing", function() {
							draw_big_portfolios(jQuery(".list-big-block-a"), jQuery(".list-big-block-b"));
						
							fadeInAndRemove(jQuery('.block-big-listing .list-big-block'));
							jQuery(".loader").hide();
							if (current_count >= parseInt(jQuery("#blog_total_count").val())) {
								jQuery(".load-more-blog").hide();
							} else {
								jQuery(".load-more-blog").show();
							}
						});*/
					    
				    }
	    });
    });
    
    // Single Page Next / Previous Buttons
    var prev_post_width = jQuery(".single-prev-post > a").width();
    var next_post_width = jQuery(".single-next-post > a").width();
    var prev_link = jQuery(".single-prev-post > a").attr("href");
    var next_link = jQuery(".single-next-post > a").attr("href");
    jQuery(".single-prev-post > a").css("left", "-" + (prev_post_width + 120) + "px");
    jQuery(".single-next-post > a").css("right", "-" + (next_post_width + 120) + "px");
    jQuery(".single-next-post > a, .single-prev-post > a").css("opacity", "1");
    
    jQuery(".single-prev-post span a").attr("href", prev_link);
    jQuery(".single-next-post span a").attr("href", next_link);
    
    if(prev_link) {
	    jQuery('.single-prev-post').mouseover(function(){
		    jQuery(this).find('a').stop().animate({ left: 0 }, 300);
			jQuery('.single-prev-post > a').css("opacity", "1");
	    }).mouseout(function(){
		    jQuery(this).find('a').stop().animate({ left: "-" + (prev_post_width + 120) }, 300);
			jQuery('.single-prev-post > a').css("opacity", "0.2");
	    });
    } else {
	    jQuery('.single-prev-post').hide();
    }
    if(next_link) {
	    jQuery('.single-next-post').mouseover(function(){
		    jQuery(this).find('a').stop().animate({ right: 0 }, 300);
			jQuery('.single-next-post > a').css("opacity", "1");
	    }).mouseout(function(){
		    jQuery(this).find('a').stop().animate({ right: "-" + (next_post_width + 120) }, 300);
			jQuery('.single-next-post > a').css("opacity", "0.2");
	    });
    } else {
	    jQuery('.single-next-post').hide();
    }
    var images = new Array();
    jQuery(".wpinstagram li").each(function(i) {
	    images[i] = jQuery(this).find("img").attr("src");
    });
    
    //jQuery(".contact-instagram").hide();
    jQuery(".contact-instagram").empty().append("<div class='sub-title'><span><h3 class='colorwhite'>#INSTAPEOPLE</h3></span></div>");
    var container = ".contact-instagram";
    var count = 4;
    var portfolio_count = 0;
    var all_portfolio_count = images.length;
    var loop_counter = 1;
    
    for (var i = 0; i < all_portfolio_count; i++) {
	    var current_wrap = count == 4 ? "a" : "b";   
	    var alt_wrap = count == 4 ? "b" : "a";
	    if (portfolio_count == 0) {
		    jQuery('<div class="list-block-row-a"></div>').appendTo(jQuery(container));
		    portfolio_count++;
	    }
	    //var new_block = '<a class="list-block-a hexagon" rel="prettyPhoto[]" href="'+images[i]+'"><canvas id="list-block" class="list-block" width="472" height="430" style="width:236px; height:215px;"><img id="list-img" class="list-img" src="'+images[i]+'" /></canvas></a>';
        var new_block = '<a class="list-block-a hexagon"><canvas id="list-block" class="list-block" width="472" height="430" style="width:236px; height:215px;"><img id="list-img" class="list-img" src="'+images[i]+'" /></canvas></a>';
	    var new_position = jQuery(container+" .list-block-row-"+current_wrap).last();
	    new_position.append(new_block);
	    jQuery(new_position).find(".list-big-block").css("opacity", 0);
	    if (jQuery(new_position).find(".hexagon").hasClass("list-block-"+alt_wrap)) {
		    jQuery(new_position).find(".hexagon").removeClass("list-block-"+alt_wrap).addClass("list-block-"+current_wrap);
	    }
	    if ((portfolio_count == count) || (loop_counter == all_portfolio_count)) {
		    jQuery('<div class="clearboth"></div>').appendTo(jQuery(container+" .list-block-row-"+current_wrap).last());
		    count = count == 4 ? 3 : 4;
		    if (loop_counter < all_portfolio_count) {
			    var new_row = count == 4 ? "a" : "b";
			    jQuery('<div class="list-block-row-'+new_row+'"></div>').appendTo(jQuery(container));
			    portfolio_count = 0;
		    }
	    }
	    portfolio_count++;
	    loop_counter++;
    }
	
    // PrettyPhoto
    jQuery("a[rel^='prettyPhoto']").prettyPhoto({
		theme: 'light_square',
        overlay_gallery: false,
		markup: '<div class="pp_pic_holder"> \
						<div class="ppt">&nbsp;</div> \
						<div class="pp_top"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
						<div class="pp_content_container"> \
							<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_close" href="#">Close</a> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<a href="#" class="pp_arrow_previous">Previous</a> \
												<p class="currentTextHolder">0/0</p> \
												<a href="#" class="pp_arrow_next">Next</a> \
											</div> \
											<p class="pp_description"></p> \
											{pp_social} \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',
        social_tools: false
    });
});

function create_new_product_list(lis, container) {
	var count = 3;
	var portfolio_count = 0;
	var all_portfolio_count = lis.length;
	var loop_counter = 1;
	lis.each(function() {
		var current_wrap = count == 3 ? "a" : "b";   
		var alt_wrap = count == 3 ? "b" : "a";
		if (portfolio_count == 0) {
			jQuery('<div class="list-big-block-row-a"></div>').appendTo(jQuery(container));
			portfolio_count++;
		}
		var new_block = jQuery(this).clone();
		var new_position = jQuery(container+" .list-big-block-row-"+current_wrap).last();
		new_block.appendTo(new_position);
		new_position.find(".list-big-block").css("opacity", 0);
		if (new_position.find(".hexagon").hasClass("list-big-block-"+alt_wrap)) {
			new_position.find(".hexagon").removeClass("list-big-block-"+alt_wrap).addClass("list-big-block-"+current_wrap);
		}
		if ((portfolio_count == count) || (loop_counter == all_portfolio_count)) {
			jQuery('<div class="clearboth"></div>').appendTo(jQuery(container+" .list-big-block-row-"+current_wrap).last());
			count = count == 3 ? 2 : 3;
			if (loop_counter < all_portfolio_count) {
				var new_row = count == 3 ? "a" : "b";
				jQuery('<div class="list-big-block-row-'+new_row+'"></div>').appendTo(jQuery(container));
				portfolio_count = 0;
			}
		}
		portfolio_count++;
		loop_counter++;
	});
}

jQuery(window).scroll(function() {
    var scroll = jQuery(window).scrollTop();
    if (scroll <= 50) {
        jQuery(".sticky-nav").animate({ top: "-65px" }, { duration: 180, queue: false });
        jQuery(".navigation").removeClass("sticky-nav");
    } else {
        jQuery(".navigation").addClass("sticky-nav");
        jQuery(".sticky-nav").delay(400).animate({ top: "0px" }, { duration: 180, queue: false });
    }
});


jQuery(window).resize(function () {
    
    
    
}).resize();


jQuery(window).load(function() {
    
    //jQuery('.navigation').waypoint(function() {
    //    jQuery(this).addClass('sticky-nav');
    //}, { offset: 400 });
    
	// Home page features
    var isGrowing=!1;
    var screenWidth = jQuery(".home-features").width();
    var splitWidth = Math.ceil(screenWidth / 4);
    var animationBigWidth = splitWidth + 200;
    var animationSmallWidth = (screenWidth - 200) / 4;
    var featureInnerWidth = screenWidth + 100;
    
	jQuery('.home-features').waypoint(function() {
		jQuery(".home-features").fadeIn();
		jQuery('.home-features').waypoint("disable");
		fadeInAndRemove(jQuery('.home-features-inner .home-feature-block'));
	
		jQuery(".home-features-inner").css("width", featureInnerWidth + "px");
		jQuery(".home-feature-block").css("width", splitWidth + "px");
		
		window.setTimeout(function() {
			jQuery(".home-feature-block").css("opacity", 1);
			jQuery('.home-feature-block').hover(function() {
			 isGrowing || (isGrowing = !0,
					   jQuery('.home-feature-block').stop().animate({ width: animationSmallWidth }, { duration: 200, queue: false }),
					   jQuery(this).stop().animate({ width: animationBigWidth + "px" }, { duration: 200, queue: false }));
					   //jQuery(this).find('.feature-block-over').stop().animate({"bottom": "0px"}, 200));
			}, function() {
			isGrowing && (isGrowing = !1,
					  jQuery('.home-feature-block').stop().animate({ width: splitWidth + "px" }, { duration: 200, queue: false }));
					  //jQuery(this).find('.feature-block-over').stop().animate({"bottom": "-345px"}, 200));
			});
		}, 400);
	}, { offset: 1000 });
    
	// Small Hexagons (Home)
	jQuery(".list-block-a").each(function() {
		var ctx = jQuery(this).find('#list-block')[0].getContext('2d');
	  
		var img = jQuery(this).find("#list-img");
		ctx.clearRect(0,0,664,640);
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(472,0);
		ctx.lineTo(472,332);
		ctx.lineTo(236,430);
		ctx.lineTo(0,332);
		ctx.clip();
		ctx.drawImage(img[0],0,0,472,430);
	});
	jQuery(".list-block-b").each(function() {
		var ctx = jQuery(this).find('#list-block')[0].getContext('2d');
	  
		var img = jQuery(this).find("#list-img");
		ctx.clearRect(0,0,664,640);
		ctx.beginPath();
		ctx.moveTo(0,98);
		ctx.lineTo(236,0);
		ctx.lineTo(472,98);
		ctx.lineTo(472,430);
		ctx.lineTo(0,430);
		ctx.clip();
		ctx.drawImage(img[0],0,0,472,430);
	});
	jQuery('.block-listing').waypoint(function() {
		jQuery('.block-listing').waypoint("disable");
		fadeInAndRemove(jQuery('.block-listing .list-block'));
	}, { offset: 600 });
	
	
	// Big Hexagons (Portfolio, Latest News)
	draw_big_portfolios(jQuery(".list-big-block-a"), jQuery(".list-big-block-b"));
	
	jQuery('.block-big-listing').waypoint(function() {
		jQuery(".portfolio-categories, .blog-categories").fadeIn();
		jQuery(".portfolio-list .portfolio-category-desc").fadeIn();
		jQuery('.block-big-listing').waypoint("disable");
		fadeInAndRemove(jQuery('.block-big-listing .list-big-block'));
	}, { offset: 600 });
	jQuery('.footer').waypoint(function() {
		jQuery('.footer').waypoint("disable");
	}, { offset: 400 });
	
	
	var current_hash = location.hash;
	if (current_hash != "") {
	    jQuery(".primary-cats").each(function() {
		var cat= jQuery(this).attr("id");
		if ("#"+cat == current_hash) {
		    jQuery(".loader").show();
		    jQuery(".portfolio-categories span").each(function() {
			    jQuery(this).removeClass("selected");
			    jQuery(".block-big-listing-"+jQuery(this).attr("id")).hide();
			    jQuery(".block-big-listing-"+jQuery(this).attr("id")).find(".list-big-block").css("opacity", 0);
			    jQuery("#desc_"+jQuery(this).attr("id")).removeClass("selected");
		    });
		    jQuery(this).addClass("selected");
		    jQuery("#desc_"+jQuery(this).attr("id")).addClass("selected");
		    if (jQuery(".block-big-listing-"+cat).length) {
			    jQuery(".block-big-listing-"+cat).show();
			    draw_big_portfolios(jQuery(".block-big-listing-"+cat+" .list-big-block-a"), jQuery(".block-big-listing-"+cat+" .list-big-block-b"));
			    fadeInAndRemove(jQuery('.block-big-listing-'+cat+' .list-big-block'));
			    jQuery(".loader").hide();
		    } else {
			    jQuery("<div class='block-big-listing-"+cat+" list-hex-grid list-inline-block clearfix' ></div>").insertAfter(".block-big-listing");
			    create_new_product_list(jQuery(".block-big-listing ."+cat), ".block-big-listing-"+cat);
			    jQuery(".block-big-listing-"+cat).show();
			    draw_big_portfolios(jQuery(".block-big-listing-"+cat+" .list-big-block-a"), jQuery(".block-big-listing-"+cat+" .list-big-block-b"));
			    fadeInAndRemove(jQuery('.block-big-listing-'+cat+' .list-big-block'));
			    jQuery(".loader").hide();
		    }
		    jQuery('.footer').waypoint(function() {
			    jQuery('.footer').waypoint("disable");
		    }, { offset: 400 });
		}
		jQuery.scrollTo('320', 200);
	    });
	}
    
    jQuery('.the-intro-animation').delay(500).fadeOut(200);
});

function draw_big_portfolios(a, b) {
	a.each(function() {
		var ctx = jQuery(this).find('#list-big-block')[0].getContext('2d');
	  
		var img = jQuery(this).find("#list-big-img");
	  
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(642,0);
		ctx.lineTo(642,530);
		ctx.lineTo(320,664);
		ctx.lineTo(0,530);
		ctx.clip();
		ctx.drawImage(img[0],0,0,642,664);
	});
	b.each(function() {
		var ctx = jQuery(this).find('#list-big-block')[0].getContext('2d');
	  
		var img = jQuery(this).find("#list-big-img");
	  
		ctx.beginPath();
		ctx.moveTo(0,134);
		ctx.lineTo(320,0);
		ctx.lineTo(640,134);
		ctx.lineTo(640,664);
		ctx.lineTo(0,664);
		ctx.clip();
		ctx.drawImage(img[0],0,0,640,664);
	});
}


function fadeInAndRemove(lis) {
	var show = Math.floor(Math.random() * (lis.length - 1));
	jQuery(lis).eq(show).fadeTo(400, 1);
	lis[show] = null;
	lis = cleanArray(lis);
	if ( lis.length === 0 ) {
		return;
	}
	window.setTimeout(function() {
		fadeInAndRemove(lis);
	}, 100);
}

function cleanArray(actual){
  var newArray = new Array();
  for(var i = 0; i<actual.length; i++){
      if (actual[i]){
        newArray.push(actual[i]);
    }
  }
  return newArray;
}

function loadScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?libraries=drawing,geometry,places&sensor=false&callback=initialize";
    document.body.appendChild(script);
}
window.onload = loadScript;

// location variables
var location_map;
var location_marker;

function initialize() {
	var locationLatLng = new google.maps.LatLng(-33.9269, 18.44582);
	location_geocoder = new google.maps.Geocoder();
	var map_style = [ { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "visibility": "on" }, { "color": "#808080" } ] },{ "featureType": "landscape.man_made", "elementType": "geometry", "stylers": [ { "color": "#e5e5e5" } ] },{ "featureType": "road.arterial", "elementType": "labels.text.stroke", "stylers": [ { "color": "#808080" } ] },{ "featureType": "road.highway", "stylers": [ { "color": "#828282" } ] } ];
	
	var locationOptions = {
		zoom: 17,
		center: locationLatLng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	location_map = new google.maps.Map(document.getElementById("map_location_canvas"), locationOptions);
	location_map.setOptions({styles: map_style});
	
	var location_marker = new google.maps.Marker({
		map: location_map,
		position: locationLatLng
		//icon: "http://andpeople.kairaweb.com/wp-content/themes/andpeople/images/map_icon.png"
	});
}

function setCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + 1800000);
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";

}
