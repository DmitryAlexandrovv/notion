import Sidebar from '../../sidebar';
import { Button } from 'antd';
import ChangeNotePropsModal from '../../change-note-props-modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewNote } from '../../../store/actions';
import { getDefaultNoteData } from '../../../helpers';

import pageStyles from '../style.module.css';

const Home = () => {
    const [modalIsOpen, setIsOpen] = useState(false),
        dispatch = useDispatch();

    const onSave = (data) => {
        dispatch(createNewNote(getDefaultNoteData(data)));
    };

    return (
        <div className={pageStyles.layout}>
            <Sidebar />
            <main className={pageStyles.main}>
                <Button onClick={() => setIsOpen(true)}>Создать заметку</Button>
                <ChangeNotePropsModal onSave={onSave} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
            </main>
        </div>
    );
};

export default Home;
