import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'archivoNombre'
})
export class ArchivoNombrePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): any {
    let partes = value.split("/")
    let indice = partes.length
    let resultado = partes[indice-1]
    return resultado
  }

}
