// type Task = {
//   id: number;
//   text: string;
//   tags: Array<string>;  // Only allowable values: [] and ['exercise']
// };
//
// type AuditLogEntry = {
//   action:
//   | {type: 'add';        task: Task     }
//   | {type: 'complete';   task_id: number}
//   | {type: 'uncomplete'; task_id: number}
//   | {type: 'delete';     task:Task      }
//   | {type: 'move-up';    task_id: number}
//   | {type: 'move-down';  task_id: number}
//   timestamp: string; // ISO date
// };
//
// type DayData = {
//   date: string; // YYYY-MM-DD
//   originalPlan?: Task[];
//   evolvingTasks: Task[];
//   retrospective: Task[];
//   auditLog: AuditLogEntry[];
// };
//
// type PersistentAppState = {
//   days : Record<string /*YYYY-MM-DD*/, DayData>;
// };
//
// window.app_state : {
//   current_day : string;  // YYYY-MM-DD
// }

async function main() {
  window.app_state = {current_day: new Date().toLocaleDateString('sv-SE')}; // YYYY-MM-DD in local time

  loadFromStorage();
  acquireMidnightLock(app_state.current_day);
  setupCrossTabSync();
  scheduleNextMidnight();
  await new Promise((resolve) => {window.addEventListener('load', resolve);});
  render();
}

main();
