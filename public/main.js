
document.write("main.js is called");

function deploy(){
	$.get("/submit", function(data){
		$("#message").html("Data is "+data );
		document.write(data);
	});	
}

var socket = io("ec2-54-180-89-112.ap-northeast-2.compute.amazonaws.com:9000");
socket.on("connect", function(){
	socket.on("messge", function(msg){
		$("#events_list").prepend(msg);
	});
});

