import { Component } from '@angular/core';
import { Rucher } from '../../../models/apiaries';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apiaries',
  imports: [CommonModule],
  templateUrl: './apiaries.component.html',
  styleUrl: './apiaries.component.scss'
})
export class ApiariesComponent {
  readonly ruchers: Rucher[] = [
    {
      id: 1,
      nom: "Rucher du Soleil",
      ruches: [
        { id: 101, nom: "Ruche A" },
        { id: 102, nom: "Ruche B" },
        { id: 103, nom: "Ruche C" }
      ]
    },
    {
      id: 2,
      nom: "Rucher des Montagnes",
      ruches: [
        { id: 201, nom: "Ruche X" },
        { id: 202, nom: "Ruche Y" },
        { id: 203, nom: "Ruche Z" }
      ]
    },
    {
      id: 3,
      nom: "Rucher de la Forêt",
      ruches: [
        { id: 301, nom: "Ruche Alpha" },
        { id: 302, nom: "Ruche Beta" },
        { id: 303, nom: "Ruche Gamma" }
      ]
    }
  ];


  ajouterRucher() {
    console.log("test")
  }

  supprimerRucher(rucher: { ruches: string[] }) {
  }

  ajouterRuche(rucher: { ruches: string[] }) {
    rucher.ruches.push('ruche');
  }

  supprimerRuche(rucher: { ruches: string[] }, index: number) {
    rucher.ruches.splice(index, 1);
  }

  modifierRucher(rucher: { ruches: string[] }) {
    alert('Modification du rucher non implémentée !');
  }
}
