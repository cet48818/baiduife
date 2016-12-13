var Mediator = (function() {
	var successRate = 0.7;

	var init = function(order) {
		var rate = Math.random();
		if (rate < successRate) {
            setTimeout(function() {
            	var message = '飞船' + (order.id + 1) + '号' + order.commond + '指令成功';
            	console.log(message);
            	logMessage.outputMes(message);
                switch (order.commond) {
                	case 'init':
                	    Plane.init(order.id);
                	    break;
                	case 'takeoff':
                	    Plane.takeoff(order.id);
                	    break;
                	case 'stop':
                	    Plane.stop(order.id);
                	    break;
                	case 'destroy':
                	    Plane.destroy(order.id);
                	    break;
                } 
            }, 1000);
		} else {
			var message = '飞船' + (order.id + 1) + '号' + order.commond + '指令丢包';
            console.log(message);
            logMessage.outputMes(message, 'alertMes');
		}
	};

	
    
    return {
    	init: init
    }
}());