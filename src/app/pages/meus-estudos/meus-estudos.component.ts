import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meus-estudos',
  templateUrl: './meus-estudos.component.html',
  styleUrls: ['./meus-estudos.component.scss']
})
export class MeusEstudosComponent implements OnInit {

  /**@description Boolean para exibir svg de okay no check-box */
  b_Start: boolean = true

  /**@description String para armazenar o caminho do svg */
  nm_Start: string = "assets/icons/start-yellow.svg"

  /**@description Boolean para exibir svg */
  b_User_Admin: boolean = true

  /**@description Boolean para exibir popover */
  b_Show_Popover: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  Start_Svg(){
    this.b_Start = !this.b_Start
    if(this.b_Start){
      this.nm_Start = "assets/icons/start-yellow.svg"
    }else{
      this.nm_Start = "assets/icons/star-with-no-background.svg"
    }
  }

  visible: boolean = false;

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }
}