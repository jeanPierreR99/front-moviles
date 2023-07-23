var get_storage_users = localStorage.getItem("current_user");
var current_users = JSON.parse(get_storage_users);

if(!current_users){
  console.log("no hay")
  window.location = '/'
}