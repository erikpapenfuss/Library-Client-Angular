import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Author } from './author';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorsUrl = 'http://localhost:53274/Author';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  /** get authors from API */
  getAuthors (): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorsUrl)
      .pipe(
        tap(authors => this.log(`fetched authors`)),
        catchError(this.handleError('getAuthors', []))
      );
  }
  getAuthor(id: number): Observable<Author> {
    const url = `${this.authorsUrl}/${id}`;
    return this.http.get<Author>(url).pipe(
      tap(_ => this.log(`fetched author id=${id}`)),
      catchError(this.handleError<Author>(`getAuthor id=${id}`))
    );
  } 

  /** PUT: update the author on the server */
  updateAuthor (author: Author): Observable<any> {
    return this.http.put(this.authorsUrl, author, httpOptions)
    // .pipe(
    //   tap(_ => this.log(`updated hero id=${author.id}`)),
    //   catchError(this.handleError<any>('updateHero'))
    // )
    ;
  }

      /** DELETE: delete the book from the server */
  deleteAuthor (author: Author | number): Observable<Author> {
    const id = typeof author === 'number' ? author : author.id;
    const url = `${this.authorsUrl}/${id}`;

    return this.http.delete<Author>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted author id=${id}`)),
      catchError(this.handleError<Author>('deleteAuthor'))
    );
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('AuthorService: ' + message);
  }
}




