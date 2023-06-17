import React, { useState } from "react";
import {View, Text,StyleSheet, SafeAreaView,TouchableOpacity,Animated, FlatList ,KeyboardAvoidingView,TextInput,Keyboard} from "react-native";
import {colors} from "./Colors";
import {AntDesign, Ionicons} from "@expo/vector-icons"
import  {Swipeable,GestureHandlerRootView}  from "react-native-gesture-handler";
import Swipelist from "react-native-swipeable-list-view";


const TodoModal = ({list,closeModal,updateList}) => {

    const [newTodo,setNewTodo] = useState("");
    const list1 = list;
    const taskCount = list.todos.length;
    const completedCount = list1.todos.filter((todo :  {
        title: string;
        completed: boolean;
    }) => todo.completed).length;



    const toggleTodoCompleted = (index:number) => {
        let list1 = list;
        list1.todos[index].completed = !list1.todos[index].completed;
        updateList(list1);
    }


    

    const renderTodo = (todo :  {
        title: string;
        completed: boolean;
    },index : number) => {
        return(
            <GestureHandlerRootView>
            <Swipeable renderRightActions={(progress, dragX)=>rightActions(dragX,index)}>
                <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
                        <Ionicons 
                            name={todo.completed ? "ios-square" : "ios-square-outline"} 
                            size={24} 
                            color={colors.GRAY} 
                            style={{width:32}}/>
                    </TouchableOpacity>

                    <Text 
                        style={[
                            styles.todo, 
                            {textDecorationLine: todo.completed ? "line-through" : "none",
                            color: todo.completed ? colors.GRAY : colors.BLACK}
                            ]}
                   >
                            {todo.title}
                    </Text>
                </View>
            </Swipeable>
            </GestureHandlerRootView>
        )
    }

        const rightActions = (dragX,index:number) => {

        const scale = dragX.interpolate({
            inputRange: [-100,0],
            outputRange:[1,0.9],
            extrapolate:"clamp"
        })

        const opacity = dragX.interpolate({
            inputRange:[-100,-20,0],
            outputRange:[1,0.9,0],
            extrapolate:"clamp"
        })

        return(
            <TouchableOpacity onPress={()=>deleteTodo(index)}>
                <Animated.View style={[styles.deleteButton,{opacity:opacity}]}>
                    <Animated.Text style={{color:colors.WHITE,fontWeight:"800", transform: [{scale}]}}>Delete</Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        )
    }

    const addTodo = () => {
        let list1 = list;
        if(!list1.todos.some((todo :  {
            title: string;
            completed: boolean;
        })=>todo.title === newTodo)) {
            list1.todos.push({title:newTodo,completed:false});
            updateList(list1);
        }
        

        setNewTodo(""); 
        Keyboard.dismiss();
    }

    const deleteTodo = (index: number) => {
        let list1 = list;
        list1.todos.splice(index,1);

        updateList(list1)
    }


    

    return(
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" >
            <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={{position:"absolute",top:64,right:32,zIndex:10}}
                onPress={closeModal}
            >
                <AntDesign name="close" size={24} color={colors.BLACK}/>
            </TouchableOpacity>

            <View style={[styles.section, styles.header,{borderBottomColor:list1.color}]}>
                <View>
                    <Text style={styles.title}>{list1.name}</Text>
                    <Text style={styles.taskCount}>
                        {completedCount} of {taskCount} tasks
                    </Text>
                </View>
            </View>

            <View style={[styles.section,{flex: 3, marginVertical:16}]}>
                <FlatList
                    data={list1.todos}
                    renderItem={({item,index}) => renderTodo(item,index)}
                    keyExtractor={item=>item.title}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <KeyboardAvoidingView style={[styles.section,styles.footer]} >
                <TextInput 
                    style={[styles.input,{borderColor: list1.color}]} 
                    onChangeText={text => setNewTodo(text)}
                    value={newTodo}
                />
                <TouchableOpacity style={[styles.addTodo,{backgroundColor:list1.color}]} onPress={()=>addTodo()} >
                    <AntDesign name="plus" size={16} color={colors.WHITE} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    section: {
        alignSelf:"stretch"
    },
    header: {
        justifyContent:"flex-end",
        marginLeft:64,
        borderBottomWidth:3,
        paddingTop: 16
    },
    title: {
        fontSize:30,
        fontWeight: "800",
        color: colors.BLACK
    },
    taskCount: {
        marginTop: 4,
        marginBottom:16,
        color: colors.GRAY,
        fontWeight:"600"
    },
    footer: {
        paddingHorizontal:32,
        flexDirection:"row",
        alignItems:"center",
        paddingVertical : 16
    },
    input: {
        flex:1,
        height:48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius:6,
        marginRight:8,
        paddingHorizontal:8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems:"center",
        justifyContent:"center"
    },
    todoContainer: {
        paddingVertical:16,
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:32
    },
    todo: {
        color: colors.BLACK,
        fontWeight:"700",
        fontSize:16
    },
    deleteButton: {
        flex:1,
        backgroundColor:colors.RED,
        alignItems:"center",
        justifyContent:"center",
        width:80
    },
   
})

export default TodoModal;