// 绑定操作面板
;(function() {
    var controlPanel = document.querySelector('.plane-controls');
    var engineTypes = document.getElementsByName('engine-type');
    var powerTypes = document.getElementsByName('power-type');
    var planeArray = [false, false, false, false];

    controlPanel.addEventListener('click', function(e) {
        if (e.target.className === 'build-plane') {
            var data = {};
            for (var engine of engineTypes) {
                if (engine.checked === true) {
                    data.engine = engine.value;
                }
            }
            for (var power of powerTypes) {
                if (power.checked === true) {
                    data.power = power.value;
                }
            }
            for (var n = 0; n < planeArray.length; n++) {
                if (planeArray[n] === false) {
                    planeArray[n] = true;
                    Adaptor.buildCommand(n, data);
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

    
}());