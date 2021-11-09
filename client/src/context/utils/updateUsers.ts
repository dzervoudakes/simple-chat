/**
 * ChatContext utility that adds a new user to the users list.
 * @packageDocumentation
 */
import cloneDeep from 'lodash/cloneDeep';

import { ChatUser } from '@src/types';

import { ChatContextProps } from '..';

interface UpdateUsersProps {
  state: Omit<ChatContextProps, 'chatDispatch'>;
  user: ChatUser;
}

export const updateUsers = ({ state, user }: UpdateUsersProps): ChatUser[] => {
  const updatedUsers = cloneDeep(state.users);
  updatedUsers.push(user);

  return updatedUsers;
};

export default updateUsers;
