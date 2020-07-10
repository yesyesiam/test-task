import React from 'react';
import { addCatalogItem } from '../store/actions/catalog';
import { useDispatch} from "react-redux";
import Form from '../components/Form';

const Add = ()=>{
    const dispatch = useDispatch()

    const add = (item)=>{
        dispatch(addCatalogItem(item))
    }

    return(
        <div>
            <h1>Добавить</h1>
                <Form
                    action={add}
                    title={'Добавить'}
                />
        </div>
    )
}

export default Add;