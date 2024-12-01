// TODO: 1.1 - Update app name

export const app = {
  NAME: 'Arch Framework',
  VERSION: '2024.12.0101',
  UPDATE_DATE: 'Dec 1, 2024',
  SENTRY: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
  },
  Dependencies: {
    Arch: '1.0',
    React: '18.3.1',
    NextJs: '14.2.18',
  },
}
