/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.querySelector('#aqi-city-input');
    var aqi = document.querySelector('#aqi-Value-input');
    var cityVal = city.value.trim();
    var aqiVal = aqi.value.trim();
    if (!cityVal.match(/^([A-Za-z]+\s?[A-Za-z]*$)|(^[\u4E00-\u9FA5]+$)/)) {
        return alert('城市名必须由合法的中文汉字或英文字母构成');
    }
    if (!aqiVal.match(/^[\d]{1,4}$/)) {
        return alert('AQI数值不合法');
    }
    aqiData[cityVal] = aqiVal;
    city.value = null;
    aqi.value = null;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.querySelector('#aqi-table');
    var tableStr = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
    var trs;
    for (var city in aqiData) {
        tableStr += `<tr><td>${city}</td><td>${aqiData[city]}</td><td><button type="button" data-city="${city}">删除</button></td></tr>`;
    }
    table.innerHTML = tableStr;
    if (JSON.stringify(aqiData) === '{}') {
        table.innerHTML = '';
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  if (confirm("确认删除吗?")) {
      delete aqiData[city];
      renderAqiList();
  }
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        var addBtn = document.querySelector('#add-btn');
        var aqiTable = document.querySelector('#aqi-table');
        addBtn.addEventListener('click', addBtnHandle);
        aqiTable.addEventListener('click', function(e) {
            if (e.target.nodeName === 'BUTTON') {
                delBtnHandle(e.target.dataset.city);
            }
        });
    }

window.onload = function() {
    init();
};
