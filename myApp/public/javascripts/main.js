
/*
function deploy(){
	console.log("is it work?");
	var reader = new FileReader();
	reader.onload = function(event){
		$.get("/deploy", function(data){
			if (data != "Error"){
				$("#message").html("배포된 contract 주소는 "+data);
			}else{
				$("#message").text("An error occuered.");
			}
		});
	}
}

*/

/*
function deploy(){
	$("#deploy").click("submit",function(){
		console.log("Function in ./public/javascripts/main.js");
		$.ajax({
			url: "/deploy",
			type: "post",
			success: function(result){
				$("#txt1").text(result);
			}
		});	
		return false;
	});
};
*/
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

function checkGoal(addr){
	console.log("Check the contract goal");
    $.ajax({
        url: "/checkGoal",
        type: "post",
		data: {address: addr},
        success: function(result){
            $("#checkGoal").text(result);
        }
    });
    return false;
}




