import React from 'react';
import { useField, useFormikContext } from 'formik';
import { IEmojiData } from 'emoji-picker-react';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import { Styles } from 'react-with-styles';
import EmojiButton from '@src/components/EmojiButton';
import Spacer from '@src/components/Spacer';
import { Theme } from '@src/theme';

interface TextInputProps {
  emojis?: boolean;
  name: string;
  placeholder: string;
  type?: 'text' | 'password';
}

const stylesFn = ({ color, fonts, spacing }: Theme): Styles => ({
  textInput: {
    border: `0.0625rem solid ${color.grayLightest}`,
    borderRadius: spacing.medium,
    boxShadow: 'inset 0 0 0.0625rem rgba(0, 0, 0, 0.2)',
    boxSizing: 'border-box',
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
  },
  error: {
    border: `0.0625rem solid ${color.error}`,
    ':focus': {
      border: `0.0625rem solid ${color.error}`
    }
  }
});

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const [field, meta] = useField(props.name);
  const { setFieldValue } = useFormikContext();
  const { css, styles } = useStyles({ stylesFn });

  const emojis = props.emojis || false;

  const onEmojiClick = ({ emoji }: IEmojiData): void => {
    setFieldValue(field.name, (field.value += emoji));
    (document.querySelector(`input[name="${field.name}"]`) as HTMLElement)?.focus();
  };

  return (
    <>
      <input
        ref={ref}
        type={props.type || 'text'}
        name={props.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        placeholder={props.placeholder}
        value={field.value || ''}
        {...css(styles.textInput, meta.error && styles.error)}
      />
      {emojis && (
        <Spacer as="span" pl="xsmall" pt="nudge">
          <EmojiButton onEmojiClick={onEmojiClick} />
        </Spacer>
      )}
    </>
  );
});

export default TextInput;
