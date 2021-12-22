import Sidebar from '../../components/sidebar';
import { Button } from 'antd';
import ChangeNotePropsModal from '../../components/change-note-props-modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewNote, setLoading } from '../../store/actions';
import Navbar from '../../components/navbar';
import firebaseService from '../../service/firebase';

import pageStyles from '../style.module.css';

const Home = () => {
    const [modalIsOpen, setIsOpen] = useState(false),
        user = useSelector((state) => state.user),
        dispatch = useDispatch();

    const onSave = (data) => {
        dispatch(setLoading(true));
        firebaseService
            .appendNewPage(user.id, {
                title: data.title,
                url: data.url,
                ...(data.parentId && { parentId: data.parentId }),
            })
            .then((data) => {
                dispatch(
                    createNewNote({
                        id: data.id,
                        data: {
                            title: data.title,
                            parentId: data.parentId ?? undefined,
                            url: data.url,
                        },
                    })
                );
            })
            .catch((error) => {
                console.error(error.message);
            })
            .finally(() => {
                dispatch(setLoading(false));
            });
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
