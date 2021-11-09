import { useMediaQuery } from 'react-responsive';
import { Styles } from 'react-with-styles';
import useStyles from 'react-with-styles/lib/hooks/useStyles';

import Spacer from '@src/components/Spacer';
import Typography from '@src/components/Typography';
import { MOBILE_QUERY } from '@src/constants';
import { useAuth, useSideMenu } from '@src/hooks';
import { ChatIcon, MobileMenuIcon } from '@src/icons';
import { Theme } from '@src/theme';

const stylesFn = ({ color, spacing }: Theme): Styles => ({
  header: {
    alignItems: 'center',
    background: color.white,
    boxShadow: '0 2px 2px 0 rgba(89, 89, 89, 0.1)',
    display: 'flex',
    height: '3.125rem',
    paddingLeft: spacing.small,
    paddingRight: spacing.small,
    position: 'relative',
    zIndex: 1
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
    left: spacing.small,
    transition: 'background 0.2s ease',
    ':hover': {
      background: color.blueAccent
    },
    ':focus': {
      boxShadow: `0 0 0 0.2rem ${color.grayFocus}`,
      outline: 'none'
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
      {isMobile && user && (
        <button
          aria-label="toggle side menu"
          data-testid="mobileMenuIcon"
          type="button"
          onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
          {...css(styles.mobileMenuButton)}
        >
          <MobileMenuIcon />
        </button>
      )}
      <Spacer pr="tiny">
        <ChatIcon testid="chatIcon" />
      </Spacer>
      <Typography variant="h1">Simple Chat</Typography>
    </header>
  );
};

export default Header;
