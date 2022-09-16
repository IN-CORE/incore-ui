import React from 'react';
import { userStateInitialValue } from './states';

export const UserStateContext = React.createContext<UserState>(userStateInitialValue);

export const UserStateActionDispatcherContext = React.createContext<React.Dispatch<UserAction>>(() => {});
