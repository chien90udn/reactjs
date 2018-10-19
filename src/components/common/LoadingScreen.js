import React from 'react';
import indicator from '../../../public/assets/images/indicator.gif';

class LoadingScreen extends React.Component {
	constructor(props) {
        super(props); 
        this.state = {
        	display : (!props.display || (props.display && props.display == false)) ? "d-none" : ""
        }  
    }
    componentWillReceiveProps(props) {
    	this.setState({display : (!props.display || (props.display && props.display == false)) ? "d-none" : ""});
    }
	render() {
		
	    return (
	    	<div id="overlay" className="show" className={this.state.display}>
                <img id="imgLoading" src={indicator} />
            </div>
	    )
	}
}
export default LoadingScreen