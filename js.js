var mins, secs, interval, isActive, MusicTimeout
durationEndSound = document.getElementById('durationEnd'),
breakEndSound = document.getElementById('breakEnd'),
soundTime1=10, soundTime2=10;

function createInterval(){
  var duration = document.getElementById("duration").value,
  breakTime = document.getElementById("breakTime").value,
  numberOfSessions = document.getElementById("numberOfSessions").value,
  lastBreakTime = document.getElementById("lastBreakTime").value;

  if(duration <=0 || numberOfSessions <=0 || breakTime <=0 ) {alert("Duration Time, Break Time and number of sessions must all be bigger than 0.");return 0;}
  if( $(".clock").length){isActive = true;}
  else isActive = false;

  $(".clocks").css("display", "block");
  for(i=1; i<numberOfSessions; i++){
    $("<div class = 'workClock clock'><p class = 'min'>"+duration+"</p><p class ='sec'>00</p><img class ='closeButton' src='images/close.png'><div class = 'StopGo'><img class ='play' src='images/play.png'></div></div>").appendTo(".clocks");
    $("<div class = 'breakClock clock'><p class = 'min'>"+breakTime+"</p><p class ='sec'>00</p><img class ='closeButton' src='images/close.png'><div class = 'StopGo'><img class ='play' src='images/play.png'></div></div>").appendTo(".clocks");
  }
    $("<div class = 'workClock clock'><p class = 'min'>"+duration+"</p><p class ='sec'>00</p><img class ='closeButton' src='images/close.png'><div class = 'StopGo'><img class ='play' src='images/play.png'></div></div>").appendTo(".clocks");
    if(document.getElementById("lastBreak").checked)  $("<div class = 'breakClock clock'><p class = 'min'>"+lastBreakTime+"</p><p class ='sec'>00</p><img class ='closeButton' src='images/close.png'><div class = 'StopGo'><img class ='play' src='images/play.png'></div></div>").appendTo(".clocks");
    if(!isActive)activateClock(0);
    refreshDisplay();
    document.querySelector('.clock').scrollIntoView({
    behavior: 'smooth'
});
}

function changeVolume(){
  durationEndSound.volume = document.getElementById("volume").value;
  breakEndSound.volume = document.getElementById("volume").value;
  document.getElementById("listen").volume = document.getElementById("volume").value;
}
function refreshDisplay(){
  $(".clock").css('margin-left', document.getElementById("rows").value +"%");
  $(".clock").css('margin-right', document.getElementById("rows").value +"%");
  console.log(document.getElementById("rows").value);
}
function playSound(sound, duration){
  clearTimeout(MusicTimeout); //prevent from pausing sound while clicked more than once
  duration *= 1000; // seconds to miliseconds
  sound.loop = true;
  sound.play();
  MusicTimeout = setTimeout(function(){sound.pause();}, duration);
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
    $(this).closest(".play").attr('src','images/play.png');
    $(this).closest(".clock").removeClass('active');
 }
  else activateClock($(this).closest(".clock").index());
});

function changeSoundDuration(x){
  if(x) soundTime2 = document.getElementById("soundTime2").value;
  else  soundTime1 = document.getElementById("soundTime1").value;
}

function activateClock(clockNum){
    clearInterval(interval);
    $(".clock").removeClass('active');
    $(".play").attr('src', 'images/play.png');
    $(".play").eq(clockNum).attr('src', 'images/pause.png');
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
              $("title").html(mins+":"+secs);
        }, 1000);
}

$("#T1").click(function(){
    $('.Sounds').eq(0).css('display', 'none');
    $('.Time').eq(0).css('display', 'block');
    $("#S1").removeClass("activeMenu");
    $(this).addClass("activeMenu");
});

$("#T2").click(function(){
  $('.Sounds').eq(1).css('display', 'none');
    $('.Time').eq(1).css('display', 'block');
    $("#S2").removeClass("activeMenu");
    $(this).addClass("activeMenu");
});

$("#S1").click(function(){
    $('.Time').eq(0).css('display', 'none');
    $('.Sounds').eq(0).css('display', 'block');
    $("#T1").removeClass("activeMenu");
    $(this).addClass("activeMenu");
});

$("#S2").click(function(){
  $('.Time').eq(1).css('display', 'none');
  $('.Sounds').eq(1).css('display', 'block');
  $("#T2").removeClass("activeMenu");
  $(this).addClass("activeMenu");
});

$("#D").click(function(){
  $('.soundsSettings, .Themes').css('display', 'none');
  $('.different').css('display', 'block');
  $("#Th, #S3").removeClass("activeMenu");
  $(this).addClass("activeMenu");
});

$("#S3").click(function(){
  $('.different, .Themes').css('display', 'none');
  $('.soundsSettings').css('display', 'block');
  $("#Th, #D").removeClass("activeMenu");
  $(this).addClass("activeMenu");
});

$("#Th").click(function(){
  $('.soundsSettings, .different').css('display', 'none');
  $('.Themes').css('display', 'block');
  $("#D, #S3").removeClass("activeMenu");
  $(this).addClass("activeMenu");
});
$(".topic > p").click(function(){
  switch($(this).index()){
    case 0: window.location.href = "file:///C:/Users/Dell/Desktop/Programowanie/Pomodoro-clock/index.html"; break;
    case 1: window.location.href = "file:///C:/Users/Dell/Desktop/Programowanie/Pomodoro-clock/about.html"; break;
    case 2: window.location.href = "file:///C:/Users/Dell/Desktop/Programowanie/Pomodoro-clock/contact.html"; break;
    case 3: window.location.href = "file:///C:/Users/Dell/Desktop/Programowanie/Pomodoro-clock/donate.html"; break;
  }
})
$("li").click(function(){
  $("h2")[$(this).index()].scrollIntoView({
      behavior: "smooth", // or "auto" or "instant"
  });
});
$("#lastBreak").click(function(){ $(".ifchecked").toggle();})
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
   $(this).css('background', 'rgba(95, 227, 3, 1)');
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
