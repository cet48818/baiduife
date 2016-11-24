var Plane = (function() {
	var planeList = [
		                {init: false, takeoff: false, power: 100, timer: null},
		                {init: false, takeoff: false, power: 100, timer: null},
		                {init: false, takeoff: false, power: 100, timer: null},
		                {init: false, takeoff: false, power: 100, timer: null}
	                ];

    var init = function(index) {
        if (!planeList[index].init) {
        	var plane = document.createElement('div');
        	plane.classList.add('plane');
        	plane.classList.add(`plane${index}`);
        	plane.innerHTML = `<span class="energy-percent">100%</span><div class="energy full-energy"></div>`;
        	document.querySelector('.circuit4').appendChild(plane);
        	planeList[index].init = true;
        }
    };

    var takeoff = function(index) {
    	if (planeList[index].init && !planeList[index].takeoff) {
    		var plane = document.querySelector('.plane' + index);
    		var energy = plane.lastElementChild;
    		var percent = plane.firstElementChild;
            plane.classList.add('animation-scale' + index);
            plane.style.animationPlayState = 'running';
            planeList[index].takeoff = true;
            planeList[index].timer = window.setInterval(function() {
            	_currentPower(index);
                energy.style.width = planeList[index].power + '%';
                percent.innerText = planeList[index].power + '%';
                if (planeList[index].power < 20) {
                	energy.classList.remove('full-energy');
                	energy.classList.remove('medium-energy');
                	energy.classList.add('low-energy');
                } else if (planeList[index].power >= 20 && planeList[index].power < 60) {
                	energy.classList.remove('low-energy');
                	energy.classList.remove('full-energy');
                	energy.classList.add('medium-energy');
                } else {
                	energy.classList.remove('low-energy');
                	energy.classList.remove('medium-energy');
                	energy.classList.add('full-energy');
                }
                if (planeList[index].power === 0) {
                	stop(index);
                }
                // console.log(planeList[index].timer)
                if (planeList[index].power === 100) {
                	clearInterval(planeList[index].timer);
                }
            }, 1000);
    	}
        
    };

    var stop = function(index) {
    	if (planeList[index].init && planeList[index].takeoff) {
            var plane = document.querySelector('.plane' + index);
            plane.style.animationPlayState = 'paused';
            planeList[index].takeoff = false;
    	}
    }

    var destroy = function(index) {
        if (planeList[index].init) {
        	var plane = document.querySelector('.plane' + index);
        	plane.parentNode.removeChild(plane);
        	planeList[index].init = false;
        	planeList[index].takeoff = false;
        	planeList[index].power = 100;
        	planeList[index].timer = null;
        }
    };

    var _currentPower = function(index) {
    	// 消耗: 每秒-5%; 充电: 每秒+2%;
        planeList[index].power += 2;
        if (planeList[index].takeoff) {
        	planeList[index].power -= 5;
        }
        planeList[index].power = planeList[index].power >= 100 ? 100 : planeList[index].power;
        planeList[index].power = planeList[index].power <= 0 ? 0 : planeList[index].power;
    };

    return {
    	init: init,
    	takeoff: takeoff,
    	stop: stop,
    	destroy: destroy
    }
}());