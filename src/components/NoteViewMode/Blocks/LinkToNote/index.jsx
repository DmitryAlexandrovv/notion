import { Button } from 'antd';
import CreateBlock from '../hoc/createBlock';

const LinkToNoteBlock = (props) => {
    const redirect = () => {
        //ToDo редирект на другую заметку
    };

    return <Button onClick={redirect}>{props.title}</Button>;
};

export default CreateBlock(LinkToNoteBlock);
