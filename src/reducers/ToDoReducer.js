import { types } from '../types/types'

export const ToDoReducer = (state = {}, action) => {
    switch (action.type) {

        case types.GET:
            return {
                tareas: action.payload
            }

        default:
            return state
    }

}
