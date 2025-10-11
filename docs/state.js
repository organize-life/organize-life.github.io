function ensureDayExists(day) {
  if(!state.days) state.days = {};
  if(!state.days[day]) {
    state.days[day] = {
      date: day,
      evolvingTasks: [],
      retrospective: [],
      auditLog: []
    };
  }
}

function addTask(task) {
  ensureDayExists(app_state.current_day);
  state.days[app_state.current_day].evolvingTasks.push(task);
  possibly_audit({type: 'add', task});
  saveToStorage();
}

function deleteTask(taskId, context) {
  const dayData = window.state.days[app_state.current_day];
  if (!dayData) return;

  const index = dayData[context].findIndex(t => t.id === taskId);
  if (index !== -1) {
    possibly_audit({type: 'delete', task: dayData[context][index]});
    dayData[context].splice(index, 1);
    saveToStorage();
  }
}

function moveTaskUp(index, context) {
  if(index > 0) {
    const tasks = window.state.days[app_state.current_day][context];
    possibly_audit({type: 'move_up', task_id: tasks[index].id});
    [tasks[index - 1], tasks[index]] = [tasks[index], tasks[index - 1]];
    saveToStorage();
  }
}

function moveTaskDown(index, context) {
  if(index < window.state.days[app_state.current_day][context].length - 1) {
    const tasks = window.state.days[app_state.current_day][context];
    possibly_audit({type: 'move_down', task_id: tasks[index].id});
    [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
    saveToStorage();
  }
}

function moveToRetrospective(index) {
  const tasks = window.state.days[app_state.current_day].evolvingTasks;
  const task = tasks.splice(index, 1)[0];
  possibly_audit({type: 'complete', task_id: task.id, prior_index: index});
  window.state.days[app_state.current_day].retrospective.push(task);
  saveToStorage();
}

function moveFromRetrospective(index) {
  const tasks = window.state.days[app_state.current_day].retrospective;
  const task = tasks.splice(index, 1)[0];
  possibly_audit({type: 'uncomplete', task_id: task.id, prior_index: index});
  window.state.days[app_state.current_day].evolvingTasks.splice(0, 0, task);
  saveToStorage();
}

function possibly_audit(action) {
  const today = new Date().toLocaleDateString('sv-SE');  // YYYY-MM-DD in local time
  if(today <= app_state.current_day)
    return;  // Do nothing

  const day_data = window.state.days[app_state.current_day];
  if(day_data.auditLog === undefined)
    day_data.auditLog = [];
  day_data.auditLog.push({action, timestamp: new Date().toISOString()});
}
