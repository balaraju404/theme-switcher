import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root'
})
export class LSManager {

 static addData(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
 }
 static getData(key: string) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
 }
 static removeData(key: string) {
  localStorage.removeItem(key);
 }
 static clearAll() {
  localStorage.clear();
 }
}
