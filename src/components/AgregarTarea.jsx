import React, { Fragment } from 'react'
import { post, put } from '../actions/ToDoAction';

export const AgregarTarea = (props) => {

    const handleAgregarTarea = e => {
        e.preventDefault()
        if (!props.tarea.trim()) {
            props.setError('El campo no puede estar Vacío')
            return
        }
        props.setTarea('')
        props.setError(null)

        //disparo el action post enviandole el nombre de la tarea
        props.dispatch(post(props.tarea))
    }

    const handleEditarTarea = e => {
        e.preventDefault()

        //validador de formulario
        if (!props.tarea.trim()) {
            console.log('Campo vacio')
            props.setError('El campo no puede estar vacío')
            return
        }

        //disparo el action put enviandole el nombre de la tarea y el ID
        props.dispatch(put(props.id,props.tarea))
        props.setModoEdicion(false)
        props.setTarea('')
        props.setId('')
        props.setError(null)
    }
    return (
        <Fragment>
            <h4 className="text-center">
                {
                    props.modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
                }
            </h4>

            <form onSubmit={props.modoEdicion ? handleEditarTarea : handleAgregarTarea}>

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Ingrese Tarea"
                    onChange={e => props.setTarea(e.target.value)}
                    value={props.tarea}
                />


                <h6 className="text-danger text-center mb-3">{props.error ? props.error : '  '}</h6>

                <div className="d-flex justify-content-center">
                    {
                        props.modoEdicion ? (
                            <button className="btn btn-warning btn-block" type="submit">Editar</button>
                        ) : (
                            <button className="btn btn-success btn-block" type="submit">Agregar</button>
                        )
                    }
                </div>
            </form>
        </Fragment>
    )
}
