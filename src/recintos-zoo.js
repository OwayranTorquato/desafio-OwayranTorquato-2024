class RecintosZoo {
    // 1° Construir um array definindo os recitos e animais e suas propriedades
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(especie, quantidade) {
        // Percorrer o array verificando se o animal e a quantidade são válidos
        if (!this.animais[especie]) {
            return { erro: "Animal inválido" };
        } else if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        } else {
            const dadosAnimal = this.animais[especie];
            const tamanhoTotal = dadosAnimal.tamanho * quantidade;

            // Inicia um array vazio para armazenar os recintos viáveis
            const recintosViaveis = [];

            for (const recinto of this.recintos) {
                // Calcula o espaço total atualmente ocupado por animais existentes
                const espacoOcupado = recinto.animais.reduce((total, a) => total + a.quantidade * this.animais[a.especie].tamanho, 0);
                const espacoLivre = recinto.tamanho - espacoOcupado;

                // Verifica se o bioma do recinto é adequado para o animal especificado
                let biomaAdequado;
                if (especie === 'HIPOPOTAMO') {
                    // Hipopótamo precisa estar em 'savana e rio' se houver outros animais
                    biomaAdequado = (recinto.bioma === 'savana e rio') ||
                                    (recinto.animais.length === 0 && (recinto.bioma === 'savana' || recinto.bioma === 'rio'));
                } else {
                    // Outros animais verificam diretamente se o bioma do recinto está na lista de biomas adequados
                    biomaAdequado = dadosAnimal.biomas.includes(recinto.bioma) ||
                                    (recinto.bioma === 'savana e rio' && dadosAnimal.biomas.includes('savana') && dadosAnimal.biomas.includes('rio'));
                }

                // Verifica se o bioma é adequado e se há espaço suficiente
                if (!biomaAdequado) {
                    continue; // Bioma não é adequado
                } else if (espacoLivre < tamanhoTotal) {
                    continue; // Espaço não é suficiente
                } else if (dadosAnimal.carnivoro && recinto.animais.some(a => a.especie !== especie && this.animais[a.especie].carnivoro)) {
                    continue; // Carnívoros misturados
                } else if (recinto.animais.some(a => !this.animais[a.especie].biomas.includes(recinto.bioma))) {
                    continue; // Animais desconfortáveis no bioma
                } else if (especie === 'MACACO' && quantidade === 1 && espacoLivre === recinto.tamanho) {
                    continue; // Macacos não se sentem confortáveis sozinhos
                } else {
                    // Quando há mais de uma espécie no recinto, considera 1 espaço extra ocupado
                    const espacoExtra = (recinto.animais.length > 0 && !dadosAnimal.carnivoro) ? 1 : 0;
                    const espacoNecessario = tamanhoTotal + espacoExtra;

                    if (espacoLivre >= espacoNecessario) {
                        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - tamanhoTotal} total: ${recinto.tamanho})`);
                    }
                }
            }

            if (recintosViaveis.length === 0) {
                return { erro: "Não há recinto viável" };
            } else {
                // Ordena os recintos viáveis pelo número do recinto
                recintosViaveis.sort((a, b) => {
                    const numeroA = parseInt(a.match(/\d+/)[0]);
                    const numeroB = parseInt(b.match(/\d+/)[0]);
                    return numeroA - numeroB;
                });

                return { recintosViaveis };
            }
        }
    }
}

export { RecintosZoo };
