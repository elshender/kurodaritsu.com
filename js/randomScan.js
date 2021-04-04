
/**
 * Add randomness to scan-line to racer cards
 *
 * ---
 * @author Josh Nisbet - Joshn
 * @version 1.0
 * 
 * ---
 */
function randomiseScan(){
    var scanLines = {
      scanLinesOuter: document.getElementsByClassName("scan"),
      scanLinesInnerA: document.getElementsByClassName("scanInnerA"),
      scanLinesInnerB: document.getElementsByClassName("scanInnerB")
    };
    for(i = 0; i < scanLines.scanLinesOuter.length; i++){
      var randomDelay = Math.floor(Math.random() * -8000);
      console.log(randomDelay);
      for(var property in scanLines ){
        scanLines[property][i].style.animationDelay = randomDelay + "ms";
      } 
    }
  }
  
  randomiseScan();