import React from 'react';
import { useField } from 'formik';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import { Theme } from '@src/types';

interface TextInputProps {
  name: string;
  placeholder: string;
}

const stylesFn = ({ color, fonts, spacing }: Theme): Styles => ({
  textInput: {
    border: `0.0625rem solid ${color.grayLightest}`,
    borderRadius: spacing.tiny,
    boxShadow: 'inset 0 0 0.125rem rgba(0, 0, 0, 0.2)',
    color: color.grayDark,
    fontFamily: fonts.body,
    fontSize: '0.75rem',
    outline: 'none',
    padding: spacing.xsmall,
    transition: 'all 0.2s ease',
    width: '100%',
    '::placeholder': {
      color: color.grayLight
    },
    ':focus': {
      borderColor: color.tertiary
    }
  }
});

const TextInput: React.FC<TextInputProps> = ({ name, placeholder }) => {
  const [field] = useField(name);
  const { css, styles } = useStyles({ stylesFn });

  return (
    <input
      type="text"
      name={name}
      onChange={field.onChange}
      onBlur={field.onBlur}
      placeholder={placeholder}
      value={field.value || ''}
      {...css(styles.textInput)}
    />
  );
};

export default TextInput;
