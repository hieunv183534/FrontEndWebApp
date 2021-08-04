

class CommonJS {
    constructor() {
    }

    /**--------------------------------------------------------------------------------------
    * Hàm format ngày tháng
    * dạng ngày/tháng/năm
    * @param {any} _date
    * Author: hieunv 
    */
    static formatDate(_date) {
        if (_date != null) {
            var date = new Date(_date);
            var day = date.getDate();
            day = (day < 10) ? '0' + day : day;
            var month = date.getMonth() + 1;
            month = (month < 10) ? '0' + month : month;
            var year = date.getFullYear();
            return day + '/' + month + '/' + year;
        }
        else {
            return '';
        }
    }


    /**--------------------------------------------------------------------------------------
     * chuyển đổi ngày tháng về dang yyyy-mm-dd
     * @param {any} _date
     * Author hieunv 26/05/2021
     */
    static formatDateToValue(_date) {
        if (_date != null) {
            var date = new Date(_date);
            var day = date.getDate();
            day = (day < 10) ? '0' + day : day;
            var month = date.getMonth() + 1;
            month = (month < 10) ? '0' + month : month;
            var year = date.getFullYear();
            return year + '-' + month + '-' + day;
        }
        else {
            return '';
        }
    }


    /**--------------------------------------------------------------------------------------
     * Định dang tiền lương
     * @param {any} _salary
     * Author hieunv
     */
    static formatSalary(_salary) {
        if (_salary != null) {
            /*var salary = _salary.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");*/
            return _salary.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            /*return salary;*/
        } else {
            return '';
        }
    }

    /**--------------------------------------------------------------------------------------
     * Kiểm tra đinh dạng email
     * @param {any} email
     * Author hieunv
     */
    static validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    /**
    * warning if invalid email
    * Author hieunv (21/07/2021)
    * */
    static checkEmail(seft, thisElement) {
        var email = $(thisElement).val()
        if (email == '') {
            ToolTipJS.showMes('danger', 'Thông tin này bắt buộc nhập!');
            $(this).addClass('border-red');
            $(this).attr('title', 'Thông tin này bắt buộc nhập!');
        } else if (!CommonJS.validateEmail(email)) {
            // chuyển border thành màu đỏ cảnh báo và khi hover hiện thông tin cảnh báo
            ToolTipJS.showMes('warning', 'Email không đúng định dạng!');
            $(this).addClass('border-red');
            $(this).attr('title', 'Email không đúng đinh dạng!');
        } else {
            $(this).removeClass('border-red');
            $(this).removeAttr('title');
        }
    }


    /**
     * warning if invalid salary
     * @param {any} seft
     * @param {any} thisElement
     * Author hieunv (21/07/2021)
     */
    static checkSalary(seft,thisElement) {
        var salary = $(thisElement).val()
        if (!$.isNumeric(salary.replaceAll('.', ''))) {
            // chuyển border thành màu đỏ cảnh báo và khi hover hiện thông tin cảnh báo
            $(this).addClass('border-red');
            $(this).attr('title', 'Salary không đúng đinh dạng!');
            ToolTipJS.showMes('warning', 'Salary không đúng đinh dạng!');
        } else {
            $(this).removeClass('border-red');
            $(this).removeAttr('title');
        }
    }
}



