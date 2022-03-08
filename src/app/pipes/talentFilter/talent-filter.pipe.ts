import { Pipe, PipeTransform } from '@angular/core';
import { Talent } from "../../models/Talent"

@Pipe({
  name: 'talentFilter'
})
export class TalentFilterPipe implements PipeTransform {

  transform(talents: Talent[], talent: string): Talent[] {
    if(!talents || !talent){
      return talents
    }

    let talentsFiltered = []
    for(let i=0; i<talents.length; i++){
      if(talents[i].name.toLowerCase().indexOf(talent.toLowerCase()) != -1)
        talentsFiltered.push(talents[i])
    }
    return talentsFiltered
  }

}
