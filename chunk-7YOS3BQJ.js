import{Da as h,g as s,pa as a,t as i,x as r,ya as n}from"./chunk-V55VPPCX.js";var b=(()=>{class o{constructor(){this.apiUrl="https://todosecure-api.osc-fr1.scalingo.io",this.http=r(a),this.router=r(n),this.todoSubject=new s([]),this.todos$=this.todoSubject.asObservable(),this.jwtHelper=new h}isAuthenticated(){let t=localStorage.getItem("token");return t?!this.jwtHelper.isTokenExpired(t):!1}newUser(t){return this.http.post(`${this.apiUrl}/users`,t)}getUsers(){return this.http.get(`${this.apiUrl}/users`)}isLoggedIn(){return typeof localStorage<"u"&&localStorage.getItem("email")?!0:(this.router.navigate(["login"]),!1)}newTodo(t){return this.http.post(`${this.apiUrl}/todos`,t)}getTodos(){return this.http.get(`${this.apiUrl}/todos`)}updateTodo(t){return this.http.put(`${this.apiUrl}/todos/${t.id}`,t)}deleteTodo(t){if(!t.id)throw new Error("ID non d\xE9fini pour le todo");return this.http.delete(`${this.apiUrl}/todos/${t.id}`)}getTodosByUser(t){return this.http.get(`${this.apiUrl}/todos`,{params:{userEmail:t}})}loadTodos(t){this.http.get(`${this.apiUrl}/todos`,{params:{userEmail:t}}).subscribe({next:e=>this.todoSubject.next(e),error:e=>console.error("Erreur lors du chargement des todos: ",e)})}addLocal(t){let e=this.todoSubject.value;this.todoSubject.next([...e,t])}removeLocal(t){let e=this.todoSubject.value.filter(d=>d.id!==t.id);this.todoSubject.next(e)}static{this.\u0275fac=function(e){return new(e||o)}}static{this.\u0275prov=i({token:o,factory:o.\u0275fac,providedIn:"root"})}}return o})();export{b as a};
