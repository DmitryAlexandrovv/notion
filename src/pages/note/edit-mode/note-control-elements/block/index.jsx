import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import styles from './style.module.css';
import { setIsDraggingActive } from '../../../../../store/actions/notesActions';

const Block = ({ type, text }) => {
    const canDragBlock = useSelector((state) => state.notes.canDragBlock),
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
