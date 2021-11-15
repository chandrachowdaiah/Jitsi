// @flow

import { equals, ReducerRegistry } from '../base/redux';

import { SET_TENANT } from './actionTypes';

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
    (state = {}, action) => {
        switch (action.type) {
        case SET_TENANT: {
            debugger;
            // eslint-disable-next-line no-unused-vars
            const { type, ...payload } = action;
            const nextState = {
                ...payload
            };

            return equals(state, nextState) ? state : nextState;
        }
        }

        return state;
    });
