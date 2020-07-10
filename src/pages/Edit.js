import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCatalogItem, editCatalogItem } from '../store/actions/catalog';
import Loader from '../components/Loader';
import Form from '../components/Form';

const Edit = ({match})=>{
    const dispatch = useDispatch()

    const {catalogItem, loading} = useSelector(state => {
        return{
            catalogItem: state.catalog.catalogItem,
            loading: state.catalog.loading,
        }
    })

    useEffect(() => {
        dispatch(getCatalogItem(match.params.id))
        // eslint-disable-next-line
    }, [])

    const edit = (item)=>{
        dispatch(editCatalogItem(item, match.params.id))
    }

    if(loading) return <Loader />
    return(
        <div>
            <h1>Изменить</h1>
            <Form 
                action={edit}
                catalogItem={catalogItem}
                loading={loading}
                title={'Изменить'}
            />
        </div>
    )
}

export default Edit;