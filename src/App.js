import { useEffect, useState } from 'react';

function App() {

  const [tasks,setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState(0)

  function removeTask(task_id) {
    const temp_tasks = []
    let id = 1;
    tasks.forEach(task=>{
      if (task.id!==task_id) {
        temp_tasks.push(task)
        id += 1;
      } else {
        const input = document.getElementById(`task-${task_id}-input`)
        if (input.checked) {
          setCompletedTasks(completedTasks-1);
        }
      }
    })

    setTasks(temp_tasks);
  }

  function changeActiveStatus(task_id) {
    const input = document.getElementById(`task-${task_id}-input`)
    console.log(`task-${task_id}-title`)
    let completed_tasks = 0
    if (input.checked) {
      completed_tasks += 1;
      document.getElementById(`task-${task_id}-title`).style.textDecoration = 'line-through';
    } else {
      document.getElementById(`task-${task_id}-title`).style.textDecoration = 'inherit';
    }
    setCompletedTasks(completed_tasks)
  }

  function getAllTasks() {
    const el_array = []
    tasks.forEach(task=>{
      el_array.push(
        <div key={task.id} className="main-tasks-each">
          <input id={"task-"+task.id+"-input"} onChange={()=>{
            changeActiveStatus(task.id)
          }} type="checkbox"></input>
          <p id={"task-"+task.id+'-title'}>{task.title}</p>
          <div className="main-tasks-each-buttondiv">
            <button onClick={()=>{
              removeTask(task.id)
            }}>Remove</button>
          </div>
        </div>
      )
    })
    return el_array;
  }

  function addTask() {
    const task = document.querySelector("input.add-new-task").value;
    const temp_tasks = [...tasks, {
      title:task,
      type:'active'
    }];

    let id = 1;

    temp_tasks.forEach(task=>{
      task['id'] = id;
      id += 1;
    });

    setTasks(temp_tasks);
  }
  
  function getTotalTasks() {
    return tasks.length;
  }

  return (
    <div className="main">
      <h1>react-todo-app</h1>
      <p className="main-p">View project on <a target="_blank" href="https://github.com/ubaidrmn/react-todo-app">github</a>.</p>
      <input className="add-new-task" placeholder="Add a new task"></input>
      <button onClick={addTask} className="add-new-task-button">Add</button>
      <div className='main-tasks'>
        {getAllTasks()}
      </div>
      <p>{completedTasks} completed / {getTotalTasks()} total</p>
    </div>
  );
}

export default App;
