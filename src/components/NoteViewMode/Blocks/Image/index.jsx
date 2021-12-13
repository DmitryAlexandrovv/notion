import { Alert, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import CreateBlock from '../hoc/createBlock';
import Loader from 'react-loader-spinner';
import { CONTENT_TYPES } from '../../constants';

import styles from './style.module.css';
import blockStyles from '../style.module.css';

const ImageBlock = (props) => {
    const { isEditMode, toggleEdit, onChange, block } = props,
        [error, setError] = useState(false),
        [imageURI, changeImageURI] = useState(block.data.url),
        [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        changeImageURI(block.data.url);
    }, [block]);

    //ToDo стили будем принимать извне, если нет, то по дефолту width: 100%(при редактировании)
    //На будущее, пока сложно будет реализовать
    const style = {
        width: `${props.width}px`,
    };

    const onInput = (event) => {
        setIsLoaded(false);
        setError(false);
        changeImageURI(event.target.value);
    };

    const onSave = () => {
        toggleEdit(false);
        onChange(CONTENT_TYPES.IMAGE, block.id, imageURI);
    };

    const onCancel = () => {
        toggleEdit(false);
        changeImageURI(block.data.url);
    };

    const onSuccessImageLoaded = () => {
        setIsLoaded(true);
        setError(false);
    };

    const onBadImageLoaded = () => {
        setError(true);
        setIsLoaded(true);
    };

    return (
        <div className={blockStyles.blockContent}>
            {isEditMode && (
                <>
                    <Input
                        className={blockStyles.blockInputField}
                        placeholder='Введите адрес изображения'
                        value={imageURI}
                        onChange={(event) => onInput(event)}
                    />
                    {isLoaded && error && <Alert message='Что-то пошло не так' type='error' />}
                </>
            )}
            {!isLoaded && !error && <Loader type='Puff' color='#00BFFF' height={100} width={100} />}
            <div className={`${styles.imageBlock} ${error || !isLoaded ? styles.imageBlockHidden : ''}`}>
                <img
                    style={style}
                    src={imageURI}
                    alt='картинка'
                    onError={onBadImageLoaded}
                    onLoad={onSuccessImageLoaded}
                />
            </div>
            {isEditMode && (
                <div className={blockStyles.blockActions}>
                    {!error && (
                        <Button className={blockStyles.blockActionsBtn} onClick={onSave}>
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

export default CreateBlock(ImageBlock);
