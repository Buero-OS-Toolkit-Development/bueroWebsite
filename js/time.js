/*
    Utils for calculating time.
*/
function getTimeString(onlyDate = false) {
    let timeO = new Date();
    let timeStr = "";
    let timeStrList = timeO.toString().split(" ");
    timeStr += timeStrList[2] + ".";
    let monthInt = timeO.getMonth() + 1;
    timeStr += monthInt.toString() + "." + timeStrList[3]
    if (onlyDate == false) {
        timeStr += ", " + timeStrList[4];
    }
    return timeStr;
}
function getTimeDiff(actTime, timeToCheck) {
    let aT = actTime.split(", ");
    let cT = timeToCheck.split(", ");
    let aT_ = aT[1].split(":");
    let cT_ = cT[1].split(":");
    let aT__ = aT[0].split(".");
    let cT__ = cT[0].split(".");
    let days = [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let m1 = Number(aT__[0]) - 1 + (Number(aT__[2])-1) * 365;
    for (let i = 0; i < days.length; i++) {
        if (i + 1 < Number(aT__[1])) {
            m1 += days[i];
        }
    }
    let m2 = (Number(cT__[2]) - 1) * 365 + Number(cT__[0]) - 1;
    for (let i = 0; i < days.length; i++) {
        if (i + 1 < Number(cT__[1])) {
            m2 += days[i];
        }
    }
    m1 *= 24 * 60;
    m2 *= 24 * 60;
    m1 += Number(aT_[0]) * 60 + Number(aT_[1]);
    m2 += Number(cT_[0]) * 60 + Number(cT_[1]);
    return abs(m2 - m1);
}
function abs(int) {
    if (int < 0) {
        int = 0 - int;
    }
    return int;
}

function getTimeDiffString(time, format = false) {
    if (format == true) {
        let tD = getTimeDiff(getTimeString(), time);
        if (tD == 0) {
            return "jetzt";
        } else if (tD < 60) {
            if (tD == 1) {
                return "vor einer Minute";
            } else {
                return "vor " + tD.toString() + " Minuten";
            }
        } else if (tD < 60 * 24) {
            let hrs = 0;
            while (tD >= 60) {
                hrs += 1;
                tD -= 60;
            }
            if (hrs == 1) {
                return "vor einer Stunde";
            } else {
                return "vor " + hrs.toString() + " Stunden";
            }
        } else if (tD < 60 * 24 * 7) {
            let days = 0;
            while (tD >= 60 * 24) {
                days += 1;
                tD -= 60 * 24;
            }
            if (days == 1) {
                return "vor einem Tag";
            } else {
                return "vor " + days.toString() + " Tagen";
            }
        } else if (tD < 60 * 24 * 7 * 4) {
            let weeks = 0;
            while (tD >= 60 * 24 * 7) {
                weeks += 1;
                tD -= 60 * 24 * 7;
            }
            if (weeks == 1) {
                return "vor einer Woche";
            } else {
                return "vor " + weeks.toString() + " Wochen"
            }
        } else if (tD < 60 * 24 * 7 * 52) {
            let months = 0;
            while (tD >= 60 * 24 * 7 * 4) {
                months += 1;
                tD -= 60 * 24 * 7 * 4;
            }
            if (months = 1) {
                return "vor einem Monat";
            } else {
                return "vor " + months.toString() + " Monaten";
            }
        } else {
            let years = 0;
            while (tD >= 60 * 24 * 7 * 52) {
                years += 1;
                tD -= 60 * 24 * 7 * 52;
            }
            if (years == 1) {
                return "vor einem Jahr";
            } else {
                return "vor " + years.toString() + " Jahren";
            }
        }
    } else {
        return "am " + time.replace(", ", " um ") + " Uhr";
    }
}