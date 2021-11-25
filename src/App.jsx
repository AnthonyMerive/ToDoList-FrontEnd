import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletear, getAsincronico, post, put } from './actions/ToDoAction'

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

    const handleAgregarTarea = e => {
        e.preventDefault()
        if (!tarea.trim()) {
            setError('El campo no puede estar Vacío')
            return
        }
        setTarea('')
        setError(null)
        dispatch(post(tarea))
    }

    const handleEliminarTarea = id => {
        dispatch(deletear(id));
    }

    const handleEdicion = item => {
        setModoEdicion(true)
        setTarea(item.tarea)
        setId(item.id)
    }

    const handleEditarTarea = e => {
        e.preventDefault()
        if (!tarea.trim()) {
            console.log('Campo vacio')
            setError('El campo no puede estar vacío')
            return
        }
        dispatch(put(id,tarea))
        setModoEdicion(false)
        setTarea('')
        setId('')
        setError(null)
    }

    return (

        <div className="container mt-5">
            <h1 className="text-center">To-Do List</h1>
            <hr />
            <div className="row">



                <div className="col-6">
                    <h4 className="text-center">
                        {
                            modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                        }
                    </h4>

                    <form onSubmit={modoEdicion ? handleEditarTarea: handleAgregarTarea}>

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ingrese Tarea"
                            onChange={e => setTarea(e.target.value)}
                            value={tarea}
                        />


                        <h6 className="text-danger text-center mb-3">{error ? error : '  '}</h6>

                        <div className="d-flex justify-content-center">
                            {
                                modoEdicion ? (
                                    <button className="btn btn-warning btn-block" type="submit">Editar</button>
                                ) : (
                                    <button className="btn btn-dark btn-block" type="submit">Agregar</button>
                                )
                            }
                        </div>
                    </form>
                </div>

                <div className="col-6">

                    <h4 className="text-center">{modoEdicion ? 'Editando lista...' : 'Por Hacer'}</h4>
                    <ul className="list-group">
                        {
                            task === undefined || task.length === 0? (
                                <li className="list-group-item text-center">- Sin Tareas -</li>
                            ) : (
                                task.map(item => (
                                    <li className="list-group-item" key={item.id}>
                                        <div className="row">
                                            <div className="col-8">
                                                <span className="lead">{item.name}</span>
                                            </div>

                                            {
                                                !modoEdicion &&
                                                <div className="col-4">
                                                    <button
                                                        className="btn btn-sm btn-danger float-right mx-2"
                                                        onClick={() => handleEliminarTarea(item.id)}
                                                    >Eliminar</button>
                                                    <button
                                                        className="btn btn-sm btn-warning float-right"
                                                        onClick={() => handleEdicion(item)}
                                                    >Editar</button>
                                                </div>
                                            }
                                        </div>

                                    </li>
                                ))
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
