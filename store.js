// $(document).ready(function () {
//     // Get value on button click and show alert
//     $("#city-weather").click(function () {
//          str = $("#city-search").val();
//         alert(str);
//     });
// });



function mySave() {
    var lastCity = document.getElementById("city-search").value;
    localStorage.setItem("cityList", lastCity);
}
function myLoad() {
    var lastCity = localStorage.getItem("cityList");
    document.getElementById("city-search").value = lastCity;
}