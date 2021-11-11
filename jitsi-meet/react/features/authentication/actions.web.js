// @flow

import { maybeRedirectToWelcomePage } from '../app/actions';
import { hideDialog, openDialog } from '../base/dialog/actions';

import {
    CANCEL_LOGIN,
    NSL_AUTH_FAILED,
    NSL_AUTH_SUCCESS
} from './actionTypes';
import { WaitForOwnerDialog, LoginDialog } from './components';

export * from './actions.any';

/**
 * Cancels {@ink LoginDialog}.
 *
 * @returns {{
 *     type: CANCEL_LOGIN
 * }}
 */
export function cancelLogin() {
    return {
        type: CANCEL_LOGIN
    };
}

/**
 * Cancels authentication, closes {@link WaitForOwnerDialog}
 * and navigates back to the welcome page.
 *
 * @returns {Function}
 */
export function cancelWaitForOwner() {
    return (dispatch: Function) => {
        dispatch(maybeRedirectToWelcomePage());
    };
}

/**
 * Hides a authentication dialog where the local participant
 * should authenticate.
 *
 * @returns {Function}.
 */
export function hideLoginDialog() {
    return hideDialog(LoginDialog);
}

/**
 * Shows a notification dialog that authentication is required to create the.
 * Conference.
 * This is used for external auth.
 *
 * @param {string} room - The room name.
 * @param {Function} onAuthNow - The function to be invoked when external authentication.
 *
 * @returns {Function}.
 */
export function openAuthDialog(room: String, onAuthNow: ?Function) {
    return openDialog(WaitForOwnerDialog, {
        room,
        onAuthNow
    });
}


// Added by Vipin
export function nslAuthFailed(error_message){
    return {
        type: NSL_AUTH_FAILED,
        payload:{
            message:error_message
        }
    };
}

export function nslAuthSuccess(progress){
    return {
        type : NSL_AUTH_SUCCESS,
        payload:{
            message:progress
        }
    }
}