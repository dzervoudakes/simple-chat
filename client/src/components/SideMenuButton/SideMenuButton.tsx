import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import Button from '@src/components/Button';
import { useSideMenu } from '@src/hooks';
import { MOBILE_QUERY } from '@src/constants';
import { RouteParams } from '@src/types';

interface SideMenuProps {
  id: string;
  path: string;
  text: string;
}

const stylesFn = (): Styles => ({
  sideMenuButton: {
    maxWidth: '13rem', // 208px
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
  const { setIsSideMenuOpen } = useSideMenu();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { css, styles } = useStyles({ stylesFn });

  return (
    <Button
      variant="link"
      onClick={() => {
        history.push(`${path}/${id}`);
        setIsSideMenuOpen(false);
      }}
    >
      <div
        {...css(styles.sideMenuButton, isMobile && styles.sideMenuButtonMobile)}
        title={text}
      >
        {text} {id === conversationId && <>&raquo;</>}
      </div>
    </Button>
  );
};

export default SideMenuButton;
