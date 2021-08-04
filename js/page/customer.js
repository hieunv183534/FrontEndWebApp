$(document).ready(function () {
    new CustomerJS();
})

/**
 * Class quản lí các sự kiện cho trang employee
 * */
class CustomerJS extends BaseJS{
    constructor() {
        super();
    }

    setDataUrl() {
        this.dataUrl = "http://cukcuk.manhnv.net/v1/Employees";
    }
}


