import Sidebar from '../../sidebar';
import { Button } from 'antd';
import ChangeNotePropsModal from '../../change-note-props-modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewNote } from '../../../store/actions';
import Navbar from '../../navbar';
import { appendNewPage, getPage } from '../../../service/firebase';

import pageStyles from '../style.module.css';

const Home = () => {
    const [modalIsOpen, setIsOpen] = useState(false),
        user = useSelector((state) => state.user),
        dispatch = useDispatch();

    const onSave = (data) => {
        const key = appendNewPage(user.id, data).key;
        getPage(user.id, key).then((res) => {
            dispatch(
                createNewNote({
                    id: key,
                    data: {
                        title: data.title,
                        parentId: data.parentId ?? undefined,
                    },
                })
            );
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
                        defaultParentId={undefined}
                        defaultTitle=''
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
