import { ChevronLeft, ChevronLeftIcon } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function TaskPages() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title');
  const description = searchParams.get('description');

  return (
    <div className="w-screen h-screen bg-[#8084ED] flex justify-center p-6">
      <div className="w-125 space-y-4">
        <div className="flex justify-center relative mb-6">
          <button onClick={() => navigate(-1)} className="absolute left-0 top-0 bottom-0 text-white">
            <ChevronLeftIcon />
          </button>
          <h1 className="text-3xl text-white font-bold text-center">Detalhes da Tarefa</h1>
        </div>
        <div className="bg-[#dddef8] p-4 rounded-md">
          <h2 className="text-xl font-bold text-[#6b6ed2]">{title}</h2>
          <p className="text-[#8084ED]">{description}</p>
        </div>
      </div>
    </div>
  );
}
