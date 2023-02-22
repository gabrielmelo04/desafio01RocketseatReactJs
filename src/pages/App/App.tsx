import React, { useState, InvalidEvent, FormEvent, ChangeEvent } from "react";
import Styles from './App.module.css';

import Logo from '../../assets/Logo.svg';
import Clipboard from '../../assets/Clipboard.svg';
import Create from '../../assets/plus.svg'

import { Tasks } from "../../components/Tasks";

interface Task{
    texto: string,
    ativo: boolean
}

export default function APP(){

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<string>('');
    const [checkCounter, setCheckCounter] = useState(0);

    function handleTaskAdd(event: FormEvent){
        event.preventDefault();

        let value = tasks.filter((task) => task.texto === newTask);

        console.log(value);

        if(value.length > 0){
            setNewTask('');
            alert('Tarefa já cadastrada !');
            return;
        }

        let newT ={
            texto: newTask,
            ativo: false
        }

        setTasks(prevent => [ ...prevent, newT ]);

        setNewTask('');

        handleCheckCounter();

    }

    function handleCheck(name:string){

        tasks.map((task) => {
            if(task.texto === name){
                task.ativo = false;
                handleCheckCounter();
            }
        });

    }

    function handleCheckOn(name:string){

        tasks.map((task) => {
            if(task.texto === name){
                task.ativo = true;
                handleCheckCounter();
            }
        });

    }

    function handleCheckCounter(){

        setCheckCounter(0);

        tasks.map((task) => {
            if(task.ativo === true){
                setCheckCounter((value) => value + 1);
            }
        });

    }

    function handleCheckCounterDesc(){
        setCheckCounter((e) => e - 1);
    }

    function handleDelete(name:string){

        let newTaks = tasks.filter((task) => task.texto !== name);

        setTasks(newTaks);

        handleCheckCounterDesc();

    }

    return(
        <div className={Styles.container}>
            <header>
                <img src={Logo} alt="logo" />
            </header>
            <form className={Styles.areaInput} onSubmit={handleTaskAdd}>
                <input 
                    type="text" 
                    placeholder="Adicione uma nova tarefa"
                    value={newTask}
                    onChange={((e) => setNewTask(e.target.value))}
                    required
                />
                <button type="submit" className={Styles.btnCreate}>
                    Criar <img src={Create} alt="Criar tarefa" />
                </button>
            </form>
            <div className={Styles.taskCounter}>
                <div>
                    <span>Tarefas criadas</span>
                    <label>{tasks.length}</label>
                </div>
                <div>
                    <span>Concluídas</span>
                    <label>{checkCounter}</label>
                </div>
            </div>
            <div className={Styles.list}>
                {
                    tasks.length > 0 ?
                        tasks.map((task) => {
                            return ( 
                                <Tasks 
                                    texto={task.texto}
                                    ativo={task.ativo}
                                    onHandleCheck={() => handleCheck(task.texto)}
                                    onHandleCheckOn={() => handleCheckOn(task.texto)}
                                    onHandleDelete={() => handleDelete(task.texto)}
                                />
                            )
                        })
                    :
                    <>
                        <img className={Styles.imgEmpty} src={Clipboard} alt="lista" />
                        <p className={Styles.pEmpty}><strong>Você ainda não tem tarefas cadastradas</strong></p>
                        <p className={Styles.pEmpty}>Crie tarefas e organize seus itens a fazer</p>
                    </>
                }
            </div>
        </div>
    )
}
