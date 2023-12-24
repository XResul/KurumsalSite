namespace KurumsalEntityLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _initL : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Projects", "ProjectCategory_ProjectID", "dbo.ProjectCategories");
            DropForeignKey("dbo.ProjectImages", "ProjectID", "dbo.Projects");
            DropIndex("dbo.Projects", new[] { "ProjectCategory_ProjectID" });
            DropIndex("dbo.ProjectImages", new[] { "ProjectID" });
            DropTable("dbo.ProjectCategories");
            DropTable("dbo.Projects");
            DropTable("dbo.ProjectImages");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.ProjectImages",
                c => new
                    {
                        EmlakImageID = c.Int(nullable: false, identity: true),
                        EmlakImageURL = c.String(maxLength: 255),
                        EmlakThumbURL = c.String(maxLength: 255),
                        ProjectID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.EmlakImageID);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        ProjectID = c.Int(nullable: false, identity: true),
                        ProjectTitle = c.String(maxLength: 255),
                        ImageURL = c.String(maxLength: 255),
                        ThumbURL = c.String(maxLength: 255),
                        MetaDescription = c.String(maxLength: 255),
                        MetaKey = c.String(maxLength: 255),
                        Description = c.String(),
                        PageDate = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        ProjectCategoryID = c.Int(nullable: false),
                        ProjectCategory_ProjectID = c.Int(),
                    })
                .PrimaryKey(t => t.ProjectID);
            
            CreateTable(
                "dbo.ProjectCategories",
                c => new
                    {
                        ProjectID = c.Int(nullable: false, identity: true),
                        ProjectName = c.String(maxLength: 200),
                        ImageURl = c.String(maxLength: 255),
                        MetaDescription = c.String(maxLength: 255),
                        MetaKey = c.String(maxLength: 255),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectID);
            
            CreateIndex("dbo.ProjectImages", "ProjectID");
            CreateIndex("dbo.Projects", "ProjectCategory_ProjectID");
            AddForeignKey("dbo.ProjectImages", "ProjectID", "dbo.Projects", "ProjectID", cascadeDelete: true);
            AddForeignKey("dbo.Projects", "ProjectCategory_ProjectID", "dbo.ProjectCategories", "ProjectID");
        }
    }
}
