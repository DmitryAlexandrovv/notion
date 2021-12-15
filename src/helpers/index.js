import { CONTENT_TYPES } from '../components/note/note-view-mode/constants';
import { v4 as uuid_v4 } from 'uuid';
import { convertToRaw, EditorState } from 'draft-js';

export const getNestedArray = (pages, parent) => {
    const result = [];
    for (const page of pages) {
        if (page.parent === parent) {
            const children = getNestedArray(pages, page.id);

            if (children.length) {
                page.nested = children;
            }

            result.push(page);
        }
    }
    return result;
};

export const generateRandomString = (len) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < len; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

export const getPreview = (id) => {
    return id ? `http://i1.ytimg.com/vi/${id}/maxresdefault.jpg` : generateRandomString(5);
};

export const getVideoId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
};

export const getDefaultBlockData = (type) => {
    let newBlockData = {
        type,
        id: uuid_v4(),
    };

    switch (newBlockData.type) {
        case CONTENT_TYPES.TEXT:
            return {
                ...newBlockData,
                data: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
            };
        case CONTENT_TYPES.IMAGE:
            return {
                ...newBlockData,
                data: {
                    url: '',
                    width: '',
                },
            };
        case CONTENT_TYPES.VIDEO:
            return {
                ...newBlockData,
                data: {
                    url: '',
                    title: '',
                },
            };
        case CONTENT_TYPES.LINK_TO_NOTE:
            return {
                ...newBlockData,
                data: {
                    id: '',
                    title: '',
                },
            };
        default:
            throw new Error('Неверный тип');
    }
};
