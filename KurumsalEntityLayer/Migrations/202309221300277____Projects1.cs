namespace KurumsalEntityLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ___Projects1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ProjectCategories",
                c => new
                    {
                        ProjectCategoryID = c.Int(nullable: false, identity: true),
                        ProjectCategoryName = c.String(maxLength: 200),
                        ImageURL = c.String(maxLength: 255),
                        MetaDescription = c.String(maxLength: 255),
                        MetaKey = c.String(maxLength: 255),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectCategoryID);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        ProjectID = c.Int(nullable: false, identity: true),
                        ProjectName = c.String(maxLength: 200),
                        ImageURL = c.String(maxLength: 255),
                        ThumbURL = c.String(maxLength: 255),
                        MetaDecription = c.String(maxLength: 255),
                        MetaKey = c.String(maxLength: 255),
                        Description = c.String(),
                        IsActive = c.String(),
                        ProjectCategoryID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectID)
                .ForeignKey("dbo.ProjectCategories", t => t.ProjectCategoryID, cascadeDelete: true)
                .Index(t => t.ProjectCategoryID);
            
            CreateTable(
                "dbo.ProjectImages",
                c => new
                    {
                        ProjectImageID = c.Int(nullable: false, identity: true),
                        ProjectImageUrl = c.String(maxLength: 255),
                        ProjectThumbURL = c.String(maxLength: 255),
                        ProjectID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectImageID)
                .ForeignKey("dbo.Projects", t => t.ProjectID, cascadeDelete: true)
                .Index(t => t.ProjectID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProjectImages", "ProjectID", "dbo.Projects");
            DropForeignKey("dbo.Projects", "ProjectCategoryID", "dbo.ProjectCategories");
            DropIndex("dbo.ProjectImages", new[] { "ProjectID" });
            DropIndex("dbo.Projects", new[] { "ProjectCategoryID" });
            DropTable("dbo.ProjectImages");
            DropTable("dbo.Projects");
            DropTable("dbo.ProjectCategories");
        }
    }
}
