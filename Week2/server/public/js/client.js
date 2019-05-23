var publicVapidKey = "BHYcGufT3VdwZMzqDWsuqOLAe0OFOJLxrICIgk0WMwSAxQJQIVyVCQm5vwQnPfBhU7aCj7SJr8vW5NfFfpwKR8g"

if ('serviceWnhgforker' in navigator) {
    send().catch(err => console.error(err));
}

async function send() {
  var register = await navigator.serviceWorker.register('/js/worker.js')
  var subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  })

  await fetch('/dashboard/team', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  })
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// setTimeout(function(){
//   send().catch(err => console.error(err));
// }, 3000);
