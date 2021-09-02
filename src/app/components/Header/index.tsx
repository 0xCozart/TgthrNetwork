import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/redux/rootReducer';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from 'app/redux/store';
import idxSlice, { authorizeIDX } from 'app/redux/idx/idxSlice';
import { Avatar, Button, Header as GrommetHeader, Nav } from 'grommet';
import { Redirect } from 'react-router';

export namespace Header {}

interface AuthedHeaderProps {
  idx: RootState['idx'];
}

const AuthedHeader = ({ idx }: AuthedHeaderProps) => (
  <>
    <Avatar
      src={
        idx.basicProfile?.image
          ? idx.basicProfile.image
          : '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80'
      }
    />
    <Nav direction="row">
      <Button label="signedin" />
    </Nav>
  </>
);

interface UnauthedHeaderProps {
  handleOnClick: () => void;
}
const NonAuthedHeader = ({ handleOnClick }: UnauthedHeaderProps) => (
  <Nav direction="row">
    <Button onClick={handleOnClick} label="IDX Sign-In" />
  </Nav>
);

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const idx = useSelector((state: RootState) => state.idx);
  const history = useHistory();
  const handleOnClick = () => {
    dispatch(authorizeIDX({ connect: true }));
  };

  // if (idx.isAuthorized) {
  //   return <Redirect to={'/signup'} />;
  // }

  return (
    <GrommetHeader pad="small">
      {
        idx.isAuth ? <AuthedHeader idx={idx} /> : <NonAuthedHeader handleOnClick={handleOnClick} />
        // if (idx.isAuthed && idx.basicProfile === null) {
        //   return <Redirect to="/signup" />;
        // }
      }
    </GrommetHeader>
  );
};

export default Header;
