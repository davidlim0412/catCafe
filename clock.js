export function displayTime(){
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var mins = dateTime.getMinutes();
    document.getElementById('clock').innerHTML = hrs+":"+mins;
}