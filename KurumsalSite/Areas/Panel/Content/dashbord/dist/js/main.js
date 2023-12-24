$(document).ready(function () {

    $('.fip').on('change', function () {

        var id = $.QueryString("id");


        var data = new FormData();

        var files = $("#fileUpload").get(0).files;
        var prgs = 0;
        $(".upanel").css("display", "block");
        $(".upan").css("display", "block");
        $(".progres").css("width", "0%");
        //$(".prtext").html(t[0].toString() + "%");

        $(".prtext").html((prgs + ".dosya yüklendi. | Toplam Dosya:" + files.length) + " <br/>" + "<span style='font-weight:bold'>" + 0+ "%<span>");
        // Add the uploaded image content to the form data collection
        for (var i = 0; i < files.length; i++) {
            data.append("UploadedImage_" + i.toString(), files[i]);


           
            var ajaxRequest = $.ajax({
                type: "POST",
                url: "UploadImage.ashx?id="+id,
                contentType: false,
                processData: false,
                data: data,
                success: function (response) {
                    prgs++;
                    var yuzde = (100 * prgs) / files.length;
                   
                    var t = yuzde.toString().split(".");

                    $(".progres").css("width", t[0].toString() + "%");
                    //$(".prtext").html(t[0].toString() + "%");

                    $(".prtext").html((prgs + ".dosya yüklendi. | Toplam Dosya:" + files.length) + " <br/>" + "<span style='font-weight:bold'>" + t[0].toString() + "%<span>");
                    if (t[0] == "100") {

                        //$(".fip").remove();
                        $(".prtext").html("Tamamlandı");

                    }
                    $(".rlist").prepend("<li class='li' style='width:210px;float:left; margin:4px; height:160px;background-color:#f7f7f7;padding:6px;position:relative; border-radius:5px;'><div class='del'  data-obj='" + response + "'><img  src='Images/del.png' /></div><div style='left:0px; top:0px; width:200px; height:150px; margin:5px;'><div class='rdiv' style='background-image:url(" + response + "); background-repeat:no-repeat; background-size:contain;background-position:center; width:100%; height:100%; display:block'></div></div></li>");

                }
            });


            data.delete("UploadedImage_" + i.toString());
        }



        $(".del").live("click", function () {

            var ris = $(this).data("obj");

            var li = $(this).parent("li");
            $.ajax({

                type: "POST",
                url: "/Default.aspx/DeleteFile",
                data: "{'name':'" + ris + "' }",
                contentType: "application/json; charset=utf-8",

                success: function (response) {
                    if (response.d == "1") {

                        li.remove();
                    }
                }
            });


        });

    });


});