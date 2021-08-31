import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/redux/rootReducer';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from 'app/redux/store';
import idxSlice, { authorizeIDX } from 'app/redux/idx/idxSlice';
import { Avatar, Button, Header as GrommetHeader, Nav } from 'grommet';

export namespace Header {}

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const idx = useSelector((state: RootState) => state.idx);
  const history = useHistory();
  const handleOnClick = () => {
    dispatch(authorizeIDX({ connect: true }));
  };

  return (
    <GrommetHeader>
      {idx.isAuthorized ? (
        <>
          <Avatar src={idx.basicProfile.image ? idx.basicProfile.image : ''} />
          <Nav direction="row">
            <Button />
          </Nav>
        </>
      ) : (
        <>
          <Nav direction="row">
            <Button onClick={handleOnClick} label="IDX Sign-In" />
          </Nav>
        </>
      )}
    </GrommetHeader>
  );
};

export default Header;
