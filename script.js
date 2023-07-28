// Algoritmo

// OK 1. Pegar os valores dos inputs (função receberValores)
// OK 2. Fazer o Cálculo do IMC -> valorIMC ( função calcularImc)
// OK 3. Gerar a classificação IMC -> clasificacaoImc
// OK 4. Organizar os dados do usuário para salvar na lista e gerar a data de cadastro ( função organizarDados)
// OK 5. Inserir o usuário na lista ( salvar no localStorange)
// OK 6. Função para carregar os usuários (localStorange), chamar ao carregar a página
// 7. Renderizar o conteúdo da tabela com os usuários cadastrados
// 8. Botão para limpar os registros (localStorange)



function calcular(event){

    event.preventDefault() //previne o recarregar da pagina
    
    console.log("Foi executada a função calcular")
    
    let usuario = receberValores()
    
    let imcCalculado = calcularImc(usuario.altura, usuario.peso)
    
    let classificacaoImc = classificarImc (imcCalculado)
    
    console.log (classificacaoImc)
    
    organizarDados (usuario, imcCalculado , classificacaoImc)
    
    usuario = organizarDados (usuario, imcCalculado , classificacaoImc)
    
    cadastrarUsuario(usuario)
    
    
    
    }
    
    
    function receberValores() {
    let nomeRecebido = document.getElementById("nome").value.trim()
    let alturaRecebida = document.getElementById("altura").value
    let pesoRecebido = document.getElementById("peso").value
    
    let dadosUsuarios = {
    
    nome: nomeRecebido,
    altura: alturaRecebida,
    peso: pesoRecebido
    
    }
    console.log (dadosUsuarios)
    
    return dadosUsuarios
    
    }
    
    function calcularImc(altura, peso) {
    
    let imc = peso / (altura*altura)
    
    console.log (imc)
    
    return imc
    
    }
    
    function classificarImc(imc) {
    
    /*
    Resultado Situação
    
    Abaixo 18.5 Abaixo do peso
    Entre 18.5 e 24.99 Peso normal
    Entre 25.0 e 29.99 Sobrepeso
    Acima de 30 Obesidade
    
    */
    
    if(imc < 18.5 ) {
    
    return " Abaixo do peso"
    
    } else if ( imc >=18.5 && imc < 25) {
    
    return " Peso normal"
    
    } else if ( imc >=25 && imc < 30) {
    
    return " Sobrepeso"
    
    } else {
    
    return " Obesidade"
    }
    
    
    }
    
    function organizarDados (dadosUsuarios, valorImc, classificacaoImc) {
    
    let dataHoraAtual = new Intl.DateTimeFormat ("pt-BR", { timeStyle:"long", dateStyle: "short" }).format(Date.now())
    
    
    console.log (dataHoraAtual);
    
    let dadosUsuarioAtualizado = {
    
    ...dadosUsuarios,
    imc: valorImc,
    situacaoImc: classificacaoImc,
    dataCadastro: dataHoraAtual
    
    
    }
    
    return dadosUsuarioAtualizado
    
    }
    
    function cadastrarUsuario (dadosUsuario) {
    
    let listaUsuarios = []
    
    if(localStorage.getItem("usuariosCadastrados")!= null) {
    
    listaUsuarios = JSON.parse ( localStorage.getItem("usuariosCadastrados"))
    
    }
    
    
    //adicionar o usuario na lista de usuarios
    
    listaUsuarios.push(dadosUsuario)
    
    //salvar a listaUsuarios no localStorange
    
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
    
    
    }
    
    function carregarUsuarios () {
    let listaCarregada = []
    
    if( localStorage.getItem ("usuariosCadastrados") != null) {
    
    listaCarregada = JSON.parse (localStorage.getItem( "usuariosCadastrados"))
    
    }
    
    
    if(listaCarregada.length == 0) {
    
    // Se náo tiver nenhum usuario cadastrado, mostrar mensagem
    
    let tabela = document.getElementById ("corpo-tabela")
    
    tabela.innerHTML = `<tr class ="linha-mensagem">
    
    <td colspan ="6">Nenhum usuario cadastrado 😊❤️
    :( </td > </tr>`
    
    } else {
    
    // Montar conteudo da tabela
    
    montarTabela(listaCarregada)
    }
    
    console.log (listaCarregada)
    
    
    }
    
    window.addEventListener("DOMContentLoaded", () => carregarUsuarios() )
    
    
    // Passo 7
    function montarTabela(listaUsuarios) {
    
    let tabela = document.getElementById ("corpo-tabela")
    
    let template = ""
    
    listaUsuarios.forEach(usuario => {
        template += `<tr>
                
       
        <td data-cell="nome">${usuario.nome}</td>
        <td data-cell="altura">${usuario.altura}</td>
        <td data-cell="peso">${usuario.peso}</td>
        <td data-cell="valor do IMC">${usuario.imc.toFixed(2)}</td>
        <td data-cell="classificação do IMC">${usuario.situacaoImc}</td>
        <td data-cell="data de cadastro">${usuario.dataCadastro}</td>
        </tr>`
        
        //console.log("O usuário é: ", usuario )
        
        
        })
        
        tabela.innerHTML = template;
        
        }
        
        function deletarRegistros() {
        
        
        // remove o item do localStorange
        localStorage.removeItem ("usuariosCadastrados")
        
        
        // recarrega pagina
        window.location.reload()
        
        }
        