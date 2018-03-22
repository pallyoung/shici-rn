'use strict'
import React from 'react';
import {
    View,
    Text
} from 'react-native';
function Article(props){
    return (
        <View>
            <View>
                <Text>{props.title}</Text>
            </View>
            <View>
                <Text>{props.age}</Text>
                <Text>{props.author}</Text>
            </View>
            <View>
                {props.article.map((item,i)=><Text key={i}>{item}</Text>)}
            </View>
        </View>
    );
}

export default Article;