// @flow

import { FieldTextStateless as TextField } from '@atlaskit/field-text';
import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import logger from '../../../analytics/logger';
import { connect } from '../../../../../connection';
import { toJid } from '../../../base/connection/functions';
import { Dialog } from '../../../base/dialog';
import { translate, translateToHTML } from '../../../base/i18n';
import { JitsiConnectionErrors } from '../../../base/lib-jitsi-meet';
import { connect as reduxConnect } from '../../../base/redux';
import {
    authenticateAndUpgradeRole,
    cancelLogin,
    nslAuthFailed,
    nslAuthSuccess
} from '../../actions.web';

/**
 * The type of the React {@code Component} props of {@link LoginDialog}.
 */
type Props = {

    /**cd ..
     * {@link JitsiConference} that needs authentication - will hold a valid
     * value in XMPP login + guest access mode.
     */
    _conference: Object,

    /**
     * The server hosts specified in the global config.
     */
    _configHosts: Object,

    /**
     * Indicates if the dialog should display "connecting" status message.
     */
    _connecting: boolean,

    /**
     * The error which occurred during login/authentication.
     */
    _error: Object,

    /**
     * The progress in the floating range between 0 and 1 of the authenticating
     * and upgrading the role of the local participant/user.
     */
    _progress: number,

    /**
     * Redux store dispatch method.
     */
    dispatch: Dispatch<any>,

    /**
     * Invoked when username and password are submitted.
     */
    onSuccess: Function,

    /**
     * Conference room name.
     */
    roomName: string,

    /**
     * Invoked to obtain translated strings.
     */
    t: Function
}

/**
 * The type of the React {@code Component} state of {@link LoginDialog}.
 */
type State = {

    /**
     * The user entered password for the conference.
     */
    password: string,

    /**
     * The user entered local participant name.
     */
    username: string,

    /**
     * Authentication process starts before joining the conference room.
     */
    loginStarted: boolean
}

/**
 * Component that renders the login in conference dialog.
 *
 *  @returns {React$Element<any>}
 */
class LoginDialog extends Component<Props, State> {
    /**
     * Initializes a new {@code LoginDialog} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loginStarted: false
        };

        this._onCancelLogin = this._onCancelLogin.bind(this);
        this._onLogin = this._onLogin.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    _onCancelLogin: () => void;

    /**
     * Called when the cancel button is clicked.
     *
     * @private
     * @returns {void}
     */
    _onCancelLogin() {
        const { dispatch } = this.props;

        dispatch(cancelLogin());
    }

    _onLogin: () => void;

    /**
     * Notifies this LoginDialog that the login button (OK) has been pressed by
     * the user.
     *
     * @private
     * @returns {void}
     */
    _onLogin() {
        const {
            _conference: conference,
            _configHosts: configHosts,
            roomName,
            onSuccess,
            dispatch
        } = this.props;
        const { password, username } = this.state;

        // Added by Vipin
        this.authenticateUserWithNSL(username,password,()=>{
            console.log("Callback called...");
            var username = "support";
            var password = "support";
            console.log(username);
            const jid = toJid(username, configHosts);

            if (conference) {
                dispatch(authenticateAndUpgradeRole(jid, password, conference));
            } else {
                this.setState({
                    loginStarted: true
                });

                connect(jid, password, roomName)
                .then(connection => {
                    onSuccess && onSuccess(connection);
                })
                .catch(() => {
                    this.setState({
                        loginStarted: false
                    });
                });
        }
        });     


        /*const jid = toJid(username, configHosts);

        if (conference) {
            dispatch(authenticateAndUpgradeRole(jid, password, conference));
        } else {
            this.setState({
                loginStarted: true
            });

            connect(jid, password, roomName)
                .then(connection => {
                    onSuccess && onSuccess(connection);
                })
                .catch(() => {
                    this.setState({
                        loginStarted: false
                    });
                });
        }*/
    }

    // Added by Vipin
    authenticateUserWithNSL(username,password,callback){
        var requestBody = {
                'username': username,//'admin@nslhub.com',
                'password': password,//'admin@123',
                'client_id': 'jitsitesting', //'qatestr925',
                'grant_type': 'password'
            };
        
            var formBody = [];
            for (var property in requestBody) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(requestBody[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
    
        
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                body: formBody
            };    
    
        //fetch('https://iam.nslhub.com/auth/realms/qatestr925/protocol/openid-connect/token',requestOptions)
        fetch('https://iam.nslhub.com/auth/realms/jitsitesting/protocol/openid-connect/token',requestOptions)    
            .then(res => res.json())
            .then(data => {
                debugger;
            if(data && data.access_token){
                const accessToken = "bearer "+data.access_token;
                this.verifyModeratorRightsForUser(accessToken,callback);
            }else{
                
                this.props.dispatch(nslAuthFailed('Invalid NSL credentials'));
                console.log("Failed to authenticate with IAM");
            }
            })
            .catch(console.log);
    }
    
    
    verifyModeratorRightsForUser(accessToken,callback){
        
        fetch('https://paas3.nslhub.com:443/nsl-iam/api/user/getActiveUser',{
            method: 'GET',
            headers: { 'Authorization':accessToken }, 
        })
        .then(res => res.json())
        .then((userData) => {
            debugger;
            var roles = userData.roles;
            var isModerator = false;
                        /*roles.forEach(role => {
                           if(role.name === 'orghead') {
                               console.log("User is moderator proceed....");
                            callback();	
                           }
                        });*/
            for(var it=0;it<roles.length;it++){
                if(roles[it].name=='Moderator'){
                    isModerator = true;
                    break;
                }
            }

            if(isModerator){
                logger.info("User is moderator proceed....");
                //this.props.dispatch(nslAuthSuccess('NSL Authentication Successful'));
                callback();
                debugger;
                //joinConference();
            }                  
            else{
                this.props.dispatch(nslAuthFailed('Not Authorized'));
                logger.info("Not moderator...");    
            }          
            logger.info(userData);
        })
        .catch(console.log)
    
    }

    _onChange: Object => void;

    /**
     * Callback for the onChange event of the field.
     *
     * @param {Object} evt - The static event.
     * @returns {void}
     */
    _onChange(evt: Object) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    /**
     * Renders an optional message, if applicable.
     *
     * @returns {ReactElement}
     * @private
     */
    renderMessage() {
        const {
            _configHosts: configHosts,
            _connecting: connecting,
            _error: error,
            _progress: progress,
            t
        } = this.props;
        const { username, password } = this.state;
        const messageOptions = {};
        let messageKey;

        if (progress && progress < 1) {
            messageKey = t('connection.FETCH_SESSION_ID');
        } else if (error) {
            const { name } = error;

            if (name === JitsiConnectionErrors.PASSWORD_REQUIRED) {
                const { credentials } = error;

                if (credentials
                    && credentials.jid === toJid(username, configHosts)
                    && credentials.password === password) {
                    messageKey = t('dialog.incorrectPassword');
                }
            } else if(name=='NSL_AUTH_FAILED'){
                debugger;
                messageKey = error.message //t('dialog.incorrectPassword');
            }
            else if (name) {
                messageKey = t('dialog.connectErrorWithMsg');
                messageOptions.msg = `${name} ${error.message}`;
            }
        } else if (connecting) {
            messageKey = t('connection.CONNECTING');
        }

        if (messageKey) {
            return (
                <span>
                    { translateToHTML(t, messageKey, messageOptions) }
                </span>
            );
        }

        return null;
    }

    /**
     * Implements {@Component#render}.
     *
     * @inheritdoc
     */
    render() {
        const {
            _connecting: connecting,
            t
        } = this.props;
        const { password, loginStarted, username } = this.state;

        return (
            <Dialog
                disableBlanketClickDismiss = { true }
                hideCloseIconButton = { true }
                okDisabled = {
                    connecting
                    || loginStarted
                    || !password
                    || !username
                }
                okKey = { t('dialog.login') }
                onCancel = { this._onCancelLogin }
                onSubmit = { this._onLogin }
                titleKey = { t('dialog.authenticationRequired') }
                width = { 'small' }>
                <TextField
                    autoFocus = { true }
                    className = 'input-control'
                    compact = { false }
                    label = { t('dialog.user') }
                    name = 'username'
                    onChange = { this._onChange }
                    placeholder = { t('dialog.userIdentifier') }
                    shouldFitContainer = { true }
                    type = 'text'
                    value = { username } />
                <TextField
                    className = 'input-control'
                    compact = { false }
                    label = { t('dialog.userPassword') }
                    name = 'password'
                    onChange = { this._onChange }
                    placeholder = { t('dialog.password') }
                    shouldFitContainer = { true }
                    type = 'password'
                    value = { password } />
                { this.renderMessage() }
            </Dialog>
        );
    }
}

/**
 * Maps (parts of) the Redux state to the associated props for the
 * {@code LoginDialog} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {Props}
 */
function mapStateToProps(state) {
    const {
        error: authenticateAndUpgradeRoleError,
        progress,
        thenableWithCancel
    } = state['features/authentication'];
    const { authRequired } = state['features/base/conference'];
    const { hosts: configHosts } = state['features/base/config'];
    const {
        connecting,
        error: connectionError
    } = state['features/base/connection'];

    return {
        _conference: authRequired,
        _configHosts: configHosts,
        _connecting: connecting || thenableWithCancel,
        _error: connectionError || authenticateAndUpgradeRoleError,
        _progress: progress
    };
}

export default translate(reduxConnect(mapStateToProps)(LoginDialog));
