$(document).ready(function () {
  listIsi()
  window.addEventListener('hashchange', function (event) {
    direction = window.location.hash;
    if (direction == "#list/ISI") {
      listIsi();
    }
    else if (direction == "#list/ENF") {
      listENF()
    }
    else if (direction == "#list/AGRO") {
      listAGRO();
    }
    else if (direction == "#estadistica") {
      estadistica();
    }
  })

});

//path 
function listIsi() {
  window.location.hash = "#list/ISI";
  $("#body-content").html(content_list);
  get_list()
  get_list_users()
}
function listENF() {
  $("#body-content").html("LISTA DE ENFERMERIA");
}
function listAGRO() {
  $("#body-content").html("sedes");
}
 function estadistica() {
  $("#body-content").html(content_estadistica);
  getUserCharts()
}
//-----------------------------------------------
const content_list = () => {
  return `  <div
    id="addModalList"
    tabindex="-1"
    aria-hidden="true"
    style="background: rgba(0, 0, 0, 0.082)"
    class="hidden fixed top-0 left-0 backdrop-blur-sm right-0 z-50 items-center justify-center w-full p-4 overflow-y-auto md:inset-0 max-h-full flex "
  >
    <div
      class="relative w-full h-auto max-w-2xl max-h-full my-2 m-auto"
      style="z-index: 99999"
    >
      <!-- Modal content -->
      <form
        action="#"
        class="relative bg-white rounded-lg shadow dark:bg-gray-700 h-full"
      >
        <!-- Modal header -->
        <div
          class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Nueva Lista
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onclick="hideModalAddList()"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <div class="flex flex-col gap-3">
            <div class="">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nombre del candidato</label
              >
              <input
                type="text"
                name="first-name"
                id="name_candidato"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required=""
              />
            </div>
            <div class="">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >N° de lista</label
              >
              <input
                type="text"
                name="name_list"
                id="name_list"
                class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required=""
              />
            </div>
            <div class="">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Slogan</label
            >
            <input
              type="text"
              name="user_slogan"
              id="user_slogan"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required=""
            />
          </div>
            <div class="col-span-6 sm:col-span-3 flex items-center">
            <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 w-[200px] dark:text-white"
            >Lista</label
          >
              <input type="file" id="user_list" class="block w-full text-sm text-slate-500 rounded-full file:rounded-full" />
            </div>
            <div class="col-span-6 sm:col-span-3 flex items-center">
            <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 w-[200px] dark:text-white"
            >Foto</label
          >
              <input type="file" id="user_photo" class="block w-full text-sm text-slate-500 rounded-full file:rounded-full" />
            </div>
            <div class="col-span-6 sm:col-span-3 flex items-center">
            <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 w-[200px] dark:text-white"
            >Documento</label
          >
              <input type="file" id="user_file" class="block w-full text-sm text-slate-500 rounded-full file:rounded-full" />
            </div>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600 justify-end"
        >
          <button
            onclick="add_list_user()"
            type="button"
            class="bg-[var(--new-button)] hover:bg-[var(--hover-new-button)] text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
  <!-- end modal -->
  <div class="px-4 overflow-y-auto bg-white">
  <div class="text-gray-500 text-sm"><a>Accesos</a><span>&nbsp/&nbsp</><a class="text-gray-700">Lista<a/></div>
    <div class="flex justify-between mb-4">
      <span class="text-lg font-medium text-gray-700">Lista de candidatos</span>
      <button
      class="bg-[var(--new-button)] py-2 px-4 text-white rounded-md hover:bg-[var(--hover-new-button)]"
        type="button"
        onclick="showModalAddList()"
      >
        +&nbsp;Nuevo
      </button>
    </div>
    <div class="w-full overflow-x-auto">
      <!-- table -->
      <table id="table-list" class="w-full text-left">
        <thead class="bg-gray-100">
          <tr class="text-gray-500 text-sm">
            <th
              class="px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"
            >
              Fecha de registro
            </th>
            <th
            class="px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"
          >
            Nombre completo
          </th>
            <th
              class="px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"
            >
              N° lista y candidato
            </th>
            <th
              class="px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"
            >
              Documento
            </th>
            <th
              class="px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"
            >
              Puntos
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody id="table-list-render" class="text-gray-500 text-sm">
          
        </tbody>
      </table>
  </div>
  <div class="mt-7">
  <span class="text-lg font-medium text-gray-700 mt-50">Votos Registrados</span>
  <div class="w-full mt-7 overflow-x-auto">
      <!-- table -->
      <table id="table-users" class="w-full text-left">
        <thead class="bg-gray-100">
          <tr class="text-gray-500 text-sm">
            <th
              class="px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"
            >
              Fecha de registro
            </th>
            <th
            class="px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"
          >
            Código
          </th>
            <th
              class="px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"
            >
              Nombres
            </th>
            <th
              class="px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800"
            >
              Correo
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody id="table-users-render" class="text-gray-500 text-sm">
          
        </tbody>
      </table>
  </div>
  `
}

const content_estadistica = ()=>{

  return ` 
  <center class="text-lg font-medium text-gray-700 mt-50"><h1>Lista ISI</h1></center>
  <div class="container">
  <div class="my-4 md:flex flex-row">
      <div class="md:w-6/12 w-full">
          <div id="chart3" class="chart w-full min-h-[400px]"></div>
      </div>
      <div class="md:w-6/12 w-full">
          <div id="chart4" class="chart w-full min-h-[400px]"></div>
      </div>
  </div>
</div>`
}
