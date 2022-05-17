import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-grupo',
  templateUrl: './adicionar-grupo.component.html',
  styleUrls: ['./adicionar-grupo.component.scss']
})
export class AdicionarGrupoComponent implements OnInit {

  /**@description string que passa o noe do label do input */
  nm_Label_Input: string = "Nome do novo grupo"

  /**@description string que passa o título da página */
  ds_Titulo: string = "Adicionar grupo"

  constructor() { }

  ngOnInit(): void {
  }

}
