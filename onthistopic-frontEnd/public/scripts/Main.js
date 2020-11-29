"document".ready(function () {
  "#volumeBar".on("click", function (e) {
    var audioelement = document.getElementsByClassName("audioHere")[0];

    // // console.log(e.offsetY);
    // let bar = document.getElementById("volumeBar");
    // console.log("here");
    // let maxHeight = bar.height.animVal.value;
    // let h = maxHeight - e.offsetY;
    // let level = h / maxHeight;
    // audioelement.volume = level;
    // console.log(level);
  });
});
