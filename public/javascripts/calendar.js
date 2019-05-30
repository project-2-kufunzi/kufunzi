window.onload = () => {
  console.log('entroa crear calendarrrrr')
  // document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new Calendar(calendarEl, {
    timeZone: 'UTC',
    events: [{
      id: 'a',
      title: 'my event',
      start: '2018-09-01'
    }]
  })
  console.log(calendar)
  calendar.render();
  // });
}