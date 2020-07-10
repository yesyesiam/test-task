import React from 'react';
import './Product.css'
import { NavLink } from 'react-router-dom';

const Product = (props)=>{
    const renderPrice = ()=>{
        return(
            <ul className="list-group list-group-flush">
                {
                    props.withDiscount?
                    <>
                    <li className="list-group-item">
                        Цена:&nbsp;
                        <span className="inactive-price">{props.price.toFixed(2)}</span>
                        &nbsp;
                        <span className="active-price">{props.priceWithDiscount.toFixed(2)}</span>
                    </li>
                    <li className="list-group-item">
                        <small>
                            До конца скидки: {props.daysLeft===0?`меньше дня.`:`${props.daysLeft} дн.`}
                        </small>
                    </li>
                    </>
                    :
                    <li className="list-group-item">
                        Цена:&nbsp;<span className="active-price">{props.price.toFixed(2)}</span>
                    </li>
                }
            </ul>
        )
    }

    return(
        <div className="card">
            <img src={props.imgUrl} className="card-img-top" alt="product"/>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
            </div>
            {renderPrice()}
            {
                props.editMode?
                <div className="card-body">
                    <button className="btn btn-outline-danger mr-1"
                        onClick={()=>props.onRemove(props.id)}
                    >
                        Удалить
                    </button>
                    <NavLink to={`/edit/${props.id}`} className="btn btn-outline-secondary">Редактировать</NavLink>
                </div>
                :null
            }
        </div>
    )
}

export default Product;