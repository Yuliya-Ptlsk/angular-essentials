import { Component, OnInit, Input } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() character;
  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit(): void {
  }

  onAssign(sideValue: string) {
    // this.assignedSide.emit({ name: this.character.name, side: sideValue});
    // const swServise = new StarWarsService();
    this.swService.onChosenList({name: this.character.name, side: sideValue});
  }

}
