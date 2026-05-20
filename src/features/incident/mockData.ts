import type { Incident } from './types'

export const incidents: Incident[] = [
  {
    id: 'inc-2418',
    ref: 'INC-2418',
    title: 'Checkout API elevated 5xx errors',
    summary:
      'Payment authorization service returning 5xx for ~18% of requests across US-East. Customer impact: failed checkouts on web and mobile.',
    severity: 'sev1',
    status: 'investigating',
    startedAt: '14:02 UTC',
    service: 'payments-api',
    commander: 'Mira Okafor',
    affectedCustomers: 12_840,
    responders: [
      {
        id: 'u1',
        name: 'Mira Okafor',
        role: 'Incident Commander',
        team: 'SRE',
        presence: 'oncall',
      },
      {
        id: 'u2',
        name: 'Daniel Reyes',
        role: 'Subject Matter Expert',
        team: 'Payments',
        presence: 'online',
      },
      {
        id: 'u3',
        name: 'Priya Shah',
        role: 'Comms Lead',
        team: 'Support',
        presence: 'online',
      },
      {
        id: 'u4',
        name: 'Lucas Berg',
        role: 'Scribe',
        team: 'SRE',
        presence: 'away',
      },
    ],
    timeline: [
      {
        id: 't1',
        at: '14:02',
        author: 'Datadog',
        kind: 'detected',
        message:
          'Monitor "payments.api.5xx_rate > 5%" triggered. Auto-paged on-call SRE.',
      },
      {
        id: 't2',
        at: '14:04',
        author: 'Mira Okafor',
        kind: 'escalation',
        message:
          'Declared SEV1. Paging payments SME and customer comms lead.',
      },
      {
        id: 't3',
        at: '14:08',
        author: 'Daniel Reyes',
        kind: 'updated',
        message:
          'Correlated spike with deploy of payments-api@v412.2. Reviewing diff.',
      },
      {
        id: 't4',
        at: '14:14',
        author: 'Priya Shah',
        kind: 'comms',
        message: 'Status page updated: "Investigating — Checkout".',
      },
      {
        id: 't5',
        at: '14:21',
        author: 'Daniel Reyes',
        kind: 'mitigation',
        message:
          'Rolling back payments-api to v412.1. ETA to first canary: 4m.',
      },
      {
        id: 't6',
        at: '14:27',
        author: 'Mira Okafor',
        kind: 'updated',
        message:
          'Canary healthy. Promoting rollback to fleet. Watching error rate.',
      },
    ],
    comms: [
      {
        id: 'c1',
        author: 'Priya Shah',
        at: '14:14',
        channel: 'status-page',
        body: 'Investigating elevated checkout errors. Some customers may see failed payments.',
      },
      {
        id: 'c2',
        author: 'Priya Shah',
        at: '14:22',
        channel: 'email',
        body: 'Sent proactive notice to top-50 merchants describing scope and ETA.',
      },
      {
        id: 'c3',
        author: 'Mira Okafor',
        at: '14:26',
        channel: 'slack',
        body: '#war-room: rollback in progress, expect recovery in <10m.',
      },
    ],
  },
  {
    id: 'inc-2417',
    ref: 'INC-2417',
    title: 'Auth service token refresh latency',
    summary:
      'p99 latency on /token/refresh up 3.2x baseline. Some sessions intermittently re-prompted to log in.',
    severity: 'sev2',
    status: 'identified',
    startedAt: '13:41 UTC',
    service: 'auth-service',
    commander: 'Kenji Park',
    affectedCustomers: 4_120,
    responders: [],
    timeline: [],
    comms: [],
  },
  {
    id: 'inc-2416',
    ref: 'INC-2416',
    title: 'Search index lag on EU region',
    summary:
      'Indexer falling behind by ~12 minutes. New listings delayed in EU search results.',
    severity: 'sev3',
    status: 'monitoring',
    startedAt: '12:55 UTC',
    service: 'search-indexer',
    commander: 'Anya Volkov',
    affectedCustomers: 220,
    responders: [],
    timeline: [],
    comms: [],
  },
  {
    id: 'inc-2415',
    ref: 'INC-2415',
    title: 'Customer support attachment uploads failing',
    summary:
      'CDN signing key rotation caused a small subset of attachment uploads to fail.',
    severity: 'sev4',
    status: 'resolved',
    startedAt: '11:08 UTC',
    service: 'cdn-uploads',
    commander: 'Theo Marsh',
    affectedCustomers: 38,
    responders: [],
    timeline: [],
    comms: [],
  },
]
