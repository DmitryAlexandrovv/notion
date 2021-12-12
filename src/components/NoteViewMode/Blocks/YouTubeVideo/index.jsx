import YouTube from 'react-youtube';
import CreateBlock from '../hoc/createBlock';
import { useState } from 'react';
import { Button, Input } from 'antd';
import { CONTENT_TYPES } from '../../constants';

import styles from './styles.module.css';
import Loader from 'react-loader-spinner';

const VideoBlock = (props) => {
    const getPreview = (id) => {
        return `http://i1.ytimg.com/vi/${id}/maxresdefault.jpg`;
    };

    const getVideoId = (url) => {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[7].length === 11 ? match[7] : false;
    };

    const { isEditMode, toggleEdit, onChange, block } = props,
        [isLoaded, setIsLoaded] = useState(false),
        [videoURI, changeVideoURI] = useState(block.data.url),
        videoID = getVideoId(videoURI),
        error = videoID === false,
        preview = getPreview(videoID);

    const onSave = () => {
        toggleEdit(false);
        setIsLoaded(false);
        onChange(CONTENT_TYPES.VIDEO, block.id, {
            url: videoURI,
        });
    };

    const style = {
        width: '320px',
    };

    return (
        <div>
            {isEditMode ? (
                <>
                    <Input
                        placeholder='Введите адрес видео'
                        value={videoURI}
                        onChange={(event) => changeVideoURI(event.target.value)}
                    />
                    {preview && error === false && (
                        <img src={preview} alt='Превью' onLoad={() => setIsLoaded(true)} style={style} />
                    )}
                    <Button className={styles.noteVideoSaveBtn} onClick={onSave}>
                        Сохранить блок
                    </Button>
                </>
            ) : (
                <div className={!isLoaded ? styles.videoBlockHidden : ''}>
                    <YouTube onReady={() => setIsLoaded(true)} videoId={videoID} />
                </div>
            )}
            {!isLoaded && <Loader type='Puff' color='#00BFFF' height={100} width={100} />}
        </div>
    );
};

export default CreateBlock(VideoBlock);
