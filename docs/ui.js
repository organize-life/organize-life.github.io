function render() {
  const app = document.body;
  app.innerHTML = `
    <div class="app">
      <header>
        <button id="prevDay">&lt;&lt;</button>
        <h1>${app_state.current_day}</h1>
        <button id="nextDay">&gt;&gt;</button>
      </header>
      <main>
        <div class="input-group"></div>
        <div id="taskList"></div>
        <div id="monthlyReport"></div>
        <div id="auditLog"></div>
      </main>
    </div>
  `;
  renderTaskForm();
  renderTasks();
  renderReport();
  attachEventListeners();
  renderAuditLog();
}

function renderTaskForm() {
  const form = document.querySelector('.input-group');
  form.innerHTML = `
    <label>
      <input type="radio" name="taskType" value="other" checked> Other
    </label>
    <label>
      <input type="radio" name="taskType" value="exercise"> Exercise
    </label>
    <input type="text" id="taskInput" placeholder="Task description">
    <button id="addTask">Add</button>
  `;
}

function renderReport() {
  const report = document.getElementById('monthlyReport');
  report.innerHTML = '';
  const [year, month] = app_state.current_day.split('-');
  if (month !== '01' && app_state.current_day.endsWith('-01')) {
    const prevMonth = parseInt(month, 10) - 1;
    const monthStr = prevMonth < 10 ? `0${prevMonth}` : `${prevMonth}`;
    const monthStart = `${year}-${monthStr}-01`;
    const monthEnd = `${year}-${monthStr}-${new Date(year, prevMonth, 0).getDate()}`;

    let completedCount = 0;
    for (const dateStr in state.days) {
      if (dateStr >= monthStart && dateStr <= monthEnd) {
        const dayData = state.days[dateStr];
        completedCount += dayData.retrospective.filter(t => t.tags.includes('exercise')).length;
      }
    }

    report.innerHTML = `
      <div class="report-box">
        <h2>Monthly Report: ${getMonthName(prevMonth)} ${year}</h2>
        <p>Exercise sessions completed: <strong>${completedCount}</strong></p>
      </div>
    `;
  }
}

function renderAuditLog() {
  const auditLog = window.state.days[app_state.current_day]?.auditLog  ||  [];
  if(auditLog.length === 0)
    return;

  const report = document.getElementById('auditLog');
  report.innerHTML = `\
    <h2>Audit log:</h2>
  `;
  for(const item of auditLog) {
    const div = document.createElement('div');
    div.innerText = JSON.stringify(item);
    report.appendChild(div);
  }
}
