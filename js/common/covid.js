setInterval(() => {
    var date = new Date();
    var day = date.getDate();
    day = (day < 10) ? '0' + day : day;
    var month = date.getMonth() + 1;
    month = (month < 10) ? '0' + month : month;
    var year = date.getFullYear();
    var h = date.getHours();
    h = (h < 10) ? '0' + h : h;
    var m = date.getMinutes();
    m = (m < 10) ? '0' + m : m;
    var s = date.getSeconds();
    s = (s < 10) ? '0' + s : s;
    let time = h + ":" + m + ":" + s + "    " + day + "-" + month + "-" + year;
    $('.covid-header p span').empty();
    $('.covid-header p span').append(time);
}, 1000);


$(document).ready(function () {
    loadDataCovidTotal();
    loadDataCovidVN();
})


function loadDataCovidTotal() {
    // Gọi api lấy dữ liệu
    $.ajax({
        url: "https://disease.sh/v3/covid-19/all",
        method: 'GET'
    }).done(res => {
        //bind vào mục thế giới
        bindingTotal(res);
        ////bind lấy thông tin chung của việt nam và bind lên mục việt nam
        //var ct = res.Countries;
        //var vn = ct.find(item => item.CountryCode == 'VN');
        //bindingVN(vn);
    }).fail(res => {
        console.log(res);
    })
}

function bindingTotal(data) {
    $('.covid-total .confirmed .new span').empty();
    $('.covid-total .confirmed .new span').append(CommonJS.formatSalary(data.todayCases));
    $('.covid-total .confirmed .total span').empty();
    $('.covid-total .confirmed .total span').append(CommonJS.formatSalary(data.cases));
    $('.covid-total .deaths .new span').empty();
    $('.covid-total .deaths .new span').append(CommonJS.formatSalary(data.todayDeaths));
    $('.covid-total .deaths .total span').empty();
    $('.covid-total .deaths .total span').append(CommonJS.formatSalary(data.deaths));
    $('.covid-total .recovered .new span').empty();
    $('.covid-total .recovered .new span').append(CommonJS.formatSalary(data.todayRecovered));
    $('.covid-total .recovered .total span').empty();
    $('.covid-total .recovered .total span').append(CommonJS.formatSalary(data.recovered));
}


function loadDataCovidVN() {
    // Gọi api lấy dữ liệu
    $.ajax({
        url: "https://disease.sh/v3/covid-19/countries/vietnam",
        method: 'GET'
    }).done(res => {
        //bind vào mục việt nam
        bindingVN(res);
    }).fail(res => {
        console.log(res);
    })
}

function bindingVN(data) {
    $('.covid-vn .confirmed .new span').empty();
    $('.covid-vn .confirmed .new span').append(CommonJS.formatSalary(data.todayCases));
    $('.covid-vn .confirmed .total span').empty();
    $('.covid-vn .confirmed .total span').append(CommonJS.formatSalary(data.cases));
    $('.covid-vn .deaths .new span').empty();
    $('.covid-vn .deaths .new span').append(CommonJS.formatSalary(data.todayDeaths));
    $('.covid-vn .deaths .total span').empty();
    $('.covid-vn .deaths .total span').append(CommonJS.formatSalary(data.deaths));
    $('.covid-vn .recovered .new span').empty();
    $('.covid-vn .recovered .new span').append(CommonJS.formatSalary(data.todayRecovered));
    $('.covid-vn .recovered .total span').empty();
    $('.covid-vn .recovered .total span').append(CommonJS.formatSalary(data.recovered));
}