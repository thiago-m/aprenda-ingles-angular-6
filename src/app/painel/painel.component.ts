import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';

import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnDestroy {

  public instrucao: string = 'Traduza a frase:'
  public frases: Frase[] = FRASES
  public resposta: string = ''

  public rodada: number = 0
  public rodadaFrase: Frase

  public progresso: number = 0

  public tentativas: number = 3

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  constructor() { 
    this.atualizaRodada()
  }

  ngOnDestroy() {
  }

  public atualizaResposta(res: Event): void {
    this.resposta = (<HTMLInputElement>res.target).value
  }

  public verificarResposta(): void {
    if(this.resposta.toUpperCase().trim() === this.rodadaFrase.frasePtBr.toUpperCase()) {
      this.resposta = ''
      // Trocar pergunta da rotada
      this.rodada++    
      // Ajustar barra de progresso
      this.progresso += (100 / this.frases.length)
      
      if(this.rodada === this.frases.length) {
        this.encerrarJogo.emit('Vitoria')
      }
      // Atualiza a frase
      this.atualizaRodada()
    } else {
      // perder uma vida
      this.tentativas--

      if(this.tentativas === -1) {
        this.encerrarJogo.emit('Derrota')
      }
    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada]
  }

}
