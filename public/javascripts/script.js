// document.addEventListener('DOMContentLoaded', () => {

//   console.log('IronGenerator JS imported successfully!');

// }, false);

// import {
//   Calendar
// } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
window.onload = function () {
  console.log('entroa crear calendarrrrr')
  // document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  console.log(calendar)
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ['dayGrid', 'timegrid', 'list', 'timeline', 'rrule'],
    defaultView: 'dayGridWeek',
    defaultDate: '2019-05-07',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
  });

  calendar.render();
  // });
}