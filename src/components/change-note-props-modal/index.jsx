import { createNoteTree, getNestedArray, showConfirmModal, showAlertModal } from '../../helpers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUrlPossible } from '../../helpers';
import firebaseService from '../../service/firebase';
import { VALIDATION_RESULT } from './constants';
import Modal from 'react-modal';
import { Button, Input, TreeSelect } from 'antd';

import styles from './style.module.css';
import { setLoading } from '../../store/actions';

const ChangeNotePropsModal = ({
    selectedNoteId,
    activeNoteData,
    modalIsOpen,
    setIsOpen,
    onSave,
    isNoteBlocksEdited,
}) => {
    const [noteProps, setNoteProps] = useState({
            parentId: activeNoteData.parentId,
            title: activeNoteData.title,
            url: activeNoteData.url,
        }),
        pages = useSelector((state) => state.pages),
        user = useSelector((state) => state.user),
        formattedPages = getNestedArray(pages, undefined),
        dispatch = useDispatch();

    useEffect(() => {
        setNoteProps({
            parentId: activeNoteData.parentId,
            title: activeNoteData.title,
            url: activeNoteData.url,
        });
    }, [activeNoteData]);

    const tryNotePropsSave = () => {
        if (JSON.stringify(noteProps) === JSON.stringify(activeNoteData)) {
            setIsOpen(false);
            return;
        }

        if (isNoteBlocksEdited) {
            showConfirmModal({
                title: 'Подтвердите действие',
                message: 'Изменения в блоках заметки не сохранятся, продолжить?',
                onSuccess: saveNoteProps,
            });
        } else {
            saveNoteProps();
        }
    };

    const saveNoteProps = () => {
        dispatch(setLoading(true));
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
                    onSave({
                        title: noteProps.title,
                        parentId: noteProps.parentId,
                        url: noteProps.url,
                    });
                    setIsOpen(false);
                } else {
                    showAlertModal({
                        title: 'Подтвердите действие',
                        message: validationResult.value,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
    };

    const checkTitleRules = () => {
        if (noteProps.title === activeNoteData.title) {
            return {
                type: VALIDATION_RESULT.SUCCESS,
            };
        } else if (noteProps.title.length < 6) {
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
        if (noteProps.url === activeNoteData.url) {
            return {
                type: VALIDATION_RESULT.SUCCESS,
            };
        } else if (noteProps.url.length < 5) {
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
                <Button onClick={tryNotePropsSave} className={styles.notePropsCtrlGroupItem}>
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
