var checkInterval = setInterval(checkNotifications, 1000);
var showOnce = false;
var showSecondOnce = false;
var count = 0;

if (document) {
  var refreshButton = document.getElementById("refresh");
  refreshButton.style.display = "none";
}

async function checkNotifications() {
  console.log("check voor notificatie");
  if (window.fetch) {
    var data = await fetch("http://localhost:3000/checkNotification");
    data = await data.json();
  } else {
    function reqListener() {
      var data = JSON.parse(this.responseText);
    }
    function reqError(err) {
      console.log(err);
    }
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.onerror = reqError;
    oReq.open("get", "http://localhost:3000/checkNotification", true);
    oReq.send();
  }

  var liveNotification = document.getElementById("live");
  var timer = document.getElementById("timer");
  if (data.liveNotification === true) {
    liveNotification.classList.remove("hide");
    liveNotification.classList.add("show");
  }
  timer.innerHTML = checkInterval;

  var notification = document.getElementById("notification");
  if (data.notification === true && showOnce === false) {
    notification.classList.add("goal");
    setTimeout(function() {
      notification.classList.remove("goal");
      data.notification = false;
    }, 5000);
    showOnce = true;
  }

  var halfTimeNotification = document.getElementById("halftimeNotification");
  if (data.halfTimeNotification === true && showSecondOnce === false) {
    halfTimeNotification.classList.add("goal");
    setTimeout(function() {
      halfTimeNotification.classList.remove("goal");
      data.halfTimeNotification = false;
    }, 5000);
    showSecondOnce = true;
  }
}
