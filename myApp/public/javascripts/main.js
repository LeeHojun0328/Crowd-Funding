
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
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
			c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	var cook = $.cookie('user');  // getCookie('user'); 
	//console.log("current cook value is "+cook);
	console.log(getCookie('user'));
	//여기서 세션 관리에 따라 로그인 로그아수 hide, show 결정 
	if(cook== 1 || !cook){ // if empty -> false. No login
		console.log('status: logout');
		$('.usrInfo .logout').hide();
		$('.usrInfo .list').hide();
		$('.usrInfo .project').hide();
		$('.usrInfo .login').show();
		$('.usrInfo .register').show();
	}else{
		console.log('status: login');
		$('.usrInfo .logout').show();
		$('.usrInfo .list').show();
		$('.usrInfo .project').show();
        $('.usrInfo .login').hide();
        $('.usrInfo .register').hide();	
	}
	
	// check project goal.
	$("#loader, .fundingArticle #loader").hide();
	$("#loader2").hide();
	$("#checkGoalBtn").click(function(){
		myFunction(this);
		$.ajax({
        	url: "/checkGoal",
        	type: "post",
        	data: {address: '0x42658b31F1C5EEfD74c869dd2640591b00b22da7'},
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
	
	$('.investorBalance').click(function(){
        $('.fundingArticle #loader').toggle();i
		var data = $(".fundingArticle select option:selected").text().split(' ');
		var data = data[data.length-1];
		console.log(data);
		$.ajax({
            url: "/investorBalance",
            type: "post",
            data: {addr:data},
            success: function(result){
                $('.fundingArticle #loader').toggle();
				$(".fundingArticle #checkBalance").text("=> "+result.balance+"wei 잔액이 있습니다.");
            }
        });	
	});

	// post login 
	$('.form-container .btn').click(function(e){
		//e.preventDefault();
		console.log('loging cliecked');
		//var form = $(this);
    	//var data = form.serialize();
		
		var id = $('.form-container > .id').val();
		var pwd = $('.form-container > .pwd').val();
		$.ajax({
        	url: "/loginPost",
        	type: "post",
			data: {id:id, pwd:pwd},
        	success: function(result){
				if(result.success){
					$.cookie('user','2');
					alert('로그인되었습니다.');	
					window.location.replace('/');
					console.log('status: login');
				}else{
					alert('아이디 또는 비밀번호가 틀렸습니다.');
					console.log('status: logout');
				}
			}
    	});
    	return true;
		
	});
	// post logout
	$('.usrInfo .logout').click(function(){
		console.log('logout btn is clicked.');
		//$.cookie('user','1');
		$.ajax({
            url: "/logout",
            type: "post",
            success: function(result){
                console.log("logout response");
				//document.cookie = "user=;";
				$.cookie('user','1');
				alert("로그아웃되었습니다.");
				//window.location.replace('/');
            }
        });
        return true;
	});
	
	//deploy investor contract
    $('.myPage .investContractBtn').click(function(){
        var data ={};
		var a = $(".myPage  .investPwd1").val();
        var b = $(".myPage  .investPwd2").val();
		var contractName = $(".myPage  .contractName").val();
		if(a!=b){
			alert('비밀번호가 일치하지 않습니다.');
			return false;
		}
		data.investPwd = a;
		data.contractName = contractName;
		console.log(data);
		var pre = "<a href='https://rinkeby.etherscan.io/address/";
		myFunction2(this);
		$.ajax({
            url: "/deployInvest",
            type: "post",
			data: data,
            success: function(result){
				myFunction2(this);
				$(".myPage .investContractContainer").append("<p>주소"+result.data+"로 배포되었습니다.</p>");
				$(".myPage .investContractContainer").append(pre+result.data+"'>contract 확인하기</a>");
				
			}
        });
		
		var btn = $(this);
        btn.prop('disabled',true);
        window.setTimeout(function(){
            btn.prop('disabled',false);
        },6000);
        return false;
    });
	function myFunction2(div) {
        $("#loader2").toggle();
    }

	/* registerProject page */

	/* manage reward list */
	$('.rewardEnter').click(function(){
		if($('.rewardList h4').length > 4){
			alert('최대 리워드 수는 5가지 입니다.');
		}else if($('.rewardName').val() == "" || $('.rewardPrice').val() == ""){
			alert('리워드정보를 입력해주세요');
		}else{
			$('.rewardList').append("<h4>"+$('.rewardName').val()+"&nbsp; "+$('.rewardPrice').val()+"wei</h4>");
		}
	});
	$('.rewardDelete').click(function(){
		$('.rewardList h4').last().remove();
	});

	var isDeployed =false ;
	$('button.deployCompany').click(function(){
		var contractName = $('input.contractName').val();
		var a = $('input.contractPwd1').val();
		var b = $('input.contractPwd2').val();
		var goalPrice = $('input.goalPrice').val();
		var goalDate = $('input.goalDate').val();
		console.log("날짜는 "+goalDate);
		if(a!=b){
			alert('비밀번호가 일치하지 않습니다.');
			return false;
		}
		if(contractName == "" ||  a == "" || goalPrice =="" || goalDate == ""){
			alert('값을 모두 입력해주세요');
			return false;
		}
		myFunction(this);
        $.ajax({
            url: "/deployCompany",
            type: "post",
            data: {
				contractName: contractName,
				contractPwd: a,
				goalPrice: goalPrice,
				goalDate: goalDate
			},
            success: function(result){
                myFunction(this);
				isDeployed = true;
                alert('기업용 스마트컨트택트가 생성되었습니다.');
            	var pre = "<a href='https://rinkeby.etherscan.io/address/";
                $("p.deployedCompany").append(pre+result+"\'&nbsp; target='_blank'>"+contractName+": "+result+"</a><br>");
			}
        });
        var btn = $(this);
        btn.prop('disabled',true);
        return false;
    });


	$('input.registerProjectBtn').click(function(){
		if($('.rewardName').val() == "" || $('.rewardPrice').val() == ""){
			alert('리워드정보를 입력해주세요');
		}else if(isDeployed){
			alert('기업용 스마트컨트랙트를 생성해주세요');
		}else{
			$.ajax({
        	    url: "/registerProject",
        	    type: "post",
        	    data: data,
        	    success: function(result){
        	        myFunction2(this);
					alert('등록되었습니다.');
					window.location.replace('/project');
        	    }
        	});
        	var btn = $(this);
        	btn.prop('disabled',true);
        	window.setTimeout(function(){
        	    btn.prop('disabled',false);
        	},6000);
        	return true;
		}
	});	
});





