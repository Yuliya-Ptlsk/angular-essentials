import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Http, Response } from '@angular//http';
import { LogService } from './log.service';
import 'rxjs/add/operator/map';

@Injectable()
export class StarWarsService {
  private characters = [
    {name: 'Luke Skywalker', side: ''},
    {name: 'Darth Vader', side: ''}
  ];
  charactersChanged = new Subject<void>();
  private logService: LogService;
  http: Http;

  constructor(logService: LogService, http: Http) {
    this.logService = logService;
    this.http = http;
  }

  fetchCaracters() {
    this.http.get('https://swapi.co/api/people')
    .map((response: Response) => {
      const data = response.json();
      const extractedData = data.results;
      const chars = extractedData.map(char => {
        return {name: char.name, side: ''}
      });
      return chars;
    })
    .subscribe(
      (data) => {
        console.log(data);
        this.characters = data;
        this.charactersChanged.next();
      }
    );
  }

  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }

    return this.characters.filter((character) => {
      return character.side === chosenList;
    });
  }

  onChosenList( charInfo) {
    const position = this.characters.findIndex(el => {
      return el.name === charInfo.name;
    });

    this.characters[position].side = charInfo.side;
    this.charactersChanged.next();
    this.logService.writeLog(`Changed side of ${charInfo.name}, new side: ${charInfo.side}`);
  }

  addCharacter(nameValue, sideValue) {
    const position = this.characters.findIndex(el => {
      return el.name === nameValue;
    });

    if (position !== -1) {
      return;
    }

    const newCharacter = {name: nameValue, side: sideValue};
    this.characters.push(newCharacter);
  }
}
