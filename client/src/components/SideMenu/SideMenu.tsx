import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import sortBy from 'lodash/sortBy';
import Button from '@src/components/Button';
import Spacer from '@src/components/Spacer';
import Typography from '@src/components/Typography';
import Skeleton from '@src/components/Skeleton';
import { useAuth, useChat, useSideMenu } from '@src/hooks';
import { MOBILE_QUERY } from '@src/constants';
import { Theme } from '@src/theme';

const stylesFn = ({ color }: Theme): Styles => ({
  sideMenu: {
    background: color.secondary,
    boxShadow: '1rem 0.625rem 1.25rem 0 rgba(89, 89, 89, 0.1)',
    flexShrink: 0,
    height: 'calc(100vh - 3.125rem)', // 3.125rem === header height
    overflowY: 'scroll',
    width: '15rem' // 240px
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
    transition: 'all 0.2s ease',
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
  const { isSideMenuOpen, setIsSideMenuOpen } = useSideMenu();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { css, styles } = useStyles({ stylesFn });

  const renderLinkButton = (url: string, text: string): JSX.Element => (
    <Button
      variant="link"
      onClick={() => {
        history.push(url);
        setIsSideMenuOpen(false);
      }}
    >
      <div
        {...css(styles.sideMenuListItem, isMobile && styles.sideMenuListItemMobile)}
        title={text}
      >
        {text}
      </div>
    </Button>
  );

  return (
    <div
      {...css(
        styles.sideMenu,
        isMobile && styles.sideMenuMobile,
        isMobile && isSideMenuOpen && styles.sideMenuMobileOpen
      )}
    >
      <Spacer padding="small">
        <Spacer pb="medium">
          <Skeleton height={20}>
            <Typography variant="h3">Current user</Typography>
          </Skeleton>
          {user?.username && (
            <Spacer pt="xsmall">
              <Typography variant="disclaimer">{user.username}</Typography>
            </Spacer>
          )}
        </Spacer>
        <Spacer pb="medium">
          <Skeleton height={20}>
            <Typography variant="h3">Channels</Typography>
          </Skeleton>
          {sortBy(channels, 'name').map((channel) => (
            <Spacer pt="xsmall" key={channel._id}>
              {renderLinkButton(`/channels/${channel._id}`, channel.name)}
            </Spacer>
          ))}
        </Spacer>
        <Spacer pb="medium">
          <Skeleton height={20}>
            <Typography variant="h3">Direct messages</Typography>
          </Skeleton>
          {sortBy(users, 'username')
            ?.filter((listUser) => listUser.username !== user?.username)
            .map((listUser) => (
              <Spacer pt="xsmall" key={listUser._id}>
                {renderLinkButton(`/direct/${listUser._id}`, listUser.username)}
              </Spacer>
            ))}
        </Spacer>
      </Spacer>
    </div>
  );
};

export default SideMenu;
