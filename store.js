var saved = localStorage.getItem('History');

if (saved) {
    myUL.innerHTML = saved;
}

function mySave() {
    var lastCity = document.getElementById("city-search").value;
    localStorage.setItem("lastCity", lastCity);
}
function myLoad() {
    var lastCity = localStorage.getItem("lastCityt");
    document.getElementById("city-search").value = lastCity;
}

var input = document.querySelector('#city-search');
var listCity = document.querySelector('#city-search');
input.addEventListener('change', updateValue);
function updateValue(event) {
    if (listCity.value.length < 1) return;


    myUL.innerHTML += "<button class='hBTN btnH button' id=" + "'" + listCity.value + "'" + "onClick='reply_click(this.id)'>" + listCity.value + "</button><br>";

    // Save the list to localStorage
    localStorage.setItem('History', myUL.innerHTML);

}
pastCity = "";
function reply_click(clicked_id) {
    pastCity = clicked_id
    past(pastCity)

}