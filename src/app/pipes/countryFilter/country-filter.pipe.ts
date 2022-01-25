import { Pipe, PipeTransform } from '@angular/core';
import { Country } from 'src/app/models/Country';

@Pipe({
  name: 'countryFilter'
})
export class CountryFilterPipe implements PipeTransform {

  transform(countries: Country[], country: string): Country[] {
    if(!countries || !country){
      return countries
    }

    let countriesFiltered = []
    for(let i=0; i<countries.length; i++){
      if(countries[i].name.toLowerCase().indexOf(country.toLowerCase()) != -1)
        countriesFiltered.push(countries[i])
    }
    return countriesFiltered
  }

}
