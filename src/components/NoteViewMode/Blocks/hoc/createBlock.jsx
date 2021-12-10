import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NOTE_MODE_TYPES } from '../../../../constants';

import styles from '../style.module.css';

const CreateBlock = (WrappedComponent) => {
    return function WithWrapper(props) {
        const activeMode = useSelector((state) => state.activeMode),
            [isCtrlGroupVisible, toggleCtrlGroupVisibility] = useState(false),
            [isEdit, toggleEdit] = useState(false);

        return (
            <div className={styles.block}>
                <div
                    className={styles.blockCtrlGroupPositioner}
                    onMouseEnter={() => toggleCtrlGroupVisibility(true)}
                    onMouseLeave={() => toggleCtrlGroupVisibility(false)}
                >
                    {isCtrlGroupVisible && activeMode === NOTE_MODE_TYPES.EDIT && !isEdit && (
                        <div className={styles.blockCtrlGroupWrapper}>
                            <div className={styles.blockCtrlGroup}>
                                <DeleteOutlined className={styles.blockCtrlGroupItem} />
                                <EditOutlined className={styles.blockCtrlGroupItem} onClick={() => toggleEdit(true)} />
                            </div>
                        </div>
                    )}
                    <WrappedComponent
                        {...props}
                        isEditMode={activeMode === NOTE_MODE_TYPES.EDIT && isEdit}
                        toggleEdit={toggleEdit}
                        toggleCtrlGroupVisibility={toggleCtrlGroupVisibility}
                    />
                </div>
            </div>
        );
    };
};

export default CreateBlock;
