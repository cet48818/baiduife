$(function () {
    ;(function () {
        // 菜单栏
        var menuItems = $('.header-r ul').find('li');
        menuItems.each(function (index, item) {
            $(this).mouseover(function () {
                $(this).addClass('selected');
            }).mouseout(function () {
                $(this).removeClass('selected');
            })
        });
    })();

    ;(function () {
        // 切换
        var container = $('.r-sec-container');
        var dots = container.children('.dots').find('.dot');
        var contains = container.find('.r-sec');
        dots.each(function (index, item) {
            $(item).click(function () {
                contains.each(function (index, item) {
                    $(item).hide();
                    dots.eq(index).removeClass('selected');
                })
                contains.eq(index).show();
                $(item).addClass('selected');
            })
        });
    })();

    ;(function () {
        // select 
        var static = [true, false, false];
        var selectArea = $('.select-area');
        var selects = selectArea.find('.select');
        var countrySelect = selects.eq(0),
            provinceSelect = selects.eq(1),
            citySelect = selects.eq(2);
            console.log(countrySelect)
        var siteData,
            countryData,
            provinceData,
            cityData;
        var postData = {
            country: null,
            province: null,
            city: null
        }
        init();
        function init () {
            // 先载入第一个选项
            $.getJSON('./data.json', function (data) {
                siteData = data;
                render(countrySelect, siteData);
            });
            setSelect();
        }
        
        function setSelect() {
            selectArea.on('click', '.select', function () {
                if (static[$(this).index()] === true) {
                    $(this).addClass('selected');
                }
                return;
            });
            selectArea.on('blur', '.select', function () {
                if (static[$(this).index()] === true) {
                    $(this).removeClass('selected');
                }
                return;
            });

            countrySelect.on('click','li', function () {
                var span = countrySelect.children().first(); // span
                var text = $(this).text();
                span.text(text);
                countrySelect.removeClass('selected');
                static[1] = true;
                for (let [index, item] of siteData.entries()) {
                    if (item.n === text) {
                        countryData = siteData[index];
                        console.log(countryData);
                        break;
                    }
                }
                render(provinceSelect, countryData.s);
                postData.country = countryData.n;
                provinceSelect.children().eq(0).text('省份');
                citySelect.children().eq(0).text('城市');
                return false;
            });
            provinceSelect.on('click','li', function () {
                var span = provinceSelect.children().first(); // span
                var text = $(this).text();
                span.text(text);
                provinceSelect.removeClass('selected');
                static[2] = true;
                for (let [index, item] of countryData.s.entries()) {
                    if (item.n === text) {
                        provinceData = item;
                        break;
                    }
                }
                render(citySelect, provinceData.s);
                postData.province = provinceData.n;
                citySelect.children().eq(0).text('城市');
                return false;
            });
            citySelect.on('click','li', function () {
                var span = citySelect.children().first(); // span
                var text = $(this).text();
                span.text(text);
                citySelect.removeClass('selected');
                for (let [index, item] of provinceData.s.entries()) {
                    if (item.n === text) {
                        cityData = item; // 区名是cityData.n
                        break;
                    }
                }
                postData.city = cityData.n;
                return false;
            });

            selectArea.find('button').on('click', function () {
                if (postData.city) {
                    $.post('./#', postData, function () {
                        // ...
                    });
                }
                
                return false;
            })
        }


        function render (el, data) {
            var container = el.find('ul');
            var str = '';
            data.forEach(function (item) {
                str += '<li class="select-hook">';
                str += item.n;
                str += '</li>';
            })
            container.html(str);
        }
    })();
});

