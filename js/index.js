$(document).ready(function(){

    $("#submitweather").click(function(){
    var city=$("#city").val();
    if(city!='')
        {
            $.ajax({
                url:"http://api.openweathermap.org/data/2.5/group?id=2643741,"
                +"2644688,2633352,2654675,2988507,2990969,2911298,2925535,2950159,3120501,3128760,5128581,4140963,4930956,5106834,5391959,5368361,5809844,4099974,4440906&units=metric&APPID=bf2b713b2d87c5136bf0883f0a491bf0",
                type:"GET",
                dataType:"json",
                success: function (result, status, xhr) {
                    res = CreateWeatherJson(result);
                    $("#weatherTable").append("<thead><tr><th>City Id</th><th>City Name</th><th>Temperature</th><th>Min Temp</th><th>Max Temp</th><th>Humidity</th><th>Pressure</th></thead></table>");
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
            $("#error").html('city cannot be empty');
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
});


