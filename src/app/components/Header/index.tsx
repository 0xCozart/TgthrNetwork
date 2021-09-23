import { IDXState } from 'app/redux/idx/idx';
import { authorizeIDX } from 'app/redux/idx/idxSlice';
import { RootState } from 'app/redux/rootReducer';
import { AppDispatch } from 'app/redux/store';
import { getIpfsImageSrc } from 'app/utils/ipfs/ipfsUtils';
import { Avatar, Button, Header as GrommetHeader, Nav } from 'grommet';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export namespace Header {}

interface AuthedHeaderProps {
  idx: IDXState;
  avatarURL: string;
}

const AuthedHeader = ({ idx, avatarURL }: AuthedHeaderProps) => (
  <>
    <Avatar src={avatarURL} />
    <Nav direction="row">
      <Button label="signedin" />
    </Nav>
  </>
);

interface UnauthedHeaderProps {
  handleOnClick: () => void;
}
const NonAuthedHeader = ({ handleOnClick }: UnauthedHeaderProps) => (
  <Nav direction="row" align="right">
    <Button onClick={handleOnClick} label="IDX Sign-In" />
  </Nav>
);

const Header = () => {
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const dispatch: AppDispatch = useDispatch();
  const idx: IDXState = useSelector((state: RootState) => state.idx);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (idx.isAuth && idx.basicProfile?.image?.original.src) {
        const url = await getIpfsImageSrc(idx.basicProfile.image.original.src);
        const avatarUrl = url ? url : '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80';
        setAvatarUrl(avatarUrl);
        history.push('/');
      }
      if (!idx.isAuth) {
        history.push('/signup');
      }

      return () => {
        setAvatarUrl('');
      };
    })();
  }, [idx.isAuth, idx.basicProfile]);

  const handleOnClick = () => {
    dispatch(authorizeIDX({ connect: true }));
  };

  return (
    <GrommetHeader pad="small" style={{ justifyContent: idx.isAuth ? 'space-between' : 'right' }}>
      {idx.isAuth ? (
        <AuthedHeader idx={idx} avatarURL={avatarUrl} />
      ) : (
        <NonAuthedHeader handleOnClick={handleOnClick} />
      )}
    </GrommetHeader>
  );
};

export default Header;
