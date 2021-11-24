import logger from "../analytics/logger";
import { parseURLParams } from "../base/util";


/**
 * Retrieves the Tenant Name, if any, defined by a specific
 * {@link URL}.
 *
 * @param {URL} url - The {@code URL} to parse and retrieve the Tenant name
 * , if any, from.
 * @returns {string} The tenant name, if any, defined by the specified
 * {@code url}; otherwise, {@code undefined}.
 */
 export function parseTenantNameFromURLParams(url: URL = window.location) {
    debugger;
    logger.info(`url is ${url}`);
    //url = 'https://jitsitesting.qa3.nslhub.com/meet/1232'
    var firstPartStr = url.toString().split(".")[0];
    var tenantName = firstPartStr.split("/")[2];
    const config = APP.store.getState()['features/base/config'];
    logger.info('Config retrieved in parseTenant');
    logger.info(config);
    const defaultHost = config.nslhubDevHost || "localhost";
    if(tenantName.startsWith(defaultHost))
        tenantName = config.nslhubDefaultTenant || "jitsitesting";
    logger.info(`First part ${firstPartStr}`);
    logger.info(`Tenant name=${tenantName}`);

    return tenantName;
}

/**
 * Returns root nslhub state.
 *
 * @param {Object} state - Global state.
 * @returns {Object} NSLHUB state.
 */
 export const getNSLHUBState = (state: Object) => state['features/nslhub'];


/**
 * Returns the stored tenant name.
 *
 * @param {Object} state - The current state of the app.
 * @returns {string}
 */
 export function getTenantName(state: Object): string {
    return getNSLHUBState(state).tenantName;
}

/**
 * Retrieves the Meeting password, if any, defined by a specific
 * {@link URL}.
 *
 * @param {URL} url - The {@code URL} to parse and retrieve the Meeting Password
 * , if any, from.
 * @returns {string} The Meeting Password, if any, defined by the specified
 * {@code url}; otherwise, {@code undefined}.
 */
 export function parseMeetingPasswordFromURLParams(url: URL = window.location) {
    debugger;
    let password = parseURLParams(url, true, 'search').password;
    return password;
}