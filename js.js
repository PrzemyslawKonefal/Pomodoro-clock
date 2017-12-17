var mins, secs, interval, isActive,
durationEndSound = document.getElementById('durationEnd'),
breakEndSound = document.getElementById('breakEnd'),
soundTime1=10, soundTime2=10;

$('.T1').trigger('click');
$('.T2').trigger('click');

function createInterval(){
  var duration = document.getElementById("duration").value;
  var breakTime = document.getElementById("breakTime").value;
  var numberOfSessions = document.getElementById("numberOfSessions").value;
  if(duration <=0 || numberOfSessions <=0 || breakTime <=0 ) {alert("Duration Time, Break Time and number of sessions must all be bigger than 0.");return 0;}
  if( $(".clock").length){isActive = true;}
  else isActive = false;
  $(".clocks").css("display", "block");
  for(i=1; i<numberOfSessions; i++){
    $("<div class = 'workClock clock'><p class = 'min'>"+duration+"</p><p class ='sec'>00</p><img class ='closeButton' src='close.png'><div class = 'StopGo'><img class ='play' src='play.png'></div></div>").appendTo(".clocks");
    $("<div class = 'breakClock clock'><p class = 'min'>"+breakTime+"</p><p class ='sec'>00</p><img class ='closeButton' src='close.png'><div class = 'StopGo'><img class ='play' src='play.png'></div></div>").appendTo(".clocks");
  }
    $("<div class = 'workClock clock'><p class = 'min'>"+duration+"</p><p class ='sec'>00</p><img class ='closeButton' src='close.png'><div class = 'StopGo'><img class ='play' src='play.png'></div></div>").appendTo(".clocks");
    if(!isActive)activateClock(0);
}
function playSound(sound, duration){
  duration *= 1000; // seconds to miliseconds
  sound.loop = true;
  sound.play();
  setTimeout(function(){sound.pause();}, duration);
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

function activateClock(clockNum){
    clearInterval(interval);
    $(".clock").removeClass('active');
    $(".play").attr('src', 'play.png');
    $(".play").eq(clockNum).attr('src', 'pause.png');
    $(".clock").eq(clockNum).addClass('active');
    mins = parseInt($(".min").eq(clockNum).html());
    secs = parseInt($(".sec").eq(clockNum).html());
      interval = setInterval(function(){
            secs--;
            if(mins<=0 && secs <=0){
              if($(".clock").eq(clockNum).hasClass("workClock")) playSound(durationEndSound, soundTime1);
               else playSound(breakEndSound, soundTime2);
               $(".clock").eq(clockNum).remove(); activateClock(clockNum);
             }
              else if(secs <=0) {secs=59; mins--;}
            if(mins<10)$(".min").eq(clockNum).html('0'+mins);
              else $(".min").eq(clockNum).html(mins);
            if(secs<10)$(".sec").eq(clockNum).html('0'+secs);
              else $(".sec").eq(clockNum).html(secs);
        }, 1000);
}

$("#T1").click(function(){
    $('.Sounds').eq(0).css('display', 'none');
    $('.Time').eq(0).css('display', 'block');
});

$("#T2").click(function(){
  $('.Sounds').eq(1).css('display', 'none');
    $('.Time').eq(1).css('display', 'block');
});

$("#S1").click(function(){
    $('.Time').eq(0).css('display', 'none');
    $('.Sounds').eq(0).css('display', 'block');
});

$("#S2").click(function(){
  $('.Time').eq(1).css('display', 'none');
  $('.Sounds').eq(1).css('display', 'block');
});

$(".listen").click(function(){
  var index = $(this).index()/2;
  var sound = document.getElementById('listen');
  switch(index){
    case 1: //fix this
         sound.setAttribute('src', 'audio/cuckoo.mp3' ); playSound(sound, 4); break;
    case 2:
         sound.setAttribute('src', 'audio/baritone.mp3' ); playSound(sound, 4);break;
    case 3:
        sound.setAttribute('src', 'audio/bell.mp3' ); playSound(sound, 4); break;
    case 4:
        sound.setAttribute('src', 'audio/applause.mp3' ); playSound(sound, 4); break;
    case 5:
        sound.setAttribute('src', 'audio/magic.mp3' ); playSound(sound, 4); break;
    case 6:
        sound.setAttribute('src', 'audio/horn.mp3' ); playSound(sound, 4); break;
    case 7:
        sound.setAttribute('src', 'audio/telephone.mp3' ); playSound(sound, 4); break;
    case 8:
        sound.setAttribute('src', 'audio/timesup.mp3' ); playSound(sound, 4); break;
    case 9:
        sound.setAttribute('src', 'audio/psycho.mp3' ); playSound(sound, 4); break;
    case 10:
        sound.setAttribute('src', 'audio/watch.mp3' ); playSound(sound, 4); break;
  }
});

$(".Sounds > p").click(function(){
   $(this).closest(".Sounds").find("p").css('background', 'rgba(169, 170, 164, 0.19)');
   $(this).css('background', 'rgb(4, 209, 12)');
   var index = (($(this).index()+1)/2);
   var sound;
   if($(this).closest(".singleSetting").hasClass('duration')) sound = durationEndSound;
   else sound = breakEndSound;
   switch(index){
     case 1: //fix this
          sound.setAttribute('src', 'audio/cuckoo.mp3' ); break;
     case 2:
          sound.setAttribute('src', 'audio/baritone.mp3' ); break;
     case 3:
         sound.setAttribute('src', 'audio/bell.mp3' ); break;
     case 4:
         sound.setAttribute('src', 'audio/applause.mp3' ); break;
     case 5:
         sound.setAttribute('src', 'audio/magic.mp3' ); break;
     case 6:
         sound.setAttribute('src', 'audio/horn.mp3' ); break;
     case 7:
         sound.setAttribute('src', 'audio/telephone.mp3' ); break;
     case 8:
         sound.setAttribute('src', 'audio/timesup.mp3' ); break;
     case 9:
         sound.setAttribute('src', 'audio/psycho.mp3' ); break;
     case 10:
         sound.setAttribute('src', 'audio/watch.mp3' ); break;
   }
});
