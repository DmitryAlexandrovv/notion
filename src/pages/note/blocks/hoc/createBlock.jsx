import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { NOTE_MODE_TYPES } from '../../../../constants';
import { CONTENT_TYPES } from '../../view-mode/constants';
import OutsideClickHandler from 'react-outside-click-handler';
import { canDragNote } from '../../../../store/actions';

import styles from '../style.module.css';

const CreateBlock = (WrappedComponent) => {
    return function WithWrapper(props) {
        const { block, addBlock, deleteBlock, addedBlocksIds, setAddedBlocksIds, onChange } = props,
            activeMode = useSelector((state) => state.activeMode),
            [isCtrlGroupVisible, toggleCtrlGroupVisibility] = useState(false),
            [isEdit, toggleEdit] = useState(false),
            [data, setData] = useState(block.data),
            [error, setError] = useState(false),
            dispatch = useDispatch();

        useEffect(() => {
            if (activeMode === NOTE_MODE_TYPES.EDIT) {
                toggleEdit(addedBlocksIds.indexOf(block.id) !== -1);
            }
        }, [addedBlocksIds]);

        const [, drop] = useDrop(
            () => ({
                accept: [CONTENT_TYPES.TEXT, CONTENT_TYPES.IMAGE, CONTENT_TYPES.VIDEO, CONTENT_TYPES.LINK_TO_NOTE],
                drop: (item, monitor) => {
                    addBlock(block.id, item, monitor.getClientOffset());
                },
            }),
            [block]
        );

        const outsideClickHandler = (event) => {
            //ToDo может можно легче?
            if (isEdit) {
                if (error) {
                    if (block.type === CONTENT_TYPES.LINK_TO_NOTE) {
                        if (!event.target.closest('.ant-select-dropdown')) {
                            onCancel();
                        }
                    } else {
                        onCancel();
                    }
                } else {
                    if (block.type === CONTENT_TYPES.LINK_TO_NOTE) {
                        if (!event.target.closest('.ant-select-dropdown')) {
                            onSave(block.type, data);
                        }
                    } else {
                        onSave(block.type, data);
                    }
                }
            }
        };

        const onSave = (type, blockData) => {
            toggleEdit(false);
            dispatch(canDragNote(true));
            if (addedBlocksIds.indexOf(block.id) !== -1) {
                setAddedBlocksIds([...addedBlocksIds].filter((id) => id !== block.id));
            }
            onChange(type, block.id, blockData);
        };

        const onCancel = () => {
            toggleEdit(false);
            dispatch(canDragNote(true));
            if (error && addedBlocksIds.indexOf(block.id) !== -1) {
                deleteCurrentBlock();
            } else {
                setData(block.data);
            }
        };

        const onStartEditing = () => {
            toggleEdit(true);
            dispatch(canDragNote(false));
        };

        const deleteCurrentBlock = () => {
            deleteBlock(block.id);
        };

        return (
            <div ref={drop} className={styles.blockDropPanel}>
                <div
                    id={block.id}
                    className={styles.block}
                    onMouseEnter={() => toggleCtrlGroupVisibility(true)}
                    onMouseLeave={() => toggleCtrlGroupVisibility(false)}
                >
                    <OutsideClickHandler onOutsideClick={outsideClickHandler}>
                        <div className={styles.blockCtrlGroupPositioner}>
                            {isCtrlGroupVisible && activeMode === NOTE_MODE_TYPES.EDIT && !isEdit && (
                                <div className={styles.blockCtrlGroupWrapper}>
                                    <div className={styles.blockCtrlGroup}>
                                        <DeleteOutlined
                                            className={styles.blockCtrlGroupItem}
                                            onClick={deleteCurrentBlock}
                                        />
                                        <EditOutlined className={styles.blockCtrlGroupItem} onClick={onStartEditing} />
                                    </div>
                                </div>
                            )}
                            <WrappedComponent
                                {...props}
                                isEditMode={activeMode === NOTE_MODE_TYPES.EDIT && isEdit}
                                toggleCtrlGroupVisibility={toggleCtrlGroupVisibility}
                                onSave={onSave}
                                onCancel={onCancel}
                                data={data}
                                setData={setData}
                                error={error}
                                setError={setError}
                            />
                        </div>
                    </OutsideClickHandler>
                </div>
            </div>
        );
    };
};

export default CreateBlock;
