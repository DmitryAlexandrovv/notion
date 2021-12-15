import { auth } from '../../service/firebase';
import { setUser } from '../../store/actions';

import { Button } from 'antd';
import { useDispatch } from 'react-redux';

const logOut = () => {
  auth.signOut()
      .then(() => {
          console.log('logged out');
          onSuccess;
      })
      .catch((error) => {
          console.log(error.message);
      });
};

const Logout = () => {
    const dispatch = useDispatch();

    const onSuccess = () => {
        dispatch(setUser(null));
    };

    return (
        <div>
            <Button onClick={() => logOut(onSuccess)}>Log out</Button>
        </div>
    );
};

export default Logout;
