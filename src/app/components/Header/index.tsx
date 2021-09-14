import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Header as GrommetHeader, Nav } from 'grommet';
import { getIpfsImageSrc } from 'app/utils/ipfs/ipfsUtils';
import { RootState } from 'app/redux/rootReducer';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from 'app/redux/store';
import idxSlice, { authorizeIDX } from 'app/redux/idx/idxSlice';
import { IDXState } from 'app/redux/idx/idx';

export namespace Header {}

interface AuthedHeaderProps {
  idx: IDXState;
  avatarURL: string;
}

const AuthedHeader = ({ idx, avatarURL }: AuthedHeaderProps) => (
  <>
    <Avatar src={avatarURL} size="large" />
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
  const [avatar, setAvatar] = React.useState('');
  const dispatch: AppDispatch = useDispatch();
  const idx: IDXState = useSelector((state: RootState) => state.idx);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (idx.isAuth && idx.basicProfile?.image?.original.src) {
        const url = await getIpfsImageSrc(idx.basicProfile.image.original.src);
        const avatarUrl = url ? url : '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
        console.log(url, avatarUrl);
        setAvatar(avatarUrl);
        history.push('/');
      }
      if (!idx.isAuth) {
        history.push('/signup');
      }

      return () => {
        setAvatar('');
      };
    })();
  }, [idx.isAuth, idx.basicProfile]);

  const handleOnClick = () => {
    dispatch(authorizeIDX({ connect: true }));
  };

  return (
    <GrommetHeader pad="small">
      {idx.isAuth ? <AuthedHeader idx={idx} avatarURL={avatar} /> : <NonAuthedHeader handleOnClick={handleOnClick} />}
    </GrommetHeader>
  );
};

export default Header;
