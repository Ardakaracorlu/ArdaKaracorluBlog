/*IHTIYAC DUYULAN KUTUPHANELER*/
/*
BOOTSTRAP
JQUERY
JQUERY VALIDATION
DATEPICKER
SWEETALERT
SWEETALERT2
TOSTR
LOADINGOVERLAY
MOMENT
*/
//$(document).ready(function () {
//    init();
//})
//function init() {
//    A101LIB.Validation("");
//}
var A101LIB = {
    /*START AJAX*/
    Ajax: function name(_url, _data, _method, _retVal) {
        $.ajax({
            url: _url,
            data: _data,
            type: _method,
            dataType: 'json',
            cache: false,
            beforeSend: function (xhr) {
                A101LIB.ShowLoading();
            }
        })
            .done(function (result) {
                if (result == "SessionTimeout") {
                    //window.location.href = window.location.origin + '/Account/Login'
                    window.location.href = window.location.origin + '/Home/SessionTimeOut'
                    return;
                } else {
                    if (result.isError) {
                        A101LIB.ShowErrorSwal2("Hatalı Dönüş!", result.message);
                        A101LIB.ShowErrorMessage("Hata!");
                    } else {
                        //A101LIB.ShowSuccessMessage("Başarılı!");
                        _retVal(result);
                    }
                }
                A101LIB.HideLoading();
            })
            .fail(function (xhr, textStatus, errorThrow) {
                A101LIB.HideLoading();
                A101LIB.ShowErrorMessage(textStatus + ':' + errorThrow);
            });
    },
    /*END AJAX*/
    /*START DATATABLE*/
    Datatable: function name(_tableName, _data, _order, _columns, _buttons, _search, _footerCallback, _retVal) {
       
        var datatable = $(_tableName).DataTable();
        if (_buttons == "") {
            //_buttons = [
            //    'excelHtml5',
            //    'print'
            //];
            _buttons = [];
        }

        datatable = $(_tableName).DataTable({
            destroy: true,
            data: _data,
            order: [],
            lengthMenu: [[50, 100, 250, 500], [50, 100, 250, 500]],
            pageLength: 100,
            responsive: true,
            deferRender: true,
            processing: true,
            searching: _search,
            language: {
                url: '/js/pages/tr.json'
            },
            buttons: _buttons,
            columns: _columns,
            footerCallback: _footerCallback

        });
        _retVal = datatable;
    },
    ServersideDatatable: function name(params) {

    },
    DatatableWithAjax: function name(params) {

    },
    /*END DATATABLE*/
    /*START DATEPICKER*/
    DatePicker: function name(params) {

    },
    /*END DATEPICKER*/
    /*START FORM PROCESS*/
    ClearForm: function name(params) {

    },
    OnlyNumber: function name(params) {

    },
    OnlyText: function name(params) {

    },
    OnlyEnglish: function name(params) {

    },
    ValidateForm: function name(params) {

    },
    ValidateInput: function name(params) {

    },
    /*END FORM PROCESS*/
    /*START DATE PROCESS*/
    FormatDate: function name(_date, _format) {
        var myDate = moment(_date, _format);
        const today = new Date(myDate);
        today.setDate(today.getDate());
        var newFormat = moment(today).format("YYYY-MM-DD");
        return newFormat;
    },
    GetDate: function name(params) {
        const d = new Date();
        const month = (+d.getMonth()) + (+1);
        return d.getDate() + "-" + month + "-" + d.getFullYear();
    },
    GetDateDay: function name(params) {
        const d = new Date();
        return d.getDate();
    },
    GetDateMonth: function name(params) {
          d = new Date();
        return d.getMonth()+1;
    },
    GetDateYear: function name(params) {
        const d = new Date();
        return d.getFullYear() ;
    },
    /*END DATE PROCESS*/
    /*START SWAL*/
    ShowErrorSwal: function name(params) {

    },
    ShowSuccesSwal: function name(params) {

    },
    ShowInfoSwal: function name(params) {

    },
    ShowErrorSwal2: function name(_title, _message) {
        Swal.fire({
            type: "error",
            title: _title,
            text: _message,
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Tamam"
        })
    },
    ShowSuccesSwal2: function name(_title, _message, _isRefresh) {
        Swal.fire({
            type: "success",
            title: _title,
            text: _message,
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Tamam"
        }).then((result) => {
            if (_isRefresh) {
                location.reload();
            }
        });
    },
    ShowInfoSwal2: function name(_title, _message) {
        Swal.fire({
            type: "info",
            title: _title,
            html: _message,
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Tamam"
        })
    },
    ShowQuestionSwal2: function name(_title, _message, _html ,_retVal) {
        Swal.fire({
            type: "question",
            title: _title,
            text: _message,
            html: _html,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Evet',
            cancelButtonText: 'Hayır',
            allowOutsideClick: false
            //denyButtonText: `Don't save`,
            //showCancelButton: false,
            //confirmButtonColor: "#DD6B55",
            //confirmButtonText: "Tamam"
        }).then((result) => {
            if (result.value) {
                _retVal(result.value);
            } else {
                //A101LIB.ShowInfoSwal2("İşlem İptal Edilmiştir!");
                _retVal(result.value);
            }
        });
    },
    /*END SWAL*/
    /*START TOSTR*/
    ShowInfoMessage: function name(message) {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 2500
        };
        toastr.info(message);
    },
    ShowWarningMessage: function name(message) {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 2500
        };
        toastr.warning(message);
    },
    ShowErrorMessage: function name(message) {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 2500
        };
        toastr.error(message);
    },
    ShowSuccessMessage: function name(message) {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 2500
        };
        toastr.success(message);
    },
    /*END TOSTR*/
    /*START LOADINGOVERLAY*/
    ShowLoading: function name() {
        $.LoadingOverlay('show');
    },
    HideLoading: function name() {
        $.LoadingOverlay('hide');
    },


    /*END LOADINGOVERLAY*/
    /*START VALIDATION*/
    //Validation çalışması için validate edilmek istenilen alan form içerisinde bulunmalıdır
    //Submit işlemi yapılmaması için button submit kullanımına dikkat edilmelidir
    //Validate: function name() {
    //    $(function () {
    //        $('.needs-validation').validate({
    //            errorClass: 'invalid-feedback',
    //            validClass: 'success',
    //            errorElement: 'span',
    //            highlight: function (element, errorClass, validClass) {
    //                $(element).parents("div.invalid-feedback").addClass(errorClass).removeClass(validClass);
    //                $(element).addClass("get-error-select").removeClass(validClass);
    //            },
    //            unhighlight: function (element, errorClass, validClass) {
    //                $(element).removeClass("get-error-select");
    //            }
    //        });
    //    });
    //},
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
        if (value == null || value == "" || value == -1 || value == "SECINIZ" || value == []) {
            $(element).addClass("get-error-select");
            $(baseelement + " .get-error").remove();
            $(baseelement).append('<div class="get-error">Bu alanı boş bırakamazsınız.</div>');
            return 0;
            // $('.get-error').show();
        }
        else if (value != null || value == "" || value != -1 || value != "SECINIZ" || value != []) {
            $(element).removeClass("get-error-select");
            $(baseelement + " .get-error").remove();
            return 1;
            // $('.get-error').hide();
        }
    },
    /*END VALIDATION*/
    TurkishtoEnglish: function (element) {
        return element.replace(/Ğ/gim, "g")
            .replace(/Ü/gim, "u")
            .replace(/Ş/gim, "s")
            .replace(/I/gim, "i")
            .replace(/İ/gim, "i")
            .replace(/Ö/gim, "o")
            .replace(/Ç/gim, "c")
            .replace(/ğ/gim, "g")
            .replace(/ü/gim, "u")
            .replace(/ş/gim, "s")
            .replace(/ı/gim, "i")
            .replace(/ö/gim, "o")
            .replace(/ç/gim, "c")
            //.replace(/ /gim, "_")
            .toUpperCase();
    }
}