import { CONTENT_TYPES } from '../components/pages/note/note-view-mode/constants';
import { v4 as uuid_v4 } from 'uuid';
import { convertToRaw, EditorState } from 'draft-js';
import { TreeSelect } from 'antd';

const TreeNode = TreeSelect.TreeNode;

export const getNestedArray = (pages, parent) => {
    const result = [];
    Object.keys(pages).forEach((key) => {
        const page = {
            title: pages[key].title,
            parentId: pages[key].parentId,
            id: key,
        };
        if (page.parentId === parent) {
            const children = getNestedArray(pages, key);
            if (children.length) {
                page.nested = children;
            }

            result.push(page);
        }
    });
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

export const getDefaultNoteData = ({ title, parentId }) => {
    return {
        title,
        id: uuid_v4(),
        parentId,
    };
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

export const createNoteTree = (node, selectedNoteId, parentId) => {
    return (
        <TreeNode value={node.id} title={node.title} key={node.id}>
            {node.nested && node.id !== parentId && node.id !== selectedNoteId && node.nested.length > 0
                ? node.nested.map((nodeChild) => {
                      return nodeChild.id !== selectedNoteId
                          ? createNoteTree(nodeChild, selectedNoteId, node.id)
                          : null;
                  })
                : ''}
        </TreeNode>
    );
};

export const getUpdatedBlocks = (blocks, prevBlockData, newBlockData) => {
    if (prevBlockData.index === blocks.length - 1) {
        const prevBlockOffset = document.getElementById(prevBlockData.id).getBoundingClientRect();
        if (newBlockData.offset.y > prevBlockOffset.y) {
            return [...blocks, newBlockData.data];
        } else {
            return [...blocks.slice(0, blocks.length - 1), newBlockData.data, blocks[blocks.length - 1]];
        }
    } else {
        return [...blocks.slice(0, prevBlockData.index), newBlockData.data, ...blocks.slice(prevBlockData.index)];
    }
};
