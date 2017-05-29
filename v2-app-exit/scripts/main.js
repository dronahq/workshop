$(document).ready(function () {
    document.addEventListener('deviceready', function () {
        var obj = new StartPage();
        obj.init();
    });
});

var StartPage = function () {

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
            _onClick();
        }
    }
}