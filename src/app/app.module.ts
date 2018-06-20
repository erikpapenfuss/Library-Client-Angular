import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    BooksComponent,
    AuthorsComponent,
    BookDetailComponent,
    AuthorDetailComponent,
    DashboardComponent,
    MessagesComponent
  ],
  providers: [],
  bootstrap: [AppComponent,
              BooksComponent,
              AuthorsComponent,
              BookDetailComponent,
              AuthorDetailComponent,
              DashboardComponent,
              MessagesComponent]
})
export class AppModule { }
