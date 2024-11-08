import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/delete.png";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef() 

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios')

    setUsers(usersFromApi.data)
    
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value 
    })

    getUsers()
  }


  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)
    getUsers()
    
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form action="">
        <h1>Cadastro de usuário</h1>
        <input placeholder="Nome" type="text" name="nome" ref={inputName}/>
        <input placeholder="Idade" type="number" name="idade" ref={inputAge}/>
        <input placeholder="E-mail" type="email" name="email" ref={inputEmail}/>
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

    {users.map((user) => (
      <div key={user.id} className="card">
      <div>
        <p>Nome: <span>{user.name}</span></p>
        <p>Idade: <span>{user.age}</span></p>
        <p>Email: <span>{user.email}</span></p>
      </div>
      <button onClick={() =>deleteUsers(user.id)}>
        <img src={Trash} />
      </button>
    </div>
    ))}


    </div>
  );
}

export default Home;
