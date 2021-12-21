import { createNoteTree, getNestedArray } from '../../helpers';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isUrlPossible } from '../../helpers';
import firebaseService from '../../service/firebase';
import { VALIDATION_RESULT } from './constants';
import Modal from 'react-modal';
import { Button, Input, TreeSelect } from 'antd';

import styles from './style.module.css';

const ChangeNotePropsModal = ({ selectedNoteId, activeNoteData, modalIsOpen, setIsOpen, onSave }) => {
    const [noteProps, setNoteProps] = useState({
            parentId: activeNoteData.parentId,
            title: activeNoteData.title,
            url: activeNoteData.url,
        }),
        pages = useSelector((state) => state.pages),
        user = useSelector((state) => state.user),
        formattedPages = getNestedArray(pages, undefined);

    useEffect(() => {
        setNoteProps({
            parentId: activeNoteData.parentId,
            title: activeNoteData.title,
            url: activeNoteData.url,
        });
    }, [activeNoteData]);

    const onNotePropsSave = () => {
        firebaseService
            .isUrlExists(user.id, noteProps.url)
            .then((res) => {
                const validationTitleResult = checkTitleRules();
                const validationResult =
                    validationTitleResult.type === VALIDATION_RESULT.ERROR
                        ? validationTitleResult
                        : noteProps.url === ''
                        ? validationTitleResult
                        : checkUrlRules(res);

                if (validationResult.type === VALIDATION_RESULT.SUCCESS) {
                    //ToDo показывать alert, что не сохранятся данные блоков
                    onSave({
                        title: noteProps.title,
                        parentId: noteProps.parentId,
                        url: noteProps.url,
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
        if (noteProps.title.length < 6) {
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
        if (noteProps.url.length < 5) {
            return {
                type: VALIDATION_RESULT.ERROR,
                value: 'Длина url должна быть больше 4 символов',
            };
        } else if (res) {
            return {
                type: VALIDATION_RESULT.ERROR,
                value: 'Этот url уже занят',
            };
        } else if (!isUrlPossible(noteProps.url)) {
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
                    <Input
                        placeholder='Заголовок'
                        value={noteProps.title}
                        onChange={(event) => setNoteProps({ ...noteProps, title: event.target.value })}
                    />
                </div>
                <div className={styles.noteProp}>
                    <Input
                        placeholder='URL'
                        value={noteProps.url}
                        onChange={(event) => setNoteProps({ ...noteProps, url: event.target.value })}
                    />
                </div>
                <div className={styles.noteProp}>
                    <TreeSelect
                        value={noteProps.parentId}
                        onChange={(id) =>
                            setNoteProps({
                                ...noteProps,
                                parentId: id,
                            })
                        }
                        className={styles.notePropSelect}
                    >
                        {formattedPages.map((page) => {
                            return page.id !== selectedNoteId
                                ? createNoteTree(page, selectedNoteId, activeNoteData.parentId)
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
