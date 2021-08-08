myCustomer = '';

$(document).ready(function () {
    myCustomer = new CustomerJS();
})




class CustomerJS {
    checkedCustomers = [];
    flagAdd = 1;
    myCustomerId = '';

    constructor() {
        this.loadData();
        this.loadDropdown();
        this.initEvent();
    }

    /**
    * hàm load dữ liệu
    * Author: hieunv (21/07/2021)
    * */
    loadData() {
        var seft = this;
        $('.grid table tbody').empty();
        try {
            this.dataUrl = "http://localhost:59749/api/Customers";

            //Lấy thông tin tương ứng với các cột để map vào
            $.ajax({
                url: this.dataUrl,
                method: 'GET'
            }).done(function (res) {
                seft.bindingData(res);
            }).fail(function (res) {
            });
        } catch (e) {
            console.log(e);
        }
    }


    /**
    * Binding data to table
    * @param {any} objs
    */
    bindingData(objs) {
        // lấy thông tin các cột dữ liệu
        var cols = $('.grid table thead th');
        $.each(objs, function (index, obj) {
            var tr = $(`<tr></tr>`);
            $.each(cols, function (index, th) {
                var td = $(`<td></td>`);
                var fieldName = $(th).attr('fieldName');
                if (fieldName == 'check') {
                    var value = $(`<input type="checkbox" style="width:46px; height:24px;"/>`);
                } else if (fieldName == 'CustomerId') {
                    var value = "KH-" + obj[fieldName];
                } else {
                    var value = obj[fieldName];
                }
                var formatType = $(th).attr('formatType');
                switch (formatType) {
                    case 'ddmmyyyy':
                        value = CommonJS.formatDate(value);
                        break;
                    case 'money':
                        value = CommonJS.formatSalary(value);
                        break;
                    default:
                        break;
                }
                $(td).append(value);
                $(tr).append(td);
            })
            tr.attr('bgindex', index);
            tr.attr('idobj', obj.CustomerId);

            $('.grid table tbody').append(tr);
        });
    }


    /**
     * Khởi tạo các sự kiện cho trang employee
     * Author hieunv 26/07/2021
     * */
    initEvent() {
        var seft = this;
        //1.Sự kiện khi click thêm mới
        $('#btnAdd').click(function () {
            seft.btnAddOnClick(seft, this);
        });

        //2.Sự kiện khi click exit trên form thông tin
        $('#btnExit').click(function () {
            seft.btnExitOnClick(seft, this);
        });

        //3.Sự kiện khi click save trên form thông tin
        $('#btnSave').click(function () {
            seft.btnSaveOnClick(seft, this);
        });

        //4.Sự kiện khi click hủy trên form thông tin
        $('#btnCancel').click(function () {
            seft.btnCancelOnClick(seft, this);
        });

        //5.Sự kiện khi click refresh trên form thông tin
        $('#btnRefresh').click(function () {
            seft.btnRefreshOnClick(seft, this);
        });


        //6.Sự kiện khi dbclick 1 hàng trên bảng
        $('.grid table').on('dblclick', 'tbody tr', function () {
            seft.tableRowOnDbClick(seft, this);
        });

        //14.Click vào checkbox trên các hàng
        $('.grid table tbody').on('click', 'tr td input', function () {
            seft.checkcheck(seft, this);
        });

        //7.Sự kiện khi click vào toggle
        $('#btnToggle').click(function () {
            seft.btnToggleOnClick(seft, this);
        });

        //8.Validate dữ liệu
        // Các trường bắt buộc nhập:Mã khách hàng, họ và tên
        $('input[required]').blur(function () {
            seft.requiredNote(seft, this);
        });

        //9.Email đúng định dạng
        $('input#inputEmail').blur(function () {
            CommonJS.checkEmail(seft, this);
        });

        //10. Lương đúng định dạng
        $('input#inputSalary').blur(function () {
            CommonJS.checkSalary(seft, this);
        });

        //11. Xóa các nhân viên được chọn
        $('#btnDelete').click(function () {
            seft.btnDeleteOnClick(seft, this);
        });

        //12.Format Salary when inputSalary keydown
        $('input#inputSalary').keyup(function () {
            seft.inputSalaryOnKeyup(seft, this);
        });

        //13.Click vào nút exit trên popup
        $('.popup button.btn-exit').click(() => {
            $('.popup').css('display', 'none');
        })

        //14 khi click vào btn exit, btn cancel trên dialog buy
        $('.dialog-customer-buy .dialog-header button.btn-exit').click(() => {
            $('.dialog-buy').css('visibility', 'hidden');
        })
        $('.dialog-customer-buy .dialog-footer .btn-cancel').click(() => {
            $('.dialog-buy').css('visibility', 'hidden');
        })

        //15 khi click btn buy trên dialog
        $('#btnBuy').click(() => {
            $('.dialog-buy').css('visibility', 'visible');
        })
    }

    /**
     * Đổ dữ liệu vào các dropdown
     * Author hieunv 26/07/2021
     * */
    loadDropdown() {
        //1.Dropdown loại khách hàng form
        this.loadDropdownData("CustomerType", 0)
  

        //2.Dropdown loại khách hàng filter
        this.loadDropdownData("CustomerType", 1);
 
    }

    /**
    * Load dữ liệu lên dropdown có tên trường tương ứng với fieldName
    * Auto select item đầu tiên trong sanh sách item
    * @param {any} fieldName
     */
    loadDropdownData(fieldName, isFilter) {
        var myUrl = "http://localhost:59749/api/CustomerTypes";
        if (isFilter == 1) fieldName += '1';
        $.ajax({
            url: myUrl,
            method: 'GET'
        }).done(res => {
            $(`#input${fieldName}Name .dropdown-data`).empty();
            $(`#input${fieldName}Name .dropdown-main p`).empty();
            if (isFilter == 1) {
                var name = "Tất cả loại khách hàng";
                $(`#input${fieldName}Name`).attr("value", '');
                let dropdownItemHTML = $(`<div valueid="" valuename="${name}" class="dropdown-item item-selected">
                                            <i class="fas fa-check"></i>
                                            <p>${name}</p>
                                        </div>`);
                $(`#input${fieldName}Name .dropdown-data`).append(dropdownItemHTML);
                $(`#input${fieldName}Name .dropdown-main p`).append(name);
                $(`#input${fieldName}Name`).attr("value", '');
            } else {
                $(`#input${fieldName}Name .dropdown-main p`).append(res[0][`${fieldName}Name`]);
                $(`#input${fieldName}Name`).attr("value", `${res[0][`${fieldName}Id`]}`);
            }
            $.each(res, function (idex, item) {
                var id = '';
                var name = '';
                if (isFilter == 1) {
                    name =  item[`CustomerTypeName`];
                    id = item[`CustomerTypeId`];
                } else {
                    name = item[`${fieldName}Name`];
                    id = item[`${fieldName}Id`];
                    console.log(id);
                }
                let dropdownItemHTML = $(`<div valueid="${id}" valuename="${name}" class="dropdown-item">
                                            <i class="fas fa-check"></i>
                                            <p>${name}</p>
                                        </div>`);
                $(`#input${fieldName}Name .dropdown-data`).append(dropdownItemHTML);
                if (id == $(`#input${fieldName}Name`).attr('value')) {
                    dropdownItemHTML.addClass('item-selected');
                }
            });
        })
    }

    /**
     * Xử lí sự kiện khi click vào button add
     * @param {any} e
     * Author hieunv 26/07/2021
     */
    btnAddOnClick(seft, thisElement) {
        $('#btnBuy').css('display', 'none');
        console.log(seft);
        seft.flagAdd = 1;
        $('.dialog').css("visibility", "visible");
        $('.dialog input').val(null);
        $('.dialog input').removeClass('border-red');
        $('.autofocus').focus();
        //lấy mã nhân viên mới binding vào form
        $.ajax({
            url: "http://localhost:59749/api/Customers/NewCustomerId",
            method: 'GET',

        }).done(res => {
            $('#inputEmployeeCode').val("KH-"+res);
        }).fail(res => {

        });
    }


    /**
     * Xử lí sư kiện khi click button delete
     * @param {any} seft
     * @param {any} thisElement
     * Author hieunv 27/07/2021
     */
    btnDeleteOnClick(seft, thisElement) {
        var customers = seft.checkedCustomers;
        var delSuccess = 0;
        $('.popup').css('display', 'block');
        PopupJS.showPopup('danger', 'Bạn có chắc chắn muốn xóa các bản ghi được chọn?', "Xóa các bản ghi!");
        $('.popup button.btn-z').click(() => {
            $.each(customers, function (index, item) {
                $.ajax({
                    url: "http://cukcuk.manhnv.net/v1/Employees/" + item,
                    method: 'DELETE'
                }).done(res => {
                    delSuccess++;
                    seft.checkedCustomers = seft.checkedCustomers.filter(e => e !== item);
                    seft.loadData();
                    ToolTipJS.showMes('success', "Đã xóa thành công " + delSuccess + "/" + (customers.length) + " bản ghi!")
                    $('#btnDelete').css('visibility', 'hidden');
                    $('.popup').css('display', 'none');
                }).fail(res => {
                    $('.popup').css('display', 'none');
                })
            })
        })
        $('.popup button.btn-y').click(() => {
            $('.popup').css('display', 'none');
        })
    }


    /**
     * Xử lí sự kiện khi click vào button exit trên form
     * @param {any} e
     */
    btnExitOnClick(seft, thisElement) {
        $('.dialog').css("visibility", "hidden");
    }

    /**
     * Xử lí sự kiện khi click button cancel
     * @param {any} seft
     * @param {any} thisElement
     * Author hieunv 26/07/2021
     */
    btnCancelOnClick(seft, thisElement) {
        $('.dialog').css("visibility", "hidden");
    }

    /**
     * Xử lí sự kiện khi click button refresh
     * @param {any} seft
     * @param {any} thisElement
     */
    btnRefreshOnClick(seft, thisElement) {
        seft.checkedCustomers = [];
        seft.loadData();
    }

    /**
     * Xử lí sự kiện khi click vào button save
     */
    btnSaveOnClick(seft, thisElement) {
        var myUrl = "http://cukcuk.manhnv.net/v1/Employees";
        var method = 'POST';
        if (seft.flagAdd != 1) {
            myUrl = "http://cukcuk.manhnv.net/v1/Employees/" + seft.myCustomerId;
            method = 'PUT';
        }
        var customerCode = $('#inputEmployeeCode').val();
        var fullName = $('#inputFullName').val();
        var identityNumber = $('#inputIdentityNumber').val();
        var email = $('#inputEmail').val();
        var phoneNumber = $('#inputPhoneNumber').val();
        if (!(customerCode == '' || fullName == '' )) {
            var mes = 'Bạn có chắc chắn muốn câp nhật bản ghi này?';
            var title = 'Chỉnh sửa bản ghi!';
            if (seft.flagAdd == 1) {
                mes = 'Bạn có chắc chắn muốn thêm bản ghi này?';
                title = 'Thêm mới bản ghi!';
            }
            PopupJS.showPopup('warning', mes, title);
            $('.popup').css('display', 'block');
            $('.popup button.btn-x').click(() => {
                var customer = {};
                customer.CustomerId = $('#inputEmployeeCode').val();
                customer.FullName = $('#inputFullName').val();
                customer.DateOfBirth = $('#inputDateOfBirth').val();
                customer.Gender = $('#inputGenderName').attr('value');
                customer.IdentityNumber = $('#inputIdentityNumber').val();
                customer.IdentityDate = $('#inputIdentityDate').val();
                customer.IdentityPlace = $('#inputIdentityPlace').val();
                customer.Email = $('#inputEmail').val();
                customer.PhoneNumber = $('#inputPhoneNumber').val();
                customer.PositionId = $('#inputPositionName').attr('value');
                customer.DepartmentId = $('#inputDepartmentName').attr('value');
                customer.PersonalTaxCode = $('#inputPersonalTaxCode').val();
                customer.Salary = $('#inputSalary').val().replaceAll('.', '');
                customer.JoinDate = $('#inputJoinDate').val();
                customer.WorkStatus = $('#inputWorkStatus').attr('value');
                // gọi ajax post dữ liệu
                $.ajax({
                    url: myUrl,
                    method: method,
                    data: JSON.stringify(customer),
                    dataType: 'json',
                    contentType: 'application/json'
                }).done(res => {
                    $('.dialog').css("visibility", "hidden");
                    $('.popup').css('display', 'none');
                    seft.loadData();
                    if (seft.flagAdd == 1) {
                        ToolTipJS.showMes('success', 'Thêm mới bản ghi thành công!');
                    } else {
                        ToolTipJS.showMes('success', 'Cập nhật bản ghi thành công!');
                    }
                    $('.popup').css('display', 'none');
                }).fail(res => {
                    ToolTipJS.showMes('danger', 'Đã có lỗi xảy ra!');
                });
            })
        } else {
            ToolTipJS.showMes('danger', "Bạn chưa nhập đủ các trường bắt buộc!");
        }
    }

    /**
     * Hiển thị form và đổ dữ liệu vào form thông tin người được chọn
     * @param {any} seft
     * @param {any} thisElement
     * Author hieunv 26/07/2021
     */
    tableRowOnDbClick(seft, thisElement) {
        $('#btnBuy').css('display', 'flex');
        seft.flagAdd = 0;
        $('.dialog input').removeClass('border-red');
        try {
            // Gọi api lấy dữ liệu
            const customerId = $(thisElement).attr('idobj');
            seft.myCustomerId = customerId;
            var myUrl = "http://cukcuk.manhnv.net/v1/Employees/" + customerId;
            $.ajax({
                url: myUrl,
                method: 'GET'
            }).done(function (res) {
                var customer = res;
                $('#inputEmployeeCode').val(res['EmployeeCode']);
                $('#inputFullName').val(res['FullName']);
                $('#inputDateOfBirth').val(CommonJS.formatDateToValue(res['DateOfBirth']));
                $('#inputGenderName').attr('value');
                //match drropdown GenderName
                var value1 = res['Gender'];
                seft.matchItemDropdown('GenderName', value1);
                $('#inputIdentityNumber').val(res['IdentityNumber']);
                $('#inputIdentityDate').val(CommonJS.formatDateToValue(res['IdentityDate']));
                $('#inputIdentityPlace').val(res['IdentityPlace']);
                $('#inputEmail').val(res['Email']);
                $('#inputPhoneNumber').val(res['PhoneNumber']);
                //match dropdown PostionName
                var value2 = res['PositionId'];
                seft.matchItemDropdown('PositionName', value2);
                //match dropdown DepartmentName
                var value3 = res['DepartmentId'];
                seft.matchItemDropdown('DepartmentName', value3);
                $('#inputPersonalTaxCode').val(res['PersonalTaxCode']);
                var valueSalary = res['Salary'];
                $('#inputSalary').val(CommonJS.formatSalary(valueSalary));
                $('#inputJoinDate').val(CommonJS.formatDateToValue(res['JoinDate']));
                //match dropdown WorkStatus
                var value4 = res['WorkStatus'];
                seft.matchItemDropdown('WorkStatus', value4);
            }).fail(function (res) {

            })

            $('.dialog').css("visibility", "visible");
            $('.autofocus').focus();
        } catch (e) {

        }
    }

    /**
     * load dữ liệu của người được chọn lên các dropdown
     * @param {any} fieldName
     * @param {any} value
     * Author hieunv 26/07/2021
     */
    matchItemDropdown(fieldName, value) {
        var myDropdownItems = $(`#input${fieldName} .dropdown-data .dropdown-item`);
        $(`#input${fieldName}`).attr('value', value);
        $.each(myDropdownItems, function (index, item) {
            $(item).removeClass('item-selected');
            if (value == $(item).attr('valueid')) {
                $(item).addClass('item-selected');
                $(`#input${fieldName} .dropdown-main p`).empty();
                $(`#input${fieldName} .dropdown-main p`).append($(item).attr('valuename'));
            }
        });
    }


    /**
     * Cảnh báo khi bỏ trống trường bắt buộc
     * @param {any} seft
     * @param {any} thisElement
     * Author hieunv 26/07/2021
     */
    requiredNote(seft, thisElement) {
        let value = $(thisElement).val();
        if (value == '') {
            // chuyển border thành màu đỏ cảnh báo và khi hover hiện thông tin cảnh báo
            $(thisElement).addClass('border-red');
            $(thisElement).attr('title', 'Thông tin này bắt buộc nhập!');
            ToolTipJS.showMes('danger', 'Thông tin này bắt buộc nhập!')
        } else {
            $(thisElement).removeClass('border-red');
            $(thisElement).removeAttr('title');
        }
    }

    /**
     * xử lí sự kiện khi click vào checkbox trên các hàng
     * @param {any} seft
     * @param {any} thischeck
     */
    checkcheck(seft, thisElement) {
        var thischeck = $(thisElement);
        if (thischeck.is(":checked")) {
            thischeck.parents('tr').css('background-color', "#E3F3EE");
            seft.checkedCustomers.push($(thisElement).parents('tr').attr('idobj'));
            $('#btnDelete').css('visibility', 'visible');
        } else {

            if (thischeck.parents('tr').attr('bgindex') % 2 == 0) {
                thischeck.parents('tr').css('background-color', '#FFF3EB');
            } else {
                thischeck.parents('tr').css('background-color', "#ffffff");
            }

            seft.checkedCustomers = seft.checkedCustomers.filter(e => e !== thischeck.parents('tr').attr('idobj'));
            if (seft.checkedCustomers == 0) {
                $('#btnDelete').css('visibility', 'hidden');
            }
        }
    }


    /**
     * format tiềnlương khi input
     * @param {any} seft
     * @param {any} thisElement
     * Author hieunv 27/07/2021
     */
    inputSalaryOnKeyup(seft, thisElement) {
        var valueSalary = $(thisElement).val().replaceAll('.', '');
        $(thisElement).val(CommonJS.formatSalary(valueSalary));
    }

    /**
     * Xử lí menu collapse khi click button toggle
     * @param {any} seft
     * @param {any} thisElement
     * Author hieunv 27/07/2021
     */
    btnToggleOnClick(seft, thisElement) {
        /*e.preventDefault();*/
        if ($('.menu').width() > 50) {
            $('.menu').width(48);
            $('.menu p').hide();
            $('.menu .menu-header .logo').hide();
            $(".content").animate(
                {
                    left: "52px",
                    width: "100%",
                },
                0,
                () => {
                    $(".content").css("width", "calc(100% - 52px)")
                }
            )
        } else {
            $('.menu').width(225);
            setTimeout(function () {
                $('.menu p').show();
                $('.menu .menu-header .logo').show();
            }, 500);
            $(".content").animate(
                {
                    left: "227px",
                },
                0,
                () => {
                    $(".content").css("width", "calc(100% - 227px)")
                }
            )
        }
    }
}