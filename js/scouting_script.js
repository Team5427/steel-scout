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
                default:
                    break;
            }
        })
    });
}
 