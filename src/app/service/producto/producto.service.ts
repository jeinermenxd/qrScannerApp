import { EventEmitter, Injectable, Output } from '@angular/core';
import { API_URL } from '../conexion-api/api';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Producto } from 'src/app/models/producto.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
 /* Un emisor de eventos que se utiliza para emitir un evento al componente principal. */
 @Output() disparadorProducto: EventEmitter<any> = new EventEmitter();

 /* Una variable que se utiliza para almacenar la URL de la API. */
 private url = API_URL + 'productos';

 /* Un Sujeto que se usa para emitir un evento al componente principal. */
 private _refresh$ = new Subject<void>();

 private enviarUpdate = new BehaviorSubject<any>(''); 
 datos$ = this.enviarUpdate.asObservable(); 
 enviarDatos(datos: Producto ) {

   this.enviarUpdate.next(datos);
 }

 constructor(private http: HttpClient) { }

 /* Una función que devuelve los datos de la API. */
 getProductos(): Observable<Producto[]> {
   return this.http.get<Producto[]>(this.url);
 }

 /* Una función que devuelve los datos de la API. */
 getProducto(id: string): Observable<Producto> {
   return this.http.get<Producto>(this.url + id);
 }
 getProductoByCodUnico(codUnico: string): Observable<Producto> {
  return this.http.get<Producto>(this.url +"/"+ codUnico);
}

 /* Una función que agrega un nuevo producto a la base de datos. */
 addProducto(producto: Producto): Observable<any> {
   return this.http.post(this.url, producto)
     .pipe(
       tap(() => {
         this._refresh$.next();
       })
     );
 }

 /* Eliminación de un producto de la base de datos. */
 deleteProducto(id: string): Observable<any> {
   return this.http.delete(this.url +"/" + id);
 }

 /* Una función que actualiza los datos en la base de datos. */
 editProducto(id: string, producto: Producto): Observable<any> {
   return this.http.put(this.url +"/" + id, producto)
     .pipe(
       tap(() => {
         this._refresh$.next();
       })
     );
 }

 // Refrescar tablas //

 /**
  * La función refresh$ devuelve el valor de la variable privada _refresh$.
  * @returns El observable que se devuelve es el que se crea en el constructor.
  */
 get refresh$() {
   return this._refresh$;
 }
}

/* Es una declaración de depuración. */
console.log("Conexion de Productos!");
export { Producto };

