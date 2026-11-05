# ✅ Gerenciador de Tarefas

> Um app simples para **organizar o dia a dia**, feito com React.
> Crie tarefas com título e descrição, marque como concluídas, exclua e abra uma página de detalhes para cada uma.

<p>
  <img alt="React 18" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" />
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" />
</p>

🔗 **Demo:** [task-manager-react-khaki.vercel.app](https://task-manager-react-khaki.vercel.app/)

---

## 📚 Sumário

1. [O que o app faz](#-o-que-o-app-faz)
2. [Rodando em 1 minuto](#-rodando-em-1-minuto)
3. [As duas telas](#️-as-duas-telas)
4. [Como funciona por dentro](#️-como-funciona-por-dentro)
5. [Navegação entre as telas](#-navegação-entre-as-telas)
6. [Componentes](#-componentes)
7. [Mapa das pastas](#️-mapa-das-pastas)
8. [Comandos](#️-comandos)
9. [O que eu pratiquei neste projeto](#-o-que-eu-pratiquei-neste-projeto)
10. [Próximos passos](#-próximos-passos)

---

## 🎯 O que o app faz

- **Criar** uma tarefa com título e descrição.
- **Validar** o formulário: se faltar o título ou a descrição, aparece o aviso _"Preencha todas as informações"_.
- **Concluir** uma tarefa clicando nela. O título fica riscado. Clicando de novo, ela volta a ficar pendente.
- **Excluir** uma tarefa pelo ícone de lixeira 🗑️.
- **Ver detalhes** pelo ícone de setas ≫, que abre uma página só daquela tarefa.

O app já começa com três tarefas de exemplo.

---

## 🚀 Rodando em 1 minuto

Você só precisa ter o **[Node.js](https://nodejs.org/)** instalado. Para conferir, rode `node -v` no terminal.

```bash
# 1. Baixe o projeto
git clone git@github.com:natalystraub/task-manager-react.git

# 2. Entre na pasta
cd task-manager-react

# 3. Instale as dependências (só precisa fazer uma vez)
npm install

# 4. Ligue o app
npm run dev
```

Abra **http://localhost:5173** no navegador.

> ⚠️ As tarefas ficam guardadas só na memória. Se você **recarregar a página**, a lista volta para as três tarefas de exemplo.

---

## 🖥️ As duas telas

```
  Tela inicial  ( / )                          Detalhes  ( /task )
┌──────────────────────────────────┐        ┌──────────────────────────────────┐
│      Gerenciador de Tarefas      │        │  <   Detalhes da Tarefa          │
│ ┌──────────────────────────────┐ │        │ ┌──────────────────────────────┐ │
│ │ [ título da tarefa        ]  │ │        │ │ Estudar inglês               │ │
│ │ [ descrição da tarefa     ]  │ │        │ │ Assistir vídeos totalmente   │ │
│ │ [        Adicionar        ]  │ │        │ │ em inglês                    │ │
│ └──────────────────────────────┘ │        │ └──────────────────────────────┘ │
│ ┌──────────────────────────────┐ │        └──────────────────────────────────┘
│ │ [ Estudar programação ][≫][🗑]│ │                       ▲
│ │ [ Estudar inglês      ][≫][🗑]│ │ ── clique em ≫ ───────┘
│ │ [ Exercícios faculdade][≫][🗑]│ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
```

O botão **`<`** na tela de detalhes volta para a tela anterior.

---

## ⚙️ Como funciona por dentro

### Onde as tarefas ficam

A lista de tarefas é um **estado** (`useState`) no componente [`App.jsx`](src/App.jsx). Cada tarefa é um objeto assim:

```js
{
  id: 1,                                         // identificador da tarefa
  title: 'Estudar programação',                  // título
  description: 'Desenvolver projetos em React',  // descrição
  isCompleted: false,                            // true = concluída (aparece riscada)
}
```

O `App` guarda a lista e as **três funções** que mudam essa lista. Ele passa essas funções para os componentes filhos por **props**:

```
                 App  (guarda a lista de tarefas)
                  │
      ┌───────────┴────────────┐
      ▼                        ▼
  AddTasks                   Tasks
  recebe addTask()           recebe tasks, onTaskClick() e deleteTask()
```

Os filhos não mudam a lista diretamente. Eles **chamam a função** que receberam, e o `App` atualiza o estado. Quando o estado muda, o React redesenha a tela sozinho.

### As três funções

**Concluir / desfazer** com `onTaskClick`: percorre a lista com `.map()` e inverte o `isCompleted` só da tarefa clicada.

```js
function onTaskClick(taskId) {
  const newTask = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, isCompleted: !task.isCompleted };
    }
    return task;
  });
  setTasks(newTask);
}
```

**Excluir** com `deleteTask`: usa `.filter()` para criar uma lista nova **sem** a tarefa clicada.

```js
function deleteTask(taskId) {
  const removeTask = tasks.filter((task) => task.id !== taskId);
  setTasks(removeTask);
}
```

**Adicionar** com `addTask`: cria a tarefa nova e coloca no fim da lista com o spread (`...`).

```js
function addTask(taskTitle, taskDescription) {
  const newTask = {
    id: tasks.length + 1,
    title: taskTitle,
    description: taskDescription,
    isCompleted: false,
  };
  setTasks([...tasks, newTask]);
}
```

> 💡 **Por que criar uma lista nova em vez de mudar a antiga?** O React só percebe que algo mudou quando recebe um array **novo**. Por isso usamos `.map()`, `.filter()` e `[...tasks]`, que sempre devolvem um array novo.

### O formulário

O [`AddTasks.jsx`](src/components/AddTasks.jsx) tem três estados próprios:

| Estado            | Para que serve                         |
| ----------------- | -------------------------------------- |
| `taskTitle`       | O que está escrito no campo de título  |
| `taskDescription` | O que está escrito no campo de descrição |
| `error`           | A mensagem de aviso, quando falta algo |

Os campos são **controlados**: o valor do `<input>` vem do estado, e cada tecla atualiza o estado com `onChange`.

Ao clicar em **Adicionar**:

1. Se título **e** descrição estiverem preenchidos, chama `addTask()`.
2. Se faltar algum, mostra _"Preencha todas as informações"_.
3. Em qualquer um dos casos, limpa os dois campos.

---

## 🧭 Navegação entre as telas

As rotas ficam em [`main.jsx`](src/main.jsx), usando o **React Router**:

| Endereço | Tela                                              |
| -------- | ------------------------------------------------- |
| `/`      | [`App`](src/App.jsx): lista e formulário          |
| `/task`  | [`TaskPage`](src/pages/TaskPage.jsx): detalhes    |

### Como os dados chegam na página de detalhes

Ao clicar em **≫**, o app leva o título e a descrição **dentro do endereço**, como _query params_:

```
/task?title=Estudar inglês&description=Assistir vídeos totalmente em inglês
```

```js
// Tasks.jsx: monta o endereço e navega
navigate(`/task?title=${task.title}&description=${task.description}`);

// TaskPage.jsx: lê os valores do endereço
const [searchParams] = useSearchParams();
const title = searchParams.get('title');
const description = searchParams.get('description');
```

O botão de voltar usa `navigate(-1)`, que funciona como o botão "voltar" do navegador.

---

## 🧩 Componentes

| Arquivo                                            | O que faz                                                         |
| -------------------------------------------------- | ----------------------------------------------------------------- |
| [`App.jsx`](src/App.jsx)                           | Guarda a lista de tarefas e as funções de adicionar, concluir e excluir |
| [`AddTasks.jsx`](src/components/AddTasks.jsx)      | Formulário com validação para criar uma tarefa                    |
| [`Tasks.jsx`](src/components/Tasks.jsx)            | Lista as tarefas com os botões de concluir, ver detalhes e excluir |
| [`TaskPage.jsx`](src/pages/TaskPage.jsx)           | Página de detalhes de uma tarefa                                  |

Os componentes usam **PropTypes** para dizer quais props esperam receber. Se uma prop obrigatória faltar, o React avisa no console do navegador.

Os ícones (≫, 🗑️ e `<`) vêm da biblioteca **[lucide-react](https://lucide.dev/)**.

### Estilos

Todo o visual é feito com **[Tailwind CSS](https://tailwindcss.com/)**, direto nas classes dos elementos. As cores principais são:

| Cor       | Uso                         |
| --------- | --------------------------- |
| `#8084ED` | Fundo da página             |
| `#dddef8` | Fundo dos blocos            |
| `#9da0f4` | Botões das tarefas          |
| `#868ae9` | Botão "Adicionar"           |

---

## 🗂️ Mapa das pastas

```
task-manager-react/
├── public/                    arquivos servidos como estão
├── src/
│   ├── components/
│   │   ├── AddTasks.jsx       formulário de nova tarefa
│   │   └── Tasks.jsx          lista de tarefas
│   ├── pages/
│   │   └── TaskPage.jsx       página de detalhes
│   ├── App.jsx                tela inicial + estado das tarefas
│   ├── main.jsx               rotas e ponto de entrada do React
│   └── index.css              importa o Tailwind
├── index.html                 HTML base
└── vite.config.js             configuração do Vite e do Tailwind
```

---

## ⌨️ Comandos

| Comando           | Quando usar                                                  |
| ----------------- | ------------------------------------------------------------ |
| `npm install`     | Na primeira vez que baixar o projeto                         |
| `npm run dev`     | Para trabalhar no app com atualização automática             |
| `npm run build`   | Para gerar a versão final em `dist/`                         |
| `npm run preview` | Para ver a versão final rodando localmente antes de publicar |
| `npm run lint`    | Para procurar problemas no código                            |

---

## 🧠 O que eu pratiquei neste projeto

- Guardar e atualizar dados com **`useState`**
- **Elevar o estado**: a lista fica no `App` e os filhos recebem funções por props
- Atualizar listas sem mutar o original, com **`.map()`**, **`.filter()`** e **spread**
- **Formulários controlados** e validação simples
- **Renderização condicional** (tarefa riscada e mensagem de erro)
- **Rotas** com React Router: `createBrowserRouter`, `useNavigate` e `useSearchParams`
- Passar dados entre páginas com **query params**
- Componentes reutilizáveis com **PropTypes**
- Estilização com **Tailwind CSS** e ícones com **lucide-react**

---

## 🔭 Próximos passos

Ideias para evoluir o projeto:

- [ ] Salvar as tarefas no **localStorage** para não perder ao recarregar
- [ ] Gerar `id` único com `crypto.randomUUID()` (hoje é `tasks.length + 1`, que pode repetir depois de excluir uma tarefa)
- [ ] Apagar a mensagem de erro quando a tarefa for criada com sucesso
- [ ] Usar `encodeURIComponent` nos query params, para títulos com `&` ou `?` funcionarem
- [ ] **Editar** uma tarefa existente
- [ ] **Filtrar** entre todas, pendentes e concluídas

---

Feito por **Nátaly Straub** · [LinkedIn](https://www.linkedin.com/in/nataly-straub) · [GitHub](https://github.com/natalystraub)
