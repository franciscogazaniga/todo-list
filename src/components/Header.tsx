import styles from './Header.module.css'
import {PlusCircle} from 'phosphor-react'

import LogoImg from '../assets/logo.svg'
import { Tasks } from './Tasks'
import { ChangeEvent, FormEvent, useState } from 'react'

interface Task {
  id: number;
  content: string;
  completed: boolean
}

export function Header() {
  const [tasks, setTasks] = useState<Task[]>([])

  const [newTaskText, setNewTaskText] = useState('')

  const [successTaskCount, setSuccessTaskCount] = useState(0)

  const taskCounter = tasks.length

  const isNewTaskEmpty = newTaskText.length === 0

  const newTask = {
    id: Math.random() * tasks.length,
    content: newTaskText,
    completed: false,
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    setTasks([...tasks, newTask]);
    setNewTaskText('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')

    setNewTaskText(event.target.value)
  }

  function deleteTask(taskToDelete: number) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete;
    })

    const taskIndex = tasks.findIndex((task) => {
      return task.id === taskToDelete;
    });

    const tempTasks = [...tasks];

    console.log(tempTasks[taskIndex].completed)
    if(tempTasks[taskIndex].completed) {
      setSuccessTaskCount(state => {
        return state - 1
      })
    }

    setTasks(tasksWithoutDeletedOne);
  }

  function finishTask(taskToComplete: number) {
    const taskIndex = tasks.findIndex((task) => {
      return task.id === taskToComplete;
    });

    const tempTasks = [...tasks];
      
    tempTasks[taskIndex].completed = !tempTasks[taskIndex].completed;

    setTasks(tempTasks);

    if(tempTasks[taskIndex].completed) {
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
              id={task.id}
              content={task.content}
              onDeleteTask = {deleteTask}
              onFinishTask = {finishTask}
              numberOfTasks = {taskCounter}
              finished = {task.completed}
            />
          )
        }) : 
          <Tasks
            id={0}
            onDeleteTask = {deleteTask}
            onFinishTask = {finishTask}
            numberOfTasks = {0}
          />
        }
    </section>
    </>
  )
}