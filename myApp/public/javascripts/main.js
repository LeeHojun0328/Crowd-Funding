
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

});

