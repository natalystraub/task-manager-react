import { ChevronsRightIcon, TrashIcon } from 'lucide-react';
import PropTypes from 'prop-types';

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  onTaskClick: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

function Tasks({ tasks, onTaskClick, deleteTask }) {
  return (
    <ul className="space-y-4 p-6 bg-[#dddef8] rounded-md shadow">
      {tasks.map((task, key) => (
        <li key={key} className="flex gap-2">
          <button
            onClick={() => onTaskClick(task.id)}
            className={`bg-[#9da0f4] text-white p-2 rounded-md w-full text-left ${task.isCompleted && 'line-through'}`}
          >
            {task.title}
          </button>
          <button className="bg-[#9da0f4] text-white rounded-md p-2">
            <ChevronsRightIcon />
          </button>
          <button onClick={() => deleteTask(task.id)} className="bg-[#9da0f4] text-white rounded-md p-2">
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
