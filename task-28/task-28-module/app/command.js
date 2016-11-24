import * as Adaptor from './adaptor';

// 指挥官模块, 通过操作面板控制飞船, 通过monitor面板获取飞船信息
// var Command = (function() {
    var controlPanel = document.querySelector('.plane-controls');
    var engineTypes = document.getElementsByName('engine-type');
    var powerTypes = document.getElementsByName('power-type');
    var planeArray = [false, false, false, false];

    controlPanel.addEventListener('click', function(e) {
        if (e.target.className === 'build-plane') {
            var data = {};
            var engineType = document.querySelector('input[name=engine-type]:checked').value;
            var powerType = document.querySelector('input[name=power-type]:checked').value;
            data.engine = engineType;
            data.power = powerType;
            for (var n = 0; n < planeArray.length; n++) {
                if (planeArray[n] === false) {
                    planeArray[n] = true;
                    Adaptor.handleCommand(n, data);
                    break;
                }
            }
            
        }
        if (e.target.className === 'takeoff' && planeArray[e.target.parentNode.dataset.index] === true) {
            var index = e.target.parentNode.dataset.index;
            Adaptor.handleCommand(index, 'takeoff');
        }
        if (e.target.className === 'stop' && planeArray[e.target.parentNode.dataset.index] === true) {
            var index = e.target.parentNode.dataset.index;
            Adaptor.handleCommand(index, 'stop');
        }
        if (e.target.className === 'destroy' && planeArray[e.target.parentNode.dataset.index] === true) {
            var index = e.target.parentNode.dataset.index;
            Adaptor.handleCommand(index, 'destroy');
            planeArray[index] = false;
        }
    });

    var updateMonitor = function(params) {
        params = Adaptor.transformBin2Obj(params);
        _renderMonitor(params);
    };

    var _renderMonitor = function(params) {
        // params: {planeNumber: 0, engineType: "前进号", powerType: "劲量型", takeoff: "停止中", curPower: 100}
        // var initParams = 
        var monitorTable = document.querySelector('.message-table');
        var cols = monitorTable.querySelectorAll('tr');
        var col = cols[params.planeNumber + 1];
        var tds = col.querySelectorAll('td');
        tds[1].innerText = params.engineType;
        tds[2].innerText = params.powerType;
        tds[3].innerText = params.takeoff;
        tds[4].innerText = params.curPower;
        if (!params.init) {
            tds[1].innerText = tds[2].innerText = tds[3].innerText = tds[4].innerText = '未初始化';
        }
    };

    export {
        updateMonitor
    }

// }());