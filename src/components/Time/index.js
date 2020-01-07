import React, {Component} from 'react';

export const startTime = '2018-12-16 13:14:02'

class Index extends Component {
    state = {
        time: ''
    }
    render() {
        const {time} = this.state
        return (
            <div>
                {time}
            </div>
        );
    }
    componentDidMount() {
        this.init()
    }

    init () {
        
        function getMonthLeftDay (year, month, day) {
            const monthes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            if (year % 4 === 0) {
                monthes[1] = 29
            }
            if (!day) {
                return monthes[month]
            }
            return monthes[month] - day
        }
        
        const origin = new Date(startTime)
        const originYear = origin.getFullYear()
        const originMonth = origin.getMonth()
        const originDay = origin.getDate()
        const originHour = origin.getHours()
        const originMinute = origin.getMinutes()
        const originSecond = origin.getSeconds()

        const today = new Date()
        const todayYear = today.getFullYear()
        const todayMonth = today.getMonth()
        const todayDay = today.getDate()
        const todayHour = today.getHours()
        const todayMinute = today.getMinutes()
        const todaySecond = today.getSeconds()
        console.log(todaySecond)
        let secondDifference = 0
        let minuteDifference = 0
        let hourDifference = 0
        let dayDifference = 0
        let monthDifference = 0
        let yearDifference = 0

        let second = todaySecond - originSecond + 60
        if (second < 60) {
            secondDifference = -1
        }
        second %= 60

        let minute = todayMinute - originMinute + 60 + secondDifference
        if (minute < 60) {
            minuteDifference = -1
        }
        minute %= 60

        let hour = todayHour - originHour + 24 + minuteDifference
        if (hour < 24) {
            hourDifference = -1
        }
        hour %= 24

        let leftDay = getMonthLeftDay(originYear, originMonth)
        let day = todayDay - originDay + leftDay  + hourDifference
        if (day < leftDay) {
            dayDifference = -1
        }
        day %= leftDay

        let month = todayMonth - originMonth + 12 + dayDifference
        if (month < 12) {
            monthDifference = -1
        }
        month %= 12

        let year = todayYear - originYear + monthDifference
        let time = ''
        if (year) {
            time += `${year}年`
        }
        if (month) {
            time += `${month}月`
        }
        if (day) {
            time += `${day}日`
        }
        if (hour) {
            time += `${hour}小时`
        }
        if (minute) {
            time += `${minute}分`
        }
        if (second) {
            time += `${second}秒`
        }
        this.setState({
            time
        })
        setTimeout(() => {
            this.init()
        }, 1000)
    }
}

export default Index;