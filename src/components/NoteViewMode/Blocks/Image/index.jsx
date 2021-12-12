import { Button, Input } from 'antd';
import { useState } from 'react';
import CreateBlock from '../hoc/createBlock';
import Loader from 'react-loader-spinner';
import { CONTENT_TYPES } from '../../constants';

import styles from './style.module.css';

const ImageBlock = (props) => {
    const [imageURI, changeImageURI] = useState(''),
        [isLoaded, setIsLoaded] = useState(false),
        { isEditMode, toggleEdit, onChange, block } = props;

    //ToDo стили будем принимать извне, если нет, то по дефолту width: 100%(при редактировании)
    //На будущее, пока сложно будет реализовать
    const style = {
        width: `${props.width}px`,
    };

    const onSave = () => {
        toggleEdit(false);
        setIsLoaded(false);
        const isSuccess = onChange(CONTENT_TYPES.IMAGE, block.id, imageURI);
    };

    return (
        <div>
            {isEditMode && (
                <>
                    <Input
                        placeholder='Введите адрес изображения'
                        onChange={(event) => changeImageURI(event.target.value)}
                    />
                </>
            )}
            {!isLoaded && <Loader type='Puff' color='#00BFFF' height={100} width={100} />}
            <div className={styles.imageBlock}>
                <img style={style} src={block.data.url} alt='картинка' onLoad={() => setIsLoaded(true)} />
            </div>
            {isEditMode && (
                <Button className={styles.noteImageSaveBtn} onClick={onSave}>
                    Сохранить блок
                </Button>
            )}
        </div>
    );
};

export default CreateBlock(ImageBlock);
