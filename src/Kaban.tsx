
import { useState, useEffect} from "react";
import { ReactSortable } from "react-sortablejs";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

export const Kaban = () => {

  type Users = {
    id: number,
    name: string,
    task: string,
    photo?: string
  }
   
  const [task,setTask ] = useState<string>("")
  const [name,setName ] = useState<string>("")
  const [message,setMessage] = useState<string>("")
  const [load, setload] = useState<boolean>(true)
  const [photo, setPhoto]= useState<string>("")
  const [show, setShow] = useState<boolean>(false);
  const [showtwo, setShowtwo] = useState<boolean>(false);
  const [todo, setTodo] = useState<Users[]>([]);
  const [id, SetID] = useState<number | null>(null)
  const [doing, setDoing] = useState<Users[]>([]);
  const [Review, setReview] = useState<Users[]>([]);
  const [Done, setDone] = useState<Users[]>([]);


  useEffect(() => {
   
   const img = new Image();
    img.src ='src/assets/backgroundgreen.jpg'; 
    img.onload = () => {
    setload(false)
  };
}, []);


  if(load) {  return <div id="container-spin">  <Spinner animation="border" role="status">
      <span className=""></span>
    </Spinner></div>
  }

  function Newuser(){
   
     
      if(name.trim().split(" ").length >= 2 ) return alert("Escreva apenas seu primeiro nome.")
       if(name.split("").length > 13) return alert("Máximo 13 caracteres.")
      if(message.split("").length > 80) return alert("O texto não pode ter mais que 80 caracteres.")
      if(name.length === 0 || message.length === 0 ){
     
        return alert("Nome e tarefa são obrigatórios.") 
    }

    if(task === "todo"){
      let newuser:Users = {
      id:Number(new Date()),
      name: name,
      task:message,
      photo: photo
   }
   
    setTodo((prev)=> [...prev, newuser])
    setTask("")

    }

      else if (task === "doing"){
         let newuser:Users = {
     id:Number( new Date()),
      name: name,
      task:message,
       photo: photo
   }
   
    setDoing((prev)=> [...prev, newuser])
    setTask("")

    }

      else if (task === "review"){
         let newuser:Users = {
     id:Number( new Date()),
      name: name,
      task:message,
       photo: photo
   }
   
    setReview((prev)=> [...prev, newuser])
    setTask("")

    }

  else if (task === "done"){
         let newuser:Users = {
    id:Number( new Date()),
      name: name,
      task:message,
       photo: photo
   }
   
    setDone((prev)=> [...prev, newuser])
    setTask("")

    }
     setPhoto("")
    setShow((false))

    setName("")
    setMessage("")

  }


 function exclude(id:number){

  setTodo((prev)=> prev.filter((element)=> element.id !== id))
  setDoing((prev)=> prev.filter((element)=> element.id !== id))
  setReview((prev)=> prev.filter((element)=> element.id !== id))
  setDone((prev)=> prev.filter((element)=> element.id !== id))
 }


function edit(id:number | null){
  
      if(name.trim().split(" ").length >= 2 ) return alert("Escreva apenas seu primeiro nome.")   
      if(name.split("").length > 13) return alert("Máximo 13 caracteres.")
      if(message.split("").length > 80) return alert("O texto não pode ter mais que 80 caracteres.")
      if(name.length === 0 || message.length === 0 ){
      return alert("Nome e tarefa são obrigatórios.") 
    }

   if(id === null) return 
   if(message.split("").length > 80) return alert("O texto não pode ter mais que 80 caracteres.")

  setTodo((prev)=> prev.map((element)=> element.id === id ? {...element, name :name, task:message} : element ))
  setDoing((prev)=> prev.map((element)=> element.id === id ? {...element, name :name, task:message} : element ))
  setReview((prev)=> prev.map((element)=> element.id === id ? {...element, name :name, task:message} : element ))
  setDone((prev)=> prev.map((element)=> element.id === id ? {...element, name :name, task:message} : element ))
 setShowtwo(false)
 SetID(null)
  setName("")
  setMessage("")
}



  return (
    <div style={{backgroundImage:`url(src/assets/backgroundgreen.jpg)`}} id="container">

 <Modal show={showtwo} onHide={()=> setShowtwo(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editando tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <input onChange={(e)=> setName(e.target.value)} placeholder="Escreva seu primeiro nome..." className="form-control"/>
          <input  onChange={(e)=> setMessage(e.target.value)} placeholder="Tarefa desejada..." className="mt-3 form-control" />
          
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary " className="btn btn-danger" onClick={()=> setShowtwo(false)}>Fechar</Button>
          <Button variant="primary" onClick={()=> edit(id)}>Salvar</Button>

        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={()=> setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Criar nova Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
          <input onChange={(e)=> setName(e.target.value)} placeholder="Escreva seu primeiro nome..." className="form-control"/>
          <input  onChange={(e)=> setMessage(e.target.value)} placeholder="Tarefa desejada..." className="mt-3 form-control" />
          <label className="mt-3 " htmlFor="foto">selecionar Imagem</label>
         <input id="foto" hidden={true} name="foto" type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
       
       const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result as string);
      
    };

    reader.readAsDataURL(file);}}/>       
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary " className="btn btn-danger" onClick={()=> setShow(false)}>Fechar</Button>
          <Button variant="primary" onClick={Newuser}>Salvar</Button>
           
        </Modal.Footer>
      </Modal>

      
      <div className="card">
        <span >Fazer</span>
        <ReactSortable
          className="sortable" 
          list={todo}
          setList={setTodo}
          group="groupName"
          animation={80}
        >
          {todo.map((item: Users) => (
          <div className="task" key={item.id}> 
            <span className="name"> <img src={item.photo || "src/assets/user.png"} alt="avatar" /> {item.name} </span>
            <p >{item.task}</p>
            <button className="trash"  onClick={()=> exclude(item.id)}> <img className="icon" src="src/assets/trash.png" alt="icone lixeira" /> </button>
             <button className="edit" onClick={()=> {setShowtwo(true), SetID(item.id)}}><img className="icon" src="src/assets/edit.png" alt="icone edição"/></button>
            </div>

          ))}

        </ReactSortable>
        <button onClick={()=> {setShow(true), setTask("todo")}}  className="m-auto btn ">< span id="todo">+ Adicionar tarefa</span></button >
      
      </div>

      <div className="card">
        <span  >Progresso</span >
        <ReactSortable
          className="sortable"
          list={doing}
          setList={setDoing}
          group="groupName"
          animation={80}
        >

          {doing.map((item: Users) => (
            <div className="task" key={item.id}>
              <span className="name"> <img src={item.photo || "src/assets/user.png"} alt="avatar" />  {item.name} </span>
              <p>{item.task}</p>
             <button className="trash"  onClick={()=> exclude(item.id)}> <img className="icon" src="src/assets/trash.png" alt="icone lixeira" /> </button>
             <button className="edit" onClick={()=> {setShowtwo(true), SetID(item.id)}}><img className="icon" src="src/assets/edit.png" alt="icone edição"/></button>
            </div>
          ))}

        </ReactSortable>
        <button onClick={()=> {setShow(true), setTask("doing")}}  className="m-auto btn "><span id="2" >+ Adicionar tarefa</span></button >
      </div>

      <div className="card">
        <span>Revisão</span >
        <ReactSortable
          className="sortable"
          list={Review}
          setList={setReview}
          group="groupName"
          animation={80}
         >

          {Review.map((item: Users) => (
            <div className="task" key={item.id}>
               <span className="name">  <img src={item.photo || "src/assets/user.png"} alt="avatar" />  {item.name} </span>
            <p>{item.task}</p>
                         <button className="trash"  onClick={()=> exclude(item.id)}> <img className="icon" src="src/assets/trash.png" alt="icone lixeira" /> </button>
             <button className="edit" onClick={()=> {setShowtwo(true), SetID(item.id)}}><img className="icon" src="src/assets/edit.png" alt="icone edição"/></button>
            </div>

          ))}

        </ReactSortable>
        <button onClick={()=> {setShow(true), setTask("review")}}  className="m-auto btn "><span>+ Adicionar tarefa</span></button >
      </div>

      <div className="card">
        <span>Finalizado</span >
        <ReactSortable
          className="sortable"
          list={Done}
          setList={setDone}
          group="groupName"
          animation={80}
        >
          {Done.map((item: Users) => (
            <div className="task" key={item.id}>
                   <span className="name">  <img src={item.photo || "src/assets/user.png"} alt="avatar" />  {item.name} </span>
            <p>{item.task}</p>
            <button className="trash"  onClick={()=> exclude(item.id)}> <img className="icon" src="src/assets/trash.png" alt="icone lixeira" /> </button>
             <button className="edit" onClick={()=> {setShowtwo(true), SetID(item.id)}}><img className="icon" src="src/assets/edit.png" alt="icone edição"/></button>
             
            </div>))}

        </ReactSortable>
        <button onClick={()=> {setShow(true), setTask("done")}}  className="m-auto btn "><span>+ Adicionar tarefa</span></button >
      </div>

    </div>
  );
};