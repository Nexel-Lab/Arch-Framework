import { t } from '../trpc.init'
import { enforceUserIsAdmin } from './enforceUserIsAdmin'
import { enforceUserIsAuthed } from './enforceUserIsAuthed'
import { enforceUserIsSuperAdmin } from './enforceUserIsSuperAdmin'

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
export const adminProcedure = t.procedure.use(enforceUserIsAdmin)
export const superAdminProcedure = t.procedure.use(enforceUserIsSuperAdmin)
