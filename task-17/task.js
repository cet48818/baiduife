/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) { // {2016-01-01: 237, ..., 2016-03-31: 235}
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

function randomColors() {
  var colors = ['pink', 'orange', 'red', 'violet', 'gray', 'cyan', 'lightblue', 'aqua', 'navy', 'yellowgreen', 'green', 'yellow', 'darkcyan', 'brown', 'greenyellow', 'olive', 'plum', 'darkviolet'];
  var index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

var aqiSourceData = { 
  "北京": randomBuildData(500), // {2016-01-01: 237, ..., 2016-03-31: 235}
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};
var initCity = '北京';
// var dailyArr,weeklyArr,monthlyArr; // AQI值构成的数组

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: initCity,
  nowGraTime: "day"
}

/**
 * 获得以日为单位的AQI数组
 */
function getDailyArr(initCity) {
  var dailyArrKeys = Object.keys(aqiSourceData[initCity]);
  var dailyArr = dailyArrKeys.map(function(item, index) {
      return aqiSourceData[initCity][item];
    });
    return dailyArr;
}

/**
 * 渲染图表
 */
function renderChart(time) {
    var chartChar = '';
    switch (time) {
      case 'day': time = '每日';
      break;
      case 'week': time = '每周';
      break;
      case 'month': time = '每月';
      break;
    }
    chartChar += `<h1 class="title">${initCity}市${time}AQI</h1>`;
    for (var date in chartData) {
      chartChar +=
          `<div class="aqiCol" style="background:${randomColors()};height:${chartData[date]}px;">
              <div class="summary">${date}:${chartData[date]}</div>
          </div>`;
    }
    document.querySelector('.aqi-chart-wrap').innerHTML = chartChar;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  // 设置对应数据
  // 调用图表渲染函数
  pageState.nowGraTime = this.value;
  initAqiChartData();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(city) {
  // 确定是否选项发生了变化 
  // 设置对应数据
  // 调用图表渲染函数
  initCity = pageState.nowSelectCity = city;
  initAqiChartData();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radios = document.getElementsByName('gra-time');
    for (var radio of radios) {
      radio.addEventListener('change', graTimeChange);
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  var cityStr = '';
  var val = 0;
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  var citySelect = document.querySelector('#city-select');
  for (var city in aqiSourceData) {
      cityStr += `<option value="${city}">${city}</option>`;
  }
  citySelect.innerHTML = cityStr;
  document.querySelector('#city-select').addEventListener('change', function(e) {
    citySelectChange(this.options[this.selectedIndex].value);
  })
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
    var city = pageState.nowSelectCity;
    var time = pageState.nowGraTime;
    if (time === 'day') {
      chartData = aqiSourceData[city];
    }
    else if (time === 'week') {
      var weekday = 7;
      var monthArr = getMonthArr(getDailyArr(city), weekday);
      chartData = {};
      for (var i=1; i<=weekday; i++) {
        chartData['2016年第'+ i + '周'] = monthArr[i-1];
      }
      // console.log(chartData)
    }
    else if (time === 'month') {
      var seasonArr = getSeasonArr(getDailyArr(city));
      chartData = {};
      for (var i=1; i<=3; i++) {
        chartData['2016年'+ i + '月'] = seasonArr[i-1];
      }
      
    }
    renderChart(time);
}

function getMonthArr(arr, days) {
    var length = arr.length;
    var weeks = Math.floor(length/days);
    var last = length % days;
    var newArr = [];
    var initItem = 0;
    arr.reduce(function(pre, cur, index) {
        initItem += cur;
        if ((index+1) % days === 0) {
            newArr.push(Math.round(initItem/days));
            initItem = 0;
        }
    }, 0);
    if (last !== 0) {
          for (var i=arr.length-1; i<=last; i--) {
          initItem += arr[i];
          newArr.push(Math.round(initItem/days));
      }
    }
     return newArr;
}
function getSeasonArr(arr) {
  var retArr = [];
  var initItem = 0;
  arr.reduce(function(pre, cur, index) {
      initItem += cur;
      if (index === 30) {
        retArr.push(Math.round(initItem/31));
        initItem = 0;
      }
      if (index === 59) {
        retArr.push(Math.round(initItem/29));
        initItem = 0;
      }
      if (index === arr.length-1) {
        retArr.push(Math.round(initItem/31));
        initItem = 0;
      }
    }, 0);
    return retArr;
}

function initSelector() { // 绑定hover事件
  var aqiChartWrap = document.querySelector('.aqi-chart-Wrap');
    aqiChartWrap.addEventListener('mouseover', function(e) {
        if (e.target.className === 'aqiCol') {
          // setTimeout(function() {
              e.target.querySelector('.summary').style.setProperty('display', 'block');
          // }, 300);
          
        }
    });
    aqiChartWrap.addEventListener('mouseout', function(e) {
        if (e.target.className === 'aqiCol') {
          // setTimeout(function() {
              e.target.querySelector('.summary').style.setProperty('display', 'none');
          // }, 300);
          
        }
    });
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  initSelector();
}

document.addEventListener('DOMContentLoaded', init);