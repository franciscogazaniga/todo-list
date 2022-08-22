import ClipboardIcon from '../assets/clipboard-icon.svg'
import { CheckCircle, Circle, Trash } from 'phosphor-react'
import styles from './Tasks.module.css'

interface TaskProps {
  id: number;
  content?: string;
  finished?: boolean;
  onDeleteTask: (task: number) => void;
  onFinishTask: (task: number) => void;
  numberOfTasks: number;
} 

export function Tasks( { id, content, finished, onDeleteTask, onFinishTask, numberOfTasks }: TaskProps ) {
  function handleDeleteTask() {
    onDeleteTask(id)
  }
 
  function handleFinishTask() {
    onFinishTask(id)
  }
  
  if (numberOfTasks === 0) {
    return (
      <div className={styles.withouthTasks}>
        <img src={ClipboardIcon} alt="Sem tarefas" />
        <p>Você ainda não tem tarefas cadastradas</p>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    )
  } 
    return (
      <div className={styles.withTasks}>
      <div className={finished ? styles.taskBoxConcluded : styles.taskBox}>
        <button onClick={handleFinishTask}>
          {finished ? <CheckCircle size={24} weight="fill"/> : <Circle size={24}/>}
        </button>
        
        <div className={styles.taskBoxContent}>
          <p>{content}</p>

          <button className={styles.trashButton} onClick={handleDeleteTask} >
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
    )
  
}