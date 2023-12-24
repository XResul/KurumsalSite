/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
    config.extraPlugins = 'youtube,imgbrowser';

    //config.scriptLoader.load('https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js');

    //config.scriptLoader.load('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js');
    //CKEDITOR.scriptLoader.load(['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js', 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'], function (completed, failed) {
      
    //    alert("h");

    //});
   

    config.contentsCss = ['https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css', '/Admin/ckss.css'];
   
  
    //config.toolbar = 'Full';

    //config.toolbar_Full =
    //[
    //  ['Source', '-'],
    //  ['Undo', 'Redo', 'Find', '-'],
    //  ['Cut', 'Copy', 'Paste', '-'],
    //  ['SelectAll', 'RemoveFormat', '-']
    //  ['NumberedList', 'BulletedList', 'CreateDiv', '-'],
    //  ['Link', 'Unlink'],
    //  ['Image', 'Flash', 'Table', 'Smiley', 'SpecialChar', '-'],
    //  '/',
    //  ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-'],
    //  ['TextColor', 'BGColor', '-'],
    //  ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-'],
    //  ['Font', 'FontSize', '-']
    //];

    config.filebrowserImageUploadUrl = 'Uploadx.ashx';

};







