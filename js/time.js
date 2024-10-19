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