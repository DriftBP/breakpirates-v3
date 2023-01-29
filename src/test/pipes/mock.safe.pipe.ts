import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'safe'})
export class MockSafePipe implements PipeTransform {
    transform(value: number): number {
        //Do stuff here, if you want
        return value;
    }
}
