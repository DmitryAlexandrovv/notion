import { useSelector } from 'react-redux';
import { Spin } from 'antd';

import styles from './style.module.css';

const Loader = () => {
    const loading = useSelector((state) => state.app.loading);

    return loading ? (
        <div className={styles.wrapper}>
            <Spin size={'large'} />
        </div>
    ) : null;
};

export default Loader;
