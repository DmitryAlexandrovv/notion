import Block from './block';
import ChangeNotePropsModal from '../../../../change-note-props-modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveActiveNote, loadPages } from '../../../../../store/actions';
import { Button } from 'antd';
import { CONTENT_TYPES } from '../../note-view-mode/constants';

import styles from './style.module.css';

const NoteControlElements = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false),
        note = useSelector((state) => state.activeNote),
        pages = useSelector((state) => state.pages),
        dispatch = useDispatch();

    const onSaveProps = (data) => {
        dispatch(
            saveActiveNote({
                ...note,
                ...data,
            })
        );

        //ToDo доделать после того, как будет готова БД
        // const updatedPages = pages.map((page) =>
        //     page.id === note.id
        //         ? {
        //               ...page,
        //               ...data,
        //           }
        //         : page
        // );
        //
        // //ToDo а так надо?
        // dispatch(loadPages(updatedPages));
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
            <ChangeNotePropsModal onSave={onSaveProps} modalIsOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
        </div>
    );
};

export default NoteControlElements;
