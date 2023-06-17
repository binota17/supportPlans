import React, { useState } from "react";
import { StyleSheet, Text, View ,TouchableOpacity,Modal} from "react-native";
import {colors} from "./Colors";
import TodoModal from "./TodoModal";

const TodoList = ({list,updateList}) => {
    const completedCount = list.todos.filter((todo :  {
        title: string;
        completed: boolean;
    }) => todo.completed).length;
    const com= list.todos.fil
    const remainingCount = list.todos.length - completedCount;
    const [showListVisible,setShowListVisible] = useState(false);

    return (
        <View>
            <Modal
                animationType="slide"
                visible={showListVisible}
                onRequestClose={()=>setShowListVisible(!showListVisible)}
            >
                <TodoModal list={list} closeModal={()=>setShowListVisible(!showListVisible)} updateList={updateList}/>
            </Modal>
            <TouchableOpacity 
                style={[styles.listContainer, {backgroundColor: list.color}]}
                onPress={()=>setShowListVisible(!showListVisible) }
            >
                <Text style={styles.listTitle} numberOfLines={1} >
                    {list.name}
                </Text>

                <View>
                   <View style={{alignItems: "center"}}>
                       <Text style={styles.count}>{remainingCount}</Text>
                       <Text style={styles.subtitle}>Remaining</Text>
                    </View>
                    <View style={{alignItems: "center"}}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subtitle}>Remaining</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};



const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal:16,
        borderRadius:6,
        marginHorizontal:12,
        alignItems:"center",
        width:200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.WHITE,
        marginBottom: 18
    },
    count:{
        fontSize: 48,
        fontWeight: "200",
        color: colors.WHITE
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.WHITE
    }
})

export default TodoList;