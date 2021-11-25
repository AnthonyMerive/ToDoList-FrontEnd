import { types } from '../types/types'

/*Ubicacion de la API-Rest (modificable)*/
const HOST_API = "http://localhost:4000/api";


/*action que permitira hacer la peticion GET de forma asincrona*/
export const getAsincronico = () => {

    return async (dispatch) => {
        fetch(HOST_API + "/todos")
            .then(response => response.json())

            //disparo la respuesta del servidor al action get que guardara las tareas en store
            .then((tareas) => dispatch(get(tareas)))
    }
}

/*action que permitira guardar las tareas en el store*/
export const get = (tareas) => {
    return {
        type: types.GET,
        payload: tareas
    }
}

/*action que permitira borrar un objeto dentro de la api a traves del ID*/
export const deletear = (id) => {

    return async (dispatch) => {
        fetch(HOST_API + `/${id}/todo`, {
            method: "DELETE"
        }).then(() => dispatch(getAsincronico()))
    }
}

/*action que permitira agregar tareas a la API-Rest, la generacion del ID se hace de forma automatica*/
export const post = (tarea) => {

    return async (dispatch) => {

        fetch(HOST_API + "/todo", {
            method: "POST",
            body: JSON.stringify(
                {
                    name: tarea,
                    id: null
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())

            /*al hacer el POST al servidor resuelvo la promesa tambien disparando el action GET para
              que se actualice el cambio en tiempo real sin depender de un useEffect*/
            .then(() => dispatch(getAsincronico()))
    }
}

/*action que permitira modificar una tarea enviaremos como parametro ID y nueva tarea*/
export const put = (id, tarea) => {

    return async (dispatch) => {
        fetch(HOST_API + "/todo", {
            method: "PUT",
            body: JSON.stringify(
                {
                    name: tarea,
                    id: id,
                }

            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())

            /*al hacer el PUT al servidor resuelvo la promesa tambien disparando el action GET para
              que se actualice el cambio en tiempo real sin depender de un useEffect*/
            .then(() => dispatch(getAsincronico()))
    }
}





