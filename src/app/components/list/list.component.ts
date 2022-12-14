import { Component, OnInit} from '@angular/core';
import { CountryService } from '../../shared/country.service';
import { Country } from '../../country';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  countries: Country[] = []; //before (private countries:Country[];)
  constructor(private _countryService:CountryService, private router:Router) {} 

  ngOnInit() {
    this.readCountries();
  }

  readCountries(){
    this._countryService.readCountries().subscribe(
      data=>{
        console.log(data);
        this.countries=data['msg'];
      },
      error=>{
        console.log(error);
      }
    )
  }

  doUpdate(country:Country){
    this._countryService.setter(country);
    this.router.navigate(['/createUpdate']);
  }

  doDelete(country:Country){
    this._countryService.deleteCountry(country._id).subscribe(
      data=>{
        this.countries.splice(this.countries.indexOf(country), 1);
      },
      error=>{

      }
    )
  }
}
