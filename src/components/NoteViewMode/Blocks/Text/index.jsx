import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NOTE_MODE_TYPES } from '../../../../constants';
import { Editor } from 'react-draft-wysiwyg';
import ReactTooltip from 'react-tooltip';
import { Button } from 'antd';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import styles from './style.module.css';

const TextBlock = (props) => {
    const activeMode = useSelector((state) => state.activeMode),
        [isEdit, toggleEdit] = useState(false),
        [editorState, onEditorStateChange] = useState(EditorState.createEmpty());

    const { onChange, block } = props;

    const onSave = () => {
        const blockHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        toggleEdit(false);
        onChange(block.id, blockHtml);
    };

    const isEditMode = activeMode === NOTE_MODE_TYPES.EDIT && isEdit;

    return (
        <div className={styles.textBlock}>
            {isEditMode ? (
                <>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        editorClassName={styles.noteTextEditor}
                    />
                    <Button className={styles.noteTextSaveBtn} onClick={onSave}>
                        Сохранить блок
                    </Button>
                </>
            ) : (
                <>
                    <div
                        data-tip={'Кликни для редактирования'}
                        dangerouslySetInnerHTML={{ __html: block.data }}
                        onClick={() => toggleEdit(true)}
                    />
                    {activeMode === NOTE_MODE_TYPES.EDIT && <ReactTooltip />}
                </>
            )}
        </div>
    );
};

export default TextBlock;
