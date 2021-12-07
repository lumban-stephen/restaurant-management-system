import {useState,useEffect} from "react";

const FetchData = () =>{
    const [count,setcount]=useState(0);
    const [text, setText] = useState(0);
    const [fare,setfare]=useState(0);
    const [items, setItems]=useState([])
    const [Person, setPerson]=useState([])
    const [Samboan, setSamboan]=useState([])
    const [Danao, setDanao]=useState([])
    let a="";

      const[users, setUsers]=useState(0);
      useEffect(()=>{
        fetch('/userinfo')
        .then(response=>response.json())
        .then(response=>{
          //console.log(response)
          setUsers(response)
        })
      },[])
    
      const handleSubmit=(e)=>{
          e.preventDefault();
          addData(text);
          //console.log(text);
        
      /*  
        e.preventDefault();
        addItem(text,count);
        console.log(text);
      */
      }



    return(

      <header>
        
        <form onSubmit={handleSubmit}>
            <p>input id 1 ~ 6:</p>
            <input value={text} onChange={(e)=>{setText(e.target.value)}} type="number" required />
            <input type="submit" value="Submit" />
        </form>

        {
        (users!==0)?
            <h1>{users[text].login}{text}</h1>
      
            
          :null

        }

      </header>

    )


}


export default FetchData;
