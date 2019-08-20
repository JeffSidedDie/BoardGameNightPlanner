import 'firebaseui/dist/firebaseui.css';
import './login.css';

import * as React from 'react';
import { useLogin } from 'firebase-hooks/auth';

export const Login: React.FC = () => {
    useLogin('#firebaseui-auth-container');

    return (
        <div id="firebaseui-auth-container" />
    );
}
