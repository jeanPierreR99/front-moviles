function showModalAddList(){
    $("#addModalList").show()
}
function hideModalAddList(){
    $("#addModalList").hide()
}

function add_list_user() {
    var img1 = document.getElementById("user_list");
    var list = img1.files[0];
    var img2 = document.getElementById("user_photo");
    var photo = img2.files[0];
    var img3 = document.getElementById("user_file");
    var file = img3.files[0];
    var user_name = $("#name_candidato").val();
    var name_list = $("#name_list").val();
    var user_slogan = $("#user_slogan").val();

    if (
        user_name == ""
    ) {
        Swal.fire({
            position: "center",
            icon: "info",
            title: "Rellene todo los campos",
            showConfirmButton: false,
            timer: 1500,
        });
    } else {
        var ref_storage1 = storage.ref("User/" + list.name + "");
        var ref_storage2 = storage.ref("User/" + photo.name + "");
        var ref_storage3 = storage.ref("User/" + file.name + "");

        ref_storage1.put(list).then(function (snapshop) {
            ref_storage1.getDownloadURL().then(function (url1) {
                ref_storage2.put(photo).then(function (snapshop) {
                    ref_storage2.getDownloadURL().then(function (url2) {
                        ref_storage3.put(file).then(function (snapshop) {
                            ref_storage3.getDownloadURL().then(function (url3) {

                                var object = {
                                    id: "0",
                                    date: date(),
                                    user_candidato: user_name,
                                    user_list: name_list,
                                    user_slogan: user_slogan,
                                    user_url_list: url1,
                                    user_url_photo: url2,
                                    user_url_file: url3,
                                    user_point: 0
                                };
                                ref_user
                                    .add(object)
                                    .then(function (docRef) {
                                        var id = docRef.id;
                                        Swal.fire({
                                            position: "center",
                                            icon: "success",
                                            title: "Usuario Agregado",
                                            showConfirmButton: false,
                                            timer: 1500,
                                        });
                                        ref_user.doc("" + id + "").update({
                                            id: id,
                                        });
                                    })
                                    .catch(function (error) {
                                        console.log("error en: " + error)
                                    });

                            });
                        });
                    });
                });
            });
        });
    }
}

function get_list() {
    ref_user.onSnapshot(function (snapshop) {
        $("#table-list").DataTable().destroy()

        user_list = snapshop.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        $("#table-list-render").html(
            user_list.map(data => {

                return `<tr class="hover:bg-gray-100">
        <td class="border-b w-[250px]">${data.date}</td>
        <td class="border-b w-[250px]">${data.user_candidato}</td>
        <td class="border-b flex gap-4 justify-center"><img class="w-[70px] h-[70px]" src="${data.user_url_list}" alt=""><img class="w-[70px] h-[70px]" src="${data.user_url_photo}" alt=""></td>
        <td class="border-b"><a href="${data.user_url_file}" target="__blank"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
      </a></td>
      <td class="border-b w-[100px]">${data.user_point}</td>
        <td class="border-b"><div class="relative group inline-block text-left">
        <div>
          <button type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
            Options
            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="absolute group-hover:block hidden right-0 z-10 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div role="none">
            <a href="#" class="flex hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
           Editar</a>
            <a href="#" class="flex hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
           Eliminar</a>
          </div>
        </div>
      </div></td>
      </tr>`
            })
        )

        $("#table-list").dataTable({
            //   paging: false,
            // ordering: false,
            // info: false,
          });
          $("#table-list_length").removeClass("dataTables_length")
    })
}

function get_list_users() {
    ref_voto.onSnapshot(function (snapshop) {
        $("#table-users").DataTable().destroy()

        voto = snapshop.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
console.log(voto)
        $("#table-users-render").html(
            voto.map(data => {

                return `<tr class="hover:bg-gray-100">
        <td class="border-b w-[250px]">${data.date}</td>
        <td class="border-b w-[250px]">${data.code}</td>
        <td class="border-b w-[250px]">${data.name}</td>
        <td class="border-b w-[250px]">${data.email}</td>
        <td class="border-b"><div class="relative group inline-block text-left">
        <div>
          <button type="button" class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
            Options
            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="absolute group-hover:block hidden right-0 z-10 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
          <div role="none">
            <a href="#" class="flex hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
           Editar</a>
            <a href="#" class="flex hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
           Eliminar</a>
          </div>
        </div>
      </div></td>
      </tr>`
            })
        )

        $("#table-users").dataTable({
            //   paging: false,
            // ordering: false,
            // info: false,
          });
          $("#table-users_length").removeClass("dataTables_length")
    })
}



