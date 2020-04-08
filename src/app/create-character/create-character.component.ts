import { Component, OnInit } from '@angular/core';

import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  avaliableSides = [
    {display: 'None', value: '' },
    {display: 'Light', value: 'light' },
    {display: 'Dark', value: 'dark' }
  ];

  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit(): void {
  }

  onSubmit(formInfo) {
    if (formInfo.invalid) {
      return;
    }

    console.log(formInfo.value);
    this.swService.addCharacter(formInfo.value.name, formInfo.value.side);
  }

}
