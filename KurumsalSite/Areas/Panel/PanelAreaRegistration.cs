using System.Web.Mvc;

namespace KurumsalSite.Areas.Panel
{
    public class PanelAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Panel";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Panel_default",
                "Panel/{controller}/{action}/{id}",
                new {Controller="Home", action = "Index", id = UrlParameter.Optional }, namespaces: new[] {typeof(KurumsalSite.Areas.Panel.Controllers.HomeController).Namespace}
            );
        }
    }
}