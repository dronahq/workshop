$(document).ready(function () {
    document.addEventListener('deviceready', function () {
        var obj = new StartPage();
        obj.init();
    });
});

var StartPage = function () {

    var dhqAssets = {
        api_url: 'https://plugin.api.dronahq.com/',
        token: '0e2fd24fa9535fd822380260cee8848790a9ea2af8aa7ecd05'
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

            $('.page').removeClass('hide');

            $('.ui.modal').modal('show');
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
            _fnGetDronaHQUser();
            _onClick();
        }
    }
}