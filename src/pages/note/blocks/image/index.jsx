import { Alert, Button, Input } from 'antd';
import CreateBlock from '../hoc/createBlock';
import WithImage from '../hoc/withImage';
import Loader from 'react-loader-spinner';
import { CONTENT_TYPES } from '../../view-mode/constants';

import styles from './style.module.css';
import blockStyles from '../style.module.css';
import { useEffect, useRef } from 'react';

const ImageBlock = (props) => {
    const { isEditMode, onSave, onCancel, data, onInput, onSuccessImageLoaded, onBadImageLoaded, error, isLoaded } =
        props;
    const inputRef = useRef(null);

    //ToDo стили будем принимать извне, если нет, то по дефолту width: 100%(при редактировании)
    //На будущее, пока сложно будет реализовать
    const style = {
        width: `${props.width}px`,
    };

    useEffect(() => {
        if (isEditMode) {
            inputRef.current.focus();
        }
    }, [isEditMode]);

    return (
        <div className={blockStyles.blockContent}>
            {isEditMode && (
                <>
                    <Input
                        className={blockStyles.blockInputField}
                        placeholder='Введите адрес изображения'
                        value={data.url}
                        onChange={onInput}
                        ref={inputRef}
                    />
                    {isLoaded && error && <Alert message='Что-то пошло не так' type='error' />}
                </>
            )}
            {!isLoaded && !error && <Loader type='Puff' color='#00BFFF' height={100} width={100} />}
            <div className={`${styles.imageBlock} ${error || !isLoaded ? styles.imageBlockHidden : ''}`}>
                <img
                    style={style}
                    src={data.url}
                    alt='картинка'
                    onError={onBadImageLoaded}
                    onLoad={onSuccessImageLoaded}
                />
            </div>
            {isEditMode && (
                <div className={blockStyles.blockActions}>
                    {!error && (
                        <Button
                            className={blockStyles.blockActionsBtn}
                            onClick={() => onSave(CONTENT_TYPES.IMAGE, data)}
                        >
                            Сохранить блок
                        </Button>
                    )}
                    <Button className={blockStyles.blockActionsBtn} onClick={onCancel}>
                        Отмена
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CreateBlock(WithImage(ImageBlock));
