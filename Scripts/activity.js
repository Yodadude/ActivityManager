
$(function () {

    $("table.list tbody tr")
        .hover(
            function () {
                $(this).addClass("highlight");
            }
            ,
            function () {
                $(this).removeClass("highlight");
            })
        .bind("click",
            function () {
                $("tr.select").removeClass("select");
                $(this).addClass("select");
            }
        );

    $("#process").click(function () {
        var activityInfo = getActivityStatus();
        if (activityInfo.status != "") {
            alert("Process not allowed as activity in incorrect state.");
            return;
        }
        $.post('ActivityAction.cshtml', {
            activity: activityInfo.activity,
            action: 'process'
        }, function (data) {
            if (data.status == "error") {
                alert(data.message);
                return;
            }
            //showActivitySchedule()
        });
    });


    $("#reset").click(function () {
        var activityInfo = getActivityStatus();
        if (activityInfo.status == "") {
            alert("Reset not allowed.");
            return;
        }
        $.post('ActivityAction.cshtml', {
            activity: activityInfo.activity,
            action: 'reset'
        }, function (data) {
            if (data.status == "error") {
                alert(data.message);
                return;
            }
            $("table.list tr.select td:last-child()").text("");
        });
    });


    $("#stop").click(function () {
        var activityInfo = getActivityStatus();
        if (activityInfo.status != "Running") {
            alert("Stop not allowed as activity is not running.");
            return;
        }
        $.post('ActivityAction.cshtml', {
            activity: activityInfo.activity,
            action: 'stop'
        }, function (text) {
        });
    });


    $("#disable").click(disableActivity);

});

function disableActivity() {

    var activityInfo = getActivityStatus();

    if (activityInfo.status != "") {
        alert("Disable not allowed as activity is not in required state.");
        return;
    }

    $.post('ActivityAction.cshtml', {
        activity: activityInfo.activity,
        action: 'disable'
    }, function (text) {
        alert(activityInfo.activity + " has been disabled.");
        //$("table#list tr td:contains(" + activityInfo.activity + ")").next("td").text("Disabled")
        $("table.list tr.select td:last-child()").text("Disabled");
    });

}


function getActivityStatus() {
    
    var s_activity = $("table.list tr.select td:nth-child(2)").text();
    var s_status = $("table.list tr.select td:nth-child(3)").text();

    return { activity: s_activity, status: s_status };
}