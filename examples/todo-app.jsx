   var ListItem = React.createClass({
       render: function() {
           return <li>
               <span style={{width: 300+'px', display:'inline'}}>{this.props.label}</span>
               <span> [{this.props.status}]</span> - 
               <span onClick={this.deleteObj}>Delete</span> |  
               <span onClick={this.complete}>Done</span> 
           </li>
       },
       deleteObj: function() {
            this.props.onDelete(this.props.code);
        },
       complete: function() {
           
           this.props.onComplete(this.props.code);
       }
   });

    var TodoList = React.createClass({
        render: function () {
            var onDelete = this.props.onDelete;
            var onComplete = this.props.onComplete;
            var createItem = function (item) {
                
               
                return <ListItem label={item.label} onDelete={onDelete} code={item.id} status={item.status} onComplete={onComplete}/> ;
            };
            return <ul> {this.props.items.map(createItem)} </ul>;
        }   
    });

    var TodoApp = React.createClass({
        getInitialState: function () {
            return {
                items: [],
                text: '',
                lastId: 1
            };
        },

        onChange: function (e) {
            this.setState({
                text: e.target.value
            });
        },

        handleSubmit: function (e) {
            e.preventDefault();
            var item = {
              id : this.state.lastId,
                label : this.state.text,
                status: 'Open'
            };
            
            
            var nextItems = this.state.items.concat([item]);
            var nextText = '';
            this.setState({
                items: nextItems,
                text: nextText,
                lastId : this.state.lastId +1
            });
        },
    
        deleteObj: function(data_id) {
        
            var items = this.state.items;
            var newItems = items.filter(function(elem) {
                return elem.id != data_id;
            });

            this.setState({items: newItems});
        },
        completeTask: function(code){
            var items = this.state.items;
 
            for(var i=0; i< items.length; i++) {
                if (items[i].id == code) {
                    items[i].status = 'Completed';
                    break;
                }
            }
            
            this.setState({items  : items});
        },
        
        render: function () {
            return ( <div>
                <h3> TODO </h3> 
                    
                    <form onSubmit = {this.handleSubmit}>
                            <input onChange = {this.onChange} value ={this.state.text}/> 
                        <button> {'Add' } 
                        </button> 
                    </form> 
                    
                    <TodoList items = {this.state.items} onDelete={this.deleteObj}  onComplete={this.completeTask}/> 
                        
                </div>
            );
        }
    });

    React.render( < TodoApp /> , document.getElementById('todoExample'));