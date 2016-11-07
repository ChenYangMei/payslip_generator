var csv = null;


$(document).ready(function() {

    document.getElementById('txtFileUpload').addEventListener('change', upload, false);

    function browserSupportFileUpload() {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
        isCompatible = true;
        }
        return isCompatible;
    }

    function upload(evt) {
        if (!browserSupportFileUpload()) {
            alert('The File APIs are not fully supported in this browser!');

        } else {
            var file = evt.target.files[0];
            var formData = new FormData();
            formData.append("myfile", file);

                $.ajax({
                    url: "http://localhost:3000/upload",
                    type: "post",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(res){
                        console.log(res);
                        csv = res;
                    },
                    crossDomain: true
                });
        }
    }


    $("#display").on('click', function(){
        console.log(csv);
        if (csv === null) {
            alert("Please upload a csv file");
        }else {
            var build = '<table border="1" cellpadding="2" cellspacing="0">\n';
        	var rows = csv.split("\n");
        	rows.forEach( function getvalues(thisRow) {
            	build += "<tr>\n";
            	var columns = thisRow.split(",");
            	for(var i=0;i<columns.length;i++){ build += "<td>" + columns[i] + "</td>\n"; }
            	build += "</tr>\n";
            });
        	build += "</table>";
        	$('.payslip').append(build);
        }
        var displayCurrency = function(key, value){

            var $tr = $("<tr></tr>");
            $("table").append($tr);
            var $tdKey = $("<td></td>").append(key);
            $tr.append($tdKey);
            var $tdValue = $("<td></td>").append(value);
            $tr.append($tdValue);

        };
    });


    $("#download").on('click', function(){

        if (csv === null) {
            alert("Please upload a csv file");
        }else {

            var a = document.createElement('a');
            a.href = 'data:attachment/csv,' +  encodeURIComponent(csv);
            a.target = '_blank';
            a.download = 'payslip.csv';

            document.body.appendChild(a);
            a.click();
        }
    });

});
