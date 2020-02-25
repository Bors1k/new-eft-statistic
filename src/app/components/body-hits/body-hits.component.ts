import { Component } from '@angular/core';

@Component({
  selector: 'app-body-hits',
  templateUrl: './body-hits.component.html',
  styleUrls: ['./body-hits.component.css']
})
export class BodyHitsComponent {

  HealthPoints: number = 435; //общее кол-во хп

  damage: number = 182; //Входящий урон

  BodyParts: Array<number> = [35, 80,  70,  60,  60,   65,  65]; //массив хп частей тела
  BodyBackup: Array<number> = [35, 80,  70,  60,  60,   65,  65]; //просто массив для сравнения, сколько было получено урона
  DmgKoef: Array<number> = [  0,   0,  1.5, 0.7, 0.7,  1,   1]; //массив коэффициентов при попадании по выбитым частям тела
  StyleArr: Array<string> = ["success","success","success","success","success","success","success"]; //для изменения цвета полоски, когда будет проходить урон

  constructor() { }

  updateDamage($event){     
    this.damage = $event//функция для обновления урона, когда выбираем из таблицы
  }

  onGetDamage(event: any, index: number){
    // функция когда происходит нажатие на одну из частей тела

    this.BodyParts[index]-=this.damage; // нанесение урона

    while(HaveOverDamageBody(this.BodyParts)==true){ //проверка, на наличие частей тела, с оверуроном, пока они есть выполняем далее
      /*
        Есть такие случаи, когда будет мало хп на нескольких частях тела, так мало, что
        после распределении урона оверурона, у какой-то части нехватит хп, и она тоже должна дать овер урон.
        этот while цикл будет распределять оверурон, пока не останется частей тела, которые производят его
      */
      let index = 0; //индекс для передачи в оверурон функцию
      for (let body of this.BodyParts) { //цикл который достает 1 элемент(часть тела) из массива частей
        if (body<0) { //проверка на необходимость делать оверурон
          this.BodyParts = OverDamage(this.BodyParts,index,this.DmgKoef[index]); //передает значения и получаем обратно новый массив хп у частей тела
        }
        index++; //увеличиваем индекс
      }
    }

    if(this.BodyParts[0] <=0 || this.BodyParts[1] <=0){
      for (let i in this.BodyParts) {
          this.BodyParts[i] = 0;   //если у головы или груди заканчивается хп, то получаем 0 на всех
      }
    } 

    for (let i in this.BodyParts){          
      // изменение стиля прогресс баров, при получении урона       

      if(this.BodyParts[i]!=this.BodyBackup[i]){       // если хп!=100%, то
        if(this.BodyParts[i]/this.BodyBackup[i]<=0.5){  // если хп<50%, то
          this.StyleArr[i]="danger";                    // красим в желтый
        }                                               // иначе красим в красный
        else this.StyleArr[i]="warning";
      }
    }

    this.HealthPoints = this.BodyParts.reduce((a,b)=>a+b,0); // сложение, чтобы получить результирующее хп
  }

  onRestore(){
    //просто функция для восстановления всех хп, стилей и т.д
    this.BodyParts = [35, 80,  70,  60,  60,   65,  65];
    this.HealthPoints = this.BodyParts.reduce((a,b)=>a+b,0);
    this.StyleArr = ["success","success","success","success","success","success","success"];
  }
 

}

function HaveOverDamageBody(BodyParts: Array<number>): boolean{

  //проверка, есть ли части тела, которые после нанесении урона получают overDamgae

  let bool = false;
  for (let i of BodyParts) {
    if (i<0) {
      bool = true;
    }
  }
  return bool;
}

function CountHealthyParts(BodyParts: Array<number>): number{
  //вспомагательная функция для подсчета кол-ва "живых" частей тела
  let i = 0;
  for(let body of BodyParts){
    if(body >0){
      i++;
    }
  }
  return i;
}

function OverDamage(BodyParts: Array<number>, index: number, mnoj: number): Array<number>{
  //функция, необходимая когда происходит получение оверурона, когда хп уходит в минус
  //он распределит урон по живым частям тела
  if(BodyParts[index] < 0){
    let razn = Math.abs(BodyParts[index]); //овер урон который надо распределить
    
    for (let i in BodyParts) {
      if(BodyParts[i]>0){ //проверка. Чтобы урон проходил по частям, у которых есть ХП
        BodyParts[i] -=Math.round((razn*mnoj)/CountHealthyParts(BodyParts));   //округление ((урон*множитель урона)/кол-во живых частей)  
      }
    }
    BodyParts[index] = 0; //присваиваем 0, т.к. хп конечности не может уйти в минус
  }
  return BodyParts;
}

