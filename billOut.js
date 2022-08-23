function bill_out(){
	let items = getAllFromDB();

	$.ajax({
		url:" http://localhost:8080/E-Commerce/CartController?billOut=orderout",
		type:"post",
		data:{
			items : JSON.stringify(items)
		},
		success:function(success){
		if(success=="success"){
			clearDB();
			updateItemCount();
		}
		},
		error:function(error){
			console.log("Error data is "+error);
		},
	});
	}
bill_out();