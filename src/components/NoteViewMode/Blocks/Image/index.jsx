import styles from './style.module.css';
import CreateBlock from '../hoc/createBlock';

const ImageBlock = (props) => {
    //ToDo стили будем принимать извне, если нет, то по дефолту width: 100%(при редактировании)
    const style = {
        width: `${props.width}px`,
    };

    return (
        <div className={styles.imageBlock}>
            <img src={props.imageURL} alt='картинка' style={style} />
        </div>
    );
};

export default CreateBlock(ImageBlock);
