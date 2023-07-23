$(document).ready(function () {

  var get_storage_user = localStorage.getItem('current_user');
  var current_user = JSON.parse(get_storage_user);

  // if (current_user.type_user == "admin") {
  role_admin()
  window.addEventListener('hashchange', function (event) {
    direction = window.location.hash;
    if (direction == "#access/rol") {
      role_admin();
    }
    else if (direction == "#estadistica") {
      estadistica()
    }
  })
  // }

});

//path 
function role_admin() {
  window.location.hash = "#access/rol";
  $("#body-content").html(content_list);
  get_list_user()
}
function estadistica() {
  $("#body-content").html(content_estadistica);
  getUserCharts()
}
//-----------------------------------------------
const content_list = () => {
  return `
  <div class="px-4 bg-white">
  <div class="text-gray-500 text-sm"><a>Lista</a><span>&nbsp/&nbsp</><a class="text-gray-700">ISI<a/></div>
    <div class="flex justify-between mb-4">
      <span class="text-lg font-medium text-gray-700">Lista de candidatos</span>
    </div>
    <div class="w-full flex sm:flex-row flex-col justify-around" id="render-list">
  </div>`
}

const content_estadistica = ()=>{

  return ` 
  <center class="text-lg font-medium text-gray-700 mt-50"><h1>Lista ISI</h1></center>
  <div class="container">
  <div class="my-4 md:flex flex-row">
      <div class="md:w-6/12 w-full overflow-x-auto">
          <div id="chart3" class="chart w-full min-h-[400px]"></div>
      </div>
      <div class="md:w-6/12 w-full overflow-x-auto">
          <div id="chart4" class="chart w-full min-h-[400px]"></div>
      </div>
  </div>
</div>`
}
