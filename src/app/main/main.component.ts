import { Directive, Component, OnInit, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  displayedColumns=[];
  Selected_i=-1;
  Selected_j=-1;
  ValueToEdit='';
  Info=''
  
  constructor(private renderer: Renderer2, private el: ElementRef) {
    // this.column = this.el.nativeElement;
  }

  ngOnInit() {
    this.GenerateData();
  }

  async GenerateData(){
    for(var i=0;i<60;i++){
      let j_array=[];
      for(var j=0;j<10;j++){
        j_array.push(this.RandomText(100))
      } 
      this.displayedColumns.push(j_array);
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

  Save(){
    this.displayedColumns[this.Selected_i][this.Selected_j] = this.ValueToEdit;
    this.Info="Saved successfully";
    this.Cancel()
  }

  Cancel(){
    this.Selected_i=-1;
    this.Selected_j=-1;
  }


}
