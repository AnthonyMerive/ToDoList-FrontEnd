import React, { Fragment } from 'react'
import { deletear } from '../actions/ToDoAction';

export const MostrarTarea = (props) => {

    
    const handleEliminarTarea = id => {
        props.dispatch(deletear(id));
    }

    const handleEdicion = item => {
        props.setModoEdicion(true)
        props.setTarea(item.name)
        props.setId(item.id)
    }

    return (
        <Fragment>
            <h4 className="text-center">{props.modoEdicion ? 'Editando lista...' : 'Por Hacer'}</h4>
            <ul className="list-group">
                {
                    props.task === undefined || (props.task).length === 0 ? (
                        <li className="list-group-item text-center">- Sin Tareas -</li>
                    ) : (
                        (props.task).map(item => (
                            <li className="list-group-item" key={item.id}>
                                <div className="row">
                                    <div className="col-7 p-3">
                                        <span className="lead">{item.name}</span>
                                    </div>

                                    {
                                        !props.modoEdicion &&
                                        <div className="col-5 p-3 justify-content-center">
                                            <button
                                                className="btn btn-sm btn-danger m-1"
                                                onClick={() => handleEliminarTarea(item.id)}
                                            >Eliminar</button>
                                            <button
                                                className="btn btn-sm btn-warning m-1"
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
        </Fragment>
    )
}
