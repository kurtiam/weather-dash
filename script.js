// var cityNow = (window.localStorage.getItem('lastCity'));;
var cityNow = null;


if (localStorage.getItem("lastCity") == null) {

    getLocation();

}

else {
    cityNow = localStorage.getItem("lastCity")
    reverseDoIt();
    // alert("test");

}

$(document).ready(function () {
    // Get value on button click and show alert
    $("#city-weather").click(function () {
        cityNow = $("#city-search").val();
        reverseDoIt();
    });
});


function past() {
    // Get value on button click and show alert

    cityNow = pastCity
    localStorage.setItem("lastCity", cityNow);
    reverseDoIt();
};



var lat = "";
var lon = "";

function getLocation() {
    // alert("Location");

    x = document.getElementById("current");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }


    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;
        lat = position.coords.latitude
        lon = position.coords.longitude

        position.coords.latitude + "+" + position.coords.longitude
        // console.log(latlon); WORKS!
        doIt()
    }
};

function doIt() {

    loc = lat + "+" + lon
    latlon = lat + '&lon=' + lon

    // console.log(loc); WORKS!
    locApiKey = "&key=a5817602162f42e8a517aec3a58d5108"
    locUrl = "https://api.opencagedata.com/geocode/v1/json?q="

    return $.ajax({
        type: "GET",
        url: locUrl + loc + locApiKey,
        findCity: "{}",
        async: true,
        success: function (findCity) {

            console.log(findCity.results[0].components.town);

            local = findCity.results[0].components.town
            city = findCity.results[0].components.city
            state = findCity.results[0].components.state_code
            searchIt()
        }

    });
}

function reverseDoIt() {

    locApiKey = "&key=a5817602162f42e8a517aec3a58d5108"
    locUrl = "https://api.opencagedata.com/geocode/v1/json?q=" + cityNow + locApiKey
    return $.ajax({
        type: "GET",
        url: locUrl,
        findCity: "{}",
        async: true,

        success: function (findCity) {

            // console.log(findCity.results[0].geometry.lat); WORKS!
            lat = findCity.results[0].geometry.lat
            lon = findCity.results[0].geometry.lng
            city = findCity.results[0].components.city //may need to add logic for .town
            state = findCity.results[0].components.state_code
            searchIt()
        }

    });

}

function searchIt() {

    // $('#forecast').empty();

    cityNow = city
    latlon = lat + '&lon=' + lon
    var day0 = "";
    var day1 = "";
    var day2 = "";
    var day3 = "";
    var day4 = "";


    const apiKey = '&appid=5fcdb49618a519ccf4087e67eb6ee1c7';
    var url = 'https://api.openweathermap.org/data/2.5/onecall?cnt=6&lat=' + latlon + '&exclude=hourly,minutely&units=imperial';


    return $.ajax({
        type: "GET",
        url: url + apiKey,
        data: "{}",
        async: true,
        success: function (data) {

            day0 = data.daily[0]
            day1 = data.daily[1]
            day2 = data.daily[2]
            day3 = data.daily[3]
            day4 = data.daily[4]
            day5 = data.daily[5]

            icon = "http://openweathermap.org/img/w/";
            //human readable date 
            hrDate = (new Date(data.current.dt * 1000).toLocaleString().split(", "))[0];
            console.log(hrDate);

            // def need to script the follwoing .  DRY!
            d1date = (new Date(day1.dt * 1000).toLocaleString().split(", "))[0];
            d1Icon = icon + day1.weather[0].icon + ".png"
            d2date = (new Date(day2.dt * 1000).toLocaleString().split(", "))[0];
            d2Icon = icon + day2.weather[0].icon + ".png"
            d3date = (new Date(day3.dt * 1000).toLocaleString().split(", "))[0];
            d3Icon = icon + day3.weather[0].icon + ".png"
            d4date = (new Date(day4.dt * 1000).toLocaleString().split(", "))[0];
            d4Icon = icon + day4.weather[0].icon + ".png"
            d5date = (new Date(day5.dt * 1000).toLocaleString().split(", "))[0];
            d5Icon = icon + day5.weather[0].icon + ".png"

            if (data.current.temp > 75) {
                $("#nowTe").html("<p style='color:red'> Temp: " + data.current.temp + " F</p>");

            } else if (data.current.temp > 70) {
                $("#nowTe").html("<p style='color:yellow'> Temp: " + data.current.temp + " F</p>");

            } else {
                $("#nowTe").html("<p style='color:white'> Temp: " + data.current.temp + " F</p>");

            }

            $("#nowHu").html("Humidity: " + data.current.humidity + "%");
            $("#nowWi").html("Wind Speed: " + data.current.wind_speed + " MPH");
            $("#nowUv").html("UV Index: " + data.current.uvi);
            iconText = data.current.weather[0].icon + ".png";
            $("#curCity").html("<h5 class='card-title'> Today in " + city + ", " + state + "<img src=" + icon + iconText + "> </img> </h5>");

            // uggg need to figure out a script for th followng (DRY!)

            var htmlcard = "<div class=' col-lg-12'><div class='row'> <div class=' card cardBody'>"
            htmlcard += "<h5 class='card-title'>" + d1date + "<img src=" + d1Icon + "> </img> </h5> ";
            htmlcard += " <ul><li class='card-text' id='day1Te'>" + "Temp: " + day1.temp.day + " F</li>";
            htmlcard += " <li class='card-text' id='day1Hu'>" + "Humidity: " + day1.humidity + "%</li>";
            htmlcard += " <li class='card-text' id='day1Wi'>" + "Wind Speed: " + day1.wind_speed + " MPH</li>";
            htmlcard += " <li class='card-text' id='day1Uv'>" + "UV Index: " + day1.uvi + "</li></ul> </div></div></div>";
            $("#forecast1").html(htmlcard);

            var htmlcard2 = "<div class='col-lg-12'><div class='row'> <div class='card cardBody'>"
            htmlcard2 += "<h5 class='card-title'>" + d2date + "<img src=" + d2Icon + "> </img> </h5> ";
            htmlcard2 += " <ul><li class='card-text' id='day2Te'>" + "Temp: " + day2.temp.day + " F</li>";
            htmlcard2 += " <li class='card-text' id='day2Hu'>" + "Humidity: " + day2.humidity + "%</li>";
            htmlcard2 += " <li class='card-text' id='day2Wi'>" + "Wind Speed: " + day2.wind_speed + " MPH </li>";
            htmlcard2 += " <li class='card-text' id='day2Uv'>" + "UV Index: " + day2.uvi + "</li></ul></div></div></div>";
            $("#forecast2").html(htmlcard2);

            var htmlcard3 = "<div class='col-md-12'>  <div class='row'> <div class='card  cardBody '>"
            htmlcard3 += "<h5 class='card-title'>" + d3date + "<img src=" + d3Icon + "> </img> </h5>";
            htmlcard3 += " <ul><li class='card-text' id='day1Te'>" + "Temp: " + day3.temp.day + " F</li>";
            htmlcard3 += " <li class='card-text' id='day3Hu'>" + "Humidity: " + day3.humidity + "%</li>";
            htmlcard3 += " <li class='card-text' id='day3Wi'>" + "Wind Speed: " + day3.wind_speed + " MPH </li>";
            htmlcard3 += " <li class='card-text' id='day3Uv'>" + "UV Index: " + day3.uvi + "</li></ul></div></div></div>";
            $("#forecast3").html(htmlcard3);

            var htmlcard4 = "<div class='col-md-12'>  <div class='row'> <div class='card cardBody '>"
            htmlcard4 += "<h5 class='card-title'>" + d4date + "<img src=" + d4Icon + "> </img> </h5>";
            htmlcard4 += " <ul><li class='card-text' id='day4Te'>" + "Temp: " + day4.temp.day + " F</li>";
            htmlcard4 += " <li class='card-text' id='day4Hu'>" + "Humidity: " + day4.humidity + "%</li>";
            htmlcard4 += " <li class='card-text' id='day4Wi'>" + "Wind Speed: " + day4.wind_speed + " MPH </li>";
            htmlcard4 += " <li class='card-text' id='day4Uv'>" + "UV Index: " + day4.uvi + "</li></ul></div></div></div>";
            $("#forecast4").html(htmlcard4);

            var htmlcard5 = "<div class='col-md-12'>  <div class='row'> <div class='card  cardBody '>"
            htmlcard5 += "<h5 class='card-title'>" + d5date + "<img src=" + d5Icon + "> </img> </h5>";
            htmlcard5 += " <ul><li class='card-text' id='day5Te'>" + "Temp: " + day5.temp.day + " F</li>";
            htmlcard5 += " <li class='card-text' id='day5Hu'>" + "Humidity: " + day5.humidity + "%</li>";
            htmlcard5 += " <li class='card-text' id='day5Wi'>" + "Wind Speed: " + day5.wind_speed + " MPH</li>";
            htmlcard5 += " <li class='card-text' id='day5Uv'>" + "UV Index: " + day5.uvi + "</li></ul></div></div></div>";
            $("#forecast5").html(htmlcard5);


        }
    })

}

