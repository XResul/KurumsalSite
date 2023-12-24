namespace KurumsalEntityLayer.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init_X : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Contacts",
                c => new
                    {
                        ContactID = c.Int(nullable: false, identity: true),
                        ContactTitle = c.String(maxLength: 150),
                        Phone = c.String(maxLength: 17),
                        Whatsapp = c.String(maxLength: 17),
                        Email = c.String(maxLength: 120),
                        Adres = c.String(),
                        Map = c.String(maxLength: 500),
                    })
                .PrimaryKey(t => t.ContactID);
            
            CreateTable(
                "dbo.Logos",
                c => new
                    {
                        LogoID = c.Int(nullable: false, identity: true),
                        LogoName = c.String(maxLength: 200),
                        ImageURL = c.String(maxLength: 255),
                    })
                .PrimaryKey(t => t.LogoID);
            
            CreateTable(
                "dbo.PageCategories",
                c => new
                    {
                        PageCategoryID = c.Int(nullable: false, identity: true),
                        PageCategoryname = c.String(nullable: false, maxLength: 255),
                        ImageURL = c.String(maxLength: 255),
                        MetaDescription = c.String(maxLength: 255),
                        MetaKey = c.String(maxLength: 255),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.PageCategoryID);
            
            CreateTable(
                "dbo.Pages",
                c => new
                    {
                        PageID = c.Int(nullable: false, identity: true),
                        PageTitle = c.String(maxLength: 255),
                        ImageURL = c.String(maxLength: 255),
                        ThumbURL = c.String(maxLength: 255),
                        MetaDescription = c.String(maxLength: 255),
                        MetaKey = c.String(maxLength: 255),
                        Description = c.String(),
                        PageDate = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        PageCategoryID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.PageID)
                .ForeignKey("dbo.PageCategories", t => t.PageCategoryID, cascadeDelete: true)
                .Index(t => t.PageCategoryID);
            
            CreateTable(
                "dbo.ProductCategories",
                c => new
                    {
                        ProductCategoryID = c.Int(nullable: false, identity: true),
                        ProductCategoryName = c.String(maxLength: 255),
                        ImageURL = c.String(maxLength: 255),
                        MetaDescription = c.String(maxLength: 255),
                        MetaKey = c.String(maxLength: 255),
                        IsActive = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.ProductCategoryID);
            
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        ProductID = c.Int(nullable: false, identity: true),
                        ProductName = c.String(maxLength: 200),
                        ImageURL = c.String(maxLength: 255),
                        ThumbURL = c.String(maxLength: 255),
                        MetaDescription = c.String(maxLength: 255),
                        MetaKey = c.String(maxLength: 255),
                        Description = c.String(),
                        ProductDate = c.DateTime(nullable: false),
                        IsActive = c.Boolean(nullable: false),
                        ProductCategoryID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProductID)
                .ForeignKey("dbo.ProductCategories", t => t.ProductCategoryID, cascadeDelete: true)
                .Index(t => t.ProductCategoryID);
            
            CreateTable(
                "dbo.ProductImages",
                c => new
                    {
                        ProductImageID = c.Int(nullable: false, identity: true),
                        ProductImageURL = c.String(maxLength: 255),
                        ProductImageThumbURL = c.String(maxLength: 255),
                        ProductID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProductImageID)
                .ForeignKey("dbo.Products", t => t.ProductID, cascadeDelete: true)
                .Index(t => t.ProductID);
            
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
                .PrimaryKey(t => t.ProjectID)
                .ForeignKey("dbo.ProjectCategories", t => t.ProjectCategory_ProjectID)
                .Index(t => t.ProjectCategory_ProjectID);
            
            CreateTable(
                "dbo.ProjectImages",
                c => new
                    {
                        EmlakImageID = c.Int(nullable: false, identity: true),
                        EmlakImageURL = c.String(maxLength: 255),
                        EmlakThumbURL = c.String(maxLength: 255),
                        ProjectID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.EmlakImageID)
                .ForeignKey("dbo.Projects", t => t.ProjectID, cascadeDelete: true)
                .Index(t => t.ProjectID);
            
            CreateTable(
                "dbo.Sliders",
                c => new
                    {
                        SliderID = c.Int(nullable: false, identity: true),
                        SliderTitle = c.String(maxLength: 120),
                        MetaDescription = c.String(maxLength: 255),
                        ImageURL = c.String(maxLength: 255),
                    })
                .PrimaryKey(t => t.SliderID);
            
            CreateTable(
                "dbo.Socials",
                c => new
                    {
                        SocialID = c.Int(nullable: false, identity: true),
                        Youtube = c.String(maxLength: 255),
                        Instagram = c.String(maxLength: 255),
                        Linkedin = c.String(maxLength: 255),
                        Facebook = c.String(maxLength: 255),
                        Twitter = c.String(maxLength: 255),
                    })
                .PrimaryKey(t => t.SocialID);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserID = c.Int(nullable: false, identity: true),
                        UserName = c.String(maxLength: 50),
                        UserPassword = c.String(maxLength: 50),
                        Email = c.String(maxLength: 80),
                        Roles = c.String(maxLength: 1),
                    })
                .PrimaryKey(t => t.UserID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProjectImages", "ProjectID", "dbo.Projects");
            DropForeignKey("dbo.Projects", "ProjectCategory_ProjectID", "dbo.ProjectCategories");
            DropForeignKey("dbo.ProductImages", "ProductID", "dbo.Products");
            DropForeignKey("dbo.Products", "ProductCategoryID", "dbo.ProductCategories");
            DropForeignKey("dbo.Pages", "PageCategoryID", "dbo.PageCategories");
            DropIndex("dbo.ProjectImages", new[] { "ProjectID" });
            DropIndex("dbo.Projects", new[] { "ProjectCategory_ProjectID" });
            DropIndex("dbo.ProductImages", new[] { "ProductID" });
            DropIndex("dbo.Products", new[] { "ProductCategoryID" });
            DropIndex("dbo.Pages", new[] { "PageCategoryID" });
            DropTable("dbo.Users");
            DropTable("dbo.Socials");
            DropTable("dbo.Sliders");
            DropTable("dbo.ProjectImages");
            DropTable("dbo.Projects");
            DropTable("dbo.ProjectCategories");
            DropTable("dbo.ProductImages");
            DropTable("dbo.Products");
            DropTable("dbo.ProductCategories");
            DropTable("dbo.Pages");
            DropTable("dbo.PageCategories");
            DropTable("dbo.Logos");
            DropTable("dbo.Contacts");
        }
    }
}
