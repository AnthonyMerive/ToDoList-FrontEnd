import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAsincronico } from './actions/ToDoAction'
import { AgregarTarea } from './components/AgregarTarea'
import { MostrarTarea } from './components/MostrarTarea'

export default function App() {

    const task = useSelector(store => store.tareas.tareas)
    const [tarea, setTarea] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [id, setId] = React.useState('')
    const [error, setError] = React.useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAsincronico())
    }, [dispatch])

    return (

        <div className="container mt-5">
            <hr />
            <h1 className="text-center">To-Do List</h1>
            <hr />
            <div className="row">

                <div className="col-md-6">
                    <AgregarTarea 
                    modoEdicion={modoEdicion} 
                    setModoEdicion={setModoEdicion}
                    tarea={tarea} 
                    setTarea ={setTarea} 
                    error={error}
                    setError = {setError}
                    id = {id}
                    setId = {setId}
                    dispatch = {dispatch}
                    />
                </div>

                <div className="col-md-6 pt-5 pt-md-0">
                    <MostrarTarea 
                    modoEdicion={modoEdicion} 
                    setModoEdicion={setModoEdicion}
                    setTarea ={setTarea} 
                    setId = {setId}
                    task = {task}
                    dispatch = {dispatch}
                    />                   
                </div>
            </div>
        </div>
    )
}
