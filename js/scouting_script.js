function loadForm(){
    $.getJSON('./scouting-form.json', function(data) {
        formElements = data.items;
        var container = document.getElementById("formContainer");
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
                    var input = document.createElement("input");
                    var input2 = document.createElement("input");

                    input.type = "radio";
                    input.name = element.field;
                    input.value = element.options[0];

                    input2.type = "radio";
                    input2.name = element.field;
                    input2.value = element.options[1];

                    var label1 = document.createElement("label");
                    label1.innerHTML = element.options[0];
                    container.appendChild(label1);

                    container.appendChild(input);

                    var label2 = document.createElement("label");
                    label2.innerHTML = element.options[1];
                    container.appendChild(label2);
                    
                    container.appendChild(input2);
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
                default:
                    break;
            }
        })
    });
}
 