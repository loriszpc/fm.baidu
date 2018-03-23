function initConfig(){
    var config={
        song: {},
        bg: {},
        audioEle: $("#myAudio")[0],
        audioPlayInterval: null,
        pre: {
            obj: $(".pre"),
            img: null,
            songName: null,
            singer: null
        },
        current: {
            obj: $(".content_left"),
            img: null,
            songName: null,
            singer: null
        },
        currentMusicIndex: 0
    };

    function updateConfig(key,value){
        if(!(key===null && value===null)){
            config[key]=value;
        }
        return config;
    }

    return updateConfig;
}


//初始化页面数据
(function () {
    //1，为全局变量进行赋值
    $.ajax({
        url: 'js/config.json',
        type: 'get',
        dataType: 'json',
        success: function (data) {
            var temp=initConfig();
            temp("song",data.song);
            temp("bg",data.bg);
            console.log(JSON.stringify(initConfig()().song));
            debugger;
            audioControl(temp().song[temp().currentMusicIndex]);
        },
        error: function () {
            console.log("发生错误，请检查代码！");
        }
    });


})();

//音乐控制代码，
function audioControl() {
    var temp=initConfig();

    if (temp().currentMusicIndex == 0) {
        //播放第一首，将前一首隐藏
        temp().pre.obj.hide();
    } else {

        temp().pre.obj.find("img").attr("src", temp().song[temp().currentMusicIndex - 1].cover);
        temp().pre.obj.find("p").eq(0).html(temp().song[temp().currentMusicIndex - 1].name);
        temp().pre.obj.find("p").eq(1).html(temp().song[temp().currentMusicIndex - 1].author);
        temp().pre.obj.show();
    }


    alert(JSON.stringify(temp().song));
    debugger;

    //更改当前播放音乐的背景图片，歌名，歌手等信息
    temp.config.current.obj.find("img").attr("src", temp.config.song[temp.config.currentMusicIndex].cover);
    temp.config.current.obj.find("h3").html(temp.config.song[temp.config.currentMusicIndex].name);
    temp.config.current.obj.find(".album a").html(null);
    temp.config.current.obj.find(".singer a").html(temp.config.song[temp.config.currentMusicIndex].author);
    temp.config.audioEle.src = temp.config.song[temp.config.currentMusicIndex].src;

}


//
//更换背景
$(".pic_list li").each(function (index, obj) {
    $(obj).bind("click", function () {
        changeBg(index);
        //获取当前图片的文字描述
        var desc = initConfig().config.bg[index].desc;
        $(this).parent().parent().siblings().find("span").html(desc);
    });
});
//
//
// function changeBg(index) {
//     var src = configMap.bg[index].src;
//     var css = $(".container").attr("class");
//     var bgNum = index + 1;
//     $(".container").removeClass(css).addClass("container " + "bg" + bgNum);
// }
//
//
// $(".header_corner li").hover(function () {
//     $(this).find("div[class^='drop']").stop().fadeIn();
// }, function () {
//     $(this).find("div[class^='drop']").stop().fadeOut();
// });
//
//
// //鼠标滑轮控制音乐播放于音量
// $("div .time").hover(function () {
//     $(this).find(".volume_control").fadeIn();
//     //1,初始化当前音量键
//     var currentVolume = $("#myAudio")[0].volume;
//     changeVolumeLine(currentVolume);
//     //2, 为音量大小键添加鼠标滑轮滚动事件
//     $(this).bind("mousewheel", function (event, delta) {
//
//         var dir = delta > 0 ? 'Up' : 'Down';
//         if (dir == 'Up') {
//
//             if (currentVolume == 1) {
//                 //最大音量,不能继续改变
//             } else {
//                 currentVolume += 0.1;
//                 changeVolumeLine(currentVolume);
//                 $("#myAudio")[0].volume = currentVolume;
//             }
//         } else {
//
//             if (currentVolume == 0) {
//                 //最小音量不能继续改变
//             } else {
//                 if (currentVolume - 0.1 > 0) {
//                     currentVolume -= 0.1;
//                     changeVolumeLine(currentVolume);
//                     $("#myAudio")[0].volume = currentVolume;
//                 }
//             }
//         }
//     });
// }, function () {
//     $(this).find(".volume_control").fadeOut();
// });
//
//
// Number.prototype.toPercent = function () {
//     return (Math.round(this * 10000) / 100).toFixed(2) + '%';
// };
//
// function changeVolumeLine(volume) {
//     $(".volume_line").css("width", volume.toPercent());
// }
//
// //音乐进度
// configMap.audioEle.addEventListener("loadeddata",
//     function () {
//         window.clearInterval(configMap.audioPlayInterval);
//         var totalTime = configMap.audioEle.duration;
//         $(".totalTime").html(calcTime(totalTime));
//         configMap.audioPlayInterval = setInterval(function () {
//             var currentTime = configMap.audioEle.currentTime;
//             //改变音乐播放进度条
//             var progress = currentTime / totalTime;
//             $(".progress .line").css("width", progress.toPercent());
//             //改变当前播放时长
//             $(".curTime").html(calcTime(currentTime));
//
//         }, 1000);
//     }, false);
//
// function calcTime(time) {
//
//     var min = Math.floor(time / 60);
//     var minStr = null;
//     minStr = min >= 10 ? min : "0" + min;
//     var sec = Math.round(time - 60 * min);
//     var secStr = null;
//     secStr = sec >= 10 ? sec : "0" + sec;
//     var totalTimeStr = minStr + ":" + secStr;
//     return totalTimeStr;
// }
//
// //音乐播放/暂停按钮事件,需要同时更改按钮状态
//
// $(".control_top .btn li a:eq(0)").bind("click", function () {
//     if (configMap.audioEle.paused) {
//         configMap.audioEle.play();
//         $(this).attr("style", "background-position : -444px 0px;");
//         $(this).hover(function () {
//             $(this).attr("style", "background-position : -492px 0px;");
//         }, function () {
//             $(this).attr("style", "background-position : -444px 0px;");
//         });
//     } else {
//         configMap.audioEle.pause();
//         $(this).attr("style", "background-position : -325px 0px;");
//         $(this).hover(function () {
//             $(this).attr("style", "background-position : -348px 0px;");
//         }, function () {
//             $(this).attr("style", "background-position : -325px 0px;");
//         });
//     }
// });
//
// $(".control_top .btn li a:eq(1)").click(function () {
//     if (configMap.currentMusicIndex + 1 == configMap.song.length) {
//         //已经是最后一首音乐，此时切回到第一首
//         configMap.currentMusicIndex = 0;
//     } else {
//         configMap.currentMusicIndex += 1;
//     }
//     //将播放按钮初始化
//     var musicPlayEle = $(".control_top .btn li a:eq(0)");
//     musicPlayEle.attr("style", "background-position : -444px 0px;");
//     musicPlayEle.hover(function () {
//         $(this).attr("style", "background-position : -492px 0px;");
//     }, function () {
//         $(this).attr("style", "background-position : -444px 0px;");
//     });
//
//     audioControl(configMap.currentMusicIndex);
// });
//
// configMap.audioEle.addEventListener('ended', function () {
//     configMap.currentMusicIndex += 1;
//     audioControl();
// });
//
//
// //点击重听上一首
//
// $(".pre_content").click(function () {
//     configMap.currentMusicIndex -= 1;
//     audioControl();
// });
