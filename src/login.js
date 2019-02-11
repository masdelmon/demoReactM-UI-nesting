import React from "react";
export default class Login extends React.Component{
   constructor(props){
      super(props);
      this.state = {
         username: '',
         password: ''
      }
   }
   changeUsername(event){
        this.setState({username:event.target.value});
   }
   changePassword(event){
        this.setState({password:event.target.value});
   }
   onSubmit(event){
        event.preventDefault();
   }
   login(event){
       //FAKE REST API NEI PROSSIMI ARTICOLI
       console.log("Login con username: ", this.state.username);
       console.log("Login con password: ", this.state.password);
   }
   render(){
      return(
         <div style={{marginTop:"100px", minHeight:"70vh"}}>
            <div className = "container">
                <div className = "row">
                    <div className = "col-6 mr-auto ml-auto">
                       <form onSubmit={this.onSubmit.bind(this)}>
                          <div className = "form-group">
                             <input 
                                 type="text"
                                 className = "form-control"
                                 placeholder="username"
                                 value = {this.state.username || ''}
                                 onChange = {this.changeUsername.bind(this)}/>
                          </div>
                          <div className = "form-group">
                             <input 
                                type="password"
                                className = "form-control"
                                placeholder="password"
                                value = {this.state.password}
                                onChange = {this.changePassword.bind(this)}/>
                          </div>
                          <button 
                              type="submit"
                              className = "btn btn-primary pull-right"
                              onClick={this.login.bind(this)}>
                              Invio
                          </button>
                      </form>
                   </div>
              </div>
         </div>
     </div>
   );
 }
}
