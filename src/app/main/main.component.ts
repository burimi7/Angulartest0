import { Directive, HostListener, Component, OnInit, ElementRef, Input, Renderer2, ViewChild,NgZone } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent  {
  title = 'angulartest1';
  rowheight=0;
numbers=[];

  rows =[
    ["aaa1","bbb1","ccc1","ddd1"],
    ["aaa2","bbb2","ccc2","ddd2"],
    ["aaa3","bbb3","ccc3","ddd3"],
    ["aaa4","bbb4","ccc4","ddd4"],
    ["aaa5","bbb5","ccc5","ddd5"],
  ]
  
  displayedColumns=[];
  Generated=[];
  Selected_i=-1;
  Selected_j=-1;
  ValueToEdit='';
  Info='';
  isLoading=false;
  TableHeight=0;
  getitCalled=false;
  
  @ViewChild('tableId') table: any;
  
  constructor(private zone:NgZone) {  

    
  }

  
  ngOnInit() {
    // $("#tableId").colResizable; 
    // this.zone.run(() => {  
    this.GenerateData();     
  this.Generated = this.displayedColumns;//.slice(0,100);
  // this.getit();
  // this.zone.onStable.pipe().subscribe(() => {
  //   console.log('Do whatever you want, the table is rendered');
  // });

    //  });
    // this.zone.onMicrotaskEmpty.asObservable().pipe(
    //   take(1)
    // )
    // .subscribe(() => {
    //   console.log('ok')
    // });
    
  }
  ngAfterViewChecked(){
    if(!this.getitCalled){
      console.log('Eccolo')
      
    this.zone.onMicrotaskEmpty.asObservable().pipe(
      take(1)
    )
    .subscribe(() => {
      console.log('ok');
      this.getit();
    });
    
    this.getitCalled=true;
  }
   

  }

  triggerTableWatcher() {
    // var table = document.getElementById('tableId');

    // define the object to listen to
    const trigger = this.table.changes();

    // define the debounce-time (adjust it, if it doesn't fit your needs)
    const debounceAt = trigger.debounceTime(1000);

    // subscribe to the trigger and tell which method to call eventually
    debounceAt.subscribe(() => {console.log('OK')});
}

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if((event.target as HTMLElement).scrollTop){
    var perc=((event.target.offsetHeight + event.target.scrollTop)*100)/event.target.scrollHeight 
    if(perc>=90){
      
    this.zone.run(() => { 
      console.log('here')
      
      this.GenerateData()
      this.Generated = [...this.Generated, ...this.displayedColumns.slice(this.Generated.length,this.Generated.length+50)] ;

      // for(var i=0;i<document.getElementsByName('H').length;i++){
      //   document.getElementById('H')[i].offsetHeight =document.getElementById('tableId').offsetHeight;
      // }
      // this.TableHeight= document.getElementById('tableId').offsetHeight


    })    
      
    }

    // if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    //   console.log("End");
    // }
  }
}

  GenerateData(){
    if(this.Generated.length<=6000){
    for(var i=0;i<60;i++){
      let j_array=[];
      for(var j=0;j<100;j++){
        j_array.push(this.RandomText(100))
      } 
      this.displayedColumns.push(j_array);
    }
}
  }

  RandomText(MaxLength){
    let Lengthit= Math.floor(Math.random() * Math.floor(MaxLength));
    let RandomWord='';
    let Alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for(var i=0;i<Lengthit;i++){
      RandomWord+=Alphabet[ (Math.floor(Math.random() * Math.floor(Alphabet.length-1))) ]    
    }
    return RandomWord;
  }

  getit(){
      var table = document.getElementById('tableId');
      // console.log(table.getElementsByTagName('tr').length)
      
      table.style.position = 'relative';
  this.resizableGrid(table);
  } 

resizableGrid(table) {
  var column = table.getElementsByTagName('th')[0];
  var row = table.getElementsByTagName('tr')[0];
  
  // var row = table.getElementsByClassName('tr')[0],
 var cols = row ? row.children : undefined;
 var rows = table.getElementsByTagName('tr');
 if (!cols) return;
 
 table.style.overflow = 'hidden';
 
 var tableHeight = table.offsetHeight;
 var tableWidth = table.offsetWidth;
 
 
 //horizontal line
 for (var i=1;i<rows.length;i++){
  var divH = this.createDivH(tableWidth,i);
  rows[i].appendChild(divH);
  rows[i].style.position = 'relative';
  this.setListenersH(divH,i);
 }

//vertical line
 for (var i=0;i<cols.length;i++){
  var div = this.createDiv(tableHeight,i);
  cols[i].appendChild(div);
  cols[i].style.position = 'relative';
  this.setListeners(div);
 }

 //Add last resizer
 var divH = this.createDivH(tableWidth,rows.length,true);
 rows[rows.length-1].appendChild(divH);
 rows[rows.length-1].style.position = 'relative';
 this.setListenersH(divH,rows.length);


};

 setListeners(div){
  var pageX,curCol,nxtCol,curColWidth,nxtColWidth;

  div.addEventListener('mousedown', (e)=> {
   curCol = e.target.parentElement;
   nxtCol = curCol.nextElementSibling;
   pageX = e.pageX; 
 
   var padding = this.paddingDiff(curCol);
 
   curColWidth = curCol.offsetWidth - padding;
   if (nxtCol)
    nxtColWidth = nxtCol.offsetWidth - padding;
  });

  div.addEventListener('mouseover', (e) => {
    e.target.style.borderRight = '2px solid #0000ff';
  })

  div.addEventListener('mouseout', (e) => {
   e.target.style.borderRight = '';
  })

  document.addEventListener('mousemove', (e) => {
   if (curCol) {
    var diffX = e.pageX - pageX;
 
    if (nxtCol)
     nxtCol.style.width = (nxtColWidth - (diffX))+'px';

    curCol.style.width = (curColWidth + diffX)+'px';
   }
  });

  document.addEventListener('mouseup', (e) => { 
   curCol = undefined;
   nxtCol = undefined;
   pageX = undefined;
   nxtColWidth = undefined;
   curColWidth = undefined
  });
 }
 setListenersH(div, index){
  var pageX,curCol,nxtCol,curColWidth,nxtColWidth,rowheight1;

  div.addEventListener('mousedown', (e)=> {
    curCol = document.getElementById("tr"+String(index-1));//e.target.parentElement;
   nxtCol = e.target.parentElement;//curCol.nextElementSibling;
   pageX = e.pageY; 
 
   var padding = this.paddingDiffH(curCol);
 
   curColWidth = curCol.offsetHeight - padding;
   if (nxtCol)
    nxtColWidth = nxtCol.offsetHeight - padding;
  });

  div.addEventListener('mouseover', (e) => {
    e.target.style.borderTop = '2px solid #ff0000';
  })

  div.addEventListener('mouseout', (e) => {
   e.target.style.borderTop = '';
  })

  document.addEventListener('mousemove', (e)=> {
   if (curCol) {
    var diffX = e.pageY - pageX;
 
    if (nxtCol)
     nxtCol.style.height = (nxtColWidth - (diffX))+'px';

    curCol.style.height = (curColWidth + diffX)+'px';
   }
  });

  document.addEventListener('mouseup', (e) => { 
   curCol = undefined;
   nxtCol = undefined;
   pageX = undefined;
   nxtColWidth = undefined;
   curColWidth = undefined
  });
 }
 
 createDiv(height,index){
  var div = document.createElement('div');
  div.style.top = "0px";
  div.style.right = "0px";
  div.style.width = '3px';
  div.style.position = 'absolute';
  div.style.cursor = 'col-resize';
  div.style.userSelect = 'none';
  div.style.height = height + 'px';//'100vh'
  div.style.background = 'blue';
  div.id="H";
  return div;
 } 
 createDivH(width,index,bottom?){
  var div = document.createElement('div');
  div.style.left = "00px";
  if(bottom)
  div.style.bottom = "0px";
  div.style.width = '100%';//width+'px';
  div.style.position = 'absolute';
  div.style.cursor = 'n-resize';
  div.style.userSelect = 'none';
  div.style.height = '3px';
  div.style.background = 'red';
  div.id = index;
  
  return div;
  // }
  // div.style.background = 'yellow'
  // div.style.left= "0px";
  // // div.style.bottom= "0px";
  // div.style.position= "absolute";
  // div.style.width= "100%";
  // div.style.zIndex= "-1";
  // div.style.cursor = 'col-resize';
  // div.style.userSelect = 'none';
  // div.style.height = '5px';


 }
 
 paddingDiff(col){
 
  if (this.getStyleVal(col,'box-sizing') == 'border-box'){
   return 0;
  }
 
  var padLeft = this.getStyleVal(col,'padding-left');
  var padRight = this.getStyleVal(col,'padding-right');
  return (parseInt(padLeft) + parseInt(padRight));

 } 
 paddingDiffH(col){
 
  if (this.getStyleVal(col,'box-sizing') == 'border-box'){
   return 0;
  }
 
  var padLeft = this.getStyleVal(col,'padding-top');
  var padRight = this.getStyleVal(col,'padding-bottom');
  return (parseInt(padLeft) + parseInt(padRight));

 }

 getStyleVal(elm,css){
  return (window.getComputedStyle(elm, null).getPropertyValue(css))
 }
 
 Save(){
  this.Generated[this.Selected_i][this.Selected_j] = this.ValueToEdit;
  this.Info="Saved successfully";
  this.Cancel()
}

Cancel(){
  this.Selected_i=-1;
  this.Selected_j=-1;
}

}

