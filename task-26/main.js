// 鼠标拖曳
;(function() {
    var titles = document.querySelectorAll('.title');
    var curLeft, curTop, distanceX, distanceY, parentNode;
    titles = Array.from(titles);
    for (var title of titles) {
    	title.addEventListener('dragstart', function(e) {
    		e.dataTransfer.dropEffect = 'move';
    		parentNode = this.parentNode;
            var curX = e.clientX;
            var curY = e.clientY;
            // getComputedStyle有兼容性问题, 如果没有显示定义left/top值的话, IE的结果会是'auto'
            // curLeft = parseInt(getComputedStyle(parentNode).getPropertyValue('left'));
            // curTop = parseInt(getComputedStyle(parentNode).getPropertyValue('top'));  
            curLeft = parentNode.getBoundingClientRect().left + parentNode.offsetWidth/2;
            curTop = parentNode.getBoundingClientRect().top;  
            // 鼠标点到的位置到父元素边界的距离
            distanceX = curX - curLeft;
            distanceY = curY - curTop;
    	});
    	title.addEventListener('drag', function(e) {
            parentNode.style.left = e.clientX - distanceX + 'px';
            parentNode.style.top = e.clientY - distanceY + 'px';
    	});
    	title.addEventListener('dragend', function(e) {
            parentNode.style.left = e.clientX - distanceX + 'px';
            parentNode.style.top = e.clientY - distanceY + 'px';
    	});
    	document.addEventListener('dragover', function(e) {
            e.preventDefault();
    	});
    }
})();
// 控制台输出
var logMessage = (function() {
    var outputArea = document.querySelector('.message-area');
    var outputMessage = function(message, alertMes) {
        alertMes = alertMes || null;
        var messageArea = document.createElement('div');
        messageArea.setAttribute('class', 'mes');
        if (alertMes) {
            messageArea.classList.add('alertMes');
        }
        messageArea.innerText = message;
        outputArea.appendChild(messageArea);
        outputArea.scrollTop = outputArea.scrollHeight;
    }
    
    return {
        outputMes: outputMessage
    }
}());
