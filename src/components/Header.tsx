import styles from './Header.module.css'

import LogoImg from '../assets/logo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={LogoImg} alt="ToDo logo" />
    </header>
  )
}