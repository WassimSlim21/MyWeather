$(document).ready(function () {
    $("#reset").click(function (e) {
        location.reload();
    });
    
    $("#submitButton").click(function (e) {
        console.log($('#weatherTable').html())
        if($('#weatherTable').html() !== ''){
            console.log('here');
            
            $('#weatherTable').DataTable().destroy();
            $('#weatherTable').html('');
        }
        // table.destroy();
        var city=$("#city").val();
        if(city==''){
        $.ajax({
            type: "POST",
            url: "http://api.openweathermap.org/data/2.5/group?id=2643741,2644688,2633352,2654675,2988507,2990969,2911298,2925535,2950159,3120501,3128760,5128581,4140963,4930956,5106834,5391959,5368361,5809844,4099974,4440906&appid=bf2b713b2d87c5136bf0883f0a491bf0&units=metric",
            dataType: "json",
            success: function (result, status, xhr) {
                res = CreateWeatherJson(result);
                $("#weatherTable").append("<thead class='thead-dark'><tr><th scope='col'>City Id</th><th scope='col'>City Name</th><th scope='col'>Temperature</th><th scope='col'>Min Temp</th><th scope='col'>Max Temp</th><th scope='col'>Humidity</th><th scope='col'>Pressure</th></thead></table>");
                $('#weatherTable').DataTable({
                    data: JSON.parse(res),
                    columns: [
                        
                        { data: 'cityId' },
                        { data: 'cityName' },
                        { data: 'temp' },
                        { data: 'tempMin' },
                        { data: 'tempMax' },
                        { data: 'pressure' },
                        { data: 'humidity' }
                    ],
                    "pageLength": 5
                });
            },
            error: function (xhr, status, error) {
                console.log("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    }
        else{
            $.ajax({
                type: "POST",
                url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=bf2b713b2d87c5136bf0883f0a491bf0&units=metric",
                dataType: "json",
                success: function (result, status, xhr) {
                    res = CreateWeatherJson2(result);
                    $("#weatherTable").append("<thead class='thead-dark'><tr><th scope='col'>City Id</th><th scope='col'>City Name</th><th scope='col'>Temperature</th><th scope='col'>Min Temp</th><th scope='col'>Max Temp</th><th scope='col'>Humidity</th><th scope='col'>Pressure</th></thead></table>");
                    $('#weatherTable').DataTable({
                        data: JSON.parse(res),
                        columns: [
                            
                            { data: 'cityId' },
                            { data: 'cityName' },
                            { data: 'temp' },
                            { data: 'tempMin' },
                            { data: 'tempMax' },
                            { data: 'pressure' },
                            { data: 'humidity' }
                        ],
                        "pageLength": 5
                    });
                },
                error: function (xhr, status, error) {
                    console.log("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            });

        }
    });

    function CreateWeatherJson(json) {
        var newJson = "";
        for (i = 0; i < json.list.length; i++) {
            cityId = json.list[i].id;
            cityName = json.list[i].name;
            temp = json.list[i].main.temp
            pressure = json.list[i].main.pressure
            humidity = json.list[i].main.humidity
            tempmin = json.list[i].main.temp_min
            tempmax = json.list[i].main.temp_max

            newJson = newJson + "{";
            newJson = newJson + "\"cityId\"" + ": " + cityId + ","
            newJson = newJson + "\"cityName\"" + ": " + "\"" + cityName + "\"" + ","
            newJson = newJson + "\"temp\"" + ": " + temp + ","
            newJson = newJson + "\"pressure\"" + ": " + pressure + ","
            newJson = newJson + "\"humidity\"" + ": " + humidity + ","
            newJson = newJson + "\"tempMin\"" + ": " + tempmin + ","
            newJson = newJson + "\"tempMax\"" + ": " + tempmax
            newJson = newJson + "},";
        }
        return "[" + newJson.slice(0, newJson.length - 1) + "]"
    }

    function CreateWeatherJson2(json) {
        var newJson = "";
            cityId = json.id;
            cityName = json.name;
            temp = json.main.temp
            pressure = json.main.pressure
            humidity = json.main.humidity
            tempmin = json.main.temp_min
            tempmax = json.main.temp_max

            newJson = newJson + "{";
            newJson = newJson + "\"cityId\"" + ": " + cityId + ","
            newJson = newJson + "\"cityName\"" + ": " + "\"" + cityName + "\"" + ","
            newJson = newJson + "\"temp\"" + ": " + temp + ","
            newJson = newJson + "\"pressure\"" + ": " + pressure + ","
            newJson = newJson + "\"humidity\"" + ": " + humidity + ","
            newJson = newJson + "\"tempMin\"" + ": " + tempmin + ","
            newJson = newJson + "\"tempMax\"" + ": " + tempmax
            newJson = newJson + "},";
        return "[" + newJson.slice(0, newJson.length - 1) + "]"
    }
});