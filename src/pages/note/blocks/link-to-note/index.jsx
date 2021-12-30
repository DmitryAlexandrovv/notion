import { Button, TreeSelect } from 'antd';
import { useSelector } from 'react-redux';
import CreateBlock from '../hoc/createBlock';
import { getNestedArray, createNoteTree } from '../../../../helpers';
import { useNavigate } from 'react-router-dom';
import { CONTENT_TYPES } from '../../view-mode/constants';
import { NOTE_MODE_TYPES } from '../../../../constants';
import { useEffect, useRef } from 'react';

import blockStyles from '../style.module.css';
import styles from './style.module.css';

const LinkToNoteBlock = (props) => {
    const { isEditMode, onSave, onCancel, data, setData, setError } = props,
        pages = useSelector((state) => state.pages),
        activeMode = useSelector((state) => state.activeMode),
        formattedPages = getNestedArray(pages, undefined),
        navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (!data.id) {
            setError(true);
        }
    }, [data]);

    useEffect(() => {
        if (isEditMode) {
            inputRef.current.focus();
        }
    }, [isEditMode]);

    const redirect = () => {
        const page = pages[data.id];
        navigate(`/note/${page.url ? page.url : data.id}`, { replace: true });
    };

    return (
        <div className={blockStyles.blockContent}>
            {isEditMode ? (
                <>
                    <TreeSelect
                        value={data.id}
                        onChange={(id, title) => setData({ id, title })}
                        className={styles.linkBlockElement}
                        ref={inputRef}
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
                <Button
                    className={styles.linkBlockElement}
                    onClick={redirect}
                    disabled={activeMode === NOTE_MODE_TYPES.EDIT}
                >
                    {data.title}
                </Button>
            )}
        </div>
    );
};

export default CreateBlock(LinkToNoteBlock);
