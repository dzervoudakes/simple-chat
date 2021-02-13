import React from 'react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Theme } from '@src/types';

interface MobileMenuIconProps {
  testid?: string;
}

const stylesFn = ({ spacing }: Theme): Styles => ({
  mobileMenuIcon: {
    height: spacing.medium
  }
});

export const MobileMenuIcon: React.FC<MobileMenuIconProps> = ({ testid }) => {
  const { css, styles } = useStyles({ stylesFn });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="#063347"
      data-testid={testid}
      {...css(styles.mobileMenuIcon)}
    >
      <path d="M492 236H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h472c11.046 0 20-8.954 20-20s-8.954-20-20-20zM492 76H20C8.954 76 0 84.954 0 96s8.954 20 20 20h472c11.046 0 20-8.954 20-20s-8.954-20-20-20zM492 396H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h472c11.046 0 20-8.954 20-20s-8.954-20-20-20z" />
    </svg>
  );
};

export default MobileMenuIcon;
