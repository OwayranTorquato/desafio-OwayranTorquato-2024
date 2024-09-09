import { RecintosZoo } from './recintos-zoo.js';

// Cria uma instância da classe RecintosZoo
const zoo = new RecintosZoo();

window.checkRecintos = () => {
    const especie = document.getElementById('animalSelect').value;
    const quantidade = parseInt(document.getElementById('quantityInput').value);

    // Chama a função analisaRecintos da instância da classe RecintosZoo
    const resultado = zoo.analisaRecintos(especie, quantidade);

    const resultDiv = document.getElementById('result');

    if (resultado.erro) {
        resultDiv.innerText = resultado.erro;
    } else {
        resultDiv.innerText = resultado.recintosViaveis.join('\n');
    }
};
