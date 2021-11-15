
import { SET_CONFIG } from '../base/config';
import { SET_LOCATION_URL } from '../base/connection';

import { MiddlewareRegistry } from '../base/redux';

import { SET_TENANT } from './actionTypes';
import { setTenant } from './actions';
import { parseTenantNameFromURLParams } from './functions';
import logger from './logger';

declare var APP: Object;


/**
 * Middleware to parse tenant data upon setting a new room URL.
 *
 * @param {Store} store - The redux store.
 * @private
 * @returns {Function}
 */
 MiddlewareRegistry.register(store => next => action => {
    switch (action.type) {
    case SET_CONFIG:
    case SET_LOCATION_URL:
        debugger;
        return _setConfigOrLocationURL(store, next, action);

    case SET_TENANT:
        return _setTenant(store, next, action);
    }

    return next(action);
});


/**
 * Notifies the feature nslhub that the action {@link SET_CONFIG} or
 * {@link SET_LOCATION_URL} is being dispatched within a specific redux
 * {@code store}.
 *
 * @param {Store} store - The redux store in which the specified {@code action}
 * is being dispatched.
 * @param {Dispatch} next - The redux dispatch function to dispatch the
 * specified {@code action} to the specified {@code store}.
 * @param {Action} action - The redux action {@code SET_CONFIG} or
 * {@code SET_LOCATION_URL} which is being dispatched in the specified
 * {@code store}.
 * @private
 * @returns {Object} The new state that is the result of the reduction of the
 * specified {@code action}.
 */
 function _setConfigOrLocationURL({ dispatch, getState }, next, action) {
    const result = next(action);
    debugger;
    const { locationURL } = getState()['features/base/connection'];

    dispatch(
        setTenant(locationURL ? parseTenantNameFromURLParams(locationURL) : undefined));

    return result;
}

/**
 * Notifies the feature nslhub that the action {@link SET_TENANT} is being dispatched
 * within a specific redux {@code store}.
 *
 * @param {Store} store - The redux store in which the specified {@code action}
 * is being dispatched.
 * @param {Dispatch} next - The redux dispatch function to dispatch the
 * specified {@code action} to the specified {@code store}.
 * @param {Action} action - The redux action {@code SET_JWT} which is being
 * dispatched in the specified {@code store}.
 * @private
 * @returns {Object} The new state that is the result of the reduction of the
 * specified {@code action}.
 */
 function _setTenant(store, next, action) {
    // eslint-disable-next-line no-unused-vars
    const { tenantName, type, ...actionPayload } = action;

    logger.info(`Tenant Name ${tenantName}`);
    //window.location='https://www.nslhub.com';
    return next(action);
}