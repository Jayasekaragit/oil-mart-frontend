export function fetchpost(){
    return function(dispatch){
        fetch('http://localhost:5000/users')
        .then(res=>res.json())
        .then(data=>dispatch({type:'FETCH_POST',payload:data}))
    }
}