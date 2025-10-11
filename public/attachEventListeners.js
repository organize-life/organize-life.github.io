function attachEventListeners() {
  document.getElementById('prevDay').addEventListener('click', () => {
    const d = new Date(app_state.current_day);
    d.setDate(d.getDate() - 1);
    app_state.current_day = d.toISOString().split('T')[0];
    render();
  });
  document.getElementById('nextDay').addEventListener('click', () => {
    const d = new Date(app_state.current_day);
    d.setDate(d.getDate() + 1);
    app_state.current_day = d.toISOString().split('T')[0];
    render();
  });

  const taskInput = document.getElementById('taskInput');
  const taskTypeRadios = document.querySelectorAll('input[name="taskType"]');

  taskTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      taskInput.style.display = radio.value === 'other' ? '' : 'none';
      if (radio.value === 'exercise') taskInput.value = '';
    });
  });

  document.getElementById('addTask').addEventListener('click', () => {
    const type = document.querySelector('input[name="taskType"]:checked').value;
    const text = taskInput.value.trim();

    if (type === 'other' && !text) {
      alert('Please describe the task.');
      return;
    }

    if (type === 'other' && /exercise/i.test(text)) {
      if (!confirm('Did you mean to create an "Exercise" task? Click OK to proceed as "Other".')) {
        return;
      }
    }

    addTask({tags: ((type === 'exercise') ? ['exercise'] : []), text, id: Math.random()+''});

    taskInput.value = '';
    //renderTasks();
  });
}
