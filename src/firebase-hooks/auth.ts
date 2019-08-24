import { useState, useEffect } from 'react';
import { auth, authUI, authSignInOptions } from 'firebase-hooks/common';
import { Document, User } from 'models';

export function useLogin(authElementId: string) {
    useEffect(() => {
        authUI.start(authElementId, {
            callbacks: {
                signInSuccessWithAuthResult: (authResult, redirectUrl) => {
                    return false;
                }
            },
            signInFlow: 'popup',
            signInOptions: authSignInOptions,
        });
    }, [authElementId]);
}

export function useCurrentUser() {
    const [user, setUser] = useState<Document<User> | null>(null);

    useEffect(() => {
        auth.onAuthStateChanged(async fbUser => {
            if (fbUser) {
                const token = await fbUser.getIdTokenResult(true);
                const user: Document<User> = {
                    id: fbUser.uid,
                    data: {
                        displayName: fbUser.displayName,
                        email: fbUser.email,
                        isAdmin: token.claims.admin
                    }
                }
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    return user;
}

export async function signOut() {
    await auth.signOut();
}