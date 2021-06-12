import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import Button from '@src/components/Button';
import Spacer from '@src/components/Spacer';
import Typography from '@src/components/Typography';
import { useAuth, useChat, useSideMenu } from '@src/hooks';
import { MOBILE_QUERY } from '@src/constants';
import { Theme } from '@src/theme';

// @todo close side menu when selecting a list item

const stylesFn = ({ color }: Theme): Styles => ({
  sideMenu: {
    background: color.secondary,
    boxShadow: '1rem 0.625rem 1.25rem 0 rgba(89, 89, 89, 0.1)',
    height: 'calc(100vh - 3.125rem)', // 3.125rem === header height
    overflowY: 'scroll',
    transition: 'all 0.2s ease',
    width: '12.5rem' // 200px
  },
  sideMenuListItem: {
    maxWidth: '8rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  sideMenuListItemMobile: {
    maxWidth: '100%'
  },
  sideMenuMobile: {
    boxShadow: 'none',
    marginLeft: '-100vw',
    position: 'absolute',
    width: '100vw',
    zIndex: 1
  },
  sideMenuMobileOpen: {
    marginLeft: '0'
  }
});

const SideMenu: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { channels, users } = useChat();
  const { isSideMenuOpen } = useSideMenu();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { css, styles } = useStyles({ stylesFn });

  return (
    <div
      {...css(
        styles.sideMenu,
        isMobile && styles.sideMenuMobile,
        isMobile && isSideMenuOpen && styles.sideMenuMobileOpen
      )}
    >
      <Spacer padding="large">
        <Spacer pb="medium">
          <Typography variant="h3">Current user</Typography>
          {user?.username && (
            <Spacer pt="tiny">
              <Typography variant="disclaimer">{user.username}</Typography>
            </Spacer>
          )}
        </Spacer>
        <Spacer pb="medium">
          <Typography variant="h3">Channels</Typography>
          {channels?.map(({ name, _id }) => (
            <Spacer pb="small" key={_id}>
              <Button variant="link" onClick={() => history.push(`/channels/${_id}`)}>
                <div
                  {...css(
                    styles.sideMenuListItem,
                    isMobile && styles.sideMenuListItemMobile
                  )}
                  title={name}
                >
                  {name}
                </div>
              </Button>
            </Spacer>
          ))}
        </Spacer>
        <Spacer pb="medium">
          <Typography variant="h3">Direct messages</Typography>
          {users
            ?.filter(({ username }) => username !== user?.username)
            ?.map(({ username, _id }) => (
              <Spacer pb="small" key={_id}>
                <Button variant="link" onClick={() => history.push(`/direct/${_id}`)}>
                  <div
                    {...css(
                      styles.sideMenuListItem,
                      isMobile && styles.sideMenuListItemMobile
                    )}
                    title={username}
                  >
                    {username}
                  </div>
                </Button>
              </Spacer>
            ))}
        </Spacer>
      </Spacer>
    </div>
  );
};

export default SideMenu;
