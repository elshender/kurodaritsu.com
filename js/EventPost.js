
var eventsData;
var eventsConfig = {
    sheet: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ7S-83ylp-gnwHDMtLUnYfA5RkHPtrxX8If67wYvblpMAkleLw1SCGUILPyQ1L8ymvWAZvYotQLrJn/pub?output=csv",
    pageFilter: {}
}

//var sPath = window.location.pathname;
//
//var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
//console.log(sPage);

window.addEventListener('DOMContentLoaded', init);

//function filter (filters){
//    
//}

function init() {
    Papa.parse(eventsConfig.sheet, {
    download: true,
    header: true,
    complete: eventPostInit
    })
  }

function eventPostInit(results){
  var data = results.data;
  postEvents(data);
}


function postEvents(eventData){
  var htmlList = ["h1", "img", "h4", "p", "img", "href"]
  var eventArea = document.getElementById("eventTable");
  for(x in eventData){
    var eventEntry = document.createElement("a");
    eventEntry.classList.add("eventEntry");
      var i = 0;
    for(y in eventData[x]){
        var eventField = document.createElement(htmlList[i]);
        eventField.classList.add(y);
        if(htmlList[i] == "img"){
            eventField.src = eventData[x][y];
        } else if (htmlList[i] == "href"){
          eventEntry.href = eventData[x][y];
          i += 1
          continue;
        }
        else {
           eventField.innerHTML = eventData[x][y]; 
        }
        console.log(eventField);
      eventEntry.appendChild(eventField);
        i += 1
    }
    eventArea.insertBefore(eventEntry, eventArea.childNodes[2]);
  }
}

