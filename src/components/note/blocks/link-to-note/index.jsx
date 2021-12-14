import { Button, TreeSelect } from 'antd';
import { useSelector } from 'react-redux';
import CreateBlock from '../hoc/createBlock';
import { getNestedArray } from '../../../../helpers';

import blockStyles from '../style.module.css';
import styles from './style.module.css';
import { CONTENT_TYPES } from '../../note-view-mode/constants';

const TreeNode = TreeSelect.TreeNode;

const LinkToNoteBlock = (props) => {
    const { isEditMode, onSave, onCancel, data, setData } = props,
        formattedPages = getNestedArray(
            useSelector((state) => state.pages),
            null
        );

    const redirect = () => {
        //ToDo редирект на другую заметку
    };

    const createTree = (node) => {
        return (
            <TreeNode value={node.id} title={node.title} key={node.id}>
                {node.nested
                    ? node.nested.map((nodeChild) => {
                          return createTree(nodeChild);
                      })
                    : ''}
            </TreeNode>
        );
    };

    return (
        <div className={blockStyles.blockContent}>
            {isEditMode ? (
                <>
                    <TreeSelect
                        value={data.id}
                        onChange={(id, title) => setData({ id, title })}
                        className={styles.linkBlockElement}
                    >
                        {formattedPages.map((page) => {
                            return createTree(page);
                        })}
                    </TreeSelect>
                    <div className={blockStyles.blockActions}>
                        <Button
                            className={blockStyles.blockActionsBtn}
                            onClick={() => onSave(CONTENT_TYPES.LINK_TO_NOTE, data)}
                        >
                            Сохранить блок
                        </Button>
                        <Button className={blockStyles.blockActionsBtn} onClick={onCancel}>
                            Отмена
                        </Button>
                    </div>
                </>
            ) : (
                <Button onClick={redirect} className={styles.linkBlockElement}>
                    {data.title}
                </Button>
            )}
        </div>
    );
};

export default CreateBlock(LinkToNoteBlock);
