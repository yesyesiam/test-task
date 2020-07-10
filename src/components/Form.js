import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import AlertSpan from './AlertSpan';
import ImageInput from './ImageInput/ImageInput';
import DatePicker from "react-datepicker";
import {subDays } from 'date-fns';

import "react-datepicker/dist/react-datepicker.css";
import { clearForm } from '../store/actions/catalog';


const Form = ({action, catalogItem, title='Action'})=>{
    const dispatch = useDispatch()
    const {reqMess, loading} = useSelector(state=>{
        return{
            reqMess:state.catalog.mess,
            loading: state.catalog.loading
        }
    })
    const [state, setState] = useState({
        title: {value: '', isValid: false, untouched: true},
        description: {value:'', isValid: true, untouched: true},
        price: {value:'', isValid: false, untouched: true},
        discountPercent: {value:'', isValid: true, untouched: true},
    })

    const [formAlert, setFormAlert] = useState(false)

    const [endOfDiscount, setEndOfDiscount] = useState(null);
    const [imgURL, setImgURL] = useState("")

    useEffect(()=>{
        if(catalogItem){
            const {title, description, price, discountPercent, imgUrl, endOfDiscount} = catalogItem
            setState({
                title: {value: title, isValid: true, untouched: true},
                description: {value: description, isValid: true, untouched: true},
                price: {value: price.toString(), isValid: true, untouched: true},
                discountPercent: {value: discountPercent.toString(), isValid: true, untouched: true},
            })
            setImgURL(imgUrl)
            setEndOfDiscount(!endOfDiscount?null:new Date(endOfDiscount))
        }else{
            setImgURL("https://news.liga.net/images/general/2019/09/11/20190911154809-5288.jpg?v=1568211325")
        }
        return () => {dispatch(clearForm())}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleInputChange= (e)=>{
        const value = e.target.value
        const name = e.target.name
        setState({
            ...state, 
            [name]: {
                value, 
                isValid: validateControl(value, name)
            }
        })
    }

    const validateControl = (value, type) => {
        if(type === 'title'){
            if(value.length<20||value.length>60){
                return false
            }
        } else if(type==='description'){
            if(value.length>200){
                return false
            }
        } else if(type==='price'){
            const regEx = /^(0|[1-9]\d*)(\.\d{1,2})?$/
            if(!regEx.test(value)||value<0.01||value>99999999.99){
                return false
            }
        } else if(type==='discountPercent'){
            const regEx = /^(0|[1-9]\d*)$/
            if(value.trim()&&(!regEx.test(value)||value<10||value>90)){
                return false
            }
        }

        return true
    }

    const onAdd = (e)=>{
        e.preventDefault()
        if(validateForm()){
            let item={}
            Object.keys(state).forEach(name=>{
                item[name]= state[name].value.trim()
            })
            item.price = parseFloat(item.price)
            if(item.discountPercent.trim()){
                item.endOfDiscount=new Date(endOfDiscount).toISOString()
                item.discountPercent = parseFloat(item.discountPercent)
            }else{
                item.endOfDiscount=""
            }
            item.imgUrl = imgURL
            action(item)
        } else{
            setFormAlert(true)
            setTimeout(()=>{
                setFormAlert(false)
            },1000)
        }
    }

    const validateForm = ()=>{
        let isFormValid = true
        Object.keys(state).forEach(name=>{
            isFormValid = state[name].isValid && isFormValid
        })
        isFormValid= !!imgURL && isFormValid
        isFormValid= (!!endOfDiscount||!state.discountPercent.value.trim()) && isFormValid
        return isFormValid
    }

    const withDiscountInputs = (
        <>
        <div className="form-group">
            <label htmlFor="InputDiscount">Скидка %</label>
            <input 
                type="number"
                step="1"
                min="10" max="90"
                name="discountPercent"
                className="form-control"
                onChange={handleInputChange}
                value={state.discountPercent.value}
            />
            <AlertSpan 
                valid={state.discountPercent.isValid} 
                untouched={state.discountPercent.untouched}
                message={"10-90%"}
            />
        </div>
        <DatePicker
            selected={endOfDiscount}
            minDate={subDays(new Date(),-1)}
            onChange={date => setEndOfDiscount(date)}
            disabled={!state.discountPercent.value.trim()||!state.discountPercent.isValid}
            placeholderText={"дата окончания скидки"}
        />
        <br/>
        </>
    )
    return(
        <form onSubmit={onAdd}>
                <div className="form-group">
                    <label htmlFor="InputTitle">Название</label>
                    <input 
                        type="text"
                        name="title" 
                        className="form-control"
                        onChange={handleInputChange}
                        value={state.title.value}
                    />
                    <AlertSpan 
                        valid={state.title.isValid} 
                        untouched={state.title.untouched}
                        message={"минимум 20, максимум 60 символов"}
                    />
                </div>
                <ImageInput 
                    startURL={imgURL}
                    setImgURL={(url)=>{setImgURL(url)}}
                />
                <div className="form-group">
                    <label htmlFor="InputDescription">Описание</label>
                    <textarea 
                        type="text"
                        name="description" 
                        className="form-control"
                        onChange={handleInputChange}
                        value={state.description.value}
                    />
                    <AlertSpan 
                        valid={state.description.isValid} 
                        untouched={state.description.untouched}
                        message={"максимум 200 символов"}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="InputPrice">Цена</label>
                    <input 
                        type="number"
                        step="0.01"
                        min="0.01" max="99999999.99"
                        name="price"
                        className="form-control"
                        onChange={handleInputChange}
                        value={state.price.value}
                    />
                    <AlertSpan 
                        valid={state.price.isValid} 
                        untouched={state.price.untouched}
                        message={"положительное число(до 2 чисел после запятой), максимальное значение 99999999.99"}
                    />
                </div>
                {withDiscountInputs}
                <button type="submit" className="btn btn-primary m-1" disabled={formAlert||loading}>
                    {title}
                </button>
                {reqMess&&<span>{reqMess}</span>}
                <AlertSpan 
                    valid={!formAlert} 
                    message={"Заполните обязательные поля: Назввание, Картинка, Цена. Дата окончания(если была указана скидка)."}
                />
        </form>
    )
}

export default Form;