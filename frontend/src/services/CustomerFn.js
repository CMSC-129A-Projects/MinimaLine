import Axios from "axios";
Axios.defaults.withCredentials = true;

class CustomerFn{
    // authentication
        // get path
        // split path and get id
        // check if path id===manager id
        // if yes, put id in sessionstorage????? and render Main.js 
        // if no, render 404
    async validPath(){
        console.log("checking path")
        let path = window.location.pathname
        let id = path.split('/').pop();
        console.log(id)
        const data = {id: id}
        await Axios.post('https://minimaline-server.herokuapp.com/check-store',data)
            .then(response =>{
                if(response.data.message){
                    console.log("invalid")
                    console.log(response.data)
                    return false;
                }
                else{
                    console.log("valid")
                    console.log(response)
                    return true;
                }
            })
            .catch(err => {
                console.log(err)
                return false;
            })
    }




    // main.js
        // choose type 
        // choose dine in
        // onclick -> add above to sessionstorage
    
    // prodselect.js
        // on mount, get manager id from sessionstorage
        // axios display all store categs(:store_id)
        // axios display all prods (:store_id/:categ_id)
        // prodmodal.js
            // adjust quantity
            // onclick -> return count to prodselect.js
        // reflect changes in ordersum.js
}

export default new CustomerFn();