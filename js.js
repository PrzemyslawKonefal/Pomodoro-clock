var duration, breakTime, numberOfSessions;

function createInterval(){
  getSettings();
  $(".clocks").css("display", "block");
  for(i=1; i<numberOfSessions; i++){
    $("<div class = 'workClock clock'><p class = 'min'>"+duration+"</p><p class ='sec'>0</p></div>").appendTo(".clocks");

    $("<div class = 'breakClock clock'><p class = 'min'>"+breakTime+"</p><p class ='sec'>0</p></div>").appendTo(".clocks");
  }
    $("<div class = 'workClock clock'><p class = 'min'>"+duration+"</p><p class ='sec'>0</p></div>").appendTo(".clocks");
    $("<img src='close.png'>").appendTo(".clock");
    clockTicking();
}

$(".clocks").on('click', 'img', function(){
    $(this).closest(".clock").remove();
});

function getSettings(){
  duration = document.getElementById("duration").value;
  breakTime = document.getElementById("breakTime").value;
  numberOfSessions = document.getElementById("numberOfSessions").value;
}
function clockTicking(){
  $(".clock").eq(0).css('background', 'green');
  if($('.sec').text < 10) {$('.sec').text = 0 + $('.sec').text}
  setTimeout(function(){
    if($('.min').text < 10) {$('.min').text = 0 + $('.min').text}
    if($('.sec').text < 10) {$('.sec').text = 0 + $('.sec').text}
    if($('.min').text == 00 && $('.sec').text == 00 ){
      $(".clock").eq(0).remove()
    }
    else if($('.sec').text == 00){
      $('.min').text--;
      $('.sec').text = 59;
    }
  }, 1000)
}
