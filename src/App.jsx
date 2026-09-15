import { useState } from 'react';
import AddTasks from './components/AddTasks';
import Tasks from './components/Tasks';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Estudar programação',
      description: 'Desenvolver projetos em React',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Estudar inglês',
      description: 'Assistir vídeos totalmente em inglês',
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Realizar os exercícios da faculdade',
      description: 'Estudar para as provas',
      isCompleted: false,
    },
  ]);

  function onTaskClick(taskId) {
    const newTask = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });

    setTasks(newTask);
  }

  function deleteTask(taskId) {
    const removeTask = tasks.filter((task) => task.id !== taskId);

    setTasks(removeTask);
  }

  return (
    <div className="w-screen h-screen bg-[#8084ED] flex justify-center p-6">
      <div className="w-125">
        <h1 className="text-3xl text-slate-100 font-bold text-center ">Gerenciador de Tarefas</h1>
        <AddTasks />
        <Tasks tasks={tasks} onTaskClick={onTaskClick} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default App;
