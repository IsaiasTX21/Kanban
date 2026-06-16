import { ReactSortable } from "react-sortablejs";
import editicon from "./assets/edit.png";
import trash from "./assets/trash.png";
import userphoto from "./assets/user.png";

type User = {
  id: number;
  name: string;
  task: string;
  photo?: string;
};

type ColumnTasksProps = {
  title: string;
  tasks: User[];
  setTasks: (newList: User[]) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onCreate: () => void;
};

export function ColumnTasks({ title, tasks, setTasks, onDelete, 
  onEdit, onCreate }: ColumnTasksProps) {
  return (
    <div className="card">
      <span>{title}</span>

      <ReactSortable
        className="sortable"
        list={tasks}
        setList={setTasks}
        group="groupName"
        animation={80}
      >
        {tasks.map((item) => (
          <div className="task" key={item.id}>
            <span className="name">
              <img
                src={item.photo || userphoto}
                alt="avatar"
              />
              {item.name}
            </span>

            <p>{item.task}</p>

            <button
              className="trash"
              onClick={() => onDelete(item.id)}
            >
              <img
                className="icon"
                src={trash}
                alt="icone lixeira"
              />
            </button>

            <button
              className="edit"
              onClick={() => onEdit(item.id)}>

              <img
                className="icon"
                src={editicon}
                alt="icone edição"/>

            </button>
          </div>
        ))}
      </ReactSortable>

      <button
        className="m-auto btn"
        onClick={onCreate}
      >
        <span>+ Adicionar tarefa</span>
      </button>
    </div>
  );
}