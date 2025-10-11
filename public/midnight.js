function scheduleNextMidnight() {
  const ARBITRARY_INTERVAL = 2000;  // milliseconds

  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  const tomorrow_time = tomorrow.getTime();

  console.log('Intending next midnight task to occur at ' + tomorrow);

  let check_count = 0;
  const interval_id = my_set_interval(() => {
    check_count += 1;
    if((check_count & (check_count - 1)) === 0)
      console.log('Checking for midnight, for the "'+check_count+'" time.');

    const now = Date.now();
    if(now >= tomorrow_time) {
      my_clear_interval(interval_id);
      scheduleNextMidnight();
      acquireMidnightLock(now);
    }
  }, ARBITRARY_INTERVAL);
}

function handleMissedMidnights(today) {
  let lastSnapshot = localStorage.getItem('last_snapshot_taken_on');

  if(lastSnapshot === today)
    return;

  if(lastSnapshot === null) {
    localStorage.setItem('last_snapshot_taken_on', today);
    return;
  }

  const days = enumerateDays(lastSnapshot, today);
  for(const day of days)
    createOriginalPlanSnapshot(day);
  saveToStorage();
  localStorage.setItem('last_snapshot_taken_on', today);
}

async function acquireMidnightLock(now) {
  console.log('About to wait for lock "midnight_snapshot"; ' + format_time(new Date()));
  await navigator.locks.request('midnight_snapshot', async() => {
    console.log('Acquired lock "midnight_snapshot"; ' + format_time(new Date()));
    handleMissedMidnights(now);
  });
  console.log('Released lock "midnight_snapshot"; ' + format_time(new Date()));
}

function createOriginalPlanSnapshot(date) {
  console.log('Executing createOriginalPlanSnapshot("'+date+'")');

  ensureDayExists(date);

  const dayData = window.state.days[date];
  if(dayData.originalPlan !== undefined)
    console.error('unexpected condition HPnaI69jI8vLgdqZKZmZ');
  dayData.originalPlan = [...dayData.evolvingTasks];
}
