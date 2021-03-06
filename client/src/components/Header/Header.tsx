import React from 'react';
import { Styles } from 'react-with-styles';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { useMediaQuery } from 'react-responsive';
import Typography from '@src/components/Typography';
import { ChatIcon, MobileMenuIcon } from '@src/icons';
import { useAuth, useSideMenu } from '@src/hooks';
import { Theme } from '@src/theme';
import { MOBILE_QUERY } from '@src/constants';

// @todo make sure inline styling for the chat icon and h1 looks right

const stylesFn = ({ color, spacing }: Theme): Styles => ({
  header: {
    alignItems: 'center',
    background: color.white,
    boxShadow: '0 0.625rem 1.25rem 0 rgba(89, 89, 89, 0.1)',
    display: 'flex',
    height: '3.125rem',
    padding: '0 2rem'
  },
  headerMobile: {
    justifyContent: 'center'
  },
  mobileMenuButton: {
    background: 'none',
    border: 'none',
    borderRadius: spacing.tiny,
    cursor: 'pointer',
    outline: 'none',
    padding: spacing.tiny,
    position: 'absolute',
    left: spacing.large,
    transition: 'background 0.2s ease',
    ':hover': {
      background: color.tealAccent
    },
    ':focus': {
      boxShadow: `0 0 0 0.2rem ${color.grayFocus}`
    }
  }
});

const Header: React.FC = () => {
  const { user } = useAuth();
  const { isSideMenuOpen, setIsSideMenuOpen } = useSideMenu();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { css, styles } = useStyles({ stylesFn });

  return (
    <header {...css(styles.header, isMobile && styles.headerMobile)}>
      {isMobile && user.username && (
        <button
          type="button"
          data-testid="mobileMenuIcon"
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          {...css(styles.mobileMenuButton)}
        >
          <MobileMenuIcon />
        </button>
      )}
      <ChatIcon testid="chatIcon" />
      <Typography variant="h1">Simple Chat</Typography>
    </header>
  );
};

export default Header;
