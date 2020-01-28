function getFields(callback){
    $.ajax({
        url:'http://localhost/steel-scout-frontend/scouting_json.php',
        type: "POST",
        success: (data) => {
            callback(JSON.parse(data));
        },
        error: error => {console.log(JSON.stringify(error)); callback({items:[]})}
    })
}

    $("#scouting_submit").click(function(){ 
        event.preventDefault();
        var error_msg = ''; 
        $("#scouting_error_message").html(error_msg); 

        //reset the color of all the inputs in case there was an error
        $(".scouting_label").css('color', 'black');
        
        error_msg = 'The following mandatory fields are incomplete: '; 
        error_exists = false;
        getFields((data) => {
            formElements = data.items;
            formElements.forEach(element => {
                if(element.type === "int" || element.type === "text"){
                    console.log(element.field+": "+$("#"+element.field).val());
                    if($("#"+element.field).val() === '' || $("#"+element.field).val() === undefined){
                        error_exists = true;
                        error_msg += '</br>&nbsp;&nbsp;&nbsp;&nbsp;'+element.field; 
                        $("#"+element.field).css('color', '#ef2323');
                    }
                }
                else if(element.type === "MC"){
                    if($('input[name='+ element.field+']:checked').length <= 0){
                        error_exists = true;
                        error_msg += '</br>&nbsp;&nbsp;&nbsp;&nbsp;'+element.field; 
                        $("#"+element.field).css('color', '#ef2323');
                    }
                }
            });
            
            if(error_exists){
                $("#scouting_error_message").css('color', '#ef2323');
                $("#scouting_error_message").html(error_msg); 
                window.scrollTo(0, 0);
            }
            else
            {
                resp = [];
                formElements.forEach(element => {
                    if(element.type === "int" || element.type === "text"){
                        resp.push($("#"+element.field).val());
                    }
                    else if(element.type == "MC"){
                        element.options.forEach(option => {
                            if(document.getElementById(option).checked)
                                resp.push(option);
                        });
                    }
                    else if(element.type == "switch"){
                        if($("#"+element.field).checked) resp.push(element.options[1]);
                        else resp.push(element.options[0]);
                    }
                });
        
                $.ajax({
                    url:'http://127.0.0.1:8090/steel-scout-middleend/scouting.php',
                    data: {values: resp},
                    type: "POST", //or type:"GET" or type:"PUT"
                    success: function (result) {
                        console.log("result"+result); 
                    },
                    error: function(jqXHR, textStatus, errorThrown, result) {
                            alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');
        
                            $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
                            console.log('jqXHR:');
                            console.log(jqXHR);
                            console.log('textStatus:');
                            console.log(textStatus);
                            console.log('errorThrown:');
                            console.log(errorThrown);
                            console.log('JSON return string: '); 
                            console.log(result); 
                        },
                });
            }
        });    
    });