import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from './book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private booksUrl = 'http://localhost:53274/Book';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }

  /** get books from API */
  getBooks (): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl)
      .pipe(
        tap(books => this.log(`fetched books`)),
        catchError(this.handleError('getBooks', []))
      );
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => this.log(`fetched book id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }
   
    /** PUT: update the book on the server */
  updateBook (book: Book): Observable<any> {
    return this.http.put(this.booksUrl, book, httpOptions)
    // .pipe(
    //   tap(_ => this.log(`updated book id=${book.id}`)),
    //   catchError(this.handleError<any>('updateBook'))
    // )
    ;
  }

/** DELETE: delete the book from the server */
deleteBook (book: Book | number): Observable<Book> {
  const id = typeof book === 'number' ? book : book.id;
  const url = `${this.booksUrl}/${id}`;

  return this.http.delete<Book>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted book id=${id}`)),
    catchError(this.handleError<Book>('deleteBook'))
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

/** Log a BookService message with the MessageService */
private log(message: string) {
  this.messageService.add('BookService: ' + message);
}
}




 