class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: "savana", tamanhoTotal: 10, animais: [{ especie: "macaco", quantidade: 3 }] },
        { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: [] },
        { numero: 3, bioma: "savana e rio", tamanhoTotal: 7, animais: [{ especie: "gazela", quantidade: 1 }] },
        { numero: 4, bioma: "rio", tamanhoTotal: 8, animais: [] },
        { numero: 5, bioma: "savana", tamanhoTotal: 9, animais: [{ especie: "leao", quantidade: 1 }] },
      ];
  
      this.animaisPermitidos = [
        { especie: "leao", tamanho: 3, biomas: ["savana"], carnivoro: true },
        { especie: "leopardo", tamanho: 2, biomas: ["savana"], carnivoro: true },
        { especie: "crocodilo", tamanho: 3, biomas: ["rio"], carnivoro: true },
        { especie: "macaco", tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
        { especie: "gazela", tamanho: 2, biomas: ["savana"], carnivoro: false },
        { especie: "hipopotamo", tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
      ];
    }
  
    analisaRecintos(animal, quantidade) {
      const especieAnimal = this.animaisPermitidos.find(a => a.especie === animal.toLowerCase());
      if (!especieAnimal) {
        return { erro: "Animal inválido", recintosViaveis: null };
      }
  
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: "Quantidade inválida", recintosViaveis: null };
      }
  
      const recintosViaveis = [];
  
      for (const recinto of this.recintos) {
        // Verifica se o bioma do recinto é compatível com o bioma do animal
        if (!especieAnimal.biomas.some(bioma => recinto.bioma.includes(bioma))) continue;
  
        // Se o animal for carnívoro, verifica se há outras espécies no recinto
        if (especieAnimal.carnivoro) {
          const outrasEspecies = recinto.animais.filter(a => a.especie !== especieAnimal.especie);
          if (outrasEspecies.length > 0) {
            continue; // Se houver outras espécies, o recinto não é viável
          }
        }
  
        const espacoNecessario = quantidade * especieAnimal.tamanho;
        let espacoOcupado = 0;
  
        // Verifica se há espécies carnívoras no recinto
        for (let animalExistente of recinto.animais) {
          const especieExistente = this.animaisPermitidos.find(a => a.especie === animalExistente.especie);
  
          // Verifica se a espécie existente no recinto é carnívora
          if (especieExistente.carnivoro) {
            // Se já houver um animal carnívoro diferente no recinto, ele não pode ser compartilhado
            if (especieExistente.especie !== especieAnimal.especie) {
              espacoOcupado += Number.MAX_SAFE_INTEGER; // Impede o uso deste recinto
            }
          }
  
          espacoOcupado += animalExistente.quantidade * especieExistente.tamanho;
        }
  
        // Se há mais de uma espécie no recinto, adiciona 1 de espaço extra
        if (recinto.animais.length > 0 && !recinto.animais.every(a => a.especie === especieAnimal.especie)) {
          espacoOcupado += 1;
        }
  
        const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
  
        if (espacoDisponivel >= espacoNecessario) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanhoTotal})`);
        }
      }
  
      if (recintosViaveis.length > 0) {
        return { erro: null, recintosViaveis };
      } else {
        return { erro: "Não há recinto viável", recintosViaveis: null };
      }
    }
  }
  
  export { RecintosZoo as RecintosZoo };