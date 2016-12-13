import * as Adaptor from './adaptor';
import * as Bus from './bus';

var planeList = [
	                {init: false, takeoff: false, power: 100, timer: null, speed: 0, powerCost: 0, powerGene: 0},
	                {init: false, takeoff: false, power: 100, timer: null, speed: 0, powerCost: 0, powerGene: 0},
	                {init: false, takeoff: false, power: 100, timer: null, speed: 0, powerCost: 0, powerGene: 0},
	                {init: false, takeoff: false, power: 100, timer: null, speed: 0, powerCost: 0, powerGene: 0}
                ];

var init = function(data) {
    // 初始化飞船
    data = Adaptor.receiveInitOrder(data);
    var index = data.index;
    if (!planeList[index].init) {
    	var plane = document.createElement('div');
    	plane.classList.add('plane');
    	plane.classList.add(`plane${index}`);
    	plane.innerHTML = `<span class="energy-percent">100%</span><div class="energy full-energy"></div>`;
    	document.querySelector('.circuit3').appendChild(plane);
    	planeList[index].init = true;
        planeList[index].speed = data.speed;
        planeList[index].powerCost = data.power;
        planeList[index].powerGene = data.powerType;
        signalEmitter(index);
    }
};

var takeoff = function(index) {
	if (planeList[index].init && !planeList[index].takeoff) {
		var plane = document.querySelector('.plane' + index);
		var energy = plane.lastElementChild;
		var percent = plane.firstElementChild;
        var circuit = document.querySelector('.circuit' + index); // 飞机对应的轨道
        var diameter = circuit.getBoundingClientRect().width;
        plane.classList.add('animation-scale' + index);
        plane.style.animationDuration = diameter * Math.PI / planeList[index].speed + 's'; // 设定飞船的速度
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
        planeList[index].speed = 0;
        planeList[index].powerCost = 0;
        planeList[index].powerGene = 0;
    }
};

var receiveCommand = function(command) {
    // 接收bus传来的二进制命令, 由adaprot转成飞行器可以理解的命令格式
    Adaptor.receiveHandleCommand(command);
};

var signalEmitter = function(index) {
    planeList[index].monitorTimer = setInterval(function() {
        // 传给bus的对应模块
        Bus.monitor(Adaptor.monitorSignal(index, planeList[index]));
        if (planeList[index].init === false) {
            clearInterval(planeList[index].monitorTimer);
            planeList[index].monitorTimer = null;
        }
    }, 1000);
};

var _currentPower = function(index) {
    planeList[index].power += planeList[index].powerGene;
    if (planeList[index].takeoff) {
    	planeList[index].power -= planeList[index].powerCost;
    }
    planeList[index].power = planeList[index].power >= 100 ? 100 : planeList[index].power;
    planeList[index].power = planeList[index].power <= 0 ? 0 : planeList[index].power;
};

export {
	init,
	takeoff,
	stop,
	destroy,
    receiveCommand
}