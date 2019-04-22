
function deploy(){
	console.log("Function in ./public/javascripts/main.js");
    $.ajax({
		url: "/deploy",
		type: "post",
		success: function(result){
			$("#txt1").text(result);
		}
	}); 
	return false;
};

$(document).ready(function(){
	console.log(document.cookie);
	
	$("#loader").hide();
	$("#checkGoalBtn").click(function(){
		console.log('d');
		myFunction(this);
		$.ajax({
        	url: "/checkGoal",
        	type: "post",
        	data: {address: '0x30070a189bd36ddc3b511d15e2ad656dd2fbb6d3'},
        	success: function(result){
				$("#checkGoal").text(result);
				myFunction(this);
        	}
    	});
		var btn = $(this);
    	btn.prop('disabled',true);
    	window.setTimeout(function(){
			btn.prop('disabled',false);
    	},6000);
		return false;
	});

	function myFunction(div) {
		$("#loader").toggle();
	}
       		
	$('.fform-container').submit(function(e){
		//e.preventDefault();
		console.log('submit');
		var form = $(this);
    	var data = form.serialize();

    	$.ajax({
        	url: "/loginPost",
        	type: "post",
			data: data,
        	success: function(result){
        		alert('로그인되었습니다.');	
			}
    	});
    	return true;
		
	});
		
	// post logout
	$('.usrInfo .logout').click(function(){
		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		$.ajax({
            url: "/logout",
            type: "post",
            success: function(result){
                console.log("logout javascript");
				alert("로그아웃되었습니다.");
            }
        });
        return true;
	});
	
});
/*
$('.form-container').submit(function(e){
        //e.preventDefault();

	console.log('submit');
	var form = $(this);
    var data = form.serialize();

	$.ajax({
		url: "/loginPost",
		type: "post",
		data: data,
		success: function(result){
			$('.login').hide();
		}
	});
	return true;
});


$('.usrInfo .logout').click(function(){
	document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    $.ajax({
    	url: "/logout",
        type: "post",
        success: function(result){
        	console.log(result);
			alert("로그아웃");
        }
    });
    return true;
});

*/




