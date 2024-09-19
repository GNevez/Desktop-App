import React from 'react'
import style from './Cadastro.module.scss'

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Cadastro = () => {
  const [response, setResponse] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [senha2, setSenha2] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState(0)

  const [errorMessage, setErrorMessage] = useState('')

  const handleGetEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleGetSenha = (event) => {
    setSenha(event.target.value)
  }

  const handleGetSenha2 = (event) => {
    setSenha2(event.target.value)
  }

  const handleGetName = (event) => {
    setName(event.target.value)
  }

  const sendMessage = () => {
    if (senha === senha2) {
      window.eleCadastro.sendCadastro({
        username: name,
        emailUser: email,
        senhaUser: senha
      })
    } else {
      setErrorMessage('As senhas não coincidem.')
    }
  }

  useEffect(() => {
    window.eleCadastro.onReply((message) => {
      if (message.status === 200) {
        setStatus(message.status)
        setErrorMessage('Cadastro Realizado com sucesso')
      } else {
        setErrorMessage(message.message)
        setStatus(0)
      }
      setResponse(message)

      console.log(message)
    })
  }, [])

  return (
    <div className={style.containerLog}>
      <div className={style.containerInit}>
        <p className={style.boasVindas}>Bem-vindo, ainda não possui cadastro?</p>
        <div className={style.secondContainer}>
          <p className={status === 200 ? style.successText : style.secondText}>
            {errorMessage != '' ? errorMessage : ''}
          </p>
          <Link to={'/Initial'} className={style.link}>
            {status === 200 ? 'Incie Sessão' : ''}
          </Link>
        </div>
      </div>
      <div className={style.containerInputs}>
        <div className={style.dflex}>
          <p>Username</p>
          <p className={style.asterisco}>*</p>
        </div>
        <input type="text" className={style.inputLog} onChange={handleGetName} value={name} />
      </div>
      <div className={style.containerInputs}>
        <div className={style.dflex}>
          <p>Email</p>
          <p className={style.asterisco}>*</p>
        </div>
        <input type="email" className={style.inputLog} onChange={handleGetEmail} value={email} />
      </div>
      <div className={style.containerInputs}>
        <div className={style.dflex}>
          <p>Senha</p>
          <p className={style.asterisco}>*</p>
        </div>
        <input type="password" className={style.inputLog} onChange={handleGetSenha} value={senha} />
      </div>
      <div className={style.containerInputs}>
        <div className={style.dflex}>
          <p>Confirmar Senha</p>
          <p className={style.asterisco}>*</p>
        </div>
        <input
          type="password"
          className={style.inputLog}
          onChange={handleGetSenha2}
          value={senha2}
        />
      </div>
      <div className={style.containerInputs}>
        <button className={style.btnLog} onClick={sendMessage}>
          Entrar
        </button>
        <Link to={'/Initial'} className={style.link2}>
          Já possui cadastro? Faça login.
        </Link>
      </div>
    </div>
  )
}

export default Cadastro
