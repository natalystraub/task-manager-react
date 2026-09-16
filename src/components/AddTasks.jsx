import PropTypes from 'prop-types';
import { useState } from 'react';

AddTasks.propTypes = {
  addTask: PropTypes.func.isRequired,
};

function AddTasks({ addTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [error, setError] = useState('');

  return (
    <div className="space-y-4 p-6 bg-[#dddef8] rounded-md shadow flex flex-col ">
      <input
        type="text"
        placeholder="Digite o título da tarefa"
        className="border bg-[#ededfd] border-[#d1d3fc] outline-[#b2b4f9] px-4 py-2 rounded-md"
        value={taskTitle}
        onChange={(event) => setTaskTitle(event.target.value)}
      />
      <input
        type="text"
        placeholder="Digite a descrição da tarefa"
        className="border  bg-[#ededfd] border-[#d1d3fc] outline-[#b2b4f9] px-4 py-2 rounded-md"
        value={taskDescription}
        onChange={(event) => setTaskDescription(event.target.value)}
      />
      <button
        onClick={() => {
          taskTitle && taskDescription
            ? addTask(taskTitle, taskDescription)
            : setError('Preencha todas as informações');

          setTaskTitle('');
          setTaskDescription('');
        }}
        className="bg-[#868ae9] text-white px-4 py-2 rounded-md"
      >
        Adicionar
      </button>

      {error && <p>{error}</p>}
    </div>
  );
}

export default AddTasks;
