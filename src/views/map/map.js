import {trip} from './config'

const AMap = window.AMap

function start (container) {
    let map, district, polygons = [], citycode;
    // let citySelect = document.getElementById('city');
    // let districtSelect = document.getElementById('district');
    // let areaSelect = document.getElementById('street');

    map = new AMap.Map(container, {
        mapStyle: 'amap://styles/fc34319a98a4e6c4de5da259cf392390', //设置地图的显示样式
        resizeEnable: true,
        center: [104.30946, 39.937629],
        zoom: 3
    });

    //行政区划查询
    let opts = {
        subdistrict: 1,   //返回下一级行政区
        showbiz: false  //最后一级返回街道信息
    };
    district = new AMap.DistrictSearch(opts);//注意：需要使用插件同步下发功能才能这样直接使用
    district.search('中国', function (status, result) {
        if (status === 'complete') {
            console.log(result)
            getData(result.districtList[0]);
        }
    });

    function getData(data, level) {
        let bounds = data.boundaries;
        if (bounds) {
            for (let i = 0, l = bounds.length; i < l; i++) {
                let polygon = new AMap.Polygon({
                    map: map,
                    strokeWeight: 1,
                    strokeColor: '#0091fa',
                    fillColor: '#0091fa',
                    fillOpacity: 0.5,
                    path: bounds[i]
                });
                polygons.push(polygon);
            }
            map.setFitView();//地图自适应
        }
    }

    function search(option) {
        //清除地图上所有覆盖物
        for (var i = 0, l = polygons.length; i < l; i++) {
            polygons[i].setMap(null);
        }
        // var option = obj[obj.options.selectedIndex];
        // var keyword = option.text; //关键字
        var adcode = option.adcode;
        district.setLevel(option.value); //行政区级别
        district.setExtensions('all');
        //行政区查询
        //按照adcode进行查询可以保证数据返回的唯一性
        district.search(adcode, function (status, result) {
            if (status === 'complete') {
                const [data] = result.districtList
                console.log(data)
                getData(data, option.id);
            }
        });
    }

    for (let item of trip) {
        search(item)
    }

    function setCenter(obj) {
        map.setCenter(obj[obj.options.selectedIndex].center)
    }
}


export function mountMap (container) {
    start(container)
}