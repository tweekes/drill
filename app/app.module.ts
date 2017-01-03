import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { RouterModule }   from '@angular/router';

import { AppComponent }  from './app.component';
import { SetupComponent }  from './setup.component';
import { CatalogComponent }  from './catalog.component';
import { PlayComponent }  from './play.component';
import { CatalogService }  from './catalog.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  imports:      [ BrowserModule,
                  HttpModule,
                  InMemoryWebApiModule.forRoot(InMemoryDataService),
                  RouterModule.forRoot([
                  { path: 'setup', component: SetupComponent },
                  { path: 'catalog', component: CatalogComponent },
                  { path: 'catalog', component: CatalogComponent },
                  { path: 'play/:id', component: PlayComponent },
                  { path: '',  redirectTo: '/catalog', pathMatch: 'full'}
                  ])
                ],
  declarations: [ AppComponent, SetupComponent, CatalogComponent,PlayComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ CatalogService ]

})
export class AppModule { }
