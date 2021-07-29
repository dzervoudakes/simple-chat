import React from 'react';
import { useMediaQuery } from 'react-responsive';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import sortBy from 'lodash/sortBy';
import SideMenuButton from '@src/components/SideMenuButton';
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
  const { user } = useAuth();
  const { channels, users } = useChat();
  const { isSideMenuOpen } = useSideMenu();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { css, styles } = useStyles({ stylesFn });

  return (
    <aside
      {...css(
        styles.sideMenu,
        isMobile && styles.sideMenuMobile,
        isMobile && isSideMenuOpen && styles.sideMenuMobileOpen
      )}
    >
      <Spacer pl="small" pt="small" pb="small">
        <Spacer pb="medium">
          <Skeleton height={20}>
            <Typography variant="blockHeader">Current User</Typography>
          </Skeleton>
          {user?.username && (
            <Spacer pt="xsmall">
              <Typography variant="disclaimerLight">{user.username}</Typography>
            </Spacer>
          )}
        </Spacer>
        <Spacer pb="medium">
          <Skeleton height={20}>
            <Typography variant="blockHeader">Channels</Typography>
          </Skeleton>
          {sortBy(channels, 'name').map((channel) => (
            <Spacer pt="xsmall" key={channel._id}>
              <SideMenuButton
                id={channel._id}
                path="/channels"
                text={`# ${channel.name}`}
              />
            </Spacer>
          ))}
        </Spacer>
        <Spacer pb="medium">
          <Skeleton height={20}>
            <Typography variant="blockHeader">Direct Messages</Typography>
          </Skeleton>
          {sortBy(users, 'username')
            ?.filter(({ username }) => username !== user?.username)
            .map((listUser) => (
              <Spacer pt="xsmall" key={listUser._id}>
                <SideMenuButton
                  id={listUser._id}
                  path="/direct"
                  text={listUser.username}
                />
              </Spacer>
            ))}
        </Spacer>
      </Spacer>
    </aside>
  );
};

export default SideMenu;
