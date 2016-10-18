var queue = (function() {
    var inputTag = document.querySelector('#tagInput');
    var tagArr = [];
    var favArr = [];
    var tagContainer = document.querySelector('#tagContainer');
    var favContainer = document.querySelector('#favContainer');
    var favInput = document.querySelector('#favorites');
    var favBtn = document.querySelector('#confirm');
    var timer = false;
    var inputDelay = 200;

    var initTag = function() {
        bindTag();
    };
    
    var initFav = function() {
        bindFav();
    };
    var bindTag = function() { // 绑定tag相关事件
        inputTag.addEventListener('keyup', tagHandler
        // function(e) {
        //     debounce.call(this, tagHandler, e)
        // }
        );

        tagContainer.addEventListener('mouseover', function(e) {
            var target = e.target;
            if (target.className === 'tag') {
                target.classList.add('to-delete');
            }
        });

        tagContainer.addEventListener('mouseout', function(e) {
            var target = e.target;
            if (target.classList.contains('to-delete')) {
                target.classList.remove('to-delete');
            }
        });

        tagContainer.addEventListener('click', function(e) {
            var target = e.target;
            if (target.classList.contains('to-delete')) {
                tagArr.splice(Number(target.dataset.index), 1);
                this.removeChild(target);
            }
        });
        
    };

    var bindFav = function() {
        favBtn.addEventListener('click', function(e) {
            var inputVal = favInput.value.trim();
            checkFav(inputVal);
            favArr = removeRpt(favArr, 10);
            favArr = maxLength(favArr, 10);
            render(favArr, favContainer);
        });

        favContainer.addEventListener('mouseover', function(e) {
            var target = e.target;
            if (target.className === 'tag') {
                target.classList.add('to-delete');
            }
        });

        favContainer.addEventListener('mouseout', function(e) {
            var target = e.target;
            if (target.classList.contains('to-delete')) {
                target.classList.remove('to-delete');
            }
        });

        favContainer.addEventListener('click', function(e) {
            var target = e.target;
            if (target.classList.contains('to-delete')) {
                favArr.splice(Number(target.dataset.index), 1);
                this.removeChild(target);
            }
        });
    };

    var tagHandler = function(e) {
        var reg = /[,，]$/;
        var tagVal = this.value.trim();
            if (tagVal !== '') {
                if (reg.test(tagVal)) {
                    tagVal = this.value.substring(0, tagVal.length-1);
                    if (checkTag(tagVal)) {
                        tagArr.push(tagVal);
                    }
                } 
                if (e.keyCode === 13 || e.keyCode === 32) { // 回车
                    if (checkTag(tagVal)) {
                        tagArr.push(tagVal);
                    }
                }
                tagArr = removeRpt(tagArr); // 移除重复
                // tag最多只能10个
                tagArr = maxLength(tagArr, 10);
                render(tagArr, tagContainer);
            }
    };
    var checkTag = function(str) {
        var reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
        if (!reg.test(str)) {
            // inputTag.value = ''; // 将输入栏内的值清空
            return alert('输入不合法');
        }
        else {
            inputTag.value = ''; // 将输入栏内的值清空
            return true;
        }
    };

    var checkFav = function(str) {
        var reg = /[\u4e00-\u9fa5a-zA-Z\d]+/g; // 1个或多个的汉字, 字母
        str.replace(reg, function() {
            // 向数组中插入数据
            favArr.push(arguments[0]);
        });
        favInput.value = '';
    };

    var removeRpt = function(arr) { // 数组去除重复项
        return [...new Set(arr)];
    };
    var maxLength = function(arr, length) { // 数组限制长度, 如果有超出的就删除左面内容
        return arr.filter(function(item, index) {
            if (index >= arr.length - length) {
                return item;
            }
        });
    };

    var render = function(arr, container) {
        var innerStr = '';
        arr.forEach(function(item, index) {
            innerStr += `<a class="tag" href="javascript:;" data-index="${index}">${item}</a>`;
        });
        container.innerHTML = innerStr;
    };

    // var debounce = function(method) {
    //     console.log(this)
    //     var e = arguments[arguments.length-1];
    //     var me = this;
    //     method.tId = setTimeout(function() {
    //         method.call(me, e);
    //     }, 4000);
    // };

    return {
        initTagInsert: initTag,
        initFavInsert: initFav
    }
}());

queue.initTagInsert();
queue.initFavInsert();