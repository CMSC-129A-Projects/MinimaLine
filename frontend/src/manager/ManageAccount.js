import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { BiArrowBack } from "react-icons/bi";
import { Link,Redirect } from 'react-router-dom';
import Axios from 'axios';
import Auth from '../services/Auth';
Axios.defaults.withCredentials = true;

class ManageAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      account: true, store: false, currentNav: "account",
      editing: false, currentAccEdit: null, currentStoreEdit: null,
      user_info: [], username: '', email: '', storename: '',
      manager: '', location: '', successful: false,
      error: false, error_msg: '', redirect: false, 
      logo: null, upload_url: '', logo_url: '',
      cashier_username: '', cashier_password: '', cashiers: []
     }
     this.getUserInfo = this.getUserInfo.bind(this);
     this.getCashiers = this.getCashiers.bind(this);
     this.navClick = this.navClick.bind(this);
     this.editThis = this.editThis.bind(this);
     this.closeEdit = this.closeEdit.bind(this);
     this.editUsername = this.editUsername.bind(this);
     this.editEmail = this.editEmail.bind(this);
     this.editStoreName = this.editStoreName.bind(this);
     this.editLocation = this.editLocation.bind(this);
     this.editManager = this.editManager.bind(this);
     this.editLogo = this.editLogo.bind(this);
     this.addCashier = this.addCashier.bind(this);
  }
  async componentDidMount(){
    document.title = "MinimaLine | Account Management";
    this.getUserInfo();
    this.getCashiers();
  }
  async getUserInfo(){
    let user = await Axios.get('https://minimaline-server.herokuapp.com/account-info',{headers: Auth.header()})
        .catch((error)=> {
          this.setState({redirect: true})
        })
    if(!this.state.redirect){
      this.setState({user_info: user.data[0]})
    }
  }
  async getCashiers(){
    await Axios.get('https://minimaline-server.herokuapp.com/get-cashiers',{headers: Auth.header()})
        .then((response)=>{
          if(response.status!==400){
            this.setState({cashiers: response.data})
          }
        })
  }
  navClick(id){
    if(id==="account"){
      this.setState({
        account: true,
        store: false,
        currentNav: "account"
      })
    }
    else{
      this.setState({
        account: false,
        store: true,
        successful: false,
        currentNav: "store"
      })
    }
  }
  editThis(curr){
    if(this.state.currentNav==="account")
      this.setState({
        editing: true,
        successful: false,
        currentAccEdit: curr
      })
    else if(this.state.currentNav==="store")
    this.setState({
      editing: true,
      successful: false,
      currentStoreEdit: curr
    })
  }
  closeEdit(){
    this.setState({editing: false})
  }
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleUpload(e){
    this.setState({ 
      logo: e.target.files[0],
      editing: true,
      currentStoreEdit: 4
    })
  }
  async editEmail(e){
    e.preventDefault();
    const data = {email: this.state.email};
    await Axios.post('https://minimaline-server.herokuapp.com/edit-email', data, {headers: Auth.header()}).then((response) => {
      if(response.data.errors){
        this.setState({
          error: true,
          error_msg: response.data.errors[0].msg
        })
      }else{
        this.closeEdit();
        this.getUserInfo();
        this.setState({
          successful: true,
          error: false,
          email: ''
        })
      }
    })
  }
  async editUsername(e){
    e.preventDefault();
    const data = {username: this.state.username};
    await Axios.post('https://minimaline-server.herokuapp.com/edit-username', data, {headers: Auth.header()}).then((response) => {
      if(response.data.errors){
        this.setState({
          error: true,
          error_msg: response.data.errors[0].msg
        })
      }else{
        this.closeEdit();
        this.getUserInfo();
        this.setState({
          successful: true,
          error: false,
          username: ''
        })
      }
    })
  }
  async editStoreName(e){
    e.preventDefault();
    const data = {storename: this.state.storename};
    await Axios.post('https://minimaline-server.herokuapp.com/edit-storename', data, {headers: Auth.header()}).then((response) => {
      if(response.data.errors){
        this.setState({
          error: true,
          error_msg: response.data.errors[0].msg
        })
      }else{
        this.closeEdit();
        this.getUserInfo();
        this.setState({
          successful: true,
          error: false,
          storename: ''
        })
      }
    })
  }
  async editManager(e){
    e.preventDefault();
    const data = {manager: this.state.manager};
    await Axios.post('https://minimaline-server.herokuapp.com/edit-manager', data, {headers: Auth.header()}).then((response) => {
      if(response.data.errors){
        this.setState({
          error: true,
          error_msg: response.data.errors[0].msg
        })
      }else{
        this.closeEdit();
        this.getUserInfo();
        this.setState({
          successful: true,
          error: false,
          manager: ''
        })
      }
    })
  }
  async editLocation(e){
    e.preventDefault();
    const data = {location: this.state.location};
    await Axios.post('https://minimaline-server.herokuapp.com/edit-location', data, {headers: Auth.header()}).then((response) => {
      if(response.data.errors){
        this.setState({
          error: true,
          error_msg: response.data.errors[0].msg
        })
      }else{
        this.closeEdit();
        this.getUserInfo();
        this.setState({
          successful: true,
          error: false,
          location: ''
        })
      }
    })
  }
  async editLogo(e){
    e.preventDefault();
    // get secure upload url
    await Axios.get('https://minimaline-server.herokuapp.com/request-upload')
      .then(response => {
        console.log(response.data.url)
        this.setState({upload_url: response.data.url})
      })
    // upload img using above url
    await Axios.put(this.state.upload_url,this.state.logo)
      .then(response=>{
        const imgURL = this.state.upload_url.split('?')[0]
        console.log(imgURL)
        this.setState({logo_url: imgURL})
      })
      const data = {logo: this.state.logo_url};
      await Axios.post('https://minimaline-server.herokuapp.com/edit-logo', data, {headers: Auth.header()}).then((response) => {
        if(response.data.errors){
          this.setState({
            error: true,
            error_msg: response.data.errors[0].msg
          })
        }else{
          this.closeEdit();
          this.getUserInfo();
          this.setState({
            successful: true,
            error: false,
            logo: '',
            upload_url: '',
            logo_url:''
          })
        }
      })
  }
  async addCashier(e){
    e.preventDefault();
    const data = {
      username: this.state.cashier_username,
      password: this.state.cashier_password
    }
    await Axios.post('https://minimaline-server.herokuapp.com/add-cashier', data, {headers: Auth.header()})
      .then((response)=>{
        if(response.data.errors){
          this.setState({
            error: true,
            error_msg: response.data.errors[0].msg
          })
        }
        else if(response.status!==400){
          this.closeEdit()
          this.getCashiers()
          this.setState({
            successful: true,
            error: false,
            cashier_username: '',
            cashier_password: ''
          })
        }
      })
      .catch(err=>{
        console.log(err)
      })
  }
  
  render() { 
    if(this.state.redirect)
      return <Redirect to="/"/>
    return ( 
      <Container>
        <Top>
          <div className="arrow">
            <Link to={{ pathname: "/dashboard" }}>
                <BiArrowBack size="50px" color="#676666"/>
            </Link>
          </div>
          <div className="text">
            <h1>Manage Account</h1>
            <p>View and edit your account and store information.</p>
          </div>
        </Top>
        <Wrapper>
          <Sidebar>
            <div className={(this.state.account && this.state.currentNav==="account") ? 'clicked' : 'unclicked'}
                  onClick={()=>this.navClick("account")}>
              Account
            </div>
            <div className={(this.state.store && this.state.currentNav==="store") ? 'clicked' : 'unclicked'}
                  onClick={()=>this.navClick("store")}>
              Store
            </div>
          </Sidebar>
          <Body>
      {/* ACCOUNT INFO */}
            {!this.state.account ? null :
              <div>
                <h1>Your Account</h1>
                  <div className="info">
                    <div className="block">
                      <h2 className="label">Username</h2>
                      {this.state.successful && this.state.currentAccEdit===1 ? <p className="successful">Successfully changed username</p> : null}
                      {this.state.error && this.state.currentAccEdit===1 ? <p className="error">{this.state.error_msg}</p> : null}
                      {(this.state.editing && this.state.currentAccEdit===1) ? 
                        <Form onSubmit={this.editUsername}>
                          <p className="edit-label">Enter your new username</p>
                          <StyledInput type="text" autoComplete="off" required
                            name="username" value={this.state.username}
                            placeholder={this.state.user_info["username"]} onChange={this.handleChange.bind(this)}/>
                          <div>
                            <button className="save">Save Changes</button>
                            <button className="cancel-edit" onClick={this.closeEdit}>Cancel</button>
                          </div>
                        </Form> 
                      : <div>
                          <p>{this.state.user_info["username"]}</p>
                          <button className="edit" onClick={()=>this.editThis(1)}>Edit</button> 
                        </div> }
                    </div>

                    <div className="block">
                      <h2 className="label">E-mail</h2>
                      {this.state.successful && this.state.currentAccEdit===2 ? <p className="successful">Successfully changed e-mail</p> : null}
                      {this.state.error && this.state.currentAccEdit===2 ? <p className="error">{this.state.error_msg}</p> : null}
                      {(this.state.editing && this.state.currentAccEdit===2) ? 
                        <Form onSubmit={this.editEmail}>
                          <p className="edit-label">Enter your new e-mail</p>
                          <StyledInput type="email" autoComplete="off" required
                            name="email" value={this.state.email}
                            placeholder={this.state.user_info["email"]} onChange={this.handleChange.bind(this)}/>
                          <div>
                            <button className="save">Save Changes</button>
                            <button className="cancel-edit" onClick={this.closeEdit}>Cancel</button>
                          </div>
                        </Form> 
                      : <div>
                          <p>{this.state.user_info["email"]}</p>
                          <button className="edit" onClick={()=>this.editThis(2)}>Edit</button> 
                        </div> }
                    </div>

                    <div className="block">
                      <h2 className="label">Password</h2>
                      {(this.state.editing && this.state.currentAccEdit===3) ? 
                          <Form>
                            <p className="edit-label">Current password</p>
                            <StyledInput/>
                            <p className="edit-label">New password</p>
                            <StyledInput/>
                            <div>
                              <button className="save" onClick={this.closeEdit}>Save Changes</button>
                              <button className="cancel-edit" onClick={this.closeEdit}>Cancel</button>
                            </div>
                          </Form> 
                        : <button className="edit password" onClick={()=>this.editThis(3)}>Change password</button> }
                    </div>
                    <div className="block del-acc-block">
                      <button className="delete">Delete account</button>
                    </div>
                </div>
              </div>
            }
      {/* STORE INFO */}
            {!this.state.store ? null :
              <div>
                <h1>Your Store</h1>
                <div className="info">
                  <div className="block">
                    <h2 className="label">Store Name</h2>
                    {this.state.successful && this.state.currentStoreEdit===1 ? <p className="successful">Successfully changed store name</p> : null}
                    {this.state.error && this.state.currentStoreEdit===1 ? <p className="error">{this.state.error_msg}</p> : null}
                    {(this.state.editing && this.state.currentStoreEdit===1) ? 
                      <Form onSubmit={this.editStoreName}>
                        <p className="edit-label">Enter store name</p>
                        <StyledInput type="text" autoComplete="off" required
                            name="storename" value={this.state.storename}
                            placeholder={this.state.user_info["store_name"]} onChange={this.handleChange.bind(this)}/>
                        <div>
                          <button className="save">Save Changes</button>
                          <button className="cancel-edit" onClick={this.closeEdit}>Cancel</button>
                        </div>
                      </Form> 
                    : <div>
                        <p>{this.state.user_info["store_name"]}</p>
                        <button className="edit" onClick={()=>this.editThis(1)}>Edit</button> 
                      </div> }
                  </div>

                  <div className="block">
                    <h2 className="label">Location</h2>
                    {this.state.successful && this.state.currentStoreEdit===2 ? <p className="successful">Successfully changed store location</p> : null}
                    {this.state.error && this.state.currentStoreEdit===2 ? <p className="error">{this.state.error_msg}</p> : null}
                    {(this.state.editing && this.state.currentStoreEdit===2) ? 
                      <Form onSubmit={this.editLocation}>
                        <p className="edit-label">Enter store location</p>
                        <StyledInput type="text" autoComplete="off" required
                            name="location" value={this.state.location}
                            placeholder={this.state.user_info["location"]} onChange={this.handleChange.bind(this)}/>
                        <div>
                          <button className="save">Save Changes</button>
                          <button className="cancel-edit" onClick={this.closeEdit}>Cancel</button>
                        </div>
                      </Form> 
                    : <div>
                        <p>{this.state.user_info["location"]}</p>
                        <button className="edit" onClick={()=>this.editThis(2)}>Edit</button> 
                      </div> }
                  </div>

                  <div className="block">
                    <h2 className="label">Store Manager</h2>
                    {this.state.successful && this.state.currentStoreEdit===3 ? <p className="successful">Successfully changed store manager</p> : null}
                    {this.state.error && this.state.currentStoreEdit===3 ? <p className="error">{this.state.error_msg}</p> : null}
                    {(this.state.editing && this.state.currentStoreEdit===3) ? 
                      <Form onSubmit={this.editManager}>
                        <p className="edit-label">Enter store manager's name</p>
                        <StyledInput type="text" autoComplete="off" required
                            name="manager" value={this.state.manager}
                            placeholder={this.state.user_info["manager_name"]} onChange={this.handleChange.bind(this)}/>
                        <div>
                          <button className="save">Save Changes</button>
                          <button className="cancel-edit" onClick={this.closeEdit}>Cancel</button>
                        </div>
                      </Form> 
                    : <div>
                        <p>{this.state.user_info["manager_name"]}</p>
                        <button className="edit" onClick={()=>this.editThis(3)}>Edit</button> 
                      </div> }
                  </div>

                  <div className="block">
                    <h2 className="label">Store Logo</h2>
                    {this.state.successful && this.state.currentStoreEdit===4 ? <p className="successful">Successfully changed store logo</p> : null}
                    {this.state.error && this.state.currentStoreEdit===4 ? <p className="error">{this.state.error_msg}</p> : null}
                    <img src={this.state.user_info["logo"]}/>
                      {(this.state.editing && this.state.currentStoreEdit===4) ? 
                        <Form onSubmit={this.editLogo}>
                          <p className="edit-label">Upload new logo</p>
                          <input className="upload" type="file" name="logo" required onChange={this.handleUpload.bind(this)}/>
                          <div>
                            <button className="save">Save Changes</button>
                            <button className="cancel-edit" onClick={this.closeEdit}>Cancel</button>
                          </div>
                        </Form> 
                      : <div>
                          <button className="edit" onClick={()=>this.editThis(4)}>Edit</button> 
                        </div> }
                  </div>

                  <div className="block cashier-block">
                    <h2 className="label">Cashiers</h2>
                    {this.state.successful && this.state.currentStoreEdit===5 ? <p className="successful">Successfully updated cashiers</p> : null}
                    {this.state.error && this.state.currentStoreEdit===5 ? <p className="error">{this.state.error_msg}</p> : null}
                    {!this.state.cashiers.length ? <p>No cashiers have been added for your store.</p> :
                      <div>
                        {this.state.cashiers.map((cashier,index)=>{
                          return(<p>{cashier["username"]}</p>)
                        })}
                      </div>
                    }
                    {(this.state.editing && this.state.currentStoreEdit===5) ? 
                      <Form onSubmit={this.addCashier}>
                        <p className="edit-label">Enter cashier username</p>
                        <StyledInput type="text" autoComplete="off" required
                            name="cashier_username" value={this.state.cashier_username}
                            placeholder="Username" onChange={this.handleChange.bind(this)}/>
                        <p className="edit-label">Enter cashier password</p>
                        <StyledInput type="password" autoComplete="off" required
                            name="cashier_password" value={this.state.cashier_password}
                            placeholder="Password" onChange={this.handleChange.bind(this)}/>
                        <div>
                          <button className="save">Save Changes</button>
                          <button className="cancel-edit" onClick={this.closeEdit}>Cancel</button>
                        </div>
                      </Form> 
                    : <div>
                        <button className="add-cashier" onClick={()=>this.editThis(5)}>Add cashier</button> 
                      </div> }
                  </div>

                </div>
              </div>
            }
          </Body>
        </Wrapper>
        
      </Container>
     );
  }
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: #faf0e0;
  position: absolute;
  overflow: hidden;
`;
const Top = styled.div`
  display: flex;
  flex-direction: row;
  /* background: white; */
  width: 100%;
  .arrow{
    /* border: 1px solid black; */
    width: 6%;
    padding-top: 50px;
    padding-left: 20px;
  }
  .text{
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    width: 84%;
    h1{
      font-size: 50px;
      /* margin-top: px; */
    }
    p{
      font-size: 20px;
      margin-top: -20px;
    }
  }
  .edit-btn{
    width: 10%;
    /* border: 1px solid black; */
    button{
      height: 45px;
      width: 90px;
    }
  }
  
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  margin-top: 10px;
`;
const Sidebar = styled.div`
  height: 100%;
  width: 15%;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  .clicked{
    font-size: 20px;
    margin: 10px 0px;
    text-align: center;
    line-height: 50px;
    background: #f9c91e;
    border-radius: 10px;
    font-weight: bold;
    :hover{
      cursor: pointer;
    }
  }
  .unclicked{
    font-size: 20px;
    margin: 10px 0px;
    text-align: center;
    line-height: 50px;
    background: transparent;
    border-radius: 10px;
    :hover{
      cursor: pointer;
      background: #F3D9A4;
    }
  } 
`;

const Body = styled.div`
  background: white;
  height: 77%;
  width: 83%;
  border-radius: 30px;
  overflow: auto;
  h1{
    font-size: 50px;
    margin-left: 40px;
  }
  h2{
    font-size: 30px;
  }
  .successful{
    color: #568d33;
    font-weight: bold;
  }
  .error{
    color: #ff5c5c;
    font-weight: bold;
  }
  .info{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -40px;
  }
  .block{
    border-bottom: 0.5px solid #d6d6d6;
    width: 70%;
    padding-left: 20px;
    padding-bottom: 30px;
    padding-top: 10px;
    /* margin-bottom: 10px; */
  }
  .cashier-block{
    border-bottom: none;
  }
  .del-acc-block{
    border-bottom: none;
    padding-bottom: 60px;
    padding-top: 30px;
  }
  button.edit{
    background-color: white;
    border: 0.5px solid #ec9736;
    border-radius: 5px;
    color: #ec9736;
    font-weight: bold;
    font-size: 15px;
    width: 50px;
    height: 30px;
    margin-top: 10px;
    :hover{
      cursor: pointer;
      background-color: #ec9736;
      color: white;
    }
  }
  button.password{
    font-size: 15px;
    width: 150px;
    height: 40px;
    margin-top: 5px;
  }
  button.save{
    background-color: white;
    border: 0.5px solid #ec9736;
    border-radius: 5px;
    color: #ec9736;
    font-weight: bold;
    font-size: 13px;
    width: 110px;
    height: 30px;
    margin-top: 10px;
    :hover{
      cursor: pointer;
      background-color: #ec9736;
      color: white;
    }
  }
  button.cancel-edit{
    background-color: white;
    border: none;
    /* border-radius: 5px; */
    color: #ec9736;
    font-weight: bold;
    font-size: 13px;
    /* width: 110px;
    height: 30px; */
    margin-top: 10px;
    margin-left: 10px;
    :hover{
      cursor: pointer;
      /* text-decoration: underline; */
    }
  }
  button.delete{
    background-color: white;
    border: 0.5px solid #ff5c5c;
    border-radius: 5px;
    color: #ff5c5c;
    font-weight: bold;
    font-size: 15px;
    width: 150px;
    height: 50px;
    margin-top: 10px;
    :hover{
      cursor: pointer;
      background-color: #ff5c5c;
      color: white;
    }
  }
  button.add-cashier{
    background-color: white;
    border: 0.5px solid #ec9736;
    border-radius: 5px;
    color: #ec9736;
    font-weight: bold;
    font-size: 15px;
    width: 110px;
    height: 40px;
    margin-top: 10px;
    :hover{
      cursor: pointer;
      background-color: #ec9736;
      color: white;
    }
  }
  img{
    max-height: 200px;
    max-width: 200px;
    margin-bottom: 10px;
  }
  .upload{
    margin-bottom: 10px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: -15px;
`;
const StyledInput = styled.input`
    width: 80%;
    max-width: 450px;
    min-width: 350px;
    height: 40px;
    border: 1px solid #676666;
    margin-bottom: 15px;
    background-color: #f5f5f5;
    /* box-shadow: 0px 14px 9px -15px rbga(0,0,0,0.25); */
    border-radius: 8px;
    padding: 0 1rem;
    transition: all 0.2s ease-in;
`;
export default ManageAccount;