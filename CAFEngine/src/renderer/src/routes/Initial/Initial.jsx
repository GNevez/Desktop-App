import React from 'react'
import style from './Initial.module.scss'

import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Initial = () => {
  const [response, setResponse] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const handleGetEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleGetSenha = (event) => {
    setSenha(event.target.value)
  }

  const sendMessage = () => {
    window.eleLogin.sendMessage({
      emailUser: email,
      senhaUser: senha
    })
  }

  useEffect(() => {
    window.eleLogin.onReply((message) => {
      console.log(message)

      const { status } = message

      if (status === 200) {
        navigate('/Home')
      } else {
        const erroMessage = message.message
        setErrorMessage(erroMessage)
      }
    })
  }, [])

  return (
    <div className={style.containerLog}>
      <div className={style.containerInit}>
        <p className={style.boasVindas}>Bem-vindo, inicie sua sessão!</p>
        <div className={style.secondContainer}>
          <p className={style.secondText}>Ainda não possui cadastro? </p>
          <Link className={style.link} to={'/Cadastro'}>
            Clique aqui
          </Link>
        </div>
        <div className={style.secondContainer}>
          <p className={style.redText}>{errorMessage ? errorMessage : ''}</p>
        </div>
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
        <Link className={style.link}>Esqueceu a senha?</Link>
      </div>
      <div className={style.containerInputs}>
        <button className={style.btnLog} onClick={sendMessage}>
          Entrar
        </button>
      </div>
    </div>
  )
}

export default Initial
