// TODO: 1.1 - Update app name

export const app = {
  NAME: 'Arch Framework',
  VERSION: '2025.04.09.01',
  UPDATE_DATE: 'Apr 9, 2025',
  SENTRY: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
  },
  Dependencies: {
    Arch: '2.0.0',
    React: '19.1.0',
    NextJs: '15.2.5',
  },
}
