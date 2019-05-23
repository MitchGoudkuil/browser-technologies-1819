var checkInterval = setInterval(checkNotifications, 1000);
var showOnce = false
var showSecondOnce = false
async function checkNotifications() {
  var data = await fetch('http://localhost:3000/checkNotification')

  var liveNotification = document.getElementById('notification-live');
  var notification = document.getElementById('notification');
  var halfTimeNotification = document.getElementById('halftime-notification');

  data = await data.json()

  if (data.liveNotification === true) {
    liveNotification.classList.remove("hide")
    liveNotification.classList.add("show")
  }

  if (data.notification === true && showOnce === false) {
    notification.classList.add("goal")
    setTimeout(function() {
      notification.classList.remove("goal")
      data.notification = false
    }, 5000)
    showOnce = true
  }

  if (data.halfTimeNotification === true && showSecondOnce === false) {
    halfTimeNotification.classList.add("goal")
    setTimeout(function() {
      halfTimeNotification.classList.remove("goal")
      data.halfTimeNotification = false
    }, 5000)
    showSecondOnce = true
  }
}
