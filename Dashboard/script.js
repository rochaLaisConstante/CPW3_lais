const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        if (email.trim() !== "" && senha.trim() !== "") {
            window.location.href = "dashboard.html";
        }
    });
}
const botaoSair = document.getElementById("sair");
if (botaoSair) {
    botaoSair.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}
const petForm = document.getElementById("petForm");
if (petForm) {
    petForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nomePet = document
            .getElementById("nomePet").value.trim();

        const nomeTutor = document
            .getElementById("nomeTutor").value.trim();

        if (nomePet === "" || nomeTutor === "") {
            alert("Preencha todos os campos!");
            return;
        }
        const tabela = document.getElementById("listaPets");
        const novaLinha = document.createElement("tr");
        const colunaPet = document.createElement("td");
        colunaPet.textContent = nomePet;
        const colunaTutor = document.createElement("td");
        colunaTutor.textContent = nomeTutor;
        novaLinha.appendChild(colunaPet);
        novaLinha.appendChild(colunaTutor);
        tabela.appendChild(novaLinha);

        const totalPets = document.getElementById("totalPets");

        totalPets.textContent =
            Number(totalPets.textContent) + 1;
        petForm.reset();
        alert("Pet cadastrado com sucesso!");
    });
}
