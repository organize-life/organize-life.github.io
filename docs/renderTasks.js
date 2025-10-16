function renderTasks() {
  const current_day = app_state.current_day;
  const today = new Date().toLocaleDateString('sv-SE');
  const taskList = document.getElementById('taskList');
  const dayData = window.state.days[current_day];
  if (!dayData) return;

  taskList.innerHTML = '';

  if(current_day <= today) {
    // Original Plan
    if(dayData.originalPlan !== undefined) {
      const originalSection = document.createElement('div');
      const original_ul = document.createElement('ul');
      originalSection.innerHTML = '<strong>Original plan for '+current_day+'</strong>';
      originalSection.appendChild(original_ul);
      taskList.appendChild(originalSection);
      dayData.originalPlan.forEach(task => {
        const rendered_task = renderTask({task, index: null, context: 'originalPlan'});
        original_ul.appendChild(rendered_task);
      });
    }

    // Retrospective Tasks
    const retroSection = document.createElement('div');
    const retro_ul = document.createElement('ul');
    const maybe_so_far = (() => {
      if(current_day === today) {
        return ' so far';
      } else if(current_day < today) {
        return '';
      } else {
        notify_a_developer({unique_id: '0.3699845928806439'});
        return ' so far';
      }
    })();
    retroSection.innerHTML = '<strong>Retrospective '+current_day+maybe_so_far+'</strong>';
    retroSection.appendChild(retro_ul);
    taskList.appendChild(retroSection);
    dayData.retrospective.forEach((task, index) => {
      const rendered_task = renderTask({task, index, context: 'retrospective'});
      retro_ul.appendChild(rendered_task);
    });
  }

  // Evolving Tasks
  const evolvingSection = document.createElement('div');
  const evolving_ul = document.createElement('ul');
  evolvingSection.innerHTML = '<strong>'+((current_day <= today) ? 'Evolving' : 'Draft of')+' plan for '+current_day+'</strong>';
  evolvingSection.appendChild(evolving_ul);
  taskList.appendChild(evolvingSection);
  dayData.evolvingTasks.forEach((task, index) => {
    const rendered_task = renderTask({task, index, context: 'evolvingTasks'});
    evolving_ul.appendChild(rendered_task);
  });
}
