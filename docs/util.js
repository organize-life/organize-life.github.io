function getMonthName(monthIndex) {
  const names = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return names[monthIndex - 1] || '';
}

function enumerateDays(start, end) {
  const a = new Date(start);
  const b = new Date(end);
  const days = [];
  const current = new Date(a);
  current.setDate(current.getDate() + 1);
  while(current <= b) {
    days.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return days;
}

function format_time(date) {
  return date.toLocaleString('sv-SE') + '.' + (date.getMilliseconds()+'').padStart(3, '0');
}

let collection_of_intervals = {};
function my_set_interval(...args) {
  const ret = setInterval(...args);
  collection_of_intervals[ret] = [...args];
  console.log('my_set_interval('+JSON.stringify(args).slice(1, -1)+')');
  return ret;
}
function my_clear_interval(id) {
  console.log('my_clear_interval('+id+') '+JSON.stringify(collection_of_intervals[id]));
  delete collection_of_intervals[id];
  return clearInterval(id);
}

function notify_a_developer({unique_id}) {
  console.error('unexpected condition ' + unique_id);
}
