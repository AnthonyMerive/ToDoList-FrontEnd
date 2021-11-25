import { types } from '../types/types'

const HOST_API = "http://localhost:4000/api";

export const getAsincronico = () => {

    return async (dispatch) => {
        fetch(HOST_API + "/todos")
            .then(response => response.json())
            .then((tareas) => dispatch(get(tareas)))
    }
}

export const get = (tareas) => {
    return {
        type: types.GET,
        payload: tareas
    }
}

export const deletear = (id) => {

    return async (dispatch) => {
        fetch(HOST_API + `/${id}/todo`, {
            method: "DELETE"
        }).then(() => dispatch(getAsincronico()))
    }
}

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
            .then(() => dispatch(getAsincronico()))
    }
}

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
            .then(() => dispatch(getAsincronico()))
    }
}





