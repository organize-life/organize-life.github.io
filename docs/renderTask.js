const renderTask = ({task, context, index}) => {
  const li = document.createElement('li');
  li.textContent = `[${task.tags.join(', ')}] ${task.text}`;

  if(context === 'retrospective'  ||  context === 'evolvingTasks') {
    const upBtn = document.createElement('button');
    upBtn.textContent = '^';
    Object.assign(upBtn.style, {userSelect: 'none'});
    upBtn.onclick = () => moveTaskUp(index, context);

    const downBtn = document.createElement('button');
    downBtn.textContent = 'v';
    Object.assign(downBtn.style, {userSelect: 'none'});
    downBtn.onclick = () => moveTaskDown(index, context);

    const other_button = (() => {
      if(context === 'retrospective') {
        const uncompleteBtn = document.createElement('button');
        uncompleteBtn.textContent = '↶';
        Object.assign(uncompleteBtn.style, {userSelect: 'none'});
        uncompleteBtn.onclick = () => moveFromRetrospective(index);
        return uncompleteBtn;
      } else if(context === 'evolvingTasks') {
        const completeBtn = document.createElement('button');
        completeBtn.textContent = '✓';
        Object.assign(completeBtn.style, {userSelect: 'none'});
        completeBtn.onclick = () => moveToRetrospective(index);
        return completeBtn;
      } else {
        notify_a_developer({unique_id: '0.6901235514245997'});
        return 'error';
      }
    })();

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    Object.assign(deleteBtn.style, {userSelect: 'none'});
    deleteBtn.onclick = () => deleteTask(task.id, context);
    li.appendChild(deleteBtn);

    li.append(upBtn, downBtn, other_button, deleteBtn);
  } else if(context === 'originalPlan') {
    // Do nothing
  } else {
    console.error('unexpected condition 0.07318440322950215');
  }

  return li;
};
