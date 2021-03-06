
import { Injectable } from '@angular/core';
import { UsuarioParams } from '../models/usuario/usuario.model';
import { UsuarioQuery } from '../queries/usuario.query';
import { ApiHasuraService } from '../services/hasura.service';
import { SubjectService } from '../services/subject.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRepository {

  /** @description Options da Requisição */
  httpOptions: any;

  constructor(
    private subjectService: SubjectService,
    private usuarioQuery: UsuarioQuery,
    private apiHasuraService: ApiHasuraService
  ) { }

  async Get_Usuarios(param: UsuarioParams) {
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.usuarioQuery.Get_Usuarios_Listagem_Paginacao()
    const variables = { limit: param.page_lenght, offset: ((param.nr_pagina - 1) * param.page_lenght) }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Usuarios_Filter(param: UsuarioParams, inputfilter) {
    this.subjectService.subject_Exibindo_Loading.next(true)
    let where: any = { _or: [] }

    if (inputfilter != null && inputfilter != "") {
      where._or.push({ cd_login: { _ilike: "%" + inputfilter + "%" } })
      where._or.push({ nm_usuario: { _ilike: "%" + inputfilter + "%" } })
      where._or.push({ perfil: { role: { _ilike: "%" + inputfilter + "%" } } })
    }

    const query = this.usuarioQuery.Get_Usuarios_Filter()
    const variables = { where, limit: param.page_lenght, offset: ((param.nr_pagina - 1) * param.page_lenght) }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Usuario(param) {
    const query = this.usuarioQuery.Get_Usuario()
    const variables = { "cd_usuario": param }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Perfil_Usuario() {
    const query = this.usuarioQuery.Get_Perfil_Usuario()
    const response = await this.apiHasuraService._Execute(query, this.httpOptions)
    return response
  }

  async Set_Add_Usuario(param) {
    const query = this.usuarioQuery.Set_Add_Usuario()
    const variables = { nm_usuario: param.nm_usuario, ds_senha: param.ds_senha, b_login_ad: param.b_login_ad, cd_login: param.cd_login, cd_perfil: param.cd_perfil }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Set_Edit_Usuario(objparam) {
    let cd_usuario = objparam.cd_usuario
    let _set: any = objparam
    delete _set.cd_usuario
    delete _set.perfil
    const query = this.usuarioQuery.Set_Edit_Usuario()
    const response = await this.apiHasuraService._Execute(query, {_set, cd_usuario}, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }
}
