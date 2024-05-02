export class ErrorMessages {
  static get generic() { return 'Tivemos um problema e não foi possível processar sua solicitação. Por favor tente novamente.' }

  static account = class {
    static get notFound() { return 'Conta não encontrada.' }
  }

  static emergency = class {
    static grandeza = class {
      static get notFound() { return 'Grandeza não encontrada.' }
      static alreadyExists(nome: string) { return `Grandeza '${nome}' já cadastrada.` }
    }

    static tipoEmergencia = class {
      static get notFound() { return 'Tipo de Emergência não encontrado.' }
      static alreadyExists(nome: string) { return `Tipo de Emergência '${nome}' já cadastrada.` }
    }

    static sensor = class {
      static get notFound() { return 'Sensor não encontrado.' }
      static alreadyExists(nome: string) { return `Sensor '${nome}' já cadastrado.` }
    }
  }
}