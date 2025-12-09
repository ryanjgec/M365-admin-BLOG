import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  Mail, 
  WifiOff, 
  Smartphone, 
  Cloud, 
  Lock, 
  CreditCard, 
  Search, 
  Server, 
  Activity,
  HelpCircle,
  FileText,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Monitor,
  ChevronRight
} from 'lucide-react';

export const Troubleshooting: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
        title: "Sign-In & Authentication",
        icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
        problems: [
            "User blocked by Conditional Access policy",
            "MFA prompt not appearing or failing",
            "Account locked out repeatedly",
            "SSO failure with on-premises apps",
            "AADSTS error codes during sign-in",
            "Password reset not working",
            "Guest user cannot sign in"
        ],
        fixes: [
            "Clear browser cache and cookies",
            "Try signing in using InPrivate/Incognito mode",
            "Verify correct username format (user@domain.com)",
            "Check if Caps Lock is enabled",
            "Contact admin to verify account status"
        ]
    },
    {
        title: "Exchange & Mail Flow",
        icon: <Mail className="w-6 h-6 text-blue-400" />,
        problems: [
            "Emails delayed or not delivered (NDR 5.1.1, 5.7.1)",
            "User cannot access Shared Mailbox",
            "Hybrid connector validation failed",
            "Transport rule not applying correctly",
            "SPF/DKIM/DMARC authentication failures",
            "Emails going to Junk/Spam folder incorrectly",
            "Mailbox quota exceeded"
        ],
        fixes: [
            "Check Junk Email folder for missing messages",
            "Verify recipient email address is correct",
            "Check mailbox storage quota in Outlook",
            "Try sending from Outlook Web App (OWA)",
            "Clear Outlook cache and restart application"
        ]
    },
    {
        title: "Microsoft Teams",
        icon: <WifiOff className="w-6 h-6 text-purple-500" />,
        problems: [
            "Poor call quality, audio jitter, or echo",
            "Screen sharing shows black screen",
            "Guest access issues - guests cannot join",
            "Teams not loading or stuck",
            "Meeting recordings not appearing",
            "Chat messages not syncing",
            "Cannot share files in Teams chat"
        ],
        fixes: [
            "Clear Teams cache (%appdata%\\Microsoft\\Teams)",
            "Restart Teams application completely",
            "Check internet connection speed (>1.5 Mbps)",
            "Update Teams to latest version",
            "Use Teams web version as backup"
        ]
    },
    {
        title: "Intune & Device Mgmt",
        icon: <Smartphone className="w-6 h-6 text-orange-400" />,
        problems: [
            "Autopilot enrollment error 80070774",
            "Device shows 'Not Compliant' incorrectly",
            "App installation failed on managed devices",
            "Device not syncing with Intune",
            "Cannot enroll personal device (BYOD)",
            "BitLocker encryption not applying",
            "Configuration profile deployment stuck"
        ],
        fixes: [
            "Open Company Portal app and click 'Check Status'",
            "Restart device and allow time for policy sync",
            "Verify device is connected to internet",
            "Check device meets minimum OS requirements",
            "Remove and re-enroll device (last resort)"
        ]
    },
    {
        title: "OneDrive & SharePoint Sync",
        icon: <Cloud className="w-6 h-6 text-sky-400" />,
        problems: [
            "OneDrive not syncing files",
            "'Processing changes' stuck indefinitely",
            "Sync errors with red X icon",
            "File/folder name contains invalid characters",
            "OneDrive offline or paused syncing",
            "Storage quota exceeded",
            "Files not uploading from desktop to cloud"
        ],
        fixes: [
            "Check OneDrive icon in system tray",
            "Pause and resume syncing",
            "Restart OneDrive application",
            "Rename files with special characters",
            "Run 'onedrive.exe /reset'",
            "Free up disk space on local device"
        ]
    },
    {
        title: "SharePoint Permissions",
        icon: <Lock className="w-6 h-6 text-yellow-500" />,
        problems: [
            "'Access Denied' errors",
            "User removed but still appears in permissions",
            "Broken permission inheritance",
            "External sharing not working",
            "Guest users cannot access shared folders",
            "Site collection admin access revoked",
            "Document library showing 'Item might not exist'"
        ],
        fixes: [
            "Verify signed in with correct account",
            "Request access using button on error page",
            "Check if sharing link has expired",
            "Ask site owner to verify permissions",
            "Try accessing from different browser"
        ]
    },
    {
        title: "Outlook Desktop",
        icon: <Monitor className="w-6 h-6 text-indigo-400" />,
        problems: [
            "Outlook not connecting to Exchange",
            "Profile corruption preventing startup",
            "Search not returning results",
            "Calendar not syncing across devices",
            "Add-ins causing crashes",
            "Cannot add shared mailbox",
            "Offline address book not downloading"
        ],
        fixes: [
            "Restart Outlook in Safe Mode (hold CTRL)",
            "Disable suspicious add-ins",
            "Run Outlook's built-in repair tool",
            "Create new Outlook profile",
            "Compact OST/PST files",
            "Update Outlook"
        ]
    },
    {
        title: "Licensing & Subscriptions",
        icon: <CreditCard className="w-6 h-6 text-green-400" />,
        problems: [
            "'Unlicensed Product' in Office apps",
            "License assignment not applying",
            "Features not available despite license",
            "Multiple accounts causing confusion",
            "Office activation failing",
            "License pooling errors",
            "User cannot access service after change"
        ],
        fixes: [
            "Sign out and sign back in to Office",
            "Check license status at portal.office.com",
            "Run Office activation troubleshooter",
            "Verify subscription is active",
            "Contact admin to verify assignment"
        ]
    },
    {
        title: "Additional Issues",
        icon: <Server className="w-6 h-6 text-gray-400" />,
        problems: [
            "Slow M365 service response times",
            "MFA not prompting on new device",
            "Authenticator app not generating codes",
            "Mail flow issues in Hybrid",
            "Directory sync errors (Azure AD Connect)",
            "Mailbox migration stuck",
            "Service health incidents"
        ],
        fixes: [
            "Check Service Health Dashboard",
            "Use backup codes for MFA",
            "Force directory sync",
            "Check internet latency",
            "Review audit logs"
        ]
    }
  ];

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;

    return categories.map(cat => {
      // Check if category title matches
      if (cat.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return cat;
      }
      // Check if any problems match
      const matchingProblems = cat.problems.filter(p => 
        p.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Check if any fixes match
      const matchingFixes = cat.fixes.filter(f => 
        f.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      if (matchingProblems.length > 0 || matchingFixes.length > 0) {
        return {
          ...cat,
          problems: matchingProblems.length > 0 ? matchingProblems : cat.problems,
          fixes: matchingFixes.length > 0 ? matchingFixes : cat.fixes
        };
      }
      return null;
    }).filter(cat => cat !== null);
  }, [categories, searchTerm]);

  const generateId = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const scrollToSection = (id: string) => {
    // Clear search if it might hide the target
    if (searchTerm) setSearchTerm('');
    
    // Slight delay to allow render if search was cleared, though React batching might handle it.
    // For simplicity, we assume immediate availability or handle in useEffect if needed.
    // Using simple timeout to ensure DOM update if search changes layout.
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100; // Adjust for sticky header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
        }
    }, 10);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4 text-navy-900 dark:text-white">Troubleshooting Hub</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
            Diagnose and resolve common Microsoft 365 issues quickly. Use the search bar or navigate using the sidebar.
        </p>
        
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for error codes (e.g., 5.1.1, 80070774), symptoms, or services..." 
              className="w-full bg-white dark:bg-navy-900/50 border border-gray-200 dark:border-white/10 rounded-full pl-12 pr-6 py-4 text-navy-900 dark:text-white focus:outline-none focus:border-neon-green/50 shadow-lg transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative items-start">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-28 self-start">
            <div className="glass-panel p-4 rounded-xl border border-gray-200 dark:border-white/10">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Categories</h3>
                <nav className="space-y-1">
                    {categories.map((cat, idx) => (
                    <button
                        key={idx}
                        onClick={() => scrollToSection(generateId(cat.title))}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-neon-dark dark:hover:text-neon-green transition-colors flex items-center justify-between group"
                    >
                        <span>{cat.title}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    ))}
                    <button
                        onClick={() => scrollToSection('best-practices')}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-neon-dark dark:hover:text-neon-green transition-colors flex items-center justify-between group"
                    >
                        <span>Best Practices</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </nav>
            </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow w-full">
            {filteredCategories.length > 0 ? (
                <div className="space-y-8 mb-20">
                    {filteredCategories.map((cat, idx) => (
                        <div 
                            key={idx} 
                            id={generateId(cat.title)}
                            className="glass-panel rounded-xl overflow-hidden hover:border-neon-green/30 transition-all scroll-mt-28"
                        >
                            <div className="p-6 border-b border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 flex items-center">
                                <div className="p-2 bg-white dark:bg-navy-900 rounded-lg border border-gray-200 dark:border-white/10 mr-3 shadow-sm">
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 dark:text-white">{cat.title}</h3>
                            </div>
                            
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="flex items-center text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-wider mb-4">
                                        <XCircle className="w-4 h-4 mr-2" /> Common Problems
                                    </h4>
                                    <ul className="space-y-3">
                                        {cat.problems.map((prob, i) => (
                                            <li key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-snug flex items-start">
                                                <span className="mr-2 text-red-300">•</span>
                                                {prob}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="flex items-center text-xs font-bold text-green-600 dark:text-neon-green uppercase tracking-wider mb-4">
                                        <CheckCircle2 className="w-4 h-4 mr-2" /> Quick Fixes
                                    </h4>
                                    <ul className="space-y-3">
                                        {cat.fixes.map((fix, i) => (
                                            <li key={i} className="text-sm text-gray-700 dark:text-gray-300 leading-snug flex items-start">
                                                <span className="mr-2 text-green-500/50">•</span>
                                                {fix}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 mb-20">
                    <p className="text-gray-500 text-lg">No troubleshooting topics found for "{searchTerm}".</p>
                    <button onClick={() => setSearchTerm('')} className="text-neon-dark dark:text-neon-green hover:underline mt-2">Clear search</button>
                </div>
            )}

            {/* Admin Best Practices */}
            <div id="best-practices" className="glass-panel p-8 rounded-xl mb-20 scroll-mt-28">
                <div className="flex items-center mb-8">
                    <Activity className="text-neon-blue w-6 h-6 mr-3" />
                    <h2 className="text-2xl font-bold text-navy-900 dark:text-white">Troubleshooting Best Practices for Admins</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: "Check Service Health", desc: "Always verify no ongoing Microsoft 365 outages in the Admin Center." },
                        { title: "Review Audit Logs", desc: "Use audit logs to trace user actions and permission changes." },
                        { title: "Run Diagnostics", desc: "Use built-in diagnostic tools in M365 Admin Center." },
                        { title: "Test in Incognito", desc: "Isolate browser cache/extension issues by testing in private mode." },
                        { title: "Message Trace", desc: "For email issues, run message trace in Exchange Admin Center." },
                        { title: "Verify DNS", desc: "Ensure SPF, DKIM, DMARC, MX records are correct." },
                        { title: "Conditional Access", desc: "Review sign-in logs to see if policies are blocking access." },
                        { title: "Collect Logs", desc: "Enable enhanced diagnostic logging before opening support tickets." }
                    ].map((item, i) => (
                        <div key={i} className="flex items-start">
                            <span className="font-mono text-neon-dark dark:text-neon-green mr-3 font-bold text-lg">0{i+1}</span>
                            <div>
                                <h4 className="font-bold text-navy-900 dark:text-white text-base">{item.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Reporting Issues */}
                <div className="glass-panel p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                        <HelpCircle className="text-orange-400 w-5 h-5 mr-2" />
                        <h3 className="text-lg font-bold text-navy-900 dark:text-white">How to Report Issues</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">For Admins</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Open ticket via M365 Admin Center > Support. Include UPNs, timestamps, and screenshots.</p>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">For End Users</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Report to IT helpdesk first. Document exact error messages and steps to reproduce.</p>
                        </div>
                    </div>
                </div>

                {/* Resources */}
                <div className="glass-panel p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                        <FileText className="text-neon-green w-5 h-5 mr-2" />
                        <h3 className="text-lg font-bold text-navy-900 dark:text-white">Useful Resources</h3>
                    </div>
                    <ul className="space-y-3">
                        {[
                            { name: "Service Health Dashboard", url: "https://admin.microsoft.com/servicestatus" },
                            { name: "M365 Troubleshooting Docs", url: "https://learn.microsoft.com/troubleshoot" },
                            { name: "Microsoft Community Forums", url: "https://answers.microsoft.com" },
                            { name: "Microsoft Support for Business", url: "https://support.microsoft.com/business" }
                        ].map((link, i) => (
                            <li key={i}>
                                <a href={link.url} target="_blank" rel="noreferrer" className="text-sm text-neon-dark dark:text-neon-blue hover:underline flex items-center">
                                    {link.name} <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
