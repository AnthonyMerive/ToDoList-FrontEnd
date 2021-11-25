import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAsincronico } from './actions/ToDoAction'
import { AgregarTarea } from './components/AgregarTarea'
import { MostrarTarea } from './components/MostrarTarea'

export default function App() {

    /*Variables a usar*/

    //UseSelector: permite tomar del store de redux las tareas
    const task = useSelector(store => store.tareas.tareas)

    const [tarea, setTarea] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [id, setId] = React.useState('')
    const [error, setError] = React.useState(null)

    //useDispatch: permite disparar los actions creados a traves de Redux
    const dispatch = useDispatch();

    useEffect(() => {

        /*Bajo un efecto que se ejecutara al renderizar el componente o con cada Dispatch
          disparamos el action Get Asincrono que permite traer de mi API-Rest las tareas al
          store de redux*/
        dispatch(getAsincronico())

    }, [dispatch])

    return (

        <div className="container mt-5">
            <div className="mb-5">
                <h1 className="text-center">TAREAS</h1>
                <hr />
            </div>
            <div className="row">

                <div className="col-md-6 border border-success p-5">

                {/* Componentes (Envio las variables a usar como props aprovechando herencia)  */}

                    <AgregarTarea
                        modoEdicion={modoEdicion}
                        setModoEdicion={setModoEdicion}
                        tarea={tarea}
                        setTarea={setTarea}
                        error={error}
                        setError={setError}
                        id={id}
                        setId={setId}
                        dispatch={dispatch}
                    />
                </div>
                <div className="col-md-6 pt-5 pt-md-0">
                    <MostrarTarea
                        modoEdicion={modoEdicion}
                        setModoEdicion={setModoEdicion}
                        setTarea={setTarea}
                        setId={setId}
                        task={task}
                        dispatch={dispatch}
                    />
                </div>
            </div>
        </div>

    )
}
