import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  isMenuOpen = false;

   features = [
    {
        title: "Gestion des Ruchers",
        description: "Création et gestion des ruchers, ajout de ruches, gestion des informations liées aux ruches, et consultation des récapitulatifs."
    },
    {
        title: "Suivi des Interventions",
        description: "Enregistrement des interventions effectuées sur les ruches (nourrissage, récolte, contrôle sanitaire, etc.) avec historique et photos."
    },
    {
        title: "Intégration de Capteurs Connectés",
        description: "Suivi en temps réel des données collectées par des capteurs (température, humidité, localisation GPS) et alertes en cas d'anomalies."
    },
    {
        title: "Gestion de la Reproduction",
        description: "Suivi des périodes de reproduction des abeilles, planification des interventions et gestion des nouvelles reines créées."
    },
    {
        title: "Gestion des Problèmes Spécifiques",
        description: "Suivi des vols de ruches, déclaration de vol avec détails et photos des circonstances."
    }
];


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
