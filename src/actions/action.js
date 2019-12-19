import  {
    FETCH_FAMES
} from "../reducers/constants";


export const storeFames = (fames, page) => dispatch => {
    dispatch({
        type: FETCH_FAMES,
        payload: {
            fames,
            page,
        }
    })
} 