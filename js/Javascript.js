
var dt=new Date();
function RenderDate()
{
dt.setDate(1);
var day=dt.getDay();
console.log(dt.getDay());


var endDate = new Date(dt.getFullYear(),dt.getMonth()+1,0).getDate();

var prevDate = new Date(dt.getFullYear(),dt.getMonth(),0).getDate();

var today = new Date();

document.getElementById("date_str").innerHTML = dt.toDateString();

var months=["January","February","March","April","May","June","July","August","September",
"October","November","December"];

document.getElementById("month").innerHTML = months[dt.getMonth()];

var cells="";

for(x =day;x>0;x--)
{
    cells+= "<div class='prev_date'>" + (prevDate - x + 1) + "</div>";
}

for(i=1;i<=endDate;i++)
{   
    if(i == today.getDate() && dt.getMonth() == today.getMonth())
    {
        cells+= "<div class='today'>" + i + "</div>";
    }
    else{
        cells+= "<div>" + i + "</div>";
    }
    
}
document.getElementsByClassName("days")[0].innerHTML = cells;

}


function moveDate(para){
    if(para == 'prev')
    {
        dt.setMonth(dt.getMonth()-1);
    }
    else if(para == 'next'){
        dt.setMonth(dt.getMonth()+1);
    }
    RenderDate();
}

// Alarm

const currentTime =document.querySelector("h1");
content=document.querySelector(".content");
selectMenu = document.querySelectorAll("select");
setAlarmBtn = document.querySelector("button");
ringtone = document.getElementById("ring");


let alarmTime,isAlarmSet= false;



for(let i=12;i>0;i--)
{
    i=i<10 ? "0" + i: i;
    let option=`<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=59;i>0;i--)
{
    i=i<10 ? "0" + i: i;
    let option=`<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=2;i>0;i--)
{
    let ampm = i == 1 ? "AM" : "PM";
    let option=`<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

setInterval(()=>{
    let date = new Date(),
    h=date.getHours(),
    m=date.getMinutes(),
    s=date.getSeconds(),
    ampm = "AM";

    if(h >= 12) {
        h= h-12;
        ampm="PM";
    }
    //if hour value 0 set this to 12
    h = h == 0 ? h = 12 : h;
    //adding 0 before hr,min ,sec if this value is less than 10
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if(alarmTime == `${h}:${m} ${ampm}`){
        console.log("Alarm ringing..");
        ringtone.play();
        gifImage.style.opacity=1;
        ringtone.loop = true;
    }

},1000);

function setAlarm(){

    if(isAlarmSet){
        alarmTime = "";
        ringtone.pause();
        gifImage.style.opacity=0;
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }
    //getting hour minu amapm select tag value
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if(time.includes("Hour") || time.includes("Minutes") || time.includes("AM/PM")){
        return alert("please select valid time to set Alarm!");
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "Clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);