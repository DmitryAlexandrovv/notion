import { createNoteTree, getNestedArray } from '../../helpers';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { isUrlPossible } from '../../helpers';
import firebaseService from '../../service/firebase';
import { VALIDATION_RESULT } from './constants';
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
        firebaseService
            .isUrlExists(user.id, url)
            .then((res) => {
                const validationTitleResult = checkTitleRules();
                const validationResult =
                    validationTitleResult.type === VALIDATION_RESULT.ERROR
                        ? validationTitleResult
                        : url === ''
                        ? validationTitleResult
                        : checkUrlRules(res);

                if (validationResult.type === VALIDATION_RESULT.SUCCESS) {
                    //ToDo показывать alert, что не сохранятся данные блоков
                    onSave({
                        title,
                        parentId,
                        url,
                    });
                    setIsOpen(false);
                } else {
                    alert(validationResult.value);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const checkTitleRules = () => {
        if (title.length < 6) {
            return {
                type: VALIDATION_RESULT.ERROR,
                value: 'Длина заголовка должна быть больше 5 символов',
            };
        } else {
            return {
                type: VALIDATION_RESULT.SUCCESS,
            };
        }
    };

    const checkUrlRules = (res) => {
        if (url.length < 5) {
            return {
                type: VALIDATION_RESULT.ERROR,
                value: 'Длина url должна быть больше 4 символов',
            };
        } else if (res) {
            return {
                type: VALIDATION_RESULT.ERROR,
                value: 'Этот url уже занят',
            };
        } else if (!isUrlPossible(url)) {
            return {
                type: VALIDATION_RESULT,
                value: 'Недопустимое значение url',
            };
        } else {
            return {
                type: VALIDATION_RESULT.SUCCESS,
            };
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
