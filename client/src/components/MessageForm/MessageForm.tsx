import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Formik, Form, FormikHelpers } from 'formik';
import { Styles } from 'react-with-styles';
import useStyles from 'react-with-styles/lib/hooks/useStyles';
import TextInput from '@src/components/TextInput';
import GeneralError from '@src/components/GeneralError';
import { Theme } from '@src/theme';
import { ChatService } from '@src/services';
import { useAuth, useChat, useSocket } from '@src/hooks';
import { MOBILE_QUERY } from '@src/constants';

// @todo shared interfaces in src/lib etc.

interface Params {
  chatId: string;
  chatType: string;
}

interface Values {
  message: string;
}

const stylesFn = ({ color }: Theme): Styles => ({
  formContainer: {
    alignItems: 'center',
    background: color.white,
    bottom: '0',
    boxShadow: '0 -0.625rem 1.25rem 0 rgba(89, 89, 89, 0.1)',
    display: 'flex',
    height: '3.125rem',
    padding: '0 2rem',
    position: 'fixed',
    width: 'calc(100vw - 16.5rem)' // 16.5rem === paddingX of the Layout component + side menu width
  },
  formContainerMobile: {
    width: 'calc(100vw - 4rem)' // 4rem === paddingX of the Layout component
  }
});

const MessageForm: React.FC = () => {
  const { chatId, chatType } = useParams<Params>();
  const { user } = useAuth();
  const { socket } = useSocket();
  const { channels, chatDispatch } = useChat();
  const [isFormSubmitError, setIsFormSubmitError] = useState(false);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const { css, styles } = useStyles({ stylesFn });

  const source = axios.CancelToken.source();

  useEffect(() => {
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (
    values: Values,
    { resetForm }: FormikHelpers<Values>
  ): Promise<void> => {
    const trimmedValue = values.message.trim();

    if (trimmedValue !== '') {
      try {
        const message = {
          username: user?.username ?? '',
          senderId: user?.id ?? '',
          text: trimmedValue,
          recipientId: chatType === 'direct' ? chatId : null,
          channel:
            chatType === 'channels'
              ? channels?.find(({ _id }) => _id === chatId)?.name ?? ''
              : null
        };

        const result = await ChatService.createMessage({
          data: message,
          jwt: user?.jwt ?? '',
          source
        });

        const { message: savedMessage } = result.data;

        const variant = chatType === 'direct' ? 'private' : 'public';
        socket?.sendChatMessage(variant, savedMessage);
        chatDispatch({ type: 'UPDATE_CHAT', payload: savedMessage });
        resetForm();
      } catch (err) {
        /* istanbul ignore else */
        if (!axios.isCancel(err)) {
          setIsFormSubmitError(true);
        }
      }
    }
  };

  return (
    <Formik initialValues={{ message: '' }} onSubmit={onSubmit}>
      {() => (
        <Form>
          <div
            {...css(
              styles.stickyFormContainer,
              isMobile && styles.stickyFormContainerMobile
            )}
          >
            {isFormSubmitError ? (
              <GeneralError />
            ) : (
              <TextInput
                name="message"
                placeholder="Type your message here, then press 'Enter' to send."
              />
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MessageForm;
