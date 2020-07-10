import C from "../actionsTypes";
import axios from 'axios';

const URL = "https://test-task-clr.firebaseio.com/products";


export function getCatalog(){
    return async dispatch =>{
        dispatch(setLoading())
        try{
            const res = await axios.get(`${URL}.json`)

            const catalog = Object.keys(res.data || []).reverse().map((key)=>{
                const {discountPercent, endOfDiscount, price} = res.data[key]
                return {
                    id: key,
                    ...res.data[key],
                    ...checkDiscount(discountPercent, endOfDiscount, price)
                }
            })

            console.log(catalog)
            dispatch({type: C.GET_CATALOG, catalog})
        }catch(e){
            console.log(e)
        }
    }
}

export function getCatalogItem(id){
    return async dispatch =>{
        dispatch(setLoading())
        try{
            const res = await axios.get(`${URL}/${id}.json`)
            const item = res.data


            console.log(item)
            dispatch({type: C.GET_ITEM, item})
        }catch(e){
            console.log(e)
        }
    }
}

export function addCatalogItem(item){
    return async (dispatch, getState)=>{
        dispatch(setLoading())
        try{
            const res = await axios.post(`${URL}.json?auth=${getState().auth.token}`, item)
            console.log(res)
            reqRes('Успешно!')
            dispatch(reqRes('Успешно!'))
        }catch(e){
            dispatch(reqRes('Ошибка!'))
        }
    }
}

export function editCatalogItem(item, id){
    return async (dispatch, getState) => {
        dispatch(setLoading())
        try{
            const res = await axios.put(`${URL}/${id}.json?auth=${getState().auth.token}`, item)
            console.log(res)
            dispatch({type:C.EDIT_ITEM, item})
            dispatch(reqRes('Успешно!'))
        }catch(e){
            dispatch(reqRes('Ошибка!'))
        }
    }
}

export function removeCatalogItem(id){
    return async (dispatch, getState) => {
        try{
            await axios.delete(`${URL}/${id}.json?auth=${getState().auth.token}`)
            dispatch({type:C.REMOVE_ITEM, id})
        }catch(e){
            console.log(e)
        }
    }
}

export function checkDiscount(discountPercent, endOfDiscount, price){
    const date = new Date()
    const date2 = new Date(endOfDiscount)

    const days = Math.floor((date2 - date)/(1000*60*60*24))

    let withDiscount = (days>=0) //до конца скидки может быть меньше дня
    if(withDiscount){
        return{
            withDiscount,
            priceWithDiscount: (price * ((100-discountPercent)/100)),
            daysLeft: days
        }
    }

    return{
        withDiscount
    }
}

export function setLoading(){
    return{type: C.SET_LOADING}
}

export function clearForm(){
    return{type: C.CLEAR_FORM}
}

export function reqRes(mess){
    return {type:C.REQ_RES, mess}
}