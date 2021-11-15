

/**
 * Retrieves the Tenant Name, if any, defined by a specific
 * {@link URL}.
 *
 * @param {URL} url - The {@code URL} to parse and retrieve the Tenant name
 * , if any, from.
 * @returns {string} The tenant name, if any, defined by the specified
 * {@code url}; otherwise, {@code undefined}.
 */
 export function parseJWTFromURLParams(url: URL = window.location) {
    return "TestTenant";
}