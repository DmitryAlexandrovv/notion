import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NOTE_MODE_TYPES } from '../../../../constants';
import OutsideClickHandler from 'react-outside-click-handler';

import styles from '../style.module.css';
import { CONTENT_TYPES } from '../../note-view-mode/constants';

const CreateBlock = (WrappedComponent) => {
    return function WithWrapper(props) {
        const activeMode = useSelector((state) => state.activeMode),
            [isCtrlGroupVisible, toggleCtrlGroupVisibility] = useState(false),
            [isEdit, toggleEdit] = useState(false),
            [data, setData] = useState(props.block.data),
            [error, setError] = useState(false);

        useEffect(() => {
            setData(props.block.data);
        }, [props.block.data]);

        const outsideClickHandler = (event) => {
            if (isEdit) {
                if (error) {
                    onCancel();
                } else {
                    if (props.block.type === CONTENT_TYPES.LINK_TO_NOTE) {
                        if (!event.target.closest('.ant-select-dropdown')) {
                            onSave(props.block.type, data);
                        }
                    } else {
                        onSave(props.block.type, data);
                    }
                }
            }
        };

        const onSave = (type, blockData) => {
            toggleEdit(false);
            props.onChange(type, props.block.id, blockData);
        };

        const onCancel = () => {
            toggleEdit(false);
            setData(props.block.data);
        };

        const deleteCurrentBlock = () => {
            props.deleteBlock(props.block.id);
        };

        return (
            <div
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
                                    <EditOutlined
                                        className={styles.blockCtrlGroupItem}
                                        onClick={() => toggleEdit(true)}
                                    />
                                </div>
                            </div>
                        )}
                        <WrappedComponent
                            {...props}
                            isEditMode={activeMode === NOTE_MODE_TYPES.EDIT && isEdit}
                            toggleEdit={toggleEdit}
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
        );
    };
};

export default CreateBlock;
