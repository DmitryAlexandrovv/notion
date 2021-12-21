import YouTube from 'react-youtube';
import CreateBlock from '../hoc/createBlock';
import WithImage from '../hoc/withImage';
import Loader from 'react-loader-spinner';
import { Alert, Button, Input } from 'antd';
import { CONTENT_TYPES } from '../../view-mode/constants';
import { getVideoId, getPreview } from '../../../../helpers';

import styles from './styles.module.css';
import blockStyles from '../style.module.css';

const VideoBlock = (props) => {
    const {
            isEditMode,
            onSave,
            onCancel,
            data,
            onInput,
            onSuccessImageLoaded,
            onBadImageLoaded,
            error,
            isLoaded,
            setIsLoaded,
        } = props,
        videoID = getVideoId(data.url),
        preview = getPreview(videoID);

    //ToDo что по ширине preview?
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
                        value={data.url}
                        onChange={onInput}
                    />
                    <div className={error || !videoID ? styles.videoBlockHidden : ''}>
                        <img
                            src={preview}
                            alt='Превью'
                            onError={onBadImageLoaded}
                            onLoad={onSuccessImageLoaded}
                            style={style}
                        />
                    </div>
                    {(error || !videoID) && <Alert message='Что-то пошло не так' type='error' />}
                    <div className={blockStyles.blockActions}>
                        {!error && (
                            <Button
                                className={blockStyles.blockActionsBtn}
                                onClick={() => onSave(CONTENT_TYPES.VIDEO, data)}
                            >
                                Сохранить блок
                            </Button>
                        )}
                        <Button className={blockStyles.blockActionsBtn} onClick={onCancel}>
                            Отмена
                        </Button>
                    </div>
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

export default CreateBlock(WithImage(VideoBlock));
