import { createNoteTree, getNestedArray } from '../../helpers';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { isUrlPossible } from '../../helpers';
import firebaseService from '../../service/firebase';
import Modal from 'react-modal';
import { Button, Input, TreeSelect } from 'antd';

import styles from './style.module.css';

const ChangeNotePropsModal = ({ selectedNoteId, defaultParentId, defaultTitle, modalIsOpen, setIsOpen, onSave }) => {
    const [parentId, setParentId] = useState(defaultParentId),
        [title, setTitle] = useState(defaultTitle),
        [url, setUrl] = useState(''),
        pages = useSelector((state) => state.pages),
        user = useSelector((state) => state.user),
        formattedPages = getNestedArray(pages, undefined);

    const onNotePropsSave = () => {
        //ToDo показывать alert, что не сохранятся данные
        firebaseService
            .isUrlExists(user.id, url)
            .then((res) => {
                if (title.length < 6) {
                    alert('Длина заголовка должна быть больше 5 символов');
                } else if (url.length < 5) {
                    alert('Длина url должна быть больше 4 символов');
                } else if (res) {
                    alert('Этот url уже занят');
                } else if (!isUrlPossible(url)) {
                    alert('Недопустимое значение url');
                } else {
                    onSave({
                        title,
                        parentId,
                        url,
                    });
                    setIsOpen(false);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} contentLabel='Example Modal'>
            <h2>Введите свойства заметки</h2>
            <div className={styles.noteProps}>
                <div className={styles.noteProp}>
                    <Input placeholder='Заголовок' value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div className={styles.noteProp}>
                    <Input placeholder='URL' value={url} onChange={(event) => setUrl(event.target.value)} />
                </div>
                <div className={styles.noteProp}>
                    <TreeSelect value={parentId} onChange={(id) => setParentId(id)} className={styles.notePropSelect}>
                        {formattedPages.map((page) => {
                            return page.id !== selectedNoteId
                                ? createNoteTree(page, selectedNoteId, defaultParentId)
                                : null;
                        })}
                    </TreeSelect>
                </div>
            </div>
            <div className={styles.notePropsCtrlGroup}>
                <Button onClick={onNotePropsSave} className={styles.notePropsCtrlGroupItem}>
                    Сохранить
                </Button>
                <Button onClick={() => setIsOpen(false)} className={styles.notePropsCtrlGroupItem}>
                    Отмена
                </Button>
            </div>
        </Modal>
    );
};

export default ChangeNotePropsModal;
