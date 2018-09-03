import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File ) {

    return new Promise(  (resolve, reject) => {
      
      let formdata = new FormData();
      let xhr = new XMLHttpRequest();
  
      formdata.append( 'archivo', archivo, archivo.name );
  
      xhr.onreadystatechange = function() {
        if ( xhr.readyState === 4 ) {
  
          if(xhr.status === 200){
            console.log('Archivo subido');
            resolve( JSON.parse(xhr.response)  );
          } else {
            console.log('Falló la subida');
            reject( JSON.parse( xhr.response )  );
          }
  
        }
  
      };

      let url = URL_SERVICIOS + '/upload/do_upload';

      xhr.open( 'POST', url, true );
      xhr.send( formdata );

    });


  }
}
