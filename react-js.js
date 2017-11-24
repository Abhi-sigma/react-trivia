


function Question(props){
 
 
  var style={"width":"300px",
             "height":"50px",
             "fontWeight":"bolder",
             "border":"1px solid black",
             "textAlign":"center"
    
  }
  if( props.qsn_index != -1){
  return(
  <div style={style} > {props.question_object[props.qsn_index][0].q} </div>
    )
  }
  return (
    <div style={style} > End of Test </div>
  )
  
}

function AnswerButtons(props){
  
 
  var style={"width":"300px",
             "height":"20px",
             "fontWeight":"bolder",
             "border":"1px solid black",
             "textAlign":"center",
             "marginTop":"5px",
             "borderRadius":"5px"
    
  }
 
  // console.log(option_array)
  // console.log(option_array);
  if(props.qsn_index != -1){
        var option_array=props.question_object[props.qsn_index][0].o;
        return(
          <button style={style} onClick={props.clickHandler}>{option_array[props.option_number]}               </button>
          )
        }
  else{
    return (
      null
      )
  }
}

function Counter(props){
  return(
    <div>
      <span>Correct <button>{props.incorrect}</button></span>
      <span>Incorrect<button>{props.correct}</button></span>
      
      </div>
  )
}

function EndOfTrivia(props){
  if(props.qsn_index == -1){
  return <button onClick = {props.restart}>Restart</button>
  }
  else{
    return null
  }
   
}

class Trivia extends React.Component{
  constructor(props){
    super(props)
    this.state={clicked_answer:false,counter_correct:0,counter_incorrect:0,qsn_index:0};
    this.clickHandler=this.clickHandler.bind(this);
    this.restart=this.restart.bind(this);
    this.question_object = {
//     q is question,o is options and c is index of correct option
    0:[{q:"Who is the prime minister of Canada",o:["Ram","Shyam","Hari","Justin"],c:3}],
       1:[{q:"Who is the prime minister of India",o:["Ram","Modi","Hari","Justin"],c:1}],
       2:[{q:"Who is the prime minister of USA",o:["Ram","Shyam","None","Justin"],c:2}]
   }
  }
//   end of contructor
   clickHandler(event){
     var qsn_index = this.state.qsn_index;
     var correct_ans_index = this.question_object[qsn_index][0].c;
     var options=this.question_object[qsn_index][0].o;
     var clicked_content=event.target.textContent.trim();
     var clicked_index = options.indexOf(clicked_content);
     console.log(qsn_index,correct_ans_index,options,clicked_content,clicked_index);
     if (correct_ans_index === clicked_index){
       var counter_correct=this.state.counter_correct;
       var qsn_index=this.state.qsn_index;
       console.log(qsn_index);
//        checks qsn_index till the second last question
         if(qsn_index<Object.keys(this.question_object).length-1){
         this.setState({counter_correct:counter_correct+1,qsn_index:qsn_index+1});
           console.log(this.state.qsn_index);
         }
//        on the last index,cant increment qsn_index,throws the index error,so if block
        else{
           this.setState({counter_correct:counter_correct+1,qsn_index:-1});  
        }
     }
     else{
         var counter_incorrect =this.state.counter_incorrect;
         var qsn_index=this.state.qsn_index;
        if(qsn_index<Object.keys(this.question_object).length-1){
         this.setState({counter_incorrect:counter_incorrect+1,qsn_index:qsn_index+1})
        }
       else{
          this.setState({counter_incorrect:counter_incorrect+1,qsn_index:-1});
         
       }
     }
       
      
       
      

   }
  
  restart(event){
    this.setState({qsn_index:0,counter_correct:0,counter_incorrect:0});
    console.log("restart");
  }
  
  render(){
    return( 
      <div>
    <Question question_object={this.question_object} qsn_index={this.state.qsn_index} />
     <AnswerButtons   clickHandler={this.clickHandler} question_object={this.question_object} qsn_index={this.state.qsn_index}  option_number={3}/>
         <AnswerButtons  clickHandler={this.clickHandler} question_object={this.question_object} qsn_index={this.state.qsn_index}          option_number={1}/>
         <AnswerButtons  clickHandler={this.clickHandler} question_object={this.question_object} qsn_index={this.state.qsn_index}          option_number={0}/>
         <AnswerButtons  clickHandler={this.clickHandler} question_object={this.question_object} qsn_index={this.state.qsn_index}          option_number={2}/>
 <Counter incorrect={this.state.counter_correct} correct={this.state.counter_incorrect}/>
        <EndOfTrivia qsn_index = {this.state.qsn_index} restart={this.restart}/>
   
     </div>
    )
  }
        
   
     
  
}

ReactDOM.render(
 <Trivia/>,
  document.getElementById("root")
)
