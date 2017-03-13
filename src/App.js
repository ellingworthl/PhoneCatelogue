import React from 'react';
import './App.css' ;
import _ from 'lodash';

//new imports
import Phones from './Data';
import { Link } from 'react-router';

//no change because of routing
      var SelectBox = React.createClass({
          handleChange : function(e, type,value) {
               e.preventDefault();
               this.props.onUserInput( type,value);
          },
          handleTextChange : function(e) {
                this.handleChange( e, 'search', e.target.value);
          },
          handleSortChange : function(e) {
              this.handleChange(e, 'sort', e.target.value);
          },
          render: function(){
               return (
                 <div className="col-md-10">
                 <input type="text" placeholder="Search" 
                              value={this.props.filterText}
                              onChange={this.handleTextChange} />
               Sort by:
                   <select id="sort" value={this.props.order } 
                             onChange={this.handleSortChange} >
                   <option value="name">Alphabetical</option>
                   <option value="age">Newest</option>
               </select>
                 </div>
                );
              }
           });


//react router tag "Link " added to replace "a href" HTML hyperlink tag
var PhoneItem = React.createClass({
    render: function(){
    //console.log ('PhoneItem');
    //console.log (this.props.phone.name);
      return (
        <li className="thumbnail phone-listing">
          <Link to={'/phones/' + this.props.phone.id} className="thumb">
               <img src={"/phoneSpecs/" + this.props.phone.imageUrl} 
                   alt={this.props.phone.name} /> </Link>
          <Link to={'/phones/' + this.props.phone.id}> {this.props.phone.name}</Link>
          <p>{this.props.phone.snippet}</p>
        </li>
    );
  }
});

//FilteredPhoneList not changed by routing
var FilteredPhoneList = React.createClass({
    render: function(){
    //console.log ('FilteredPhoneList');
    //console.log (this.props.phones);
        var displayedPhones = this.props.phones.map(function(phone) {
          return <PhoneItem key={phone.id} phone={phone} /> ;
        }) ;
        return (
                <div className="col-md-10">
                  <ul className="phones">
                      {displayedPhones}
                  </ul>
                </div>
          ) ;
    }
});

//no change to PhoneCatalogueApp because of routing
var PhoneCatalogueApp = React.createClass({
     getInitialState: function() {
           return { search: '', sort: 'name' } ;
      }, 
     handleChange : function(type,value) {
            if ( type === 'search' ) {
                this.setState( { search: value } ) ;
              } else {
                 this.setState( { sort: value } ) ;
              }
      }, 
       render: function(){
           var list = Phones.filter(function(p) {
                  return p.name.toLowerCase().search(
                         this.state.search.toLowerCase() ) !== -1 ;
                    }.bind(this) );
           var filteredList = _.sortBy(list, this.state.sort) ;
           return (
              <div className="view-container">
              <div className="view-frame">
                 <div className="container-fluid">
                   <div className="row">
                      <SelectBox onUserInput={this.handleChange } 
                             filterText={this.state.search} 
                             sort={this.state.sort} />
                       <FilteredPhoneList phones={filteredList} />
                  </div> 
                  </div>                   
                </div>
              </div>
          );
        }
});

export default PhoneCatalogueApp;