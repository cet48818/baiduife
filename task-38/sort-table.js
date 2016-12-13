var SortTable = (function() {
    var tableStr = '';
    var init = function(container, head, body) {
        tableStr += `<table class="sort-table">`;
        tableStr += makeHead(head);
        tableStr += makeBody(body);
        tableStr += '</table>';
        container.innerHTML = tableStr;
        sort(container.querySelector('.sort-table'));
    };

    function makeHead(head) {
        var headStr = '';
        //  [{name: '姓名', sort: true, method: 'str'},
        //   {name: '语文', sort: true, method: 'num'},
        //   {name: '数学', sort: true, method: 'num'},
        //   {name: '英语', sort: true, method: 'num'},
        //   {name: '总分', sort: true, method: 'num'}];
        headStr += '<thead>';
        headStr += '<tr>';
        head.forEach(function(item) {
            headStr += '<th>';
            headStr += `${item.name}`;
            if (item.sort) {
                if (item.method === 'str') {
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

    function makeBody(body) {
        var bodyStr = '';
        bodyStr += '<tbody>';
        body.forEach(function(item) {
            //  [{name: '明明', math: 80, chs: 90, eng: 70, total: 240},
            //   {name: '红红', math: 80, chs: 90, eng: 70, total: 240},
            //   {name: '亮亮', math: 80, chs: 90, eng: 70, total: 240}
            //  ];
            bodyStr += '<tr>';
                for (var attr in item) {
                    bodyStr += `<td>${item[attr]}</td>`;
                }
            bodyStr += '</tr>';
        });
        bodyStr += '</tbody>';
        return bodyStr;
    }

    // 排序部分
    function sort(table) {
        var tbody = table.querySelector('tbody');
        var ths = Array.from(table.querySelectorAll('th'));
        var trs = Array.from(tbody.querySelectorAll('tr'));
        var method;
        var curArr;
        ths.forEach(function(th, index) {
            th.addEventListener('click', function(e) {
                var target = e.target;
                if (target.classList.contains('asc')) {
                    method = target.parentNode.dataset.method;
                    curArr = sortRows(index, trs, method, 'asc');
                } else if (target.classList.contains('desc')) {
                    method = target.parentNode.dataset.method;
                    curArr = sortRows(index, trs, method, 'desc');
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

    function sortRows(index, rows, method, order) {
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

    return {
        init: init
    }
}());