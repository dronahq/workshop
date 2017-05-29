$(document).ready(function () {
    document.addEventListener('deviceready', function () {
        var obj = new StartPage();
        obj.init();
    });
});

var StartPage = function () {

    var dhqAssets = {
        api_url: 'https://plugin.api.dronahq.com/',
        token: 'your_app_token',
        authuser : 'auth-user'
    }

    var DoAjaxWork = function (ajaxUrl, reqType, ajaxReqData, onSuccess, onError) {
        $.ajax({
            type: reqType,
            url: ajaxUrl,
            data: ajaxReqData,
            success: onSuccess,
            error: onError
        });
    };

    var _fnSSO = function (uid, nonce, token) {

        function fnSuccess(respData) {

            DronaHQ.KVStore.setItem(dhqAssets.authuser, respData.user_name, function () {
                //success callback
                $('.page').removeClass('hide');

                $('.ui.modal').modal('show');
            }, function () {
                //fail callback
            });
        }

        function fnError(err) {

        }

        var reqData = {
            tokenkey: token,
            nonce: nonce
        }

        DoAjaxWork(dhqAssets.api_url + '/users/' + uid, 'GET', reqData, fnSuccess, fnError)
    }

    var _fnGetDronaHQUser = function () {

        DronaHQ.user.getProfile(function (data) {
            $('#userProfile').text('Welcome ' + data.name);

            _fnSSO(data.uid, data.nonce, dhqAssets.token);
        },
          function (err) {
          });
    };

    var _fnExitApp = function () {
        DronaHQ.app.exitApp();
    }

    var _onClick = function () {
        $('.home_backbutton').off('click').on('click', function () {
            _fnExitApp();
        });
    }

    return {
        init: function () {
            DronaHQ.KVStore.getItem(dhqAssets.authuser, function (data) {
                //success callback
                var value = data.value;
                $('#userProfile').text('Welcome ' + value);
                $('#stage').text('STAGE 5');
                $('#stageQ').text('Was this data offline or cached?');
                $('#stageA').html('Yes! This page is showing cached data.<br />DronaHQ KV Storage used for caching data.<br />');

                $('.page').removeClass('hide');
            }, function () {
                //fail callback
                _fnGetDronaHQUser();
            });
           
            _onClick();
        }
    }
}