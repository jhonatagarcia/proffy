import React from 'react';
import { Link } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';

import './styles.css'
import TeacherItem from '../../components/TeacherItem';

function TeacherList() {
    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers">
                    <div className="input-block">
                        <label htmlFor="subject">Matérias</label>
                        <input type="text" id="subject" />
                    </div>

                    <div className="input-block">
                        <label htmlFor="week_day">Dia da semana</label>
                        <input type="text" id="week_day" />
                    </div>

                    <div className="input-block">
                        <label htmlFor="time">Hora</label>
                        <input type="text" id="time" />
                    </div>
                </form>
            </PageHeader>

            <main>
               <TeacherItem/>
               <TeacherItem/>
               <TeacherItem/>
               <TeacherItem/>
               <TeacherItem/>
               <TeacherItem/>
               <TeacherItem/>
               <TeacherItem/>
            </main>
        </div>
    )
}

export default TeacherList;