import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { RouterModule }   from '@angular/router';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { SetupComponent }  from './setup.component';
import { CatalogComponent }  from './catalog.component';
import { PlayComponent }  from './play.component';
import { PlayPreferenceComponent }  from './play-preference.component';
import { CatalogService }  from './catalog.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';




// Need the following extra hammerjs config in order to get scrolling working 
// correctly. 
// See: http://stackoverflow.com/questions/41017202/vertical-scroll-is-not-working-with-hammerjs-and-angular2
export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any> {
        'pinch': { enable: false },
        'rotate': { enable: false }
    }
}


@NgModule({
  imports:      [ BrowserModule,
                  HttpModule,
                  InMemoryWebApiModule.forRoot(InMemoryDataService),
                  RouterModule.forRoot([
                  { path: 'setup', component: SetupComponent },
                  { path: 'catalog', component: CatalogComponent },
                  { path: 'catalog', component: CatalogComponent },
                  { path: 'play/:id', component: PlayComponent },
                  { path: 'play/:id/:itemids', component: PlayComponent },
                  { path: 'play-preference/:id', component: PlayPreferenceComponent },
                  { path: '',  redirectTo: '/catalog', pathMatch: 'full'}
                  ])
                ],
  declarations: [ AppComponent, SetupComponent, CatalogComponent,PlayComponent,PlayPreferenceComponent],
  bootstrap:    [ AppComponent ],
  providers:    [ CatalogService, 
                  {
                    provide: HAMMER_GESTURE_CONFIG,
                    useClass: MyHammerConfig
                  }
                ]

})
export class AppModule { }
