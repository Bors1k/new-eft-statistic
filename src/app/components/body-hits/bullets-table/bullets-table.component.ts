import { Component, EventEmitter, Output } from '@angular/core';
import  * as data  from 'src/assets/db.json';

interface BulletsList {
  id?: number;
  Type: string;
  Calibre: string;
  PenetrationValue: number;
  Damage: number;
}

const BulletsList: BulletsList[] = (data as any).default;

@Component({
  selector: 'app-bullets-table',
  templateUrl: './bullets-table.component.html',
  styleUrls: ['./bullets-table.component.css']
})
export class BulletsTableComponent {

  Damage: number = 182;

  UsingBullet: BulletsList = {
    "id": 1,
    "Type": "B-32",
    "Calibre": "12.7x108 mm",
    "PenetrationValue": 80,
    "Damage": 182
  };

  page = 1; //названия переменных говорят сами за себя
  pageSize = 10;
  collectionSize = BulletsList.length;

  @Output() messageEvent = new EventEmitter<number>(); //эта дичь нужна для передачи данных из элемента child в элемент parent

  get bullets(): BulletsList[] { // я не могу это объяснить(даже не пытался понять и узнать), кусок из ng-bootstrap
    //я его просто использовал, как и саму таблицу эту.
    //первый вариант таблицы был написан мной, эта таблица же, из библиотеки, если можно так скзаать
    return BulletsList
      .map((bullet, i) => ({id: i + 1, ...bullet}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize); //если честно, даже не пытался разбираться, с тем, что это за херня
  }


  onClick(event: any, bullet: BulletsList){

    this.Damage = bullet.Damage; //получаем урон

    this.UsingBullet = bullet; //получаем данные используемого патрона

    (function smoothscroll() { //кусок из инета, чтобы поднять страницу вверх, когда пикнешь патрон
      //как работает знаю, названия тут довольно говорящие, если что-то не ясно, проще гуглануть
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();

    this.messageEvent.emit(this.Damage); //тут и происходи передача данных, когда происходит событие

    //я не шарю как это нормально объяснить, лучше просто гуглить передача данных между компонентами
    //это один из вариантом, через @Output() и EventEmitter 
  }

}
