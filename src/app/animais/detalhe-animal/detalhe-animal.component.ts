import { AnimaisService } from './../animais.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Animal } from '../animais';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css'],
})
export class DetalheAnimalComponent implements OnInit {
  animalId!: number;
  animal$!: Observable<Animal>;

  constructor(
    private animalService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Busca o animal a partir do parametro da rota
   */
  ngOnInit(): void {
    this.animalId = this.activatedRoute.snapshot.params.animalId;
    this.animal$ = this.animalService.buscaPorID(this.animalId);
  }

  /**
   * Curte a foto do animal a partir da propriedade "animalId"
   */
  curtir() {
    this.animalService.curtir(this.animalId).subscribe(
      (curtida) => {
        if(curtida) {
          this.animal$ = this.animalService.buscaPorID(this.animalId);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Exclui a foto do animal a patir da propriedade "animalId"
   */
  excluir() {
    this.animalService.excluiAnimal(this.animalId).subscribe(
      () => {
        this.router.navigate(['/animais/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
