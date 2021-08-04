
// Xử lí vị trí scrollbar table ------------------------------------------------
$('table').on('scroll', function () {
    $("table > *").width($("table").width() + $("table").scrollLeft());
});
