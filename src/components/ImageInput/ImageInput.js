import React, {useState, useEffect} from 'react';
import Loader from '../Loader';

function getMeta(url){
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => {delete img.onload;resolve(img)};
        img.onerror = reject;
        img.src = url;
    });
}

const ImageInput = ({startURL='', setImgURL})=>{
    const [value, setValue] = useState('')
    const [check, setCheck] = useState('')
    const [picture, setPicture] = useState({picture: null, error: null, loading: false})

    useEffect(()=>{
        let cleanupFunction = false;
        const getImg = async ()=>{
            if(!cleanupFunction){
                setPicture({
                    picture: null,
                    loading: true,
                    error: null
                })
            }
            try{
                const img = await getMeta(value)
                if(!cleanupFunction){
                    if(onValid(img.width, img.height)){
                        setPicture({
                            error: 'Картинка не подходит по размеру',
                            picture: null,
                            loading: false
                        })
                        return
                    }
                    setPicture({
                        error: null,
                        picture: {
                            width: img.width,
                            height: img.height,
                            src: img.src,
                        },
                        loading: false
                    })
                }
            }catch(e){
                if(!cleanupFunction){
                    setPicture({
                        error: "Ошибка",
                        picture: null,
                        loading: false
                    })
                }
            }
        }
        if(value!==''&&(value===startURL||value===check)) getImg()
        return () => {cleanupFunction = true;}
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[check, value])

    useEffect(()=>{
        //console.log(startURL)
        setValue(!!startURL?startURL:'')
    },[startURL])

    useEffect(()=>{
        setImgURL(!!picture.picture?picture.picture.src:null)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [picture.picture])

    const onLabelChange= (e)=>{
        const re = /^\S*$/;
        if (re.test(e.target.value)) {
            setValue(e.target.value)
        }
    }

    const onAdd = ()=>{
        if(value!==''){
            setCheck(value)
        }
    }

    const onClear= ()=>{
        setValue('')
        setPicture({picture: null, error: false, loading: false})
    }

    const onValid = (w, h)=>{
        return !((w>=200&&w<=4000)&&(h>=200&&h<=4000))
    }
    return(
        <div className="form-group">
            <label htmlFor="img">URL Картинки (мин ширина/высота - 200px, макс - 4000px)</label>
            <input 
                type="url" 
                className="form-control"
                onChange={onLabelChange}
                value={value}
                onBlur={onAdd}
                disabled={picture.picture}
            />
            <ImageInputAlert
                picture={picture.picture}
                error={picture.error}
                onClear={onClear}
                loading = {picture.loading}
            />
        </div>
    )
}

export default ImageInput;

const ImageInputAlert = ({picture, error, onClear, loading})=>{

    if(loading) return <Loader clazz="text-left"/>
    if(!(error||picture)) return null

    const errMess = error?<span className="text-danger">{error}</span>:null
    const pic = picture?
        <>
        <img height="100px" src={picture.src} alt="img"/>
        <span className="m-1 text-success">{picture.width}x{picture.height}</span>
        </>
        :null

    return(
        <div>
            {pic}
            {errMess}
            <p className="btn btn-outline-danger btn-sm m-1"
                onClick={onClear}
            >
                <i className="fa fa-trash-o" />
            </p>
        </div>
    )
}