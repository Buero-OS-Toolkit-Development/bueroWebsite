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
    let aT_ = actTime.split(":");
    let cT_ = timeToCheck.split(":");
    if (Number(aT_[0]) < Number(cT_[0])) {
        aT_[0] = (Number(aT_[0]) + 24).toString()
    }
    let m1 = Number(aT_[0]) * 60 + Number(aT_[1])
    let m2 = Number(cT_[0]) * 60 + Number(cT_[1])
    return abs(m2 - m1)
}
function abs(int) {
    if (int < 0) {
        int = 0 - int;
    }
    return int;
}