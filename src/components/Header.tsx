import styles from './Header.module.css'
import {PlusCircle} from 'phosphor-react'

import LogoImg from '../assets/logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={LogoImg} alt="ToDo logo" />

      <nav>
        <input type="text" placeholder="Adicione uma nova tarefa"/>
        <button>Criar <PlusCircle size={18} weight={'bold'} /></button>
      </nav>
      
    </header>
  )
}