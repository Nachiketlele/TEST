const getData = (key)=>{
    if(key){
        let data = localStorage.getItem(key)
        return data
    }
   
}

const saveData = (key,value) =>{
    if(key&&value){
        localStorage.setItem(key,value)
    }
}

export {getData, saveData}