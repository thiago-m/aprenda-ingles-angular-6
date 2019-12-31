import { Component, OnInit } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public instrucao: string = 'Traduza a frase:'
  public frases: Frase[] = FRASES
  public resposta: string

  public rodada: number = 0
  public rodadaFrase: Frase

  constructor() { 
    this.rodadaFrase = this.frases[this.rodada]
  }

  ngOnInit() {
  }

  public atualizaResposta(res: Event): void {
    this.resposta = (<HTMLInputElement>res.target).value
  }

  public verificarResposta(): void {
    if(this.resposta.toUpperCase().trim() === this.rodadaFrase.frasePtBr.toUpperCase()) {
      alert('Acertou')  
      // Trocar pergunta da rotada
      this.rodada++    
      // Atualiza a frase
      this.rodadaFrase = this.frases[this.rodada]
    } else {
      alert('Errou')
    }
  }

}
