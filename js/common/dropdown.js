


$('.dropdown .dropdown-data').on('click', '.dropdown-item',


    function selectItemDropdown(e) {
        /*e.preventDefault;*/
        var items = $(this).parents('.dropdown-data').find('.dropdown-item');
        $.each(items, function (index, item) {
            $(item).removeClass('item-selected');
        })

        $(this).addClass('item-selected');
        $(this).parents('.dropdown').find('.dropdown-main p').empty();
        var thisValueId = $(this).attr("valueid");
        var thisValueName = $(this).attr("valuename");
        $(this).parents('.dropdown').attr("value", thisValueId);
        $(this).parents('.dropdown').find('.dropdown-main p').append(thisValueName);

        if ($(this).parents('.dropdown').attr('id') == 'inputDepartment1Name') {
            filterByDepartment();
        } else if ($(this).parents('.dropdown').attr('id') == 'inputPosition1Name') {
            filterByPosition();
        }
    }

);

/**
 * lọc nhân viên theo phòng ban
 * */
function filterByDepartment() {
    if ($('#inputDepartment1Name').attr('value') == '') {
        myEmployee.loadData();
    } else {
        $('.grid table tbody').empty();
        var id = $('#inputDepartment1Name').attr('value');
        console.log(id);
        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Employees/employeeFilter?pageSize=20&pageNumber=1&employeeFilter=nv&departmentId=" + id,
            method: 'GET'
        }).done(function (res) {
            console.log(res);
            myEmployee.bindingData(res['Data']);
        }).fail(res => {
            ToolTipJS.showMes('warning', 'Lỗi rồi!');
            myEmployee.loadData();
        })
    }
}

/**
 * lọc nhân viên theo vị trí
 * */
function filterByPosition() {
    if ($('#inputPosition1Name').attr('value') == '') {
        myEmployee.loadData();
    } else {
        $('.grid table tbody').empty();
        var id = $('#inputPosition1Name').attr('value');
        $.ajax({
            url: "http://cukcuk.manhnv.net/v1/Employees/employeeFilter?pageSize=20&pageNumber=1&employeeFilter=nv&positionId=" + id,
            method: 'GET'
        }).done(function (res) {
            console.log(res);
            myEmployee.bindingData(res['Data']);
        }).fail(res => {
            ToolTipJS.showMes('warning', 'Lỗi rồi!');
            myEmployee.loadData();
        })
    }
}


