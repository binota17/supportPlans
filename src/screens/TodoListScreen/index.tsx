import React, { FC, useState} from "react";
import { View, Text, StyleSheet, Modal, Alert } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import {colors} from "./Colors";
import { FlatList, Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import {AntDesign} from '@expo/vector-icons';
import { tempData } from "./tempData";
import TodoList from "./TodoList";
import AddListModal from "./AddListModal";
import { SafeAreaView } from "react-native-safe-area-context";
interface IProps {
    navigation: NavigationProp<ParamListBase>;
  }

  const TodoListScreen: FC<IProps> = ({ navigation }) => {

    const [addTodoVisible,setAddTodoVisible]= useState(false);
    const [lists,setLists] = useState(tempData);
    
    const renderList = (list:{
      name: string;
      color: string;
      todos: {
          title: string;
          completed: boolean;
      }[]  
    }) => {
      return <TodoList list={list} updateList= {updateList}/>
    };



    const addList = (list:{
      name: string;
      color: string;
      todos: {
          title: string;
          completed: boolean;
      }[]  
    }) => {
      const newList = [...lists,{...list,id:lists.length + 1, todos: []}];
      setLists(newList);
    };

    const updateList = (list:{
        id:number;
        name: string;
        color: string;
        todos: {
            title: string;
            completed: boolean;
        }[]  
      }) => {

        setLists(lists.map(item => {
            return item.id === list.id ? list : item;
        })
        )
      };
    

    return (
    <View style={styles.container}>
      <Modal 
        animationType="slide" 
        visible={addTodoVisible}
        onRequestClose={()=>setAddTodoVisible(!addTodoVisible)}
      >
        <AddListModal closeModal={()=>setAddTodoVisible(!addTodoVisible)} addList = {addList}/>  
      </Modal>
      <View style={{flexDirection:"row"}}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo <Text style={{fontWeight:"300",color: colors.BLUE}} >Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View> 

      <View style={{marginVertical:48}}>
        <TouchableOpacity style={styles.addList} onPress={()=>setAddTodoVisible(!addTodoVisible)}>
          <AntDesign name="plus" size={16} color={colors.BLUE} />
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View> 

      <View style={{height:275,paddingLeft:32}}>
        <FlatList 
          data={lists}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item}) => renderList(item)}
          keyboardShouldPersistTaps="always"
        />
      </View>
    </View>
    );
    
  };

  const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: "#fff",
        alignItems:"center",
        justifyContent: "center"
    },
    divider: {
        backgroundColor: colors.LIGHTBLUE,
        height:1,
        flex:1,
        alignSelf: "center"
    },
    title: {
        fontSize: 38,
        fontWeight:"800",
        color: colors.BLACK,
        paddingHorizontal:64
    },
    addList: {
        borderWidth:2,
        borderColor:colors.LIGHTBLUE,
        borderRadius:4,
        padding:16,
        alignItems:"center",
        justifyContent:"center"
    },
    add: {
        color: colors.BLUE,
        fontWeight:"600",
        fontSize:14,
        marginTop:8
    }
  
});
  
  export default TodoListScreen