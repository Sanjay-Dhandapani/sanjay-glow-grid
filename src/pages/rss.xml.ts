import rss from '@astrojs/rss';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  return rss({
    title: 'Sanjay D - Full Stack Developer',
    description: 'Latest updates from Sanjay D\'s portfolio - projects, achievements, and web development insights',
    site: context.site!,
    items: [
      {
        title: 'Premium Portfolio Website Launch',
        link: '/projects',
        description: 'Launched a custom portfolio website featuring advanced animations, responsive design, and optimized performance following WCAG guidelines.',
        pubDate: new Date('2024-01-15'),
        categories: ['Web Development', 'Portfolio', 'Frontend'],
      },
      {
        title: 'Smart Expense Management System',
        link: '/projects',
        description: 'Created a user-friendly expense tracking application with intelligent categorization and visual analytics for better financial decision-making.',
        pubDate: new Date('2023-11-20'),
        categories: ['JavaScript', 'MySQL', 'Full Stack'],
      },
      {
        title: 'Digital Marketing Analytics Platform',
        link: '/projects',
        description: 'Developed a comprehensive platform with JWT authentication, real-time analytics, and microservices architecture for digital marketers.',
        pubDate: new Date('2023-09-10'),
        categories: ['REST APIs', 'JWT', 'Microservices'],
      },
      {
        title: 'App Development Associate Internship',
        link: '/experience',
        description: 'Completed internship in Chennai focusing on mobile application development, app architecture, and performance optimization.',
        pubDate: new Date('2024-06-30'),
        categories: ['Mobile Development', 'Internship', 'Career'],
      },
      {
        title: 'Web Development Internship Achievement',
        link: '/experience',
        description: 'Successfully completed web development internship in Coimbatore, gaining hands-on experience with modern web technologies.',
        pubDate: new Date('2023-12-31'),
        categories: ['Web Development', 'Internship', 'Skills'],
      }
    ],
    customData: `
      <language>en-us</language>
      <category>Technology</category>
      <category>Web Development</category>
      <category>Software Engineering</category>
      <managingEditor>sanjaydhandapani0@gmail.com (Sanjay D)</managingEditor>
      <webMaster>sanjaydhandapani0@gmail.com (Sanjay D)</webMaster>
      <ttl>1440</ttl>
      <image>
        <url>https://sanjay-portfolio.com/lovable-uploads/224479e8-d491-449c-a9f8-ccb0b9c8aedb.png</url>
        <title>Sanjay D - Full Stack Developer</title>
        <link>https://sanjay-portfolio.com</link>
      </image>
    `,
  });
}