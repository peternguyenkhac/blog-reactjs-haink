using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Blog_.NET.Data;
using Blog_.NET.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Blog_.NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly BlogContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;


        public PostsController(BlogContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts(string searchString = "")
        {
            var query = _context.Posts.AsQueryable();
            if (!String.IsNullOrEmpty(searchString))
            {
                query = query.Where(p => p.Title.Contains(searchString));
            }
            return await query.ToListAsync();
        }

        // GET: api/Posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // PUT: api/Posts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id,[FromForm]Post post, [FromForm]IFormFile? imageUpload)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }

            if (id != post.Id)
            {
                return BadRequest();
            }

            if (imageUpload != null)
            {
                post.Image = SaveImage(imageUpload);
            }

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Post>> Post([FromForm]Post post, [FromForm]IFormFile? imageUpload)
        {
            if (!ModelState.IsValid)
            {
                return UnprocessableEntity(ModelState);
            }

            if (imageUpload != null)
            {
                post.Image = SaveImage(imageUpload);
            }

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPost", new { id = post.Id }, post);
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            var categories = new List<Dictionary<string, string>>
            {
                new Dictionary<string, string> { { "Value", "Du lịch" }, { "Text", "Du lịch" } },
                new Dictionary<string, string> { { "Value", "Ẩm thực" }, { "Text", "Ẩm thực" } },
                new Dictionary<string, string> { { "Value", "Giải trí" }, { "Text", "Giải trí" } }
            };

            return Ok(categories);
        }

        [HttpGet("positions")]
        public IActionResult GetPositions()
        {
            var positions = new List<string> { "Việt Nam", "Trung Quốc", "Châu Á", "Châu Âu", "Châu Mỹ" };
            return Ok(positions);
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.Id == id);
        }

        private string SaveImage(IFormFile imageUpload)
        {
            string urlImage = "";

            var uploadDirecotroy = "uploads/";
            var uploadPath = Path.Combine(_webHostEnvironment.WebRootPath, uploadDirecotroy);
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }
            var fileName = DateTime.Now.ToString("yyyy-MM-dd-HH-mm-ss") + imageUpload.FileName;
            var filePath = Path.Combine(uploadPath, fileName);
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                imageUpload.CopyTo(fileStream);
            }

            urlImage = "/" + uploadDirecotroy + fileName;

            return urlImage;
        }
    }
}
