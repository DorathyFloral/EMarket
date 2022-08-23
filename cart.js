let db = "products";

function addItemToDB(id){
	var items=getAllFromDB();
	if(items.length<1){
		items.push({id:id,count:1});
		saveToDB(items);
	}else{
		var indx=items.findIndex(x=> x.id == id)
		indx.count = indx.count+1;
		if(indx == -1){
			items.push({id:id,count:1});
		}else{
			items[indx].count=items[indx].count+1;
		}
		saveToDB(items);
		}
		
	}

function saveToDB(items){
	clearDB();
	localStorage.setItem(db,JSON.stringify(items))
	updateItemCount();
	console.log (getAllFromDB());
}
function updateItemCount(){
	var items=getAllFromDB();
	document.getElementById("cartCount").innerHTML=items.length;
}
function  clearDB(){
	localStorage.removeItem(db);
}
function getAllFromDB(){
	var items= localStorage.getItem(db);
	if(items == null){
		return[];
	}
	return JSON.parse(items);
}
function toggleMenuIcon(){
	$(".sidebar").toggleClass("hide_sidebar");
	// $(".mymenu").toggleClass("fa-list fa-arrow-left");
}
	