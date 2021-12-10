import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Button } from 'antd';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import CreateBlock from '../hoc/createBlock';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './style.module.css';

const TextBlock = (props) => {
    const [editorState, onEditorStateChange] = useState(EditorState.createEmpty()),
        { isEditMode, toggleEdit } = props;

    const { onChange, block } = props;

    const onSave = () => {
        const blockHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        toggleEdit(false);
        onChange(block.id, blockHtml);
    };

    return (
        <div>
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
                    <div dangerouslySetInnerHTML={{ __html: block.data }} />
                </>
            )}
        </div>
    );
};

export default CreateBlock(TextBlock);
