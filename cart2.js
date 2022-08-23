 let responseItems="";
function requestProduct(){
	let items = getAllFromDB();

	$.ajax({
		url:" http://localhost:8080/E-Commerce/CartController?billOut=billout",
		type:"post",
		data:{
			items : JSON.stringify(items)
		},
		success:function(success){
			responseItems = JSON.parse(success);
			loadToShowProduct();
		},
		error:function(error){
			console.log("Error data is "+error);
		},
	});
	}
function loadToShowProduct(){
	var tableData = "";
	var gTotal = 0;
	responseItems.forEach((product,i)=>{
		var count = i +1;
	 tableData +=`<tr> 
	 <td>${count}</td>
	  <td>${product.name}</td>
	  <td>$${product.price}</td>
	   <td><img src="${product.image}" style="width=10 height=10"/></td> 
	   <td><button class="btn btn-danger btn-sm"><i class="fa fa-minus" onclick="Remove1Item(${product.id})"></i></button>
	   <span>${getItemCount(product.id)}</span>
	   <button class="btn btn-primary btn-sm" onclick="add1Item(${product.id})"><i class="fa fa-plus"></i></button>
	   <button class="btn btn-warning btn-sm" onclick="removeFromTrash(${product.id})"><i class="fa fa-trash"></i></button></td> 
	   <td>$${getItemCount(product.id)*product.price}</td>
	    </tr>`;
		gTotal += 	getItemCount(product.id)*product.price;
    });  
    		 tableData +=`<tr>
    		 <td colspan="5" class="text-center">Total Amount</td>
	  		<td>$ ${gTotal}</td>
    		  </tr>`;
    	   	
		document.getElementById("tableBd").innerHTML=tableData;
}
function add1Item(id){
	addItemToDB(id);
	loadToShowProduct();
}
function Remove1Item(id){
	let items = getAllFromDB();
	let indx=items.findIndex(x=> x.id == id);
		if(indx != -1){
			if(items[indx].count > 1){
	items[indx].count=items[indx].count-1;
	}
}saveToDB(items);		
loadToShowProduct();
updateItemCount();
}
function removeFromTrash(id){
	let items = getAllFromDB();
	let indx=items.findIndex(x=> x.id == id);
	if(indx != -1){
			items.splice(indx,1);
	}
	saveToDB(items);
	let ind =responseItems.findIndex(x=> x.id == id);
		if(ind != -1){
			responseItems.splice(ind,1);
		}
loadToShowProduct();
updateItemCount();
}
function getItemCount(id){
	let items = getAllFromDB();
	let indx=items.findIndex(x=> x.id == id);
	if(indx != -1){
	return items[indx].count;
}return 0;
}
	requestProduct();