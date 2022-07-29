import ClipboardIcon from '../assets/clipboard-icon.svg'

import styles from './Tasks.module.css'

export function Tasks() {
  return (
    <section className={styles.sectionTasks}>
      <header className={styles.headerTasks}>

        <div className={styles.createdTasks}>
          <p>Tarefas criadas</p> <span>0</span>
        </div>

        <div className={styles.completedTasks}>
          <p>Concluídas</p> <span>0</span>
        </div>
      </header>

      <div className={styles.withouthTasks}>
        <img src={ClipboardIcon} alt="Sem tarefas" />
        <p>Você ainda não tem tarefas cadastradas</p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </section>
  )
}