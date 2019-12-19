import  {
    FETCH_FAMES,
} from "./constants";


const initialState = {
    fames: [],
    page: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FAMES:
          return {
              fames: action.payload.fames,
              page: action.payload.page,
          }
      default:
        return state
    }
}