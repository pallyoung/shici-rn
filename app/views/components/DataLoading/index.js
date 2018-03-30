import React,{Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';

const IMAGE = [
    require('./455.jpg'),
    require('./456.jpg'),
    require('./457.jpg'),
    require('./458.jpg')
];


class DataLoading extends Component{
    constructor(...props) {
        super(...props);
        this.state = {
            image:IMAGE[0],
            index:0
        }
        this._imageChangeHandle;
    }
    componentDidMount() {
        this._changeImage();
    }
    componentWillUnmount() {
        this_stopChangeImage();
    }
    
    _changeImage(){
        this._imageChangeHandle = setTimeout(() => {
                let index = this.state.index;
                index++;
                if(index>=IMAGE.length){
                    index = 0;
                }
                this.setState({
                    image:IMAGE[index],
                    index
                });
                this._changeImage();
        }, 2000);
    }
    this_stopChangeImage(){
        clearTimeout(this._imageChangeHandle);
    }
    render(){
        return (
            <View
                style={styles.wrapper}>
                <Image 
                    style={styles.image}
                    resizeMode='stretch'
                    source={this.state.image}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        flexDirection:'column'
    },
    image:{
        flex:1,
        width:Dimensions.get('window').width
    }
});
export default DataLoading;