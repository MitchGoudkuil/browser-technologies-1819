self.addEventListener('push', e => {
  const data = e.data.json();

  self.registration.showNotification(data.title, {
    body: 'The game between Ajax and PSV started',
    icon: '../img/start.svg'
  });
})
