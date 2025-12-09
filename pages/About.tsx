
import React from 'react';
import { 
  Terminal, 
  Shield, 
  Server, 
  Code, 
  Award, 
  Heart, 
  Mail, 
  Linkedin, 
  Github, 
  Youtube,
  CheckCircle2,
  Users,
  FileText,
  Cpu,
  User,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { Badge, Button } from '../components/UI';

export const About: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      
      {/* Hero Section */}
      <section className="text-center py-16 mb-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-green/20 rounded-full blur-[100px] -z-10 opacity-50 dark:opacity-20"></div>
        <h1 className="text-5xl md:text-7xl font-bold text-navy-900 dark:text-white mb-6">
          Built by Admins, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-dark to-neon-blue dark:from-neon-green dark:to-neon-blue">For Admins</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light">
          Real-world Microsoft 365 knowledge from the trenches of enterprise IT.
        </p>
      </section>

      {/* Intro Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-3xl font-bold text-navy-900 dark:text-white">Hi, I'm Sayan.</h2>
          <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-400">
            <p>
              I'm a Microsoft 365 administrator with over 4 years of hands-on experience managing enterprise environments at scale. After spending countless hours troubleshooting obscure error codes, hunting through scattered documentation, and wishing for a single reliable resource that actually understands what admins face daily—I decided to build it myself.
            </p>
            <p>
              <strong className="text-navy-900 dark:text-white">MicrosoftAdmin.in</strong> was born from frustration and necessity. Too often, official documentation feels detached from real-world scenarios. Community forums are hit-or-miss. And when you're dealing with a production outage at 2 AM, you need answers that are clear, tested, and actually work.
            </p>
          </div>
        </div>
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="glass-panel p-2 rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-500 w-full max-w-[280px] md:max-w-[320px]">
             {/* Profile Picture */}
            <img 
              src="sayan-profile.jpg" 
              alt="Sayan Ghosh - Microsoft 365 Administrator" 
              loading="eager"
              className="rounded-xl w-full h-auto aspect-[4/5] object-cover shadow-2xl bg-gray-200 dark:bg-navy-800"
              onError={(e) => {
                // Fallback to a generic user icon if the specific image file is not found
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback container if image fails to load */}
            <div className="hidden w-full aspect-[4/5] rounded-xl bg-gradient-to-br from-gray-100 to-gray-300 dark:from-navy-800 dark:to-navy-900 flex flex-col items-center justify-center text-gray-400">
               <User size={64} className="mb-4 opacity-50" />
               <span className="text-sm font-mono">Sayan Ghosh</span>
            </div>

            <div className="absolute bottom-6 right-6 glass-panel px-4 py-2 rounded-lg border border-neon-green/30 text-navy-900 dark:text-white text-xs font-mono font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
              M365 Certified
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Redirect Section */}
      <section className="mb-24">
        <div className="glass-panel p-8 md:p-10 rounded-xl border border-neon-blue/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px] -z-10 group-hover:bg-neon-blue/20 transition-all duration-500"></div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                            <Globe size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-navy-900 dark:text-white">Visit My Portfolio</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Interested in my other projects and professional background? Check out my main portfolio site.
                    </p>
                </div>
                <a 
                    href="https://infra365.online" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-neon-blue text-white font-bold rounded-xl hover:bg-navy-800 dark:hover:bg-white dark:hover:text-navy-900 shadow-lg hover:shadow-neon-blue/30 transition-all duration-300 transform hover:scale-105"
                >
                    infra365.online <ArrowUpRight size={20} />
                </a>
            </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mb-24">
        <div className="relative glass-panel border-l-4 border-neon-dark dark:border-neon-green p-8 md:p-12 rounded-r-2xl overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 dark:opacity-10 pointer-events-none">
             <Terminal size={300} />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neon-dark dark:text-neon-green mb-4">Our Mission</h3>
          <p className="text-2xl md:text-3xl font-bold text-navy-900 dark:text-white leading-relaxed">
            To be the go-to resource for Microsoft 365 administrators who need reliable, practical, and immediately actionable knowledge. We bridge the gap between Microsoft's official documentation and the messy reality of enterprise IT.
          </p>
        </div>
      </section>

      {/* Why Different */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12 text-navy-900 dark:text-white">What Makes Us Different</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Server className="w-8 h-8 text-neon-blue" />,
              title: "Real Experience",
              desc: "Every guide and script comes from actual production environments. You're getting battle-tested knowledge, not academic theory."
            },
            {
              icon: <FileText className="w-8 h-8 text-neon-green" />,
              title: "Plain Language",
              desc: "I explain concepts the way I wish someone had explained them to me—clearly, directly, and with practical context."
            },
            {
              icon: <Cpu className="w-8 h-8 text-orange-400" />,
              title: "Always Current",
              desc: "I stay on top of the latest updates and breaking changes so you don't have to. A living knowledge base that evolves with the platform."
            }
          ].map((item, i) => (
            <div key={i} className="glass-panel p-8 rounded-xl hover:border-neon-dark/50 dark:hover:border-neon-green/50 transition-colors">
              <div className="mb-4 bg-gray-50 dark:bg-white/5 w-16 h-16 rounded-full flex items-center justify-center border border-gray-200 dark:border-white/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Background & Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-navy-900 dark:text-white">My Background</h2>
          
          <div className="space-y-6">
             <div className="glass-panel p-6 rounded-xl border-l-4 border-blue-500">
               <h4 className="font-bold text-navy-900 dark:text-white flex items-center gap-2 mb-2">
                 <Terminal size={18} /> Professional Experience
               </h4>
               <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                 <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-blue-500" /> 4+ years as Microsoft 365/Exchange Online Administrator</li>
                 <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-blue-500" /> Enterprise migrations and hybrid deployments</li>
                 <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-blue-500" /> Identity and security architecture (Entra ID, MFA)</li>
                 <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-blue-500" /> Device management with Intune and Autopilot</li>
               </ul>
             </div>

             <div className="glass-panel p-6 rounded-xl border-l-4 border-purple-500">
               <h4 className="font-bold text-navy-900 dark:text-white flex items-center gap-2 mb-2">
                 <Award size={18} /> Certifications
               </h4>
               <div className="flex flex-wrap gap-2">
                 <Badge text="M365 Admin Expert" color="bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20" />
                 <Badge text="Azure Admin Associate" color="bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20" />
                 <Badge text="Security Fundamentals" color="bg-green-500/10 text-green-600 dark:text-green-300 border border-green-500/20" />
               </div>
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-3xl font-bold text-navy-900 dark:text-white">Why This Site Exists</h2>
           <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-400">
             <p>
               Every Microsoft 365 admin has been there: staring at a cryptic error code, deadline looming, while official docs lead you in circles. You've pieced together solutions from ten different blog posts, Stack Overflow threads, and Reddit comments—all while wondering if there's a better way.
             </p>
             <p>
               There is. That's what this site represents.
             </p>
             <p>
               It's not trying to replace Microsoft's documentation—it's trying to make it usable. To add the context, the warnings about gotchas, the "here's what actually works" guidance that separates surviving as an admin from thriving.
             </p>
           </div>
           
           {/* Stats Bar */}
           <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-4 bg-gray-100 dark:bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-navy-900 dark:text-white">50+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Guides</div>
              </div>
              <div className="text-center p-4 bg-gray-100 dark:bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-navy-900 dark:text-white">25+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Scripts</div>
              </div>
              <div className="text-center p-4 bg-gray-100 dark:bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-navy-900 dark:text-white">1k+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Downloads</div>
              </div>
           </div>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="mb-24 glass-panel p-8 md:p-12 rounded-xl text-center">
        <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          I'm always looking to improve this resource. Have a question, spotted an error, or want to suggest a topic?
        </p>

        <a 
          href="mailto:sayan@microsoftadmin.in" 
          className="inline-flex items-center text-xl md:text-2xl font-bold text-navy-900 dark:text-white hover:text-neon-dark dark:hover:text-neon-green transition-all duration-300 group mb-8"
        >
          <Mail className="mr-3 group-hover:scale-110 transition-transform" />
          sayan@microsoftadmin.in
        </a>

        <div className="flex justify-center gap-6">
          <a href="https://www.linkedin.com/company/microsoftadmin/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-white/5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-neon-dark dark:hover:bg-neon-green hover:text-white dark:hover:text-navy-900 transition-all">
            <Linkedin size={24} />
          </a>
          <a href="#" className="p-3 bg-gray-100 dark:bg-white/5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-neon-dark dark:hover:bg-neon-green hover:text-white dark:hover:text-navy-900 transition-all">
            <Github size={24} />
          </a>
          <a href="#" className="p-3 bg-gray-100 dark:bg-white/5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-neon-dark dark:hover:bg-neon-green hover:text-white dark:hover:text-navy-900 transition-all">
            <Youtube size={24} />
          </a>
        </div>
      </section>

      {/* Support & Disclaimer */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="glass-panel p-6 rounded-xl">
           <div className="flex items-center gap-2 mb-4 text-pink-500">
             <Heart size={20} /> <h4 className="font-bold">Supporting This Project</h4>
           </div>
           <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
             MicrosoftAdmin.in is a passion project maintained independently. If you find the content valuable, consider sharing it with fellow admins or starring the GitHub repo.
           </p>
        </div>
        <div className="glass-panel p-6 rounded-xl">
           <div className="flex items-center gap-2 mb-4 text-orange-400">
             <Shield size={20} /> <h4 className="font-bold">A Note on Independence</h4>
           </div>
           <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
             This site is independently maintained and not affiliated with Microsoft Corporation. Always test configurations in non-production environments first.
           </p>
        </div>
      </section>

      <div className="text-center border-t border-gray-200 dark:border-white/10 pt-8 pb-12">
        <h4 className="font-bold text-navy-900 dark:text-white">- Sayan Ghosh</h4>
        <p className="text-sm text-gray-500 italic">Microsoft 365 Administrator • Building the resource I always wanted</p>
      </div>

    </div>
  );
};
