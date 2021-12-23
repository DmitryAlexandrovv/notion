import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { savePageProps } from '../../../../store/actions/notesActions';
import { CONTENT_TYPES } from '../../view-mode/constants';
import Block from './block';
import ChangeNotePropsModal from '../../../../components/change-note-props-modal';

import styles from './style.module.css';

const NoteControlElements = ({ pageId, activeNote }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false),
        dispatch = useDispatch();

    const onSaveProps = (data) => {
        dispatch(savePageProps(activeNote, data));
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
