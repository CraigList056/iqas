let app = (function(options) {

    "use strict";

    return {

        table: '',
        options: options || {},

        setTableName: function (name) {
            this.table = name;
        },
        getTableName: function () {
            return this.table;
        },
        getConfig: function(key)
        {
            let config = {
                'root' : 'root',
                'url' : 'localhost',
            };

            return config[key];
        },
        setToken: function(token, guestToken)
        {
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('guestToken', guestToken);
        },
        getToken: function()
        {
            return sessionStorage.getItem('token');
        },
        getGuestToken: function()
        {
            return sessionStorage.getItem('guestToken');
        },
        ajax_upload : function(url,type,formData,loader,apiToken,callback)
        {
            $.ajax({
                url : url,
                type : type,
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data : formData,
                cache : false,
                contentType : false,
                processData : false,
                beforeSend: function(request)
                {
                    app.loader();
                    let guestToken = app.getGuestToken();
                    let token = app.getToken();
                    if (apiToken && token) {
                        request.setRequestHeader('Authorization', `Bearer ${token}`);
                    } else if (!apiToken && guestToken) {
                        request.setRequestHeader('Authorization', `Bearer ${guestToken}`);
                    }
                },
                success: function( data, textStatus, jQxhr )
                {
                    if (loader)
                        app.removeLoader();
                    let d = data;
                    try
                    {
                        d = JSON.parse(data.data);
                    }catch(err){
                        d = data.data ? data.data : data;
                    }
                    callback(d);
                },
                error: function( jqXhr, textStatus, errorThrown )
                {
                    if (loader)
                        app.removeLoader();
                    if (jqXhr.status === 422) {
                        let d = jqXhr.responseText;
                        try
                        {
                            d = JSON.parse(jqXhr.responseText);
                        }catch(err){
                            d = jqXhr.responseText;
                        }
                        let err = '';
                        if (d.hasOwnProperty('errors')) {
                            $.each(d.errors, function (key, val) {
                                $.each(val, function (k, v) {
                                    err += `<span style='color:#ff0000'>${v}<span><br/>`;
                                });
                            });
                        } else if (d.hasOwnProperty('error')){
                            err = `<span style='color:#ff0000'>${d.error.message}<span><br/>`;
                        } else {
                            err = `Something went wrong !!`;
                        }
                        swal({
                            title: "Oops...",
                            text: err,
                            html: true
                        });
                    } else if (jqXhr.status === 403) {
                        setTimeout(function () {
                            window.location.href = `${base_url}/logout`;
                        }, 2000);
                    } else {
                        sweetAlert("Oops...", "Something went wrong !!", "error");
                    }
                }
            });
        },
        ajax : function(url,type,data,loader,callback)
        {
            var box;
            $.ajax
            (
                {
                    url: url,
                    type: type,
                    data: data,
                    beforeSend: function()
                    {
                        if(loader)
                            mbox.alert('<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading</div>');
                    },
                    success: function( data, textStatus, jQxhr )
                    {
                        if(loader)
                            mbox.close();
                        callback(data);

                    },
                    error: function( jqXhr, textStatus, errorThrown )
                    {
                        console.log( errorThrown );
                    }
                }
            );
        },
        ajax_json : function(url,type,data,callback)
        {
            $.ajax
            (
                {
                    url: url,
                    type: type,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    data: data,
                    beforeSend: function()
                    {
                    },
                    success: function( data, textStatus, jQxhr )
                    {
                        let d = data;
                        try {
                            d = JSON.parse(data);
                        } catch (e) {
                            d = data;
                        }
                        callback(d);

                    },
                    error: function( jqXhr, textStatus, errorThrown )
                    {
                        console.log( errorThrown );
                    }
                }
            );
        },
        ajax_loader : function(url,type,data,callback)
        {
            $.ajax
            (
                {
                    url: url,
                    type: type,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    data: JSON.stringify(data),
                    contentType: false,
                    processData: false,
                    beforeSend: function(request)
                    {
                        app.loader();
                        let token = app.getToken();
                        if (token) {
                            request.setRequestHeader('Authorization', `Bearer ${token}`);
                        }
                    },
                    success: function( data, textStatus, jQxhr )
                    {
                        app.removeLoader();
                        let d = data;
                        try
                        {
                            d = JSON.parse(data.data);
                        }catch(err){
                            d = data.data;
                        }
                        callback(d);
                    },
                    error: function( jqXhr, textStatus, errorThrown )
                    {
                        app.removeLoader();
                        if (jqXhr.status === 422) {
                            let d = jqXhr.responseText;
                            try
                            {
                                d = JSON.parse(jqXhr.responseText);
                            }catch(err){
                                d = jqXhr.responseText;
                            }
                            let err = '';
                            if (d.hasOwnProperty('errors')) {
                                $.each(d.errors, function (key, val) {
                                    $.each(val, function (k, v) {
                                        err += `<span style='color:#ff0000'>${v}<span><br/>`;
                                    });
                                });
                            } else if (d.hasOwnProperty('error')){
                                err = `<span style='color:#ff0000'>${d.error.message}<span><br/>`;
                            } else {
                                err = `Something went wrong !!`;
                            }
                            swal({
                                title: "Oops...",
                                text: err,
                                html: true
                            });
                        } else if (jqXhr.status === 403) {
                            setTimeout(function () {
                                window.location.href = `${base_url}/logout`;
                            }, 2000);
                        } else {
                            sweetAlert("Oops...", "Something went wrong !!", "error");
                        }
                    }
                }
            );
        },
        ajax_guest_loader : function(url,type,data,callback)
        {
            $.ajax
            (
                {
                    url: url,
                    type: type,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    data: JSON.stringify(data),
                    contentType: false,
                    processData: false,
                    beforeSend: function(request)
                    {
                        app.loader();
                        let guestToken = app.getGuestToken();
                        request.setRequestHeader('Authorization', `Bearer ${guestToken}`);
                    },
                    success: function( data, textStatus, jQxhr )
                    {
                        app.removeLoader();
                        let d = data;
                        try
                        {
                            d = JSON.parse(data.data);
                        }catch(err){
                            d = data.data;
                        }
                        callback(d);
                    },
                    error: function( jqXhr, textStatus, errorThrown )
                    {
                        app.removeLoader();
                        if (jqXhr.status === 422) {
                            let d = jqXhr.responseText;
                            try
                            {
                                d = JSON.parse(jqXhr.responseText);
                            }catch(err){
                                d = jqXhr.responseText;
                            }
                            let err = '';
                            if (d.hasOwnProperty('errors')) {
                                $.each(d.errors, function (key, val) {
                                    $.each(val, function (k, v) {
                                        err += `<span style='color:#ff0000'>${v}<span><br/>`;
                                    });
                                });
                            } else if (d.hasOwnProperty('error')){
                                err = `<span style='color:#ff0000'>${d.error.message}<span><br/>`;
                            } else {
                                err = `Something went wrong !!`;
                            }
                            swal({
                                title: "Oops...",
                                text: err,
                                html: true
                            });
                        } else if (jqXhr.status === 403) {
                            setTimeout(function () {
                                window.location.href = `${base_url}/logout`;
                            }, 2000);
                        } else {
                            sweetAlert("Oops...", "Something went wrong !!", "error");
                        }
                    }
                }
            );
        },
        ajax_btn_loader : function(url,type,data,el, callback)
        {
            $.ajax
            (
                {
                    url: url,
                    type: type,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    data: JSON.stringify(data),
                    beforeSend: function(request)
                    {
                        let token = app.getToken();
                        if (token) {
                            request.setRequestHeader('Authorization', `Bearer ${token}`);
                        }
                        $('.error').remove();
                        el.attr('disabled', true).attr('style', 'visibility: visible; opacity: 0.5;');
                    },
                    success: function( data, textStatus, jQxhr )
                    {
                        el.attr('disabled', false).removeAttr('style');
                        let d = data;
                        try
                        {
                            d = JSON.parse(data.data);
                        }catch(err){
                            d = data.data;
                        }
                        callback(d);
                    },
                    error: function( jqXhr, textStatus, errorThrown )
                    {
                        el.attr('disabled', false).removeAttr('style');
                        if (jqXhr.status !== 422) {
                            sweetAlert("Oops...", "Something went wrong !!", "error");
                        } else {
                            let d = JSON.parse(jqXhr.responseText);
                            if (d.errors) {
                                $.each(d.errors, function (key, val) {
                                    $.each(val, function (k, v) {
                                        $(`input[name="${key}"]`).parent().append(`
                                            <div class="error">${v}</div>
                                        `);
                                    });
                                });
                            }
                        }
                        if (jqXhr.status === 403) {
                            setTimeout(function () {
                                window.location.href = `${base_url}/logout`;
                            }, 2000);
                        }
                    }
                }
            );
        },
        ajax_form : function(form,message_container, hide_on_success,callback)
        {
            var box;
            var options = {
                beforeSubmit: function()
                {
                    mbox.alert('<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading</div>');
                    $('input[type="submit"]').attr('disabled',true);
                },
                success: function(response)
                {
                    if(hide_on_success)
                        mbox.close();
                    try {
                        response = JSON.parse(response);
                        $(message_container).html(
                            '<div class="alert alert-' + (response.result === false ? "danger" : "success") + '"><ul>' + da.handle_message_success(response.message) + '</ul></div>'
                        );
                        $('.modal').animate({
                            scrollTop: $(message_container).offset().top - 20
                        }, 'slow');
                    }catch(err){}
                    callback(response);
                    $('input[type="submit"]').attr('disabled',false);
                },
                complete: function()
                {},
                error: function(err)
                {
                    mbox.close();
                    $(message_container).html(
                        '<div class="alert alert-danger"><ul>'+da.handle_message(err)+'</ul></div>'
                    );
                    $('.modal').animate({
                        scrollTop: $(message_container).offset().top - 20
                    }, 'slow');
                    $('input[type="submit"]').attr('disabled',false);
                }
            };
            $(form).ajaxForm(options);
            $(form).submit();
        },
        create_datatable : function(selector, responsive, options)
        {
            if($(selector).length) {
                if(options){
                    $(selector).DataTable({
                        "iDisplayLength": -1,
                        "autoWidth": false,
                        "bAutoWidth": false,
                        "ordering": false,
                        lengthChange: options['lengthChange'],
                        searching: options['searching'],
                        paging: options['paging'],
                        info: options['info'],
                        responsive: true
                    });
                }else if(responsive) {
                    $(selector).DataTable({
                        "iDisplayLength": 10,
                        "autoWidth": false,
                        "bAutoWidth": false,
                        "ordering": false,
                        "orderCellsTop": true,
                        responsive: true,
                        lengthChange: false
                    });
                }else{
                    var cbe = $(selector).prev('div.table-button-c').find('.custom-b-r');
                    var dt = $(selector).DataTable({
                        "ordering": false,
                        dom: "Bfrtip",
                        buttons: [
                            {
                                extend: "excelHtml5",
                                className: "btn-sm"
                            },
                            {
                                extend: "pdfHtml5",
                                className: "btn-sm"
                            },
                            {
                                extend: "print",
                                className: "btn-sm"
                            }
                        ],
                    });
                }
            }
        },
        searchstr : function(string, search)
        {
            string = string != null ? string.toLowerCase() : '';
            search = search != null ? search.toLowerCase() : '';
            return string.indexOf(search) >= 0;
        },
        email : function(email)
        {
            if (/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test( email ))
            {
                return ( true );//invalid
            }
        },
        onload : function(func)
        {
            var oldonload = window.onload;

            if (typeof window.onload != 'function')
            {
                window.onload = func;
            }
            else
            {
                window.onload = function()
                {
                    if (oldonload)
                    {
                        oldonload();
                    }
                    func();
                }
            }
        },
        reload : function(location,delay)
        {
            switch(delay)
            {
                case true :
                    return setTimeout(function () {
                        window.location.href = location;
                    }, 2000);
                case false :
                    return window.location.href = location;
            }
        },
        handle_message : function(msg)
        {
            var error_data = '';
            var data = JSON.parse(msg.responseText);
            $.each(data, function(key,val){
                error_data += '<li>'+val[0]+'</li>';
            });
            return error_data;
        },
        handle_message_success : function(msg)
        {
            var error_data = '';
            if($.isArray(msg)){
                $.each(msg, function (key, val) {
                    if(val[0].length !== 1)
                        error_data += '<li>' + val[0] + '</li>';
                    else
                        error_data += '<li>' + val + '</li>';
                });
            }else{
                error_data += '<li>' + msg + '</li>';
            }

            return error_data;
        },
        hide: function(e)
        {
            $(e).hide();
        },
        show: function(e)
        {
            $(e).show();
        },
        today_date : function()
        {
            var d = new Date();

            var month = d.getMonth()+1;
            var day = d.getDate();

            var output = d.getFullYear() + '/' +
                ((''+month).length<2 ? '0' : '') + month + '/' +
                ((''+day).length<2 ? '0' : '') + day;
            return output;
        },
        url_param : function(sParam){
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        },
        messages: function(index, data)
        {
            var message = {
                'disaster_type_added':"Are you sure to add disaster type <span class='bold'>#"+data['value']+"</span>?",
                'disaster_type_updated':"Are you sure to update disaster type <span class='bold'>#"+data['value']+"</span>?",
                'disaster_added':"Are you sure to post the disaster?",
                'disaster_updated':"Are you sure to update the disaster",
                'account_add':"Are you sure to add this account?",
                'account_update':"Are you sure to update this account?",
                'account_approve':"Are you sure to approve this account?",
                'account_decline':"Are you sure to decline this account?",
                'item_add':"Are you sure to add this item?",
                'item_update':"Are you sure to update this item?",
                'crops_add':"Are you sure to add this crop?",
                'crops_update':"Are you sure to update this crop?",
            };
            return message[index];
        },
        dialog_box: function(message)
        {
            return mbox.alert(message);
        },
        is_json: function(data, message_container)
        {
            var i = 0;
            try
            {
                var j = data;
                if(typeof data !== 'object')
                {
                    j = $.parseJSON(data);
                }
                if(j.result === false){
                    i = 1;
                    if(message_container) {
                        $(message_container).html(
                            '<div class="alert alert-' + (j.result === false ? "danger" : "success") + '"><ul>' + da.handle_message_success(j.message) + '</ul></div>'
                        );
                    }else
                        da.dialog_box(j.message);
                }
            }catch(err){ i = 0;}
            return i;
        },
        clean_amount: function(data)
        {
            return data.replace(/[^0-9]/gi, '');
        },
        loader: function() {
            $('body').append(`
                <div class="loader">
                    <div class="la-ball-fall">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            `);
        },
        removeLoader: function() {
            $('body .loader').remove();
        },
        submitReport: function () {
            try {
                // sessionStorage.setItem('barangays', "");
                $('#reportModal').on('shown.bs.modal', function (e) {
                    let barangays = sessionStorage.getItem('barangays');
                    if (barangays) {
                        barangays = JSON.parse(barangays);
                        $.each(barangays, function (k, val) {
                            $('select[name="barangay_id"]').append(`<option value="${val.id}">${val.name}</option>`)
                        });
                    } else {
                        app.ajax_upload(`${api_url}/v1/incident-report/barangays`, 'get', null, true, false, function (response) {
                            sessionStorage.setItem('barangays', JSON.stringify(response));
                            $.each(response, function (k, val) {
                                $('select[name="barangay_id"]').append(`<option value="${val.id}">${val.name}</option>`)
                            });
                        });
                    }
                });
                $('input[name="report_datetime"]').datetimepicker({
                    format: "YYYY-MM-DD hh:mm",
                    maxDate: moment()
                });
                $('#incident-report-form').submit(function (e) {
                    e.preventDefault();
                    let form = $(this);
                    let data = new FormData(form[0]);
                    app.ajax_upload(`${api_url}/v1/incident-report`, 'post', data, true, false, function (data) {
                        swal("Done!", "It was successfully submitted!", "success");
                        form.trigger("reset");
                        $('#reportModal').modal('hide');
                    });
                });
            } catch (e) {}
        }
    };

}());

$(document).ready(function() {
    app.submitReport();
});