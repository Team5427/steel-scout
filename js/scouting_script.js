function loadForm(){
    getFields((data) => {
        formElements = data.items;
        var container = document.getElementById("formContainer");
        formElements.forEach(element => {
            switch(element.type){
                case "int":
                    var label = document.createElement("label");
                    label.innerHTML = element.field;
                    label.classList.add("scouting_label");
                    container.appendChild(label)
                    var input = document.createElement("input");
                    input.classList.add("scouting_input");
                    input.type = "number";
                    input.name = element.field;
                    input.id = element.field;
                    container.appendChild(input);
                    container.appendChild(document.createElement("br"));
                    break;
                case "switch":
                    var div = document.createElement("div");
                    div.classList.add("binary-switch");

                    divInside = document.createElement("div");
                    var s1 =  document.createElement("label");
                    s1.classList.add("switch-label");
                    s1.innerHTML = element.options[0];
                    divInside.appendChild(s1);
                    div.appendChild(divInside);

                    divInside = document.createElement("div");
                    var label = document.createElement("label");
                    label.classList.add("switch");
                    var input  = document.createElement("input");
                    input.type = "checkbox";
                    input.id = element.field;
                    var span = document.createElement("span");
                    span.classList.add("slider");
                    label.append(input);
                    label.append(span);
                    divInside.appendChild(label);
                    div.appendChild(divInside);

                    divInside = document.createElement("div");
                    var s2 =  document.createElement("label");
                    s2.classList.add("switch-label")
                    s2.innerHTML = element.options[1];
                    divInside.appendChild(s2);
                    div.appendChild(divInside);

                    container.appendChild(div);
                    container.appendChild(document.createElement("br"));
                    break;
                case "counter":
                    var label = document.createElement("label");
                    label.innerHTML = element.field;
                    container.appendChild(label)
                    var inc = document.createElement("button");
                    var dec = document.createElement("button");
                    inc.innerHTML = "+";
                    dec.innerHTML = "-";
                    container.appendChild(inc);
                    container.appendChild(dec);
                    container.appendChild(document.createElement("br"));
                    break;

                case "MC":
                    var div = document.createElement("div");
                    var label = document.createElement("label");
                    label.classList.add("scouting_label");
                    label.innerHTML = element.field;
                    container.appendChild(label)
                    container.appendChild(document.createElement("br"));
                    element.options.forEach(option =>{
                        var label = document.createElement("label");
                        label.innerHTML = option;
                        container.appendChild(label)
                        var input = document.createElement("input");
                        input.type = "radio";
                        input.value = option;
                        input.id = option;
                        input.name = element.field;
                        container.appendChild(input);
                        container.appendChild(document.createElement("br"));
                    })
                    break;
                case "text":
                    var label = document.createElement("label");
                    label.classList.add("scouting_label");
                    label.innerHTML = element.field;
                    container.appendChild(label);
                    container.appendChild(document.createElement("br"));
                    var input = document.createElement("input");
                    input.classList.add("scouting_input");
                    input.type = "text";
                    input.id = element.field;
                    container.appendChild(input);
                    break;
                default:
                    break;
            }
        })
    });
}

function getFields(callback){
    $.ajax({
        url:'http://127.0.0.1:8090/steel-scout-middleend/scouting_json.php',
        type: "GET",
        success: (data) => {
            callback(data)
        },
        error: error => {console.log(error)}
    })

    // $.getJSON('./scouting-form.json',function (data) {
    //     //execute the callback, passing it the data
    //     callback(data);
    // });
}

$(document).ready(function() {
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
                //console.log(element.field);
                if(element.type === "int" || element.type === "text"){
                    //console.log(element.field + ": "+ $("#"+element.field).val());
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
});