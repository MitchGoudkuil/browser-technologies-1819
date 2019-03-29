var checkInterval = setInterval(checkNotifications, 1000);
var showOnce = false
var showSecondOnce = false
async function checkNotifications() {
  console.log('check voor notificatie');

  var data = await fetch('http://localhost:3000/checkNotification')

  data = await data.json()

  var liveNotification = document.querySelector('.notification-live');
  if (data.liveNotification === true) {
    liveNotification.classList.remove("hide")
    liveNotification.classList.add("show")
  }

  var notification = document.querySelector('.notification');
  if (data.notification === true && showOnce === false) {
    notification.classList.add("goal")
    setTimeout(function() {
      notification.classList.remove("goal")
      data.notification = false
    }, 5000)
    showOnce = true
  }

  var halfTimeNotification = document.querySelector('.halftime-notification');
  if (data.halfTimeNotification === true && showSecondOnce === false) {
    halfTimeNotification.classList.add("goal")
    setTimeout(function() {
      halfTimeNotification.classList.remove("goal")
      data.halfTimeNotification = false
    }, 5000)
    showSecondOnce = true
  }
}
