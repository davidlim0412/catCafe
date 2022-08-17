export function displayTime(){
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var mins = dateTime.getMinutes();
    var hrsText = (hrs < 10)? "0" + hrs%12 : hrs%12;
    if (hrs == 0 || hrs == 12) hrsText = 12
    var minsText = (mins < 10)? "0" + mins : mins;
    var meridium = (hrs/12 < 1)?"am" : "pm"; 
    document.getElementById('clock').innerHTML = hrsText+":"+minsText+" "+meridium;
}