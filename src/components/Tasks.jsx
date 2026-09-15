import { ChevronsRightIcon } from 'lucide-react';

function Tasks(props) {
  return (
    <ul className="space-y-4 p-6 bg-[#dddef8] rounded-md shadow">
      {props.tasks.map((task, key) => (
        <li key={key} className="flex gap-2">
          <button
            onClick={() => props.onTaskClick(task.id)}
            className={`bg-[#9da0f4] text-white p-2 rounded-md w-full text-left ${task.isCompleted && 'line-through'}`}
          >
            {task.title}
          </button>
          <button className="bg-[#9da0f4] text-white rounded-md p-2">
            <ChevronsRightIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
