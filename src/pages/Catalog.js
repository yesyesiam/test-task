import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Product from '../components/Product/Product';
import Loader from '../components/Loader';
import { getCatalog, removeCatalogItem } from '../store/actions/catalog';

const Catalog = ()=>{
    const dispatch = useDispatch()
    const {catalog, loading, isAuth} = useSelector(state => {
        return{
            catalog: state.catalog.catalog,
            loading: state.catalog.loading,
            isAuth: !!state.auth.token
        }
    })
    useEffect(()=>{
        dispatch(getCatalog())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const removeProduct = (id)=>{
        dispatch(removeCatalogItem(id))
    }

    const renderProducts= ()=>{
        if(loading){
            return(
                <div className="col">
                    <Loader clazz={"text-left"}/>
                </div>
            )
        }
        if(catalog.length===0){
            return(
                <div className="col">
                    <p>Каталог пуст.</p>
                </div>
            )
        }
        return catalog.map((product)=>{
            return(
                <div className="col" key={product.id}>
                    <Product {...product} editMode={isAuth} onRemove={removeProduct}/>
                </div>
            )
        })
    }

    return(
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3">
            {renderProducts()}
        </div>
    )
}

export default Catalog;