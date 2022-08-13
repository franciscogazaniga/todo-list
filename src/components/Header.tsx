import styles from './Header.module.css'
import {PlusCircle} from 'phosphor-react'

import LogoImg from '../assets/logo.svg'
import { Tasks } from './Tasks'
import { useState } from 'react'


export function Header() {
  const [tasks, setTasks] = useState([])

  const [newTaskText, setNewTaskText] = useState('')

  const [successTaskCount, setSuccessTaskCount] = useState(0)

  const [taskCompleted, setTaskCompleted] = useState(false)

  const taskCounter = tasks.length

  const isNewTaskEmpty = newTaskText.length === 0

  function handleCreateNewTask(event) {
    event.preventDefault()

    setTasks([...tasks, newTaskText]);
    setNewTaskText('')
  }

  function handleNewTaskChange(event) {
    event.target.setCustomValidity('')

    setNewTaskText(event.target.value)
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task !== taskToDelete;
    })

    setTasks(tasksWithoutDeletedOne);
  }

  function finishTask(taskToComplete: boolean) {
    setTaskCompleted(taskToComplete)

    if(taskToComplete) {
      setSuccessTaskCount(state => {
        return state + 1
      })
    } else {
      setSuccessTaskCount(state => {
        return state - 1
      })
    }

  }

  return (
    <>
    <header className={styles.header}>
      <img src={LogoImg} alt="ToDo logo" />

      <form onSubmit={handleCreateNewTask}>
        <input type="text" placeholder="Adicione uma nova tarefa" value={newTaskText} onChange={handleNewTaskChange}/>
        <button 
          type="submit"
          disabled={isNewTaskEmpty}
        >
          Criar <PlusCircle size={18} weight={'bold'} />
        </button>
      </form>
      
    </header>

    <section className={styles.sectionTasks}>
        <header className={styles.headerTasks}>

          <div className={styles.createdTasks}>
            <p>Tarefas criadas</p> <span>{taskCounter}</span>
          </div>

          <div className={styles.completedTasks}>
            <p>Concluídas</p> <span>{successTaskCount} de {taskCounter}</span>
          </div>
        </header>

        {taskCounter != 0 ? tasks.map(task => {
          return (
            <Tasks
              key={task}
              content={task}
              onDeleteTask = {deleteTask}
              onFinishTask = {finishTask}
              numberOfTasks = {taskCounter}
              finished = {taskCompleted}
            />
          )
        }) : 
          <Tasks
            numberOfTasks = {0}
          />
        }
    </section>
    </>
  )
}