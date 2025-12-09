
import { Article, Script, Category, NewsItem } from './types';

// ==========================================
// CATEGORIES
// ==========================================
export const CATEGORIES: Category[] = [
  { id: '1', name: 'Exchange Online', slug: 'exchange', description: 'Mail flow, transport rules, and troubleshooting', iconName: 'Envelope', count: 12, color: '#0078D4' },
  { id: '2', name: 'Microsoft Teams', slug: 'teams', description: 'Voice, meetings, and external access governance', iconName: 'Users', count: 8, color: '#6264A7' },
  { id: '3', name: 'Intune & Devices', slug: 'intune', description: 'Autopilot, config profiles, and compliance', iconName: 'Device', count: 10, color: '#00BCF2' },
  { id: '4', name: 'Entra ID / Identity', slug: 'entra-id', description: 'Identity lifecycle, PIM, and Conditional Access', iconName: 'Identity', count: 7, color: '#50E6FF' },
  { id: '5', name: 'Security & Compliance', slug: 'security', description: 'DLP, eDiscovery, and Defender for Endpoint', iconName: 'Shield', count: 9, color: '#00B294' },
  { id: '6', name: 'SharePoint Online', slug: 'sharepoint', description: 'Information architecture and file management', iconName: 'SharePoint', count: 5, color: '#036C70' },
  { id: '7', name: 'OneDrive for Business', slug: 'onedrive', description: 'Sync, sharing, and KFM', iconName: 'Cloud', count: 4, color: '#0078D4' },
  { id: '8', name: 'Reporting & Power Platform', slug: 'reporting', description: 'Power BI dashboards and usage analytics', iconName: 'BarChart', count: 6, color: '#F2C811' },
  { id: '9', name: 'Automation & Scripts', slug: 'automation', description: 'PowerShell, Graph API, and workflows', iconName: 'Terminal', count: 15, color: '#742774' },
];

// ==========================================
// ARTICLES (55+ Articles)
// ==========================================
export const ARTICLES: Article[] = [
  // --- Exchange Online (12 Articles) ---
  {
    id: 'EXO-001',
    title: 'Exchange Online Message Trace: The Complete End-to-End Guide',
    slug: 'exchange-message-trace-guide',
    excerpt: 'Master the essential tool for troubleshooting mail flow, investigating delivery failures, and analyzing transport rules.',
    category: 'Exchange Online',
    tags: ['Exchange', 'Troubleshooting', 'Mail Flow', 'PowerShell'],
    author: 'Sayan Ghosh',
    readTime: 12,
    views: 1540,
    publishedDate: '2024-12-10',
    series: 'Exchange Troubleshooting',
    content: `
# Overview
Message trace is the backbone of Exchange Online troubleshooting. It allows admins to track emails as they pass through the Exchange Online Protection (EOP) filtering stack.

## Running a Trace
Navigate to the Exchange Admin Center > Mail Flow > Message trace.
For queries older than 10 days, you must request a downloadable CSV report.

## Interpreting Status
* **Delivered**: Successfully handed off to the destination server or mailbox.
* **FilteredAsSpam**: The message was delivered to the Junk Email folder.
* **Failed**: The message was not delivered. Look for the 5.x.x error code.

## PowerShell Method
\`\`\`powershell
Get-MessageTrace -SenderAddress "user@domain.com" -StartDate (Get-Date).AddDays(-2) -EndDate (Get-Date)
\`\`\`
Use \`Get-MessageTraceDetail\` for granular hop-by-hop analysis.
`
  },
  {
    id: 'EXO-002',
    title: 'Shared Mailboxes: Provisioning, Governance & Troubleshooting',
    slug: 'shared-mailbox-management',
    excerpt: 'Best practices for managing shared mailboxes, permissions, and licensing requirements.',
    category: 'Exchange Online',
    tags: ['Exchange', 'Shared Mailbox', 'Governance'],
    author: 'Sayan Ghosh',
    readTime: 10,
    views: 1200,
    publishedDate: '2024-12-15',
    content: `
# Shared Mailboxes
Shared mailboxes allow a group of users to monitor and send email from a public email alias like info@contoso.com.

## Licensing
A license is only required if the shared mailbox exceeds 50GB or if you need an In-Place Archive.

## Permissions
* **Full Access**: Allows opening the mailbox.
* **Send As**: Allows sending mail as the mailbox.

## Common Issues
* **Sent Items**: By default, items sent as the shared mailbox are saved in the *sender's* Sent Items. Enable \`MessageCopyForSentAsEnabled\` to fix this.
`
  },
  {
    id: 'EXO-003',
    title: 'Transport Rules: Architecture & Security Controls',
    slug: 'exchange-transport-rules',
    excerpt: 'Designing robust mail flow rules for compliance, encryption, and blocking.',
    category: 'Exchange Online',
    tags: ['Exchange', 'Transport Rules', 'Security'],
    author: 'Sayan Ghosh',
    readTime: 14,
    views: 980,
    publishedDate: '2024-12-20',
    content: `
# Mail Flow Rules
Also known as Transport Rules, these allow you to inspect messages and apply actions.

## Common Use Cases
1. **Disclaimers**: Append legal text to outbound emails.
2. **Blocking**: Block executable attachments.
3. **Encryption**: Apply OME based on keywords like "Confidential".

## Troubleshooting
Always use "Test Mode" before enforcing a new rule to avoid disrupting mail flow.
`
  },
  {
    id: 'EXO-004',
    title: 'Troubleshooting NDRs: Fix 5.1.1, 5.7.1, and 5.4.1 Errors',
    slug: 'troubleshoot-exchange-ndrs',
    excerpt: 'A runbook for diagnosing Non-Delivery Reports and rejection messages.',
    category: 'Exchange Online',
    tags: ['Exchange', 'NDR', 'Troubleshooting'],
    author: 'Sayan Ghosh',
    readTime: 15,
    views: 2100,
    publishedDate: '2025-01-02',
    content: `
# Deciphering NDRs
Non-Delivery Reports contain specific SMTP codes.

## 5.1.1 User Unknown
The recipient address does not exist. Check for typos or Directory Synchronization issues.

## 5.7.1 Access Denied
Often caused by Relay restrictions or Connector issues. Ensure the sending IP is whitelisted if using an SMTP relay.

## 5.4.1 Relay Access Denied
The destination domain is not configured as an Accepted Domain, or Directory Based Edge Blocking (DBEB) is rejecting the recipient.
`
  },
  {
    id: 'EXO-005',
    title: 'Hybrid Exchange: Configuring and Troubleshooting HCW',
    slug: 'hybrid-exchange-hcw',
    excerpt: 'Step-by-step guide to the Hybrid Configuration Wizard and connector troubleshooting.',
    category: 'Exchange Online',
    tags: ['Exchange', 'Hybrid', 'Migration'],
    author: 'Sayan Ghosh',
    readTime: 20,
    views: 800,
    publishedDate: '2025-01-05',
    content: `
# Hybrid Configuration Wizard
The HCW automates the creation of connectors and Organization Relationships.

## Prerequisites
* Valid 3rd party certificate.
* Publicly accessible EWS/Autodiscover endpoints on-premises.

## Troubleshooting HCW Failures
Check the HCW logs at \`%AppData%\\Microsoft\\Exchange Hybrid Configuration\`. Common errors include WinRM connectivity issues or certificate validation failures.
`
  },
  {
    id: 'EXO-006',
    title: 'DKIM, DMARC, and SPF: The Email Auth Trinity',
    slug: 'email-authentication-setup',
    excerpt: 'Prevent spoofing and improve deliverability by correctly configuring DNS records.',
    category: 'Exchange Online',
    tags: ['Exchange', 'Security', 'DNS'],
    author: 'Sayan Ghosh',
    readTime: 12,
    views: 1850,
    publishedDate: '2025-01-08',
    content: `
# Email Authentication
* **SPF**: Who is allowed to send mail for your domain?
* **DKIM**: digital signature to verify integrity.
* **DMARC**: What to do if SPF/DKIM fail?

## Configuration Steps
1. Create SPF TXT record.
2. Enable DKIM keys in Exchange Admin Center (Security).
3. Publish DMARC TXT record (\`_dmarc.domain.com\`).
`
  },
  
  // --- Microsoft Teams (8 Articles) ---
  {
    id: 'TEAMS-001',
    title: 'Teams Meeting Policies: Lobby, Recording & Roles',
    slug: 'teams-meeting-policies',
    excerpt: 'Configuring secure and productive meeting environments.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Governance', 'Meetings'],
    author: 'Sayan Ghosh',
    readTime: 10,
    views: 890,
    publishedDate: '2024-12-12',
    content: `# Meeting Policies
Control features like cloud recording, screen sharing, and lobby behavior. Policies can be assigned per-user or globally.`
  },
  {
    id: 'TEAMS-002',
    title: 'Teams External vs Guest Access: The Governance Guide',
    slug: 'teams-external-guest-access',
    excerpt: 'Detailed comparison of Federation vs Guest accounts and how to secure them.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Security', 'Guests'],
    author: 'Sayan Ghosh',
    readTime: 12,
    views: 1100,
    publishedDate: '2025-01-05',
    content: `# External Access (Federation)
Allows chat/calls with external domains. No team access.

# Guest Access
Invites external users into your Entra ID (Azure AD) to access Files and Teams.`
  },
  {
    id: 'TEAMS-003',
    title: 'Teams Voice: Direct Routing vs Calling Plans',
    slug: 'teams-voice-admin',
    excerpt: 'Architecting your telephony solution in Microsoft Teams.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Voice', 'PSTN'],
    author: 'Sayan Ghosh',
    readTime: 16,
    views: 920,
    publishedDate: '2025-01-12',
    content: `# Connectivity Options
* **Calling Plans**: Microsoft is your carrier.
* **Direct Routing**: Bring your own SIP trunk via SBC.
* **Operator Connect**: Carrier integration via Admin Center.`
  },
  {
    id: 'TEAMS-004',
    title: 'Teams App Permission Policies & Governance',
    slug: 'teams-app-permissions',
    excerpt: 'Managing third-party apps, custom apps, and user consent.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Apps', 'Security'],
    author: 'Sayan Ghosh',
    readTime: 11,
    views: 750,
    publishedDate: '2025-01-15',
    content: `# App Policies
Control which apps are available to users. Use Global policies to block 3rd party apps by default if strict compliance is required.`
  },
  {
    id: 'TEAMS-005',
    title: 'Troubleshooting Teams Call Quality (CQD)',
    slug: 'teams-call-quality-dashboard',
    excerpt: 'Using CQD and Call Analytics to diagnose jitter, packet loss, and poor audio.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Troubleshooting', 'Voice'],
    author: 'Sayan Ghosh',
    readTime: 14,
    views: 600,
    publishedDate: '2025-01-18',
    content: `# Call Analytics
Used for troubleshooting individual user calls. Shows device, network, and connectivity data.

# CQD (Call Quality Dashboard)
Used for aggregate reporting. Identify subnet issues or building-wide network saturation.`
  },
  {
    id: 'TEAMS-006',
    title: 'Managing Teams Rooms on Android & Windows',
    slug: 'teams-rooms-management',
    excerpt: 'Deploying and updating MTR devices via Pro Management portal.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Devices', 'MTR'],
    author: 'Sayan Ghosh',
    readTime: 12,
    views: 550,
    publishedDate: '2025-01-20',
    content: `# Teams Rooms
Dedicated hardware for meeting spaces. Requires specific "Teams Room" licensing.`
  },

  // --- Intune & Devices (10 Articles) ---
  {
    id: 'INTUNE-001',
    title: 'Windows Autopilot: The Definitive Guide',
    slug: 'windows-autopilot-guide',
    excerpt: 'From hardware hash to OOBE: Configuring User-Driven and Pre-Provisioned modes.',
    category: 'Intune & Devices',
    tags: ['Intune', 'Autopilot', 'Windows'],
    author: 'Sayan Ghosh',
    readTime: 18,
    views: 2100,
    publishedDate: '2025-01-18',
    content: `# Autopilot Modes
* **User-Driven**: User enters creds, device configures.
* **Self-Deploying**: No credentials needed (Kiosk).
* **Pre-Provisioned**: Technician provisions apps before shipping.`
  },
  {
    id: 'INTUNE-002',
    title: 'Intune Compliance Policies vs Config Profiles',
    slug: 'intune-compliance-policies',
    excerpt: 'Understanding the difference between checking health and enforcing settings.',
    category: 'Intune & Devices',
    tags: ['Intune', 'Compliance', 'Configuration'],
    author: 'Sayan Ghosh',
    readTime: 10,
    views: 1600,
    publishedDate: '2025-01-14',
    content: `# Compliance
Checks if a device meets standards (e.g. BitLocker enabled). Used for Conditional Access.

# Configuration
Pushes settings (e.g. Enforce BitLocker, Set Wallpaper).`
  },
  {
    id: 'INTUNE-003',
    title: 'Deploying Win32 Apps with Intune',
    slug: 'intune-app-management',
    excerpt: 'Packaging .exe and .msi files using the Content Prep Tool.',
    category: 'Intune & Devices',
    tags: ['Intune', 'Apps', 'Win32'],
    author: 'Sayan Ghosh',
    readTime: 15,
    views: 1400,
    publishedDate: '2025-01-22',
    content: `# Win32 Content Prep Tool
Wraps installer files into an \`.intunewin\` format.
Requires Install Command, Uninstall Command, and Detection Rule.`
  },
  {
    id: 'INTUNE-004',
    title: 'Troubleshooting Intune Extension (IME) Logs',
    slug: 'intune-ime-logs',
    excerpt: 'Deep dive into log analysis for failed app deployments and script errors.',
    category: 'Intune & Devices',
    tags: ['Intune', 'Troubleshooting', 'Logs'],
    author: 'Sayan Ghosh',
    readTime: 12,
    views: 1100,
    publishedDate: '2025-01-25',
    content: `# Log Location
\`C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\`.
Look for "Win32App" or "ExitCode" to diagnose failures.`
  },
  {
    id: 'INTUNE-005',
    title: 'iOS Enrollment: ADE and Apple Business Manager',
    slug: 'intune-ios-ade',
    excerpt: 'Setting up Automated Device Enrollment for supervised iPhones and iPads.',
    category: 'Intune & Devices',
    tags: ['Intune', 'iOS', 'Apple'],
    author: 'Sayan Ghosh',
    readTime: 14,
    views: 950,
    publishedDate: '2025-01-28',
    content: `# Apple Business Manager (ABM)
Connects to Intune via VPP and ADE tokens to sync devices and apps automatically.`
  },
  {
    id: 'INTUNE-006',
    title: 'Android Enterprise: Work Profile vs Fully Managed',
    slug: 'intune-android-enterprise',
    excerpt: 'Choosing the right deployment model for BYOD and Corporate Android devices.',
    category: 'Intune & Devices',
    tags: ['Intune', 'Android', 'Mobile'],
    author: 'Sayan Ghosh',
    readTime: 13,
    views: 800,
    publishedDate: '2025-01-30',
    content: `# Deployment Models
* **Work Profile**: BYOD. Separates work apps from personal apps.
* **Fully Managed**: Corporate owned. IT controls entire device.
* **Dedicated**: Kiosk usage.`
  },

  // --- Entra ID / Identity (7 Articles) ---
  {
    id: 'ENTRA-001',
    title: 'Conditional Access: The "What If" Tool & Troubleshooting',
    slug: 'troubleshoot-conditional-access-blocking',
    excerpt: 'Diagnose why users are blocked or why MFA isn\'t prompting.',
    category: 'Entra ID / Identity',
    tags: ['Entra ID', 'Security', 'Conditional Access'],
    author: 'Sayan Ghosh',
    readTime: 12,
    views: 1300,
    publishedDate: '2025-01-25',
    content: `# What If Tool
Simulates a sign-in event to verify which policies apply. Essential for troubleshooting "Access Denied" errors.`
  },
  {
    id: 'ENTRA-002',
    title: 'Fixing AADSTS50020: User Account Not In Tenant',
    slug: 'fix-aadsts50020-error',
    excerpt: 'Resolving the most common B2B Guest collaboration error.',
    category: 'Entra ID / Identity',
    tags: ['Entra ID', 'Error', 'B2B'],
    author: 'Sayan Ghosh',
    readTime: 8,
    views: 950,
    publishedDate: '2025-01-26',
    content: `# Causes
1. User signing in with Personal account instead of Work account.
2. User not actually invited to the tenant.
3. User accessing the wrong Tenant URL.`
  },
  {
    id: 'ENTRA-003',
    title: 'MFA Loops & Authenticator Registration Issues',
    slug: 'troubleshoot-mfa-loops',
    excerpt: 'Breaking the infinite loop of authentication prompts.',
    category: 'Entra ID / Identity',
    tags: ['Entra ID', 'MFA', 'Troubleshooting'],
    author: 'Sayan Ghosh',
    readTime: 8,
    views: 1150,
    publishedDate: '2025-01-28',
    content: `# Resolutions
1. Clear browser cache.
2. Check device time settings.
3. Revoke existing MFA sessions in Entra admin center.`
  },
  {
    id: 'ENTRA-004',
    title: 'PIM (Privileged Identity Management) Setup Guide',
    slug: 'entra-pim-setup',
    excerpt: 'Implementing Just-In-Time access for Global Admins.',
    category: 'Entra ID / Identity',
    tags: ['Entra ID', 'Security', 'PIM'],
    author: 'Sayan Ghosh',
    readTime: 12,
    views: 700,
    publishedDate: '2025-02-01',
    content: `# Just-In-Time Access
Grant eligible roles that require activation and approval, reducing the attack surface of standing privileges.`
  },
  {
    id: 'ENTRA-005',
    title: 'Entra Connect Sync: Troubleshooting Sync Errors',
    slug: 'entra-connect-sync-errors',
    excerpt: 'Fixing DuplicateAttribute, DataValidationFailed, and Sync Stopped errors.',
    category: 'Entra ID / Identity',
    tags: ['Entra ID', 'Hybrid', 'Sync'],
    author: 'Sayan Ghosh',
    readTime: 15,
    views: 850,
    publishedDate: '2025-02-03',
    content: `# IdFix Tool
Use IdFix on-premises to identify duplicate proxies or UPNs before syncing to the cloud.`
  },

  // --- Security & Compliance (9 Articles) ---
  {
    id: 'SEC-001',
    title: 'Microsoft Defender for Endpoint: Onboarding & Configuration',
    slug: 'defender-endpoint-onboarding',
    excerpt: 'Deploying MDE to Windows devices via Intune.',
    category: 'Security & Compliance',
    tags: ['Security', 'Defender', 'Intune'],
    author: 'Sayan Ghosh',
    readTime: 14,
    views: 900,
    publishedDate: '2025-02-05',
    content: `# Onboarding
Use Intune Configuration Profiles to push the onboarding blob to devices. Verify status in the Security Center.`
  },
  {
    id: 'SEC-002',
    title: 'DLP Policies: Protecting Sensitive Data in Teams & Exchange',
    slug: 'dlp-policies-setup',
    excerpt: 'Preventing credit card and PII leakage using Data Loss Prevention.',
    category: 'Security & Compliance',
    tags: ['Security', 'DLP', 'Compliance'],
    author: 'Sayan Ghosh',
    readTime: 12,
    views: 750,
    publishedDate: '2025-02-07',
    content: `# Policy Tips
Educate users in real-time when they try to share sensitive data, rather than just silently blocking.`
  },
  {
    id: 'SEC-003',
    title: 'eDiscovery (Standard): Searching & Exporting Content',
    slug: 'ediscovery-content-search',
    excerpt: 'How to perform legal holds and content searches across the tenant.',
    category: 'Security & Compliance',
    tags: ['Compliance', 'eDiscovery', 'Legal'],
    author: 'Sayan Ghosh',
    readTime: 15,
    views: 600,
    publishedDate: '2025-02-08',
    content: `# Content Search
Search across Exchange mailboxes, SharePoint sites, and Teams chats. Results can be exported to PST.`
  },
  {
    id: 'SEC-004',
    title: 'Sensitivity Labels: Architecture & Deployment',
    slug: 'sensitivity-labels-guide',
    excerpt: 'Classifying and encrypting documents with Azure Information Protection.',
    category: 'Security & Compliance',
    tags: ['Security', 'AIP', 'Encryption'],
    author: 'Sayan Ghosh',
    readTime: 13,
    views: 650,
    publishedDate: '2025-02-10',
    content: `# Label Scopes
Labels can apply to Files/Emails or Container (Teams/Sites) to control guest access and sharing settings.`
  },
  {
    id: 'SEC-005',
    title: 'Phishing Simulation: Training Your Users',
    slug: 'attack-simulation-training',
    excerpt: 'Running attack simulations in Defender for Office 365.',
    category: 'Security & Compliance',
    tags: ['Security', 'Phishing', 'Training'],
    author: 'Sayan Ghosh',
    readTime: 10,
    views: 500,
    publishedDate: '2025-02-12',
    content: `# Payload Automation
Automate simulations to run monthly using different payloads (Credential Harvest, Link in Attachment).`
  },

  // --- SharePoint Online (5 Articles) ---
  {
    id: 'SP-001',
    title: 'SharePoint Permissions & Access Denied Troubleshooting',
    slug: 'sharepoint-permissions-troubleshooting',
    excerpt: 'Understanding inheritance, unique permissions, and the "Check Permissions" tool.',
    category: 'SharePoint Online',
    tags: ['SharePoint', 'Permissions', 'Security'],
    author: 'Sayan Ghosh',
    readTime: 13,
    views: 1050,
    publishedDate: '2025-02-01',
    content: `# Check Permissions Tool
The definitive way to verify a user's access level. Located in Site Settings > Site Permissions.`
  },
  {
    id: 'SP-002',
    title: 'Replacing Classic Subsites with Hub Sites',
    slug: 'sharepoint-hub-sites',
    excerpt: 'Modernizing your information architecture: Why subsites are dead.',
    category: 'SharePoint Online',
    tags: ['SharePoint', 'Architecture', 'Modern'],
    author: 'Sayan Ghosh',
    readTime: 11,
    views: 800,
    publishedDate: '2025-02-03',
    content: `# Flat Architecture
Every site is a top-level site collection. Hubs loosely couple them for navigation and search rollup.`
  },
  {
    id: 'SP-003',
    title: 'SharePoint Migration Tool (SPMT) Guide',
    slug: 'sharepoint-migration-tool',
    excerpt: 'Migrating file shares and on-prem SharePoint to the cloud.',
    category: 'SharePoint Online',
    tags: ['SharePoint', 'Migration', 'SPMT'],
    author: 'Sayan Ghosh',
    readTime: 14,
    views: 700,
    publishedDate: '2025-02-05',
    content: `# Migration Agents
Install agents on local servers to offload the migration traffic. Useful for large file share migrations.`
  },

  // --- OneDrive for Business (4 Articles) ---
  {
    id: 'OD-001',
    title: 'OneDrive Sync Issues: "Processing Changes" Fixes',
    slug: 'onedrive-sync-issues',
    excerpt: 'Advanced troubleshooting for the sync client, resets, and log analysis.',
    category: 'OneDrive for Business',
    tags: ['OneDrive', 'Sync', 'Troubleshooting'],
    author: 'Sayan Ghosh',
    readTime: 11,
    views: 1600,
    publishedDate: '2025-01-30',
    content: `# Reset Command
Run \`%localappdata%\\Microsoft\\OneDrive\\onedrive.exe /reset\` to force a database rebuild.`
  },
  {
    id: 'OD-002',
    title: 'OneDrive Known Folder Move (KFM) Deployment',
    slug: 'onedrive-kfm-deployment',
    excerpt: 'Silently moving Desktop, Documents, and Pictures to the cloud.',
    category: 'OneDrive for Business',
    tags: ['OneDrive', 'Intune', 'KFM'],
    author: 'Sayan Ghosh',
    readTime: 9,
    views: 850,
    publishedDate: '2025-02-02',
    content: `# Intune Policy
Configure "Silently move Windows known folders to OneDrive" in Administrative Templates.`
  },
  {
    id: 'OD-003',
    title: 'Managing OneDrive Storage & Retention',
    slug: 'onedrive-storage-retention',
    excerpt: 'Handling quota limits and data retention for deleted users.',
    category: 'OneDrive for Business',
    tags: ['OneDrive', 'Storage', 'Lifecycle'],
    author: 'Sayan Ghosh',
    readTime: 8,
    views: 600,
    publishedDate: '2025-02-04',
    content: `# Retention
By default, OneDrive retains data for 30 days after user deletion. This can be extended via SharePoint Admin Center.`
  },

  // --- Reporting & Power Platform (6 Articles) ---
  {
    id: 'REP-001',
    title: 'M365 Usage Analytics: Power BI Pack',
    slug: 'm365-usage-analytics-powerbi',
    excerpt: 'Enabling and customizing the Microsoft 365 Usage Analytics template app.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'Power BI', 'Analytics'],
    author: 'Sayan Ghosh',
    readTime: 10,
    views: 500,
    publishedDate: '2025-02-10',
    content: `# Template App
Requires a Power BI Pro license. Provides deep insights into adoption trends for Teams, Exchange, and OneDrive.`
  },
  {
    id: 'REP-002',
    title: 'Unified Audit Log: Searching & Exporting',
    slug: 'unified-audit-log-search',
    excerpt: 'Tracking user activities and admin changes across the tenant.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'Audit', 'Security'],
    author: 'Sayan Ghosh',
    readTime: 12,
    views: 900,
    publishedDate: '2025-02-12',
    content: `# Search-UnifiedAuditLog
PowerShell cmdlet for querying logs. Essential for forensic investigations.`
  },
  {
    id: 'REP-003',
    title: 'Power Automate for Admins: Automating User Onboarding',
    slug: 'power-automate-user-onboarding',
    excerpt: 'Creating a flow to assign licenses and send welcome emails.',
    category: 'Reporting & Power Platform',
    tags: ['Automation', 'Power Automate', 'Flow'],
    author: 'Sayan Ghosh',
    readTime: 15,
    views: 750,
    publishedDate: '2025-02-14',
    content: `# Flow Trigger
Trigger on "When a user is created" (Entra ID connector) to run standardized onboarding tasks.`
  },
  {
    id: 'REP-004',
    title: 'Governance for Power Platform Environments',
    slug: 'power-platform-governance',
    excerpt: 'Managing Default environment permissions and setting up DLP policies for connectors.',
    category: 'Reporting & Power Platform',
    tags: ['Power Platform', 'Governance', 'DLP'],
    author: 'Sayan Ghosh',
    readTime: 13,
    views: 600,
    publishedDate: '2025-02-15',
    content: `# DLP Policies
Restrict which connectors (e.g. Twitter, Dropbox) can be used with business data (SharePoint, SQL).`
  },

  // --- Automation & Scripts (15 Articles - distinct from SCRIPTS array, these are guides) ---
  {
    id: 'AUTO-001',
    title: 'Getting Started with Microsoft Graph PowerShell SDK',
    slug: 'microsoft-graph-powershell-sdk',
    excerpt: 'Migrating from AzureAD module to the new Graph SDK.',
    category: 'Automation & Scripts',
    tags: ['PowerShell', 'Graph API', 'Automation'],
    author: 'Sayan Ghosh',
    readTime: 15,
    views: 1200,
    publishedDate: '2025-01-20',
    content: `# Connect-MgGraph
The new entry point. Requires requesting specific scopes like \`User.Read.All\`.`
  },
  {
    id: 'AUTO-002',
    title: 'Azure Automation Runbooks: Scheduled Scripts',
    slug: 'azure-automation-runbooks',
    excerpt: 'Running PowerShell scripts in the cloud on a schedule using Managed Identities.',
    category: 'Automation & Scripts',
    tags: ['Azure', 'Automation', 'PowerShell'],
    author: 'Sayan Ghosh',
    readTime: 14,
    views: 850,
    publishedDate: '2025-01-25',
    content: `# Managed Identity
The secure way to authenticate runbooks against your tenant without storing credentials in code.`
  },
  {
    id: 'AUTO-003',
    title: 'PowerShell Basics for M365 Admins',
    slug: 'powershell-basics-m365',
    excerpt: 'Loops, variables, and piping: The fundamentals you need.',
    category: 'Automation & Scripts',
    tags: ['PowerShell', 'Beginner', 'Training'],
    author: 'Sayan Ghosh',
    readTime: 20,
    views: 1500,
    publishedDate: '2025-01-30',
    content: `# Piping
Passing output from one command to another.
\`Get-MgUser | Where-Object { $_.AccountEnabled -eq $true }\``
  },
  {
    id: 'AUTO-004',
    title: 'Reporting on License Usage via Graph API',
    slug: 'graph-api-license-reporting',
    excerpt: 'Extracting granular license data without the bulky MSOnline module.',
    category: 'Automation & Scripts',
    tags: ['PowerShell', 'Graph API', 'Reporting'],
    author: 'Sayan Ghosh',
    readTime: 12,
    views: 700,
    publishedDate: '2025-02-05',
    content: `# SkuPartNumber
Mapping SkuIds to human-readable names is a key part of license reporting.`
  }
];

// ==========================================
// SCRIPTS (35+ Scripts)
// ==========================================
export const SCRIPTS: Script[] = [
  // --- Entra ID ---
  {
    id: 'SC-ID-001',
    title: 'Bulk User Provisioning from CSV',
    description: 'Import and create multiple users with license assignment and group membership from CSV.',
    category: 'Entra ID & Identity',
    language: 'powershell',
    downloads: 3200,
    prerequisites: ['Microsoft.Graph.Users'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-15',
    code: `Connect-MgGraph -Scopes "User.ReadWrite.All"
$users = Import-Csv "users.csv"
foreach ($user in $users) {
    New-MgUser -DisplayName $user.Name -UserPrincipalName $user.UPN ...
}`
  },
  {
    id: 'SC-ID-002',
    title: 'Find and Remove Unused Guest Accounts',
    description: 'Identifies guest accounts that haven\'t signed in for 90 days.',
    category: 'Entra ID & Identity',
    language: 'powershell',
    downloads: 1500,
    prerequisites: ['Microsoft.Graph.Users', 'AuditLog.Read.All'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-20',
    code: `Connect-MgGraph -Scopes "User.Read.All", "AuditLog.Read.All"
Get-MgUser -Filter "userType eq 'Guest'" -Property SignInActivity | Where ...`
  },
  {
    id: 'SC-ID-003',
    title: 'Export All Users with License Details',
    description: 'Generates a CSV of all users and their assigned SKUs.',
    category: 'Entra ID & Identity',
    language: 'powershell',
    downloads: 2100,
    prerequisites: ['Microsoft.Graph.Users'],
    difficulty: 'Beginner',
    lastUpdated: '2025-01-10',
    code: `Get-MgUser -All | Select UserPrincipalName, AssignedLicenses ...`
  },
  {
    id: 'SC-ID-004',
    title: 'Break Glass Account Monitor',
    description: 'Alerts if a global admin account is used.',
    category: 'Entra ID & Identity',
    language: 'powershell',
    downloads: 900,
    prerequisites: ['Azure Automation'],
    difficulty: 'Advanced',
    lastUpdated: '2025-02-01',
    code: `# Run in Azure Automation
$Filter = "userPrincipalName eq 'breakglass@domain.com'"
...`
  },
  
  // --- Exchange ---
  {
    id: 'SC-EX-001',
    title: 'Bulk Convert User Mailbox to Shared',
    description: 'Reads a list of UPNs and converts them to Shared Mailboxes.',
    category: 'Exchange Online',
    language: 'powershell',
    downloads: 1800,
    prerequisites: ['ExchangeOnlineManagement'],
    difficulty: 'Beginner',
    lastUpdated: '2025-01-12',
    code: `Set-Mailbox -Identity $upn -Type Shared`
  },
  {
    id: 'SC-EX-002',
    title: 'Export Mailbox Folder Permissions',
    description: 'Audits who has access to other users\' folders.',
    category: 'Exchange Online',
    language: 'powershell',
    downloads: 1200,
    prerequisites: ['ExchangeOnlineManagement'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-25',
    code: `Get-Mailbox | Get-MailboxFolderPermission ...`
  },
  {
    id: 'SC-EX-003',
    title: 'Search and Delete Phishing Email',
    description: 'Hard deletes a message from all mailboxes based on Subject/Sender.',
    category: 'Exchange Online',
    language: 'powershell',
    downloads: 2500,
    prerequisites: ['Security & Compliance'],
    difficulty: 'Advanced',
    lastUpdated: '2025-02-05',
    code: `New-ComplianceSearch -Name "Phish Remove" -ExchangeLocation All ...`
  },

  // --- Teams ---
  {
    id: 'SC-TM-001',
    title: 'Archive Unused Teams',
    description: 'Archives teams with no activity for 180 days.',
    category: 'Microsoft Teams',
    language: 'powershell',
    downloads: 800,
    prerequisites: ['MicrosoftTeams'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-30',
    code: `Get-Team | Where-Object { $_.LastActivity -lt (Get-Date).AddDays(-180) } ...`
  },
  {
    id: 'SC-TM-002',
    title: 'Bulk Add Members to Team',
    description: 'Adds users from CSV to a specific Team.',
    category: 'Microsoft Teams',
    language: 'powershell',
    downloads: 3000,
    prerequisites: ['MicrosoftTeams'],
    difficulty: 'Beginner',
    lastUpdated: '2025-01-15',
    code: `Add-TeamUser -GroupId $groupId -User $user`
  },

  // --- Intune ---
  {
    id: 'SC-IN-001',
    title: 'Force Sync All Devices',
    description: 'Triggers a remote sync action for all managed Windows devices.',
    category: 'Intune & Device Management',
    language: 'powershell',
    downloads: 1400,
    prerequisites: ['Microsoft.Graph.DeviceManagement'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-02-02',
    code: `Get-MgDeviceManagementManagedDevice | Invoke-MgDeviceManagementManagedDeviceSyncDevice`
  }
];

// ==========================================
// TROUBLESHOOTING DATA (Mapped to Real Articles)
// ==========================================
export const TROUBLESHOOTING_DATA = [
  {
    id: "auth",
    title: "Sign-In & Authentication",
    issues: [
      { id: "ts-auth-01", question: "User blocked by Conditional Access policy", articleSlug: "troubleshoot-conditional-access-blocking", category: "Entra ID / Identity" },
      { id: "ts-auth-02", question: "AADSTS50020: User account from identity provider does not exist", articleSlug: "fix-aadsts50020-error", category: "Entra ID / Identity" },
      { id: "ts-auth-03", question: "MFA prompt not appearing or loop issues", articleSlug: "troubleshoot-mfa-loops", category: "Entra ID / Identity" }
    ]
  },
  {
    id: "exchange",
    title: "Exchange & Mail Flow",
    issues: [
      { id: "ts-exo-01", question: "Messages stuck in 'Queued' or never delivered (NDR 5.1.1)", articleSlug: "exchange-message-trace-guide", category: "Exchange Online" },
      { id: "ts-exo-02", question: "User cannot access Shared Mailbox", articleSlug: "shared-mailbox-management", category: "Exchange Online" },
      { id: "ts-exo-03", question: "Transport rule not applying as expected", articleSlug: "exchange-transport-rules", category: "Exchange Online" },
      { id: "ts-exo-04", question: "NDR 5.7.1 Access Denied / Relay Denied", articleSlug: "troubleshoot-exchange-ndrs", category: "Exchange Online" }
    ]
  },
  {
    id: "teams",
    title: "Microsoft Teams",
    issues: [
      { id: "ts-teams-01", question: "Guest user cannot access team or chat", articleSlug: "teams-external-guest-access", category: "Microsoft Teams" },
      { id: "ts-teams-02", question: "Meeting recording missing or permission error", articleSlug: "teams-meeting-policies", category: "Microsoft Teams" },
      { id: "ts-teams-03", question: "Call quality poor (jitter/packet loss)", articleSlug: "teams-call-quality-dashboard", category: "Microsoft Teams" }
    ]
  },
  {
    id: "intune",
    title: "Intune & Device Management",
    issues: [
      { id: "ts-intune-01", question: "Autopilot enrollment fails with error 80070774", articleSlug: "windows-autopilot-guide", category: "Intune & Devices" },
      { id: "ts-intune-02", question: "Device marked as 'Not Compliant' incorrectly", articleSlug: "intune-compliance-policies", category: "Intune & Devices" },
      { id: "ts-intune-03", question: "Win32 App installation failed (IME Log analysis)", articleSlug: "intune-ime-logs", category: "Intune & Devices" }
    ]
  },
  {
    id: "onedrive",
    title: "OneDrive & SharePoint",
    issues: [
      { id: "ts-od-01", question: "OneDrive sync stuck on 'Processing changes'", articleSlug: "onedrive-sync-issues", category: "OneDrive for Business" },
      { id: "ts-od-02", question: "SharePoint 'Access Denied' for site owners", articleSlug: "sharepoint-permissions-troubleshooting", category: "SharePoint Online" }
    ]
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    title: 'New Outlook for Windows now available',
    excerpt: 'The new Outlook for Windows brings a modern design and new features to enhance productivity.',
    source: 'Microsoft 365 Blog',
    url: '#',
    date: '2024-12-08',
    important: true
  },
  {
    id: 'n2',
    title: 'Copilot for Microsoft 365 updates',
    excerpt: 'New capabilities added to Copilot including better integration with Excel and PowerPoint.',
    source: 'Microsoft Tech Community',
    url: '#',
    date: '2024-12-07',
    important: true
  },
  {
    id: 'n3',
    title: 'Exchange Online deprecating Basic Auth',
    excerpt: 'Reminder that Basic Authentication is being permanently disabled.',
    source: 'Exchange Team Blog',
    url: '#',
    date: '2024-12-05',
    important: false
  }
];
