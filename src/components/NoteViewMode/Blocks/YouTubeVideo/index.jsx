import YouTube from 'react-youtube';

import styles from './style.module.css';

const VideoBlock = (props) => {
    return (
        <div className={styles.videoBlock}>
            <YouTube videoId={props.videoId} />
        </div>
    );
};

export default VideoBlock;
