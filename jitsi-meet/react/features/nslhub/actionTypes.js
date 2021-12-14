/**
 * The type of redux action which stores Tenant details into
 * the redux store.
 *
 * {
 *     type: SET_TENANT,
 *     jwt: string
 * }
 */
 export const SET_TENANT = 'SET_TENANT';

/**
 * The type of (redux) action which gets password from url and sets it to join or lock a specific
 * {@code JitsiConference}.
 *
 * {
 *     type: SET_MEETING_PASSWORD_FROM_URL,
 *     conference: JitsiConference,
 *     method: Function
 *     password: string
 * }
 */
 export const SET_MEETING_PASSWORD_FROM_URL = 'SET_MEETING_PASSWORD_FROM_URL'; 