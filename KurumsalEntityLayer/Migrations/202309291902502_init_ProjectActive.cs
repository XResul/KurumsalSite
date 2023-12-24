namespace KurumsalEntityLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init_ProjectActive : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Projects", "IsActive", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Projects", "IsActive", c => c.String());
        }
    }
}
