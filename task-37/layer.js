var Layer = (function() {
    var defaultConfig = {
        area: ['480px', '240px'],
        title: '信息',
        content: '提示内容',
        btn: ['确定'],
        resize: true,
        yes: null, // 确定按钮回调方法
        cancel: null, // 关闭按钮触发的回调
        resize: true
    };
    var dialog;
    var shade;
    var curSize = {};
    
    function makeDialog(config) { // 生成弹出层
        // 主体部分
        var frg = document.createDocumentFragment();
        dialog = document.createElement('div');
        var reg = /^(\d+)([a-z]+)$/;
        var w = reg.exec(config.area[0]);
        var h = reg.exec(config.area[1]);
        curSize.width = w[1];
        curSize.height = h[1];
        dialog.setAttribute('class', `layer-content`);
        dialog.setAttribute('style', `width:${w[1]}${w[2]}; height:${h[1]}${h[2]}; margin-left:${-w[1]/2}${w[2]}; margin-top:${-h[1]/2}${w[2]};`);
        frg.appendChild(dialog);
        // resize部分
        if (config.resize) {
            var resizeArea = document.createElement('div');
            resizeArea.setAttribute('class', 'resize-area');
            resizeArea.setAttribute('draggable', 'true');
            resizable(resizeArea, config);
            dialog.appendChild(resizeArea);
        }
        // titile栏
        var title = document.createElement('div');
        title.setAttribute('class', 'title');
        title.setAttribute('draggable', 'true');
        title.innerHTML = `<span class="title-content">${config.title}</span>`;
        movable(title); // 可移动
        dialog.appendChild(title);
        // 关闭按钮 
        var closeBtn = document.createElement('div');
        closeBtn.setAttribute('class', 'close-btn');
        closeBtn.addEventListener('click', close);
        title.appendChild(closeBtn);
        // 内容栏
        var content = document.createElement('div');
        content.setAttribute('class', 'content');
        // 插入文字内容
        var inner = document.createElement('p');
        inner.innerText = config.content;
        content.appendChild(inner);
        // 插入按钮
        var buttonArea = document.createElement('div');
        buttonArea.setAttribute('class', 'btn-area');
        config.btn.forEach(function(item, index) {
            var btn = document.createElement('button');
            btn.setAttribute('class', 'layer-btn');
            if (index === 0) { // 绑定yes事件
                btn.addEventListener('click', config.yes);
            } else if (index === 1) { // 绑定cancel事件
               btn.addEventListener('click', function() {
                   if (config.cancel) {
                       config.cancel.call(null);
                   }
                   close(config.index);
               });
            }
            btn.innerText = item;
            buttonArea.appendChild(btn);
        });
        content.appendChild(buttonArea);
        // 插入到DOM里
        dialog.appendChild(content);
        document.body.appendChild(frg);
        // 遮罩部分
        shade = document.createElement('div');
        shade.setAttribute('class', 'layer-shade');
        shade.style.height = document.body.scrollHeight + 'px';
        shade.addEventListener('click', function() {
            close();
        })
        document.body.appendChild(shade);        
    }

    var open = function(config) {  // 跳出弹出层
        config = Object.assign(defaultConfig, config);
        // config.index = index; // 将index插入到config部分
        makeDialog(config);
    };

    var close = function() {
        // 关闭遮罩
        document.body.removeChild(shade);
        // 徐徐地关闭dialog
        dialog.style.setProperty('transition', '.4s');
        dialog.style.setProperty('opacity', 0);
        dialog.addEventListener('transitionend', function() {
            document.body.removeChild(this);
        })
    };

    function resizable(area, conf) {
        
        area.addEventListener('dragstart', handlerDrag);
        
        function handlerDrag(e) {
            var initWidth = parseInt(conf.area[0]);
            var initHeight = parseInt(conf.area[1]);
            var left, top, initPointLeft, initPointTop;
            var dragX, dragY;
            e.dataTransfer.setData('text/plain', 'something'); // firefox拖拽设置
            left = dialog.getBoundingClientRect().left;
            top = dialog.getBoundingClientRect().top;
            initPointLeft = initWidth + left;
            initPointTop = initHeight + top;
            document.documentElement.addEventListener('dragover', resize);
            document.documentElement.addEventListener('drop', resizeEnd);

            function resize(e) {
                // firefox拖拽设置
                dragX = e.clientX;
                dragY = e.clientY;
                if (dragX > initPointLeft) {
                    curSize.width = initWidth + dragX - initPointLeft;
                    dialog.style.width = curSize.width + 'px';
                }
                if (dragY > initPointTop) {
                    curSize.height = initHeight + dragY - initPointTop;
                    dialog.style.height = curSize.height  + 'px';
                }
                e.preventDefault(); // 改变光标样式
            }

            function resizeEnd(e) {
                document.documentElement.removeEventListener('dragover', resize);
                document.documentElement.removeEventListener('drop', resizeEnd);
                e.preventDefault(); // 阻止firefox页面在设置dataTransfer以后跳转
            }
        }
    }

    function movable(title) {
        title.addEventListener('dragstart', handlerMove);

        function handlerMove(e) {
            var left, top, initPointLeft, initPointTop;
            var curX, curY, distanceX, distanceY;
            var dragX, dragY;
 
            e.dataTransfer.setData('text/plain', 'something'); // firefox拖拽设置
            curX = e.clientX;
            curY = e.clientY;
            left = dialog.getBoundingClientRect().left;
            top = dialog.getBoundingClientRect().top;
            distanceX = curX - left;
            distanceY = curY - top;

            document.documentElement.addEventListener('dragover', dragMoving);
            document.documentElement.addEventListener('drop', dragEnd);

            function dragMoving(e) {
                // firefox拖拽设置
                dragX = e.clientX;
                dragY = e.clientY;
                dialog.style.left = dragX - distanceX + 'px';
                dialog.style.top = dragY - distanceY + 'px';
                dialog.style.marginLeft = 0;
                dialog.style.marginTop = 0;
                e.preventDefault(); // 改变光标样式
            }
            function dragEnd(e) {
                document.documentElement.removeEventListener('dragover', dragMoving);
                document.documentElement.removeEventListener('drop', dragEnd);
                e.preventDefault(); // 阻止firefox页面在设置dataTransfer以后跳转
            }
        }
    }

    return {
        open: open,
        close: close
    }
}());