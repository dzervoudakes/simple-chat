import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import Button from '@src/components/Button';
import { useChat, useSideMenu } from '@src/hooks';
import { MOBILE_QUERY } from '@src/constants';
import { RouteParams } from '@src/types';
import { Theme } from '@src/theme';

interface SideMenuProps {
  id: string;
  path: string;
  text: string;
}

const stylesFn = ({ color, fonts }: Theme): Styles => ({
  badge: {
    background: color.alert,
    borderRadius: '4rem',
    color: color.white,
    display: 'inline-block',
    fontFamily: fonts.body,
    fontSize: '75%',
    marginLeft: '0.5rem',
    padding: '0.125rem 0.5rem',
    textAlign: 'center',
    verticalAlign: 'top'
  },
  sideMenuButton: {
    maxWidth: '11.5rem', // 184px
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  sideMenuButtonMobile: {
    maxWidth: '100%'
  }
});

const SideMenuButton: React.FC<SideMenuProps> = ({ id, path, text }) => {
  const { conversationId } = useParams<RouteParams>();
  const history = useHistory();
  const { chat } = useChat();
  const { setIsSideMenuOpen } = useSideMenu();
  const [notifications, setNotifications] = useState(conversationId === id ? 0 : -1);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { css, styles } = useStyles({ stylesFn });

  const chatLength = chat[id]?.length;

  useEffect(() => {
    if (conversationId !== id) {
      setNotifications(notifications + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatLength]);

  return (
    <>
      <Button
        variant="link"
        onClick={() => {
          history.push(`${path}/${id}`);
          setIsSideMenuOpen(false);
          setNotifications(0);
        }}
      >
        <div
          {...css(styles.sideMenuButton, isMobile && styles.sideMenuButtonMobile)}
          title={text}
        >
          {text} {id === conversationId && <>&raquo;</>}
        </div>
      </Button>
      {notifications > 0 && <span {...css(styles.badge)}>{notifications}</span>}
    </>
  );
};

export default SideMenuButton;
