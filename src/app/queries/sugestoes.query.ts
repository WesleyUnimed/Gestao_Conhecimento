import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class SugestoesQuery {

  constructor(
  ) {
  }

  Get_Suggestion() {
    return `
    {
      sugestoes_aggregate(where: {dt_arquivamento: {_is_null: true}}) {
        aggregate {
          count
        }
        nodes {
          nm_titulo
          dt_sugestao
          dt_arquivamento
          ds_sugestao
          cd_sugestao
        }
      }
    }    
    `
  }

  Set_File_Suggestion(){
    return `
    mutation ($data: date, $cd_sugestao: Int) {
      update_sugestoes(where: {cd_sugestao: {_eq: $cd_sugestao}}, _set: {dt_arquivamento: $data}) {
        returning {
          dt_arquivamento
          cd_sugestao
        }
      }
    }
    `
  }

  Filter_Suggestion(){
    return `
    
    `
  }

  Set_Add_Suggestion(){
    return `
    mutation ($titulo: String, $descricao: String) {
      insert_sugestoes(objects: {nm_titulo: $titulo, ds_sugestao: $descricao}) {
        returning {
          ds_sugestao
          nm_titulo
          cd_sugestao
          cd_usuario
        }
      }
    }
    `
  }
}
