/*

go
go [step]

tun lef
tun rig
tun bac

tra lef [step]
tra top [step]
tra rig [step]
tra bot [step]

mov lef [step]
mov top [step]
mov rig [step]
mov bot [step]

build
bru $color

mov to x,y

*/

var inputArea = document.querySelector('.input-area');
var btn = document.querySelector('.submitBtn');
var refreshBtn = document.querySelector('.refresh');
var container = document.querySelector('.main');
var lineArea = document.querySelector('.line-area');
var makeWallBtn = document.querySelector('.make-wall');
var grids;

var transitionFlag;
var spanCols;
var valueArr;
    
var makeGrids = (function() { // 制造格子
    var grids = document.querySelector('.grids');
    var str = '';
    for (var i=1; i<=10; i++) {
    	for (var j=1; j<=10; j++) {
            str += `<div class="grid" data-wall="0" data-left="${j}" data-top="${i}"></div>`;
    	}
    }

    grids.innerHTML = str;
}());

var inputAreaDisplay = (function() {
    // 每次案件时触发handleInput
    inputArea.addEventListener('keyup', function(e) {
        handleInput.call(this);
    });
    // 获得焦点时开启第一行标签
    inputArea.addEventListener('focus', function(e) {
        if (!this.value) {
            lineArea.innerHTML = '<span data-index="0">1</span>';
        }
    });
    // 没有任何输入并失去焦点时第一行标签消失
    inputArea.addEventListener('blur', function(e) { 
        if (!this.value) {
          lineArea.innerHTML = '';
        }
    });
    // 同步滚动
    inputArea.addEventListener('scroll', function(e) {
        lineArea.scrollTop = inputArea.scrollTop;
    });
    // 清除输入的内容
    refreshBtn.addEventListener('click', function(e) { 
        inputArea.value = '';
        lineArea.innerHTML = '';
});

      
var handleInput = function() {
// 处理命令输入栏
    var value = this.value;
    var arr = value.split(/\n/);
    var str = '';
    arr.forEach(function(item, index) {
        str += `<span data-index="${index}">${index+1}</span>`;
    });
    lineArea.innerHTML = str;
    lineArea.scrollTop = lineArea.scrollHeight - lineArea.clientHeight;
  }
}());

grids = document.querySelector('.grids');
grids.addEventListener('click', function(e) {
	var me = this;
	Square.buildClickWall.call(me, e);
});

btn.addEventListener('click', function(e) {
	var value = inputArea.value.trim();
    if (value) {
    	Square.handleCommand(value);
    }
});

makeWallBtn.addEventListener('click', function(e) {
    Square.buildRandomWall();
});

var Square = (function() {
    var container = document.querySelector('.main');
    var square = document.querySelector('.square');
        square.curTop = 0;
        square.curLeft = 0;
        square.curDeg = 0;
        square.curDirection = 'top';
        square.vTop = 0; // 虚拟位置计算
        square.vLeft = 0;
        square.vDeg = 0;
        square.vDirection = 'top';
    var patterns = [/^tun\s+(lef|rig|bac)$/i, /^go(\s+\d+)?$/i, /^tra\s+(lef|top|rig|bot)(\s+\d+)?$/i, /^mov\s+(lef|top|rig|bot)(\s+\d+)?$/i, /^mov\s+to\s+(\d+)\s*,\s*(\d+)\s*$/i, /^bru\s+(#[0-9a-fA-F]{3,6})$/];
    var timeout = 0; // 动画延时
    var timeInterval = 1000; // 每个动作执行时间
    var timer;
    var spanCols;
    var executeArr = []; // 执行数组, 解析出所有要执行的命令, 放入这个数组里
    var gridList = document.querySelectorAll('.grid');
    var wallFlag = true;

    var handleCommand = function(command) {
    	executeArr = [];
    	timeout = 0;
        var commandArr = command.split(/\n+/);
        var step;
        spanCols = lineArea.querySelectorAll('span');
        commandArr.forEach(function(item, index) {
        	item = item.trim();
            if (patterns[0].exec(item)) { // tun 命令; 将方向传进去
            	turn(patterns[0].exec(item)[1], true);  // 虚拟出square执行tun命令以后的角度
                executeArr.push(turn.bind(square, patterns[0].exec(item)[1]));
            } else if (patterns[1].exec(item)) { // go命令
            	if (patterns[1].exec(item)[1]) {
            		step = Number(patterns[1].exec(item)[1].trim());
            	} else { // 1步go命令
            		step = 1;
            	}
            	for (var i=0; i<step; i++) {
            		if (!hitDirection(step)) {
            			executeArr.push(go.bind(square));
            		} else {
            			break;
            		}
            		
            	}
            } else if (patterns[2].exec(item)) { // tra命令
            	var traceDirection = patterns[2].exec(item)[1].trim();
            	if (patterns[2].exec(item)[2]) {
            		step = Number(patterns[2].exec(item)[2].trim());
            	} else {
            		step = 1;
            	}
            	for (var i=0; i<step; i++) {
            		if (!hitDirection(step, traceDirection)) {
            			executeArr.push(trace.bind(square, traceDirection));
            		} else {
            			break;
            		}
            	}
            } else if (patterns[3].exec(item)) { // mov命令
            	var moveDirection = patterns[3].exec(item)[1].trim();
            	if (patterns[3].exec(item)[2]) {
                    step = Number(patterns[3].exec(item)[2].trim());
            	} else {
            		step = 1;
            	}
            	if (moveDirection !== square.vDirection) {
            		move(moveDirection, true);  // 虚拟出square执行tun命令以后的角度
            		executeArr.push(move.bind(square, moveDirection));
            	}
            	for (var i=0; i<step; i++) {
            		if (!hitDirection(step)) {
            			executeArr.push(go.bind(square));
            		} else {
            			break;
            		}
            	}
            } else if (item.trim().toLowerCase() === 'build') {
                build();
            	// executeArr.push(build.bind(square));

            } else if (patterns[4].exec(item)) { // mov to 命令
                var tarX = patterns[4].exec(item)[1];
                var tarY = patterns[4].exec(item)[2];
                var lis = findRoute(tarX, tarY); // 返回
                if (Array.isArray(lis)) {
                	while (lis.length > 0) {
	                	executeArr.push(lis.shift());
	                }
                } else {
                	console.log('无法到达此位置');
                }
                
            } else if (patterns[5].exec(item)) { // bru 命令
                if (patterns[5].exec(item)[1]) {
                    brush(patterns[5].exec(item)[1]);
                }
            } else {
            	if (spanCols[0]) {
            		spanCols[index].classList.add('error');
            	}
            }
        });
        // 执行任务队列
        if (executeArr.length > 0) {
        	var callbackFuc = function() {
                wallFlag = true; // 允许点击生成墙
        	};
        	executeArr.push(callbackFuc);
        }
        runCommand(executeArr);
    };

    var turn = function(direction, vitural=false) {
	    if (vitural === true) {
            switch (direction) {
		    	case 'lef': 
		    	    square.vDeg -= 90;
		            break;
		    	case 'rig':
		    	    square.vDeg += 90;
		    	    break;
		    	case 'bac':
		    	    square.vDeg += 180;
		    	    break;
		    }
		    changeCurDirection(square.vDeg, true);
	    } else {
	    	switch (direction) {
		    	case 'lef': 
		    	    square.curDeg -= 90;
		            break;
		    	case 'rig':
		    	    square.curDeg += 90;
		    	    break;
		    	case 'bac':
		    	    square.curDeg += 180;
		    	    break;
		    }
		    changeCurDirection(square.curDeg);
		    square.style.setProperty('transform', `rotate(${square.curDeg}deg)`);
	    }
	    
	    return true;
	};

    var go = function() {
        if (!baseMoving(square.curDirection)) {
        	return false;
        }
        return true;
    };

    var trace = function(direction) {
    	if (!baseMoving(direction)) {
        	return false;
        }
        return true;
    };

    var move = function(direction, vitural=false) {
        if (vitural === true) {
            switch(direction) {
                case 'top':
	        	    if (square.vDirection === 'rig') {
	        	    	turn('lef', true);
	        	    } else if (square.vDirection === 'bot') {
	        	    	turn('bac', true);
	        	    } else if (square.vDirection === 'lef') {
	        	    	turn('rig', true);
	        	    }
	        	    break;
	        	case 'rig':
		        	if (square.vDirection === 'bot') {
	        	    	turn('lef', true);
	        	    } else if (square.vDirection === 'lef') {
	        	    	turn('bac', true);
	        	    } else if (square.vDirection === 'top') {
	        	    	turn('rig', true);
	        	    }
	        	    break;
	        	case 'bot':
	        	    if (square.vDirection === 'rig') {
	        	    	turn('rig', true);
	        	    } else if (square.vDirection === 'top') {
	        	    	turn('bac', true);
	        	    } else if (square.vDirection === 'lef') {
	        	    	turn('lef', true);
	        	    }
	        	    break;
	        	case 'lef':
	        	    if (square.vDirection === 'top') {
                        turn('lef', true);
	        	    } else if (square.vDirection === 'rig') {
	        	    	turn('bac', true);
	        	    } else if (square.vDirection === 'bot') {
	        	    	turn('rig', true);
	        	    }
	        	    break;
            }
        } else {
        	switch (direction) {
	        	case 'top':
	        	    if (square.curDirection === 'rig') {
	        	    	turn('lef');
	        	    } else if (square.curDirection === 'bot') {
	        	    	turn('bac');
	        	    } else if (square.curDirection === 'lef') {
	        	    	turn('rig');
	        	    }
	        	    break;
	        	case 'rig':
		        	if (square.curDirection === 'bot') {
	        	    	turn('lef');
	        	    } else if (square.curDirection === 'lef') {
	        	    	turn('bac');
	        	    } else if (square.curDirection === 'top') {
	        	    	turn('rig');
	        	    }
	        	    break;
	        	case 'bot':
	        	    if (square.curDirection === 'rig') {
	        	    	turn('rig');
	        	    } else if (square.curDirection === 'top') {
	        	    	turn('bac');
	        	    } else if (square.curDirection === 'lef') {
	        	    	turn('lef');
	        	    }
	        	    break;
	        	case 'lef':
	        	    if (square.curDirection === 'top') {
                        turn('lef');
	        	    } else if (square.curDirection === 'rig') {
	        	    	turn('bac');
	        	    } else if (square.curDirection === 'bot') {
	        	    	turn('rig');
	        	    }
	        	    break;
	        }
        }
    };

    var buildRandomWall = function() {
    	var randomNum = Math.floor(Math.random() * 100);
    	var randomGrid = gridList[randomNum];
        if (Number(randomGrid.dataset.left) === square.curLeft + 1 && Number(randomGrid.dataset.top) === square.curTop + 1) {
        	return buildRandomWall();
        } else if (randomGrid.dataset.wall === "1") {
        	return buildRandomWall();
        } else {
        	randomGrid.classList.add('wall');
            randomGrid.dataset.wall = '1';
        }
    };

    var brush = function(color) {
        var SiblingGrid = getSiblingGrid('无法在边界外粉刷');
        var index = SiblingGrid.wallY * 10 + SiblingGrid.wallX;
        executeArr.push(brushWall.bind(square, index, color));

    };

    var build = function() {
        var SiblingGrid = getSiblingGrid('无法在边界外造墙');
        var index = SiblingGrid.wallY * 10 + SiblingGrid.wallX;
        executeArr.push(baseBuildWall.bind(square, index));
    };
    
    function getSiblingGrid(errStr) { // 计算square面对的grid位置
        var wallX, wallY;
        switch (square.vDirection) {
            case 'lef': 
                wallX = square.vLeft - 1;
                wallY = square.vTop;
                if (square.vLeft === 0) {
                    console.log(errStr);
                    return;
                }
                break;
            case 'top':
                wallX = square.vLeft;
                wallY = square.vTop - 1;
                if (square.vTop === 0) {
                    console.log(errStr);
                    return;
                }
                break;
            case 'rig':
                wallX = square.vLeft + 1;
                wallY = square.vTop;
                if (square.vLeft === 9) {
                    console.log(errStr);
                    return;
                }
                break;
            case 'bot':
                wallX = square.vLeft;
                wallY = square.vTop + 1;
                if (square.vTop === 9) {
                    console.log(errStr);
                    return;
                }
                break;
        }
        return {wallX, wallY};
    }

    function baseBuildWall(index) { 
        if (gridList[index].dataset.wall === '1') {
            console.log('已经有墙了');
            return;
        }
        gridList[index].classList.add('wall');
        gridList[index].dataset.wall = '1';
    }

    function brushWall(index, color) {
        console.log(color)
        if (gridList[index].dataset.wall === '1') {
            gridList[index].style.setProperty('background-color', color);
        } else {
            console.log('没有墙, 无法粉刷');
        }
    }
    
    var buildClickWall = function(e) {
    	if (wallFlag === true) {
    		var target = e.target;
            if (target.classList.contains('grid')) {
            	if (target.dataset.wall === '0') {
            		target.classList.add('wall');
            		target.dataset.wall = '1';
            	} else {
            		target.classList.remove('wall');
            		target.dataset.wall = '0';
            	}
            }
    	}
    };
    
    function runCommand(orderList) {
    	// var arg = Array.prototype.slice.call(arguments, 1);
        if (orderList.length > 0) {
        	wallFlag = false;
        	orderList.forEach(function(item) {
        		setTimeout(function() {
                    item();
        		}, timeout);
        		timeout += timeInterval;
        	});
        }
    }

    function changeCurDirection(deg, vitural=false) {
        if (vitural === true) {
            if (deg >= 0) {
	        	switch (deg % 360) {
	        		case 0:
	        		    square.vDirection = 'top';
	        		    break;
	        		case 90:
	        		    square.vDirection = 'rig';
	        		    break;
	        		case 180:
	        		    square.vDirection = 'bot';
	        		    break;
	        		case 270:
	        		    square.vDirection = 'lef';
	        		    break;
	        	}
	        } else {
	        	switch (deg % 360) {
	        		case 0:
		        	    square.vDirection = 'top';
		        	    break;
		        	case -90:
		        	    square.vDirection = 'lef';
		        	    break;
		        	case -180:
		        	    square.vDirection = 'bot';
		        	    break;
		        	case -270:
		        	    square.vDirection = 'rig';
		        	    break;
	        	}
	        }
        } else {
        	if (deg >= 0) {
	        	switch (deg % 360) {
	        		case 0:
	        		    square.curDirection = 'top';
	        		    break;
	        		case 90:
	        		    square.curDirection = 'rig';
	        		    break;
	        		case 180:
	        		    square.curDirection = 'bot';
	        		    break;
	        		case 270:
	        		    square.curDirection = 'lef';
	        		    break;
	        	}
	        } else {
	        	switch (deg % 360) {
	        		case 0:
		        	    square.curDirection = 'top';
		        	    break;
		        	case -90:
		        	    square.curDirection = 'lef';
		        	    break;
		        	case -180:
		        	    square.curDirection = 'bot';
		        	    break;
		        	case -270:
		        	    square.curDirection = 'rig';
		        	    break;
	        	}
	        }
        }
    }

    function baseMoving(direction) { // 基础运动, go, tra, mov通用
        var offset;
        var width = square.clientWidth;

        switch (direction) {
        	case 'top':
        	    square.curTop--;
        	    offset = square.curTop * width;
        	    square.style.setProperty('top', `${offset}px`);
        	    break;
        	case 'lef':
        	    square.curLeft--;
        	    offset = square.curLeft * width;
        	    square.style.setProperty('left', `${offset}px`);
        	    break;
        	case 'bot':
        	    square.curTop++;
        	    offset = square.curTop * width;
        	    square.style.setProperty('top', `${offset}px`);
        	    break;
        	case 'rig':
        	    square.curLeft++;
        	    offset = square.curLeft * width;
        	    square.style.setProperty('left', `${offset}px`);
        	    break;
        }
        return true;
    }

    function hitDirection(step, direction=square.vDirection) {
    	var walls;
    	// 为go函数准备的碰撞检测
    	// 检测是否会碰到墙或者边界, 如果会碰到, 就不执行指令
    	// 参数是要执行的步数和方向; 方向默认为square的vDirection(用于go)
        if (direction === 'top') {
        	walls = document.querySelectorAll(`.wall[data-left="${square.vLeft+1}"]`);
            if (walls.length > 0) {
	        	for (var wall of walls) {
	            	if (wall.dataset.top == square.vTop) { // 如果square要走的下一格有墙
	            		return true;
	            	}
	            }
            }
            if (square.vTop - 1 < 0) {
            	return true;
            }
            square.vTop--;
        } else if (direction === 'lef') {
            walls = document.querySelectorAll(`.wall[data-top="${square.vTop+1}"]`);
            if (walls.length > 0) {
            	for (var wall of walls) {
	            	if (wall.dataset.left == square.vLeft) {
	            		return true;
	            	}
	            }
            }
            if (square.vLeft - 1 < 0) {
                return true;
            }
            square.vLeft --;
        } else if (direction === 'bot') {
            walls = document.querySelectorAll(`.wall[data-left="${square.vLeft+1}"]`);
            if (walls.length > 0) {
            	for (var wall of walls) {
	            	if (wall.dataset.top == square.vTop + 2) {
	            		return true;
	            	}
	            }
            }
            if (square.vTop + 1 > 9) {
                return true;
            }
            square.vTop ++;
        } else if (direction === 'rig') {
            walls = document.querySelectorAll(`.wall[data-top="${square.vTop+1}"]`);
            if (walls.length > 0) {
            	for (var wall of walls) {
	            	if (wall.dataset.left == square.vLeft + 2) {
	            		return true;
	            	}
	            }
            }
            if (square.vLeft + 1 > 9) {
                return true;
            }
            square.vLeft ++;
        }

        return false; // 默认return false, 不会碰到
    }

    function findRoute (tarX, tarY) {

    	var openList = [];
    	var closeList = [];
        var currentList = [];
        var funcList = [];
        tarX = Number(tarX);
        tarY = Number(tarY);
    	if (tarX > 10 || tarX < 1) {
    		console.log('终点位置不正确');
    		return;
    	}
    	if (tarY > 10 || tarY < 1) {
    		console.log('终点位置不正确');
    		return;
    	}
    	console.log(tarX, tarY)
    	var index = (tarY-1) * 10 + tarX - 1;
    	if (gridList[index].classList.contains('wall')) {
            // 如果需要运动到的位置有墙, 则返回
    		return;
    	}

        var Node = function(left, top, parent) {
            this.left = Number(left);
            this.top = Number(top);
            this.index = (this.top - 1) * 10 + this.left - 1;
            this.grid = gridList[this.index];
            this.G = Math.abs(square.vLeft + 1 - this.left) + Math.abs(square.vTop + 1 - top);
            this.H = Math.abs(tarX - this.left) + Math.abs(tarY - this.top);
            this.F = this.G + this.H;
            this.parentGridNode = parent || null;
        };
        
        var currentNode = new Node(square.vLeft+1, square.vTop+1);

        var targetNode = new Node(tarX, tarY);
        targetNode.grid.dataset.target = '1'; // 标记目的地

        openList.push(currentNode);
        var nearestNode;
        while (currentNode.grid.dataset.target !== '1') {
            closeList.push(openList.shift()); // 将currentNode放入关闭列表
            var left = currentNode.left, top = currentNode.top;
            if (currentNode.left > 1) {
                currentNode.leftNode = new Node(left-1, top, currentNode);
                if (currentNode.leftNode.grid.dataset.wall === '1') {
                    currentNode.leftNode = null;
                }
                if (currentNode.leftNode) {
                    if (listCheck(currentNode.leftNode, openList, closeList)) { // 检测是否已经存在于开启列表或者在关闭刘表
                        openList.push(currentNode.leftNode);
                    }
                    
                }
            }
            if (currentNode.left < 10) {
                currentNode.rightNode = new Node(left+1, top, currentNode);
                if (currentNode.rightNode.grid.dataset.wall === '1') {
                    currentNode.rightNode = null;
                }
                if (currentNode.rightNode) {
                    if (listCheck(currentNode.rightNode, openList, closeList)) {
                        openList.push(currentNode.rightNode);
                    }
                }
            }
            if (currentNode.top > 1) {
                currentNode.topNode = new Node(left, top-1, currentNode);
                if (currentNode.topNode.grid.dataset.wall === '1') {
                    currentNode.topNode = null;
                }
                if (currentNode.topNode) {
                    if (listCheck(currentNode.topNode, openList, closeList)) {
                        openList.push(currentNode.topNode);
                    }
                }
            }
            if (currentNode.top < 10) {
                currentNode.bottomNode = new Node(left, top+1, currentNode);
                if (currentNode.bottomNode.grid.dataset.wall === '1') {
                    currentNode.bottomNode = null;
                }
                if (currentNode.bottomNode) {
                    if (listCheck(currentNode.bottomNode, openList, closeList)) {
                        openList.push(currentNode.bottomNode);
                    }
                }
            }

            if (openList.length === 0) {
                console.log('没有路线');
                return;
            }
            // 寻找openList里F值最低的;
            openList.sort(function(a, b) {
                return a.F - b.F;
            });
            currentNode = openList[0];
        }
        currentNode.grid.dataset.target = '0';

        while (currentNode.parentGridNode !== null) {
            currentList.unshift(currentNode);
            currentNode = currentNode.parentGridNode;
        }
        // currentList数组储存了需要经过的所有点
        // 转换成命令数组;
        currentList.forEach(function(item) {
            if (item.left > square.vLeft + 1) {
                // 向右
                funcList.push(trace.bind(square, 'rig'));
                square.vLeft++;
            } else if (item.left < square.vLeft + 1) {
                // 向左
                funcList.push(trace.bind(square, 'lef'));
                square.vLeft--;
            } else if (item.top > square.vTop + 1) {
                // 向下
                funcList.push(trace.bind(square, 'bot'));
                square.vTop++;
            } else if (item.top < square.vTop + 1) {
                // 向上
                funcList.push(trace.bind(square, 'top'));
                square.vTop--;
            }
        });
        return funcList;
    }
    
    function listCheck(node, openList, closeList) {
        if (openList.length > 0) {
            for (var item of openList) {
                if (item.left === node.left && item.top === node.top) {
                    return false;
                }
            }
        }
        if (closeList.length > 0) {
            for (var item of closeList) {
                if (item.left === node.left && item.top === node.top) {
                    return false;
                }
            }
        }
        return true;
    }

    return {
    	handleCommand: handleCommand,
    	buildRandomWall: buildRandomWall,
    	buildClickWall: buildClickWall
    }
}());