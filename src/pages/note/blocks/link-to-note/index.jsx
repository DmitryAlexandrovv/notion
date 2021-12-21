import { Button, TreeSelect } from 'antd';
import { useSelector } from 'react-redux';
import CreateBlock from '../hoc/createBlock';
import { getNestedArray, createNoteTree } from '../../../../helpers';

import blockStyles from '../style.module.css';
import styles from './style.module.css';
import { CONTENT_TYPES } from '../../view-mode/constants';
import { useEffect } from 'react';

const LinkToNoteBlock = (props) => {
    const { isEditMode, onSave, onCancel, data, setData, setError } = props,
        formattedPages = getNestedArray(
            useSelector((state) => state.pages),
            null
        );

    useEffect(() => {
        if (!data.id) {
            setError(true);
        }
    }, [data]);

    const redirect = () => {
        //ToDo редирект на другую заметку
    };

    return (
        <div className={blockStyles.blockContent}>
            {isEditMode ? (
                <>
                    <TreeSelect
                        value={data.id}
                        onChange={(id, title) => setData({ id, title })}
                        className={styles.linkBlockElement}
                    >
                        {formattedPages.map((page) => {
                            return createNoteTree(page);
                        })}
                    </TreeSelect>
                    <div className={blockStyles.blockActions}>
                        <Button
                            className={blockStyles.blockActionsBtn}
                            onClick={() => onSave(CONTENT_TYPES.LINK_TO_NOTE, data)}
                        >
                            Сохранить блок
                        </Button>
                        <Button className={blockStyles.blockActionsBtn} onClick={onCancel}>
                            Отмена
                        </Button>
                    </div>
                </>
            ) : (
                <Button onClick={redirect} className={styles.linkBlockElement}>
                    {data.title}
                </Button>
            )}
        </div>
    );
};

export default CreateBlock(LinkToNoteBlock);
