// @flow

import { SET_TENANT } from './actionTypes';

/**
 * Stores a tenant details into the redux store.
 *
 * @param {string} [tenant] - The tenant to store.
 * @returns {{
 *     type: SET_TENANT,
 *     jwt: (string|undefined)
 * }}
 */
export function setTenant(tenant: ?string) {
    return {
        type: SET_TENANT,
        tenant
    };
}
