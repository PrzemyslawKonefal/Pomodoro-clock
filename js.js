var duration, breakTime, numberOfSessions, mins, secs, interval, isActive;

function createInterval(){
  getSettings();
  $(".clocks").css("display", "block");
  for(i=1; i<numberOfSessions; i++){
    $("<div class = 'workClock clock'><p class = 'min'>"+duration+"</p><p class ='sec'>00</p></div>").appendTo(".clocks");

    $("<div class = 'breakClock clock'><p class = 'min'>"+breakTime+"</p><p class ='sec'>00</p></div>").appendTo(".clocks");
  }
    $("<div class = 'workClock clock'><p class = 'min'>"+duration+"</p><p class ='sec'>00</p></div>").appendTo(".clocks");
    $("<img src='close.png'>").appendTo(".clock");
    activateClock();
}

$(".clocks").on('click', 'img', function(){
  $(this).closest(".clock").hasClass("active")?isActive=true:isActive=false
    $(this).closest(".clock").remove();
    if(isActive){activateClock();}
});

function getSettings(){
  duration = document.getElementById("duration").value;
  breakTime = document.getElementById("breakTime").value;
  numberOfSessions = document.getElementById("numberOfSessions").value;
}
function activateClock(){
    clearInterval(interval);
    $(".clock").eq(0).css('background', 'green');
    $(".clock").eq(0).addClass('active');
    secs = 0;
    if($(".clock").eq(0).hasClass("workClock")){mins = duration;}
    else {mins = breakTime;}
    interval = setInterval(function(){
      secs--;
      if(mins<=0 && secs <=0){clearInterval(interval); $(".clock").eq(0).remove(); activateClock();}
        else if(secs <=0) {secs=59; mins--;}
      if(secs<10 && secs.length<2) {secs = '0'+secs;}
      if(mins<10 && mins.length<2) {mins = '0'+mins;}
      $(".min").eq(0).html(mins);
      $(".sec").eq(0).html(secs);
}, 1000);

}
