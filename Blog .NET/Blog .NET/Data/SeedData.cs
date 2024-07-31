using Blog_.NET.Models;
using Microsoft.EntityFrameworkCore;

namespace Blog_.NET.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new BlogContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<BlogContext>>()))
            {
                // Look for any post.
                if (context.Posts.Any())
                {
                    return;   // DB has been seeded
                }
                context.Posts.AddRange(
                    new Post
                    {
                        Id = 1,
                        Title = "Bài viết 1",
                        Description = "Mô tả bài viết 1",
                        Content = "Nội dung bài viết 1",
                        Image = "/uploads/ProfilePicturePhoto.png",
                        Position = ["Việt Nam"],
                        Category = "Du lịch",
                        IsPublic = true,
                        PublishDate = DateTime.Now.Date
                    },
                    new Post
                    {
                        Id = 2,
                        Title = "Bài viết 2",
                        Description = "Mô tả bài viết 2",
                        Content = "Nội dung bài viết 2",
                        Image = "/uploads/avt_meow.jpg",
                        Position = ["Trung Quốc"],
                        Category = "Ẩm thực",
                        IsPublic = true,
                        PublishDate = DateTime.Now.Date
                    },
                    new Post
                    {
                        Id = 3,
                        Title = "Bài viết 3",
                        Description = "Mô tả bài viết 3",
                        Content = "Nội dung bài viết 3",
                        Image = "/uploads/avt_sky.png",
                        Position = ["Châu Á"],
                        Category = "Giải trí",
                        IsPublic = true,
                        PublishDate = DateTime.Now.Date
                    },
                    new Post
                    {
                        Id = 4,
                        Title = "Bài viết 4",
                        Description = "Mô tả bài viết 4",
                        Content = "Nội dung bài viết 4",
                        Image = "/uploads/ProfilePicturePhoto.png",
                        Position = ["Châu Mỹ"],
                        Category = "Du lịch",
                        IsPublic = true,
                        PublishDate = DateTime.Now.Date
                    },
                    new Post
                    {
                        Id = 5,
                        Title = "Bài viết 5",
                        Description = "Mô tả bài viết 5",
                        Content = "Nội dung bài viết 5",
                        Image = "/uploads/avt_meow.jpg",
                        Position = ["Châu Âu"],
                        Category = "Ẩm thực",
                        IsPublic = true,
                        PublishDate = DateTime.Now.Date
                    },
                    new Post
                    {
                        Id = 6,
                        Title = "Bài viết 6",
                        Description = "Mô tả bài viết 6",
                        Content = "Nội dung bài viết 6",
                        Image = "/uploads/avt_sky.png",
                        Position = ["Việt Nam", "Châu Á"],
                        Category = "Giải trí",
                        IsPublic = true,
                        PublishDate = DateTime.Now.Date
                    },
                    new Post
                    {
                        Id = 7,
                        Title = "Bài viết 7",
                        Description = "Mô tả bài viết 7",
                        Content = "Nội dung bài viết 7",
                        Image = "/uploads/ProfilePicturePhoto.png",
                        Position = ["Trung Quốc", "Châu Mỹ"],
                        Category = "Du lịch",
                        IsPublic = true,
                        PublishDate = DateTime.Now.Date
                    },
                    new Post
                    {
                        Id = 8,
                        Title = "Bài viết 8",
                        Description = "Mô tả bài viết 8",
                        Content = "Nội dung bài viết 8",
                        Image = "/uploads/avt_meow.jpg",
                        Position = ["Châu Á", "Châu Âu"],
                        Category = "Ẩm thực",
                        IsPublic = true,
                        PublishDate = DateTime.Now.Date
                    },
                    new Post
                    {
                        Id = 9,
                        Title = "Bài viết 9",
                        Description = "Mô tả bài viết 9",
                        Content = "Nội dung bài viết 9",
                        Image = "/uploads/avt_sky.png",
                        Position = ["Việt Nam", "Trung Quốc"],
                        Category = "Giải trí",
                        IsPublic = true,
                        PublishDate = DateTime.Now.Date
                    },
                    new Post
                    {
                        Id = 10,
                        Title = "Bài viết 10",
                        Description = "Mô tả bài viết 10",
                        Content = "Nội dung bài viết 10",
                        Image = "/uploads/ProfilePicturePhoto.png",
                        Position = ["Châu Á", "Châu Mỹ"],
                        Category = "Du lịch",
                        IsPublic = true,
                        PublishDate = DateTime.Now.Date
                    }
                );

                context.SaveChanges();
            }
        }
    }

}
