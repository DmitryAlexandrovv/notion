import { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Button } from 'antd';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import CreateBlock from '../hoc/createBlock';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './style.module.css';
import { CONTENT_TYPES } from '../../constants';
import blockStyles from '../style.module.css';

const TextBlock = (props) => {
    const { isEditMode, toggleEdit, onChange, block } = props,
        [editorState, onEditorStateChange] = useState(
            EditorState.createWithContent(convertFromRaw(JSON.parse(block.data)))
        ),
        convertedToHtmlData = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    useEffect(() => {
        onEditorStateChange(EditorState.createWithContent(convertFromRaw(JSON.parse(block.data))));
    }, [block]);

    const onSave = () => {
        toggleEdit(false);
        onChange(CONTENT_TYPES.TEXT, block.id, JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    };

    return (
        <div className={blockStyles.blockContent}>
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
                    <div dangerouslySetInnerHTML={{ __html: convertedToHtmlData }} />
                </>
            )}
        </div>
    );
};

export default CreateBlock(TextBlock);
