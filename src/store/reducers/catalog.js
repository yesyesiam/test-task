import C from "../actionsTypes"

const initialState = {
    catalog: [],
    catalogItem:null,
    loading: false,
    mess: null
}

export default function catalogReducer(state = initialState, action){
    switch(action.type){
        case C.GET_CATALOG:
            return{
                ...state, loading: false, catalog: action.catalog
            }
        case C.GET_ITEM:
            return{
                ...state, loading: false, catalogItem: action.item
            }
        case C.SET_LOADING:
            return{
                ...state, loading: true
            }
        case C.REMOVE_ITEM:
            return{
                ...state, catalog: state.catalog.filter((item)=>item.id!==action.id)
            }
        case C.EDIT_ITEM:
            return{
                ...state, catalogItem: action.item
            }
        case C.REQ_RES:
            return{
                ...state, loading: false, mess: action.mess
            }
        case C.CLEAR_FORM:
            return{
                ...state, mess: null
            }
        default:
            return state
    }
}