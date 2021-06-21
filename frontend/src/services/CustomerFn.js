import Axios from "axios";
Axios.defaults.withCredentials = true;

class CustomerFn{
    // authentication
        // get path
        // split path and get id
        // check if path id===manager id
        // if yes, put id in sessionstorage????? and render Main.js 
        // if no, render 404
    storeId(id){
        let customer = [];
        customer.push({id:id});
        sessionStorage.setItem("customer",JSON.stringify(customer))
        let res = JSON.parse(sessionStorage.getItem("customer"))
        console.log(res)
    }
    storeCustomerType(data){
        console.log(data)
        let customer = JSON.parse(sessionStorage.getItem("customer"))
        customer.push(data);
        sessionStorage.setItem("customer",JSON.stringify(customer))
        let res = JSON.parse(sessionStorage.getItem("customer"))
        console.log(res)
    }
    storeCustomerOrder(data){
        let customer = JSON.parse(sessionStorage.getItem("customer"))
        customer.push(data);
        sessionStorage.setItem("customer",JSON.stringify(customer))
        let res = JSON.parse(sessionStorage.getItem("customer"))
        console.log(res)
    }
    async verifyId(id){
        // if(!sessionStorage.getItem("customer")){
            // let redirect = {id: id}
            // return redirect;
        // }
        let customer = JSON.parse(sessionStorage.getItem("customer"))
        if(customer.length < 2){
            let redirect = {id: id}
            return redirect;
        }
        let store_id = customer[0]["id"]
        if(store_id!==id){
            let wrong = {id: store_id}
            return wrong;
        }
        return;
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
// async validPath(){
    //     console.log("checking path")
    //     let path = window.location.pathname
    //     let id = path.split('/').pop();
    //     console.log(id)
    //     const data = {id: id}
    //     await Axios.post('https://minimaline-server.herokuapp.com/check-store',data)
    //         .then(response =>{
    //             if(response.data.message){
    //                 console.log("invalid")
    //                 console.log(response.data)
    //                 return false;
    //             }
    //             else{
    //                 console.log("valid")
    //                 console.log(response)
    //                 return true;
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err)
    //             return false;
    //         })
    // }