
import { useState, useEffect } from "react";
import { ColumnTasks } from "./Columns";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modals } from "./modal";

export const Kaban = () => {

  type Users = {
    id: number,
    name: string,
    task: string,
    photo?: string | undefined
  }

  type Modal = {
    editor: boolean,
    create: boolean
  }

  type Form = {
    name: string,
    message: string,
    photo?: string
  }
  type Tasks = {
    todo: Users[];
    doing: Users[];
    review: Users[];
    done: Users[];
  }

  type ColumnType = "todo" | "doing" | "review" | "done";
  const [form, setform] = useState<Form>({ name: "", message: "", photo: "" })
  const [show, setShow] = useState<Modal>({ editor: false, create: false });
  const [id, SetID] = useState<number | null>(null)
  const [Columns, setColumns] = useState<ColumnType>("todo")
  const [loaded, setLoaded] = useState<boolean>(false)
  const [task, SetTask] = useState<Tasks>({ todo: [], doing: [], review: [], done: [] })
  

useEffect(() => {
  if (!loaded) return;

  localStorage.setItem("Tasks", JSON.stringify(task));
}, [task, loaded]);


useEffect(() => {
  const data = localStorage.getItem("Tasks");

  if (data) {
    SetTask(JSON.parse(data));
  }

  setLoaded(true);
}, []);

  function Newuser() {
    
    if (form.name.trim().split(" ").length >= 2) return alert("Escreva apenas seu primeiro nome.")
    if (form.name.split("").length > 13) return alert("Máximo 13 caracteres.")
    if (form.message.split("").length > 80) return alert("O texto não pode ter mais que 80 caracteres.")
    if (form.name.length === 0 || form.message.length === 0) {
       return alert("Nome e tarefa são obrigatórios.")}


    let newUser: Users = {
      id: Number(new Date()),
      name: form.name,
      task: form.message,
      photo: form.photo
    }

    switch (Columns) {

      case "todo":
        SetTask(prev => ({ ...prev, todo: [...prev.todo, newUser] }));
        break;

      case "doing":
        SetTask(prev => ({ ...prev, doing: [...prev.doing, newUser] }));
        break;

      case "review":
        SetTask(prev => ({ ...prev, review: [...prev.review, newUser] }));
        break;

      case "done":
        SetTask(prev => ({ ...prev, done: [...prev.done, newUser] }));
        break;
    }

    setShow((prev) => ({ ...prev, create: false }))
    setform((prev) => ({ ...prev, name: "", message: "", photo: "" }))

  }

  function exclude(id: number) {

    SetTask((prev) => ({
      todo: prev.todo.filter((item) => item.id !== id),
      doing: prev.doing.filter((item) => item.id !== id),
      review: prev.review.filter((item) => item.id !== id),
      done: prev.done.filter((item) => item.id !== id),
    }));
  }

  function edit() {

    if (id === null) return;

    if (form.name.trim().split(" ").length >= 2) return alert("Escreva apenas seu primeiro nome.")
    if (form.name.split("").length > 13) return alert("Máximo 13 caracteres.")
    if (form.message.split("").length > 80) return alert("O texto não pode ter mais que 80 caracteres.")
    if (form.name.length === 0 || form.message.length === 0) {
      return alert("Nome e tarefa são obrigatórios.")

      
    }

    if (form.message.split("").length > 80) return alert("O texto não pode ter mais que 80 caracteres.")

    SetTask((prev: Tasks) => ({
      ...prev,
      [Columns]: prev[Columns].map((element: Users) =>
        element.id === id
          ? {
            ...element,
            name: form.name,
            task: form.message,
          }
          : element
      ),}));

    setform((prev) => ({ ...prev, name: "", message: "" }))
    setShow((prev) => ({ ...prev, editor: false }))
  }

  return (
    <div  id="container">

      <Modals
        setform={setform}
        setShow={setShow}
        create={show.create}
        editor={show.editor}
        edit={edit}
        Newuser={Newuser}
      />

      <ColumnTasks title="Fazer" tasks={task.todo}
        setTasks={(newList) =>
          SetTask((prev) => ({
            ...prev,
            todo: newList,
          }))
        }
        onDelete={exclude}
        onEdit={(id) => {
          SetID(id);
          setColumns("todo");
          setShow((prev) => ({
            ...prev,
            editor: true,
          }));
        }}
        onCreate={() => {
          setColumns("todo");
          setShow((prev) => ({
            ...prev,
            create: true,
          }));
        }}
      />

      <ColumnTasks
        title="Fazendo"
        tasks={task.doing}
        setTasks={(newList) =>
          SetTask((prev) => ({
            ...prev,
            doing: newList,
          }))
        }
        onDelete={exclude}
        onEdit={(id) => {
          SetID(id);
          setColumns("doing");
          setShow((prev) => ({
            ...prev,
            editor: true,
          }));
        }}
        onCreate={() => {
          setColumns("doing");
          setShow((prev) => ({
            ...prev,
            create: true,
          }));
        }}
      />

      <ColumnTasks
        title="revisão"
        tasks={task.review}
        setTasks={(newList) =>
          SetTask((prev) => ({
            ...prev,
            review: newList,
          }))
        }
        onDelete={exclude}
        onEdit={(id) => {
          SetID(id);
          setColumns("review");
          setShow((prev) => ({
            ...prev,
            editor: true,
          }));
        }}
        onCreate={() => {
          setColumns("review");
          setShow((prev) => ({
            ...prev,
            create: true,
          }));
        }}
      />

      <ColumnTasks
        title="Feito"
        tasks={task.done}
        setTasks={(newList) =>
          SetTask((prev) => ({
            ...prev,
            done: newList,
          }))
        }
        onDelete={exclude}
        onEdit={(id) => {
          SetID(id);
          setColumns("done");
          setShow((prev) => ({
            ...prev,
            editor: true,
          }));
        }}
        onCreate={() => {
          setColumns("done");
          setShow((prev) => ({
            ...prev,
            create: true,
          }));
        }}
      />
    </div>


  );
};