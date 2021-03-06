import { Editor } from 'react-draft-wysiwyg';
import { Button } from 'antd';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import CreateBlock from '../hoc/createBlock';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './style.module.css';
import { CONTENT_TYPES } from '../../view-mode/constants';
import blockStyles from '../style.module.css';
import { useEffect, useRef } from 'react';

const TextBlock = (props) => {
    const { isEditMode, onSave, onCancel, data, setData, setError } = props;
    const inputRef = useRef(null);

    useEffect(() => {
        if (JSON.parse(data).blocks.length === 1 && JSON.parse(data).blocks[0].text.trim() === '') {
            setError(true);
        } else {
            setError(false);
        }
    }, [data]);

    useEffect(() => {
        if (isEditMode) {
            inputRef.current.focusEditor();
        }
    }, [isEditMode]);

    return (
        <div className={blockStyles.blockContent}>
            {isEditMode ? (
                <>
                    <Editor
                        defaultEditorState={EditorState.createWithContent(convertFromRaw(JSON.parse(data)))}
                        onEditorStateChange={(newEditorState) =>
                            setData(JSON.stringify(convertToRaw(newEditorState.getCurrentContent())))
                        }
                        editorClassName={styles.noteTextEditor}
                        ref={inputRef}
                    />
                    <div className={blockStyles.blockActions}>
                        <Button
                            className={blockStyles.blockActionsBtn}
                            onClick={() => onSave(CONTENT_TYPES.TEXT, data)}
                        >
                            Сохранить блок
                        </Button>
                        <Button className={blockStyles.blockActionsBtn} onClick={onCancel}>
                            Отмена
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(data)) }} />
                </>
            )}
        </div>
    );
};

export default CreateBlock(TextBlock);
