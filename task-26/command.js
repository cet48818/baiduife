// 绑定操作面板
;(function() {
    var controlPanel = document.querySelector('.plane-controls');

    controlPanel.addEventListener('click', function(e) {
        if (e.target.className === 'init') {
            var index = e.target.parentNode.dataset.index;
            Mediator.init({id: index, commond: 'init'});
        }
        if (e.target.className === 'takeoff') {
            var index = e.target.parentNode.dataset.index;
            Mediator.init({id: index, commond: 'takeoff'});
        }
        if (e.target.className === 'stop') {
            var index = e.target.parentNode.dataset.index;
            Mediator.init({id: index, commond: 'stop'});
        }
        if (e.target.className === 'destroy') {
            var index = e.target.parentNode.dataset.index;
            Mediator.init({id: index, commond: 'destroy'});
        }
    });
}());