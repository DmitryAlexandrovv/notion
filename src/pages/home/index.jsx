import Sidebar from '../../components/sidebar';
import { Button } from 'antd';
import ChangeNotePropsModal from '../../components/change-note-props-modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../../components/navbar';
import { savePage } from '../../store/actions/notesActions';

import pageStyles from '../style.module.css';

const Home = () => {
    const [modalIsOpen, setIsOpen] = useState(false),
        dispatch = useDispatch();

    const onSave = (data) => {
        dispatch(savePage(data));
    };

    return (
        <div className={pageStyles.wrapper}>
            <Navbar />
            <div className={pageStyles.layout}>
                <Sidebar />
                <main className={pageStyles.main}>
                    <Button onClick={() => setIsOpen(true)}>Создать заметку</Button>
                    <ChangeNotePropsModal
                        noteId={null}
                        activeNoteData={{
                            parentId: undefined,
                            title: '',
                            url: '',
                        }}
                        onSave={onSave}
                        modalIsOpen={modalIsOpen}
                        setIsOpen={setIsOpen}
                    />
                </main>
            </div>
        </div>
    );
};

export default Home;
