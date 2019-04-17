
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


var loading=$("#loader");
$(document).ready(function(){
	loading.show();
	$("#checkGoalBtn").click(function(){

		$.ajax({
        	url: "/checkGoal",
        	type: "post",
        	data: {address: '0x30070a189bd36ddc3b511d15e2ad656dd2fbb6d3'},
        	success: function(result){
				$("#checkGoal").text(result);
				loading.hide();
        	}
    	});

		var btn = $(this);
    	btn.prop('disabled',true);
    	window.setTimeout(function(){ 
    	    btn.prop('disabled',false);
    	},6000);
		return false;
	});

	$( "#checkGoalBtn" ).click(function() {
		loader();
	});
	function loader(div){
		$("#loader").toggle();
	}
});

