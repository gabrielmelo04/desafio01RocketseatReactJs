import React, {} from "react";
import Styles from './Tasks.module.css';
import Check from '../assets/check.svg';
import OnCheck from '../assets/onCheck.svg';
import Trash from '../assets/trash.svg';

interface Task{
    texto:string;
    ativo:boolean;
    onHandleCheck: () => void;
    onHandleCheckOn: () => void;
    onHandleDelete: () => void;
}

export function Tasks({ texto, ativo, onHandleCheck, onHandleDelete, onHandleCheckOn}:Task){

    return(
        <div className={Styles.containerTask} key={texto}>
            {
                ativo ?
                    <button onClick={onHandleCheck}>
                        <img className={Styles.check} src={OnCheck} alt="Concluído" />
                    </button>
                :
                    <button onClick={onHandleCheckOn}>
                        <img className={Styles.check} src={Check} alt="Não concluído" />
                    </button>
            }
            <p>{texto}</p>
            <button onClick={onHandleDelete}>
                <img className={Styles.trash} src={Trash} alt="Deletar tarefa" />
            </button>
        </div>
    )
}