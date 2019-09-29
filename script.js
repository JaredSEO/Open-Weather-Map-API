$('.weather-bar-button').click(function() {

    var zip = $('.zip-input--textbox').val();
    var Regex = /^\d{5}$/;

    if (!Regex.test(zip))
    {
        alert("Zip code invalid. Make sure your zip code is 5 digits long and located in the United States.");
    }
    else
    {
        getWeather(zip);

        function getWeather(zipcode) {

            var apiKey = "23c352e83611f9794adb66b79c2ee95d";
            var city;
            var temp;
    
    
            $.getJSON("http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + apiKey, 
            function(data) {
    
                city = data["name"];
                description = data["weather"][0]["description"];
                temp = data["main"]["temp"];
        
                $(".weather-bar-info--city").html(city);
                $(".weather-bar-info--description").html(upperCaseString(description));
                $(".weather-bar-info--temp").html(Math.round(((temp-273.15)*1.8)+32) + "&#176;");
    
            })
        }

        function upperCaseString(string) {
            return string.replace(/\w\S*/g, function(text){
                return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
            });
        }
    }
})

$('.zip-input--textbox').keypress(function(e){
    if(e.which == 13){
        $('.weather-bar-button').click();
    }
});