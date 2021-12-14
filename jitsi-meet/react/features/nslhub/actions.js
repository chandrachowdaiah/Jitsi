// @flow

import { SET_TENANT, SET_MEETING_PASSWORD_FROM_URL } from './actionTypes';

/**
 * Stores a tenant details into the redux store.
 *
 * @param {string} [tenant] - The tenant to store.
 * @returns {{
 *     type: SET_TENANT,
 *     tenaneName: (string|undefined)
 * }}
 */
export function setTenant(tenantName: ?string) {
    return {
        type: SET_TENANT,
        tenantName
    };
}

// Added by vipin

/**
 * Sets meeting password of the conference to be joined.
 *
 * @param {(string|undefined)} room - The meeting password of the conference to
 * be joined.
 * @returns {{
 *     type: SET_MEETING_PASSWORD_FROM_URL,
 *     meetingPassword: string
 * }}
 */
export function setMeetingPasswordFromURL(meetingPassword: ?string) {
    debugger;
    return {
        type: SET_MEETING_PASSWORD_FROM_URL,
        meetingPassword
    };
}