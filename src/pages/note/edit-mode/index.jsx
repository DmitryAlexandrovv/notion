import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { canDragNote } from '../../../store/actions';
import { CONTENT_TYPES } from '../view-mode/constants';
import { Button } from 'antd';
import TextBlock from '../blocks/text';
import ImageBlock from '../blocks/image';
import VideoBlock from '../blocks/youtube-video';
import LinkToNoteBlock from '../blocks/link-to-note';
import HiddenBlock from '../blocks/hidden-block';
import { getDefaultBlockData, getUpdatedBlocks } from '../../../helpers';
import firebaseService from '../../../service/firebase';

import noteStyles from '../view-mode/style.module.css';
import styles from './style.module.css';

const NoteEditMode = (props) => {
    const dispatch = useDispatch(),
        [note, onUpdateNote] = useState(props.activeNote),
        [addedBlocksIds, setAddedBlocksIds] = useState([]),
        user = useSelector((state) => state.user),
        isDraggingActive = useSelector((state) => state.isDraggingActive);

    useEffect(() => {
        onUpdateNote(props.activeNote);
    }, [props.activeNote]);

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
        firebaseService
            .updateNoteBlocks(user.id, props.pageId, note.blocks)
            .then(() => {
                props.setactiveNote({
                    ...props.activeNote,
                    blocks: [...note.blocks],
                });
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    const addBlock = (prevBlockId, newBlock, newBlockOffset) => {
        let newBlockData = getDefaultBlockData(newBlock.type);

        const prevBlockIndex = note.blocks.map((block) => block.id).indexOf(prevBlockId);

        let updatedNote = {
            ...note,
            blocks: getUpdatedBlocks(
                note.blocks,
                {
                    index: prevBlockIndex,
                    id: prevBlockId,
                },
                {
                    offset: newBlockOffset,
                    data: newBlockData,
                }
            ),
        };

        onUpdateNote(updatedNote);
        dispatch(canDragNote(false));
        setAddedBlocksIds([...addedBlocksIds, newBlockData.id]);
    };

    const addHiddenBlock = (newBlock) => {
        let newBlockData = getDefaultBlockData(newBlock.type);

        const updatedNote = {
            ...note,
            blocks: [newBlockData],
        };

        onUpdateNote(updatedNote);
        dispatch(canDragNote(false));
        setAddedBlocksIds([...addedBlocksIds, newBlockData.id]);
    };

    return (
        <>
            <h3 className={noteStyles.noteTitle}>{note.title}</h3>
            <div className={`${noteStyles.note} ${isDraggingActive ? noteStyles.noteWithDraggingBorder : ''}`}>
                {note.blocks.map((block) => {
                    switch (block.type) {
                        case CONTENT_TYPES.TEXT:
                            return (
                                <TextBlock
                                    deleteBlock={deleteBlock}
                                    block={block}
                                    onChange={onBlockContentChanged}
                                    key={block.id}
                                    addBlock={addBlock}
                                    addedBlocksIds={addedBlocksIds}
                                    setAddedBlocksIds={setAddedBlocksIds}
                                    activeMode={props.activeMode}
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
                                    addBlock={addBlock}
                                    addedBlocksIds={addedBlocksIds}
                                    setAddedBlocksIds={setAddedBlocksIds}
                                    activeMode={props.activeMode}
                                />
                            );
                        case CONTENT_TYPES.VIDEO:
                            return (
                                <VideoBlock
                                    deleteBlock={deleteBlock}
                                    onChange={onBlockContentChanged}
                                    block={block}
                                    key={block.id}
                                    addBlock={addBlock}
                                    addedBlocksIds={addedBlocksIds}
                                    setAddedBlocksIds={setAddedBlocksIds}
                                    activeMode={props.activeMode}
                                />
                            );
                        case CONTENT_TYPES.LINK_TO_NOTE:
                            return (
                                <LinkToNoteBlock
                                    deleteBlock={deleteBlock}
                                    block={block}
                                    onChange={onBlockContentChanged}
                                    key={block.id}
                                    addBlock={addBlock}
                                    addedBlocksIds={addedBlocksIds}
                                    setAddedBlocksIds={setAddedBlocksIds}
                                    activeMode={props.activeMode}
                                />
                            );
                        default:
                            throw new Error('Неправильный тип контента');
                    }
                })}
                {note.blocks.length === 0 && <HiddenBlock addHiddenBlock={addHiddenBlock} />}
            </div>
            <Button className={styles.noteSaveBtn} onClick={onSave}>
                Сохранить заметку
            </Button>
        </>
    );
};

export default NoteEditMode;
