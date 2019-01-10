export function formatTime(mseconds){
  const seconds = (new Date().getTime() - mseconds )/1000
  const minutes = seconds/60;
  const hours = minutes / 60;
  const days = hours/ 24;
  let result;
  if(days>=2){
    result = {time: Math.floor(days), unit:"days"}
  } else if (days>1){
    result ={time: Math.floor(days), unit:"day"}
  } else if (hours>=2){
    result ={time: Math.floor(hours), unit:"hours"}
  }else if (hours>1){
    result ={time: Math.floor(hours), unit:"hour"}
  } else if (minutes>=2){
    result ={time: Math.floor(minutes), unit:"minutes"}
  }else if (minutes>1){
    result ={time: Math.floor(minutes), unit:"minute"}
  } else if (seconds>=2){
    result ={time: Math.floor(seconds), unit:"seconds"}
  } else {
    result ={time: 1, unit:"second"}
  }
return result;
}
