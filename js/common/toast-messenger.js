
class ToolTipJS {
    /**
     * Show lên tooltip theo kiểu và dữ liệu đầu vào
     * @param {any} type
     * @param {any} mes
     * Author hieunv 26/07/2021
     */
    static showMes(type, mes) {
        $('.toast-messenger>i').removeClass($('.toast-messenger').attr('classi'));
        var classI
        $('.toast-messenger p').empty();
        $('.toast-messenger p').append(mes);
        switch (type) {
            case 'warning':
                classI = 'fa-exclamation-circle';
                $('.toast-messenger i').css('color', '#F1C04E');
                break;
            case 'danger':
                classI = 'fa-exclamation-triangle';
                $('.toast-messenger i').css('color', '#EB5757');
                break;
            case 'success':
                classI = 'fa-check-circle';
                $('.toast-messenger i').css('color', '#01B075');
                break;
            case 'primary':
                classI = 'fa-exclamation';
                $('.toast-messenger i').css('color', '#4388D9');
                break;
        }
        $('.toast-messenger>i').addClass(classI);
        $('.toast-messenger').attr('classi', classI);
        $('.toast-messenger').addClass('scale1');
        $('.toast-messenger').attr('scale', 1);
        setTimeout(() => {
            if ($('.toast-messenger').attr('scale') == 1) {
                $('.toast-messenger').removeClass('scale1');
                $('.toast-messenger').attr('scale', 0);
            }
        }, 3000);
    }
}