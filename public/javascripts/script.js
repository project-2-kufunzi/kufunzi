window.onload = () => {
  console.log('entro a crear calendarrrrr')
  // document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  const calendarDOM = new FullCalendar.Calendar(calendarEl, {
    plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'rrule'],
    defaultView: 'timeGridWeek',
    eventClick: function (info) {
      var eventObj = info.event;

      if (eventObj.url) {
        alert(
          'Clicked ' + eventObj.title + '.\n' +
          'Will open ' + eventObj.url + ' in a new tab'
        );

        window.open(eventObj.url);

        info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
      } else {
        alert('Clicked ' + eventObj.title);
      }
    },
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: {
      url: '/workouts/calendar',
      method: 'GET',
      // extraParams: {
      //   custom_param1: 'something',
      //   custom_param2: 'somethingelse'
      // },
      failure: function () {
        alert('there was an error while fetching events!');
      },
      color: '#3ab6e2', // a non-ajax option
      textColor: 'black' // a non-ajax option
    },
    views: {
      timeGridWeek: { // name of view
        titleFormat: false
        // other view-specific options here
      }
    }

  });
  console.log(calendarDOM)
  calendarDOM.render();
  // });
}

//dayGridMonth --> options