import YouTube from 'react-youtube';
import CreateBlock from '../hoc/createBlock';
import Loader from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { Alert, Button, Input } from 'antd';
import { CONTENT_TYPES } from '../../constants';

import styles from './styles.module.css';
import blockStyles from '../style.module.css';

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
        [error, setError] = useState(false),
        [isLoaded, setIsLoaded] = useState(false),
        [videoURI, changeVideoURI] = useState(block.data.url),
        videoID = getVideoId(videoURI),
        preview = getPreview(videoID);

    useEffect(() => {
        if (videoID === false) {
            setError(true);
        } else {
            setError(false);
        }
    }, [videoURI]);

    const onSave = () => {
        toggleEdit(false);
        setIsLoaded(false);
        onChange(CONTENT_TYPES.VIDEO, block.id, {
            url: videoURI,
        });
    };

    const onBadImageLoaded = () => {
        setError(true);
    };

    const style = {
        width: '320px',
    };

    return (
        <div className={blockStyles.blockContent}>
            {isEditMode ? (
                <>
                    <Input
                        className={blockStyles.blockInputField}
                        placeholder='Введите адрес видео'
                        value={videoURI}
                        onChange={(event) => changeVideoURI(event.target.value)}
                    />
                    {!error && (
                        <img
                            src={preview}
                            alt='Превью'
                            onError={onBadImageLoaded}
                            onLoad={() => setIsLoaded(true)}
                            style={style}
                        />
                    )}
                    {error && <Alert message='Что-то пошло не так' type='error' />}
                    {!error && (
                        <Button className={styles.noteVideoSaveBtn} onClick={onSave}>
                            Сохранить блок
                        </Button>
                    )}
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
