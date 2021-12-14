import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveActiveNote } from '../../../store/actions';
import { CONTENT_TYPES } from '../note-view-mode/constants';
import { Button } from 'antd';
import TextBlock from '../blocks/text';
import ImageBlock from '../blocks/image';
import VideoBlock from '../blocks/youtube-video';
import LinkToNoteBlock from '../blocks/link-to-note';

import noteStyles from '../note-view-mode/style.module.css';
import styles from './style.module.css';

const NoteEditMode = (props) => {
    const dispatch = useDispatch(),
        [note, onUpdateNote] = useState(props.activeNote);

    const onBlockContentChanged = (type, id, data) => {
        const updatedNote = {
            ...note,
            blocks: note.blocks.map((block) => {
                if (block.id !== id) {
                    return {
                        ...block,
                    };
                } else {
                    return {
                        ...block,
                        data,
                    };
                }
            }),
        };

        onUpdateNote(updatedNote);
    };

    const deleteBlock = (blockId) => {
        const updatedNote = {
            ...note,
            blocks: note.blocks.filter((block) => block.id !== blockId),
        };

        onUpdateNote(updatedNote);
    };

    const onSave = () => {
        // ToDo пост запрос
        // ToDo сохранение при клике мимо
        dispatch(saveActiveNote(note));
    };

    return (
        <>
            <div className={noteStyles.note}>
                <h3 className={noteStyles.noteTitle}>{note.title}</h3>
                {note.blocks.map((block) => {
                    switch (block.type) {
                        case CONTENT_TYPES.TEXT:
                            return (
                                <TextBlock
                                    deleteBlock={deleteBlock}
                                    block={block}
                                    onChange={onBlockContentChanged}
                                    key={block.id}
                                />
                            );
                        case CONTENT_TYPES.IMAGE:
                            return (
                                <ImageBlock
                                    deleteBlock={deleteBlock}
                                    width={block.data.width}
                                    onChange={onBlockContentChanged}
                                    block={block}
                                    key={block.id}
                                />
                            );
                        case CONTENT_TYPES.VIDEO:
                            return (
                                <VideoBlock
                                    deleteBlock={deleteBlock}
                                    onChange={onBlockContentChanged}
                                    block={block}
                                    key={block.id}
                                />
                            );
                        case CONTENT_TYPES.LINK_TO_NOTE:
                            return (
                                <LinkToNoteBlock
                                    deleteBlock={deleteBlock}
                                    block={block}
                                    onChange={onBlockContentChanged}
                                    key={block.id}
                                />
                            );
                        default:
                            throw new Error('Неправильный тип контента');
                    }
                })}
            </div>
            <Button className={styles.noteSaveBtn} onClick={onSave}>
                Сохранить заметку
            </Button>
        </>
    );
};

export default NoteEditMode;
