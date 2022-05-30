import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { SugestoesService } from '../sugestoes.service';

@Component({
  selector: 'app-sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.scss']
})
export class SugestoesComponent implements OnInit {

/**@description Recebe o array de sugestões */
  obj_Array_Sugestoes

  /**@description Título da página */
  ds_Titulo: string = "Sugestões"

  /**@description Number que vai receber o número de sugestões cadastradas pelo usuário */
  nr_Minhas_Sugestoes: number = 0

  /**@description Number que vai receber o total de sugestões */
  nr_Total_Sugestoes: number

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  b_Popover_Sugestoes: boolean = true

  /**@description boolean para abrir ou fechar o popover */
  b_Show_Popover_Feitos: boolean = false

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { nm_Titulo: "", nm_Descricao: "" }

  constructor(
    private eRef: ElementRef,
    private sugestoesService: SugestoesService
  ) { }

  async ngOnInit() {
    const reponsesugestoes = await this.sugestoesService.Get_Suggestion()
    this.obj_Array_Sugestoes = reponsesugestoes.data.sugestoes_aggregate.nodes
    this.nr_Total_Sugestoes = reponsesugestoes.data.sugestoes_aggregate.aggregate.count
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      
    } else {
      this.b_Show_Popover_Feitos = false
    }
  }

  async File_Suggestion(item, index){
    console.log("indexf", index)
    item.show = !item.show
    const responsefile = await this.sugestoesService.Set_File_Suggestion(item.cd_sugestao)
    
    if(responsefile.data.update_sugestoes.returning.lenght != 1){
      setTimeout(() => {   
      this.obj_Array_Sugestoes.splice(index, 1)
      }, 1850);
    }
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }
  
  async Filter() {
    await this.sugestoesService.Get_Filter_Suggestion(this.objFilter)
    this.b_Show_Filter = false
    console.log(this.objFilter)
  }
}
