// Endereço da API do professor
const url = "https://nerd.tec.br/etec162/api/spusuarios.php?jsn="
    + encodeURIComponent(JSON.stringify({ nome: "" }));

// Localizar a tabela
const tabela = document.getElementById("tabelaUsuarios");

// Consumir a API
fetch(url)

    .then(resposta => {

        if (!resposta.ok) {
            throw new Error("Erro ao acessar a API");
        }

        return resposta.json();

    })

    .then(usuarios => {

        console.log("Dados recebidos da API:", usuarios);

        // Limpar a mensagem de carregamento
        tabela.innerHTML = "";

        // Percorrer os dados recebidos
        usuarios.forEach(usuario => {

            const linha = document.createElement("tr");

            // Aceitar os nomes dos campos da API
            const id = usuario.usuid ?? usuario.id;
            const nome = usuario.usunome ?? usuario.nome;
            const login = usuario.usulogin ?? usuario.login;

            const status = usuario.usulogado !== undefined
                ? (usuario.usulogado == 1 ? "Sim" : "Não")
                : usuario.logado;

            // Criar as colunas
            linha.innerHTML = `
                <td>${id}</td>
                <td>${nome}</td>
                <td>${login}</td>
                <td>${status}</td>
            `;

            // Adicionar na tabela
            tabela.appendChild(linha);

        });

    })

    .catch(erro => {

        console.error("Erro ao carregar os usuários:", erro);

        tabela.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-danger">
                    Erro ao carregar os dados da API!
                </td>
            </tr>
        `;

    });