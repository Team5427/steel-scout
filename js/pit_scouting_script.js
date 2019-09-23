var container;

function loadForm(){
    $.getJSON('./pit-scouting.json', function(data) {
        formElements = data.items;
        container = document.getElementById("pitFormContainer");
        formElements.forEach(element => {
            switch(element.type){
                case "int":
                    var label = document.createElement("label");
                    label.innerHTML = element.field;
                    container.appendChild(label)
                    var input = document.createElement("input");
                    input.type = "number";
                    input.name = element.field;
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
                    var label = document.createElement("label");
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
                        input.name = element.field;
                        container.appendChild(input);
                        container.appendChild(document.createElement("br"));
                    })
                    break;
                case "text":
                    var label = document.createElement("label");
                    label.innerHTML = element.field;
                    container.appendChild(label);
                    container.appendChild(document.createElement("br"));
                    var input = document.createElement("input");
                    input.type = "text";
                    container.appendChild(input);
                    break;
                default:
                    break;
            }
        })
    });
}

$("#pit_scouting_submit_button").click(function(){
    event.preventDefault();
    var errorMessage = " ";
    var nodeList = document.querySelectorAll("text");
    var intList = document.querySelectorAll("int");
    var listLen = nodeList.length;
    var intLen = intList.length;
    var error = false;
    var errorMessage = '';
    for(var i = 0; i<listLen; i++)
    {
        nodeList[i].css('color', 'black');
    }
    for(var i = 0; i<intLen; i++)
    {
        intList[i].css('color', 'black');
    }

    for(var i = 0; i<listLen; i++)
    {
        if(nodeList[i].val() == '')
        {
            error = true;
            nodeList[i].css('color', '#ef2323');
        }
    }
    for(var i = 0; i<intLen; i++)
    {
        if(intList[i].val() == '')
        {
            error = true;
            intList[i].css('color', '#ef2323');
        }
    }

    if(error)
    {
        errorMessage = "Please complete all fields before submitting.";
    }

    $("#pit_scout_form_error_message_id").html(errorMessage);
    window.scrollTo(0, 0);
});