
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
// TROUBLESHOOTING DATA
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
      { id: "ts-exo-03", question: "Transport rule not applying as expected", articleSlug: "exchange-transport-rules", category: "Exchange Online" }
    ]
  },
  {
    id: "teams",
    title: "Microsoft Teams",
    issues: [
      { id: "ts-teams-01", question: "Guest user cannot access team or chat", articleSlug: "teams-external-guest-access", category: "Microsoft Teams" },
      { id: "ts-teams-02", question: "Meeting recording missing or permission error", articleSlug: "teams-meeting-policies", category: "Microsoft Teams" },
      { id: "ts-teams-03", question: "Dial pad missing for user", articleSlug: "teams-voice-admin", category: "Microsoft Teams" }
    ]
  },
  {
    id: "intune",
    title: "Intune & Device Management",
    issues: [
      { id: "ts-intune-01", question: "Autopilot enrollment fails with error 80070774", articleSlug: "windows-autopilot-guide", category: "Intune & Devices" },
      { id: "ts-intune-02", question: "Device marked as 'Not Compliant' incorrectly", articleSlug: "intune-compliance-policies", category: "Intune & Devices" },
      { id: "ts-intune-03", question: "Win32 App installation failed (IME Log analysis)", articleSlug: "intune-app-management", category: "Intune & Devices" }
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

// ==========================================
// ARTICLES (Complete)
// ==========================================
export const ARTICLES: Article[] = [
  // --- Exchange Online ---
  {
    id: 'EXO-001',
    title: 'Exchange Online Message Trace: The Complete End-to-End Guide',
    slug: 'exchange-message-trace-guide',
    excerpt: 'Master the essential tool for troubleshooting mail flow, investigating delivery failures, and analyzing transport rules in Exchange Online.',
    category: 'Exchange Online',
    tags: ['Exchange', 'Troubleshooting', 'Mail Flow', 'PowerShell'],
    author: 'Sayan Ghosh',
    readTime: 12,
    views: 1540,
    publishedDate: '2024-12-10',
    coverImage: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1000&q=80',
    series: 'Exchange Mail Flow Troubleshooting Week',
    content: `
# Overview

Message trace is one of the most essential tools for any Exchange Online administrator. Whether a user reports "My email didn't go through," or security teams are investigating spoofing, spam, or transport anomalies — message trace provides the underlying SMTP flow and delivery status.

This guide explains **how Exchange Online processes mail**, how message trace works, the difference between **real-time** and **historical** tracing, and how to use both the **Admin Center** and **PowerShell** to identify mail flow issues quickly.

## Why Message Trace Matters

Message trace allows you to:

* Validate inbound/outbound mail delivery
* Troubleshoot missing or delayed messages
* Identify rule-based actions (transport rules, DLP, anti-spam decisions)
* Confirm mailbox forwarding, redirection, or automatic processing
* Investigate spoof or compromised accounts
* Provide evidence to end-users or auditors

In enterprise environments, message trace is essential for **compliance investigations**, **security incident handling**, and **mail flow optimization**.

## How Exchange Online Processes Mail (High-Level)

Understanding the pipeline helps interpret trace results.

1. **Submission** → User/client submits mail to Exchange Online
2. **Transport Rules** → Policies evaluate the message
3. **Anti-Spam / Anti-Malware Checks**
4. **Routing Decision** → Internal, external, hybrid, or remote domain
5. **Mailbox Delivery** → Store driver hands off to mailbox
6. **Client Access** → Message appears in Outlook/OWA

Message trace reflects these stages, showing **where delays, rejections, deferrals, or policy actions occurred**.

## Running Message Trace from the Admin Center

### Steps

1. Go to **https://admin.exchange.microsoft.com**
2. Navigate to **Mail flow → Message trace**
3. Choose a trace type:
   * **30 minutes / 1 hour / 24 hours** → near real-time
   * **Custom range (up to 90 days)** → historical
4. Enter:
   * Sender
   * Recipient
   * Date range
   * Delivery status
   * Direction (Inbound / Outbound / Internal)

### Interpreting Status

| Status | Meaning |
|--------|---------|
| **Delivered** | Message successfully reached mailbox/recipient server |
| **Failed** | Rejected by policy, spam filter, or destination server |
| **Expanded** | Sent to group members (DL/M365 Group) |
| **Filtered as spam** | Moved to Junk/Quarantine |
| **Deferred** | Temporary delivery issue (retrying) |
| **Quarantined** | Classified as high-confidence spam/malware |
| **Resolved** | Redirected due to forwarding/alias |

## Using PowerShell for Detailed Tracing

### Connect to Exchange Online

\`\`\`powershell
Connect-ExchangeOnline
\`\`\`

### Basic trace

\`\`\`powershell
Get-MessageTrace -Sender "user@domain.com" -StartDate (Get-Date).AddDays(-2) -EndDate (Get-Date)
\`\`\`

### Advanced trace (with events)

\`\`\`powershell
Get-MessageTrace -MessageTraceId <ID> -RecipientAddress <address> | Get-MessageTraceDetail
\`\`\`

### Find all mail failing in last 24 hours

\`\`\`powershell
Get-MessageTrace -StartDate (Get-Date).AddDays(-1) -EndDate (Get-Date) -Status Failed | 
    Select SenderAddress, RecipientAddress, Subject, Status
\`\`\`

PowerShell gives **granular visibility**, especially for bulk investigations or automation workflows.

## Best Practices for Effective Message Tracing

* Always expand results (summary isn't enough)
* For sensitive investigations, use **MessageTraceDetail**
* Download CSV for audit documentation
* Create PowerShell scripts for recurring operational traces
* Enable **Advanced Delivery** for third-party phishing simulations
* Train support teams to triage basic traces before escalating

## Summary

Message trace is the backbone of Exchange Online troubleshooting. Mastering it allows admins to quickly validate delivery issues, interpret SMTP processing, and provide evidence-based explanations to users and security teams.
`
  },
  {
    id: 'EXO-002',
    title: 'Shared Mailboxes in Exchange Online: Provisioning, Governance & Troubleshooting',
    slug: 'shared-mailbox-management',
    excerpt: 'A comprehensive guide to creating, managing, and securing shared mailboxes in Microsoft 365.',
    category: 'Exchange Online',
    tags: ['Exchange', 'Shared Mailbox', 'Governance'],
    author: 'Sayan Ghosh',
    readTime: 15,
    views: 1200,
    publishedDate: '2024-12-15',
    coverImage: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Shared mailboxes are a staple of Microsoft 365 administration, providing a generic email address (like info@company.com) that multiple users can access.

## Provisioning

Shared mailboxes can be created via the M365 Admin Center or PowerShell.

\`\`\`powershell
New-Mailbox -Shared -Name "Sales Team" -DisplayName "Sales Team" -Alias "sales"
\`\`\`

## Permissions

* **Full Access**: Can open the mailbox and act as the owner.
* **Send As**: Can send email appearing to come directly from the mailbox.
* **Send on Behalf**: Sent "on behalf of" the mailbox.

## Troubleshooting

Common issues include:
1. **Automapping not working**: Sometimes requires removing and re-adding permissions with \`-AutoMapping $false\` and then \`$true\`.
2. **Licensing errors**: Shared mailboxes under 50GB do not need a license, but if they exceed this or need an Archive, they require an Exchange Online Plan 2 license.

## Best Practices

* Do not use shared mailboxes for direct login; always disable the user account associated with it.
* Use security groups for permission management to simplify administration.
`
  },
  {
    id: 'EXO-003',
    title: 'Exchange Online Transport Rules: Architecture, Security Controls & Best Practices',
    slug: 'exchange-transport-rules',
    excerpt: 'Learn how to design, prioritize, and troubleshoot mail flow rules for compliance and security.',
    category: 'Exchange Online',
    tags: ['Exchange', 'Transport Rules', 'Security'],
    author: 'Sayan Ghosh',
    readTime: 14,
    views: 980,
    publishedDate: '2024-12-20',
    coverImage: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=1000&q=80',
    series: 'Exchange Mail Flow Troubleshooting Week',
    content: `
# Introduction

Mail flow rules (also known as transport rules) identify and take action on messages that flow through your Exchange Online organization.

## Architecture

Rules are processed in priority order (0, 1, 2...). If a rule has the "Stop processing more rules" action, subsequent rules are ignored.

## Common Scenarios

1. **Disclaimers**: Appending legal text to outbound mail.
2. **Block Lists**: Rejecting mail from specific domains or containing sensitive keywords.
3. **Encryption**: Applying OME (Office 365 Message Encryption) based on subject keywords like "Secure".

## Troubleshooting

Use **Test-Message** in PowerShell or the "Test rule" feature in the Exchange Admin Center to validate logic before enabling rules in production.
`
  },

  // --- Microsoft Teams ---
  {
    id: 'TEAMS-001',
    title: 'Microsoft Teams Meeting Policies: Architecture, Configuration & Best Practices',
    slug: 'teams-meeting-policies',
    excerpt: 'Configuring secure and productive meeting environments: lobby controls, recording policies, and screen sharing.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Governance', 'Meetings'],
    author: 'Sayan Ghosh',
    readTime: 14,
    views: 890,
    publishedDate: '2024-12-12',
    coverImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Meeting policies in Microsoft Teams control the features available to meeting participants for meetings scheduled by users in your organization.

## Key Controls

* **Lobby settings**: Who can bypass the lobby (Everyone, People in my org, Trusted orgs).
* **Cloud recording**: Whether the "Start recording" button is available.
* **Content sharing**: Screen sharing mode (Entire screen, Single window, or Disabled).

## Policy Precedence

Policies are assigned to users. The global (Org-wide default) policy applies unless a custom policy is assigned directly or via a group policy assignment.

## Troubleshooting

If a user cannot record:
1. Check if their assigned Meeting Policy has "Allow cloud recording" set to On.
2. Verify they have a valid license (Teams + Stream storage/OneDrive).
3. Ensure they are not in a region where recording is disabled.
`
  },
  {
    id: 'TEAMS-002',
    title: 'Teams External Access & Guest Access: Governance, Controls & Troubleshooting',
    slug: 'teams-external-guest-access',
    excerpt: 'Understanding the difference between External (Federation) and Guest access, and how to secure both.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Security', 'Guests'],
    author: 'Sayan Ghosh',
    readTime: 15,
    views: 1100,
    publishedDate: '2025-01-05',
    coverImage: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1000&q=80',
    content: `
# Difference Between External and Guest Access

* **External Access (Federation)**: Allows you to chat and call with users in other organizations. They do not have access to your teams or files.
* **Guest Access**: Allows you to invite people from outside your organization to join a Team. They get a guest account in your directory and can access files and chats within that Team.

## Configuration

Both are controlled in the Teams Admin Center under "Users" -> "External access" and "Guest access".

## Troubleshooting

**Problem**: Guest cannot be invited.
**Fix**:
1. Check Entra ID External Collaboration settings.
2. Ensure "Allow guest access in Teams" is On.
3. Verify M365 Groups settings allow guests.
`
  },
  {
    id: 'TEAMS-003',
    title: 'Teams App Permission Policies: Governance, Security & App Lifecycle',
    slug: 'teams-app-permissions',
    excerpt: 'Managing third-party and custom apps in Teams. Allow/Block lists and risk assessment.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Apps', 'Governance'],
    author: 'Sayan Ghosh',
    readTime: 14,
    views: 750,
    publishedDate: '2025-01-08',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Teams apps extend the capabilities of the platform. Admins must balance productivity with security.

## Permission Policies

App permission policies control which apps are available to specific users. You can:
* Allow all apps
* Allow specific apps and block others
* Block specific apps and allow others

## Setup Policies

Setup policies control which apps are pinned to the app bar (left rail) and installed automatically for users.

## Best Practices

* Regularly review "Global" org-wide app settings.
* Use "Org-wide app settings" to disable third-party apps by default if you have strict compliance needs.
`
  },
  {
    id: 'TEAMS-004',
    title: 'Teams Voice Administration & Call Routing Essentials',
    slug: 'teams-voice-admin',
    excerpt: 'A guide to Teams Phone System: Calling Plans, Direct Routing, Auto Attendants, and Call Queues.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Voice', 'Phone System'],
    author: 'Sayan Ghosh',
    readTime: 16,
    views: 920,
    publishedDate: '2025-01-12',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
    series: 'Teams Voice Runbooks',
    content: `
# Teams Phone System

Teams Phone allows users to make and receive PSTN calls.

## Connectivity Options

1. **Microsoft Calling Plans**: Microsoft is the carrier. Easiest to set up.
2. **Direct Routing**: Bring your own SIP trunk/carrier (SBC required).
3. **Operator Connect**: Carrier integration directly into Teams Admin Center.

## Call Queues & Auto Attendants

* **Auto Attendants**: "Press 1 for Sales, 2 for Support". Uses resource accounts.
* **Call Queues**: Distributes calls to agents (Round robin, Serial, Longest idle).

## Troubleshooting Missing Dial Pad

If a user is missing the dial pad:
1. Verify "Phone System" license is assigned.
2. Ensure Enterprise Voice is enabled (\`Set-CsPhoneNumberAssignment -EnterpriseVoiceEnabled $true\`).
3. Check if a phone number or Calling Plan is assigned.
`
  },

  // --- Intune & Devices ---
  {
    id: 'INTUNE-001',
    title: 'Intune Device Configuration Profiles: Architecture & Best Practices',
    slug: 'intune-device-config',
    excerpt: 'Implementing security baselines, hardening configurations, and feature controls for Windows, macOS, and mobile.',
    category: 'Intune & Devices',
    tags: ['Intune', 'Configuration', 'Windows'],
    author: 'Sayan Ghosh',
    readTime: 15,
    views: 1800,
    publishedDate: '2025-01-10',
    coverImage: 'https://images.unsplash.com/photo-1517430816045-df4b7de8db21?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Configuration profiles are the heart of MDM. They push settings to devices, such as Wi-Fi profiles, BitLocker settings, and Kiosk modes.

## Profile Types

* **Settings Catalog**: The modern way to configure settings. Searchable database of all available OS settings.
* **Templates**: Legacy predefined groups of settings (e.g., "Device restrictions").
* **Administrative Templates (ADMX)**: Similar to Group Policy objects.

## Conflict Resolution

If two profiles conflict (e.g., one says Allow Camera, one says Block), Intune typically takes the most restrictive option, or reports a "Conflict" state requiring admin intervention.

## Best Practices

* Use **Security Baselines** as a starting point but test thoroughly.
* Separate user-based settings from device-based settings.
`
  },
  {
    id: 'INTUNE-002',
    title: 'Intune Compliance Policies: Architecture, Enforcement & Conditional Access',
    slug: 'intune-compliance-policies',
    excerpt: 'Defining device health requirements and enforcing them via Conditional Access.',
    category: 'Intune & Devices',
    tags: ['Intune', 'Compliance', 'Security'],
    author: 'Sayan Ghosh',
    readTime: 16,
    views: 1600,
    publishedDate: '2025-01-14',
    coverImage: 'https://images.unsplash.com/photo-1563206767-5b1d97289374?auto=format&fit=crop&w=1000&q=80',
    content: `
# Compliance Policies

Compliance policies evaluate a device's health. They do NOT change settings (that's configuration profiles). They simply report "Compliant" or "Not Compliant".

## Common Checks

* **BitLocker**: Is the drive encrypted?
* **OS Version**: Is the OS up to date?
* **Antivirus**: Is Defender/AV running and updated?
* **Jailbreak/Root**: For mobile devices.

## Integration with Conditional Access

The real power comes when linking to Entra ID Conditional Access.
* Policy: "Require device to be marked as compliant".
* Result: If a device fails compliance (e.g., firewall off), the user cannot access corporate data (Teams/Outlook) until fixed.

## Troubleshooting

**Issue**: Device shows "Not Compliant" but settings look correct.
**Fix**: Check the "Device compliance" blade for the specific device to see *which* setting failed. Often it is a "System security" setting like a password complexity requirement or grace period.
`
  },
  {
    id: 'INTUNE-003',
    title: 'Windows Autopilot: Deployment Models, Architecture & Troubleshooting',
    slug: 'windows-autopilot-guide',
    excerpt: 'Zero-touch provisioning explained: User-Driven, Self-Deploying, and Pre-Provisioned modes.',
    category: 'Intune & Devices',
    tags: ['Intune', 'Autopilot', 'Deployment'],
    author: 'Sayan Ghosh',
    readTime: 16,
    views: 2100,
    publishedDate: '2025-01-18',
    coverImage: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=1000&q=80',
    series: 'Intune Enrollment Deep Dive (5 parts)',
    content: `
# Windows Autopilot

Autopilot simplifies the OOBE (Out of Box Experience) for users, joining the device to Entra ID and enrolling in Intune automatically.

## Deployment Modes

1. **User-Driven**: User unboxes, connects to Wi-Fi, enters creds. Device configures itself.
2. **Self-Deploying**: No user interaction required (Kiosks/Digital Signage).
3. **Pre-Provisioned (White Glove)**: IT or OEM provisions the apps/settings *before* shipping to the user.

## Troubleshooting Error 80070774

This generic error often means "Controller not found" or network/domain reachability issues during Hybrid Join.
* Ensure the device can reach the domain controller if doing Hybrid Join (VPN required if remote).
* For Entra ID Join (Cloud native), check internet connectivity and ensuring the user has an Intune license.
`
  },
  {
    id: 'INTUNE-004',
    title: 'Intune Application Management: Win32 Apps, Deployment Rings & Troubleshooting',
    slug: 'intune-app-management',
    excerpt: 'Packaging and deploying Win32 apps using IntuneWinAppUtil. Detection rules and supersedence.',
    category: 'Intune & Devices',
    tags: ['Intune', 'Apps', 'Win32'],
    author: 'Sayan Ghosh',
    readTime: 17,
    views: 1400,
    publishedDate: '2025-01-22',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    content: `
# Win32 App Management

To deploy .exe or complex .msi installers, you wrap them as \`.intunewin\` files using the Microsoft Win32 Content Prep Tool.

## Key Components

1. **Install Command**: \`setup.exe /quiet\`
2. **Uninstall Command**: \`msiexec /x {GUID} /q\`
3. **Detection Rule**: How Intune knows the app installed successfully. Usually a file path or Registry key existence.

## Troubleshooting IME (Intune Management Extension)

Logs are located at: \`C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\\IntuneManagementExtension.log\`.
Search for the app GUID or "Win32App" to see download status, hash validation, and execution exit codes.
`
  },
  
  // --- Entra ID / Identity ---
  {
    id: 'ENTRA-001',
    title: 'Troubleshooting Conditional Access Blocking & Policy Gaps',
    slug: 'troubleshoot-conditional-access-blocking',
    excerpt: 'How to use Sign-in logs and What If tool to diagnose why a user is blocked or not prompted for MFA.',
    category: 'Entra ID / Identity',
    tags: ['Entra ID', 'Security', 'Conditional Access'],
    author: 'Sayan Ghosh',
    readTime: 10,
    views: 1300,
    publishedDate: '2025-01-25',
    content: `
# Diagnosing Sign-in Issues

When a user reports they are blocked ("You cannot access this right now"), it is usually Conditional Access.

## The "What If" Tool

Located in **Entra Admin Center > Protect & Secure > Conditional Access > What If**.
Simulate a sign-in with the user's details to see which policies would apply.

## Sign-in Logs

Go to **Users > Sign-in logs**.
Find the "Failure" entry. Click **Conditional Access** tab to see which policy result was "Failure" (blocking) or "Success" (satisfied).

**Common Blocker**: "Block Legacy Authentication" policy applied to a modern client failing to pass modern tokens.
`
  },
  {
    id: 'ENTRA-002',
    title: 'Fixing AADSTS50020 and Guest Access Issues',
    slug: 'fix-aadsts50020-error',
    excerpt: 'Deep dive into B2B collaboration errors, tenant switching, and identity provider mismatches.',
    category: 'Entra ID / Identity',
    tags: ['Entra ID', 'Guests', 'Errors'],
    author: 'Sayan Ghosh',
    readTime: 12,
    views: 950,
    publishedDate: '2025-01-26',
    content: `
# AADSTS50020

Error: *"User account from identity provider does not exist in tenant..."*

## Causes

1. **Invitation not redeemed**: The user hasn't clicked the link in the invite email.
2. **Wrong Tenant**: The user is trying to log into their own tenant instead of the resource tenant (check the URL for \`tenantid\` or domain hint).
3. **Personal vs Work Account**: User is signing in with a personal MSA (outlook.com) when the invite was sent to their Work address, or vice versa.

## Resolution

* Resend the invitation.
* Ask the user to use an Incognito window to avoid cached credentials.
* Ensure they use the specific tenant URL: \`https://portal.azure.com/TENANT-DOMAIN-NAME\`.
`
  },
  {
    id: 'ENTRA-003',
    title: 'Troubleshooting MFA Loops and Registration Failures',
    slug: 'troubleshoot-mfa-loops',
    excerpt: 'Resolving infinite loops during MFA prompts and Authenticator app registration issues.',
    category: 'Entra ID / Identity',
    tags: ['Entra ID', 'MFA', 'Troubleshooting'],
    author: 'Sayan Ghosh',
    readTime: 8,
    views: 1150,
    publishedDate: '2025-01-28',
    content: `
# MFA Loops

Infinite loops usually occur due to:
* **Time sync issues** on the device/server.
* **Browser cookies** (session token mismatch).
* **Conditional Access** requiring a re-auth that fails immediately.

## Fixes

1. Clear browser cache/cookies.
2. Check device time settings.
3. Use the "Revoke MFA sessions" button in the user's Entra profile to force a clean re-registration.
4. If using the Authenticator app, ensure battery optimization isn't killing the background push process.
`
  },
  
  // --- OneDrive ---
  {
    id: 'OD-001',
    title: 'OneDrive Sync Health: Diagnosing Stuck Sync & Processing Changes',
    slug: 'onedrive-sync-issues',
    excerpt: 'Advanced troubleshooting for the OneDrive sync client, including reset commands and log analysis.',
    category: 'OneDrive for Business',
    tags: ['OneDrive', 'Sync', 'Troubleshooting'],
    author: 'Sayan Ghosh',
    readTime: 11,
    views: 1600,
    publishedDate: '2025-01-30',
    content: `
# OneDrive Sync Issues

"Processing changes" indefinitely is a classic headache.

## Quick Fixes

1. **Check File Names**: Look for unsupported characters (\`" * : < > ? / \\\`) or extremely long paths (> 400 chars).
2. **Reset OneDrive**:
   Run \`%localappdata%\\Microsoft\\OneDrive\\onedrive.exe /reset\`
   This does not redownload data but rebuilds the sync database.
3. **Check Libraries**: Are they syncing 300,000+ files? Performance degrades significantly at that scale.

## Logs

Collect logs via the OneDrive icon > Help & Settings > Report a problem, or look at \`%localappdata%\\Microsoft\\OneDrive\\logs\`.
`
  },
  
  // --- SharePoint ---
  {
    id: 'SP-001',
    title: 'SharePoint Permissions Matrix & Troubleshooting Access Denied',
    slug: 'sharepoint-permissions-troubleshooting',
    excerpt: 'Understanding inheritance, unique permissions, and the "Check Permissions" tool.',
    category: 'SharePoint Online',
    tags: ['SharePoint', 'Permissions', 'Security'],
    author: 'Sayan Ghosh',
    readTime: 13,
    views: 1050,
    publishedDate: '2025-02-01',
    content: `
# Access Denied

When a user should have access but gets denied.

## The "Check Permissions" Tool

Go to **Site Settings > Site Permissions > Check Permissions**. Enter the user's name.
This tells you *how* they have access (Group membership, direct assignment) or if they have none.

## Limited Access Lockdown Mode

If this site feature is enabled, "Limited Access" users (who maybe only have access to one file) might lose access to application pages or lists. Disable it if granular sharing is breaking.
`
  }
];

// ~55 knowledge base articles, ~25 scripts as of 2025-12-09

export const SCRIPTS: Script[] = [
  // --- Entra ID Scripts ---
  {
    id: 'SC-ID-001',
    title: 'Bulk User Provisioning from CSV',
    description: 'Import and create multiple users with license assignment and group membership from CSV file',
    category: 'Entra ID & Identity',
    language: 'powershell',
    downloads: 3200,
    prerequisites: ['Microsoft.Graph.Users'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-15',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    code: `<# 
.SYNOPSIS
    Bulk User Creation
.DESCRIPTION
    Creates users from CSV, assigns password, license, and adds to groups.
#>
Import-Csv "users.csv" | ForEach-Object {
    $password = @{ Password = "ChangeMe123!"; ForceChangePasswordNextSignIn = $true }
    New-MgUser -DisplayName $_.Name -UserPrincipalName $_.UPN -PasswordProfile $password -AccountEnabled $true -UsageLocation "US"
}`
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
