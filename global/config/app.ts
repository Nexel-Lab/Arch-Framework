// TODO: 1.1 - Update app name

export const app = {
  NAME: 'Arch Framework',
  VERSION: '2025.07.0801',
  UPDATE_DATE: 'Jul 8, 2025',
  SENTRY: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
  },
  Dependencies: {
    Arch: '2.1.0',
    React: '19.1.0',
    NextJs: '15.3.3',
  },
}
