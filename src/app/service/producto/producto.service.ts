import { EventEmitter, Injectable, Output } from '@angular/core';
import { API_URL } from '../conexion-api/api';
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { Producto } from 'src/app/models/producto.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  @Output() disparadorProducto: EventEmitter<any> = new EventEmitter();
  private url = API_URL + 'productos';
  private _refresh$ = new Subject<void>();
  private enviarUpdate = new BehaviorSubject<any>(''); 
  datos$ = this.enviarUpdate.asObservable(); 

  constructor(private http: HttpClient) { }

  enviarDatos(datos: Producto) {
    this.enviarUpdate.next(datos);
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  getProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getProductoByCodUnico(codUnico: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/codigo/${codUnico}`).pipe(
      catchError(this.handleError)
    );
  }

  addProducto(producto: Producto): Observable<any> {
    return this.http.post(this.url, producto)
      .pipe(
        tap(() => {
          this._refresh$.next();
        }),
        catchError(this.handleError)
      );
  }

  deleteProducto(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  editProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(`${this.url}/${id}`, producto)
      .pipe(
        tap(() => {
          this._refresh$.next();
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log to console for debugging
    return throwError('Something went wrong; please try again later.');
  }

  get refresh$() {
    return this._refresh$;
  }
}

/* Es una declaración de depuración. */
console.log("Conexion de Productos!");
export { Producto };

