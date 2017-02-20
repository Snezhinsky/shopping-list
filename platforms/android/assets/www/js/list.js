var totalPrice = 0;
var totalWeight = 0;

function getItemlist(obj){
  var db = openDatabase('shoplistdb_test1', '1.0', 'shoplistdb_test1','2 * 1024 * 1024');
  var shItem = document.getElementById("shopping_list_item").value;
  var itemWeight = document.getElementById("weight_Item").value;
  var itemPrice = document.getElementById("price_Item").value;
  var itemState = 'nonmarked';
  if (isNaN(itemWeight) || itemWeight === null) {
    itemWeight = 0;
  };
  if (isNaN(itemPrice) ) {
    itemPrice = 0
  };


  db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS shoplist_list (id integer primary key autoincrement, tasks, weiht, price, state)');
      tx.executeSql('INSERT INTO shoplist_list (tasks, weiht, price, state) VALUES (?, ?, ?, ?)', [shItem, itemWeight, itemPrice, itemState]);
    });

  db.transaction(function(tx) {
      tx.executeSql("SELECT * FROM shoplist_list", [], function(tx, result) {
      listItems.innerHTML = '';
      for(var i = 0; i < result.rows.length; i++) {
      listItems.innerHTML += "<li id = id"+result.rows.item(i).id+">"  + result.rows.item(i).tasks + "    " + result.rows.item(i).weiht +" кг. " + result.rows.item(i).price + " грн. " +
      "<button class = 'deleteBtn' onclick = deleteItem(" + result.rows.item(i).id + ") > x </button> <button class = 'markBtn' onclick = markItem(" + result.rows.item(i).id +
      ") > done </button></li>";

      //getting information from DB and the items marking acording to state from DB
      var id = result.rows.item(i).id;
      var idi = 'id' + id;
      var element = document.getElementById(idi);
      var ISt = result.rows.item(i).state;
       if (ISt === "marked") {
        element.className += 'finished';}
     //-----
      totalWeight += parseFloat(result.rows.item(i).weiht);
      totalPrice += parseFloat(result.rows.item(i).price);

      total.innerHTML = "<a> total cost - " + totalPrice +  "c.u. </a><br> <a> total weight - " + totalWeight +  "kg. </a><br>"
       };
       },null);
  });

   document.getElementById("shopping_list_item").value = "";
   document.getElementById("weight_Item").value = "";
   return document.getElementById("price_Item").value = "";

};


function deleteItem(id){
  var db = openDatabase('shoplistdb_test1', '1.0', 'shoplistdb_test1','2 * 1024 * 1024');
    db.transaction(function(tx) {
    tx.executeSql("DELETE FROM shoplist_list WHERE ID=?", [id]);
    });

    db.transaction(function(tx) {
         tx.executeSql("SELECT * FROM shoplist_list", [], function(tx, result) {
        listItems.innerHTML = '';
         for(var i = 0; i < result.rows.length; i++) {




           listItems.innerHTML += "<li id = id"+result.rows.item(i).id+">"  + result.rows.item(i).tasks + "    " + result.rows.item(i).weiht +" кг. " + result.rows.item(i).price + " грн. " +
           "<button class = 'deleteBtn' onclick = deleteItem(" + result.rows.item(i).id + ") > x </button> <button class = 'markBtn' onclick = markItem(" + result.rows.item(i).id +
           ") > done </button></li>";

           //item marking

           var id = result.rows.item(i).id;
           var idi = 'id' + id;
           var element = document.getElementById(idi);

           var ISt = result.rows.item(i).state;

                     if (ISt === "marked") {
                         element.className += 'finished';}



         //-----

         totalWeight += parseFloat(result.rows.item(i).weiht);
         totalPrice += parseFloat(result.rows.item(i).price);
         total.innerHTML = "<a> total cost - " + totalPrice +  "c.u. </a><br> <a> total weight - " + totalWeight +  "kg. </a><br>"          };
          },null);
     });
};

function markItem(id){
  var ISt;
  var IStm = 'marked';
  var IStmNon = 'nonmarked';
  var db = openDatabase('shoplistdb_test1', '1.0', 'shoplistdb_test1','2 * 1024 * 1024');
  var idi = 'id' + id;
  var element = document.getElementById(idi);

      db.transaction(function(tx) {
      tx.executeSql("SELECT state FROM shoplist_list where id=?", [id], function (tx, result) {
      ISt = result.rows.item(0).state;

      //changing the list item scc style and nonmarked to marked in DB
          if (ISt === "nonmarked") {
              element.className += 'finished';
              db.transaction(function(tx) {
              tx.executeSql('UPDATE shoplist_list SET state=? WHERE id=?',[IStm, id]); });
            }
          else {
              element.className = element.className.replace(/finished/g, '');
              db.transaction(function(tx) {tx.executeSql('UPDATE shoplist_list SET state=? WHERE id=?',[IStmNon, id]); });
            };

      //
          });
      });
};


//______________________
function loadlist(obj){
  var db = openDatabase('shoplistdb_test1', '1.0', 'shoplistdb_test1','2 * 1024 * 1024');
    db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS shoplist_list (id integer primary key autoincrement, tasks, weiht, price, state)');

    });

 db.transaction(function(tx) {
      tx.executeSql("SELECT * FROM shoplist_list", [], function(tx, result) {
      listItems.innerHTML = '';
      for (var i = 0; i < result.rows.length; i++) {
      listItems.innerHTML += "<li id = id"+result.rows.item(i).id+">"  + result.rows.item(i).tasks + "    " + result.rows.item(i).weiht +" кг. " + result.rows.item(i).price + " грн. " +
      "<button class = 'deleteBtn' onclick = deleteItem(" + result.rows.item(i).id + ") > x </button> <button class = 'markBtn' onclick = markItem(" + result.rows.item(i).id +
      ") > done </button></li>";

      //item marking
      var id = result.rows.item(i).id;
      var idi = 'id' + id;
      var element = document.getElementById(idi);

      var ISt = result.rows.item(i).state;

                if (ISt === "marked") {
                    element.className += 'finished';}

    //-----

      totalWeight += parseFloat(result.rows.item(i).weiht);
      totalPrice += parseFloat(result.rows.item(i).price);
      total.innerHTML = "<a> total cost - " + totalPrice +  "c.u. </a><br> <a> total weight - " + totalWeight +  "kg. </a><br>"       };
       },null);
  });
};
