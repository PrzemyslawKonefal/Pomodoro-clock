var duration, breakTime, numberOfSessions, mins, secs, interval, isActive;

function createInterval(){
  getSettings();
  $(".clocks").css("display", "block");
  for(i=1; i<numberOfSessions; i++){
    $("<div class = 'workClock clock'><p class = 'min'>"+duration+"</p><p class ='sec'>00</p></div>").appendTo(".clocks");
    $("<div class = 'breakClock clock'><p class = 'min'>"+breakTime+"</p><p class ='sec'>00</p></div>").appendTo(".clocks");
  }
    $("<div class = 'workClock clock'><p class = 'min'>"+duration+"</p><p class ='sec'>00</p></div>").appendTo(".clocks");
    $("<img class ='closeButton' src='close.png'>").appendTo(".clock");
    $("<div class = 'StopGo'><img class ='play' src='play.png'></div>").appendTo(".clock");
    activateClock(0);
}

$(".clocks").on('click', '.closeButton', function(){
  $(this).closest(".clock").hasClass("active")?isActive=true:isActive=false
    $(this).closest(".clock").remove();
    if(isActive){activateClock(0);}
});
$(".clocks").on('click', '.play', function(){
  $(this).closest(".clock").hasClass("active")?isActive=true:isActive=false
  if(isActive){
    clearInterval(interval);
    $(this).closest(".play").attr('src','play.png');
    $(this).closest(".clock").removeClass('active');
 }
  else activateClock($(this).closest(".clock").index());
});

function getSettings(){
  duration = document.getElementById("duration").value;
  breakTime = document.getElementById("breakTime").value;
  numberOfSessions = document.getElementById("numberOfSessions").value;
}

function activateClock(clockNum){
    clearInterval(interval);
    $(".clock").removeClass('active');
    $(".play").attr('src', 'play.png')
    $(".play").eq(clockNum).attr('src', 'pause.png')
    $(".clock").eq(clockNum).addClass('active');
    mins = $(".min").eq(clockNum).html();
    secs = $(".sec").eq(clockNum).html();
      interval = setInterval(function(){
            secs--;
            if(mins<=0 && secs <=0){ $(".clock").eq(clockNum).remove(); activateClock(clockNum);}
              else if(secs <=0) {secs=59; mins--;}
            if(mins<10)$(".min").eq(clockNum).html('0'+mins);
              else $(".min").eq(clockNum).html(mins);
            if(secs<10)$(".sec").eq(clockNum).html('0'+secs);
              else $(".sec").eq(clockNum).html(secs);

          }, 1000);

}
