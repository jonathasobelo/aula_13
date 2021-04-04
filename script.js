function acessarApi(url, funcao) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            funcao(JSON.parse(this.responseText));
        }
    }
    xhttp.open('GET', url, true);
    xhttp.send();
}
function montarRegiao(lsRegiao) {
    var select = document.getElementById('regiao');
    select.addEventListener("change", function () {
        var url = 'https://servicodados.ibge.gov.br/api/v1/localidades/'
        if (this.value == "selecione") {
            url += 'estados';

            document.getElementById('municipio').innerHTML = ''
            var opcao = document.createElement('option');
            opcao.value = "";
            opcao.innerHTML = "Selecione";
            document.getElementById('municipio').appendChild(opcao);

        } else {
            url += `regioes/ ${this.value}/estados`

            document.getElementById('municipio').innerHTML = '';
                var opcao = document.createElement('option');
                opcao.value = "" ;
                opcao.innerHTML = "Selecione"
                document.getElementById('municipio').appendChild(opcao);
        }
        if (this.value) 
        console.log(this.value)
        acessarApi(url, montarUf);
    }
    );
    
    for (i in lsRegiao) {
        console.log(lsRegiao[i]);
        opcao = document.createElement("option");
        opcao.value = lsRegiao[i].id ;
        opcao.innerHTML =`${lsRegiao[i].nome}(${lsRegiao[i].sigla})`;
        document.getElementById('regiao').appendChild(opcao);
    }
}

function montarUf(lsUf) {

    var select = document.getElementById('uf');
    select.addEventListener('change', function () {
        acessarApi(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${this.value}/municipios`, montarMunicipio);

    });
        document.getElementById('uf').innerHTML = ''
        var opcao = document.createElement('option')
        opcao.value = ""
        opcao.innerHTML = "Selecione"
        document.getElementById('uf').appendChild(opcao)
    
        
        for( i in lsUf) {
        
        console.log(lsUf[i])
        let opcao = document.createElement('option')
        opcao.value = lsUf[i].id
        opcao.innerHTML = `${lsUf[i].nome}  (${lsUf[i].sigla})`
        document.getElementById('uf').appendChild(opcao)
        }
    }
        function montarMunicipio(lsMunicipio) {

            document.getElementById('municipio').innerHTML = '';
            var opcao = document.createElement('option');
            opcao.value = "" ;
            opcao.innerHTML = "Selecione";
            document.getElementById('municipio').appendChild(opcao);
            for (i in lsMunicipio) {
                var option = document.createElement('option');
                option.value = lsMunicipio[i].id ;
                option.innerHTML = lsMunicipio[i].nome ;
                document.getElementById('municipio').appendChild(option);

            }
        }
    
        acessarApi('https://servicodados.ibge.gov.br/api/v1/localidades/regioes', montarRegiao);
        acessarApi('https://servicodados.ibge.gov.br/api/v1/localidades/estados', montarUf);
