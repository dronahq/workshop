$(document).ready(function () {
    document.addEventListener('deviceready', function () {
        var obj = new StartPage();
        obj.init();
    });
});

var StartPage = function () {

    var getDronaHQUser = function () {

        DronaHQ.user.getProfile(function (data) {
            $('#userProfile').text('Welcome ' + data.name);
            $('.page').removeClass('hide');
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
            getDronaHQUser();
            _onClick();
        }
    }
}