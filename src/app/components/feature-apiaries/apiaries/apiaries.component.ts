import { Component } from '@angular/core';
import { Rucher } from '../../../models/apiaries';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiariesService } from '../../../_services/apiaries.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-apiaries',
  imports: [CommonModule, FormsModule],
  templateUrl: './apiaries.component.html',
  styleUrl: './apiaries.component.scss'
})
export class ApiariesComponent {
  beehives: { name: string; hives: string[] }[] = [];
  showPopup: boolean = false;
  newBeehiveName: string = '';
  newHiveCount: number = 1;
  apiaries: object = {};

  constructor(private apiariesService: ApiariesService){

  }
  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  createBeehive() {
    if (this.newBeehiveName.trim() && this.newHiveCount > 0) {
      this.beehives.push({ 
        name: this.newBeehiveName, 
        hives: Array(this.newHiveCount).fill('ruche')
      });
      this.newBeehiveName = '';
      this.newHiveCount = 1;
      this.showPopup = false;
    }
  }

  addHive(beehive: { hives: string[] }) {
    if (beehive.hives.length < 12) {
      beehive.hives.push('ruche');
    }
  }

  deleteHive(beehive: { hives: string[] }, index: number) {
    if (beehive.hives.length > 1) {
      beehive.hives.splice(index, 1);
    }
  }

  updateHive(beehive: { name: string }) {
    const newName = prompt('Modifier le nom du rucher', beehive.name);
    if (newName) {
      beehive.name = newName;
    }
  }
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

  getApiaries() {
    this.apiariesService.getApiaries().pipe(
      tap(response => console.log("Réponse :", response)) // Utilisation correcte de tap()
    ).subscribe(
      response => {
        this.apiaries = response; // Stocke la réponse dans une variable
      },
      error => {
        console.error("Erreur lors de la récupération des ruchers :", error);
      }
    );
  }
  
}
