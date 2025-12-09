import { Article, Script, Category, NewsItem } from './types';

// ==========================================
// CATEGORIES
// ==========================================
export const CATEGORIES: Category[] = [
  { id: '1', name: 'Exchange Online', slug: 'exchange', description: 'Mail flow, transport rules, and troubleshooting', iconName: 'Envelope', count: 3, color: '#0078D4' },
  { id: '2', name: 'Microsoft Teams', slug: 'teams', description: 'Voice, meetings, and external access governance', iconName: 'Users', count: 4, color: '#6264A7' },
  { id: '3', name: 'Intune & Devices', slug: 'intune', description: 'Autopilot, config profiles, and compliance', iconName: 'Device', count: 4, color: '#00BCF2' },
  { id: '4', name: 'Entra ID / Identity', slug: 'entra-id', description: 'Identity lifecycle, PIM, and Conditional Access', iconName: 'Identity', count: 3, color: '#50E6FF' },
  { id: '5', name: 'Security & Compliance', slug: 'security', description: 'DLP, eDiscovery, and Defender for Endpoint', iconName: 'Shield', count: 6, color: '#00B294' },
  { id: '6', name: 'SharePoint Online', slug: 'sharepoint', description: 'Information architecture and file management', iconName: 'SharePoint', count: 3, color: '#036C70' },
  { id: '7', name: 'OneDrive for Business', slug: 'onedrive', description: 'Sync, sharing, and KFM', iconName: 'Cloud', count: 3, color: '#0078D4' },
  { id: '8', name: 'Reporting & Power Platform', slug: 'reporting', description: 'Power BI dashboards and usage analytics', iconName: 'BarChart', count: 13, color: '#F2C811' },
  { id: '9', name: 'Automation & Scripts', slug: 'automation', description: 'PowerShell, Graph API, and workflows', iconName: 'Terminal', count: 16, color: '#742774' },
];

// ==========================================
// ARTICLES (55 Total)
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
    author: 'Sayan (Admin)',
    readTime: 12,
    views: 1540,
    publishedDate: '2024-12-10',
    coverImage: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1000&q=80',
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

## Common Issues and How to Diagnose Them

### A) User says "I didn't receive the email"

Check:
* Junk folder
* Quarantine
* Transport rules
* Forwarding or delegates
* Large attachment rejections

### B) Email delayed

Look for:
* **Deferred** events
* High load on remote servers
* Anti-spam filtering retries

### C) Email rejected

Check:
* SPF/DMARC failures
* Malware detection
* Org policies (restricted domains, blocked senders)

### D) Missing emails to Distribution Lists

Check:
* DL moderation
* Message approval
* MailTips warnings
* Group membership sync delays

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
    author: 'Sayan (Admin)',
    readTime: 15,
    views: 1200,
    publishedDate: '2024-12-15',
    coverImage: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Shared mailboxes remain one of the most widely used collaboration components in Microsoft 365. They support ticketing teams, sales groups, HR, finance, and cross-functional departments that rely on centralized communication.

This guide covers everything an admin needs: creation, permissions, best practices, limits, governance, and troubleshooting.

## What Is a Shared Mailbox?

A shared mailbox:

* Does **not** require a license (under 50GB)
* Cannot be logged into directly
* Is accessed through permissions (Full Access / Send As / Send on Behalf)
* Enables multiple users to send/receive mail as a team

With Automatic Reply, rules, mailbox delegation, and auditing, shared mailboxes are foundational to enterprise communication.

## Creating a Shared Mailbox

### Admin Center

1. Go to **https://admin.exchange.microsoft.com**
2. Navigate to **Recipients → Shared**
3. Click **Add a shared mailbox**
4. Provide:
   * Display name
   * Email address
   * Assign members

### PowerShell

\`\`\`powershell
New-Mailbox -Shared -Name "HR Support" -PrimarySmtpAddress "hrsupport@domain.com"
\`\`\`

## Assigning Permissions

There are three permission types:

### Full Access

Allows viewing, editing, deleting emails.

\`\`\`powershell
Add-MailboxPermission -Identity "HR Support" -User john@domain.com -AccessRights FullAccess -AutoMapping $true
\`\`\`

### Send As

Mailbox appears as the shared address in **From**.

\`\`\`powershell
Add-RecipientPermission -Identity "HR Support" -Trustee john@domain.com -AccessRights SendAs
\`\`\`

### Send on Behalf

Shows sender as "John on behalf of HR Support."

\`\`\`powershell
Set-Mailbox -Identity "HR Support" -GrantSendOnBehalfTo john@domain.com
\`\`\`

## Storage, Licensing & Limits

* Up to **50GB** — no license required
* Over **50GB** — requires Exchange Online Plan 2 or archive license
* Shared mailboxes older than 30 days **must** be licensed if users log in directly (rare scenario)

Enable archiving for long-term retention:

\`\`\`powershell
Enable-Mailbox -Identity "HR Support" -Archive
\`\`\`

## Auto-Mapping Behavior

When Full Access is assigned with AutoMapping, Outlook automatically loads the mailbox.

Disable automapping for performance reasons:

\`\`\`powershell
Add-MailboxPermission -Identity "HR Support" -User john@domain.com -AccessRights FullAccess -AutoMapping $false
\`\`\`

## Common Operational Tasks

### Add alias

\`\`\`powershell
Set-Mailbox "HR Support" -EmailAddresses @{add="hr.help@domain.com"}
\`\`\`

### Enable automatic replies

\`\`\`powershell
Set-MailboxAutoReplyConfiguration -Identity "HR Support" -AutoReplyState Enabled -InternalMessage "We received your email."
\`\`\`

### Configure mailbox rules

Rules can automate routing, categorization, and forwarding.

## Troubleshooting Shared Mailbox Issues

### Issue: Shared mailbox not appearing in Outlook

* Remove/re-add permissions
* Ensure AutoMapping = true
* Clear Outlook cache
* Check licensing if mailbox exceeds 50GB

### Issue: Users can't send as the mailbox

* Confirm **SendAs** permission
* Check for permission replication delay (up to 2 hours)
* Verify the client is selecting the correct "From"

### Issue: Emails missing or overwritten

* Verify automapping conflicts
* Check conflicting rules
* Check delegates with excessive permissions

### Issue: Delivery management restrictions

Shared mailboxes may block external senders depending on configuration.

## Governance Best Practices

* Maintain a **permission roster** for auditing
* Avoid giving Full Access to large groups
* Use naming conventions for shared mailboxes
* Enable audit logs and mailbox auditing
* Archive old mailboxes to reduce clutter
* Document ownership and purpose

## Summary

Shared mailboxes are simple to deploy but require disciplined governance to prevent permission sprawl, performance issues, or data leakage. With proper configuration and automation, they can operate efficiently across large teams.
`
  },
  {
    id: 'EXO-003',
    title: 'Exchange Online Transport Rules: Architecture, Security Controls & Best Practices',
    slug: 'exchange-transport-rules',
    excerpt: 'Learn how to design, prioritize, and troubleshoot mail flow rules for compliance and security.',
    category: 'Exchange Online',
    tags: ['Exchange', 'Transport Rules', 'Security'],
    author: 'Sayan (Admin)',
    readTime: 14,
    views: 980,
    publishedDate: '2024-12-20',
    coverImage: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Transport rules ("mail flow rules") allow administrators to enforce messaging policies as mail traverses Exchange Online. They can handle compliance, routing, disclaimers, classification, encryption, DLP-lite functionality, blocking patterns, and more.

This article covers **rule design**, **priority management**, **security implications**, **common enterprise patterns**, and **troubleshooting**.

## Where Transport Rules Fit in Mail Flow

Transport rules run **after the message is submitted** and **before** delivery.

Key stages:

1. Message submission
2. Transport rule evaluation
3. Anti-spam/anti-malware scanning
4. Routing decision
5. Delivery or rejection

Rules can modify headers, redirect mail, enforce conditions, or reject mail entirely.

## Creating Transport Rules

### Admin Center

1. Go to **Mail flow → Rules**
2. Click **Add Rule**
3. Choose:
   * Condition(s)
   * Action(s)
   * Exceptions
   * Priority

### PowerShell

\`\`\`powershell
New-TransportRule -Name "Block Executables" \`
    -AttachmentExtensionMatchesWords @("exe","bat","cmd") \`
    -RejectMessageReasonText "Executable files are not allowed."
\`\`\`

## Key Conditions & Patterns

Common conditions:

### Sender-based

* Inside organization
* Outside organization
* Specific domain or user

### Recipient-based

* Group
* DL
* External recipients

### Content-based

* Keywords, sensitivity, patterns
* Attachments
* Message headers

### Security-based

* SPF/DMARC fail
* Encryption status

## Common Enterprise Transport Rule Use Cases

### A) Block risky attachments

> Attachment extension matches: exe, js, vbs
> Action: Reject or quarantine

### B) Enforce disclaimers

Apply HTML footer for all external mail.

### C) Redirect mail for monitoring

Forward VIP messages to an assistant or security shared mailbox.

### D) Restrict outbound external mail

Useful for finance, HR, or internal departments.

### E) Enforce TLS or encryption

If sensitivity labels are in place, transport rules can ensure proper encryption flows.

### F) Tag external emails (EXT subject tag)

For improved user awareness.

## Prioritizing and Managing Transport Rules

Transport rules run **top to bottom**.

Recommendations:

* Group rules by category (security, routing, disclaimers)
* Avoid conflicting rules
* Use "Stop processing more rules" when needed
* Perform rule clean-ups at least twice a year
* Document purpose and owner of every rule

## Logging & Troubleshooting Transport Rule Actions

### Message Trace

Shows applied actions:
* Modified
* Redirected
* Rejected
* DLP match

### Header Analysis

Look for:
* X-MS-Exchange-Transport-Rules-Loop
* X-MS-Exchange-Organization-* headers

### PowerShell

\`\`\`powershell
Get-TransportRuleAction -Identity "Rule Name"
Get-TransportRulePredicate -Identity "Rule Name"
\`\`\`

Common issues:
* Rules not applying → incorrect condition
* Rule conflict → priority issue
* Delay in effect → replication (10–20 minutes)

## Governance Recommendations

* Keep rule count minimal — avoid "set it and forget it"
* Maintain a rule inventory spreadsheet
* Document business justification for each rule
* Revalidate rules after every major org or compliance change
* Monitor false positives in DLP-like rules

## Summary

Transport rules are a powerful mechanism in Exchange Online. With proper design, documentation, and monitoring, they help enforce compliance, reduce risk, and streamline organizational messaging behavior.
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
    author: 'Sayan (Admin)',
    readTime: 14,
    views: 890,
    publishedDate: '2024-12-12',
    coverImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Meeting policies in Microsoft Teams define *what users can do* during a meeting—scheduling, presentation controls, screen sharing, recording, lobby behavior, breakout rooms, transcription, and more.

Incorrect or unstandardized meeting policies are one of the biggest causes of:

* Inconsistent end-user experience
* Governance issues
* Accidental data exposure
* Support tickets

This guide breaks down **how meeting policies work**, **priority & inheritance**, **recommended enterprise settings**, **PowerShell automation**, and **troubleshooting real-world policy conflicts**.

## How Meeting Policies Work

Meeting policies operate at three layers:

### 1. Global (Org-wide default)

Applied to all users by default unless overridden.

### 2. Custom policies

Created for departments, roles, VIPs, or restricted environments.

### 3. Special-purpose policies

For EDU, Frontline Workers, or heavily restricted groups.

Meeting policies *do not* apply to the meeting organizer retroactively. If a user's meeting policy changes after scheduling, **future meetings** inherit the new settings, but **existing meetings maintain old behavior**.

## Key Settings Inside Meeting Policies

### a. Scheduling & Restrictions

* Allow scheduling
* Allow channel meetings
* Allow Meet Now
* Anonymous join (important for external collaboration)

### b. Content Sharing Controls

* Screen sharing
* Window/application sharing only
* PowerPoint Live
* Whiteboard
* Annotation (optional)

### c. Audio & Video Controls

* Allow IP audio
* Allow IP video
* Allow cloud recording
* Allow transcription
* Noise suppression

### d. Participants & Lobby

* Bypass lobby options
* Who can present?
* Allow mic/camera for attendees

### e. Engagement

* Reactions
* Chat in meetings
* Q&A
* Meeting registration

## Best-Practice Policy Structure

### Policy 1 — Standard Users (Default)

Most users fall under this.

* Allow scheduling
* Allow external join
* Allow screen sharing
* Recording allowed
* Transcription allowed
* Presenter = "People in org"
* Allow chat reactions

### Policy 2 — Restricted Meetings (High-security departments)

For Finance, HR, Audit, Legal.

* External join: disabled
* Recording: disabled
* Screen sharing: disabled or "Window only"
* Presenter: Organizer only
* Chat during meetings: disabled
* Lobby bypass: none

### Policy 3 — Anonymous & External Meetings

For marketing, pre-sales, events.

* Allow anonymous join
* Allow external presenters
* Recording enabled
* Transcription enabled

### Policy 4 — Executive/VIP Enhanced

For leadership who run large meetings.

* Presenter = Organizer + Co-organizers
* Higher meeting limits
* Record + live captions
* Breakout rooms enabled

## Configure Meeting Policies (Admin Center)

1. Go to **Teams Admin Center**
2. Navigate to **Meetings → Meeting policies**
3. Select **Global** or create new
4. Modify settings according to your governance model
5. Assign to users:

**Teams Admin Center → Users → Select user → Policies → Edit meeting policy**

Propagation time: **Up to 24 hours** (usually 15–60 minutes).

## PowerShell Automation

### Connect

\`\`\`powershell
Connect-MicrosoftTeams
\`\`\`

### Create a meeting policy

\`\`\`powershell
New-CsTeamsMeetingPolicy -Identity "RestrictedMeetings" \`
    -AllowIPVideo $false \`
    -AllowCloudRecording $false \`
    -ScreenSharingMode Disabled \`
    -AllowGuestToJoinMeeting $false
\`\`\`

### Assign to users

\`\`\`powershell
Grant-CsTeamsMeetingPolicy -Identity user@domain.com -PolicyName "RestrictedMeetings"
\`\`\`

### Assign to bulk users

\`\`\`powershell
Get-Content users.txt | ForEach-Object {
    Grant-CsTeamsMeetingPolicy -Identity $_ -PolicyName "RestrictedMeetings"
}
\`\`\`

## Troubleshooting Meeting Policy Issues

### A) User says: "Screen sharing doesn't work."

Check:
* If they're under a restricted policy
* If they're using Web client (permission issue)
* Conditional Access blocking device state
* VDI environment limitations

### B) Recording button missing

Causes:
* Recording disabled in policy
* OneDrive provisioning issues
* Compliance recording is enabled org-wide
* Region mismatch

### C) External participants stuck in lobby

Likely misconfiguration:
* Lobby bypass disabled
* CA policy blocking guest access

### D) Presenter role not working

Check:
* Meetings scheduled BEFORE policy assignment
* Organizer's policy (organizer overrides attendee policy)

## Governance Recommendations

* Maintain **policy documentation** for compliance
* Keep policy count minimal (3–5 max)
* Use groups for policy assignment (Entra ID dynamic groups + PowerShell)
* Separate **policy design** from **policy assignment** workflows
* Review policy changes quarterly

## Summary

Meeting policies define the collaboration boundaries in your tenant. With proper configuration and governance, they can minimize risk while ensuring a smooth user experience.
`
  },
  {
    id: 'TEAMS-002',
    title: 'Teams External Access & Guest Access: Governance, Controls & Troubleshooting',
    slug: 'teams-external-guest-access',
    excerpt: 'Understanding the difference between External (Federation) and Guest access, and how to secure both.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Security', 'Guests'],
    author: 'Sayan (Admin)',
    readTime: 15,
    views: 1100,
    publishedDate: '2025-01-05',
    coverImage: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Organizations increasingly collaborate with vendors, partners, and customers through Teams. Managing **External Access** (federation) and **Guest Access** (B2B collaboration) is crucial for balancing productivity and security.

Although they sound similar, they behave very differently:

* **External Access** = Chat + calls with external domains
* **Guest Access** = Invite external users *into your teams & channels*

Admin misunderstanding leads to access failures, blocked chats, meeting join issues, and compliance incidents.

This article provides a practical, admin-focused guide to implementing both.

## External Access vs Guest Access (Difference)

| Feature | External Access | Guest Access |
|---------|----------------|--------------|
| Chat with external users | ✓ | ✓ |
| Calls / video | ✓ | ✓ |
| Join internal meetings | ✓ | ✓ |
| Access channels | ✗ | ✓ |
| Share files | ✗ | ✓ |
| Appear in AAD | ✗ | ✓ (B2B object) |
| Requires invite | No | Yes |

**Key rule:**
External = temporary conversations
Guest = collaboration inside teams

## External Access Configuration

### Step 1 — Enable Federation

Teams Admin Center →
**External Access → Allow external domains**

Modes:
* Open federation (all domains)
* Allowed domains only
* Blocked domains

### Step 2 — DNS Requirements

For SIP federation, ensure:
* \`_sip._tls.domain.com\`
* \`_sipfederationtls._tcp.domain.com\`

Exist and point to Microsoft.

### Step 3 — External Chat Controls

Admin Center → Messaging Policies

* File sharing
* GIFs, reactions
* URL previews

## Guest Access Configuration

### Step 1 — Enable Guest Access

Teams Admin Center →
**Org-wide settings → Guest Access**

Turn on:
* Calling
* Meetings
* Chat
* Channel participation

### Step 2 — Enable B2B in Entra ID

Entra ID →
External Identities →
Cross-tenant access settings →
Default settings → B2B collaboration = Allowed

### Step 3 — Teams-Specific Permissions

Within each Team:
* Owner controls guest permissions
* Control @mentions, channel creation, deletion

### Step 4 — SharePoint Controls for Guests

* External sharing level
* Conditional Access
* Sensitivity labels applied to Teams = SharePoint container inheritance

## Security Controls & Governance

### A) Limit which users may invite guests

Use an Entra ID setting:
* Only admins
* Only specific groups
* Everyone

### B) Force MFA for guests

Cross-tenant access →
Inbound → MFA required

### C) Guest Expiration

SharePoint → External sharing → Guest expiration = On

### D) Justify guest invitation

Use Access Panel → MyAccess workflows.

### E) Disable chat history for external users (optional)

Reduce data exposure risk.

## PowerShell for External & Guest Access

### Connect

\`\`\`powershell
Connect-MicrosoftTeams
\`\`\`

### Check federation status

\`\`\`powershell
Get-CsTenantFederationConfiguration
\`\`\`

### Add allowed domain

\`\`\`powershell
Set-CsTenantFederationConfiguration -AllowedDomains @{Add="partner.com"}
\`\`\`

### Check Guest Access

\`\`\`powershell
Get-CsTeamsClientConfiguration
\`\`\`

## Troubleshooting External & Guest Issues

### Issue: User cannot chat with external domain

Check:
1. Federation allowed?
2. DNS correct?
3. Domain blocked?
4. External tenant blocking inbound?

### Issue: Guest cannot join Teams

Check:
1. B2B inbound/outbound settings
2. Conditional Access
3. Licensing on host tenant
4. Guest is using the correct profile (common issue)

### Issue: Guest cannot see files

Check:
* SharePoint site external sharing level
* Sensitivity label applied to the team

### Issue: Guest appears as "Unknown User"

Cause:
* Guest object sync delay
* Account type misalignment

## Best Practices for External & Guest Access

* Use "Allowed domains list" instead of open federation in high-security orgs
* Maintain a guest inventory (Entra audit + SharePoint site access reports)
* Automate permission revocation for inactive guests
* Document data classification rules for external collaboration
* Train users on how to switch tenants in Teams

## Summary

External & Guest Access is essential for collaboration but must be implemented with clear governance. By aligning Teams Admin Center, Entra ID, and SharePoint settings, organizations can enable secure, frictionless external communication.
`
  },
  {
    id: 'TEAMS-003',
    title: 'Teams App Permission Policies: Governance, Security & App Lifecycle',
    slug: 'teams-app-permissions',
    excerpt: 'Managing third-party and custom apps in Teams. Allow/Block lists and risk assessment.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Apps', 'Governance'],
    author: 'Sayan (Admin)',
    readTime: 14,
    views: 750,
    publishedDate: '2025-01-08',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Teams has evolved from a simple collaboration platform into a full-scale application ecosystem with thousands of apps, bots, connectors, custom line-of-business integrations, and Viva modules.

With this expansion comes real risk:

* Data exfiltration
* Excessive permissions granted by users
* Non-compliant third-party apps
* Shadow IT integrations
* Increased attack surface

**App Permission Policies** help administrators define which apps users can install, use, or request within Teams.

This guide provides:
* How app permission policies work
* Policy hierarchy and assignment
* Enterprise governance models
* PowerShell automation
* Troubleshooting unexpected app behavior

## What Are Teams App Permission Policies?

These policies control:

* Which apps are allowed or blocked
* Whether users can upload custom apps
* Whether apps from your org (LOB apps) are permitted
* Access to Microsoft apps, third-party apps, custom apps

They apply to:
* Teams client UI
* App store visibility
* Bot interactions
* Tabs, connectors, messaging extensions

## App Types in Teams

### Microsoft apps

Calendar, Tasks, Whiteboard, Shifts, etc.

### Third-party apps

Trello, Asana, Salesforce, Jira, Zoom.

### Custom (LOB) apps

Built internally for your organization.

Each app has its own compliance and security posture.

## Configuring App Permission Policies

### Admin Center Steps

1. Go to **Teams Admin Center**
2. Navigate to **Teams apps → Permission policies**
3. Edit the **Global** policy or create a **custom** one
4. Configure:
   * Microsoft apps (Allow / Block / Allow specific)
   * Third-party apps (Allow / Block / Allow specific)
   * Custom apps (Allow / Block)
5. Assign the policy to users

Propagation: **1–24 hours**.

## Governance Models (Recommended)

### Model A — Open with Monitoring

Best for flexible, innovation-friendly environments.

Settings:
* Allow all Microsoft apps
* Allow third-party apps
* Allow custom apps
* Block only known risky apps
* Review app usage monthly

### Model B — Controlled with Allow List (Enterprise security model)

For financial, healthcare, government, or strict compliance environments.

Settings:
* Allow Microsoft apps
* Third-party apps → "Allow specific apps"
* Custom apps → Allowed (only internal)
* App requests → Enabled, with approval workflow

### Model C — High Security / Locked Down

For legal, audit, HR, cybersecurity, R&D departments.

Settings:
* Microsoft apps → Allow
* Third-party apps → Block
* Custom apps → Block
* No app store visibility

## Using PowerShell

### Connect

\`\`\`powershell
Connect-MicrosoftTeams
\`\`\`

### List existing policies

\`\`\`powershell
Get-CsTeamsAppPermissionPolicy
\`\`\`

### Create a new policy

\`\`\`powershell
New-CsTeamsAppPermissionPolicy -Identity "RestrictedApps" \`
    -AllowUserRequestsForApp $false \`
    -AllowThirdPartyApps $false \`
    -AllowMicrosoftApps $true
\`\`\`

### Assign to users

\`\`\`powershell
Grant-CsTeamsAppPermissionPolicy -Identity user@domain.com -PolicyName "RestrictedApps"
\`\`\`

### Bulk assignment

\`\`\`powershell
Get-Content restricted-users.txt | ForEach-Object {
    Grant-CsTeamsAppPermissionPolicy -Identity $_ -PolicyName "RestrictedApps"
}
\`\`\`

## App Setup Policies vs App Permission Policies

Admins often confuse the two:

| Policy Type | Purpose |
|-------------|---------|
| **Permission Policy** | Controls which apps users *can* access |
| **Setup Policy** | Controls which apps are *pinned* or auto-installed |

They should be designed together.

## Troubleshooting Common Issues

### A) User cannot access an app

Check:
* Assigned permission policy
* If app is blocked globally
* If third-party apps are disabled
* Compliance ratings
* Cross-tenant permissions

### B) Users see apps they shouldn't

Possible causes:
* Wrong policy assignment
* Use of *Global (Org-wide default)* instead of custom
* Policy propagation delay
* Cached teams client

### C) Bot not responding

Check:
* App permission policy
* Messaging policies
* Tenant bot settings

### D) LOB apps not visible

Check:
* Upload custom apps = Allowed
* Custom app store enabled
* App manifest validated

## Governance Recommendations

* Maintain an app inventory
* Track usage through Teams admin reports
* Require justification for enabling new third-party apps
* Align app governance with Data Classification & DLP
* Use Sensitivity Labels for controlling app access
* Review all third-party permissions in Entra ID Enterprise Apps

## Summary

App permission policies are essential for maintaining a secure, compliant, and predictable Teams environment. With proper governance, admins can allow user productivity without compromising organizational security.
`
  },
  {
    id: 'TEAMS-004',
    title: 'Teams Voice Administration & Call Routing Essentials',
    slug: 'teams-voice-admin',
    excerpt: 'A guide to Teams Phone System: Calling Plans, Direct Routing, Auto Attendants, and Call Queues.',
    category: 'Microsoft Teams',
    tags: ['Teams', 'Voice', 'Phone System'],
    author: 'Sayan (Admin)',
    readTime: 16,
    views: 920,
    publishedDate: '2025-01-12',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Teams Voice (Phone System) transforms Microsoft Teams into a full cloud-based PBX with call routing, voicemail, auto attendants, call queues, PSTN connectivity, number management, and emergency calling.

This guide provides:
* Core voice components
* Number assignment
* Call flow design
* Auto attendant & call queue configuration
* Direct Routing vs Operator Connect
* Troubleshooting common voice issues

## Teams Voice Architecture

Key components:

### A) Phone System

Cloud-based PBX functionality for Teams.

### B) PSTN Connectivity Options

1. **Calling Plans**
2. **Operator Connect**
3. **Direct Routing**

### C) Call Flow Elements

* Resource accounts
* Auto attendants
* Call queues
* Voice routing policies
* Dial plans

### D) End-user calling features

* Voicemail
* Call forwarding
* Delegation
* Call history
* Block/allow lists

## Licensing Requirements

Minimum:
* Microsoft Teams Phone license
  (or included in M365 E5)

For calling:
* Calling Plan
* Operator Connect
* Direct Routing + SBC

Resource accounts require:
* **Teams Phone Resource Account license** (free)
* Calling capability (pay-as-you-go or number assignment depending on model)

## Phone Number Assignment

### Assign a number via Teams Admin Center

1. Go to **Voice → Phone numbers**
2. Select a number
3. Click **Assign**
4. Select user
5. Confirm E911 emergency address

### PowerShell

\`\`\`powershell
Set-CsPhoneNumberAssignment -Identity user@domain.com \`
    -PhoneNumber "+14085551234" \`
    -PhoneNumberType CallingPlan
\`\`\`

### Bulk assignment

\`\`\`powershell
Import-Csv numbers.csv | ForEach-Object {
    Set-CsPhoneNumberAssignment -Identity $_.User \`
        -PhoneNumber $_.Number \`
        -PhoneNumberType DirectRouting
}
\`\`\`

## Auto Attendants (AA)

### Use cases

* Sales hotline
* IT support
* HR inquiries
* Multi-language routing
* Business hours routing

### Steps

1. Teams Admin Center → **Voice → Auto attendants**
2. Create new
3. Define:
   * Greeting
   * Menu options
   * Time-based routing
   * Operator
   * Language
4. Assign a **resource account**
5. Assign a number

## Call Queues (CQ)

### Use cases

* Helpdesk
* Customer support
* Shared workloads

### Key settings:

* Welcome message
* Agent selection: attendant/random
* Distribution method
* Presence-based routing
* Music on hold
* Overflow & timeout behavior

### Assign agents via:

* M365 group
* Teams channel
* Direct assignment

## Direct Routing Overview

Direct Routing lets you connect Teams to any PSTN provider using an SBC.

### Benefits:

* More flexibility
* International numbers
* Lower cost in some regions
* Advanced routing

### Requirements:

* Certified SBC
* SIP trunk
* Voice routing policies
* Regular SBC maintenance

## Troubleshooting Common Voice Issues

### A) User cannot make outbound calls

Check:
* Phone System license
* Number assigned
* Usage location
* Voice routing policies
* SBC health (Direct Routing)

### B) Calls dropping after a few seconds

Common cause:
* SIP misconfiguration
* NAT issues
* Codec mismatch

### C) Agent not receiving queue calls

Check:
* Agent opt-in status
* If logged in to Teams
* Presence-based routing
* Assigned group membership

### D) Auto attendant not routing

Check:
* Resource account licensing
* Incorrect menu actions
* Time zone mismatch

## Governance & Best Practices

* Maintain inventory of assigned numbers
* Document call flows for each department
* Test emergency calling configurations
* Monitor CQ performance reports
* Regularly test Direct Routing SBC health
* Review delegated calling frequently

## Summary

Teams Voice is a powerful enterprise telephony platform. By understanding call flows, routing components, licensing, and governance, administrators can deliver a robust communication solution that meets business and compliance requirements.
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
    author: 'Sayan (Admin)',
    readTime: 15,
    views: 1800,
    publishedDate: '2025-01-10',
    coverImage: 'https://images.unsplash.com/photo-1517430816045-df4b7de8db21?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Device Configuration Profiles are the backbone of device standardization in an Intune-managed environment. They define:

* Security baselines
* Hardening configurations
* Feature controls
* User experience customization
* OS-specific enforcement (Windows, iOS/iPadOS, macOS, Android)

This guide provides a **complete, end-to-end explanation** of configuration profiles, the underlying CSP (Configuration Service Provider) architecture, best practices, troubleshooting methods, and governance patterns used in enterprise setups.

## Understanding the CSP Architecture (Windows)

Intune manages Windows via **CSPs**, which expose OS configuration options to MDM.

Key points:

* Each CSP maps to a configuration area (e.g., BitLocker CSP, Policy CSP, Wi-Fi CSP)
* Intune writes settings into WMI Bridge Provider → MDM stack → Registry/OS
* Conflicts occur when multiple profiles configure the same CSP node
* Device restrictions are enforced through the Policy CSP, not Group Policy

The architecture determines why you sometimes see:
* Conflicts
* Pending status
* Partial failures
* Settings not applicable to certain editions

## Types of Configuration Profiles

### A) Settings Catalog (Recommended for modern deployments)

* Granular control
* Supports thousands of settings
* Easily searchable
* CSP-based mapping
* Best for Windows 10/11
* Supports cross-platform configs

### B) Templates

Templates include:
* Device restrictions
* Endpoint protection
* Wi-Fi
* VPN
* Email
* Custom (OMA-URI)

Templates make profile creation simpler but less flexible.

### C) Custom (OMA-URI)

Used when:
* Settings Catalog doesn't support required CSP
* Need to configure preview-only or niche CSPs
* Working with third-party configuration payloads

### D) Scripts (PowerShell, shell, bash)

Used for:
* Registry configuration
* Custom compliance conditions
* Advanced OS behavior modifications

Scripts run *outside* MDM CSP and complement configuration profiles.

## Creating a Configuration Profile (Windows Example)

### Steps:

1. Go to **Microsoft Intune admin center**
2. Navigate to **Devices → Configuration → Create profile**
3. Choose:
   * Platform
   * Profile type (Settings Catalog recommended)
4. Add configuration settings
5. Assign to:
   * Users
   * Devices
   * Dynamic groups
6. Review + Create

## Common Enterprise Configuration Scenarios

### A) Hardening Windows 11

Key settings:
* Disable cmd.exe for non-admins
* Block PowerShell for standard users
* Limit Bluetooth
* Disable Consumer experience features
* Enforce OneDrive Known Folder Move

### B) BitLocker Enforcement

* Startup authentication
* Recovery password backup to Entra ID
* Silent enablement
* TPM-only vs TPM+PIN
* OS drive + fixed drives + removable drives

### C) Wi-Fi/SCEP/PKCS Profiles

For certificate-based authentication.

### D) Browser Control (Edge)

* Homepage
* Search engine
* Extensions allow/block list
* Startup behavior

## Assigning Profiles: Users vs Devices

| Assignment Type | When to Use |
|-----------------|-------------|
| **Device-based** | Labs, shared devices, frontline devices |
| **User-based** | Personal devices, BYOD, knowledge workers |

Misalignment often causes repeated failures.

## Conflict Resolution Rules

Intune follows these rules:

* **Device wins vs user wins** depends on setting
* **Highest priority profile wins** if overlapping
* **Conflicts occur** when same CSP node is configured differently
* Troubleshoot via:
  * Intune logs: *DeviceManagement-Enterprise-Diagnostics-Provider*
  * MDM Diagnostic Report: mdmdiagnosticstool
  * Event Viewer: MDM log

## Monitoring & Troubleshooting

### Tools:

* **Intune admin center → Device status per profile**
* **Event Viewer**
* **dsregcmd /status**
* **MdmDiagnosticsTool.exe**
* **Log Analytics (if using Endpoint reporting)**

### Common issues:

**A) Profile shows "Pending" for days**

Cause:
* Device not checking in
* MDM channel broken
* Conflicting profiles

**B) Profile shows "Error"**

Check:
* CSP compatibility
* Windows edition (e.g., Pro vs Enterprise)
* User/device assignment mismatch

**C) OMA-URI profile failing**

Usually due to:
* Incorrect CSP path
* Wrong data type (String vs Integer)
* Incorrect JSON format

## Governance & Best Practices

* Use **Settings Catalog** for all new policies
* Keep **profile count minimal** (don't create 20 similar profiles)
* Use **dynamic groups** for clean targeting
* Avoid duplication of settings across multiple profiles
* Maintain a **Configuration Matrix** documenting all active profiles
* Quarterly review for deprecated CSPs
* Test profiles on a pilot ring before production

## Summary

Intune device configuration profiles allow precise and scalable management of corporate devices. With the right architecture, governance, and troubleshooting skills, administrators can maintain standardized, secure environments across Windows, macOS, iOS, and Android.
`
  },
  {
    id: 'INTUNE-002',
    title: 'Intune Compliance Policies: Architecture, Enforcement & Conditional Access',
    slug: 'intune-compliance-policies',
    excerpt: 'Defining device health requirements and enforcing them via Conditional Access.',
    category: 'Intune & Devices',
    tags: ['Intune', 'Compliance', 'Security'],
    author: 'Sayan (Admin)',
    readTime: 16,
    views: 1600,
    publishedDate: '2025-01-14',
    coverImage: 'https://images.unsplash.com/photo-1563206767-5b1d97289374?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Compliance Policies in Intune define whether a device is *trusted* enough to access organizational resources. Combined with **Conditional Access**, they form one of the strongest Zero Trust enforcement mechanisms in Microsoft 365.

This guide explains:
* Compliance architecture
* Device evaluation lifecycle
* Non-compliance actions
* CA integration
* Real enterprise scenarios
* Troubleshooting & governance

## How Compliance Policies Work

Compliance evaluation involves:

1. Device checks in with Intune
2. Intune validates:
   * OS version
   * Encryption status
   * Jailbreak/root detection
   * Password requirements
   * Threat level (Defender for Endpoint)
3. Status reported:
   * **Compliant**
   * **Noncompliant**
   * **Not evaluated**
   * **Error**
4. Enforced through **Conditional Access**

Intune is *not the enforcement engine* — **Entra ID CA is**.

## Key Compliance Conditions

### Operating System Version

* Minimum OS for Windows, iOS, macOS, Android
* Ensures old devices cannot join

### Password / PIN Requirements

* Complexity
* Timeout
* History
* Minimum length

### Encryption

* BitLocker (Windows)
* FileVault (macOS)
* Android/iOS device encryption

### Firewall Status

* Especially on macOS & Windows

### Defender Threat Level

From Defender for Endpoint (MDE):
* Low
* Medium
* High

Sync between MDE and Intune is critical.

### Rooted/Jailbroken Detection

Instant non-compliance.

## Non-Compliance Actions

### Mark device as non-compliant immediately

Fastest enforcement.

### Send email to user

Customizable notification.

### Retire device after X days

Useful for unmanaged BYOD devices.

### Block access via CA

Actual enforcement action.

## Integrating Compliance with Conditional Access

Compliance alone does nothing unless backed by **Conditional Access**.

### Typical CA policy:

* IF user tries to access cloud apps
* AND device is not compliant
* THEN block

This forms the **Intune + Entra Zero Trust loop**.

## Creating a Compliance Policy

### Steps:

1. Go to **Intune admin center → Devices → Compliance policies → Create policy**
2. Select platform (Windows, iOS, macOS, Android)
3. Configure:
   * Encryption
   * OS version
   * Defender status
   * Password
4. Add **non-compliance actions**
5. Assign to groups
6. Pair with Conditional Access

## Real Enterprise Use Cases

### Case 1 — Block unmanaged devices from accessing Outlook

* Require device to be:
  * Enrolled
  * Compliant
* CA policy blocks devices not evaluated or non-compliant

### Case 2 — Prevent outdated OS versions

* Minimum iOS 16 / Android 12
* Helps reduce vulnerabilities

### Case 3 — High Defender Threat Level

* If threat level = High → Device becomes non-compliant

### Case 4 — Lost device handling workflow

* Mark as non-compliant
* Auto-retire after 7 days
* CA blocks access

## Troubleshooting Compliance Issues

### A) Device shows "Not evaluated"

Likely causes:
* Device didn't check in
* MDM channel broken
* Policy assignment mismatch
* Device not restarted after policy push

### B) Device shows "Compliant" but CA still blocks

Check:
* CA session persistence
* Token refresh (needs sign-out/sign-in)
* MDE & Intune sync if using threat-based compliance

### C) BitLocker compliance failing

Possible:
* User canceled BitLocker wizard
* Unsupported TPM
* Recovery password not escrowed
* WinRE disabled

### D) macOS FileVault not reporting

Possible:
* Secure token issues
* MDM user mismatch
* User not listed as volume owner

## Governance Recommendations

* Always test compliance updates on pilot groups
* Document compliance matrix for each OS
* Avoid too many compliance checks (causes user friction)
* Use email notification templates
* Review CA logs monthly
* Monitor Defender threat analytics

## Summary

Compliance policies ensure devices meet organizational security standards. When combined with Conditional Access, they form an effective Zero Trust enforcement mechanism — making sure only healthy, secure devices can access corporate resources.
`
  },
  {
    id: 'INTUNE-003',
    title: 'Windows Autopilot: Deployment Models, Architecture & Troubleshooting',
    slug: 'windows-autopilot-guide',
    excerpt: 'Zero-touch provisioning explained: User-Driven, Self-Deploying, and Pre-Provisioned modes.',
    category: 'Intune & Devices',
    tags: ['Intune', 'Autopilot', 'Deployment'],
    author: 'Sayan (Admin)',
    readTime: 16,
    views: 2100,
    publishedDate: '2025-01-18',
    coverImage: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Windows Autopilot is Microsoft's modern provisioning framework designed to simplify device deployment, eliminate imaging, and enable zero-touch provisioning.

Instead of traditional imaging tools (SCCM, MDT), Autopilot allows devices to be:
* Shipped directly from OEM to end-users
* Automatically joined to Entra ID
* Fully enrolled into Intune
* Configured with policies, apps, and security baselines

This guide covers:
* Autopilot architecture
* Profile types
* Enrollment status page (ESP)
* Hybrid join vs cloud join
* Troubleshooting flows
* Enterprise deployment standards

## Autopilot Architecture Explained

Autopilot consists of these core components:

### 1. Device Registration

Devices are registered using their **hardware hash** or imported automatically from OEM partners.

### 2. Autopilot Profile Assignment

Profiles define:
* Join type
* User-driven or self-deploy
* Language/region
* Branding
* OOBE experience

### 3. Enrollment Status Page (ESP)

Controls what the user sees during provisioning and what must complete before desktop is unlocked.

### 4. Intune MDM Enrollment

Device receives:
* Configuration profiles
* Compliance policies
* Apps and scripts
* Security baselines

Autopilot essentially orchestrates **OOBE + Entra ID Join + Intune enrollment**.

## Autopilot Deployment Scenarios

### A) User-Driven Mode (Most common)

For devices used by a single, named employee.

Features:
* User signs in during OOBE
* Device is joined to Entra ID
* Enrolled into Intune
* Apps and profiles apply automatically

### B) Self-Deploying Mode

Suitable for:
* Kiosks
* Shared devices
* Frontline devices
* Windows 365 Cloud PCs

Key characteristic:
* No user credentials required during setup

### C) Pre-Provisioned Deployment (White Glove)

Used when large apps or heavy configuration delays end-user productivity.

Steps:
1. IT prepares device at staging area
2. Pre-provision apps & policies
3. Device is resealed and shipped to user

### D) Hybrid Azure AD Join Autopilot

Enrolls devices into:
* Intune
* Entra ID
* On-premises Active Directory

Used only when legacy dependencies exist.

Downside: slow, error-prone, dependent on on-prem domain controller connectivity.

## Enrollment Status Page (ESP)

ESP enforces setup sequence **before user reaches desktop**.

Settings:
* Block device until required apps install
* Block device until profiles apply
* Show/hide installation progress
* Separate settings for device ESP vs user ESP

### Best practices:

* Mark only critical apps as "required before login"
* Avoid large MSI apps during ESP
* Monitor ESP failures via Intune device reports
* Disable ESP for shared device groups

## Required Components for Autopilot to Work

* Windows 10 1903+ or Windows 11
* User must have:
  * M365 E3/E5, EMS, or Intune license
* Hardware hash imported
* Network access to Microsoft endpoints
* Correct group targeting for profiles

## Common Issues & Troubleshooting Guidance

### A) Autopilot profile not applied

Check:
* Device not assigned to correct group
* Azure AD dynamic query mismatch
* Sync not completed
* Device not recognized due to incorrect hardware hash

### B) ESP stuck at "Identifying"

Cause:
* Device can't reach required Microsoft URLs
* Proxy or firewall restrictions

### C) ESP hangs on app installation

Check:
* Required app failed
* Win32 app detection rule issue
* App dependency not installed

### D) User sign-in fails during OOBE

Check:
* CA policies blocking Intune enrollment
* MFA requirements
* Device not recognized as trusted

### E) Hybrid Autopilot fails

Check:
* On-prem domain reachability
* Intune Connector for Active Directory
* VPN requirements

## Governance & Best Practices

* Use **Cloud-only Autopilot** wherever possible
* Avoid Hybrid unless legacy dependencies force it
* Maintain Autopilot device inventory
* Keep naming conventions consistent
* Standardize Enrollment Status Page
* Pilot new OS releases before production rollout
* Monitor Autopilot deployment health via Intune analytics

## Summary

Windows Autopilot is essential for modern device provisioning. With proper configuration, governance, and testing, it enables scalable zero-touch deployment for Windows devices without imaging or manual intervention.
`
  },
  {
    id: 'INTUNE-004',
    title: 'Intune Application Management: Win32 Apps, Deployment Rings & Troubleshooting',
    slug: 'intune-app-management',
    excerpt: 'Packaging and deploying Win32 apps using IntuneWinAppUtil. Detection rules and supersedence.',
    category: 'Intune & Devices',
    tags: ['Intune', 'Apps', 'Win32'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 1400,
    publishedDate: '2025-01-22',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Application deployment is one of the most critical responsibilities for Intune administrators. Intune supports:

* Win32 applications
* MSIX packages
* Line-of-business (LOB) apps
* Store apps
* Web apps
* iOS/iPadOS & Android app deployments

This guide explains:
* Packaging Win32 apps
* Detection rules
* Delivery optimization
* Assignment logic
* Deployment rings
* Troubleshooting install failures

## Application Types in Intune

### A) Win32 Apps (Most common)

Packaged using the **Microsoft Win32 Content Prep Tool**.

Supports:
* MST transforms
* Custom installation parameters
* Rich detection logic

### B) MSI Line-of-Business (LOB) Apps

Basic MSI without complex logic.

### C) MSIX Apps

Modern packaging.
Self-healing, containerized, cleaner updates.

### D) Microsoft Store Apps (New unified model)

Uses MS Store repository.
No more legacy business store.

### E) Web Apps

Simple shortcuts that behave like installed apps.

## Win32 App Packaging Workflow

### Step 1: Prepare files

Place:
* installer.exe
* transforms
* configuration files

### Step 2: Use IntuneWinAppUtil

Example:

\`\`\`powershell
IntuneWinAppUtil.exe -c C:\\Source -s setup.exe -o C:\\Output
\`\`\`

### Step 3: Upload to Intune

Intune admin center → Apps → All apps → Add → Win32

### Step 4: Configure

* Install command
* Uninstall command
* Detection method
* Requirements
* Dependencies
* Return codes

## Detection Rules

Detection is what makes Intune reliable.

Common methods:

### Registry detection

\`\`\`
HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\YourApp
\`\`\`

### File existence

* File path
* Version

### Custom script detection

PowerShell-based logic for advanced validation.

## Assignment Logic: Required vs Available

### Required

* Installs automatically
* Used for baseline apps
* Retry logic enabled
* Can be combined with ESP for Autopilot

### Available

* User installs via Company Portal
* Used for optional or productivity apps

### Uninstall

* Removes app from targeted devices

## Deployment Rings

Deployment rings prevent outages.

### Ring 0 — IT Pilot Devices

* First to receive updates
* Validate deployment success

### Ring 1 — Early Adopters

* Small number of business users

### Ring 2 — Broad Deployment

* All remaining devices

Ring-based deployment dramatically reduces incident volume.

## Troubleshooting Application Deployment

### A) Installation failed with exit code

Check:
* Correct return code mapping
* Incorrect install/uninstall command
* Missing dependencies
* MSI transforms not loading

### B) Detection rule failed

Most common cause of deployment failure.

### C) App not appearing in Company Portal

Possible:
* Assignment to incorrect user group
* Device not synced
* App type not supported for platform

### D) Win32 app stuck at "Pending"

Check:
* Device connectivity
* Intune Service Window
* Delivery Optimization

### E) Large apps slow to install

Enable **Delivery Optimization**:
* Peer-to-peer sharing
* Local caching
* Reduce WAN usage

## Monitoring App Deployments

Use:
* Intune admin center
* Device install logs
* IME logs: \`C:\\ProgramData\\Microsoft\\IntuneManagementExtension\\Logs\`
* Log Analytics (if enabled)
* Endpoint Analytics

IME logs are **most important** for Win32 troubleshooting.

## Governance & Best Practices

* Standardize packaging procedures
* Maintain app inventory documentation
* Use detection rules for reliability
* Roll out apps via deployment rings
* Regularly clean up unused apps
* Validate app compatibility before OS upgrades
* Test on pilot groups

## Summary

Intune application management is a core pillar of modern endpoint management. With strong packaging standards, reliable detection rules, proper assignment logic, and structured deployment rings, administrators can deliver a consistent and secure application experience across the enterprise.
`
  },

  // --- Entra ID / Identity ---
  {
    id: 'ENTRA-001',
    title: 'Entra ID User Lifecycle Management: Provisioning, Governance & Automation',
    slug: 'entra-user-lifecycle',
    excerpt: 'Managing user identities from onboarding to offboarding. Dynamic groups and lifecycle workflows.',
    category: 'Entra ID / Identity',
    tags: ['Entra ID', 'Identity', 'Governance'],
    author: 'Sayan (Admin)',
    readTime: 16,
    views: 1300,
    publishedDate: '2025-01-25',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

User lifecycle management (ULM) in Entra ID defines how user identities are:

* Created
* Provisioned to apps
* Updated when roles change
* Offboarded securely

In enterprise environments, identity lifecycle mismatches lead to:

* Orphaned accounts
* Excessive privileges
* Compliance violations
* Break-glass bypasses
* Inactive users still consuming licenses

This guide breaks down **end-to-end lifecycle architecture**, provisioning flows, HR-driven identity automation, governance patterns, and real-world best practices.

## Key Identity Lifecycle Stages

A well-governed identity system includes 5 stages:

### 1. Join (Creation)

* New user created in HR system (Workday, SAP SuccessFactors, etc.)
* Provisioned into Entra ID
* Assigned initial roles, licenses, and groups
* Workspace initialization (mailbox, Teams, OneDrive, etc.)

### 2. Move (Changes During Employment)

* Department changes
* Manager updates
* Role-based access changes
* Automated provisioning adjustments

### 3. Leave (Offboarding)

* Disable sign-in immediately
* Revoke active sessions
* Remove licenses
* Transfer ownership (OneDrive, mailbox, Teams)
* Secured account retention

### 4. Rehire

* Reactivate identity
* Restore resources
* Maintain audit consistency

### 5. External Users (Guests)

Lifecycle must be managed for vendors and temporary users.

## Lifecycle Management Architecture

There are three provisioning paths:

### A) HR → Entra ID (Authoritative Source)

Best practice: HR system is **identity source of truth**.

Software used:
* Workday provisioning
* SAP SuccessFactors
* Azure AD Connect Cloud Sync

### B) On-Prem AD → Entra ID

Traditional setup using:
* Azure AD Connect
* Cloud Sync

### C) Cloud-Only User Management

Used by cloud-native organizations.

## Key Automation Features in Entra ID

### 1. SCIM Provisioning

Standard protocol for auto-provisioning apps such as:
* Slack
* Zoom
* Atlassian
* Adobe
* ServiceNow

### 2. Dynamic Groups

Assign:
* Roles
* Licenses
* Applications

based on attributes (department, job role).

Example dynamic rule:

\`\`\`
(user.department -eq "Finance") -and (user.accountEnabled -eq true)
\`\`\`

### 3. Identity Governance

Includes:
* Access Packages
* Entitlement Management
* Lifecycle workflows
* Access reviews

### 4. Lifecycle Workflows (New Entra Feature)

Automate:
* Onboarding
* Offboarding
* Role changes
* Notifications
* Manager approvals

## Designing a Modern Identity Lifecycle Model

### Onboarding Workflow Example

1. HR entry
2. Automated creation in Entra ID
3. Assign base groups and licenses
4. Create mailbox / OneDrive
5. Pre-provision Teams
6. Send welcome email
7. Assignment of apps based on role

### Offboarding Workflow Example

1. HR termination event
2. Disable user immediately
3. Revoke all tokens
4. Block sign-in
5. Remove all licenses
6. Reassign OneDrive + mailbox content
7. Close access packages
8. Remove from groups
9. Delete account after retention

## Governance Controls

### A) Access Reviews

Review:
* Guest access
* Group membership
* App access
* Admin roles

### B) Privileged Identity Management (PIM)

Used to:
* Assign roles just-in-time
* Enforce MFA
* Require approval
* Track admin activity

### C) Entitlement Management

Package together access to:
* Groups
* Apps
* SharePoint sites
* Teams

### D) Conditional Access

Tie lifecycle to access control.

## Troubleshooting ULM Issues

### A) User created but not getting licenses

Check:
* Dynamic licensing group rules
* M365 license availability
* Attribute mismatch (Department, UsageLocation)

### B) Provisioned user not appearing in app

Check:
* SCIM provisioning logs
* App-level attribute mapping
* Entra provisioning cycle

### C) Offboarded user still accessing systems

Possible:
* Token not revoked
* App with independent authentication
* Legacy authentication enabled

## Best Practices

* HR must be source of truth
* Standardize naming conventions
* Enforce attribute hygiene (manager, department, cost center)
* Use dynamic groups for automation
* Use PIM for admin privileges
* Implement quarterly access reviews
* Minimize permanent admin roles
* Use lifecycle workflows

## Summary

A mature identity lifecycle ensures secure onboarding, seamless access transitions, and compliant offboarding. Entra ID provides a robust suite of automation tools that reduce manual effort and prevent security gaps.
`
  },
  {
    id: 'ENTRA-002',
    title: 'Conditional Access Design Strategy: Zero Trust Access Patterns & Troubleshooting',
    slug: 'conditional-access-strategy',
    excerpt: 'Designing robust CA policies. Block legacy auth, require MFA, and device compliance.',
    category: 'Entra ID / Identity',
    tags: ['Entra ID', 'Security', 'Zero Trust'],
    author: 'Sayan (Admin)',
    readTime: 18,
    views: 2200,
    publishedDate: '2025-01-28',
    coverImage: 'https://images.unsplash.com/photo-1614064641938-3e85299748ea?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Conditional Access (CA) is the core enforcement mechanism of Zero Trust in Microsoft 365.

CA policies evaluate:

* User
* Device state
* Location
* App risk
* Sign-in risk
* Compliance
* Session behavior

…to determine **allow**, **block**, or **additional authentication requirement**.

This guide provides the **strategic design patterns**, **policy layering techniques**, **enterprise templates**, and **troubleshooting practices** necessary for a scalable CA implementation.

## Conditional Access Processing Flow

CA evaluates in the following order:

1. **User & group scopes**
2. **Cloud app or action**
3. **Conditions**
4. **Grant controls**
5. **Session controls**
6. Policy evaluation result

Important facts:

* CA applies only to modern authentication
* Legacy auth bypasses CA unless explicitly blocked
* User must satisfy *all* grant controls

## Key CA Building Blocks

### Conditions

* Sign-in risk
* Device platform
* Location
* Client apps
* Device compliance
* User risk

### Grant Controls

* MFA
* Compliant device
* Hybrid join
* Approved client app
* App enforced restrictions
* Require password change

### Session Controls

* Sign-in frequency
* Persistent browser session
* App restrictions
* Conditional Access App Control

## Core Zero Trust CA Policies (Baseline Set)

### Policy 1 — Require MFA for all users

Except break-glass accounts.

### Policy 2 — Block legacy authentication

One of the biggest security gaps.

### Policy 3 — Require compliant device for access to Office apps

Prevents unmanaged device access.

### Policy 4 — Restrict high-risk sign-ins

Block or tighten controls.

### Policy 5 — Require MFA for privileged roles

### Policy 6 — Block access from outside allowed countries (optional)

### Policy 7 — Require phishing-resistant MFA for admins

## Advanced CA Patterns

### A) Identity Protection + CA

Trigger controls based on:
* Risky users
* Risky sign-ins

### B) App-Specific Access

E.g., allow unmanaged devices to access Exchange Online only via Outlook Web App (limited mode).

### C) "Travel Mode"

Temporary bypass for executives traveling internationally.

### D) Split-Tenant Guest Access Policies

Different CA rules for:
* Internal users
* External B2B guests
* Collaborating organizations

### E) Continuous Access Evaluation (CAE)

Provides real-time session termination.

## Avoiding CA Lockouts

Follow this checklist:

* Maintain **two break-glass accounts**
* Exclude emergency accounts from CA
* Use privileged access workstations for admin
* Document policy order
* Run CA **What If** tool before enabling
* Deploy policies in **report-only mode first**

## Troubleshooting Conditional Access

### Tools:

* Sign-in logs
* Policy evaluation details
* What If tool
* CA insights workbook

### Common issues:

**A) "Blocked by CA" unexpectedly**

Check:
* Travel/roaming IP
* Device compliance broken
* User risk detection triggered
* CA browser session expired

**B) MFA prompts repeatedly**

Possible causes:
* Conflicting session controls
* Sign-in frequency configured too low
* Legacy app using modern endpoints

**C) Conditional Access not applying**

Check:
* App not included in scope
* Policy is still in report-only mode
* Incorrect group assignment

## Governance Recommendations

* Keep policies minimal (10–20 max)
* Use naming standards
* Document exclusions carefully
* Regularly review CA logs
* Implement periodic CA audits
* Use templates for consistent deployment

## Summary

Conditional Access is the foundation of Zero Trust in Microsoft's cloud. When designed with layered enforcement and governance discipline, CA ensures secure and seamless access for users across all devices and apps.
`
  },
  {
    id: 'ENTRA-003',
    title: 'Entra ID Role Management & Privileged Identity Management (PIM)',
    slug: 'entra-pim-roles',
    excerpt: 'Securing administrative access with Just-In-Time (JIT) elevation and approval workflows.',
    category: 'Entra ID / Identity',
    tags: ['Entra ID', 'PIM', 'Security'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 1100,
    publishedDate: '2025-02-01',
    coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Administrative access is the most sensitive attack vector in any Microsoft 365 environment.

If an attacker compromises:

* Global Administrator
* Exchange Administrator
* Intune Administrator
* SharePoint Administrator
* Teams Administrator

…they can take full control of your cloud infrastructure, data, devices, and communications.

**Privileged Identity Management (PIM)** in Entra ID provides just-in-time (JIT) privileged access, governance, auditing, and alerts — drastically reducing the attack surface.

This guide explains:
* Admin role architecture
* PIM activation workflow
* JIT access controls
* Approval workflows
* Alerts
* Governance patterns
* Hardening recommendations
* Troubleshooting

## Understanding Entra ID Admin Roles

Entra ID contains **built-in roles** for every workload, including:

* **Global Administrator** (full control)
* **Global Reader**
* **Privileged Role Administrator**
* **Security Administrator**
* **Exchange Administrator**
* **Teams Administrator**
* **Intune Administrator**
* **SharePoint Administrator**
* **Helpdesk Administrator**
* **User Administrator**
* 70+ granular roles

### Why roles matter:

* Prevent privilege sprawl
* Enforce least privilege
* Separate duties (SoD)
* Improve audit readiness

## What Is Privileged Identity Management (PIM)?

PIM enables:

* **Just-in-time** access
* **Approval-based** role activation
* **MFA enforcement**
* **Time-limited** admin access
* **Justification** requirement
* **Logging & auditing**
* **Alerts** for risky activity
* **Periodic access reviews**

Instead of giving permanent admin roles, users receive **Eligible roles**, which they activate only when needed.

## PIM Access Model

Entra ID users can be assigned roles in two states:

### 1. Eligible

User has *potential* admin access.
Must activate via PIM when required.

### 2. Active

User currently has admin privileges.

### Why Eligible > Active:

* Reduces standing privileges
* Prevents privilege misuse
* Minimizes blast radius of credential compromise

## Configuring PIM for Entra ID Roles

### Steps:

1. Go to **Entra admin center → Identity Governance → Privileged Identity Management**
2. Select **Azure AD roles**
3. Configure:
   * MFA during activation
   * Time-bound access (typically 1–8 hours)
   * Justification required
   * Ticket ID linking
   * Approval workflow (optional)
4. Assign roles as **Eligible**

## PIM Activation Flow (User Experience)

1. User needs admin access → opens PIM
2. Selects the required role
3. Clicks **Activate**
4. Provides:
   * Reason
   * Change ticket ID
   * Additional parameters if configured
5. MFA / approval workflow triggers
6. Role becomes active for defined duration

After expiry:
* Privileges are removed
* Access logs recorded
* Session tokens updated

## Expiration, Renewal & Access Reviews

### Role Assignment Expiration

* Eligible role assignments can have expiration dates
* Requires reapproval

### Access Reviews

Used to validate:
* If user still needs the role
* If usage is appropriate
* If access should be removed

Recommended cadence:
* Monthly for admins
* Quarterly for users with elevated privileges

Results can automatically:
* remove access
* escalate to managers
* notify security

## Alerts & Monitoring in PIM

PIM provides built-in alerts for:

* Permanent role assignments
* Excessive Global Administrators
* Roles activated outside working hours
* Privilege escalation attempts
* Activated roles without MFA
* Expired assignments
* Suspicious admin activity

Alerts should integrate with:
* **Microsoft Defender XDR**
* **SIEM** tools (Sentinel recommended)
* **Compliance Center**

## Governance & Best Practices

### 1. Keep Global Admin count extremely low

Recommended:
* 1 emergency account
* 1–2 privileged role admins
* No user should be permanently global admin

### 2. Convert ALL admin roles into Eligible

Standing privileges = breach risk.

### 3. Require MFA + justification for all activations

Ideal requirement:
* MFA
* Justification
* Ticket number (CMDB/ServiceNow/Jira)

### 4. Enable approval workflows

For sensitive roles:
* Global Admin
* Security Admin
* Exchange / SharePoint / Teams Admin

### 5. Enforce time limits (least privilege + minimal exposure)

Default:
* 4 hours for admin roles
* 30–60 minutes for high-risk operations

### 6. Use Conditional Access for admin access

Admin roles should only sign in from:
* Compliant devices
* Trusted locations
* Secure browsers

### 7. Log everything

Enable:
* Audit logs
* Sign-in logs
* PIM activation logs

### 8. Use separate admin accounts

No mixing daily use with administrator privileges.

## Troubleshooting PIM Issues

### A) User cannot activate admin role

Check:
* License (requires Entra ID P2)
* Assignment is Eligible, not Active
* CA blocking elevation
* Wrong approval workflow

### B) PIM role activation takes long

Often caused by:
* Conditional Access device requirement
* Token refresh delays
* Approval bottlenecks

### C) Activation fails with MFA requirement

Ensure:
* Authenticator app configured
* No stale tokens
* CA policy requiring stronger MFA not conflicting

### D) Admin role appears "Expired" unexpectedly

Check:
* Role assignment expiration settings
* Access review automatic actions

## Summary

Privileged Identity Management is a critical security control in Entra ID. By eliminating permanent administrator access and enforcing just-in-time activation, organizations can dramatically reduce exposure to credential theft, privilege escalation attacks, and insider threats.

Effective role governance requires:

* Clear role definitions
* JIT access
* Approval workflows
* Conditional Access
* Regular access reviews

With PIM, administrative access becomes **controlled, auditable, and secure** — foundational to a mature Zero Trust environment.
`
  },

  // --- Security & Compliance ---
  {
    id: 'SEC-001',
    title: 'Microsoft Defender for Cloud Apps: Discovery, Governance & Enforcement',
    slug: 'defender-cloud-apps',
    excerpt: 'CASB fundamentals: Discovering Shadow IT, controlling OAuth apps, and session policies.',
    category: 'Security & Compliance',
    tags: ['Security', 'CASB', 'Defender'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 1050,
    publishedDate: '2025-02-05',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Modern organizations rely on hundreds of SaaS apps — many unsanctioned, unmanaged, or completely invisible to IT. This creates blind spots for data leakage, compromised accounts, and shadow IT.

Microsoft Defender for Cloud Apps (formerly Cloud App Security) is Microsoft's CASB platform that provides:

* Cloud app discovery
* OAuth governance
* Session controls
* Conditional Access app control
* Data protection
* Threat detection

This article explains **architecture**, **deployment**, **governance**, and **real-world enforcement patterns** used in enterprise tenants.

## Architecture of Defender for Cloud Apps (CASB)

The platform includes:

### A) Cloud Discovery Engine

Uses logs from:
* Firewalls
* Proxies
* Endpoint agents (via Microsoft Defender for Endpoint)

Produces:
* App ratings
* Risk scores
* Compliance indicators
* Sanctioned / unsanctioned list

### B) OAuth App Governance

Monitors apps requesting permissions to:
* Read mail
* Access files
* Access calendars
* Modify user data

Critical for preventing malicious OAuth apps.

### C) Conditional Access App Control Enforcement

Integrates with Microsoft Entra Conditional Access to apply:
* Real-time session protection
* Limited (read-only) access
* Block downloads
* Require MFA
* Block specific risky actions

### D) Threat Detection

Behavior-based detection for:
* Impossible travel
* Mass downloads
* Suspicious login patterns
* Data leak attempts
* Admin privilege misuse

## Deployment Requirements

### Licensing

Requires:
* Microsoft 365 E5
  or
* Microsoft Defender for Cloud Apps Standalone

### Integration Components

* Entra ID
* Conditional Access
* Defender for Endpoint (optional but recommended)
* SIEM (e.g., Microsoft Sentinel)

## Step-by-Step Deployment Framework

### Step 1 — Configure Cloud Discovery

Upload logs from:
* Palo Alto
* Fortinet
* Cisco
* Zscaler
* Custom logs

Or enable **automatic discovery** via Defender for Endpoint.

CASB identifies:
* Top risky apps
* User activity
* Data transfer volume
* App categories

### Step 2 — Sanction / Unsanction Apps

Mark apps as:
* **Sanctioned** → allowed for corporate use
* **Unsanctioned** → blocked via firewall or CA

### Step 3 — Integrate with Conditional Access App Control

Create CA policy:

\`\`\`
IF app = Dropbox AND device = Unmanaged
THEN route traffic via Defender for Cloud Apps → Apply limited session
\`\`\`

### Step 4 — Configure OAuth App Governance

Monitor apps that request:
* Mail.ReadWrite
* Files.ReadWrite.All
* Directory.AccessAsUser

Block / revoke unsafe apps.

### Step 5 — Enable Threat Detections

Use alerts for:
* Impossible travel
* Mass file deletion
* Suspicious operation
* External data sharing

### Step 6 — Configure Information Protection

Apply sensitivity label enforcement:
* Prevent downloads
* Enforce encryption
* Block access on unmanaged devices

## Real-World Enterprise Use Cases

### Use Case 1 — Blocking Unsanctioned Cloud Storage Apps

Problem: Users uploading data to personal clouds (Box, Dropbox).

Solution:
* Mark apps as unsanctioned
* Block via CA App Control
* Monitor via Cloud Discovery

### Use Case 2 — Protecting Downloads from Sensitive Sites

E.g., when accessing SharePoint Online from unmanaged devices.

Policy:
* Allow web access
* Block downloads
* Prevent copy/paste

### Use Case 3 — Prevent Data Leakage via OAuth Apps

Malicious OAuth apps can exfiltrate mail or files.

CASB:
* Detects risky OAuth apps
* Flags high permission usage
* Allows instant revocation

### Use Case 4 — Threat Alert Based on User Behavior

Impossible travel detection:
* Login from India at 9 AM
* Login from U.S. at 9:05 AM

CASB → Raise alert → Trigger CA risk-based block.

## Operational Governance

### A) CASB Governance Dashboard

Review:
* App ratings
* Compliance reviews
* OAuth risk
* User activity trends

### B) Shadow IT Committee

Quarterly review to:
* Approve new apps
* Review unsanctioned lists
* Audit high-risk activity

### C) Automated Playbooks

Using Microsoft Sentinel:
* Trigger alerts
* Auto-disable risky apps
* Notify security teams

## Troubleshooting CASB Issues

### A) Session Controls Not Working

Check:
* Conditional Access policy routing via Defender for Cloud Apps
* Supported session-based apps
* Browser compatibility

### B) App Not Appearing in Cloud Discovery

Check:
* Log format incorrect
* Firewall not exporting traffic logs
* Incorrect device tagging

### C) OAuth App Shows No Activity

Possible:
* App uses background refresh tokens
* User consent disabled

## Best Practices

* Always enable **App Discovery continuous monitoring**
* Require admin approval for **OAuth apps**
* Enforce **download restrictions** on unmanaged devices
* Use **labels + CA App Control** together
* Use **Sentinel analytics** for enriched monitoring
* Use **Shadow IT governance** to reduce unapproved app usage

## Summary

Microsoft Defender for Cloud Apps enables enterprises to enforce Zero Trust in the cloud by providing visibility, control, and threat detection across all SaaS applications.

When combined with:
* Microsoft Entra ID
* Microsoft Defender for Endpoint
* Microsoft Sentinel

…it forms a complete cloud security stack that protects identities, sessions, and data.
`
  },
  {
    id: 'SEC-002',
    title: 'Data Loss Prevention (DLP) in Microsoft 365: Strategy, Deployment & Monitoring',
    slug: 'dlp-strategy',
    excerpt: 'Protecting sensitive data (PII, Financial) across Exchange, SharePoint, Teams, and Endpoints.',
    category: 'Security & Compliance',
    tags: ['Compliance', 'DLP', 'Security'],
    author: 'Sayan (Admin)',
    readTime: 18,
    views: 1300,
    publishedDate: '2025-02-08',
    coverImage: 'https://images.unsplash.com/photo-1624969862644-791f3dc98927?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Data Loss Prevention (DLP) in Microsoft 365 protects sensitive business data from accidental or intentional leakage across:

* Exchange Online
* SharePoint Online
* OneDrive for Business
* Microsoft Teams
* Endpoint devices
* Third-party SaaS apps via Microsoft Defender for Cloud Apps

DLP is part of the broader compliance framework within Microsoft Purview and helps organizations meet regulatory, legal, and internal security requirements.

This article covers strategy, rule design, deployment, user education, and monitoring.

## Why DLP Is Critical

### Without DLP, organizations face:

* Accidental sharing of confidential data
* Unauthorized external data transfers
* Insider threats
* Compliance violations (GDPR, HIPAA, PCI)
* High-risk email forwarding
* Data leakage via endpoints or cloud apps

### DLP prevents:

* Sharing sensitive files externally
* Uploading critical documents to unauthorized apps
* Copy/paste / print of confidential data
* Storing regulated information improperly

## Core Components of Microsoft 365 DLP

### 1. Sensitive Information Types (SITs)

Built-in SITs include:
* Credit card numbers
* Aadhaar numbers
* Passport numbers
* Bank account info
* Health records

You can also create **custom SITs**.

### 2. Sensitivity Labels

Labels classify and protect content.
When integrated with DLP, labels drive automated actions.

### 3. DLP Policies

Policies define:
* Conditions
* Actions
* User notifications
* Incident reports

### 4. Endpoint DLP

Protects data on Windows/macOS endpoints using Microsoft Defender for Endpoint.

## DLP Strategy for Enterprises

### A) Identify Data Categories

Examples:
* Financial data
* HR/PII
* Intellectual property
* Customer data
* Legal documents

### B) Define Protection Levels

Common model:
* **Public**
* **Internal**
* **Confidential**
* **Highly Confidential**

### C) Include Stakeholders

* Security
* Legal
* HR
* Risk
* Data owners
* IT admins

### D) Begin with Audit Mode

Use "Test with notifications" before enforcement.

## Designing DLP Policies

### 1. Exchange Online

Protects:
* Auto-forwarding externally
* Risky attachments
* Leakage to personal email (Gmail/Yahoo/etc.)

### 2. SharePoint & OneDrive

Controls:
* External sharing
* Download blocking
* File encryption on upload

### 3. Teams

Prevents:
* Pasting sensitive data into chats
* Uploading classified documents
* Sharing screenshots

### 4. Endpoint DLP

Protects:
* Copying to USB
* Printing sensitive files
* Uploading to personal cloud apps
* Clipboard usage

### Example DLP rule:

If content contains:
* Aadhaar Number (≥ 1 match)
* OR Financial Account Number (≥ 1 match)

AND user attempts:
* Email to outside org
* Upload to Dropbox
* Copy to USB

THEN:
* Block
* Notify user
* Create incident
* Apply sensitivity label

## Deploying DLP in Microsoft Purview

### Step 1 — Identify sensitive data using Content Explorer

Runs classification across tenant.

### Step 2 — Create DLP policies using the EU or India template

Pre-built industry templates can be customized.

### Step 3 — Run in test mode

Collect false positives.

### Step 4 — Deploy to production groups

Use AAD groups for staged rollout.

### Step 5 — Train users

User tooltips improve behavior.

## Monitoring & Reporting

Use:
* **Activity Explorer** (real-time DLP events)
* **Alerts** (policy-based incidents)
* **Endpoint DLP logs**
* **Defender for Cloud Apps alerts**
* **Power BI DLP dashboards**

Integrate with SIEM via Microsoft Sentinel for advanced analytics.

## Troubleshooting DLP

### A) Policy isn't triggering

Check:
* Location scope
* SIT accuracy
* Document not indexed yet
* Overrides allowed

### B) User claims they were blocked incorrectly

Check:
* Matched SIT confidence
* Activity explorer metadata

### C) Endpoint DLP not working

Ensure:
* Device onboarded to Defender for Endpoint
* Endpoint DLP toggle enabled

## Best Practices

* Always test first
* Combine DLP with sensitivity labels
* Enable user notifications
* Integrate with CASB for cloud app coverage
* Use analytics for tuning SIT confidence
* Review incidents weekly

## Summary

DLP in Microsoft 365 provides end-to-end protection across cloud and endpoint services. A well-designed DLP strategy reduces human error, enforces regulatory compliance, and strengthens Zero Trust architecture.
`
  },
  {
    id: 'SEC-003',
    title: 'Insider Risk Management (IRM) in Microsoft 365: Framework & Detection',
    slug: 'insider-risk-management',
    excerpt: 'Detecting and mitigating internal threats: Data theft, leakage, and policy violations.',
    category: 'Security & Compliance',
    tags: ['Compliance', 'Insider Risk', 'Security'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 900,
    publishedDate: '2025-02-12',
    coverImage: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd82?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Not all threats come from outside.
Insider risks — malicious or accidental — often go undetected.

Microsoft Purview Insider Risk Management uses:

* User behavior analytics
* Machine learning
* HR-linked signals
* App activity monitoring
* Sequence-based detection

…to identify high-risk actions *before* they become damaging.

## Categories of Insider Risks

1. **Data Theft / Exfiltration**
   * Uploading IP to personal cloud
   * Copying source code
   * Emailing customers lists externally

2. **Data Leakage (Accidental)**
   * Sharing confidential files mistakenly
   * Over-sharing via Teams

3. **Security Policy Violations**
   * Disabling protections
   * Bypassing DLP

4. **Workplace Harassment & Compliance Issues**
   Uses textual analytics in Teams/Email.

5. **Departing Employee Risks**
   * Mass downloads
   * Unusual file activity
   * Data copying after termination notice

## Core Architecture

IRM signals come from:

* Exchange Online
* SharePoint Online
* OneDrive
* Teams
* Endpoint (via Microsoft Defender for Endpoint)
* HR alerts (via APIs or connector)
* Data Loss Prevention decisions
* Entra ID activity

## Deployment Steps

### Step 1 — Prerequisites

Requires:
* Microsoft 365 E5
* Insider Risk, Communication Compliance, Audit Premium

### Step 2 — Enable Privacy Settings

Choose:
* Pseudonymized user identities
* Investigator permissions

### Step 3 — Create Policies

Types:
* Data theft
* Data leakage
* Security policy violations
* HR-driven alerts

### Step 4 — Tune Indicators

Signals include:
* Mass file downloads
* Printing large documents
* Using USB devices
* Copying to cloud storage
* Suspicious email forwarding

### Step 5 — Review risk scores

ML assigns user risk scores based on sequence of actions.

## Real-World Detection Scenarios

### Scenario 1 — Departing Employee Copies Data to USB

IRM detects:
* HR termination event
* Login to OneDrive
* Mass copying to removable device

### Scenario 2 — Source Code Exfiltration via GitHub

Sequential pattern:
* Access to internal repository
* Emailing zip file to personal email

### Scenario 3 — Executive-level Mailbox Access Abuse

IRM detects:
* Unusual mailbox access
* Admin performing eDiscovery queries

### Scenario 4 — Large-volume Teams file transfers

If user sends 500 files in one day to external guests.

## Investigation Workflow

1. Case created with anonymized user
2. Investigator views timeline
3. Evidence files collected
4. Export for HR review
5. Decision → Training / Warning / Disciplinary action
6. Case closed

## Integration With Other M365 Tools

* With **DLP**: Escalate a DLP alert into IRM
* With **Defender for Cloud Apps**: Add risky activity from SaaS apps
* With **Sentinel**: Correlate insider + external signals

## Best Practices

* Enable pseudonymization
* Have HR + Legal + Security aligned
* Keep data minimization in mind
* Start with **Data Theft** policy first
* Run periodic reviews
* Use sensitivity labels to reduce triggers

## Summary

Insider Risk Management provides deep behavioral analytics across Microsoft 365 to identify risky behaviors early. It is a cornerstone of modern enterprise compliance and Zero Trust strategy.
`
  },
  {
    id: 'SEC-004',
    title: 'eDiscovery & Advanced Auditing in Microsoft 365',
    slug: 'ediscovery-auditing',
    excerpt: 'Legal holds, content search, and forensic investigations in Microsoft Purview.',
    category: 'Security & Compliance',
    tags: ['Compliance', 'eDiscovery', 'Legal'],
    author: 'Sayan (Admin)',
    readTime: 19,
    views: 850,
    publishedDate: '2025-02-15',
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Organizations require the ability to:

* Investigate legal cases
* Conduct HR inquiries
* Respond to regulatory audits
* Trace insider or external attacks
* Retrieve historical data

Microsoft Purview provides a full suite:

* **Content Search**
* **eDiscovery (Standard)**
* **eDiscovery (Premium)**
* **Audit (Standard)**
* **Audit (Premium)**

This article explains **architecture**, **search methodology**, **collection**, **holds**, **review sets**, and **export workflows**.

## eDiscovery Levels Explained

### A) Content Search

Basic search across mailbox + SPO/OD.

### B) eDiscovery (Standard)

Adds:
* Case management
* Hold placement
* Export capability

### C) eDiscovery (Premium)

Adds:
* Custodian management
* Advanced search
* Near-duplicate detection
* Analytics
* Conversation threading
* Review sets
* Legal hold notifications

## Purview Audit Capabilities

### Audit Standard

Logs:
* File activity
* Mailbox activity
* Sharing activity
* Teams message edits

### Audit Premium

Adds:
* 1-year retention
* Advanced mailbox auditing
* Admin operations
* Search queries
* eDiscovery activities
* Insider threat activity

Powered by telemetry from:
* Microsoft Exchange Online
* Microsoft SharePoint
* Microsoft Teams

## eDiscovery Workflow (Premium)

### Step 1 — Create Case

Define case name, custodians, roles.

### Step 2 — Add Custodians

Custodians = users whose data is relevant.

### Step 3 — Apply Legal Hold

Stops deletion of:
* Emails
* Teams messages
* OneDrive files
* SharePoint documents

### Step 4 — Collect Data

Use search queries:

\`\`\`
(subject:"Confidential" AND sent>=2024-05-01)
\`\`\`

### Step 5 — Add to Review Set

Review sets allow:
* Document tagging
* Near-duplicate detection
* Relevance scoring
* Themes identification

### Step 6 — Export

Export formats:
* PST (email)
* Native formats
* Load files for external legal tools

## Advanced Search Options

### Keyword Query Language (KQL)

Examples:

Find emails with attachments:

\`\`\`
(attachment:"*") AND kind:email
\`\`\`

Search Teams chat about financial data:

\`\`\`
("sales report" OR "budget") AND kind:im
\`\`\`

Find documents labeled "Confidential":

\`\`\`
sensitivitylabel:"Confidential"
\`\`\`

## Common Use Cases

### Legal Investigations

Search mailboxes & Teams conversations.

### Security Investigations

Trace:
* Suspicious sign-ins
* Admin role abuse
* Mass file deletions

### HR Misconduct

Search message content and call logs.

### Data Breach Forensics

Track file access patterns.

## Troubleshooting eDiscovery Issues

### A) Hold not applying

Causes:
* User not added as custodian
* Scope misconfigured

### B) Missing Teams messages

Teams chats live in:
* Substrate storage (not mailbox)

Make sure Teams chat collection is enabled.

### C) Export failures

Check:
* Timeouts
* Large results (> 50 GB)
* Unsupported characters

## Best Practices

* Only allow legal/security teams to access eDiscovery
* Always document chain of custody
* Avoid over-collection
* Tune searches with pre-filters
* Use review sets for large investigations
* Retain audit logs for minimum 1 year

## Summary

eDiscovery and Advanced Auditing in Microsoft 365 enable organizations to perform complete, legally defensible investigations across all collaboration tools. When properly configured, they deliver deep visibility into user activity, compliance posture, and potential threat signals.
`
  },
  {
    id: 'SEC-005',
    title: 'Microsoft Defender for Endpoint (EDR): Deployment & Response',
    slug: 'defender-endpoint-edr',
    excerpt: 'Onboarding devices, threat hunting with KQL, and automated investigation response.',
    category: 'Security & Compliance',
    tags: ['Security', 'Defender', 'EDR'],
    author: 'Sayan (Admin)',
    readTime: 20,
    views: 1500,
    publishedDate: '2025-02-18',
    coverImage: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Endpoints remain the #1 target for attackers.
Phishing, malware, credential theft, ransomware — all typically start at the endpoint.

Microsoft Defender for Endpoint (MDE) is Microsoft's enterprise Endpoint Detection and Response platform, providing:

* Attack surface reduction
* Next-gen antivirus
* EDR sensor telemetry
* Threat & vulnerability management
* Automated investigation & remediation
* Endpoint DLP
* Device discovery
* Advanced hunting

This article provides an end-to-end blueprint for deploying and operationalizing MDE.

## Architecture Overview

MDE relies on:

### A) Endpoint Sensor

Runs on:
* Windows
* macOS
* Linux
* iOS & Android (via Defender mobile)

### B) Cloud Component

Hosted in Microsoft's security platform:
* Threat analytics
* Automated investigations
* Incident correlation
* Real-time device metadata

### C) Integration Layer

Connects MDE with:
* Microsoft Defender XDR
* Microsoft Sentinel
* Microsoft Intune
* Windows Security Center

## Deployment Models

### 1. Intune-based Deployment

Recommended for Azure AD joined / Hybrid devices.

Benefits:
* Zero-touch onboarding
* Configuration profiles
* Automated AV settings
* Conditional Access device compliance

### 2. Group Policy-Based Deployment

Used for legacy AD-joined devices.

### 3. Script-based Deployment

Linux/macOS endpoints via shell scripts.

### 4. Manual Onboarding (not recommended)

Used only for lab/testing.

## Key Security Capabilities

### A) Attack Surface Reduction (ASR)

Rules that block:
* Office macros
* Script-based attacks
* Credential stealing
* Obfuscated PowerShell

### B) Threat & Vulnerability Management (TVM)

Real-time vulnerability scoring:
* Missing patches
* Weak configurations
* Exposure from insecure apps

### C) Next-Gen Protection

Behavior-based AV engine that detects:
* Ransomware
* Zero-day attacks
* Fileless malware

### D) Endpoint Detection & Response

EDR provides:
* Process tree visualization
* Timeline analysis
* Artifact extraction
* Lateral movement detection

### E) Automated Investigation & Response (AIR)

Uses AI to automatically:
* Quarantine files
* Block malicious processes
* Roll back ransomware (Windows only)

## Threat Hunting with KQL

Security teams use **Advanced Hunting** queries.

### Example: Detect credential dumping tools

\`\`\`kql
DeviceProcessEvents
| where FileName in ("mimikatz.exe", "lsass_dump.exe")
\`\`\`

### Example: Detect suspicious PowerShell use

\`\`\`kql
DeviceProcessEvents
| where ProcessCommandLine contains "Invoke-Mimikatz"
\`\`\`

### Example: List high-risk vulnerabilities

\`\`\`kql
DeviceTvmSoftwareVulnerabilities
| where CvssScore > 8
\`\`\`

## Response Playbooks

### Playbook 1 — Malware Outbreak

1. Alert triggered
2. Automated investigation starts
3. MDE quarantines infected files
4. Analyst opens Incident view
5. Identify root cause
6. Trigger remediation
7. Force AV scan
8. Document & close

### Playbook 2 — Ransomware Activity

* Immediate isolation of device
* Trigger live response session
* Collect artifacts (memory dump, file tree)
* Verify file encryption
* Use "Ransomware Rollback"
* Reset user credentials
* Review lateral movement

### Playbook 3 — Privilege Escalation Attempt

* Check process chain for UAC bypass
* Block malicious tool
* Investigate user risk in Entra ID
* Escalate to IR team

## Operations & Monitoring

Teams should review:

* Vulnerability dashboard daily
* Incident queue hourly
* Hunting queries weekly
* Device exposure score monthly

Integrate alerts with:
* Defender XDR
* Sentinel analytics
* SOC workflows

## Troubleshooting MDE

### A) Device not reporting

Check:
* Onboarding status
* Sensor health
* Network proxies

### B) ASR rules breaking applications

Use audit mode → observe → enforce.

### C) Duplicate devices

Caused by OS reinstall / multiple onboarding.

## Best Practices

* Use Intune for configuration
* Keep ASR rules in enforced mode
* Use vulnerability management dashboard
* Perform regular threat hunts
* Integrate with Sentinel
* Enable automatic attack disruption

## Summary

Microsoft Defender for Endpoint delivers powerful endpoint security combining prevention, detection, and automated remediation. It forms the endpoint foundation of a Zero Trust security strategy.
`
  },
  {
    id: 'SEC-006',
    title: 'Building a Zero Trust Architecture in Microsoft 365',
    slug: 'zero-trust-architecture',
    excerpt: 'Implementing the "Never Trust, Always Verify" model across Identity, Devices, and Data.',
    category: 'Security & Compliance',
    tags: ['Security', 'Zero Trust', 'Architecture'],
    author: 'Sayan (Admin)',
    readTime: 19,
    views: 1700,
    publishedDate: '2025-02-20',
    coverImage: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Zero Trust = **never trust, always verify**.

Microsoft's Zero Trust model is built across:

* Identity
* Device
* Application
* Network
* Data
* Infrastructure

A Zero Trust architecture uses continuous validation, compliance, and risk signals from multiple M365 services including:

* Microsoft Entra ID
* Microsoft Intune
* Microsoft Defender XDR
* Microsoft Purview

## Zero Trust Pillars in Microsoft 365

### 1. Identity (The Control Plane)

Controls:
* MFA
* Conditional Access
* Risk-based policies
* Least privilege
* Privileged Identity Management

### 2. Device

Devices must be:
* Compliant
* Managed (or risk-evaluated)
* Protected by MDE

### 3. Applications

Application access uses:
* App roles
* SSO
* OAuth governance
* CA-based app restrictions

### 4. Data

Data is protected using:
* Sensitivity labels
* Encryption
* DLP
* Insider risk analytics

### 5. Infrastructure

Includes:
* Network segmentation
* Micro-perimeters
* Monitoring via Sentinel

## Designing a Zero Trust Strategy

### A) Identity First

Implement:
* Strong MFA
* Block legacy auth
* CA for all cloud apps
* PIM for admin roles

### B) Device Enforcement

Use Intune to enable:
* Compliance policies
* Device health checks
* Antivirus + ASR
* Conditional Access based on device state

### C) Session-Level Controls

Using CA App Control from Defender for Cloud Apps.

Examples:
* Block downloads
* Monitor file access
* Enforce read-only mode

### D) Data Protection Foundation

Use Purview:
* Encryption at label level
* DLP monitoring
* Auto-labeling for sensitive content

## Zero Trust Enforcement Patterns

### Pattern 1 — Unmanaged Device Restrictions

If:
* User on personal device
* Accessing SharePoint/Teams

Then:
* Allow web access
* **Block downloads**
* Disable copy/paste
* Monitor session

### Pattern 2 — Risk-Based Identity Decision

If:
* Sign-in risk = High

Then:
* Block access
* Require password reset
* Trigger Identity Protection alert

### Pattern 3 — Data Leakage Prevention

If:
* User attempts to email confidential file externally

Then:
* DLP policy blocks action
* Alert IRM
* Require business justification

### Pattern 4 — Privileged Access Control

Admins:
* Must activate roles via PIM
* Must sign-in from compliant devices
* Must use phishing-resistant MFA

## Tools Required for a Full Zero Trust Stack

### Identity Layer

* Entra MFA
* Conditional Access
* Identity Protection
* PIM

### Device Layer

* Defender for Endpoint
* Intune MDM/MAM

### Network Layer

* CA App Control
* MDE network protection

### Data Layer

* Purview labels
* DLP
* IRM
* eDiscovery

### Operations Layer

* Microsoft Sentinel

## Implementation Roadmap (Practical)

### Phase 1 — Identity Hardening

* Disable legacy auth
* Require MFA
* Deploy baseline CA policies
* Deploy PIM

### Phase 2 — Device Enforcement

* Enroll all devices
* Deploy MDE
* Block unmanaged access

### Phase 3 — Data Security

* Label all content
* Enable auto-labeling
* Deploy DLP and endpoint DLP

### Phase 4 — Cloud App Controls

* Integrate CASB
* Enforce real-time session controls

### Phase 5 — Operationalization

* Build Sentinel detection rules
* Define incident response workflows
* Continuous tuning

## Monitoring & Analytics

### Dashboards to Review Weekly

* CA failures
* Identity risks
* Device exposure score
* Insider risk alerts
* DLP incidents
* Sentinel analytics

## Best Practices

* Identity is the first perimeter
* All admins use PIM
* Treat unmanaged devices as "internet"
* Enforce labels everywhere
* Perform quarterly Zero Trust audits

## Summary

Zero Trust is not a single product — it's a continuous security strategy.
Microsoft 365 provides an integrated ecosystem across identity, device, data, and detection layers to enforce it end-to-end.

A fully implemented Zero Trust model dramatically reduces lateral movement, minimizes breach impact, and increases overall resilience.
`
  },

  // --- SharePoint Online ---
  {
    id: 'SPO-001',
    title: 'Modern Information Architecture (IA) in SharePoint Online',
    slug: 'sharepoint-information-architecture',
    excerpt: 'Designing scalable hubs, sites, and metadata structures for the enterprise.',
    category: 'SharePoint Online',
    tags: ['SharePoint', 'Architecture', 'Governance'],
    author: 'Sayan (Admin)',
    readTime: 18,
    views: 1150,
    publishedDate: '2025-02-22',
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

A poorly designed SharePoint environment becomes chaotic fast:

* Duplicate sites
* No ownership
* Broken permissions
* Lost documents
* Users storing files everywhere

Modern Information Architecture (IA) in SharePoint Online helps organizations create predictable, scalable, and secure content structures.

This guide covers enterprise-standard site design, content models, navigation, permissions, and governance.

## The Pillars of SharePoint Information Architecture

### 1. Site Architecture

Choose between:
* **Team Sites** → collaboration
* **Communication Sites** → publishing

### 2. Hub Sites

Provide:
* Unified branding
* Cross-site navigation
* Search scoping
* Content roll-up

### 3. Metadata

Structure content using:
* Columns
* Content types
* Managed metadata

### 4. Permissions Model

Follows:
* Least privilege
* Group-based access
* No item-level delegation unless required

## Designing a Scalable Site Structure

### A) Hub-and-Spoke Model

Most enterprise tenants follow:

**Department Hub Sites**
* HR Hub
* Finance Hub
* Marketing Hub
* IT Hub

Each hub contains:
* Team sites
* Project sites
* Document centers

### B) Functional Hubs

Useful for cross-department workflows:
* Policies & Procedures hub
* Projects hub
* Corporate Communications hub

### C) Regional or Business Unit Hubs

For global companies:
* APAC
* EMEA
* Americas

## Metadata Strategy

Avoid folders + subfolders + subfolders.

Instead use:
* Site columns
* Content types
* Choice fields
* Taxonomies

### Example metadata fields:

* Document Category
* Region
* Department
* Project Name
* Sensitivity Label

### Benefits:

* Better search
* Reduced duplication
* Automated retention
* Dynamic views

## Navigation Design

Use:
* **Hub Navigation:** global, cross-site
* **Site Navigation:** local, contextual
* **Audience Targeting:** user-personalized navigation

Aim: reduce clicks and cognitive load.

## Automation in IA

Integrate:
* Power Automate for document routing
* Sensitivity-based auto-labeling
* Retention policies
* Automated metadata tagging

## Governance Framework

Include:
* Site request process
* Naming conventions
* Storage quotas
* Permissions reviews
* Term store ownership
* Lifecycle policies (archive, retain, delete)

## Summary

Modern SharePoint IA is not about "sites and libraries" — it's about creating a scalable, governed content ecosystem.
A strong IA improves discoverability, reduces risk, and drives user adoption.
`
  },
  {
    id: 'SPO-002',
    title: 'Secure External Sharing in SharePoint: Collaboration Controls',
    slug: 'sharepoint-external-sharing',
    excerpt: 'Configuring tenant and site-level sharing settings securely. Guest expiration and domain restrictions.',
    category: 'SharePoint Online',
    tags: ['SharePoint', 'Security', 'Sharing'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 1300,
    publishedDate: '2025-02-25',
    coverImage: 'https://images.unsplash.com/photo-1529078155058-5d716f45d604?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

SharePoint Online is often considered "too open" or "too restrictive" when it comes to external sharing.
The truth: **it's powerful when configured correctly**.

This article covers external collaboration controls, Conditional Access integration, sensitivity label enforcement, and real-world sharing patterns.

## External Sharing Governance Layers

### 1. Tenant-Level Controls

Located in the SharePoint admin center.

Choose between:
* Anyone links
* New and existing guests
* Existing guests only
* Only people in your organization

### 2. Site-Level Controls

Allow per-site exceptions:
* Disable sharing entirely
* Restrict to specific domains
* Limit sharing to guest users

### 3. File-Level Controls

Using sensitivity labels from Microsoft Purview:
* Encrypt
* Do not forward
* Block external sharing
* Track access

## Designing a Safe Sharing Environment

### A) Classify Sites by Risk

**Open Collaboration Sites** (e.g., marketing)
* Guest access allowed
* Expiration policies
* Limited permissions

**Controlled Sites** (e.g., finance, HR)
* Guest access disabled
* Sensitivity labeling enforced

**Highly Confidential Sites**
* No external sharing
* Strict CA rules

## Sharing Links Explained

### 1. People with existing access

Safest — no permission change.

### 2. People in your organization

Internal only.

### 3. Specific people (internal or external)

Most secure for guest access.

### 4. Anyone links

Should be disabled in most enterprises.

## Conditional Access Integration

Using Microsoft Entra Conditional Access:

Block external sharing if:
* Device is unmanaged
* Session risk is high
* Location is untrusted

Or enforce:
* MFA
* App-enforced restrictions
* Limited web access

## Advanced Sharing Protections

### 1. Expiring Access

Automatically revoke guest permissions after X days.

### 2. Restricted Domains

Allow sharing only to trusted partner domains.

### 3. Guest Access Reviews

Using Access Reviews in Entra ID.

### 4. Sensitivity Labels for Sites

Automatically enforce:
* External sharing allowed/blocked
* Defaults for new documents
* Access policies

## Real-World Use Cases

### Use Case 1 — Vendor Collaboration

Project site → Limited external sharing → CA enforcement → Auto-expiry.

### Use Case 2 — Legal/HR Document Sharing

Label "Highly Confidential" → Block external sharing by policy.

### Use Case 3 — Sales Team File Exchange

Domain allow list → Track forwarding → DLP monitoring.

## Troubleshooting Sharing Failures

* Check site-level sharing setting
* Check sensitivity label restrictions
* Review user's CA policy failures
* Inspect external user account in Entra ID
* Verify guest invitation redemption

## Summary

External sharing is safe when governed with the right mix of:

* Tenant controls
* Site controls
* Sensitivity labels
* Conditional Access
* Guest lifecycle management

The goal isn't to block collaboration — it's to **control it intelligently**.
`
  },
  {
    id: 'SPO-003',
    title: 'SharePoint Search, Indexing & Content Governance',
    slug: 'sharepoint-search-governance',
    excerpt: 'Optimizing search results, managing crawled properties, and troubleshooting indexing issues.',
    category: 'SharePoint Online',
    tags: ['SharePoint', 'Search', 'Governance'],
    author: 'Sayan (Admin)',
    readTime: 18,
    views: 950,
    publishedDate: '2025-02-28',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Enterprise users often say:

> "I can't find anything in SharePoint."

This is almost never a search engine problem — it's a **content governance** and **metadata** problem.

This article explains how search works in SharePoint Online, how indexing decisions are made, and how to optimize content for enterprise-wide findability.

## How SharePoint Search Works

The search engine is part of Microsoft SharePoint Online and indexes:

* Pages
* Lists
* Documents
* Metadata
* Sensitivity labels
* User profile info

Key components:

### 1. Indexing Pipeline

Content flows through:
* Crawler
* Indexer
* Retrieval system

### 2. Search Query Engine

Uses:
* Keyword Query Language (KQL)
* Natural queries
* Property-based filters

### 3. Ranking Models

Based on:
* Metadata
* Freshness
* Click-through behavior
* Access permissions

## Why Search Fails (Common Problems)

* Poor metadata
* Excess folders
* Duplicate content
* No naming standards
* Broken permissions
* Missing content types

Search **can only rank what it understands**.

## Designing for Searchability

### A) Create Standardized Metadata

Critical fields:
* Title
* Description
* Department
* Document type
* Sensitivity

### B) Use Content Types

E.g.:
* Policy Document
* Contract
* Meeting Notes
* Technical Design

### C) Avoid Deep Folder Structures

Search performs better with flat libraries + metadata.

## Search Customization Tools

### 1. Microsoft Search Administrator

Manage:
* Bookmarks
* Q&A
* Acronyms
* Locations
* Custom result types

### 2. Vertical Search

Create search verticals like:
* Projects
* Policies
* HR documents

### 3. Custom Search in SharePoint Pages

Use:
* PnP Modern Search Web Parts
* Adaptive Cards

## Indexing Optimization

### Content that is NOT indexed:

* Recycle bin
* Drafts in non-published state
* Permissions-restricted content (security trimming)
* Certain image types

### Delay considerations

New content may take **5–15 minutes** to appear in search.

## Search Governance

### A) Naming Standards

E.g.,
\`ProjectName_DocumentType_Date\`

### B) Content Lifecycle Policies

Using Purview retention:
* Auto-delete old content
* Auto-retain legally relevant content

### C) Duplicate Management

Use Sync rules + library governance to reduce clutter.

### D) Periodic Content Review

Owners review content quarterly.

## Troubleshooting Search Issues

### A) Item not appearing

Check:
* Permissions
* Content type
* Indexing blocked flag
* Draft status

### B) Wrong ranking results

Use query analytics to tune result types.

### C) Search returns too many results

Add:
* Metadata filters
* Search refiners
* Scopes

## Summary

A great search experience in SharePoint Online is the outcome of:

* Clean IA
* Strong metadata
* Clear governance
* Search tuning
* Well-designed content models

Search is not magic — it's a reflection of how well your environment is structured.
`
  },

  // --- OneDrive for Business ---
  {
    id: 'OD-001',
    title: 'OneDrive Sync Engine Troubleshooting: Admin Guide',
    slug: 'onedrive-sync-troubleshooting',
    excerpt: 'Diagnosing sync conflicts, long path errors, and credential issues.',
    category: 'OneDrive for Business',
    tags: ['OneDrive', 'Troubleshooting', 'Sync'],
    author: 'Sayan (Admin)',
    readTime: 18,
    views: 1400,
    publishedDate: '2025-03-02',
    coverImage: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Microsoft OneDrive for Business is stable — but sync issues are the #1 user complaint in Microsoft 365 environments.

Common problems include:

* Sync icon stuck
* "Can't connect to OneDrive"
* Credentials error
* File path too long
* Conflicting edits
* Files On-Demand not loading
* Permissions mismatch after migration

This guide provides a true admin-level approach, not the usual "reset OneDrive" advice.

## How the OneDrive Sync Engine Works

The modern sync client (**ODSync.exe**) handles:

* OneDrive personal
* OneDrive for Business
* SharePoint libraries
* Teams files (behind the scenes)

Key components:

* **NGSC (Next Gen Sync Client)**
* **File system drivers for Files On-Demand**
* **Token broker service (authentication)**
* **WinINet for connectivity**

## Core Troubleshooting Framework

### Step 1 — Check User Identity & Tokens

OneDrive depends entirely on:
* Primary Refresh Token (PRT)
* Web Account Manager (WAM)

Check:

**Windows 10/11**
Run:

\`\`\`cmd
dsregcmd /status
\`\`\`

Look for:
* AzureAdJoined = YES
* WamDefaultSet = YES
* SSO state = SUCCESS

If not → OneDrive will always fail intermittently.

### Step 2 — Verify Files On-Demand Driver

Run:

\`\`\`cmd
fsutil fsinfo volumeinfo c:
\`\`\`

Look for:
* ReFS disabled
* NTFS
* Cloud Files mini-filter = enabled

If disabled:
* Group Policy may be blocking
* Old antivirus drivers may conflict

### Step 3 — Inspect Sync Error Codes

Examples:

| Error Code | Meaning | Fix |
|------------|---------|-----|
| **0x8004dec5** | Sign-in blocked by CA | Check Conditional Access device compliance |
| **0x8004def0** | User not licensed | Assign SharePoint/OneDrive license |
| **0x80070185** | Network timeout | Disable VPN split tunnel; check proxy |
| **0x8007016A** | File locked | Remove IRM or check SPO library settings |

### Step 4 — Fix Broken Registry or Configuration

Check:

\`\`\`
HKCU\\Software\\Microsoft\\OneDrive
\`\`\`

Common issues:
* TenantID mismatch
* Machine is using old Groove.exe remnants
* Invalid library subscription

### Step 5 — Reset OneDrive (Safest Method)

Run:

\`\`\`cmd
%localappdata%\\Microsoft\\OneDrive\\onedrive.exe /reset
\`\`\`

If OneDrive does not restart:

\`\`\`cmd
%localappdata%\\Microsoft\\OneDrive\\onedrive.exe
\`\`\`

**Note:** Reset does NOT delete user data.

## Enterprise Issues & Real Resolutions

### Issue A — Files Stuck on "Processing Changes"

Causes:
* Large number of items (> 300k)
* Long paths
* Corrupt cache
* Antivirus scanning sync folder

Fix:
* Reduce library scope
* Enable Files On-Demand
* Reset ODSync

### Issue B — Long Path Errors

If file path > 400 characters:

Fix:
* Enable long paths via GPO
* Educate users
* Use flatter folder structure

### Issue C — SharePoint Permissions Change Breaks Sync

Symptoms:
* Yellow triangle
* Access denied failures

Fix:
* Remove library from sync
* Resync with new permissions
* Ensure user has BOTH:
  * Library permissions
  * Site permissions

### Issue D — "This file is locked by another user"

Reasons:
* Office coauthoring session stuck
* Versioning issues
* Old Office cache

Fix:

\`\`\`
%localappdata%\\Microsoft\\Office\\16.0\\OfficeFileCache
\`\`\`

Clear cache → Restart Office.

## Best Practices for Enterprises

* Keep OneDrive client updated via Intune or GPO
* Use Files On-Demand always
* Limit libraries synced to < 300k items
* Deploy Known Folder Move (KFM)
* Use Conditional Access for unmanaged devices
* Enforce naming conventions to avoid path issues

## Summary

Most OneDrive issues are not caused by OneDrive — but by:

* Identity tokens
* Device compliance
* Files On-Demand configuration
* Network/proxy issues
* Permissions
* Volume limits

By following the troubleshooting framework above, admins can resolve 90% of issues without escalation.
`
  },
  {
    id: 'OD-002',
    title: 'Deploying OneDrive Known Folder Move (KFM) at Scale',
    slug: 'onedrive-kfm-deployment',
    excerpt: 'Redirecting Desktop, Documents, and Pictures to OneDrive via Intune policies.',
    category: 'OneDrive for Business',
    tags: ['OneDrive', 'Intune', 'KFM'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 1600,
    publishedDate: '2025-03-05',
    coverImage: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Known Folder Move (KFM) redirects:

* Desktop
* Documents
* Pictures

…into Microsoft OneDrive for Business, giving organizations:

* Automatic backup
* Ransomware resilience
* Seamless device replacement
* Profile roaming

KFM is one of the **highest-impact M365 improvements** for endpoint reliability.

## How KFM Works

KFM redirects shell folders using:

* User-specific registry keys
* Tenant GUID
* ODSync policies

Folder redirection is instant and transparent.

## Deployment Methods

### A) Microsoft Intune (Recommended)

Configuration profile →
**Administrative Templates → OneDrive**

Key settings:
* "Silently move Windows known folders to OneDrive"
* "Prompt users to move folders" (fallback)
* "Prevent users from turning off KFM"

### B) Group Policy (Traditional Environments)

GPO path:

\`\`\`
Computer Configuration → Administrative Templates → OneDrive
\`\`\`

Ensure:
* OneDrive version is up to date
* ADMX templates synced

## KFM Readiness Checks

Before enabling KFM, verify:

* OneDrive is signed in
* Sync health is green
* No conflicting folder redirection policies
* Shell folders are at default paths
* Device is Azure AD joined or hybrid

## Common KFM Issues & Fixes

### Issue A — "We can't move your folder because there's a file in use"

Fix:
* Close Office apps
* Disable third-party sync agents
* Unlock files from IRM/labels

### Issue B — Existing Folder Redirection GPO Conflicting

Symptoms:
* KFM fails
* Duplicate folders

Fix:
* Remove legacy Folder Redirection GPO
* Reboot
* Re-run KFM

### Issue C — Low Disk Space Triggering Failure

Windows requires free space for placeholder creation.

Fix:
* Enable Files On-Demand
* Reduce local cache

### Issue D — Known Folder inside non-standard path

Example:

\`\`\`
D:\\Users\\Desktop
\`\`\`

Fix:
* Move back to default path
* Run KFM again

## Ransomware Protection With KFM

When combined with:
* Defender Controlled Folder Access
* OneDrive version history
* Endpoint DLP

KFM provides excellent data resilience.

Users can restore files via OneDrive "Restore your OneDrive" (30-day event-based snapshot).

## Best Practices

* Use silent/forced KFM deployment
* Use exclusions only for developers
* Avoid Folder Redirection GPO & KFM combined
* Monitor with OneDrive admin reports
* Validate deployment in pilot groups

## Summary

KFM dramatically increases endpoint reliability and user satisfaction.
With proper Intune or GPO configuration, it's one of the simplest high-value deployments across enterprise devices.
`
  },
  {
    id: 'OD-003',
    title: 'OneDrive Sharing, Restore & Ransomware Recovery',
    slug: 'onedrive-restore-recovery',
    excerpt: 'Admin capabilities for recovering deleted files, restoring entire drives, and managing sharing.',
    category: 'OneDrive for Business',
    tags: ['OneDrive', 'Security', 'Recovery'],
    author: 'Sayan (Admin)',
    readTime: 16,
    views: 1100,
    publishedDate: '2025-03-08',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Users often treat Microsoft OneDrive for Business like personal storage — but it is an enterprise-grade platform with:

* File restore
* Ransomware detection
* Sharing governance
* Versioning
* Compliance integration
* Retention labels
* Activity auditing

This guide unpacks **advanced admin capabilities**.

## OneDrive Sharing Model

### Sharing Options

* Specific people
* People in your organization
* Anyone links (should be disabled)

### Admin controls include:

* Domain restrictions
* Link expiration enforcement
* Default link type
* Block download for sensitive content
* Sharing audit logs

## File Restore vs Version History

### Version History

* Per-file
* Great for accidental edits

### OneDrive Restore

* Snapshot of entire OneDrive
* Up to 30 days
* Useful for:
  * Mass deletion
  * Ransomware
  * Malware corruption

## Ransomware Detection & Recovery

OneDrive uses AI to detect:

* High-volume file modifications
* Suspicious encryption patterns
* Mass delete/rename events

When ransomware is detected:

* User is notified
* Admin receives alert
* Restore wizard walks through recovery steps

## Compliance & Information Protection

OneDrive integrates with:

* Purview sensitivity labels
* DLP policies
* Retention labels
* eDiscovery

If a file is labeled "Confidential":

* External sharing may be blocked
* Unmanaged device access restricted
* Encryption applied

## Troubleshooting OneDrive Sharing

### Issue A — "You can't share this file"

Root causes:
* Sensitivity label block
* Site-level sharing set to internal-only
* Tenant-level restriction
* Conditional Access blocking external guests

### Issue B — External users receiving "Access Denied"

Fix:
* Check guest user object in Entra ID
* Confirm invitation accepted
* Check file inheritance

### Issue C — Missing Version History

Causes:
* File moved using non-Microsoft tools
* Synced library with versioning disabled
* Migration using incorrect method

Fix:
* Ensure SPO versioning is always enabled
* Use migration tools (SharePoint Migration Tool, Mover.io)

## Best Practices

* Set default link type to "Specific people"
* Disable Anyone links
* Use sensitivity labels everywhere
* Enable versioning + retention
* Educate users on Restore feature
* Monitor sharing events weekly

## Summary

OneDrive is far more capable than simple cloud storage — when used properly, it acts as:

* A user's personal backup
* A ransomware recovery tool
* A secure sharing platform
* A compliance-managed repository

Admins should leverage these capabilities to maximize resilience and reduce data risk.
`
  },

  // --- Reporting & Power Platform ---
  {
    id: 'REPORT-001',
    title: 'Getting Started with Power BI for M365 Admins',
    slug: 'power-bi-m365-start',
    excerpt: 'Connecting Power BI to Microsoft 365 Usage Analytics for custom dashboards.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'Power BI', 'Analytics'],
    author: 'Sayan (Admin)',
    readTime: 12,
    views: 1000,
    publishedDate: '2025-03-10',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Most Microsoft 365 admins rely on:

* Admin Center reports
* CSV exports
* Azure AD logs
* Defender/XDR reports

But these have limitations.
Microsoft Power BI solves this by allowing you to build dashboards for:

* License usage
* Mail flow
* Teams activity
* Device compliance
* SharePoint/OneDrive adoption

This guide shows simple, admin-friendly techniques to build your **first reporting dashboard** without deep BI expertise.

## Connect Power BI to Microsoft 365

You can pull data from:

### A) Microsoft 365 Admin Center → Usage Reports

Export to:
* CSV
* Excel
* Power BI templates

### B) Azure AD Sign-In Logs

Connect via:
* Azure Monitor Logs
* Log Analytics Workspace

### C) Security & Compliance Center Reports

Email traffic logs, DLP logs, eDiscovery metrics.

### D) Teams & SharePoint Reports

Usage trends, active sites, file counts.

## Build a Simple "Tenant Health Dashboard"

Recommended visuals:

1. **Active users by workload**
2. **Mailbox size distribution**
3. **Teams meeting minutes trend**
4. **Device compliance status**
5. **License consumption**
6. **Top 10 risky logins**

## Basic Transformations Every Admin Should Know

* Remove blank columns
* Rename fields
* Split columns (e.g., location paths)
* Merge queries
* Create date tables for trending

Power BI makes these easy with **Power Query**.

## Publishing & Sharing

You can publish dashboards securely to:

* Teams
* SharePoint
* Power BI service

Use **Row-Level Security** for controlling access to sensitive reports.

## Summary

Even without BI expertise, admins can build clean dashboards that replace **20–30 manual CSV exports per month**.
Power BI becomes your **single pane of glass** for tenant insights.
`
  },
  {
    id: 'REPORT-002',
    title: 'Using Power Automate for Reporting Automation',
    slug: 'power-automate-reporting',
    excerpt: 'Automating the extraction and emailing of reports using scheduled flows.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'Power Automate', 'Automation'],
    author: 'Sayan (Admin)',
    readTime: 13,
    views: 950,
    publishedDate: '2025-03-12',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Power Automate lets you automate repetitive reporting tasks like:

* Exporting logs
* Sending weekly usage reports
* Extracting Intune device lists
* Archiving SharePoint site reports
* Delivering Teams activity summaries to leadership

You don't need coding — just logic.

## Useful Connectors for Admin Reporting

### Microsoft 365 Outlook

Send automated emails with reports attached.

### SharePoint

Store reports in document libraries.

### Teams

Send adaptive card updates to reporting channels.

### Excel Online

Append new rows daily/weekly.

### Power BI

Refresh datasets automatically.

## Popular Automation Templates

### Template 1 — Weekly Admin Digest

Flow:
1. Pull user activity → M365 usage API
2. Build CSV
3. Email leadership
4. Store archive copy

### Template 2 — Intune Device Compliance Auto-Report

Flow:
1. Query Intune Graph API
2. Filter noncompliant devices
3. Auto-update an Excel dashboard
4. Notify SOC channel

### Template 3 — Teams Usage Alerts

If meeting usage drops → DM owner/team lead.

## Key Concepts Without Code

* Triggers ("Every Monday")
* Actions ("Get items from SharePoint")
* Conditions ("If count > 100, alert admin")
* Loops (iterate through users)

Power Automate is simple once you learn these 4 ideas.

## Summary

Power Automate becomes your *virtual reporting assistant*.
Use it to eliminate repetitive admin tasks, improve accuracy, and centralize reporting.
`
  },
  {
    id: 'REPORT-003',
    title: 'Power Apps for M365 Admins: Build Admin Tools Without Coding',
    slug: 'power-apps-admin-tools',
    excerpt: 'Creating simple apps for helpdesk ticketing, user onboarding forms, and inventory.',
    category: 'Reporting & Power Platform',
    tags: ['Power Platform', 'Power Apps', 'Tools'],
    author: 'Sayan (Admin)',
    readTime: 14,
    views: 800,
    publishedDate: '2025-03-15',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Admins often maintain:

* License request forms
* Access request trackers
* Ticket intake forms
* Change approval workflows
* User onboarding checklists

Power Apps turns these into **interactive apps** without development skills.

## What Admins Commonly Build With Power Apps

### 1. License Management App

Track:
* Assigned licenses
* Approval matrix
* Renewal needs

### 2. IT Self-Service Portal

Users can request:
* Shared mailboxes
* Team creation
* Distribution Lists

### 3. Reporting Dashboards

Power Apps can display:
* SharePoint lists
* Power BI tiles
* Usage KPIs

## Power Apps + Dataverse Lite (for admins)

Dataverse provides:

* Secure tables
* Role-based permissions
* Validation
* Integration with Power Automate

Admins can build *mini ITSM systems*.

## Governance Tips

* Limit app makers
* Use naming standards
* Assign security roles
* Track app usage reports
* Avoid "shared owner" sprawl

## Summary

With Power Apps, you're no longer limited to the Admin Center UI — you can design the tools you wish Microsoft built.
`
  },
  {
    id: 'REPORT-004',
    title: 'Simple Reporting with M365 Admin Center: Hidden Reports',
    slug: 'm365-admin-center-reports',
    excerpt: 'Discovering valuable insights buried in the Admin Center UI.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'Admin Center'],
    author: 'Sayan (Admin)',
    readTime: 10,
    views: 1200,
    publishedDate: '2025-03-18',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

The built-in reports in the Admin Center are often ignored, yet they provide **instant dashboards** with no setup:

* Adoption reports
* Productivity score
* Security score
* Teams device usage
* Email security reports

## Useful Reports for Day-to-Day Operations

### A) Usage Reports

Track:
* Active users
* License activation
* SharePoint/OneDrive storage

### B) Email & Security Reports

Shows:
* Malware detections
* Spoof attempts
* Quarantine stats

### C) Productivity Score

Insights into:
* Meetings
* Collaboration
* Device startup times

### D) Teams Analytics

View:
* Call quality
* Meeting duration
* PSTN minutes

## Why These Reports Matter

* Quick insights for leadership
* No BI knowledge needed
* Zero setup
* Export available

## Summary

Admin Center reporting is simple, clean, and ready-made.
You should use it before building custom BI dashboards.
`
  },
  {
    id: 'REPORT-005',
    title: 'Building an Intune Compliance Dashboard with Power BI',
    slug: 'intune-compliance-dashboard',
    excerpt: 'Visualizing device compliance, OS versions, and non-compliance reasons.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'Intune', 'Power BI'],
    author: 'Sayan (Admin)',
    readTime: 13,
    views: 1100,
    publishedDate: '2025-03-20',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Intune provides device-level compliance data but lacks cross-department dashboards.
Power BI fills this gap by giving a quick visual representation of:

* Compliance trends
* OS version distribution
* High-risk devices
* Enrollment status
* Conditional Access readiness

## Data Sources

* Intune Data Warehouse
* Graph API reports
* CSV exports from Intune admin center

## Recommended Dashboard Visuals

1. **Compliance by platform (Win/Mac/iOS/Android)**
2. **Devices by OS version**
3. **Devices at risk (Defender ATP signal)**
4. **Noncompliant reasons (top 10)**
5. **Enrollment success/failure trends**

## Simplest Method: CSV → Power BI

Even without APIs:

1. Export compliance CSV weekly
2. Load into Power BI
3. Append new data
4. Publish dashboard

## Summary

A simple compliance dashboard reduces noise, helps prioritize patching, and gives leadership clear visibility.
`
  },
  {
    id: 'REPORT-006',
    title: 'Understanding M365 Security & Compliance Score',
    slug: 'security-compliance-score',
    excerpt: 'How to interpret and improve your Secure Score and Compliance Score.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'Security', 'Compliance'],
    author: 'Sayan (Admin)',
    readTime: 10,
    views: 1300,
    publishedDate: '2025-03-22',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Microsoft provides two built-in scoring systems:

* Microsoft Secure Score
* Microsoft Compliance Score

Both are simple, visual "report cards" for your tenant.

## Secure Score

Tracks improvements across:

* Identity
* Device
* Data
* Apps
* Infrastructure

Example actions:
* Enforce MFA
* Enable DLP
* Configure CA policies

Score improves visibly as you complete tasks.

## Compliance Score

Tracks:

* Regulatory compliance
* Insider risk
* Information protection
* Audit readiness

Includes recommended improvement actions with explanations.

## How Admins Use These Scores

* Present monthly to leadership
* Show progress
* Highlight risks
* Justify security investments

## Summary

Secure Score + Compliance Score = the easiest reporting tools in M365.
They require no setup, no BI skills, and provide immediate insights.
`
  },
  {
    id: 'REPORT-007',
    title: 'Top 10 Built-In M365 Reports Every Admin Should Check Weekly',
    slug: 'top-10-m365-reports',
    excerpt: 'The essential list of reports for proactive administration.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'Best Practices'],
    author: 'Sayan (Admin)',
    readTime: 12,
    views: 1500,
    publishedDate: '2025-03-25',
    coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Before building dashboards or using Power BI, Microsoft 365 already provides **dozens of powerful built-in reports**. These require no setup, no API work, and no BI knowledge.

If reviewed weekly, they give a near-complete health overview of your tenant.

Here are the *10 must-check reports* for modern M365 admins.

## Report #1: Azure AD Sign-In Logs

Where to find:
**Entra Admin Center → Sign-In Logs**

Shows:
* Failed logins
* MFA prompts
* Conditional Access results
* Risky sign-ins
* Unusual locations

Why it matters:
This is your **first line of defense** against identity attacks.

## Report #2: Entra ID Audit Logs

Shows:
* Role assignments
* App registrations
* Password resets
* Account lifecycle events

You must check this weekly to spot privilege misuse.

## Report #3: Exchange Online Mail Flow Dashboard

Where: **Exchange Admin Center → Mail Flow → Dashboard**

Shows:
* Email volume
* Malware blocked
* Spam trends
* Transport rule matches
* Top senders/recipients

Great for solving "email slow/delayed/not delivered" complaints.

## Report #4: Microsoft 365 Usage Analytics

Shows:
* Active users by workload
* Adoption trends
* Storage usage
* Product activity breakdown

Useful for leadership reporting.

## Report #5: OneDrive & SharePoint Storage Report

Where: **SharePoint Admin Center → Sites → Active Sites**

Shows:
* Storage used
* File activity
* Sharing status

You can quickly identify sites nearing quota limits.

## Report #6: Teams Usage Report

Where: **Teams Admin Center → Analytics & Reports**

Shows:
* Meeting minutes
* Active meetings
* PSTN usage
* Device usage (headsets, Teams Rooms)

Helps justify Teams adoption to stakeholders.

## Report #7: Defender Threat Analytics

Shows:
* Malware detections
* Attack campaigns
* Exposure score
* Threat vectors

You get **security posture in one page.**

## Report #8: DLP Incident Reports

Shows:
* Policy matches
* Blocked actions
* Sensitive data activity
* User overrides

Critical for compliance teams.

## Report #9: Secure Score Weekly Change Report

Shows:
* Security improvements
* New recommendations
* Baseline drift

Great for monthly CISO reports.

## Report #10: Compliance Score

Shows:
* Compliance gaps
* Recommended improvements
* Regulatory posture

Perfect for risk, audit, and InfoSec teams.

## Summary

These 10 built-in reports give you a complete **identity + device + data + email + security** snapshot of your tenant — *without any custom dashboards*.
`
  },
  {
    id: 'REPORT-008',
    title: 'Create User Activity Summary with PowerShell + Excel',
    slug: 'user-activity-powershell',
    excerpt: 'Scripting data extraction for custom Excel reporting.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'PowerShell', 'Excel'],
    author: 'Sayan (Admin)',
    readTime: 14,
    views: 1000,
    publishedDate: '2025-03-28',
    coverImage: 'https://images.unsplash.com/photo-1543286386-713df548e9cc?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Many admins don't want Power BI or Graph API yet — they just need a simple weekly report.

This guide shows how to create a **User Activity Summary Report** using:

* Exchange Online PowerShell
* Teams PowerShell
* OneDrive/SharePoint analytics
* Basic Excel formatting

No coding skill required.

## What This Report Contains

For each user, you can capture:

* **Mailbox size**
* **Emails sent/received (last 7 days)**
* **Teams activity count**
* **OneDrive file activity**
* **Last sign-in date**
* **License status**

## Connect to PowerShell Modules

### Exchange Online

\`\`\`powershell
Connect-ExchangeOnline
\`\`\`

### Microsoft Graph Users

\`\`\`powershell
Connect-MgGraph -Scopes "User.Read.All"
\`\`\`

### Teams

\`\`\`powershell
Connect-MicrosoftTeams
\`\`\`

## Generate User Activity Data

### Mailbox size

\`\`\`powershell
Get-EXOMailboxStatistics -Identity user@domain.com
\`\`\`

### Teams user activity summary

\`\`\`powershell
Get-TeamUserActivityUserDetail -Period D7
\`\`\`

### OneDrive file activity

\`\`\`powershell
Get-SPOOneDriveActivityReport -Period D7
\`\`\`

### Last sign-in

\`\`\`powershell
Get-MgUser -UserId user@domain.com | select SignInActivity
\`\`\`

## Export to CSV

Example:

\`\`\`powershell
$report | Export-Csv "M365UserActivity.csv" -NoTypeInformation
\`\`\`

## Format in Excel

Use simple Excel steps:

* Conditional formatting → highlight inactive users
* Create pivot table → activity by department
* Line chart → weekly activity trends

## Summary

This lightweight method gives you a **simple but effective activity dashboard** without any BI tools.
`
  },
  {
    id: 'REPORT-009',
    title: 'Beginner\'s Guide to Power BI Data Modeling for M365',
    slug: 'power-bi-data-modeling',
    excerpt: 'Structuring M365 data for effective visualization.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'Power BI', 'Data'],
    author: 'Sayan (Admin)',
    readTime: 12,
    views: 850,
    publishedDate: '2025-03-30',
    coverImage: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Most M365 admins struggle with Power BI because they think it's "too technical."

This article shows the **simplest modeling approach** to build real dashboards without touching advanced DAX or complex architecture.

## The Only 3 Tables You Need for Basic M365 Reporting

### 1. Date Table

Essential for trending.

Create using Power Query:

\`\`\`
= List.Dates(#date(2024,1,1),365,#duration(1,0,0,0))
\`\`\`

### 2. User Activity Table

From usage exports:
* Teams meetings
* Email activity
* SharePoint file activity

### 3. Device/Compliance Table or Security Table

From Intune CSV or Defender exports.

## Build Relationships

One-to-many:
* Date → Activity
* User → Activity

Keep the model simple and flat.

## Basic Visuals for Admins

* Bar chart: Active users by department
* Line chart: Teams meeting trends
* KPI card: Secure Score
* Table: Top devices failing compliance

## Summary

Power BI modeling for M365 does **not** need complexity.
Start with 2–3 tables and build visuals — that's enough for most admin dashboards.
`
  },
  {
    id: 'REPORT-010',
    title: 'Build IT Service Request Dashboard with Power Apps + Automate',
    slug: 'it-service-dashboard',
    excerpt: 'Creating a custom ticketing dashboard.',
    category: 'Reporting & Power Platform',
    tags: ['Power Platform', 'Dashboard', 'Automation'],
    author: 'Sayan (Admin)',
    readTime: 15,
    views: 900,
    publishedDate: '2025-04-01',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Every IT team needs a request tracker.
With Power Apps + Power Automate, you can build one in under an hour.

## Components Needed

### SharePoint List (Database)

Columns:
* Request Title
* Category
* Requester
* Status
* Assigned To
* Created Date
* Completed Date

### Power App (User Interface)

* Submit new requests
* View pending tickets
* Track status

### Power Automate (Workflow)

* Send approval
* Notify team
* Update SharePoint list

## Build Flow: "New Request → Notify IT → Update Dashboard"

1. Trigger: New item in SharePoint
2. Action: Send Teams/Outlook notification
3. Logic: Assign to technician based on category
4. Update SharePoint status column
5. Refresh Power BI dashboard

## Dashboard Elements

* Total open tickets
* Avg resolution time
* Tickets by category
* Tickets by technician

## Summary

You now have a **mini ITSM system** without ServiceNow cost.
Perfect for small teams or internal projects.
`
  },
  {
    id: 'REPORT-011',
    title: 'Microsoft Graph API for Reporting: Beginner Edition',
    slug: 'graph-api-reporting-beginner',
    excerpt: 'How to use Graph Explorer and basic API calls for reports.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'Graph API', 'Dev'],
    author: 'Sayan (Admin)',
    readTime: 14,
    views: 1100,
    publishedDate: '2025-04-03',
    coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Graph API sounds scary — but for reporting, it's simple.
You only need a few beginner endpoints.

## Authenticate Using Graph Explorer

Visit the official Graph Explorer.
Login → Grant permissions → Run queries.

## Useful Beginner Reporting Endpoints

### 1. List All Users

\`\`\`
GET https://graph.microsoft.com/v1.0/users
\`\`\`

### 2. Get Sign-In Logs

\`\`\`
GET https://graph.microsoft.com/v1.0/auditLogs/signIns
\`\`\`

### 3. Teams Activity Report

\`\`\`
GET https://graph.microsoft.com/beta/reports/getTeamsUserActivityUserDetail(period='D7')
\`\`\`

### 4. License Consumption

\`\`\`
GET https://graph.microsoft.com/v1.0/subscribedSkus
\`\`\`

### 5. OneDrive Storage

\`\`\`
GET https://graph.microsoft.com/v1.0/users/{id}/drive
\`\`\`

## Export to CSV

You can copy JSON → convert to CSV using:

* Power Automate
* Excel Power Query
* Any online JSON-to-CSV tool

## Summary

Graph API gives you **richer reports than the Admin Center**, and this tutorial lets beginners use it with zero coding.
`
  },
  {
    id: 'REPORT-012',
    title: 'Monitor License Usage Trends Without Power BI',
    slug: 'monitor-license-trends',
    excerpt: 'Tracking license consumption over time using PowerShell and scheduled tasks.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'Licensing', 'PowerShell'],
    author: 'Sayan (Admin)',
    readTime: 12,
    views: 950,
    publishedDate: '2025-04-05',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Not everyone wants BI dashboards.
This article shows a simple reporting method using:

* Built-in Admin Center reports
* CSV exports
* Power Automate workflows
* Excel charts

## Steps to Build the Report

### Step 1 — Export License Usage Weekly

Admin Center → Billing → Licenses → Download report.

### Step 2 — Store Reports in SharePoint

Use a folder:

\`\`\`
/Shared Documents/LicenseReports/
\`\`\`

### Step 3 — Automate Using Power Automate

Flow:
1. Trigger weekly
2. Download latest license CSV
3. Append to an Excel "master table"
4. Notify IT team

### Step 4 — Build Excel Charts

* Total licenses used
* License distribution
* Trendline of growth
* Warnings when usage > 90%

## Why This Is Useful

* Simple
* No BI required
* Perfect for small/mid-size orgs
* Easy to maintain
* Can be automated end-to-end

## Summary

This method gives you a **clean, lightweight license dashboard** using tools every admin already has.
`
  },
  {
    id: 'REPORT-013',
    title: 'Build Security Dashboard with Secure Score + Excel',
    slug: 'security-dashboard-excel',
    excerpt: 'Exporting Secure Score history to visualize security posture improvement.',
    category: 'Reporting & Power Platform',
    tags: ['Reporting', 'Security', 'Excel'],
    author: 'Sayan (Admin)',
    readTime: 11,
    views: 800,
    publishedDate: '2025-04-08',
    coverImage: 'https://images.unsplash.com/photo-1614064641938-3e85299748ea?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Not all teams want Sentinel or Power BI dashboards.
This article shows how to create a security dashboard using:

* Secure Score
* Compliance Score
* Basic exports
* Excel charts

## Export Secure Score Data

From the Secure Score portal:

* Export improvement actions
* Export control status
* Export historical trend data

## Export Compliance Score Data

From Compliance Manager:

* Improvement actions
* Control mappings
* Assessment score

## Build Excel Dashboard Visuals

### Recommended visuals:

**1. Security Score Trendline (Last 30 days)**
**2. Completed vs Pending Improvement Actions**
**3. Compliance Score Breakdown by Category**
**4. Priority Risk Areas**
**5. Heatmap of Control Failures**

## Summary

This dashboard requires no BI tool but gives a **quick security health snapshot**, perfect for:

* Monthly meetings
* Audit discussions
* SOC summaries
`
  },

  // --- Automation & Scripts ---
  {
    id: 'AUTO-001',
    title: 'Essential PowerShell Automation for M365 Admins',
    slug: 'essential-powershell-automation',
    excerpt: 'Core scripts for user management, licensing, and reporting.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'PowerShell', 'Basics'],
    author: 'Sayan (Admin)',
    readTime: 15,
    views: 2000,
    publishedDate: '2025-04-10',
    coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

PowerShell is the backbone of Microsoft 365 automation.
Every serious admin uses it to:

* Automate repetitive tasks
* Pull rich reports
* Create / manage users at scale
* Troubleshoot issues
* Integrate with monitoring tools

This article covers **practical automation scenarios** that directly improve operations.

## Connect to All Required Modules

\`\`\`powershell
Install-Module ExchangeOnlineManagement
Install-Module Microsoft.Graph
Install-Module MicrosoftTeams
Install-Module AzureAD
\`\`\`

Authenticate:

\`\`\`powershell
Connect-ExchangeOnline
Connect-MgGraph -Scopes "User.Read.All,Reports.Read.All"
Connect-MicrosoftTeams
\`\`\`

## Automation Use Case #1: Generate Weekly Inactive User Report

\`\`\`powershell
$inactive = Get-MgUser -All | where {
    $_.signInActivity.lastSignInDateTime -lt (Get-Date).AddDays(-30)
}
$inactive | Export-Csv "InactiveUsers_30Days.csv" -NoTypeInformation
\`\`\`

This identifies users who may not need licenses anymore.

## Automation Use Case #2: Bulk Create Shared Mailboxes

\`\`\`powershell
Import-Csv sharedmbx.csv | foreach {
    New-Mailbox -Shared -Name $_.Name -PrimarySmtpAddress $_.Email
}
\`\`\`

## Automation Use Case #3: Reset MFA for Multiple Users

\`\`\`powershell
Import-Csv users.csv | foreach {
    Reset-MsolStrongAuthenticationMethodByUpn -UserPrincipalName $_.UserPrincipalName
}
\`\`\`

## Automation Use Case #4: Export All Teams Members

\`\`\`powershell
$teams = Get-Team
foreach ($team in $teams){
    Get-TeamUser -GroupId $team.GroupId |
        Export-Csv "$($team.DisplayName)_Members.csv" -Append
}
\`\`\`

## Summary

Every admin should maintain a **PowerShell automation toolkit** for recurring tasks.
This foundation reduces manual work and improves tenant hygiene.
`
  },
  {
    id: 'AUTO-002',
    title: 'PowerShell Tenant Health Checker: Daily Validation Script',
    slug: 'tenant-health-checker',
    excerpt: 'Automated script to check service health, connector status, and critical alerts.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Health Check', 'PowerShell'],
    author: 'Sayan (Admin)',
    readTime: 14,
    views: 1800,
    publishedDate: '2025-04-12',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

This article covers a **complete PowerShell-based health-check script** that evaluates:

* Licensing
* Mail flow
* Suspicious sign-ins
* Teams status
* Intune device compliance
* Security posture

Outputs a single **HTML dashboard**.

## Script Components

### Check 1 — Suspicious Sign-Ins

\`\`\`powershell
$risky = Invoke-MgGraphRequest -Uri "https://graph.microsoft.com/v1.0/identityProtection/riskyUsers"
\`\`\`

### Check 2 — License Consumption

\`\`\`powershell
$licenses = Get-MgSubscribedSku
\`\`\`

### Check 3 — Mail Flow Queue Health

\`\`\`powershell
Get-TransportService | Get-Queue
\`\`\`

### Check 4 — Teams Service Status

\`\`\`powershell
Get-CsTenantServiceDiagnostic
\`\`\`

### Check 5 — Intune Non-Compliant Devices

\`\`\`powershell
$nonCompliant = Get-MgDeviceManagementManagedDevice | where {$_.ComplianceState -ne "compliant"}
\`\`\`

## Generate HTML Dashboard

\`\`\`powershell
ConvertTo-Html -Body $report -Title "M365 Daily Health Report" |
    Out-File "HealthReport.html"
\`\`\`

This can be emailed daily through Outlook.

## Summary

This PowerShell-based Tenant Health Checker is a **must-have automation asset** for any M365 admin.
`
  },
  {
    id: 'AUTO-003',
    title: 'Graph API Automation for M365: Practical Guide',
    slug: 'graph-api-automation-guide',
    excerpt: 'Moving from PowerShell cmdlets to Graph API HTTP requests.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Graph API', 'Dev'],
    author: 'Sayan (Admin)',
    readTime: 16,
    views: 1600,
    publishedDate: '2025-04-15',
    coverImage: 'https://images.unsplash.com/photo-1607799275518-d58665d096b1?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Graph API unlocks **every Microsoft 365 workload** (Exchange, Teams, Intune, SharePoint, Entra).
This article provides **simple automation scenarios** for beginners.

## Authentication

Using PowerShell:

\`\`\`powershell
Connect-MgGraph -Scopes "User.Read.All,Group.Read.All,AuditLog.Read.All"
\`\`\`

## Automation Scenario #1: Detect Dormant Teams

\`\`\`powershell
$teams = Invoke-MgGraphRequest -Uri "https://graph.microsoft.com/v1.0/teams"
\`\`\`

Identify teams with **no messages or activity for 60 days**.

## Automation Scenario #2: Get Sign-In Risk Report

\`\`\`powershell
$risk = Invoke-MgGraphRequest -Uri "https://graph.microsoft.com/v1.0/riskySignIns"
\`\`\`

This is used by security teams to prioritize alerts.

## Automation Scenario #3: Get OneDrive File Activity

\`\`\`powershell
$result = Invoke-MgGraphRequest -Uri "https://graph.microsoft.com/v1.0/reports/getOneDriveActivityUserDetail(period='D7')"
\`\`\`

You can convert this into CSV for reporting.

## Automation Scenario #4: Export All Licensed Users

\`\`\`powershell
Get-MgUser -All | where {$_.AssignedLicenses} |
    Export-Csv "LicensedUsers.csv" -NoTypeInformation
\`\`\`

## Summary

Graph API isn't hard.
Once you understand endpoints, it becomes **the most powerful automation tool** in Microsoft 365.
`
  },
  {
    id: 'AUTO-004',
    title: 'Build Graph API Reporting Pipeline (Beginner-Friendly)',
    slug: 'graph-api-reporting-pipeline',
    excerpt: 'Automating report extraction to Azure Blob or SharePoint.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Reporting', 'Pipeline'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 1400,
    publishedDate: '2025-04-18',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

This article teaches admins how to build an **end-to-end reporting pipeline** using:

* Graph API
* Power Automate
* SharePoint
* Excel

Completely no-code/low-code.

## Step 1: Use Power Automate to Query Graph API

Example: **Get Teams Activity**

\`\`\`
GET https://graph.microsoft.com/v1.0/reports/getTeamsDeviceUsageUserDetail(period='D7')
\`\`\`

## Step 2: Store Data in SharePoint

Create a list or Excel workbook named:

\`\`\`
TeamsReport.xlsx
\`\`\`

## Step 3: Automate Daily Refresh

Power Automate:

* Trigger daily
* Call Graph API
* Parse JSON
* Append rows to Excel or SharePoint
* Notify Teams channel

## Step 4: Build Lightweight Dashboards

Visuals:

* Active Teams users trend
* Device usage (desktop, mobile, web)
* Average meeting minutes

## Why This Matters

This solves a major pain:
**Microsoft 365 doesn't provide long-term historical data retention for most reports.**

By using Graph + Automate, you build your **own data warehouse**.

## Summary

This end-to-end pipeline is the easiest way to start **enterprise-grade automation** without coding.
`
  },
  {
    id: 'AUTO-005',
    title: 'Real-World M365 Automation Use Cases (High-Impact)',
    slug: 'real-world-automation',
    excerpt: 'Solving common pain points: Onboarding, Offboarding, and Governance.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Use Cases'],
    author: 'Sayan (Admin)',
    readTime: 15,
    views: 1500,
    publishedDate: '2025-04-20',
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Most Microsoft 365 tenants run on manual work:
license cleanup, stale groups, inactive accounts, mailbox reviews, Teams sprawl.

Here are **four automation workflows** that drastically reduce admin workload while keeping the tenant clean and secure — using a combination of **PowerShell, Microsoft Graph, and Power Automate**.

## Automation #1 — Identify & Deactivate Stale Accounts Automatically

Inactive users are expensive and risky.

### Logic

* Check last sign-in (via Graph)
* If inactive for X days → Flag
* Send report to admin
* Disable account after approval

### Graph query

\`\`\`
GET https://graph.microsoft.com/v1.0/users?$select=displayName,userPrincipalName,signInActivity
\`\`\`

### Why it matters

* Reduces licensing waste
* Closes identity loopholes
* Supports Zero Trust lifecycle

## Automation #2 — Auto-Monitor Teams Sprawl & Archive Inactive Teams

Teams environments typically grow fast.

### Logic

* Identify Teams with no messages/files for 60–90 days
* Send owner notification
* Auto-archive if no response

### Graph endpoint

\`\`\`
GET /v1.0/teams/{team-id}/channels
\`\`\`

## Automation #3 — Daily Email Security Digest (Spam, Malware, Phishing)

Pull data from **Microsoft Defender for Office 365** and deliver a daily digest:

* Malware detections
* Spoof attempts
* Quarantine counts
* DLP violations

### Sample Automation Output

\`\`\`
10 malware messages blocked
4 phishing URLs detected
3 user-reported phishing emails
\`\`\`

## Automation #4 — Auto-Assign Licenses Based on Department or Role

Use:

* Entra Dynamic Groups
* Power Automate
* PowerShell automation

### Example Rule

If a user's department = "Finance" → assign **E5 Security Add-on**.

## Summary

These four high-impact automations **save hours each week**, reduce human error, and provide continuous oversight for identity, security, Teams, and licensing.
`
  },
  {
    id: 'AUTO-006',
    title: 'End-to-End M365 Automation Blueprint',
    slug: 'automation-blueprint',
    excerpt: 'Designing a scalable automation framework using Azure Automation and Logic Apps.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Architecture'],
    author: 'Sayan (Admin)',
    readTime: 16,
    views: 1300,
    publishedDate: '2025-04-22',
    coverImage: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

This article provides a **repeatable blueprint** to transform *any* manual task into an automated workflow using:

* Power Automate
* Microsoft Graph
* PowerShell
* SharePoint

## Step 1: Identify Repetitive, Rule-Based Tasks

Ideal candidates:

* Onboarding/offboarding
* Group membership
* License updates
* Compliance drift checks
* Teams creation rules
* Mailbox permission reviews

## Step 2: Convert the Task Into a Logic Flow

Ask:

* What triggers it?
* What inputs are needed?
* What decisions are made?
* What outputs are expected?

Example:
"Add a new employee to groups based on department."

## Step 3: Choose the Automation Tool

| Task | Best Tool |
|------|-----------|
| Data extraction | Graph API |
| Complex logic | PowerShell |
| Scheduled workflows | Power Automate |
| Approvals | Power Automate |
| Tenant updates | PowerShell |

## Step 4: Implement the Workflow

### Example: Auto-Onboarding

1. Trigger → AD user created
2. Pull details → Graph API
3. Assign license
4. Add to departments groups
5. Create mailbox folder structure
6. Notify manager via Teams

### Graph endpoint used

\`\`\`
POST /users
\`\`\`

## Step 5: Add Monitoring, Logging, Exceptions

Automation without monitoring = silent failures.

Store logs in:

* SharePoint
* Log Analytics
* Excel Online

## Summary

With a structured approach, admins can transform chaotic manual operations into predictable, auditable, automated workflows.
`
  },
  {
    id: 'AUTO-007',
    title: 'Intune Automation: Proactive Remediation Scripts',
    slug: 'intune-proactive-remediation',
    excerpt: 'Self-healing endpoints: Detect and fix issues before users report them.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Intune', 'Scripting'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 1700,
    publishedDate: '2025-04-25',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Microsoft Intune includes powerful automation capabilities:

* Proactive Remediations
* Device compliance scripts
* Graph API automation
* Assignment automation

This guide shows how to automate **real-world compliance fixes**.

## Use Case #1 — Automatically Remediate BitLocker Not Enabled

### Detection Script

PowerShell checks:

\`\`\`powershell
(Get-BitLockerVolume -MountPoint "C:").ProtectionStatus
\`\`\`

### Remediation Script

\`\`\`powershell
Enable-BitLocker -MountPoint "C:" -UsedSpaceOnly
\`\`\`

Assigned via **Proactive Remediations**.

## Use Case #2 — Enforce Minimum OS Version Automatically

Script checks the OS version:

\`\`\`powershell
([System.Environment]::OSVersion.Version).ToString()
\`\`\`

If outdated:
* Tag device as non-compliant
* Trigger remediation workflow

## Use Case #3 — Auto-Clean Devices Not Checking In

Conditions:
* Last check-in > 45 days
* Non-compliant > X days

Automation:
* Add to "Retire Pending" group
* Trigger notification to user
* Auto-retire device

## Use Case #4 — Deploy Mandatory Apps Automatically

Using Graph API:

\`\`\`
POST /deviceAppManagement/mobileApps/{id}/assign
\`\`\`

This ensures users always receive required apps.

## Summary

Intune automation ensures devices stay compliant **without admin intervention**, significantly improving security posture.
`
  },
  {
    id: 'AUTO-008',
    title: 'Zero-Touch Endpoint Provisioning with Intune',
    slug: 'zero-touch-provisioning',
    excerpt: 'Automating the device lifecycle from purchase to retirement.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Intune', 'Provisioning'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 1900,
    publishedDate: '2025-04-28',
    coverImage: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Modern device management aims for **hands-free provisioning**, powered by:

* Windows Autopilot
* Enrollment Status Page
* Proactive Remediation
* Graph API automation
* Intune lifecycle policies

## Workflow #1 — Automated Onboarding (Autopilot + App Deployment)

Steps:

1. Device added to Autopilot
2. User signs in
3. ESP blocks access until:
   * Required apps installed
   * Security baseline applied
   * Compliance achieved
4. Device joins **Entra ID + Intune**
5. Teams/Outlook configured automatically

## Workflow #2 — Automated Offboarding

Trigger: user disabled in Entra.

Automation:
* Run Graph script to mark device non-compliant
* Revoke refresh tokens
* Wipe company data (Selective wipe)
* Remove from groups
* Send report to HR & IT

Graph endpoint:

\`\`\`
POST /deviceManagement/managedDevices/{id}/wipe
\`\`\`

## Workflow #3 — Patch Compliance Enforcement

Automation:
* Detect device > X days out-of-date
* Mark non-compliant
* Trigger Conditional Access block
* Notify user via email
* Auto-install updates

## Workflow #4 — Auto-Assign Policies & Apps by Device Category

Rules:

| Category | Policies Applied |
|----------|------------------|
| Corporate | Full compliance baseline |
| BYOD | App protection policies |
| Kiosk | Lockdown profile |

## Summary

Automated device lifecycle management ensures consistent, secure onboarding → operation → offboarding with minimal admin touch.
`
  },
  {
    id: 'AUTO-009',
    title: 'Exchange Online Automation: Mailbox Management Workflows',
    slug: 'exchange-automation',
    excerpt: 'Automating permissions, delegates, and quota management.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Exchange', 'Mailbox'],
    author: 'Sayan (Admin)',
    readTime: 16,
    views: 1200,
    publishedDate: '2025-05-01',
    coverImage: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Mailbox management in large tenants becomes repetitive fast:
quota checks, inactive mailbox audits, permission validation, transport rule monitoring.

This article delivers a **fully automated Exchange administration system** using:

* Exchange Online PowerShell
* Microsoft Graph (for identity context)
* Power Automate (for scheduling)

## Automation Use Case #1 — Automatic Mailbox Size Monitoring

### Script

\`\`\`powershell
$mailboxes = Get-EXOMailboxStatistics -ResultSize Unlimited |
    Select DisplayName, TotalItemSize, ItemCount
$mailboxes | Export-Csv "MailboxSizes.csv" -NoTypeInformation
\`\`\`

### Workflow

* Run daily
* Store in SharePoint
* Alert admin if >90% quota

### Why It Matters

Prevents user complaints, throttling issues, and mailbox corruption events.

## Automation Use Case #2 — Detect & Disable Unused Shared Mailboxes

Unused shared mailboxes become compliance risks.

### Script

\`\`\`powershell
$shared = Get-Mailbox -RecipientTypeDetails SharedMailbox
foreach ($m in $shared){
    if($m.LastUserActionTime -lt (Get-Date).AddDays(-90)){
        Write-Output "$($m.DisplayName) is stale"
    }
}
\`\`\`

### Automate:

* Email report to admin
* Move to "Archive Pending" group
* Disable mailbox after approval

## Automation Use Case #3 — Daily Mail Flow Health Check

### Script

\`\`\`powershell
Get-TransportService | Get-Queue |
    Select Identity, MessageCount, Status
\`\`\`

Alert if:
* MessageCount > 50
* Queue status not Active

## Automation Use Case #4 — Auto-Apply Transport Rules Based on HR Events

Flow:

1. HR updates CSV (new rule required)
2. Power Automate Desktop picks the change
3. PowerShell applies transport rule

Example rule:

\`\`\`powershell
New-TransportRule -Name "Finance Footer" -SenderDepartment "Finance"
\`\`\`

## Summary

Exchange Online becomes dramatically easier when mailbox lifecycle, transport rules, and mail flow monitoring run on automation instead of manual checks.
`
  },
  {
    id: 'AUTO-010',
    title: 'Microsoft Teams Automation: Lifecycle Governance',
    slug: 'teams-automation-lifecycle',
    excerpt: 'Automating Team creation, archiving, and expiration.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Teams', 'Governance'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 1400,
    publishedDate: '2025-05-03',
    coverImage: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Teams tends to grow uncontrollably:
unused teams, duplicate teams, ungoverned channels, guest user sprawl.

This guide provides **practical Teams automations** using:

* Teams PowerShell
* Graph API
* Microsoft Teams Admin Center (for manual overrides)

## Automation Use Case #1 — Detect Inactive Teams & Archive Automatically

### Script

\`\`\`powershell
$teams = Get-Team
foreach($t in $teams){
    $activity = Get-TeamChannelUser -GroupId $t.GroupId
    if($activity.count -eq 0){
        Write-Output "$($t.DisplayName) inactive"
    }
}
\`\`\`

### Workflow

* Notify owner
* If no response → Archive
* If rejected → Document justification

## Automation Use Case #2 — Auto-Provision Teams Based on Templates

Dynamic creation based on HR input.

### Use Graph:

\`\`\`
POST /v1.0/teams
\`\`\`

Payload includes:
* Channels
* Tabs
* Apps
* Member/Owner assignment

## Automation Use Case #3 — Auto-Remove External Guests After Inactivity

Guests are often forgotten.

### Script

\`\`\`powershell
$guests = Get-MgUser -Filter "userType eq 'Guest'"
foreach($g in $guests){
    if($g.SignInActivity.LastSignInDateTime -lt (Get-Date).AddDays(-60)){
        Remove-MgUser -UserId $g.Id
    }
}
\`\`\`

## Automation Use Case #4 — Teams Meeting Policy Enforcement

Enforce recording, chat, or lobby configurations.

### Script

\`\`\`powershell
Set-CsTeamsMeetingPolicy -Identity Global -AllowCloudRecording $true
\`\`\`

Automatable via scheduled scripts based on governance rules.

## Summary

Teams automation eliminates sprawl, enhances governance, improves security, and ensures consistent collaboration standards across the tenant.
`
  },
  {
    id: 'AUTO-011',
    title: 'SharePoint Reporting Automation: Self-Updating Hub',
    slug: 'sharepoint-reporting-hub',
    excerpt: 'Centralizing site usage and storage reports.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'SharePoint', 'Reporting'],
    author: 'Sayan (Admin)',
    readTime: 14,
    views: 1100,
    publishedDate: '2025-05-05',
    coverImage: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Most tenants rely on manual CSV exports and spreadsheets.
Reporting automation transforms messy reporting into a **self-updating reporting hub**.

This article builds an automated reporting system using:

* Excel Online
* SharePoint
* Power Automate Cloud
* Graph (light use)

## What This Reporting Hub Includes

* License usage trends
* Teams activity trends
* Email spam/malware timeline
* OneDrive & SharePoint storage history
* Inactive users reports
* Login risk summaries

All auto-updated.

## Step 1 — Create SharePoint Report Library

Folder structure:

\`\`\`
/Reports/Daily
/Reports/Weekly
/Reports/Monthly
\`\`\`

## Step 2 — Automate Data Collection with Power Automate

Daily schedule → Run Graph queries like:

\`\`\`
GET /reports/getTeamsUserActivityUserDetail(period='D7')
\`\`\`

Parse JSON → append into Excel → auto-refresh charts.

## Step 3 — Build Excel Dashboards That Auto-Refresh

Charts:

* Active users
* Device compliance
* Meeting minutes
* Mail flow metrics

The charts update as Excel tables expand.

## Step 4 — Notify IT & Leadership

Email or Teams notification with:

* Summary
* Graphs
* Excel attachments

## Summary

This creates a low-cost, low-complexity reporting solution suitable for SMB and mid-size orgs without BI investment.
`
  },
  {
    id: 'AUTO-012',
    title: 'Advanced Reporting Automation with Dataverse + Power BI',
    slug: 'dataverse-powerbi-automation',
    excerpt: 'Storing historical data for long-term trend analysis.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Reporting', 'Dataverse'],
    author: 'Sayan (Admin)',
    readTime: 16,
    views: 1000,
    publishedDate: '2025-05-08',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

If your organization wants deeper, long-term analytics without paying for premium SIEM/Snowflake systems, the best solution is:

* Graph API (data source)
* Microsoft Dataverse
* Power BI (reporting layer)

This setup becomes your **lightweight M365 data warehouse**.

## Step 1 — Create Dataverse Tables for Long-Term Storage

Tables:

* UserActivity
* DeviceCompliance
* EmailSecurity
* TeamsUsage
* OneDriveStorage

All mapped to Graph fields.

## Step 2 — Use Power Automate to Ingest Data Daily

Each flow:

1. Run Graph query
2. Parse JSON
3. Insert rows into Dataverse
4. Log success/failure

Example endpoint:

\`\`\`
GET /auditLogs/signIns?$top=1000
\`\`\`

## Step 3 — Build Power BI Dashboards on Dataverse

Visuals:

* Tenant health index
* Device risk heatmap
* Compliance drift chart
* Email threat trend
* Productivity score + Teams activity overlay
* Licensing forecast

## Step 4 — Add Alerts & Automated Insights

Example:

* If Secure Score drops → notify security
* If Teams usage drops → notify adoption lead
* If DLP violations spike → notify compliance

## Summary

This architecture provides a **true enterprise-grade reporting foundation** using only Microsoft 365 tools — no third-party BI systems required.
`
  },
  {
    id: 'AUTO-013',
    title: 'Tenant Cleanup Automation: Remove Stale Objects',
    slug: 'tenant-cleanup-automation',
    excerpt: 'Scripts to identify and remove stale users, devices, and groups.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Cleanup', 'Hygiene'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 1600,
    publishedDate: '2025-05-10',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Every Microsoft 365 tenant accumulates digital waste:

* Inactive user accounts
* Stale groups
* Old Teams with no activity
* Devices not checking in
* Orphaned SharePoint sites
* Guest users who never returned

This waste increases:

* Security risk
* Cost
* Clutter
* Admin workload

This article shows how to build a **fully automated cleanup engine** using:

* PowerShell
* Microsoft Graph
* Power Automate
* Intune lifecycle policies

## Cleanup #1 — Stale User Accounts (Inactive > 30/60/90 days)

Graph's sign-in logs identify dormant accounts:

\`\`\`
GET /v1.0/users?$select=displayName,userPrincipalName,signInActivity
\`\`\`

### PowerShell Filter:

\`\`\`powershell
$stale = Get-MgUser -All |
    where {$_.signInActivity.lastSignInDateTime -lt (Get-Date).AddDays(-60)}
\`\`\`

### Automation Steps:

1. Tag user "StaleCandidate"
2. Notify IT + Manager
3. Disable after 14 days
4. Remove licenses after 30 days
5. Delete account after HR approval

## Cleanup #2 — Guest Users Not Logged In for 90 Days

Guests are a major attack vector if left unmanaged.

### Script:

\`\`\`powershell
$guests = Get-MgUser -Filter "userType eq 'Guest'"
foreach ($g in $guests){
    if ($g.SignInActivity.lastSignInDateTime -lt (Get-Date).AddDays(-90)){
        Remove-MgUser -UserId $g.Id
    }
}
\`\`\`

## Cleanup #3 — Inactive Teams Detection and Auto-Archiving

Teams with no:

* messages
* channel posts
* file activity

for 60–120 days → archive candidates.

Graph data:

\`\`\`
GET /v1.0/teams/{teamID}/channels
\`\`\`

Workflow:

* Notify owner
* Auto-archive after 14 days
* Delete after 90 days (optional)

## Cleanup #4 — Devices That Haven't Checked In (Intune)

Devices > 45 days offline = dead inventory.

### Query:

\`\`\`powershell
Get-MgDeviceManagementManagedDevice |
    where {$_.lastSyncDateTime -lt (Get-Date).AddDays(-45)}
\`\`\`

Automation:

* Move to "Retirement Pending" group
* Selective wipe for corporate-owned devices

## Cleanup #5 — Unused Microsoft 365 Groups

Groups without Teams, mail, or SharePoint activity.

Workflow:

* Detect inactivity
* Notify group owners
* Delete or archive automatically

## Summary

Tenant cleanup automation reduces clutter, strengthens security, and saves significant licensing + storage cost — completely hands-free.
`
  },
  {
    id: 'AUTO-014',
    title: 'Continuous Tenant Hygiene with Daily Automation',
    slug: 'continuous-tenant-hygiene',
    excerpt: 'Running daily checks to ensure compliance and cleanliness.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Hygiene', 'Daily'],
    author: 'Sayan (Admin)',
    readTime: 16,
    views: 1300,
    publishedDate: '2025-05-12',
    coverImage: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

This article focuses on **continuous cleanup**, not one-time cleanup.

We build a system that **runs daily**, logging:

* stale users
* stale devices
* unused mailboxes
* empty SharePoint sites
* abandoned Teams
* stale licenses

All without admin intervention.

## Architecture Overview

### Components:

* **Graph API** → data extraction
* **SharePoint Lists** → store cleanup candidates
* **Power Automate Cloud** → orchestrate
* **PowerShell** → enforcement actions

### Flow:

1. Power Automate calls Graph APIs.
2. Parses results → writes to SharePoint list.
3. PowerShell job runs daily from Azure Automation.
4. Applies cleanup decisions.

## Daily Job #1: Stale User Detection

Graph query:

\`\`\`
GET /auditLogs/signIns?$top=1000
\`\`\`

Store results → "Stale Users List."

## Daily Job #2: Inactive Teams

Graph query:

\`\`\`
GET /reports/getTeamsUserActivityUserDetail(period='D30')
\`\`\`

Inactive if **no activity** + **no file usage**.

## Daily Job #3: Device Hygiene

Store:

* last sync time
* compliance state
* primary user

Flag devices for retirement.

## Daily Job #4: SharePoint Site Usage Check

\`\`\`
GET /v1.0/sites/{id}/analytics
\`\`\`

If page views < X → mark site for review.

## Enforcement Cycle

At end of each week:

* Disable stale accounts
* Archive inactive Teams
* Retire unused devices
* Notify site owners
* Remove externals

## Summary

This cleanup engine gives Microsoft 365 administrators the closest thing to **automatic tenant hygiene** — lowering risk and administrative debt.
`
  },
  {
    id: 'AUTO-015',
    title: 'Automatic License Management: Zero-Waste Licensing',
    slug: 'automatic-license-management',
    excerpt: 'Group-based licensing strategies and cleanup scripts.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Licensing', 'Cost'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 1800,
    publishedDate: '2025-05-15',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

Licenses are one of the biggest M365 expenses.
Most organizations waste **10–30%** of purchased licenses due to:

* unassigned licenses
* over-licensed users
* inactive licensed users
* wrong SKU mapping
* no lifecycle automation

This guide teaches how to fully automate licensing using:

* PowerShell
* Graph
* Dynamic groups
* Microsoft Entra ID

## Automation #1 — Auto-Assign Licenses Based on Department

Use dynamic security groups.

### Rule:

\`\`\`
(user.department -eq "Finance")
\`\`\`

Assign:

* E3
* Defender for Office
* Teams Phone (if needed)

Automated via group-based licensing.

## Automation #2 — Auto-Remove Licenses for Inactive Users

Detect inactivity:

\`\`\`powershell
$inactive = Get-MgUser | where {
    $_.signInActivity.lastSignInDateTime -lt (Get-Date).AddDays(-30)
}
\`\`\`

Then:

\`\`\`powershell
Set-MgUserLicense -UserId $u.Id -RemoveLicenses $u.AssignedLicenses.SkuId
\`\`\`

## Automation #3 — Enforce Minimum SKU Requirements

Example:

* Contractors → F3
* Full-time → E3 or E5
* Executives → E5

Automate by evaluating:

* department
* job title
* country
* device count

## Automation #4 — Alerts for Low License Availability

Power Automate checks:

\`\`\`
GET /subscribedSkus
\`\`\`

If availableUnits < threshold → alert procurement.

## Summary

Fully automated license management prevents overspending, enforces governance, and improves cost forecasting.
`
  },
  {
    id: 'AUTO-016',
    title: 'License Reconciliation Engine: Real-Time Dashboard',
    slug: 'license-reconciliation',
    excerpt: 'Comparing purchased vs assigned licenses to prevent overspending.',
    category: 'Automation & Scripts',
    tags: ['Automation', 'Licensing', 'Reporting'],
    author: 'Sayan (Admin)',
    readTime: 17,
    views: 1500,
    publishedDate: '2025-05-18',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    content: `
# Overview

This article builds a **license reclamation engine**, ensuring unused or unnecessary licenses are automatically reclaimed.

This system uses:

* Graph Reporting APIs
* Excel/SharePoint storage
* Power BI for dashboarding
* Scheduled automations

## Step 1 — Collect License Assignment & Usage Data Daily

Graph query:

\`\`\`
GET /users?$select=displayName,usageLocation,assignedLicenses,signInActivity
\`\`\`

Store into SharePoint or Dataverse tables.

## Step 2 — Detect License Waste Patterns

Automated logic identifies:

### Pattern A — User Has Not Logged In for 30/60 Days

→ License reclaim candidate.

### Pattern B — User Has More SKUs Than Required

Example:

* E3 + E5 Security + Power BI Pro (duplicate/overlap)

### Pattern C — User Assigned SKU But Workload Not Used

Example:

* Audio Conferencing license unused
* Power BI Pro license unused

### Pattern D — Orphaned Licenses

Mailbox exists without a corresponding user object.

## Step 3 — Auto-Reclaim Workflow

1. Notify manager
2. Wait 7 days
3. Remove unused licenses
4. Update records
5. Reassign to license pool

PowerShell example:

\`\`\`powershell
Set-MgUserLicense -UserId $id -RemoveLicenses @($sku)
\`\`\`

## Step 4 — Build License Dashboard in Power BI

Visuals:

* Current vs. reclaimed licenses
* Cost savings per month
* Top departments with waste
* SKU utilization trends

This becomes your **CFO-facing dashboard**.

## Step 5 — Monthly Automated Reconciliation Report

Power Automate email:

* Summary of reclaimed licenses
* Total cost saved
* Users cleaned up
* Unused SKUs forecast

## Summary

This automated license reconciliation framework eliminates waste and keeps cost optimized, especially for large tenants where manual license audits fail.
`
  }
];

// ==========================================
// SCRIPTS LIBRARY (80+ Scripts)
// ==========================================
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
  },
  {
    id: 'SC-ID-002',
    title: 'Guest User Lifecycle Management',
    description: 'Automated cleanup of inactive guest accounts older than 90 days with approval workflow',
    category: 'Entra ID & Identity',
    language: 'powershell',
    downloads: 2800,
    prerequisites: ['Microsoft.Graph.Users', 'Microsoft.Graph.Reports'],
    difficulty: 'Advanced',
    lastUpdated: '2025-01-20',
    coverImage: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&w=800&q=80',
    code: `# This script queries the Graph API for Guest users who have not signed in within 90 days
# Requires: Microsoft.Graph module

Connect-MgGraph -Scopes "User.Read.All","AuditLog.Read.All"

$guests = Get-MgUser -Filter "userType eq 'Guest'" -All -Property Id,DisplayName,SignInActivity

foreach ($user in $guests) {
    if ($user.SignInActivity.LastSignInDateTime -lt (Get-Date).AddDays(-90)) {
        Write-Host "Stale Guest Found: $($user.DisplayName)"
        # Remove-MgUser -UserId $user.Id -Confirm:$false
    }
}`
  },
  {
    id: 'SC-ID-003',
    title: 'License Assignment Automation',
    description: 'Assign M365 licenses based on department, location, or AD group membership',
    category: 'Entra ID & Identity',
    language: 'powershell',
    downloads: 2500,
    prerequisites: ['Microsoft.Graph.Users'],
    difficulty: 'Beginner',
    lastUpdated: '2025-01-10',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    code: `# Assign license based on user department
$users = Get-MgUser -All -Property Department, Id, UserPrincipalName

foreach ($u in $users) {
    if ($u.Department -eq "Sales") {
        Set-MgUserLicense -UserId $u.Id -AddLicenses @{SkuId="<SkuId-For-Sales>"} -RemoveLicenses @()
    }
}`
  },
  {
    id: 'SC-ID-004',
    title: 'Group Membership Audit Report',
    description: 'Export all groups, members, owners, and group types to CSV',
    category: 'Entra ID & Identity',
    language: 'powershell',
    downloads: 1900,
    prerequisites: ['Microsoft.Graph.Groups'],
    difficulty: 'Beginner',
    lastUpdated: '2025-01-12',
    code: `Get-MgGroup -All | ForEach-Object {
    $owners = (Get-MgGroupOwner -GroupId $_.Id | Select -ExpandProperty AdditionalProperties).displayName -join "; "
    [PSCustomObject]@{
        GroupName = $_.DisplayName
        Type = $_.GroupTypes
        Owners = $owners
    }
} | Export-Csv "GroupAudit.csv" -NoTypeInformation`
  },
  {
    id: 'SC-ID-005',
    title: 'Sign-in Logs Export with Risk Detection',
    description: 'Pull last 30 days of sign-in logs including risky sign-ins and locations',
    category: 'Entra ID & Identity',
    language: 'powershell',
    downloads: 3100,
    prerequisites: ['Microsoft.Graph.Reports'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-18',
    code: `Get-MgAuditLogSignIn -Filter "createdDateTime ge 2024-01-01" -All | Select CreatedDateTime, UserPrincipalName, Status, Location`
  },

  // --- Exchange Management Scripts ---
  {
    id: 'SC-EX-001',
    title: 'Mailbox Permission Audit Report',
    description: 'Generate comprehensive report of all mailbox permissions (Full Access, Send As, Send on Behalf)',
    category: 'Exchange Online',
    language: 'powershell',
    downloads: 4500,
    prerequisites: ['ExchangeOnlineManagement'],
    difficulty: 'Beginner',
    lastUpdated: '2025-01-08',
    code: `Get-Mailbox -ResultSize Unlimited | Get-MailboxPermission | Where-Object { $_.User -notlike "NT AUTHORITY\\SELF" } | Select Identity, User, AccessRights`
  },
  {
    id: 'SC-EX-002',
    title: 'Distribution List Cleanup & Modernization',
    description: 'Identify inactive DLs and migrate to M365 Groups or Teams',
    category: 'Exchange Online',
    language: 'powershell',
    downloads: 1200,
    prerequisites: ['ExchangeOnlineManagement'],
    difficulty: 'Advanced',
    lastUpdated: '2025-01-14',
    code: `# Simplified Logic
$dls = Get-DistributionGroup
foreach ($dl in $dls) {
    # Check message trace logs for activity
    $trace = Get-MessageTrace -RecipientAddress $dl.PrimarySmtpAddress
    if ($trace.Count -eq 0) {
        Write-Host "$($dl.DisplayName) is inactive."
    }
}`
  },
  {
    id: 'SC-EX-003',
    title: 'Automated Message Trace Export',
    description: 'Schedule daily message trace reports for failed deliveries',
    category: 'Exchange Online',
    language: 'powershell',
    downloads: 2100,
    prerequisites: ['ExchangeOnlineManagement'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-16',
    code: `Get-MessageTrace -StartDate (Get-Date).AddDays(-1) -EndDate (Get-Date) -Status Failed | Export-Csv "FailedMail.csv"`
  },
  {
    id: 'SC-EX-004',
    title: 'Shared Mailbox Usage Report',
    description: 'Track shared mailbox usage, size, and permission sprawl',
    category: 'Exchange Online',
    language: 'powershell',
    downloads: 1800,
    prerequisites: ['ExchangeOnlineManagement'],
    difficulty: 'Beginner',
    lastUpdated: '2025-01-11',
    code: `Get-Mailbox -RecipientTypeDetails SharedMailbox | Get-MailboxStatistics | Select DisplayName, TotalItemSize, ItemCount`
  },
  {
    id: 'SC-EX-005',
    title: 'Calendar Permission Management',
    description: 'Bulk update calendar sharing permissions for executives',
    category: 'Exchange Online',
    language: 'powershell',
    downloads: 1500,
    prerequisites: ['ExchangeOnlineManagement'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-13',
    code: `Set-MailboxFolderPermission -Identity "ceo@domain.com:\Calendar" -User Default -AccessRights LimitedDetails`
  },

  // --- Teams Automation Scripts ---
  {
    id: 'SC-TM-001',
    title: 'Teams Ownership Report',
    description: 'Identify all Teams without owners or with single owner risk',
    category: 'Microsoft Teams',
    language: 'powershell',
    downloads: 2300,
    prerequisites: ['MicrosoftTeams'],
    difficulty: 'Beginner',
    lastUpdated: '2025-01-09',
    code: `Get-Team | Where-Object { (Get-TeamUser -GroupId $_.GroupId -Role Owner).Count -eq 0 } | Select DisplayName, GroupId`
  },
  {
    id: 'SC-TM-002',
    title: 'Guest Access Audit & Remediation',
    description: 'Report all guests in Teams with last activity and revoke stale access',
    category: 'Microsoft Teams',
    language: 'powershell',
    downloads: 2000,
    prerequisites: ['MicrosoftTeams', 'Microsoft.Graph'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-17',
    coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    code: `Get-Team | ForEach-Object {
    Get-TeamUser -GroupId $_.GroupId | Where-Object {$_.Role -eq "Guest"}
}`
  },
  {
    id: 'SC-TM-003',
    title: 'App Usage & Permission Report',
    description: 'Track which apps are installed across all Teams with permission analysis',
    category: 'Microsoft Teams',
    language: 'powershell',
    downloads: 900,
    prerequisites: ['MicrosoftTeams'],
    difficulty: 'Advanced',
    lastUpdated: '2025-01-19',
    code: `# Use Graph API to list apps installed in a team
Get-MgTeamInstalledApp -TeamId <TeamId>`
  },
  {
    id: 'SC-TM-004',
    title: 'Meeting Policy Bulk Assignment',
    description: 'Assign meeting policies to users based on department or role',
    category: 'Microsoft Teams',
    language: 'powershell',
    downloads: 1600,
    prerequisites: ['MicrosoftTeams'],
    difficulty: 'Beginner',
    lastUpdated: '2025-01-10',
    code: `Get-CsOnlineUser -Filter {Department -eq 'Sales'} | Grant-CsTeamsMeetingPolicy -PolicyName "SalesPolicy"`
  },
  {
    id: 'SC-TM-005',
    title: 'Call Queue Agent Management',
    description: 'Add/remove agents from call queues and monitor presence-based routing',
    category: 'Microsoft Teams',
    language: 'powershell',
    downloads: 800,
    prerequisites: ['MicrosoftTeams'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-15',
    code: `# Add user to call queue (which is an M365 group usually)
Add-TeamChannelUser -GroupId <QueueGroupId> -User <UserUPN>`
  },

  // --- Intune & Devices Scripts ---
  {
    id: 'SC-IN-001',
    title: 'Device Compliance Report',
    description: 'Export compliance status for all enrolled devices with policy details',
    category: 'Intune & Devices',
    language: 'powershell',
    downloads: 3800,
    prerequisites: ['Microsoft.Graph.DeviceManagement'],
    difficulty: 'Beginner',
    lastUpdated: '2025-01-12',
    code: `Get-MgDeviceManagementManagedDevice | Select DeviceName, ComplianceState, OSVersion, UserPrincipalName`
  },
  {
    id: 'SC-IN-002',
    title: 'Application Deployment Status',
    description: 'Track Win32 app deployment success/failure across device groups',
    category: 'Intune & Devices',
    language: 'powershell',
    downloads: 2100,
    prerequisites: ['Microsoft.Graph.DeviceManagement'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-16',
    code: `# Uses Graph API to get device install status for specific mobile app
Get-MgDeviceAppManagementMobileAppDeviceStatus -MobileAppId <AppID>`
  },
  {
    id: 'SC-IN-003',
    title: 'Autopilot Device Bulk Registration',
    description: 'Register devices to Autopilot from hardware hash CSV',
    category: 'Intune & Devices',
    language: 'powershell',
    downloads: 2900,
    prerequisites: ['Microsoft.Graph.DeviceManagement'],
    difficulty: 'Beginner',
    lastUpdated: '2025-01-08',
    coverImage: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=800&q=80',
    code: `Import-Csv "HardwareHashes.csv" | ForEach-Object {
    # Custom logic to upload hash to Autopilot service via Graph
}`
  },
  {
    id: 'SC-IN-004',
    title: 'Configuration Profile Assignment Audit',
    description: 'Report which configuration profiles are assigned to which groups',
    category: 'Intune & Devices',
    language: 'powershell',
    downloads: 1400,
    prerequisites: ['Microsoft.Graph.DeviceManagement'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-14',
    code: `Get-MgDeviceManagementDeviceConfiguration | Select DisplayName, Assignments`
  },
  {
    id: 'SC-IN-005',
    title: 'BitLocker Recovery Key Export',
    description: 'Export BitLocker recovery keys for all managed devices',
    category: 'Intune & Devices',
    language: 'powershell',
    downloads: 3000,
    prerequisites: ['Microsoft.Graph.DeviceManagement'],
    difficulty: 'Advanced',
    lastUpdated: '2025-01-18',
    code: `# Requires specialized permissions
Get-MgInformationProtectionBitlockerRecoveryKey`
  },

  // --- Report Generators Scripts ---
  {
    id: 'SC-REP-001',
    title: 'M365 License Usage Dashboard',
    description: 'Comprehensive license consumption report across all services',
    category: 'Automation & Scripts',
    language: 'powershell',
    downloads: 5000,
    prerequisites: ['Microsoft.Graph.Users'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-11',
    code: `Get-MgSubscribedSku | Select SkuPartNumber, ConsumedUnits, PrepaidUnits, @{N='Remaining';E={$_.PrepaidUnits.Enabled - $_.ConsumedUnits}}`
  },
  {
    id: 'SC-REP-002',
    title: 'Inactive User Report',
    description: 'Identify users with no sign-in activity for 60+ days',
    category: 'Automation & Scripts',
    language: 'powershell',
    downloads: 4200,
    prerequisites: ['Microsoft.Graph.Users', 'Microsoft.Graph.Reports'],
    difficulty: 'Beginner',
    lastUpdated: '2025-01-13',
    code: `Get-MgUser -Filter "signInActivity/lastSignInDateTime le 2024-01-01" -Property DisplayName, SignInActivity`
  },
  {
    id: 'SC-REP-003',
    title: 'External Sharing Audit (SharePoint/OneDrive)',
    description: 'Report all externally shared files and sites with permission levels',
    category: 'Automation & Scripts',
    language: 'powershell',
    downloads: 3500,
    prerequisites: ['PnP.PowerShell'],
    difficulty: 'Advanced',
    lastUpdated: '2025-01-17',
    code: `# Use PnP PowerShell to crawl sites
Get-PnPTenantSite | ForEach-Object { Get-PnPUser -Identity $_.Url | Where-Object {$_.LoginName -like "*#ext#*"} }`
  },
  {
    id: 'SC-REP-004',
    title: 'Conditional Access Policy Report',
    description: 'Document all CA policies with assigned users/groups and conditions',
    category: 'Automation & Scripts',
    language: 'powershell',
    downloads: 3100,
    prerequisites: ['Microsoft.Graph.Identity.SignIns'],
    difficulty: 'Intermediate',
    lastUpdated: '2025-01-15',
    code: `Get-MgIdentityConditionalAccessPolicy | Select DisplayName, State, Conditions, GrantControls`
  },
  {
    id: 'SC-REP-005',
    title: 'Security Baseline Compliance',
    description: 'Check device compliance against Microsoft security baselines',
    category: 'Automation & Scripts',
    language: 'powershell',
    downloads: 1800,
    prerequisites: ['Microsoft.Graph.DeviceManagement'],
    difficulty: 'Advanced',
    lastUpdated: '2025-01-19',
    code: `# Compare current device configs against a baseline JSON template`
  },
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