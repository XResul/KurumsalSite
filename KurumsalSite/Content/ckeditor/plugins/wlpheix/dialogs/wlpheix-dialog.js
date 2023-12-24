/*
 * Dialog module of WlPheix plugin. Version Version: 1.0.4
 * Wlpheix - simple Gallery browser in CKEditor 4, used by different modules of CMS Pheix.
 * It adds Gallery button, that provides access to internal galleries.
 * Official repository: https://gitlab.com/pheix-ckeditor-plugins/wlpheix
 * Distributed under MIT license. Please check out: https://opensource.org/licenses/MIT
 * Have a question?! Please visit: https://pheix.org.
 */

CKEDITOR.dialog.add( 'wlpheixDialog', function( editor ) {
    return {
        title: 'Вставить изображение из системной галереи Pheix',
        minWidth: 700,
        minHeight: 300,
        contents: [
            {
                id: 'tab-basic',
                label: 'Выбор системной галереи',
                elements: [
                    {
                        type: 'select',
                        id: 'sysgalleryselect',
                        label: 'Галерея-хранилище изображений:',
                        items: '',
                        'default': '',
                        style: 'width:700px !important;',
                        onChange: function() {
                            var editor = CKEDITOR.currentInstance;
                            var elemname = editor.config.pheixGalDivId;
                            var galid = parseInt(this.getValue());
                            console.log( "CKEditor: selected gallery: "+galid);
                            if (galid > 0) {
                                var script = editor.config.pheixScript;
                                var sesid  = editor.config.pheixSessionId;
                                if ( typeof script === 'undefined' || script === null || typeof sesid === 'undefined' || sesid === null) {
                                    if (typeof sesid === 'undefined' || sesid === null) {
                                        console.log( "CKEditor: session id is undefined");
                                    }
                                    if (typeof script === 'undefined' || script === null) {
                                        console.log( "CKEditor: script is undefined");
                                    }
                                } else {
                                    var query  = script+"?id="+sesid+"&amp;action=admgalgetpool&amp;galid="+galid;
                                    console.log( "CKEditor: request: "+query);
                                    jQuery.get( query )
                                    .fail(function( data ) {
                                        console.log( "CKEditor: get data from "+script+" failed: " + data );
                                    })
                                    .done(function( data ) {
                                        var galleryslider = data;
                                        var dialog   = CKEDITOR.dialog.getCurrent();
                                        var document = dialog.getElement().getDocument();
                                        var element  = document.getById(elemname);
                                        if (element) {
                                            element.setHtml('<div id="galCarousel" style="padding:0; margin:0 0 0 5px; background:#F1F1F1; width:690px">'+galleryslider+'</div>');
                                        } else {
                                            console.log( "CKEditor: element '"+elemname+"' is undefined" );
                                        }
                                    })
                                }
                            } else {
                                var dialog   = CKEDITOR.dialog.getCurrent();
                                var document = dialog.getElement().getDocument();
                                var element  = document.getById(elemname);
                                if (element) {
                                    element.setHtml('');
                                }
                            }
                        },
                        onLoad:  function() {
                            var element = this;
                            var editor = CKEDITOR.currentInstance;
                            var script = editor.config.pheixScript;
                            var sesid  = editor.config.pheixSessionId;
                            if ( typeof script === 'undefined' || script === null || typeof sesid === 'undefined' || sesid === null) {
                                if (typeof sesid === 'undefined' || sesid === null) {
                                    console.log( "CKEditor: session id is undefined");
                                }
                                if (typeof script === 'undefined' || script === null) {
                                    console.log( "CKEditor: script is undefined");
                                }
                            } else {
                                var query  = script+"?id="+sesid+"&amp;action=admgalgetall&amp;term=*"
                                console.log( "CKEditor: request: "+query);
                                jQuery.get( query)
                                .fail(function( data ) {
                                    console.log( "CKEditor: get data from "+script+" failed: " + data );
                                })
                                .done(function( data ) {
                                    var jsondata;
                                    try {
                                        jsondata = $.parseJSON(data);
                                    } catch (err) {
                                        jsondata = [{ "label": "Module Gallery::System is inactive!", "value": "-1", "id": "0" }];
                                        console.log( "CKEditor: JSON response parse error: " + err.name + " {" + err.message + "}");
                                    }
                                    $.each(jsondata, function(index, value) {
                                        element.add(value.label, value.id);
                                    });
                                    console.log( "CKEditor: get data from "+script+" done");
                                })
                            }
                        }
                    },
                    {
                        type: 'text',
                        id: 'imgpath',
                        label: 'Путь к изображению:',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Путь к изображению не может быть пустым" )
                    },
                    {
                        type: 'html',
                        id: 'sgslider',
                        html: '<div id="'+editor.config.pheixGalDivId+'"></div>'
                    }
                ]
            },
        ],
        onOk: function() {
            var dialog = this;
            var wlpheix = editor.document.createElement( 'imgpath' );
            var imgpath = dialog.getValueOf( 'tab-basic', 'imgpath' );
            wlpheix.setHtml('<img src="'+imgpath+'" border="0" alt="">')
            editor.insertElement( wlpheix );
        },
        onShow: function() {
            var script = editor.config.pheixScript;
            var sesid  = editor.config.pheixSessionId;
            if ( typeof script === 'undefined' || script === null || typeof sesid === 'undefined' || sesid === null) {
                console.log( "CKEditor: found undefined settings while checking session id");
                top.location.href='/';
            } else {
                var chckUrl = script+"?id="+sesid+"&action=checksession";
                jQuery.get(chckUrl, function( responseTxt, statusTxt, xhr ) {
                    if(statusTxt == "error") {
                        console.log( "CKEditor: ajax request from "+script+" failed " + xhr.status + ": " + xhr.statusText);
                        top.location.href=script;
                    } else {
                        if (responseTxt.localeCompare("1") != 0) {
                            console.log( "CKEditor: session id is expired - redirecting to "+script);
                            top.location.href=script;
                        }
                    }
                }, 'text');
            }
        },
        onCancel: function() {
            var dialog = this;
            console.log( "CKEditor: dialog cancel done");
        },
    };
});
