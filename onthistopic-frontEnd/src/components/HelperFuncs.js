const HelperFunctions = {
  /**
   * This function is used in the timeline to calculate the time in terms of
   * 00:00:00 as used in the timeline
   */
  niceTime: function (time) {
    time = Math.trunc(time);
    var hours = Math.trunc(time / 3600);
    var mins = Math.trunc((time % 3600) / 60);
    var secs = Math.trunc(time % 60);
    var goodTym = "";
    if (hours > 0) goodTym += hours + ":";
    if (mins > 0) {
      if (mins < 10) {
        mins = "0" + mins;
      }
      goodTym += mins + ":";
    } else if (mins > 0 && hours > 0) goodTym += "00" + ":";
    else goodTym = "00:";
    if (secs > 0) {
      if (secs < 10) goodTym += "0";
      goodTym += secs;
    } else goodTym += "00";
    return goodTym;
  },
  /**
   * Converts time to the following format: 00:00:00
   * This function is helpful to the "toHrsMins function below"
   */
  niceTime2: function (time) {
    time = Math.trunc(time);
    var hours = Math.trunc(time / 3600);
    var mins = Math.trunc((time % 3600) / 60);
    var secs = Math.trunc(time % 60);
    var goodTym = "";
    goodTym += hours + ":";
    goodTym += mins + ":";

    if (secs > 0) {
      if (secs < 10) goodTym += "0";
      goodTym += secs;
    } else goodTym += "00";
    return goodTym;
  },
  /**
   * Converts time to hours and mins
   */
  toHrsMins: function (time) {
    if (!(time + "").includes(":")) {
      time = this.niceTime2(time);
    }
    if (time.split(":").length === 2) {
      time = "00:" + time;
    }
    let TimeArr = time.split(":");
    let hrs = Number(TimeArr[0]);
    let timeStr = "";
    if (hrs > 0) {
      timeStr += hrs + " hr";
      if (hrs > 1) timeStr += "s";
    }
    let mins = Number(TimeArr[1]);
    if (mins > 0) {
      timeStr += "" + mins + " min";

      if (hrs > 1) timeStr += "s";
    }
    return timeStr;
  },
};

module.exports = HelperFunctions;
