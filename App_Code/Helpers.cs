using System;
using System.Text;

/// <summary>
/// Summary description for Helpers
/// </summary>
public static class Helpers
{
    public static string ConnectionLinks()
    {
        var html = new StringBuilder();

        for (int i = 0; i < System.Configuration.ConfigurationManager.ConnectionStrings.Count; i++)
        {
            html.Append(@"<li><a target='_self' href='#'>");
        	html.Append(@System.Configuration.ConfigurationManager.ConnectionStrings[i].Name);
            html.Append(@"</a></li>");
        }

        return html.ToString();
    }
}
