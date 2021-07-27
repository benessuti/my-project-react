import './App.css'
import { useEffect, useState } from 'react'
import axios from "axios"
import $ from 'jquery'


function Userlist() {

    //useEffect, necessário para que o get execute

    let [ tarefas, setTarefas] = useState([])
    useEffect(() => {
         //Função GET trazendo os dados da API   
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {
            method: 'GET',
            }).then((resp) => {setTarefas(resp.data)})
    }, [] )

    //Função de exibição modal de pagamento
    let showModal = (e, i) => {
        setUsuarioSelecionado(usuarios[i])
        setShowModal(true)
    }

    //Função de exibição modal de recibo de pagamento
    let showModalReceipt = (e) => {
        setShowModalReceipt(true)
    }

    //Variável array dos cartões para pagamento
    let cards = [
        //Cartão Válido
        {
            card_number: '1111111111111111',
            cvv: 789,
            expiry_date: '01/18',
          },
        //Cartão Invalido
        {
            card_number: '4111111111111234',
            cvv: 123,
            expiry_date: '01/20',
          },  

    ];

    //Função para envio POST para o pagamento de endpoint
        let sendPayment =(e) => {
    
    //evento para não atualizar a página
        e.preventDefault()

    //Declarando variáveis
        const card = document.getElementById('card').value
        const valueInput = document.getElementById('valor').value
        const paymentSucces = document.getElementById('payment_succes')
        const paymentError = document.getElementById('payment_error')

    //Se o cartao selecionado for válido, realiza o POST
    if (card === 'card0') {
        //Função POST envia os dados para o endpoint
        axios.post('https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989', {
            "card_number": 1111111111111111,
            "cvv": 789,
            "expiry_date": 01/18,
            "destination_user_id": usuarioSelecionado.id,
            "value": valueInput
    } )

    //Exibição modal de recibo
    showModalReceipt(true)
    //Removendo o h2 de erro
    paymentError.innerHTML = ""
} else {
    //Exibição modal de recibo
    setShowModalReceipt(true)
    //Removendo o h2 de sucesso
    paymentSucces.innerHTML = ""
    }
}

    //Função para aplicar refresh na página após exibir pagamento
    function refreshPage(){
        window.location.reload()
    }

    //Mask jQuery para o campo 'Valor'
        $(document).ready(function () {
            $('#valor'.mask('000.000.000.000.000,00',{ reverse: true }));

        });
   
    //Conteúdo renderizado em tela
    //Função map para todo array recuperado com axios e lista de cada linha do array
    return (
        <>    
        { tarefas.map((u, index) => {
            return (
            <div className= "user-container" key={'user'+index}>
                <div className= "user-wrapper">
                    <img className= "user-thumbnail" src={t.img} alt="" />
                        <div className= "user-data">
                            <p> Nome do Usuário {u.name}</p>
                            <p>ID: {u.id} - Username: {u.username}</p>
                 </div>
                        <button data-index={index} onCLick={(e) => showModal(e, index)}>PAGAR</button>
                </div>
                </div>
                )
          })}
         

    <div className="backdrop" style={{display: (modalShow ? 'block' : 'none')}} onClick={() => setShowModal(false)}></div>
    <div className="modal-box" style={{display: (modalShow ? 'block': 'none')}}>
            <div className="modal-title">
            <p> Pagamento para <span>{usuarioSelecionado.name}</span></p>

        </div>
        <form action="" className="modal_form">
            <input name="valor" type="text" id="valor" placeholder="R$0,00" required></input>
            <select name="card" id="card" required>
                <option value=""> Selecione o cartão </option>
                {cards.map((card, index) => 
                <option value={'card'+index} key={'card'+index}>Cartão com final {card.card_number.substr(-4)}</option>
                )}
            </select>

            <button className='modal_button' onClick={(e) => sendPayment(e)}> Pagar </button>

        </form>
    </div>

<div clasName="modal_box" style={{display: (modalShowReceipt ? 'block' : 'none')}}>
    <div className="modal_title">
        <p> Recibo de pagamento </p>
    </div>
    <div className="modal_content">
        <h2 id="payment_sucess"> Pagamento concluído com sucesso.</h2>
        <h2 id="payment_error"> Pagamento não autorizado</h2>
        <button onClick={refreshPage}> Concluir Transação</button>
        </div>
     </div>
        </>
    );
}

//Exportando o componet App