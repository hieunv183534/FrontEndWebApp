
class BaseJS {
    constructor() {
        this.dataUrl = "";
        this.setDataUrl();
        this.loadData();
    }

    setDataUrl() {

    }

    loadData() {
        try {
            // lấy thông tin các cột dữ liệu
            var cols = $('.grid table thead th');

            //Lấy thông tin tương ứng với các cột để map vào
            $.ajax({
                url: this.dataUrl,
                method: 'GET'
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $.each(cols, function (index, th) {
                        var td = $(`<td></td>`);
                        var fieldName = $(th).attr('fieldName');
                        if (fieldName == 'WorkStatus') {
                            var value = (obj[fieldName] == 1) ? "Đang làm việc" : "Đã nghỉ việc";
                        } else if (fieldName == 'check') {
                            var value = $(`<input type="checkbox" onclick="checkcheck($(this))" style="width:46px; height:24px;"/>`);
                        }else {
                            var value = obj[fieldName];
                        }
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case 'ddmmyyyy':
                                value = formatDate(value);
                                break;
                            case 'money':
                                value = formatSalary(value);
                                break;
                            default:
                                break;
                        }

                        $(td).append(value);
                        $(tr).append(td);
                    })
                    tr.attr('bgindex', index);
                    tr.attr('idobj', obj.EmployeeId);
                    $('.grid table tbody').append(tr);
                })
            }).fail(function (res) {

            });
        } catch (e) {

        }      
    }
}