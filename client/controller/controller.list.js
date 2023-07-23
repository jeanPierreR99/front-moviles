

function get_list_user() {
    ref_user.onSnapshot(function (snapshop) {

        user_list = snapshop.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        $("#render-list").html(
            user_list.map(data => {

                return `<div class="card mt-5">
                <!--Card 1-->
                <div class="sm:w-[350px] w-full rounded overflow-hidden shadow-2xl bg-gray-100bg-white ">
                  <div class="flex gap-2 h-[150px]">
                    <img class="w-6/12 h-full" src="${data.user_url_list}" alt="Mountain">
                    <img class="w-6/12 h-full" src="${data.user_url_photo}" alt="Mountain">
                  </div>
                  <div class="px-6 py-4">
                    <div class="font-bold text-md mb-2 flex gap-1 items-center text-orange-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                    <span class=" ">
                     ${data.user_list}</span></div>
                    <div class="font-bold text-md mb-2 flex gap-1 items-center text-red-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                    ${data.user_slogan}</div>
                    <div class="font-bold text-md mb-2 flex gap-1 items-center text-rose-700"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    ${data.user_candidato}</div>
                    <div class="font-bold text-md mb-2 flex gap-1 items-center text-rose-700"> <a href="${data.user_url_file}" target="__blank" class="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-gray-100 mr-2 mb-2 cursor-pointer hover:bg-red-600 transition delay-50 duration-300 ease-in-out">Ver lista</a></div>
                  </div>
                  <div class="px-6 pt-4 pb-2">
                    <button class="emit-voto inline-block w-full  text-center bg-red-500 rounded-full py-1 text-sm font-semibold text-gray-100 mr-2 mb-2 cursor-pointer hover:bg-red-600 transition delay-50 duration-300 ease-in-out" onclick="emitVoto('${data.id}')">Votar</button>
                  </div>
                </div>
              </div>`
            })
        )
    })

    validateVoto();
}


function validateVoto() {

    var get_storage_users = localStorage.getItem("current_user");
    var current_users = JSON.parse(get_storage_users);

    db.collection("Votos").where("code", "==", current_users.id).get().then((querySnapshot) => {
        if (!querySnapshot.empty) {

            var doc = querySnapshot.docs[0];
            console.log("Usuario encontrado: ", doc.data());
            $(".emit-voto").addClass("hidden")
        } else {
            console.log("No se encontró ningún usuario con ese nombre de usuario.");
        }
    })
        .catch((error) => {
            console.log("Error al obtener el documento: ", error);
        });
}
async function emitVoto(id) {
    var get_storage_users = localStorage.getItem("current_user");
    var current_users = JSON.parse(get_storage_users);

    var aux = await ref_user.doc("" + id + "").get().then((doc) => {
        return doc.data().user_point;
    })

    ref_user.doc("" + id + "").update({ "user_point": aux + 1 }).then(function () {

        var object = {
            id: "0",
            code: current_users.id,
            name: current_users.name_user,
            email: current_users.mail,
            date: date(),
        };
        db.collection("Votos")
            .add(object)
            .then(function (docRef) {
                var id = docRef.id;
                db.collection("Votos").doc("" + id + "").update({
                    id: id,
                }).then(function () {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Voto emitido",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(async function () {
                        $(".emit-voto").addClass("hidden")
                        const url = "https://email-nodejs.vercel.app/confirmation";
                        const data = {
                            email: current_users.mail,
                        };
    
                        const options = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                        };
    
                        await fetch(url, options)
                            .then((response) => response.json())
                            .then((data) => {
                                console.log("Respuesta del servidor:", data);
                            })
                            .catch((error) => {
                                console.error("Error:", error);
                            });
                            
                        localStorage.clear()
                        window.location = '/'
                    })
                });
            })
    })
}


