import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, updatePage as updateStorePage } from '../../../../store/actions';
import firebaseService from '../../../../service/firebase';
import { useNavigate } from 'react-router-dom';
import { CONTENT_TYPES } from '../../view-mode/constants';
import Block from './block';
import ChangeNotePropsModal from '../../../../components/change-note-props-modal';
import { Button } from 'antd';

import styles from './style.module.css';

const NoteControlElements = ({ pageId, activeNote, isNoteBlocksEdited, setActiveNote }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false),
        user = useSelector((state) => state.user),
        dispatch = useDispatch(),
        navigate = useNavigate();

    const onSaveProps = (data) => {
        dispatch(setLoading(true));
        firebaseService
            .updatePage(user.id, pageId, {
                title: data.title,
                url: data.url,
                ...(data.parentId && { parentId: data.parentId }),
            })
            .then(() => {
                dispatch(
                    updateStorePage({
                        id: pageId,
                        data,
                    })
                );

                if (data.url) {
                    navigate(`/note/${data.url}`, { replace: true });
                } else {
                    navigate(`/note/${pageId}`, { replace: true });
                }
            })
            .catch((error) => {
                console.error(error.message);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };

    return (
        <div className={styles.noteControlElements}>
            <div className={styles.wrapper}>
                <div className={styles.noteControlElementsBlock}>
                    <h3 className={styles.noteControlElementsTitle}>Перетащите блок</h3>
                    <Block type={CONTENT_TYPES.TEXT} text='Текст' />
                    <Block type={CONTENT_TYPES.IMAGE} text='Картинка' />
                    <Block type={CONTENT_TYPES.VIDEO} text='Видео YouTube' />
                    <Block type={CONTENT_TYPES.LINK_TO_NOTE} text='Ссылка на другую заметку' />
                </div>
                <div className={styles.noteControlElementsBlock}>
                    <Button className={styles.notePropsEditBtn} onClick={() => setModalIsOpen(true)}>
                        Перейти к редактированию свойств заметки
                    </Button>
                </div>
            </div>
            <ChangeNotePropsModal
                isNoteBlocksEdited={isNoteBlocksEdited}
                selectedNoteId={pageId}
                activeNoteData={{
                    parentId: activeNote.parentId,
                    title: activeNote.title,
                    url: activeNote.url,
                }}
                onSave={onSaveProps}
                modalIsOpen={modalIsOpen}
                setIsOpen={setModalIsOpen}
            />
        </div>
    );
};

export default NoteControlElements;
