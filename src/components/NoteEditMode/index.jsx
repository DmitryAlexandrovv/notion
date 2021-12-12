import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { saveActiveNote } from '../../store/actions';
import { CONTENT_TYPES } from '../NoteViewMode/constants';
import { Button } from 'antd';
import TextBlock from '../NoteViewMode/Blocks/Text';
import ImageBlock from '../NoteViewMode/Blocks/Image';
import VideoBlock from '../NoteViewMode/Blocks/YouTubeVideo';
import LinkToNoteBlock from '../NoteViewMode/Blocks/LinkToNote';

import styles from './style.module.css';

const NoteEditMode = (props) => {
    const dispatch = useDispatch(),
        [note, onUpdateNote] = useState(props.activeNote);

    useEffect(() => {
        onUpdateNote(props.activeNote);
    }, [props.activeNote]);

    const onBlockContentChanged = (type, id, data) => {
        const updatedNote = {
            ...note,
            blocks: note.blocks.map((block) => {
                if (block.id !== id) {
                    return block;
                } else {
                    switch (type) {
                        case CONTENT_TYPES.TEXT:
                            return {
                                ...block,
                                data,
                            };
                        case CONTENT_TYPES.IMAGE:
                            console.log(data);
                            return {
                                ...block,
                                data: {
                                    url: data,
                                },
                            };
                        default:
                            throw new Error('Неизвестный тип контента');
                    }
                }
            }),
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
            <div className={styles.note}>
                <h3 className={styles.noteTitle}>{note.title}</h3>
                {note.blocks.map((block) => {
                    //ToDo edit mode for image, video, link_to_note
                    switch (block.type) {
                        case CONTENT_TYPES.TEXT:
                            return <TextBlock block={block} onChange={onBlockContentChanged} key={block.id} />;
                        case CONTENT_TYPES.IMAGE:
                            return (
                                <ImageBlock
                                    width={block.data.width}
                                    onChange={onBlockContentChanged}
                                    block={block}
                                    key={block.id}
                                />
                            );
                        case CONTENT_TYPES.VIDEO:
                            return <VideoBlock videoId={block.data.id} key={block.id} />;
                        case CONTENT_TYPES.LINK_TO_NOTE:
                            return <LinkToNoteBlock id={block.data.id} title={block.data.title} key={block.id} />;
                        default:
                            throw new Error('Неправильный тип контента');
                    }
                })}
            </div>
            <Button onClick={onSave}>Сохранить заметку</Button>
        </>
    );
};

export default NoteEditMode;
