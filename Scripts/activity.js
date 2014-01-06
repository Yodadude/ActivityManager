
$(function () {

    $("#activity-tabs a:first").tab("show");

    //$('ul#activity-tabs a[data-toggle="tab"]').on('shown', function (e) {
    //    e.target // activated tab
    //    e.relatedTarget // previous tab
    //    // alert(e.target);
    //});

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
                activitySelected();
            }
        );

    $("#process").click(processActivity);
    $("#reset").click(resetActivity);
    $("#stop").click(stopActivity);
    $("#disable").click(disableActivity);
    $("#connection-list a").click(changeConnection);
});

function changeConnection() {
    var conn = $(this).text();
    var days = 2;
    var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));

	document.cookie = 'conn=' + conn + '; expires=' + date.toGMTString() + '; path=/';
    document.location.reload();
}

function activitySelected() {
   var activityInfo = getActivityInfo();
   $("#activity-tabs a:first").tab("show");
}


function processActivity() {

    var activityInfo = getActivityInfo();
    
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
}

function stopActivity() {

    var activityInfo = getActivityInfo();

    if (activityInfo.status != "Running") {
        alert("Stop not allowed as activity is not running.");
        return;
    }
    
    $.post('ActivityAction.cshtml', {
        activity: activityInfo.activity,
        action: 'stop'
    }, function (text) {
    });

}

function resetActivity() {

    var activityInfo = getActivityInfo();
    
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

}

function disableActivity() {

    var activityInfo = getActivityInfo();

    if (activityInfo.status != "") {
        alert("Disable not allowed as activity is not in required state.");
        return;
    }

    $.post('ActivityAction.cshtml', {
        activity: activityInfo.activity,
        action: 'disable'
    }, function (text) {
        $("table.list tr.select td:last-child").text("Disabled");
    });

}

function getActivityInfo() {
    
    var s_activity = $("table.list tr.select td:nth-child(2)").text();
    var s_status = $("table.list tr.select td:nth-child(3)").text();

    return { activity: s_activity, status: s_status };
}
