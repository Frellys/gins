function setWeather() {
    map.layers.forEach(function (layer) {
        if (layer.name == 'Погода') {
            layer.events.register('loadend', layer, function () {
                let weatherLayer = layer;
                for (let i = 0; i < weatherList.length; i++) {
                    let xhttp = new XMLHttpRequest();
                    xhttp.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=' + weatherList[i].id + '&appid=2ac7f1a83e0034573f68011eb359a7f3', true);
                    xhttp.send();
                    xhttp.onreadystatechange = function () {
                        switch (this.readyState) {
                            case 4:
                                weatherLayer.addFeatures([new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(0, 0))]);
                                let lon, lat, data = JSON.parse(this.response);
                                for (let ind = 0; ind < weatherList.length; ind++) {
                                    if (data.id == weatherList[ind].id) {
                                        weatherList[ind].hasOwnProperty('lon') ? lon = weatherList[ind].lon : lon = data.coord.lon;
                                        weatherList[ind].hasOwnProperty('lat') ? lat = weatherList[ind].lat : lat = data.coord.lat;
                                        weatherList.splice(ind, 1);
                                    }
                                }
                                let point = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), new OpenLayers.Projection("EPSG:900913"));
                                let obj = weatherLayer.features[weatherLayer.features.length - 1];
                                obj.attributes.x = point.lon;
                                obj.attributes.y = point.lat;
                                obj.geometry.x = obj.attributes.x;
                                obj.geometry.y = obj.attributes.y;
                                obj.geometry.bounds.left = obj.geometry.x;
                                obj.geometry.bounds.right = obj.geometry.x;
                                obj.geometry.bounds.top = obj.geometry.y;
                                obj.geometry.bounds.bottom = obj.geometry.y;
                                obj.data = data;
                                if (!obj.style) obj.style = clone(weatherLayer.styleMap.styles.default.defaultStyle);
                                obj.style.externalGraphic = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
                                obj.style.graphicHeight = screen.height * 3.9 / 100;
                                obj.style.label = (data.main.temp - 273.15).toFixed(1) + '°';
                                obj.style.fontSize = screen.height * 1.0 / 100;
                                obj.style.fontFamily = 'Arial';
                                obj.style.fontWeight = '700';
                                weatherLayer.redraw();
                                break;
                            case 200: break;
                            default: break;
                        }
                    };
                }
            });
        }
    });
}

// WEATHER CITIES LIST
let weatherList = [
    { id: 1508291, name_EN: 'Chelyabinsk', lon: 61.429722, lat: 55.154442 },
    { id: 532288, name_EN: 'Magnitogorsk', lon: 59.047218, lat: 53.41861 },
    { id: 462444, name_EN: 'Zlatoust', lon: 59.650829, lat: 55.171108 },
    { id: 1498894, name_EN: 'Miass', lon: 60.10833, lat: 55.044998 },
    { id: 1502603, name_EN: 'Kopeysk', lon: 61.679199, lat: 55.131001 },
    { id: 1538634, name_EN: 'Ozersk', lon: 60.702782, lat: 55.755562 },
    { id: 1489246, name_EN: 'Troitsk', lon: 61.577301, lat: 54.0979 },
    { id: 1536289, name_EN: 'Snezhinsk', lon: 60.731392, lat: 56.084999 },
    { id: 498418, name_EN: 'Satka', lon: 59.040001, lat: 55.0425 },
    { id: 1508350, name_EN: 'Chebarkul', lon: 60.3633, lat: 54.974899 },
    { id: 1485634, name_EN: 'Yuzhnouralsk', lon: 61.253601, lat: 54.441799 },
    { id: 1500997, name_EN: 'Kyshtym', lon: 60.552799, lat: 55.714001 },
    { id: 1502536, name_EN: 'Korkino', lon: 61.3969, lat: 54.8913 },
    { id: 830844, name_EN: 'Trekhgornyy', lon: 58.459171, lat: 54.814999 },
    { id: 580660, name_EN: 'Asha', lon: 57.272202, lat: 54.997299 },
    { id: 1504317, name_EN: 'Kartaly', lon: 60.646671, lat: 53.052219 },
    { id: 1486039, name_EN: 'Yemanzhelinsk', lon: 61.320831, lat: 54.754719 },
    { id: 1487394, name_EN: 'Verkhniy Ufaley', lon: 60.23056, lat: 56.056671 },
    { id: 478071, name_EN: 'Ust-Katav', lon: 58.165558, lat: 54.936943 },
    { id: 579738, name_EN: 'Bakal', lon: 58.8083, lat: 54.9417 },
    { id: 1494907, name_EN: 'Plast', lon: 60.81361, lat: 54.369141 },
    { id: 538442, name_EN: 'Kusa', lon: 59.440559, lat: 55.338329 },
    { id: 1504251, name_EN: 'Kasli', lon: 60.7616, lat: 55.8909 },
    { id: 551794, name_EN: 'Katav-Ivanovsk', lon: 58.19556, lat: 54.753059 },
    { id: 492944, name_EN: 'Sim', lon: 57.6982, lat: 54.993 },
    { id: 516615, name_EN: 'Nyazepetrovsk', lon: 59.602779, lat: 56.053059 },
    { id: 1504636, name_EN: 'Karabash', lon: 60.215698, lat: 55.480801 },
    { id: 475463, name_EN: 'Verkhneuralsk', lon: 59.21056, lat: 53.876942 },
    // OTHER REGIONS
    { id: 2026609, name_EN: "Blagoveshchensk", lon: 127.533333, lat: 50.26667 },
    { id: 581049, name_EN: "Arkhangelsk", lon: 40.543301, lat: 64.5401 },
    { id: 580497, name_EN: "Astrakhan", lon: 48.04076, lat: 46.349682 },
    { id: 578072, name_EN: "Belgorod", lon: 36.580002, lat: 50.610001 },
    { id: 571476, name_EN: "Bryansk", lon: 34.380562, lat: 53.287498 },
    { id: 473247, name_EN: "Vladimir", lon: 40.39658, lat: 56.136551 },
    { id: 472757, name_EN: "Volgograd", lon: 44.501839, lat: 48.719391 },
    { id: 472459, name_EN: "Vologda", lon: 39.888599, lat: 59.2187 },
    { id: 472045, name_EN: "Voronezh", lon: 39.169998, lat: 51.666389 },
    { id: 555312, name_EN: "Ivanovo", lon: 40.985832, lat: 56.994167 },
    // BORED
    { id: 524901, name_EN: "Moscow", lon: 37.615555, lat: 55.75222 },
    { id: 498817, name_EN: "Saint Petersburg", lon: 30.264168, lat: 59.894444 }
];