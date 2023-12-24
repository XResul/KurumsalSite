
    CKEDITOR.plugins.add('imgbrowser',
{
    init: function (editor) {
        var pluginName = 'imgbrowser';
        //CKEDITOR.dialog.add(pluginName, this.path + 'dialogs/footnote.js');
        editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
        editor.ui.addButton('Imgbrowser',
           {
               label: 'Galeri Oluştur',
               command: pluginName,
               toolbar: 'insert',
               icon: this.path+"/icon.png",
               click: function (editor) { window.open('ckslider.aspx?editor='+editor.name+'', 'Image Browser', 'width=900,height=600'); }
           });
    }
});


