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
                    var div = document.createElement("div");

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
 
$("#scouting_submit").click(function(){ 
	event.preventDefault();
	var error_msg = ''; 
	$("#scouting_error_message").html(error_msg); 

	//reset the color of all the inputs in case there was an error
	$("#login_email_label_id").css('color', 'black');
	$("#login_password_label_id").css('color', 'black');

	//check for errors
	if($("#login_email_input_id").val()=='' || $("#login_password_input_id").val()=='' )
	{
		error_msg = 'The following mandatory fields are incomplete: '; 

		if($("#login_email_input_id").val()=='')
		{
			error_msg += '</br>&nbsp;&nbsp;&nbsp;&nbsp;Email '; 
			$("#login_email_label_id").css('color', '#ef2323');
		}
		if($("#login_password_input_id").val()=='')
		{
			error_msg += '</br>&nbsp;&nbsp;&nbsp;&nbsp;Password '; 
			$("#login_password_label_id").css('color', '#ef2323');
		}
		$("#scouting_error_message").html(error_msg); 
		window.scrollTo(0, 0);
	}
	else
	{
		var email = $("#login_email_input_id").val(); 
		var password = $("#login_password_input_id").val();

	    $.ajax({
		    url:'http://127.0.0.1:8090/steel-scout-middleend/login.php',
		    data: {email: email, password: password},
		    type: "POST", //or type:"GET" or type:"PUT"
		    success: function (result) {
		    	console.log(result); 
		        if(result=="Incorrect email or password")
		        {
		        	$("#login_error_message_id").html("Incorrect email or password"); 
		        }    
		        else
		        {
		        	if ($('#id_stay_in_cb').is(':checked')) 
		        	{
		        		deleteCookie("reg_auth_token"); 
		        		deleteCookie("persistent_auth_token"); 
		        		setAuthCookiePersistent(email); 
		        	}
		        	else
		        	{
		        		deleteCookie("reg_auth_token"); 
		        		deleteCookie("persistent_auth_token"); 
		        		setAuthCookieAutoExp(email); 
		        	}
		        	window.location.assign("http://localhost:8090/steel-scout-middleend/index.html");
		        }
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