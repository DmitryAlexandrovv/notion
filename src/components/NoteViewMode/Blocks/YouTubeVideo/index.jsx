import YouTube from 'react-youtube';
import CreateBlock from '../hoc/createBlock';

const VideoBlock = (props) => {
    return <YouTube videoId={props.videoId} />;
};

export default CreateBlock(VideoBlock);
