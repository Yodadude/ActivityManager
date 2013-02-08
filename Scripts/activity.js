
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
        var activity = getActivityStatus();
        if (activity.status != "") {
            alert("Process not allowed as activity in incorrect state.");
            return;
        }
        $.post('ActivityAction.cshtml', {
            activity: activity.activity,
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
        var activity = getActivityStatus();
        if (activity.status != "") {
            alert("Reset not allowed.");
            return;
        }
        $.post('ActivityAction.cshtml', {
            activity: activity.activity,
            action: 'reset'
        }, function (data) {
            if (data.status == "error") {
                alert(data.message);
                return;
            }
            $("table.list tr.select td:last-child()").text("");
        });
    });

    /*
    $("#stop").click(function () {
    var s_status = $("table#actlist tr td:contains(" + s_activity + ")").next("td").html();
    if (s_status != "Running") {
    alert("Stop not allowed as activity is not running.");
    return;
    }
    $.post('activity_action.asp', {
    activity: s_activity,
    action: 'stop'
    }, function (text) { });
    });

    $("#disable").click(function () {
    $.post('activity_action.asp', {
    activity: s_activity,
    action: 'disable'
    }, function (text) {
    $("table#actlist tr td:contains(" + s_activity + ")").next("td").html("Disabled")
    });
    });
    */
});

function getActivityStatus() {
    
    var s_activity = $("table.list tr.select td:nth-child(2)").text();
    var s_status = $("table.list tr.select td:nth-child(3)").text();

    return { activity: s_activity, status: s_status };
}