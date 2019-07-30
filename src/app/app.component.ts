import { Component, ChangeDetectorRef, ApplicationRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  rc = false;
  rcOn = 'Start';
  rcOff = 'Stop';
  render = true;
  randomCountryString = this.rcOn;
  randomCountry = <any>{};
  randomRating$: Observable<any>;
  subs: any;
  myControl = new FormControl();
  countries: any[];
  filteredOptions: Observable<string[]>;


  constructor(
      //private router: Router,
      private appRef: ApplicationRef,
      private http: HttpClient,
      public sanitizer: DomSanitizer
    ) {
  }

  ngOnInit() {
    this.randomRating$ = new Observable((subscriber) =>{
      let randomInterval = () => Math.floor(Math.random() * 500) + 1;
      const intervalId = setInterval(() => {
        this.render = false;
        subscriber.next(true);
    }, 1000);
    return function unsubscribe() {
        clearInterval(intervalId);
      };
    });
    this.loadCountries();
  }

  toogleRandomRating() {
      !this.rc ? this.startRandomRating() : this.stopRandomRating();
      this.rc = !this.rc;
  }

  renderBanner(r){
      setTimeout(() =>{
        this.render = r;
      }, 0);
  }

  private startRandomRating(){
      this.randomCountryString = this.rcOff;
      this.subs = this.randomRating$.subscribe(r => this.renderBanner(r));
  }

  private stopRandomRating(){
      this.randomCountryString = this.rcOn;
      this.subs.unsubscribe();
  }

  loadCountries() {
    let urlCountries = 'assets/countries.json';
    let countries$ = this.http.get<any>(urlCountries);
    countries$.subscribe(
                response => {
                        this.countries = response;
                        this.loadRandomCountry(response as any[])
                        this.getCountryInfo(this.randomCountry);
                        this.filteredOptions = this.myControl.valueChanges
                          .pipe(
                            startWith(''),
                            map(value => this._filter(value))
                          );
                      });
  }

  loadRandomCountry(countries: Array<Object>){
      let randomIndex = Math.floor((Math.random() * countries.length) + 0);

      this.randomCountry = countries[randomIndex];
      this.randomCountry.mapUrl = this.generateUrlMap(this.randomCountry);
  }

  getCountryInfo(rc){
    var url = "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles="+ rc.name + "&format=json&origin=*";
    let info$ = this.http.get(url);
    info$.subscribe(response => this.randomCountry.info = (<any>response).query.pages[Object.keys((<any>response).query.pages)[0]].extract);
  }

  generateUrlMap(rc){
  		return "https://www.google.com/maps/embed/v1/view?zoom=4&center=" + rc.latlng[0] + "," + rc.latlng[1] + "&key=AIzaSyB0iePXe1BeVIOJHifld241qJoTzXT085Q";
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
