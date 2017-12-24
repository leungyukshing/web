(function () {
    window.onload = function() {
        var all_th = $('th');
        var table_index = 0;
        var col_index = 0;

        var col_per_table = [];
        // get all the table
        var all_table = $('table');
        // get all the columns
        for (var i = 0; i < all_table.length; i++) {
            // get the columns number of table[i]
            var columns = all_table[i].rows[0].cells.length;
            col_per_table.push(columns);
        }
        for (var th_index = 0; th_index < all_th.length; th_index++, col_index++) {
            // move to the next table
            if (col_index == col_per_table[table_index]) {
                table_index++;
                col_index = 0;
            }
            // use closure to make sure each th'listener  distincts with each other
            (function(all_th, table_index, th_index, col_index) {
                all_th[th_index].addEventListener("click", function() {
                    sort(table_index, th_index, col_index);
                });
            })(all_th, table_index, th_index, col_index);
        }
    }

    function sort(table_index, th_index, col_index) {
        var now_table = $('table')[table_index];
        var now_th = $('th')[th_index];
        // modify the css of th
        if (now_th.id == "ascend")
            now_th.id = "descend";
        else
            now_th.id = "ascend";

        // show the icon(present th)
        if (now_th.className == "ascend")
            now_th.className = "descend";
        else
            now_th.className = "ascend";

        // clear other th in the same table
        var th = $('th');
        if (table_index == 0) {
            for (var i = 0; i < 3; i++) {
                if (i == th_index)
                    continue;
                th[i].className = "";
                th[i].id = "";
            }
        }
        else {
            for (var j = 3; j < 6; j++) {
                if (j == th_index)
                    continue;
                th[j].className = "";
                th[j].id = "";
            }
        }
        // sort the table!!
        var row = now_table.rows.length;
        for (var i = 1; i < row; i++) {
            for (var j = i + 1; j < row; j++) {
                if (!cmp(now_table.rows[i].cells[col_index].innerText, 
                    now_table.rows[j].cells[col_index].innerText, now_th.id)) {
                    //必须使用innerHTML,否则表格不能正确获取tr格式
                    var tmp = now_table.rows[i].innerHTML;
                    now_table.rows[i].innerHTML = now_table.rows[j].innerHTML;
                    now_table.rows[j].innerHTML = tmp;
                }
            }
        }
    }


    function cmp(para1, para2, order) {
        //judge whether it is a date format
        var reg= /^[a-zA-Z]/;
        var isDate = !(reg.test(para1) || reg.test(para2));
        // is date
        if (isDate) {
            var date1 = new Date(Date.parse(para1));
            var date2 = new Date(Date.parse(para2));
        }
        // compare
        if (order == "ascend") {
            if (isDate && date1 < date2)
                return true;
            if (!isDate && para1 < para2)
                return true;
        }
        if (order == "descend") {
            if (isDate && date1 > date2)
                return true;
            if (!isDate && para1 > para2)
                return true;
        }
        return false;
    }
})();