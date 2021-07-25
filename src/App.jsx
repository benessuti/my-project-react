import './App.css'
import { useEffect, useState } from 'react'
import axios from "axios"

function Userlist() {

    //Função GET do dados da API
    //useEffect, necessário para que o get execute

    let [ tarefas, setTarefas] = useState([])
    useEffect(() => {

        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {
            method: 'GET',

        }).then((resp) => {setTarefas(resp.data)})
    }, [] )

    //Conteúdo renderizado em tela
    //Função map para todo array recuperado com axios e lista de cada linha do array

    return (
        <>    
        { tarefas.map((t, index) => {
            return (
            <div className= "user-container" key={'user'+index}>
                <div className= "user-wrapper">
                    <img className= "user-thumbnail" src={t.img} alt="" />
                        <div className= "user-data">
                            <p> Nome do Usuário {t.name}</p>
                            <p>ID: {t.id} - Username: {t.username}</p>
                 </div>
                        <button>PAGAR</button>
                </div>
                </div>
                )
          })}
            </>
        );
}