import AddTasks from './components/AddTasks';
import Tasks from './components/Tasks';

function App() {
  return (
    <div className="w-screen h-screen bg-[#8084ED] flex justify-center p-6">
      <div className="w-/[500px]">
        <h1 className="text-3xl text-slate-100 font-bold text-center ">Gerenciador de Tarefas</h1>
        <AddTasks />
        <Tasks />
      </div>
    </div>
  );
}

export default App;
