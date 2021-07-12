import React, { useState } from 'react'
import './Calendar.scss';
import DayCard from './DayCard';

function Calendar(props) 
{
    let { parentCallback } = props;
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let current_week_temp = []

    let today_date = new Date();
    let today_date_day = today_date.getDay() - 1;
    if(today_date_day === -1)
    {
        today_date_day = 6;
    }
    
    current_week_temp[today_date_day] = today_date;
    
    for(let i = 0; i <= 6; i++)
    {
        if(i != today_date_day)
        {
            let difference_in_days = (i - today_date_day);
            current_week_temp[i] = new Date(today_date.valueOf() + (difference_in_days * 86400000)); 
        }
    }
    
    const [current_week, setCurrentWeek] = useState(current_week_temp);
    const [selected_date, setSelectedDate] = useState(today_date);
    const [selected_month, setSelectedMonth] = useState(months[today_date.getMonth()]);

    parentCallback(selected_date);

    function areDatesEqual(date_1, date_2)
    {
        if((date_1.getDate() === date_2.getDate()) && (date_1.getMonth() === date_2.getMonth()) && (date_1.getYear() === date_2.getYear()))
        {
            return(true);
        }
        else
        {
            return(false);
        }
    }

    function increaseCurrentWeek()
    {
        for(let i = 0; i <= 6; i++)
        {
            current_week[i] = new Date(current_week[i].valueOf() + 604800000)
        }

        setSelectedDate(current_week[0]);
        parentCallback(selected_date);
        setSelectedMonth(months[selected_date.getMonth()]);
        setCurrentWeek(current_week.slice());
    }

    function decreaseCurrentWeek()
    {
        for(let i = 0; i <= 6; i++)
        {
            current_week[i] = new Date(current_week[i].valueOf() - 604800000)
        }

        setSelectedDate(current_week[0]);
        parentCallback(selected_date);
        setSelectedMonth(months[selected_date.getMonth()]);
        setCurrentWeek(current_week.slice());
    }

    function dayCardClicked(date)
    {
        setSelectedDate(date);
        parentCallback(selected_date);
        setSelectedMonth(months[selected_date.getMonth()]);
    }


    return (
        <div className="calendar">
            <div className="container">
                <h1>{months[selected_date.getMonth()]} {selected_date.getFullYear()}</h1>
                <div className="scroller-container">
                    <div className="left-arrow" onClick={decreaseCurrentWeek}>
                        <img src={"./images/arrow-left.svg"} alt="go back 1 week"/>
                    </div>
                    <DayCard day="MON" day_number={current_week[0].getDate()} background={areDatesEqual(current_week[0], selected_date) ? "#000000" : "#D8D8D8"} onClick={() => dayCardClicked(current_week[0])}></DayCard>
                    <DayCard day="TUE" day_number={current_week[1].getDate()} background={areDatesEqual(current_week[1], selected_date) ? "#000000" : "#D8D8D8"} onClick={() => dayCardClicked(current_week[1])}></DayCard>
                    <DayCard day="WED" day_number={current_week[2].getDate()} background={areDatesEqual(current_week[2], selected_date) ? "#000000" : "#D8D8D8"} onClick={() => dayCardClicked(current_week[2])}></DayCard>
                    <DayCard day="THU" day_number={current_week[3].getDate()} background={areDatesEqual(current_week[3], selected_date) ? "#000000" : "#D8D8D8"} onClick={() => dayCardClicked(current_week[3])}></DayCard>
                    <DayCard day="FRI" day_number={current_week[4].getDate()} background={areDatesEqual(current_week[4], selected_date) ? "#000000" : "#D8D8D8"} onClick={() => dayCardClicked(current_week[4])}></DayCard>
                    <DayCard day="SAT" day_number={current_week[5].getDate()} background={areDatesEqual(current_week[5], selected_date) ? "#000000" : "#D8D8D8"} onClick={() => dayCardClicked(current_week[5])}></DayCard>
                    <DayCard day="SUN" day_number={current_week[6].getDate()} background={areDatesEqual(current_week[6], selected_date) ? "#000000" : "#D8D8D8"} onClick={() => dayCardClicked(current_week[6])}></DayCard>
                    <div className="right-arrow" onClick={increaseCurrentWeek}>
                        <img src={"./images/arrow-right.svg"} alt="go back 1 week"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar
