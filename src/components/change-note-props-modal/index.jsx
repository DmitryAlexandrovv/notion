import Modal from 'react-modal';
import { Button, Input, TreeSelect } from 'antd';
import { createNoteTree, getNestedArray } from '../../helpers';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './style.module.css';

const ChangeNotePropsModal = ({ modalIsOpen, setIsOpen, onSave }) => {
    const [parentId, setParentId] = useState(null),
        [title, setTitle] = useState(''),
        formattedPages = getNestedArray(
            useSelector((state) => state.pages),
            null
        );

    const onNotePropsSave = () => {
        if (title.length < 6) {
            alert('Длина заголовка должна быть больше 5 символов');
        } else {
            onSave({
                title,
                parentId,
            });
            setIsOpen(false);
        }
    };

    return (
        <Modal isOpen={modalIsOpen} onRequestClose={() => setIsOpen(false)} contentLabel='Example Modal'>
            <h2>Введите свойства заметки</h2>
            <div className={styles.noteProps}>
                <div className={styles.noteProp}>
                    <Input placeholder='Заголовок' value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div className={styles.noteProp}>
                    <TreeSelect value={parentId} onChange={(id) => setParentId(id)} className={styles.notePropSelect}>
                        {formattedPages.map((page) => {
                            return createNoteTree(page);
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
