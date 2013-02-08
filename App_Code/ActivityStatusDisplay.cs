using System;
using System.Collections.Generic;
using System.Web;

/// <summary>
/// Summary description for ClassName
/// </summary>
public static class ActivityStatusDisplay
{
    public static string Convert(int status)
    {
        string displayStatus="";
        
        if (status == 1) {
			displayStatus = "Running";
        } else if (status == 2) {
			displayStatus = "Disabled";
        } else if (status == 3) {
			displayStatus = "Stopping";
        } else if (status == 4) {
			displayStatus = "Timed Out";
		}

        return displayStatus;
    }
}
