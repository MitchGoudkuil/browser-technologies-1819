let checkInterval = setInterval(checkNotifications, 1000);
let showOnce = false
let showSecondOnce = false
async function checkNotifications() {
  console.log('check voor notificatie');

  let data = await fetch('http://localhost:3000/checkNotification')

  data = await data.json()

  const liveNotification = document.querySelector('.notification-live');
  if (data.liveNotification === true) {
    liveNotification.classList.remove("hide")
    liveNotification.classList.add("show")
  }

  const notification = document.querySelector('.notification');
  if (data.notification === true && showOnce === false) {
    notification.classList.add("goal")
    setTimeout(function() {
      notification.classList.remove("goal")
      data.notification = false
    }, 5000)
    showOnce = true
  }

  const halfTimeNotification = document.querySelector('.halftime-notification');
  if (data.halfTimeNotification === true && showSecondOnce === false) {
    halfTimeNotification.classList.add("goal")
    setTimeout(function() {
      halfTimeNotification.classList.remove("goal")
      data.halfTimeNotification = false
    }, 5000)
    showSecondOnce = true
  }
}
