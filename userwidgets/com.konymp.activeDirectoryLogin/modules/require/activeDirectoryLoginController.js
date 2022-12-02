define(function() {
    //logger module
    var konyLoggerModule = require('com/konymp/activeDirectoryLogin/konyLogger');
    var konymp = konymp || {};
    konymp.logger = (new konyLoggerModule("ActiveDirectory Login Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
    konymp.logger.enableServerLogging = true;
    return {
        /**
         * @constructor constructor
         * @param basicConfigs
         * @param layoutConfig
         * @param pspConfig
         */
        constructor: function(baseConfig, layoutConfig, pspConfig) {
			var analytics=require("com/konymp/"+"activeDirectoryLogin"+"/analytics");
            analytics.notifyAnalytics();
            konymp.logger.trace("Entering Active Directory Login Component constructor", konymp.logger.FUNCTION_ENTRY);
            konymp.logger.trace("Exiting Active Directory Login Component constructor", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function LoginComponentPostShow 
         * @description Logic for component postshow
         */
        LoginComponentPostShow: function() {
            //#ifdef desktopweb 
            this.renderBasedOnBreakPoint();
            //#endif 
        },
        //#ifdef desktopweb  
      	/**
         * @function renderBasedOnBreakPoint
         * @description This method is used to render the view according to breakpoint
         * @private
         */
        renderBasedOnBreakPoint: function() {
            var mediaWidth = kony.os.deviceInfo().deviceWidth;
            if (mediaWidth <= 640) {
                this.view.flxLoginWrapper.width = "100%";
                this.view.flxLoginWrapper.height = "100%";
            } else if (mediaWidth <= 1024) {
                this.view.flxLoginWrapper.width = "50%";
                this.view.flxLoginWrapper.height = "50%";
            } else {
                this.view.flxLoginWrapper.width = "35%";
                this.view.flxLoginWrapper.height = "50%";
            }
            this.view.forceLayout();
        },
        //#endif  
        /**
         * @function initGettersSetters
         * @description Logic for getters/setters of custom properties
         */
        initGettersSetters: function() {
            konymp.logger.trace("Entering Active Directory Login Component initGettersSetters", konymp.logger.FUNCTION_ENTRY);
            konymp.logger.trace("Exiting Active Directory Login Component initGettersSetters", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @api	: getUsername 
         * @description : Returns username entered by the user
         * @public
         * @return : {string} username
         */
        getUsername: function() {
            konymp.logger.trace("---------------Entering getUsername api---------------", konymp.logger.FUNCTION_ENTRY);
            try {
                return this.view.txtUserName.text;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                if (!this.onErrorCallback) {
                    this.defaultCallback(exception);
                } else {
                    this.onErrorCallback(exception);
                }
            }
            konymp.logger.trace("---------------Exiting getUsername api---------------", konymp.logger.FUNCTION_EXIT);
        },

        /**
         * @function onLoginSuccessWrapper
         * @description deligate to handle onLogin Success from backend
		 * @param response The success response of the login operation
         * @private
         */
        onLoginSuccessWrapper: function(response) {
            konymp.logger.trace("---------------Entering onLoginSuccessWrapper function---------------", konymp.logger.FUNCTION_ENTRY);
            kony.application.dismissLoadingScreen();
            if (this.onLoginSuccess) {
                this.onLoginSuccess(response);
            } else {
                response = (response === null || response === undefined) ? {} : response;
                response.message = "Login Success - Please implement login success action.";
                this.defaultCallback(response);
            }
            konymp.logger.trace("---------------Exiting onLoginSuccessWrapper function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function onLoginFailuresWrapper
         * @description deligate to handle onLogin Success from backend
         * @param error The failure response of the login operation
         * @private
         */
        onLoginFailuresWrapper: function(error) {
            konymp.logger.trace("---------------Entering onLoginFailuresWrapper function---------------", konymp.logger.FUNCTION_ENTRY);
            kony.application.dismissLoadingScreen();
            if (this.onLoginFailed) {
                this.onLoginFailed(error);
            } else {
                error = (error === null || error === undefined) ? {} : error;
                error.message = "Login Failed - Please implement login failure action.";
                this.defaultCallback(error);
            }
            konymp.logger.trace("---------------Exiting onLoginFailuresWrapper function---------------", konymp.logger.FUNCTION_EXIT);
        },
        /**
         * @function defaultCallback
         * @description default callback for all async services
         * @private
         * @param {Object} response
         */
        defaultCallback: function(response) {
            konymp.logger.trace("---------------Entering defaultCallback---------------", konymp.logger.FUNCTION_ENTRY);
            kony.print(JSON.stringify(response));
            konymp.logger.trace("---------------Exiting defaultCallback---------------", konymp.logger.FUNCTION_EXIT);
            throw response;

        },

    };
});