import { Alert, Button, Input } from 'antd';
import { useState } from 'react';
import CreateBlock from '../hoc/createBlock';
import WithImage from '../hoc/withImage';
import Loader from 'react-loader-spinner';
import { CONTENT_TYPES } from '../../note-view-mode/constants';

import styles from './style.module.css';
import blockStyles from '../style.module.css';

const ImageBlock = (props) => {
    const { isEditMode, onSave, onCancel, data, onInput, onSuccessImageLoaded, onBadImageLoaded, error, isLoaded } =
        props;

    //ToDo стили будем принимать извне, если нет, то по дефолту width: 100%(при редактировании)
    //На будущее, пока сложно будет реализовать
    const style = {
        width: `${props.width}px`,
    };

    return (
        <div className={blockStyles.blockContent}>
            {isEditMode && (
                <>
                    <Input
                        className={blockStyles.blockInputField}
                        placeholder='Введите адрес изображения'
                        value={data.url}
                        onChange={onInput}
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
