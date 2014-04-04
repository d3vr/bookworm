$(function(){
	var currSec = 0,
		numSec = $("section").length,
		canMove = true;

	$("html, body").stop().animate({scrollTop: 0}, 1);
	$(window).on("keydown", function(e){
		var dir;
		switch (e.which){
			case 38: // up
				dir = 1;
				doIt(dir);
				break;
			case 40: // up
				dir = -1;
				doIt(dir);
				break;
		}
		e.preventDefault();
	})
	$(window).mousewheel(function(e, delta){
		doIt(delta);
		e.preventDefault();
	})

	function doIt(dir){
		// if(canMove){
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

			if(typeof next!="undefined"){
				$("html, body").stop().animate({
				    scrollTop: $($("section").get(next)).offset().top + add
				}, 1500, "easeInOutExpo", function(){
					canMove = true;
				});
			}
		// }
		console.log({canMove: canMove, next: next, dir: dir, currSec: currSec});
	}
})