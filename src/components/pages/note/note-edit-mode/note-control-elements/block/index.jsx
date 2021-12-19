import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setIsDraggingActive } from '../../../../../../store/actions';

import styles from './style.module.css';

const Block = ({ type, text }) => {
    const canDragBlock = useSelector((state) => state.canDragBlock),
        dispatch = useDispatch();

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type,
            item: { type },
            canDrag: canDragBlock,
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [canDragBlock]
    );

    useEffect(() => {
        dispatch(setIsDraggingActive(isDragging));
    }, [isDragging]);

    return (
        <div className={styles.block} ref={drag}>
            {text}
        </div>
    );
};

export default Block;
