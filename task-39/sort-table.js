class SortTable {
    constructor(container, id) {
        this.container = document.querySelector(container);
        this.id = id || null;
        this.table = null;
        this.frzHead = null;
    }
    init(config) {
        this.config = config;
        var tableStr = '';
        if (this.id) {
            tableStr += `<table id=${this.id} class="sort-table">`;
        } else {
            tableStr += `<table class="sort-table">`;
        }
        
        tableStr += this.makeTableHead();
        tableStr += this.makeTableBody(this.config.tableData);
        tableStr += '</table>';
        this.container.innerHTML = tableStr;
        this.table = this.container.querySelector('.sort-table');
        this.sort(this.table.querySelector('thead'));
        if (this.config.tableFreeze) {
            this.tableFreeze();
        }
    }
    makeTableHead() {
        var config = this.config;
        var headStr = '';
        headStr += '<thead>';
        headStr += '<tr>';
        config.colName.forEach(function(item, index) {
            headStr += '<th>';
            headStr += `${item}`;
            if (config.colSort[index][0] === true) {
                if (config.colSort[index][1]) {
                    headStr += `<div class="sort-area" data-method="str">`;
                } else {
                    headStr += `<div class="sort-area" data-method="num">`;
                }
                
                headStr += `<i class="asc"></i><i class="desc"></i>`;
                headStr += `</div>`;
            }
            headStr += '</th>';
        });
        headStr += '</tr>';
        headStr += '</thead>';
        return headStr;
    }
    makeTableBody(data) {
        var bodyStr = '';
        bodyStr += '<tbody>';
        data.forEach(function(item) {
            //  [{name: '明明', math: 80, chs: 90, eng: 70, total: 240},
            //   {name: '红红', math: 80, chs: 90, eng: 70, total: 240},
            //   {name: '亮亮', math: 80, chs: 90, eng: 70, total: 240}
            //  ];
            bodyStr += '<tr>';
                item.forEach(function(cell) {
                    bodyStr += `<td>${cell}</td>`;
                });
            bodyStr += '</tr>';
        });
        bodyStr += '</tbody>';
        return bodyStr;
    }

    // 排序部分
    sort(thead) {
        var tbody = this.table.querySelector('tbody');
        var ths = Array.from(thead.querySelectorAll('th'));
        var trs = Array.from(tbody.querySelectorAll('tr'));
        var method;
        var curArr;
        var me = this;
        ths.forEach(function(th, index) {
            th.addEventListener('click', function(e) {
                var target = e.target;
                if (target.classList.contains('asc')) {
                    method = target.parentNode.dataset.method; // 按文字搜索还是按数字搜索
                    curArr = me.sortRows(index, trs, method, 'asc');
                } else if (target.classList.contains('desc')) {
                    method = target.parentNode.dataset.method;
                    curArr = me.sortRows(index, trs, method, 'desc');
                } else {
                    return;
                }
                tbody.innerHTML = '';
                curArr.forEach(function(item) {
                    tbody.appendChild(item);
                });
            });
        });
    }

    sortRows(index, rows, method, order) {
        if (method === 'num') {
            if (order === 'asc') { // 升序
                rows.sort(function(a, b) {
                    return a.querySelectorAll('td')[index].innerText - b.querySelectorAll('td')[index].innerText;
                });
            } else if (order === 'desc') { // 降序
                rows.sort(function(a, b) {
                    return b.querySelectorAll('td')[index].innerText - a.querySelectorAll('td')[index].innerText;
                });
            }
        } else if (method === 'str') {
            if (order === 'asc') { // 按拼音升序
                rows.sort(function(a, b) {
                    return a.querySelectorAll('td')[index].innerText.localeCompare(b.querySelectorAll('td')[index].innerText);
                });
            } else if (order === 'desc') { // 按拼音降序
                rows.sort(function(a, b) {
                    return b.querySelectorAll('td')[index].innerText.localeCompare(a.querySelectorAll('td')[index].innerText);
                });
            }
        }
        return rows;
    }

    tableFreeze() {
        var table = this.table;
        // var tbl = this.container.querySelector('.sort-table');
        var thead = table.querySelector('thead');
        var tbody = table.querySelector('tbody');
        var tableTop = table.getBoundingClientRect().top;
        var me = this;
        // window.addEventListener('scroll', function(e) {
        //     me.throttle(me.freezeHandler, me); // 一定要传入this; 因为会将timerId添加到this的属性
        // });
        window.addEventListener('scroll', me.throttle(me.freezeHandler, me, table, thead));
    }

    freezeHandler(e, table, thead) {
        // console.log(table, thead)
        // var table = this.table;
        // var thead = table.querySelector('thead');
        var rect = table.getBoundingClientRect();
        if (rect.top < 0 && rect.top > -rect.height) {
            // 表的头部开始被移上视口同时表的尾部还在视口 
            // 冻结表头
            if (!this.frzHead) {
                var frzHead = this.frzHead = thead.cloneNode(true);
                frzHead.style.setProperty('position', 'fixed');
                frzHead.style.setProperty('top', '0');
                frzHead.style.setProperty('left', table.getBoundingClientRect().left + 'px');
                this.sort(frzHead);
                table.appendChild(frzHead);
            }
        } else if (rect.top <= -rect.height || rect.top > 0) { // 取消冻结
            if (this.frzHead) {
                table.removeChild(this.frzHead);
                this.frzHead = null;
            }
        }
    }

    // throttle(method, context, ...args) {
    // if (!context.tid) {
    //         context.tid = setTimeout(function() {
    //             method.apply(context, args);
    //             context.tid = false;
    //         }, 50);
    //     }
    // }

    throttle (method, context, ...arg1) {
        var timer = null;
        return function (...arg2) {
            var args = arg2.concat(arg1);
            if (!timer) {
                timer = setTimeout(function() {
                    method.apply(context, args);
                    timer = null;
                }, 50);
            }
        }

    }

}

