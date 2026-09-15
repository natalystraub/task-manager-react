function AddTasks() {
  return (
    <div className="space-y-4 p-6 bg-[#dddef8] rounded-md shadow flex flex-col ">
      <input
        type="text"
        placeholder="Digite o título da tarefa"
        className="border bg-[#ededfd] border-[#d1d3fc] outline-[#b2b4f9] px-4 py-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Digite a descrição da tarefa"
        className="border  bg-[#ededfd] border-[#d1d3fc] outline-[#b2b4f9] px-4 py-2 rounded-md"
      />
      <button className="bg-[#868ae9] text-white px-4 py-2 rounded-md">Adicionar</button>
    </div>
  );
}

export default AddTasks;
