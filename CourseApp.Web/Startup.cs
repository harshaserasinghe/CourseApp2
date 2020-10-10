using AutoMapper;
using CourseApp.Core.Entities;
using CourseApp.Data;
using CourseApp.Data.Interfaces;
using CourseApp.Data.Repositories;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;

namespace CourseApp.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddCors(options =>
            //{
            //    options.AddPolicy("EnableCORS", builder =>
            //    {
            //        builder.AllowAnyOrigin()
            //           .AllowAnyHeader()
            //           .AllowAnyMethod();
            //    });
            //});

            services.AddAutoMapper(Assembly.Load("CourseApp.Core"));

            services.AddControllersWithViews().AddFluentValidation(opt =>
            {
                opt.RegisterValidatorsFromAssembly(Assembly.Load("CourseApp.Core"));
            });

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddDbContext<CourseDbContext>(opt =>
            {
                opt.UseSqlServer(Configuration.GetConnectionString("CourseDb"));
            });

            //services.AddIdentity<User, IdentityRole>(opt =>
            //{
            //    opt.Password.RequiredLength = 8;
            //}).AddEntityFrameworkStores<CourseDbContext>();

            //services.AddAuthentication(opt =>
            //{
            //    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //}).AddJwtBearer(opt2 =>
            //{
            //    opt2.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateLifetime = true,
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("secretKey")))
            //    };
            //});

            services.AddScoped<ICourseRepository, CourseRepository>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseExceptionHandler("/error-development");
            }
            else
            {
                app.UseExceptionHandler("/error-production");
                app.UseHsts();
            }

            //app.UseCors("EnableCORS");
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            //app.UseAuthentication();
            //app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
