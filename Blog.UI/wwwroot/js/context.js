var Site = {

    Ajax: function (_url, _data, _method, success, _contentType) {
        $.LoadingOverlay('show');

        if (_contentType == undefined) {
            _contentType = "application/x-www-form-urlencoded"
            //_contentType = "application/x-www-form-urlencoded"
        }

        $.ajax({
            type: _method,
            url: _url,
            dataType: 'json',
            contentType: _contentType,
            data: _data,
            //async: true
        })
            .done(function (result) {
                $.LoadingOverlay('hide');

                if (result == "SessionTimeout") {
                    window.location.href = window.location.origin + '/Account/Login'
                    return;
                } else {
                    success(result);
                }
            })
            .fail(function (xhr, textStatus, errorThrow) {
                $.LoadingOverlay('hide');
                Site.ShowMessage(400, textStatus + ':' + errorThrow);
            });
    },
    NonOverLayAjax: function (_url, _data, _method, success, _contentType) {

        if (_contentType == undefined) {
            _contentType = "application/x-www-form-urlencoded"
            //_contentType = "application/x-www-form-urlencoded"
        }

        $.ajax({
            type: _method,
            url: _url,
            dataType: 'json',
            contentType: _contentType,
            data: _data,
            //async: true
        })
            .done(function (result) {
                //$.LoadingOverlay('hide');

                if (result == "SessionTimeout") {
                    window.location.href = window.location.origin + '/Account/Login'
                    return;
                } else {
                    success(result);
                }
            })
            .fail(function (xhr, textStatus, errorThrow) {
                //$.LoadingOverlay('hide');
                Site.ShowMessage(400, textStatus + ':' + errorThrow);
            });
    },
    ShowMessage: function (status, message) {

        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 3500
        };

        if (status == 200) {
            toastr.success(message);
        } else if (status == 1) {
            toastr.info(message);
        } else {
            toastr.error(message);
        }
    },

    ClearForm: function (parentElement) {
        $(parentElement + " :input").each(function () {
            switch ($(this).prop('nodeName')) {
                case "SELECT":
                    //$(this).val("0");
                    //$(this).select2("val", "");
                    $(this).prop('selectedIndex', 0);
                    break;
                case "INPUT":
                    $(this).val("");
                    break;
                case "TEXTAREA":
                    $(this).val("");
                    break;
                default:
                    break;
            }
        });
    },

    //Only Number Key press - REFECTOR
    OnlyNumbersForInput: function (element) {

        $(element).keypress(function () {
            var c = event.keyCode;
            if (c == 13) {
                return false;
            }
            else {
                var text = event.key;
                if (!text.match('^[0-9]+$'))
                    return false;
            }
        });

    },
    FormatDate: function name(_date, _format) {
        var myDate = moment(_date, _format);
        const today = new Date(myDate);
        today.setDate(today.getDate());
        var newFormat = moment(today).format("YYYY-MM-DD");
        return newFormat;
    },
    //2021-01-29T00:00:00
    DateFormat: function (data) {
        var date = data.replace('T00:00:00', '');
        var datesplit = date.split('-');
        return datesplit[2] + '-' + datesplit[1] + '-' + datesplit[0];
    },
    ConvertForDatePicker: function (data) {
        var datesplit = data.split('/');
        return datesplit[0] + '-' + datesplit[1] + '-' + datesplit[2];
    },
    DateFormatPostgre: function (data) {
        var date = data.replace('T00:00:00+03:00', '');
        var datesplit = date.split('-');
        return datesplit[2] + ' / ' + datesplit[1] + ' / ' + datesplit[0];
    },

    DateFormatVisitPlaning: function (data) {
        //14/01/2020 11:20:06
        var datasplit = data.split(' ');
        var date = datasplit[0].split('/');
        var hour = datasplit[1].split(':');
        return date[2] + '-' + date[1] + '-' + date[0] + ' ' + hour[0] + ':' + hour[1];
    },

    WorkPlaningDateFormatVisitPlaning: function (data) {
        //14/01/2020
        var datasplit = data.split(' ');
        var date = datasplit[0].split('/');
        return date[2] + '-' + date[1] + '-' + date[0];
    },
    DateFormatSecretWaybill: function (data) {
        //2021-03-14T00:00:00Z
        //"2021-01-22"
        var date = data.split('T');
        var datesplit = date[0].split('-');
        return datesplit[0] + '-' + datesplit[1] + '-' + datesplit[2]
    },
    DateFormatWaybill: function (data) {
        //2021-03-14T00:00:00Z
        var date = data.split('T');
        var datesplit = date[0].split('-');
        return datesplit[2] + '.' + datesplit[1] + '.' + datesplit[0]
    },
    DateFormantPostgre: function (data) {
        var date = data.replace('T00:00:00', '');
        var datesplit = date.split('-');
        return datesplit[2] + ' - ' + datesplit[1] + ' - ' + datesplit[0];
    },
    DateFormatPostgreTimeWithHour: function (data) {
        //2020-10-21T10:32:13.576492
        var datesplit = data.split('T');
        var hour = datesplit[1].split(':');
        var second = hour[2].split('.');
        var date = datesplit[0].split('-');
        return date[2] + '-' + date[1] + '-' + date[0] + ' ' + hour[0] + ':' + hour[1] + ':' + second[0];
    },

    DateSplitHourForDate: function (data) {
        var date = data.split(' ');
        return date[0];
    },

    DateSplitHourForHour: function (data) {
        var date = data.split(' ');
        return date[1];
    },
    GetNextMonth: function () {
        var tdate = new Date();

        if (tdate.getDate() < 10) {
            var dd = "0" + tdate.setDate(tdate.getDate() - 30);//yields day
        }
        else {
            var dd = tdate.setDate(tdate.getDate() - 30);//yields day
        }

        if (tdate.getMonth() < 10) {
            var MM = "0" + tdate.getMonth(); //yields month
        }
        else {
            var MM = tdate.getMonth(); //yields month
        }
        var yyyy = tdate.getFullYear();//yields year    


        var currentDate = dd + '-' + (MM + 1) + '-' + yyyy;

        return currentDate;
    },
    GetTodayDate: function () {
        var tdate = new Date();

        if (tdate.getDate() < 10) {
            var dd = "0" + tdate.getDate();//yields day
        }
        else {
            var dd = tdate.getDate();//yields day
        }

        if (tdate.getMonth() + 1 < 10) {
            var m = tdate.getMonth() + 1;
            var MM = "0" + m; //yields month
        }
        else {
            var MM = tdate.getMonth() + 1; //yields month
        }
        var yyyy = tdate.getFullYear();//yields year

        if (tdate.getHours() < 10) {
            var HH = "0" + tdate.getHours();//yield hour
        }
        else {
            var HH = tdate.getHours();//yield hour
        }

        if (tdate.getMinutes() < 10) {
            var mm = "0" + tdate.getMinutes();//yield minutes
        }
        else {
            var mm = tdate.getMinutes();//yield minutes
        }

        if (tdate.getSeconds() < 10) {
            var ss = "0" + tdate.getSeconds();//yield seconds
        }
        else {
            var ss = tdate.getSeconds();//yield seconds
        }

        var currentDate = dd + '/' + MM + '/' + yyyy + " " + HH + ":" + mm + ":" + ss;

        return currentDate;
    },

    JustGetTodayDate: function () {
        var tdate = new Date();
        if (tdate.getDate() < 10) {
            var dd = "0" + tdate.getDate();//yields day
        }
        else {
            var dd = tdate.getDate();//yields day
        }

        if (tdate.getMonth() < 10) {
            var MM = "0" + tdate.getMonth(); //yields month
        }
        else {
            var MM = tdate.getMonth(); //yields month
        }
        var yyyy = tdate.getFullYear();//yields year

        var currentDate = dd + '/' + (MM + 1) + '/' + yyyy;

        return currentDate;
    },

    RemoveArrayItem: function (arrayList, removeItem) {
        //return jQuery.grep(arrayList, function (value) {
        //    return value != removeItem;
        //});
        $.each(arrayList, function (index, v) {
            if (v.id == removeItem) {
                arrayList.splice(index, 1);
            }
        });
    },

    OpenModalPage: function (url, title) {
        MustangModal.prop({
            title: title,
            animate: "toggle",
            speed: 400,
            height: 350,
        }).load(url, undefined, undefined, 'myApp').open();
    },

    DataTable: function (element, columns, data) {
        var datatable = $(element).dataTable();
        datatable.fnDestroy();

        if ($.fn.dataTable.isDataTable(element)) {
            var oTable = $(element).DataTable();
            oTable.destroy();
        }

        var datatable = $(element).dataTable({

            data: data,
            columns: columns,
            lengthMenu: [[5, 15, 25, 50], [5, 15, 25, 50]],
            pageLength: 15,
            responsive: true,
            dom: '<"html5buttons"B>lTfgitp',
            language: {
                url: '/js/plugins/dataTables/turkish.json'
            },
            buttons: [
                //{ extend: 'copy' },
                //{ extend: 'csv' },
                { extend: 'excelHtml5', title: 'File' },
                //{ extend: 'pdf', title: 'File' },
                {
                    extend: 'print',
                    customize: function (win) {
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }
            ],
        });

        return datatable;
    },
    DataTableInventoryButton: function (fileName, storecode, date, totalKG, totalST, total) {
        var d = [
            {
                extend: 'excelHtml5',
                title: fileName + " - " + storecode,
                text: '<i class="bx bxs-file"> Excel</i>',
                className: "btn btn-primary !important",
                header: true,
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 6, 7, 8, 12]
                },
                customizeData: function (data) {


                    var oldDataBody = data.body;
                    data.body = [];
                    data.body.push(data.header)
                    data.header = [];
                    for (var i = 0; i < oldDataBody.length; i++) {
                        data.body.push(oldDataBody[i]);
                    }
                    var KG = [];
                    KG.push("Toplam KG:");
                    KG.push(totalKG);
                    var kgcount = KG.length;
                    for (var i = 0; i < data.body[0].length - kgcount; i++) {
                        KG.push("")
                    }
                    data.body.push(KG)

                    var ST = [];
                    ST.push("Toplam Adet:");
                    ST.push(totalST);
                    var stcount = ST.length;
                    for (var i = 0; i < data.body[0].length - stcount; i++) {
                        ST.push("");
                    }
                    data.body.push(ST)

                    var Total = [];
                    Total.push("Toplam Tutar:");
                    Total.push(total);
                    var Totalcount = Total.length;
                    for (var i = 0; i < data.body[0].length - Totalcount; i++) {
                        Total.push("");
                    }
                    data.body.push(Total)

                    data.header.push("Mağaza: " + storecode)
                    data.header.push(fileName);
                    data.header.push(date)
                    for (var i = 0; i < data.body.length; i++) {
                        for (var j = 0; j < data.body[i].length; j++) {
                            if (j != 8) {
                                data.body[i][j] = '\u200C' + data.body[i][j];
                            }

                        }
                    }
                }
            },
            {
                title: fileName + " - " + storecode,
                extend: 'pdfHtml5',
                footer: true,
                text: '<i class="bx bxs-file-pdf"> PDF</i>',
                className: "btn btn-primary",
                pageSize: 'A4',
                exportOptions: {
                    columns: [4, ':visible'],
                    columns: [0, 1, 2, 3, 4, 6, 7, 8, 12, 14]
                },
                customize: function (doc) {
                    $.LoadingOverlay('show');
                    //var logo = "";
                    doc['header'] = (function () {
                        return {
                            columns: [
                                //{
                                //    image: logo,
                                //    width: 24
                                //},
                                {
                                    text: "Mağaza: " + storecode,
                                    fontSize: 10,
                                    margin: [10, 0]
                                },
                                {
                                    text: fileName,
                                    fontSize: 10
                                },
                                {
                                    text: date,
                                    fontSize: 10
                                }
                            ],
                            margin: 15
                        }
                    });
                    var kg = totalKG.toFixed(3).toString()
                    var st = totalST.toString()
                    var totalst = total.toFixed(3).toString()
                    doc['footer'] = (function (page, pages) {
                        return {
                            columns: [
                                {
                                    text: ["Toplam KG: ", { text: kg }],
                                    bold: true,
                                    alignment: 'center'
                                },
                                {
                                    text: ["Toplam Adet: ", { text: st }],
                                    bold: true,
                                    alignment: 'center'
                                },
                                {
                                    text: ["Toplam Tutar: ", { text: totalst }],
                                    bold: true,
                                    alignment: 'center'
                                },
                                {
                                    alignment: 'center',
                                    text: [
                                        'Sayfa ',
                                        { text: page.toString(), italics: true },
                                        ' / ',
                                        { text: pages.toString(), italics: true }
                                    ]
                                }
                            ],
                            margin: 0
                        }
                    });
                    for (var i = 1; i < doc.content[1].table.body.length; i++) {
                        if (doc.content[1].table.body[i][7].text == "İrsaliye") {
                            doc.content[1].table.body.splice(i, 1);
                        }
                    }
                    doc.content[0].margin = [0, 0, 0, 0];

                    doc.content[1].table.body[0][4].text = "Koli içi"
                    doc.content[1].table.body[0][5].text = "Açıklama"
                    doc.content[1].table.body[0][6].text = "Miktar"
                    doc.content[1].table.body[0][8].text = "Tutar"
                    //doc.content[1].table.body[0][8].text = "Lok."
                    //doc.content[1].table.body[0][9].text = "NOT"

                    doc.content.splice(0, 1);

                    doc.styles.tableBodyEven.fontSize = 7;

                    doc.styles.tableBodyOdd.fontSize = 7;

                    doc.styles.tableHeader.fontSize = 7;


                    var objLayout = {};
                    objLayout['hLineWidth'] = function (i) { return .5; };
                    objLayout['vLineWidth'] = function (i) { return .5; };
                    objLayout['hLineColor'] = function (i) { return '#aaa'; };
                    objLayout['vLineColor'] = function (i) { return '#aaa'; };
                    objLayout['paddingLeft'] = function (i) { return 4; };
                    objLayout['paddingRight'] = function (i) { return 4; };
                    doc.content[0].layout = objLayout;
                    $.LoadingOverlay('hide');
                }
            }
        ]
        return d;
    },
    DataTableTomButton: function () {
        var d = [
            {
                extend: 'print',
                text: 'Print',
                customize: function (win) {
                    var body = $(win.document.body).find('table tbody')
                    $(body).append($(body).find('tr:eq(0)').clone())
                    var row = $(body).find('tr').last();
                    var text = $("#total").text();
                    var words = text.split(" ");
                    $(row).find('td:eq(0)').text("Adedi: " + words[3]);
                    $(row).find('td:eq(1)').text("Tutarı: " + words[7]);
                    $(row).find('td:eq(2)').text("");
                    $(row).find('td:eq(3)').text("");
                    $(row).find('td:eq(4)').text("");
                    $(row).find('td:eq(5)').text("");
                }
            },
            {
                extend: 'excelHtml5',
                text: 'Excel',
                "customizeData": function (data) {
                    var text = $("#total").text();
                    var words = text.split(" ");
                    data.header.push("Adedi");
                    data.header.push("Tutarı");
                    data.body[0].push(words[3]);
                    data.body[0].push(words[7]);
                }
            },
        ]
        return d;
    },
    DataTableButton: function () {
        var d = [
            {
                extend: 'excelHtml5',
                text: 'Excel',
                customizeData: function (data) {
                    for (var i = 0; i < data.body.length; i++) {
                        for (var j = 0; j < data.body[i].length; j++) {
                            data.body[i][j] = '\u200C' + data.body[i][j];
                        }
                    }
                }
            },
            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]
        return d;
    },
    InvetoryReportButton: function (region, startdate, enddate) {
        var d = [
            { extend: 'excelHtml5', title: 'MSMSY Rapor ' + region + '-' + startdate + '-' + enddate }

        ]
        return d;
    },
    WareHouseDataTableButton: function (kyp) {
        var d = [
            {
                extend: 'excelHtml5', title: 'TESLİMAT_' + kyp,
                customizeData: function (data) {
                    for (var i = 0; i < data.body.length; i++) {
                        for (var j = 0; j < data.body[i].length; j++) {
                            data.body[i][j] = '\u200C' + data.body[i][j];
                        }
                    }
                },
            },
            {
                extend: 'pdf',
                title: 'TESLİMAT ' + kyp,
                text: 'PDF',
                pageSize: 'A4',
                exportOptions: {
                    /*modifier: {
                        page: 'current'
                    }*/
                },
                customize: function (doc) {
                    doc.content[0].margin = [0, 0, 0, 0];
                    doc.styles.tableHeader.fontSize = 9;
                    doc.defaultStyle.fontSize = 7; //<-- set fontsize to 16 instead of 10 
                }
            }

            //{
            //    extend: 'print',
            //    title: '',
            //    customize: function (win) {
            //        $(win.document.body).addClass('white-bg');
            //        $(win.document.body).css('font-size', '8px');

            //        $(win.document.body).find('table')
            //            .addClass('compact')
            //            .css('font-size', 'inherit')
            //    }
            //}
        ]
        return d;
    },
    GetQuerString: function (param) {
        var queryparams = window.location.search;
        //using URLSearchParams to extract the querystring parameter
        if (queryparams && typeof (queryparams) === "string" && queryparams.length > 0) {
            var urlParams = new URLSearchParams(window.location.search);
            var paramid = urlParams.get(param);
            return paramid;
        }
    },
    Validation: function (_element) {
        var isValid = true;
        if (_element == "") {
            $('.validateInput').parsley();
            $('.validateInput').each(function () {
                if ($(this).parsley().validate() !== true) isValid = false;
                if ($(this).parsley().value == '') isValid = false;
            });
        } else {
            $(_element).parsley();
            $(_element).each(function () {
                if ($(this).parsley().validate() !== true) isValid = false;
            });
        }
        return isValid;
    },
    EmptyControl: function (element, baseelement) {
        var value = $(baseelement + ' ' + element).val();
        if (value == null || value == "" || value == 0 || value == "SECINIZ" || value == []) {
            $(element).addClass("get-error-select");
            $(baseelement + " .get-error").remove();
            $(baseelement).append('<div class="get-error">Bu alanı boş bırakamazsınız.</div>');
            return 0
            //  $('.get-error').show();
        }
        else if (value != null || value == "" || value != 0 || value != "SECINIZ" || value != []) {
            $(element).removeClass("get-error-select");
            $(baseelement + " .get-error").remove();
            return 1
            // $('.get-error').hide();
        }
    },
    RedirectLogin: function () {
        window.location.href = window.location.origin + '/Account/Login'
        return;
    },
    AddSelectOptionForSelect: function (selectid) {

        $(selectid).empty();
        var o = new Option("SECINIZ", "Seçiniz");
        $(o).html("Seçiniz");
        $(selectid).append(o).select2({
            tags: true
        });
    },
    AddOptionForSelect: function (selectid, text, value) {

        var o = new Option(text, value);
        $(o).html(text);
        $(selectid).append(o).select2({
            tags: true
        });
    },
    WayBillPrint: function (contentdiv, data, redirectpage) {
        debugger;
        //$(contentdiv).html(decodeURIComponent(escape(window.atob(data))));
        $(contentdiv).html(data);
        var printContents = $(contentdiv).html(); // document.getElementById(contentdiv).innerHTML;
        document.body.innerHTML = printContents;
        document.title = '';
        window.print();
        $(contentdiv).empty();
        window.location.href = redirectpage;
    },
    getDayName: function (date) {
        var weekday = new Array(7);
        weekday[0] = "Pazar";
        weekday[1] = "Pazartesi";
        weekday[2] = "Salı";
        weekday[3] = "Çarşamba";
        weekday[4] = "Perşembe";
        weekday[5] = "Cuma";
        weekday[6] = "Cumartesi";
        return weekday[date.getDay()];
    },
    create_UUID: function () {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }
};