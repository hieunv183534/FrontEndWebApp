
class PopupJS {
    /**
     * Show popup theo kiểu và dữ liệu truyền vào
     * @param {any} type
     * @param {any} mes
     * @param {any} title
     * Author hieunv 27/07/2021
     */
    static showPopup(type, mes, title) {
        $('.popup .popup-content .popup-content-right p').empty();
        $('.popup .popup-content .popup-content-right p').append(mes);
        $('.popup .popup-header p').empty();
        $('.popup .popup-header p').append(title);
        switch (type) {
            case 'notification':
                $('.popup .popup-content .popup-content-left').css('display', 'none');
                $('.popup .popup-content .popup-content-right').css('width', '423px');
                $('.popup .popup-content .popup-content-right').css('padding-left', '24px');
                $('.popup .popup-footer .btn-y').css('visibility', 'hidden');
                $('.popup .popup-footer .btn-z').css('display', 'none');
                $('.popup .popup-footer .btn-x').css('display', 'block');
                break;
            case 'warning':
                $('.popup .popup-content .popup-content-left').css('display', 'flex');
                $('.popup .popup-content .popup-content-right').css('width', '370px');
                $('.popup .popup-content .popup-content-right').css('padding-left', '10px');
                $('.popup .popup-footer .btn-y').css('visibility', 'visible');
                $('.popup .popup-footer .btn-z').css('display', 'none');
                $('.popup .popup-footer .btn-x').css('display', 'block');
                $('.popup .popup-content .popup-content-left i').css('color', '#F1C04E');
                break;
            case 'danger':
                $('.popup .popup-content .popup-content-left').css('display', 'flex');
                $('.popup .popup-content .popup-content-right').css('width', '370px');
                $('.popup .popup-content .popup-content-right').css('padding-left', '10px');
                $('.popup .popup-footer .btn-y').css('visibility', 'visible');
                $('.popup .popup-footer .btn-z').css('display', 'block');
                $('.popup .popup-footer .btn-x').css('display', 'none');
                $('.popup .popup-content .popup-content-left i').css('color', '#EA2B2B');
                break;
            default:
                break;
        }
    }
}