// @flow

import { equals, ReducerRegistry, assign } from '../base/redux';

import { SET_TENANT, SET_MEETING_PASSWORD_FROM_URL } from './actionTypes';

/**
 * Reduces redux actions which affect the Tenant details stored in the
 * redux store.
 *
 * @param {Object} state - The current redux state.
 * @param {Object} action - The redux action to reduce.
 * @returns {Object} The next redux state which is the result of reducing the
 * specified {@code action}.
 */
ReducerRegistry.register(
    'features/nslhub',
    (state = {tenantName:undefined,meetingPassword:undefined}, action) => {
        switch (action.type) {
        case SET_TENANT: {
            debugger;
            // eslint-disable-next-line no-unused-vars
            const { type, ...payload } = action;
           /* const nextState = {
                ...payload
            };

            return equals(state, nextState) ? state : nextState;*/
            return assign(state, {
                ...payload
            });
        }
        case SET_MEETING_PASSWORD_FROM_URL: {
            debugger;
            return _setMeetingPasswordFromURL(state,action);
        }

        }

        return state;
    });


/**
 * Reduces a specific Redux action SET_MEETING_PASSWORD_FROM_URL of the feature base/conference.
 *
 * @param {Object} state - The Redux state of the feature base/conference.
 * @param {Action} action - The Redux action SET_MEETING_PASSWORD_FROM_URL to reduce.
 * @private
 * @returns {Object} The new state of the feature base/conference after the
 * reduction of the specified action.
 */
 function _setMeetingPasswordFromURL(state, { meetingPassword }) {
   
    return assign(state, {
        meetingPassword
    });
    
}    