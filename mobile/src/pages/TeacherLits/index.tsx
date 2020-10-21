import React, { useState} from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';


import styles from './styles'
import api from '../../services/api';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFilterVisible, setIfFiltersVisible] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, seTime] = useState('');

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(response =>{
            if(response){
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })

                setFavorites(favoritedTeachersIds);
            }
        });
    }


    function handleToggleFiltersVisible() {
        setIfFiltersVisible(!isFilterVisible)
    }

    async function handlerFiltersSubmit() {
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        console.log(response.data)
        setIfFiltersVisible(false)
        setTeachers(response.data);
    }


    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}>

                {isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            style={styles.input}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1cccc"

                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    value={week_day}
                                    onChangeText={text => setWeek_day(text)}
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1cccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    value={time}
                                    onChangeText={text => seTime(text)}
                                    style={styles.input}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#c1cccc"
                                />
                            </View>
                        </View>
                        <RectButton onPress={handlerFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}>
                {teachers.map((teacher: Teacher) => {
                    return (
                    <TeacherItem 
                    key={teacher.id} 
                    teacher={teacher} 
                    favorited={favorites.includes(teacher.id)}/>)
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;