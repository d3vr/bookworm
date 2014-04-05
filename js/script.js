$(function(){
	// Variables used across the script
	var currSec = 0,
		numSec = $("section").length,
		canMove = true;

	// Scroll to top on page load
	$("html, body").stop().animate({scrollTop: 0}, 1);

	// Show the hint message after 1.5 seconds
	setTimeout(function(){
		$("#hint").fadeIn();
	}, 1500);

	// Handle the up/down keys
	$(window).on("keydown", function(e){
		var dir;
		switch (e.which){
			case 38: // up
				dir = 1;
				showPanel(dir);
				break;
			case 40: // up
				dir = -1;
				showPanel(dir);
				break;
		}
		e.preventDefault();
	})

	// Handle the mousewheel
	$(window).mousewheel(function(e, delta){
		showPanel(delta);
		e.preventDefault();
	})

	// Handle navigation links
	$("nav a").on("click", function(e){
		
		$("html, body").stop().animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 1500, "easeInOutExpo", function(){
			canMove = true;
		});
		currSec = $(this).parent().index();
		$("nav a").removeClass("active");
		$(this).addClass("active");
		e.preventDefault();
	})

	// Function to handle pannel scrolling
	// Takes dir param: 
	//		1  : up
	// 		-1 : down
	function showPanel(dir){
		var next;
		canMove = false;
		var add = 0;
		// Up
		if(dir==1){
			if(currSec!=0){
				currSec = next = currSec - 1;
			}

		// Down	
		}else if(dir==-1){
			if(currSec!=(numSec - 1)){
				currSec = next = currSec + 1;
			}
		}

		// If the next section was chosen, scroll to it
		if(typeof next!="undefined"){
			$("html, body").stop().animate({
			    scrollTop: $($("section").get(next)).offset().top + add
			}, 1500, "easeInOutExpo", function(){
				canMove = true;
			});

			// Updated the active link in the navigation bar
			$("nav a").removeClass("active");
			$($("nav a").get(next)).addClass("active");
		}
	}
})