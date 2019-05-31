window.onload = () => {

  // document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  const calendarDOM = new FullCalendar.Calendar(calendarEl, {
    plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'rrule'],
    defaultView: 'timeGridWeek',
    locale: 'es',
    minTime: '06:00:00',

    /*   eventClick: function (info) {
        var eventObj = info.event;
        info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
        if (eventObj.url) {
          window.open(eventObj.url);
        }
      }, */
    titleFormat: {
      year: 'numeric',
      month: 'short'
    },
    //cambiar el fondo de un slot clicandole
    // dateClick: function (info) {
    //   // change the day's background color just for fun
    //   info.dayEl.style.backgroundColor = 'rgba(58, 181, 226, 0.356)';
    // },
    //
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
      color: 'rgba(58, 181, 226, 0.356)', // a non-ajax option
      textColor: 'black' // a non-ajax option
    },
    views: {
      timeGridWeek: { // name of view
        titleFormat: {
          month: 'short'
        },
        allDaySlot: false,

      },
      timeGridDay: { // name of view
        titleFormat: {
          month: 'short',
          day: '2-digit'
        },
      }

      // other view-specific options here
    }

  })
  calendarDOM.render();
};


//dayGridMonth --> options
// views: {
//   timeGrid: { // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
//     titleFormat: {
//       year: 'numeric',
//         month: 'long'
//     },
//     minTime: {
//           default: "06:00:00"
//     }

//   },

// if (eventObj.url) {
//   alert(
//     'Clicked ' + eventObj.title + '.\n' +
//     'Will open ' + eventObj.url + ' in a new tab'
//   );

//   window.open(eventObj.url);


// } else {
//   alert('Clicked ' + eventObj.title);
// }